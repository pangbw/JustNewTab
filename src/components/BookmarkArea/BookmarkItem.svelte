<script lang="ts">
  import type { Bookmark } from '@/types/bookmark';
  import { isUrlOpen, closeTab } from '@/stores/tabStore';
  import { startDrag, updateDragTarget } from '@/stores/dragStore';
  import browser from 'webextension-polyfill';

  interface Props {
    bookmark: Bookmark;
    blockId: string;
    onContextMenu?: (e: MouseEvent, bookmark: Bookmark) => void;
    onQuickEdit?: (bookmark: Bookmark) => void;
  }

  const { bookmark, blockId, onContextMenu, onQuickEdit }: Props = $props();

  const isOpen = $derived(isUrlOpen(bookmark.url));
  const displayTitle = $derived(bookmark.displayTitle ?? bookmark.title);

  let isLoading = $state(false);
  let errorMsg = $state<string | null>(null);

  function handleClick(e: MouseEvent): void {
    errorMsg = null;
    if (e.ctrlKey || e.metaKey) {
      window.open(bookmark.url, '_blank');
    } else if (e.shiftKey) {
      window.open(bookmark.url, '_blank', 'noopener');
    } else {
      try {
        isLoading = true;
        window.location.href = bookmark.url;
      } catch {
        isLoading = false;
        errorMsg = '打开书签失败';
      }
    }
  }

  function handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu?.(e, bookmark);
  }

  function handleCloseTab(e: MouseEvent): void {
    e.stopPropagation();
    browser.tabs.query({ url: bookmark.url }).then((tabs) => {
      if (tabs[0]?.id) closeTab(tabs[0].id);
    });
  }

  function handleDeleteRequest(e: MouseEvent): void {
    e.stopPropagation();
    onQuickEdit?.(bookmark);
  }

  function handleDragStart(e: DragEvent): void {
    e.dataTransfer?.setData('text/plain', bookmark.id);
    startDrag(bookmark.id);
  }

  function handleDragOver(e: DragEvent): void {
    e.preventDefault();
    updateDragTarget(bookmark.id);
  }

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as MouseEvent);
    }
  }
</script>

<div
  class="bookmark-item group flex items-center gap-jnt-2 px-jnt-3 py-jnt-2 rounded-jnt-lg hover:bg-jnt-bg-elevated/70 hover:shadow-jnt-md cursor-pointer transition-all duration-jnt-fast {isOpen ? 'is-open border-l-[3px] border-jnt-brand-primary bg-jnt-brand-primary/10' : ''}"
  role="link"
  tabindex="0"
  title={bookmark.url}
  draggable="true"
  onclick={handleClick}
  oncontextmenu={handleContextMenu}
  onkeydown={handleKeyDown}
  ondragstart={handleDragStart}
  ondragover={handleDragOver}
>
  {#if bookmark.favicon}
    <img src={bookmark.favicon} alt="" class="w-4 h-4 rounded-jnt-sm" loading="lazy" />
  {:else}
    <div class="w-4 h-4 rounded-jnt-sm bg-jnt-bg-elevated flex items-center justify-center text-[10px] text-jnt-text-tertiary">
      {displayTitle.charAt(0).toUpperCase()}
    </div>
  {/if}

  <span class="text-jnt-text-sm text-jnt-text-secondary truncate flex-1 {isOpen ? 'text-jnt-brand-primary' : ''}">{displayTitle}</span>

  {#if isLoading}
    <svg class="w-3 h-3 animate-spin text-jnt-brand-primary" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  {/if}

  {#if isOpen}
    <button
      class="close-btn opacity-0 group-hover:opacity-100 text-jnt-text-tertiary hover:text-jnt-error transition-opacity duration-jnt-fast p-jnt-1"
      onclick={handleCloseTab}
      title="关闭标签页"
      aria-label="关闭标签页"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}
</div>

{#if errorMsg}
  <div class="text-jnt-color-error text-jnt-text-sm px-jnt-3 py-jnt-1" role="alert">
    {errorMsg}
  </div>
{/if}
