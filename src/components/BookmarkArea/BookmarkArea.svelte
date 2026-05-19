<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { bookmarkBlocks, addBlock, addBookmark, reorderBlocks, removeBlock, removeBookmark } from '@/stores/bookmarkStore';
  import { initializeWorkspace, activeWorkspace, activeWorkspaceId, setActiveWorkspace } from '@/stores/workspaceStore';
  import { clearSearchState } from '@/stores/searchStore';
  import { refreshOpenTabs } from '@/stores/tabStore';
  import { endDrag, cancelDrag } from '@/stores/dragStore';
  import type { BookmarkBlock, Bookmark } from '@/types/bookmark';
  import BookmarkBlockComponent from './BookmarkBlock.svelte';
  import ContextMenu from './ContextMenu.svelte';
  import QuickEdit from './QuickEdit.svelte';
  import QuickConfig from './QuickConfig.svelte';
  import BookmarkDialog from './BookmarkDialog.svelte';
  import ConfirmDialog from './ConfirmDialog.svelte';
  import type { BookmarkTreeNode } from '@/adapters/bookmarkAdapter';

  interface Props {
    searchResults?: BookmarkTreeNode[] | null;
    searchQueryText?: string;
  }

  const { searchResults = null, searchQueryText = '' }: Props = $props();

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

  // Bookmark dialog state
  let bookmarkDialog = $state<{
    blockId?: string;
  } | null>(null);

  // Confirm dialog state
  let confirmDialog = $state<{
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Search highlight state
  let searchBlockIds = $state<Set<string>>(new Set());

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
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.closest('.bookmark-block') || target.closest('.bookmark-item')) return;

    // Close existing menu first
    contextMenu = null;

    // Use setTimeout to ensure the old menu is closed before opening new one
    setTimeout(() => {
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
            // Use get() to get the latest value from the derived store
            const currentBlocks = $bookmarkBlocks;
            if (currentBlocks.length > 0) {
              bookmarkDialog = { blockId: currentBlocks[0].id };
            } else {
              addBlock({ name: '默认' });
              setTimeout(() => {
                const newBlocks = $bookmarkBlocks;
                if (newBlocks.length > 0) {
                  bookmarkDialog = { blockId: newBlocks[0].id };
                }
              }, 50);
            }
          }
        },
      };
    }, 0);
  }

  function handleBlockContextMenu(e: MouseEvent, block: BookmarkBlock): void {
    e.preventDefault();
    e.stopPropagation();

    // Close existing menu first
    contextMenu = null;

    // Use setTimeout to ensure the old menu is closed before opening new one
    setTimeout(() => {
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
            quickConfig = { block, x: window.innerWidth / 2 - 144, y: window.innerHeight / 2 - 100 };
          } else if (id === 'delete-block') {
            removeBlock(block.id);
          } else if (id === 'add-bookmark') {
            bookmarkDialog = { blockId: block.id };
          }
        },
      };
    }, 0);
  }

  function handleBookmarkContextMenu(e: MouseEvent, bookmark: Bookmark, blockId: string): void {
    e.preventDefault();
    e.stopPropagation();

    // Close existing menu first
    contextMenu = null;

    // Use setTimeout to ensure the old menu is closed before opening new one
    setTimeout(() => {
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
            confirmDialog = {
              message: `确定要删除书签「${bookmark.title}」吗？此操作不可撤销。`,
              onConfirm: () => {
                removeBookmark(blockId, bookmark.id);
                confirmDialog = null;
              },
            };
          }
        },
      };
    }, 0);
  }

  function handleQuickEdit(bookmark: Bookmark, blockId: string): void {
    quickEdit = { bookmark, blockId, x: window.innerWidth / 2 - 160, y: window.innerHeight / 2 - 150 };
  }

  function handleQuickConfig(block: BookmarkBlock): void {
    quickConfig = { block, x: window.innerWidth / 2 - 144, y: window.innerHeight / 2 - 100 };
  }

  function handleReorder(sourceId: string, targetId: string): void {
    const blocks = getBlocks();
    const sourceIndex = blocks.findIndex((b) => b.id === sourceId);
    const targetIndex = blocks.findIndex((b) => b.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(sourceIndex, 1);
    newBlocks.splice(targetIndex, 0, movedBlock);

    reorderBlocks(newBlocks.map((b) => b.id));
  }

  function getBlocks(): BookmarkBlock[] {
    let blocks: BookmarkBlock[] = [];
    bookmarkBlocks.subscribe((v) => (blocks = v))();
    return blocks;
  }
</script>

<div
  class="bookmark-area h-full flex flex-col"
  oncontextmenu={handleAreaContextMenu}
  role="region"
  aria-label="书签区域"
>
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
      <p class="text-jnt-text-base mb-jnt-1">右键呼出菜单创建书签</p>
      <p class="text-jnt-text-sm">在此区域右键点击创建书签块或书签</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-jnt-4">
      {#each $bookmarkBlocks as block (block.id)}
        <BookmarkBlockComponent
          {block}
          onContextMenu={handleBlockContextMenu}
          onBookmarkContextMenu={handleBookmarkContextMenu}
          onQuickEdit={handleQuickEdit}
          onQuickConfig={handleQuickConfig}
          onReorder={handleReorder}
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

{#if bookmarkDialog}
  <BookmarkDialog
    onSave={(title, url) => {
      if (bookmarkDialog?.blockId) {
        addBookmark(bookmarkDialog.blockId, { title, url });
      }
      bookmarkDialog = null;
    }}
    onCancel={() => { bookmarkDialog = null; }}
  />
{/if}

{#if confirmDialog}
  <ConfirmDialog
    message={confirmDialog.message}
    onConfirm={confirmDialog.onConfirm}
    onCancel={() => { confirmDialog = null; }}
  />
{/if}
