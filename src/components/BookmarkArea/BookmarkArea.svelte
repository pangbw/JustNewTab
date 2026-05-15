<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { bookmarkBlocks, addBlock, addBookmark, reorderBlocks, removeBlock, removeBookmark } from '@/stores/bookmarkStore';
  import { initializeWorkspace, activeWorkspace, activeWorkspaceId, setActiveWorkspace } from '@/stores/workspaceStore';
  import { clearSearchState } from '@/stores/searchStore';
  import { refreshOpenTabs } from '@/stores/tabStore';
  import { endDrag, cancelDrag } from '@/stores/dragStore';
  import type { BookmarkBlock, Bookmark } from '@/types/bookmark';
  import WorkspaceTabs from './WorkspaceTabs.svelte';
  import SearchBox from './SearchBox.svelte';
  import BookmarkBlockComponent from './BookmarkBlock.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import QuickEdit from './QuickEdit.svelte';
  import QuickConfig from './QuickConfig.svelte';
  import type { BookmarkTreeNode } from '@/adapters/bookmarkAdapter';

  // Context menu state
  let contextMenu = $state<{
    x: number;
    y: number;
    items: Array<{ id: string; label: string; disabled?: boolean; separator?: boolean }>;
    onSelect: (id: string) => void;
  } | null>(null);

  // Quick edit state
  let quickEdit = $state<{
    bookmark: Bookmark;
    blockId: string;
    x: number;
    y: number;
  } | null>(null);

  // Quick config state
  let quickConfig = $state<{
    block: BookmarkBlock;
    x: number;
    y: number;
  } | null>(null);

  // Search results
  let searchResults = $state<BookmarkTreeNode[] | null>(null);
  let searchQueryText = $state('');

  const NAV_STATE_KEY = 'justnewtab_nav_state';

  onMount(() => {
    initializeWorkspace();
    refreshOpenTabs();

    // Restore navigation state (e.g., after browser back button)
    const savedState = sessionStorage.getItem(NAV_STATE_KEY);
    if (savedState) {
      try {
        const { workspaceId, scrollY } = JSON.parse(savedState);
        if (workspaceId) {
          setActiveWorkspace(workspaceId);
        }
        if (scrollY) {
          setTimeout(() => window.scrollTo(0, scrollY), 0);
        }
      } catch {
        // Invalid state
      }
      sessionStorage.removeItem(NAV_STATE_KEY);
    }

    // Save state before navigating away
    function handleBeforeUnload(): void {
      const wsId = get(activeWorkspaceId);
      sessionStorage.setItem(NAV_STATE_KEY, JSON.stringify({
        workspaceId: wsId,
        scrollY: window.scrollY,
      }));
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  // Clear search when workspace changes
  $effect(() => {
    void $activeWorkspaceId;
    searchResults = null;
    searchQueryText = '';
    clearSearchState();
  });

  function highlightMatch(text: string, query: string): string {
    if (!query.trim()) return escapeHtml(text);
    const escaped = escapeHtml(text);
    const escapedQuery = escapeHtml(query.trim());
    const regex = new RegExp(`(${escapeRegex(escapedQuery)})`, 'gi');
    return escaped.replace(regex, '<mark class="bg-yellow-500/30 text-yellow-200 rounded-sm px-0.5">$1</mark>');
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function handleAreaContextMenu(e: MouseEvent): void {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.closest('.bookmark-block') || target.closest('.bookmark-item')) return;

    contextMenu = {
      x: e.clientX,
      y: e.clientY,
      items: [
        { id: 'create-block', label: '创建书签块' },
        { id: 'create-bookmark', label: '创建书签' },
      ],
      onSelect: (id) => {
        if (id === 'create-block') {
          addBlock({ name: '新书签块' });
        } else if (id === 'create-bookmark') {
          const blocks = getBlocks();
          if (blocks.length > 0) {
            addBookmark(blocks[0].id, {
              title: '新书签',
              url: 'https://example.com',
            });
          } else {
            addBlock({ name: '默认' });
            setTimeout(() => {
              const newBlocks = getBlocks();
              if (newBlocks.length > 0) {
                addBookmark(newBlocks[0].id, {
                  title: '新书签',
                  url: 'https://example.com',
                });
              }
            }, 0);
          }
        }
      },
    };
  }

  function handleBlockContextMenu(e: MouseEvent, block: BookmarkBlock): void {
    e.preventDefault();
    e.stopPropagation();

    contextMenu = {
      x: e.clientX,
      y: e.clientY,
      items: [
        { id: 'edit-block', label: '编辑块' },
        { id: 'delete-block', label: '删除块' },
        { id: 'separator-1', label: '', separator: true },
        { id: 'add-bookmark', label: '添加书签' },
      ],
      onSelect: (id) => {
        if (id === 'edit-block') {
          quickConfig = { block, x: e.clientX, y: e.clientY };
        } else if (id === 'delete-block') {
          removeBlock(block.id);
        } else if (id === 'add-bookmark') {
          addBookmark(block.id, { title: '新书签', url: 'https://example.com' });
        }
      },
    };
  }

  function handleBookmarkContextMenu(e: MouseEvent, bookmark: Bookmark, blockId: string): void {
    e.preventDefault();
    e.stopPropagation();

    contextMenu = {
      x: e.clientX,
      y: e.clientY,
      items: [
        { id: 'quick-edit', label: '快速编辑' },
        { id: 'separator-1', label: '', separator: true },
        { id: 'open-new-tab', label: '在新标签页打开' },
        { id: 'copy-url', label: '复制 URL' },
        { id: 'separator-2', label: '', separator: true },
        { id: 'delete-bookmark', label: '删除书签' },
      ],
      onSelect: (id) => {
        if (id === 'quick-edit') {
          quickEdit = { bookmark, blockId, x: e.clientX, y: e.clientY };
        } else if (id === 'open-new-tab') {
          window.open(bookmark.url, '_blank');
        } else if (id === 'copy-url') {
          navigator.clipboard.writeText(bookmark.url);
        } else if (id === 'delete-bookmark') {
          removeBookmark(blockId, bookmark.id);
        }
      },
    };
  }

  function handleQuickEdit(bookmark: Bookmark, blockId: string): void {
    quickEdit = { bookmark, blockId, x: window.innerWidth / 2 - 160, y: window.innerHeight / 2 - 150 };
  }

  function handleQuickConfig(block: BookmarkBlock): void {
    quickConfig = { block, x: window.innerWidth / 2 - 144, y: window.innerHeight / 2 - 100 };
  }

  function getBlocks(): BookmarkBlock[] {
    let blocks: BookmarkBlock[] = [];
    bookmarkBlocks.subscribe((v) => (blocks = v))();
    return blocks;
  }
</script>

<div
  class="bookmark-area"
  oncontextmenu={handleAreaContextMenu}
  role="region"
  aria-label="书签区域"
>
  <div class="flex items-center justify-between mb-4">
    <WorkspaceTabs />
    <SearchBox
      onResults={(results, query) => { searchResults = results; searchQueryText = query ?? ''; }}
      onClear={() => { searchResults = null; searchQueryText = ''; }}
    />
  </div>

  {#if searchResults !== null}
    <div class="mb-jnt-4">
      <h3 class="text-jnt-sm text-jnt-text-tertiary mb-jnt-2">搜索结果 ({searchResults.length})</h3>
      {#if searchResults.length === 0}
        <p class="text-jnt-text-placeholder text-jnt-sm">未找到匹配的书签</p>
      {:else}
        <div class="space-y-1">
          {#each searchResults as result (result.id)}
            {#if result.url}
              <a
                href={result.url}
                class="flex items-center gap-jnt-2 px-jnt-3 py-jnt-2 rounded-jnt-lg hover:bg-jnt-bg-elevated/50 text-jnt-sm text-jnt-text-secondary"
              >
                <span class="truncate">{@html highlightMatch(result.title ?? '', searchQueryText)}</span>
                <span class="text-jnt-text-placeholder text-jnt-xs truncate">{@html highlightMatch(result.url, searchQueryText)}</span>
              </a>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  {:else if $bookmarkBlocks.length === 0}
    <div class="flex flex-col items-center justify-center py-20 text-jnt-text-placeholder">
      <svg class="w-16 h-16 mb-jnt-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <p class="text-jnt-lg mb-1">右键呼出菜单创建书签</p>
      <p class="text-jnt-sm">在此区域右键点击创建书签块或书签</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each $bookmarkBlocks as block (block.id)}
        <BookmarkBlockComponent
          {block}
          onContextMenu={handleBlockContextMenu}
          onBookmarkContextMenu={handleBookmarkContextMenu}
          onQuickEdit={handleQuickEdit}
          onQuickConfig={handleQuickConfig}
        />
      {/each}
    </div>
  {/if}
</div>

{#if contextMenu}
  <ContextMenu
    items={contextMenu.items}
    x={contextMenu.x}
    y={contextMenu.y}
    onSelect={contextMenu.onSelect}
    onClose={() => { contextMenu = null; }}
  />
{/if}

{#if quickEdit}
  <QuickEdit
    bookmark={quickEdit.bookmark}
    blockId={quickEdit.blockId}
    x={quickEdit.x}
    y={quickEdit.y}
    onClose={() => { quickEdit = null; }}
  />
{/if}

{#if quickConfig}
  <QuickConfig
    block={quickConfig.block}
    x={quickConfig.x}
    y={quickConfig.y}
    onClose={() => { quickConfig = null; }}
  />
{/if}
