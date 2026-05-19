<script lang="ts">
  import { searchBookmarks, type BookmarkTreeNode } from '@/adapters/bookmarkAdapter';
  import {
    searchQuery,
    searchHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
  } from '@/stores/searchStore';
  import { get } from 'svelte/store';

  interface Props {
    onResults?: (results: BookmarkTreeNode[], query: string) => void;
    onClear?: () => void;
  }

  const { onResults, onClear }: Props = $props();

  let query = $state(get(searchQuery));
  let isSearching = $state(false);
  let showDropdown = $state(false);
  let suggestions = $state<BookmarkTreeNode[]>([]);
  let isFetchingSuggestions = $state(false);

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let suggestionTimer: ReturnType<typeof setTimeout> | null = null;

  // Restore search on mount if persisted query exists
  $effect(() => {
    if (query.trim()) {
      handleSearch(query.trim());
    }
  });

  function handleInput(): void {
    searchQuery.set(query);

    if (debounceTimer) clearTimeout(debounceTimer);
    if (suggestionTimer) clearTimeout(suggestionTimer);

    if (!query.trim()) {
      onClear?.();
      suggestions = [];
      showDropdown = false;
      return;
    }

    // Show dropdown with history when typing
    showDropdown = true;

    // Fetch suggestions after 3 characters
    if (query.trim().length >= 3) {
      isFetchingSuggestions = true;
      suggestionTimer = setTimeout(async () => {
        try {
          const results = await searchBookmarks(query.trim());
          suggestions = results.filter((r) => r.url).slice(0, 5);
        } catch {
          suggestions = [];
        } finally {
          isFetchingSuggestions = false;
        }
      }, 200);
    } else {
      suggestions = [];
    }

    // Debounced full search
    debounceTimer = setTimeout(async () => {
      await handleSearch(query.trim());
    }, 300);
  }

  async function handleSearch(searchTerm: string): Promise<void> {
    if (!searchTerm) return;

    isSearching = true;
    try {
      const results = await searchBookmarks(searchTerm);
      addToHistory(searchTerm);
      onResults?.(results, searchTerm);
    } catch {
      // Search failed silently
    } finally {
      isSearching = false;
    }
  }

  function handleClear(): void {
    query = '';
    suggestions = [];
    showDropdown = false;
    searchQuery.set('');
    if (debounceTimer) clearTimeout(debounceTimer);
    if (suggestionTimer) clearTimeout(suggestionTimer);
    onClear?.();
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      handleClear();
    } else if (e.key === 'Enter') {
      showDropdown = false;
      if (query.trim()) {
        handleSearch(query.trim());
      }
    }
  }

  function handleFocus(): void {
    if (query.trim() || get(searchHistory).length > 0) {
      showDropdown = true;
    }
  }

  function handleBlur(): void {
    // Delay to allow click events on dropdown items
    setTimeout(() => { showDropdown = false; }, 150);
  }

  function selectHistoryItem(item: string): void {
    query = item;
    searchQuery.set(item);
    showDropdown = false;
    handleSearch(item);
  }

  function selectSuggestion(suggestion: BookmarkTreeNode): void {
    if (suggestion.url) {
      query = suggestion.title ?? suggestion.url;
      searchQuery.set(query);
      showDropdown = false;
      window.location.href = suggestion.url;
    }
  }

  const history = $derived($searchHistory);
  const hasDropdownContent = $derived(
    showDropdown && (history.length > 0 || suggestions.length > 0 || isFetchingSuggestions)
  );
</script>

<div class="search-box relative bg-jnt-bg-tertiary/50 backdrop-blur-sm rounded-jnt-md px-jnt-3 py-jnt-1 border border-jnt-border-primary">
  <input
    type="text"
    bind:value={query}
    placeholder="搜索书签..."
    class="bg-transparent text-jnt-text-primary placeholder:text-jnt-text-placeholder w-full outline-none text-jnt-sm"
    oninput={handleInput}
    onkeydown={handleKeydown}
    onfocus={handleFocus}
    onblur={handleBlur}
  />

  {#if query}
    <button
      class="text-jnt-text-placeholder hover:text-jnt-text-secondary transition-colors duration-jnt-fast"
      onclick={handleClear}
      aria-label="清除搜索"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}

  {#if isSearching}
    <div class="w-4 h-4 border-2 border-jnt-text-placeholder border-t-transparent rounded-full animate-spin"></div>
  {/if}

  {#if hasDropdownContent}
    <div class="search-dropdown absolute top-full left-0 right-0 mt-jnt-1 bg-jnt-bg-tertiary border border-jnt-bg-elevated rounded-jnt-lg shadow-jnt-xl max-h-64 overflow-y-auto z-50">
      {#if suggestions.length > 0}
        <div class="px-jnt-2 py-jnt-1">
          <span class="text-jnt-text-xs text-jnt-text-placeholder">建议</span>
        </div>
        {#each suggestions as suggestion (suggestion.id)}
          <button
            class="search-dropdown-item w-full text-left px-jnt-3 py-jnt-2 text-jnt-text-sm text-jnt-text-secondary hover:bg-jnt-bg-elevated flex items-center gap-jnt-2"
            onclick={() => selectSuggestion(suggestion)}
          >
            <svg class="w-3.5 h-3.5 text-jnt-text-placeholder shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span class="truncate">{suggestion.title ?? suggestion.url}</span>
          </button>
        {/each}
      {/if}

      {#if isFetchingSuggestions && suggestions.length === 0}
        <div class="px-jnt-3 py-jnt-2 text-jnt-text-xs text-jnt-text-placeholder flex items-center gap-jnt-2">
          <div class="w-3 h-3 border-2 border-jnt-text-placeholder border-t-transparent rounded-full animate-spin"></div>
          搜索中...
        </div>
      {/if}

      {#if history.length > 0 && (!query.trim() || suggestions.length === 0)}
        <div class="px-jnt-2 py-jnt-1 flex items-center justify-between">
          <span class="text-jnt-text-xs text-jnt-text-placeholder">搜索历史</span>
          <button
            class="text-jnt-text-xs text-jnt-text-placeholder hover:text-jnt-text-tertiary"
            onclick={() => { clearHistory(); }}
          >
            清除
          </button>
        </div>
        {#each history as item (item)}
          <div class="flex items-center group/item">
            <button
              class="flex-1 text-left px-jnt-3 py-jnt-2 text-jnt-text-sm text-jnt-text-secondary hover:bg-jnt-bg-elevated flex items-center gap-jnt-2"
              onclick={() => selectHistoryItem(item)}
            >
              <svg class="w-3.5 h-3.5 text-jnt-text-placeholder shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="truncate">{item}</span>
            </button>
            <button
              class="px-jnt-2 py-jnt-2 text-jnt-text-placeholder hover:text-jnt-text-tertiary opacity-0 group-hover/item:opacity-100 transition-opacity duration-jnt-fast"
              onclick={() => { removeFromHistory(item); }}
              aria-label="删除历史记录"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
</div>
