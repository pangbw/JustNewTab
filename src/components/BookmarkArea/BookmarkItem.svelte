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

  function handleClick(e: MouseEvent): void {
    if (e.ctrlKey || e.metaKey) {
      window.open(bookmark.url, '_blank');
    } else if (e.shiftKey) {
      window.open(bookmark.url, '_blank', 'noopener');
    } else {
      window.location.href = bookmark.url;
    }
  }

  function handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    onContextMenu?.(e, bookmark);
  }

  function handleCloseTab(e: MouseEvent): void {
    e.stopPropagation();
    browser.tabs.query({ url: bookmark.url }).then((tabs) => {
      if (tabs[0]?.id) closeTab(tabs[0].id);
    });
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
  class="bookmark-item group {isOpen ? 'is-open' : ''}"
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
    <img src={bookmark.favicon} alt="" class="w-4 h-4 rounded-sm" loading="lazy" />
  {:else}
    <div class="w-4 h-4 rounded-sm bg-jnt-bg-elevated flex items-center justify-center text-[10px] text-jnt-text-tertiary">
      {displayTitle.charAt(0).toUpperCase()}
    </div>
  {/if}

  <span class="text-jnt-sm text-jnt-text-secondary truncate flex-1">{displayTitle}</span>

  {#if isOpen}
    <button
      class="close-btn opacity-0 group-hover:opacity-100 text-jnt-text-tertiary hover:text-jnt-error transition-opacity p-0.5"
      onclick={handleCloseTab}
      aria-label="关闭标签页"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  {/if}
</div>
