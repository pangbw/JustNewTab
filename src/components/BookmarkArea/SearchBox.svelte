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

<div class="search-box relative">
  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>

  <input
    type="text"
    bind:value={query}
    placeholder="搜索书签..."
    oninput={handleInput}
    onkeydown={handleKeydown}
    onfocus={handleFocus}
    onblur={handleBlur}
  />

  {#if query}
    <button
      class="text-slate-500 hover:text-slate-300 transition-colors"
      onclick={handleClear}
      aria-label="清除搜索"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}

  {#if isSearching}
    <div class="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
  {/if}

  {#if hasDropdownContent}
    <div class="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
      {#if suggestions.length > 0}
        <div class="px-2 py-1">
          <span class="text-xs text-slate-500">建议</span>
        </div>
        {#each suggestions as suggestion (suggestion.id)}
          <button
            class="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
            onclick={() => selectSuggestion(suggestion)}
          >
            <svg class="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span class="truncate">{suggestion.title ?? suggestion.url}</span>
          </button>
        {/each}
      {/if}

      {#if isFetchingSuggestions && suggestions.length === 0}
        <div class="px-3 py-2 text-xs text-slate-500 flex items-center gap-2">
          <div class="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          搜索中...
        </div>
      {/if}

      {#if history.length > 0 && (!query.trim() || suggestions.length === 0)}
        <div class="px-2 py-1 flex items-center justify-between">
          <span class="text-xs text-slate-500">搜索历史</span>
          <button
            class="text-xs text-slate-600 hover:text-slate-400"
            onclick={() => { clearHistory(); }}
          >
            清除
          </button>
        </div>
        {#each history as item (item)}
          <div class="flex items-center group/item">
            <button
              class="flex-1 text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
              onclick={() => selectHistoryItem(item)}
            >
              <svg class="w-3.5 h-3.5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="truncate">{item}</span>
            </button>
            <button
              class="px-2 py-2 text-slate-600 hover:text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity"
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
