<script lang="ts">
  import type { BookmarkBlock, Bookmark } from '@/types/bookmark';
  import { updateBlock, removeBlock, toggleBlockCollapse, addBookmark } from '@/stores/bookmarkStore';
  import { startDrag, updateDragTarget, endDrag } from '@/stores/dragStore';
  import BookmarkItem from './BookmarkItem.svelte';

  interface Props {
    block: BookmarkBlock;
    onContextMenu?: (e: MouseEvent, block: BookmarkBlock) => void;
    onBookmarkContextMenu?: (e: MouseEvent, bookmark: Bookmark, blockId: string) => void;
    onQuickEdit?: (bookmark: Bookmark, blockId: string) => void;
    onQuickConfig?: (block: BookmarkBlock) => void;
  }

  const { block, onContextMenu, onBookmarkContextMenu, onQuickEdit, onQuickConfig }: Props = $props();

  let isEditing = $state(false);
  let editName = $state('');

  function handleStartEdit(): void {
    isEditing = true;
    editName = block.name;
  }

  function handleSaveEdit(): void {
    if (editName.trim()) {
      updateBlock(block.id, { name: editName.trim() });
    }
    isEditing = false;
  }

  function handleCancelEdit(): void {
    isEditing = false;
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') handleSaveEdit();
    else if (e.key === 'Escape') handleCancelEdit();
  }

  function handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    onContextMenu?.(e, block);
  }

  function handleDragStart(e: DragEvent): void {
    e.dataTransfer?.setData('text/plain', block.id);
    startDrag(block.id);
  }

  function handleDragOver(e: DragEvent): void {
    e.preventDefault();
    updateDragTarget(block.id);
  }

  function handleDrop(e: DragEvent): void {
    e.preventDefault();
    const result = endDrag();
    if (result && result.sourceId !== result.targetId) {
      // Reorder logic handled by parent
    }
  }
</script>

<div
  class="bookmark-block relative"
  style="border-left: 3px solid {block.color}"
  draggable="true"
  ondragstart={handleDragStart}
  ondragover={handleDragOver}
  ondrop={handleDrop}
  oncontextmenu={handleContextMenu}
>
  <div class="flex items-center justify-between mb-jnt-3">
    <div class="flex items-center gap-jnt-2 flex-1 min-w-0">
      <button
        class="text-jnt-text-tertiary hover:text-jnt-text-secondary transition-colors p-0.5"
        onclick={() => toggleBlockCollapse(block.id)}
        aria-label={block.isCollapsed ? '展开' : '收起'}
      >
        <svg
          class="w-4 h-4 transition-transform duration-jnt-normal {block.isCollapsed ? '-rotate-90' : ''}"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {#if isEditing}
        <input
          type="text"
          bind:value={editName}
          class="bg-transparent text-jnt-text-primary font-jnt-medium outline-none flex-1 min-w-0"
          onkeydown={handleKeydown}
          onblur={handleSaveEdit}
          autofocus
        />
      {:else}
        <h3
          class="text-jnt-text-primary font-jnt-medium truncate cursor-pointer"
          ondblclick={handleStartEdit}
        >
          {#if block.icon}<span class="mr-1">{block.icon}</span>{/if}{block.name}
        </h3>
      {/if}
    </div>

    <button
      class="text-jnt-text-tertiary hover:text-jnt-text-secondary transition-colors p-jnt-1 opacity-0 group-hover:opacity-100"
      onclick={() => onQuickConfig?.(block)}
      aria-label="快速配置"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>
  </div>

  {#if !block.isCollapsed}
    <div class={block.layout === 'list' ? 'space-y-jnt-1' : 'grid grid-cols-2 gap-jnt-1'}>
      {#each block.bookmarks as bookmark (bookmark.id)}
        <BookmarkItem
          {bookmark}
          blockId={block.id}
          onContextMenu={(e, bm) => onBookmarkContextMenu?.(e, bm, block.id)}
          onQuickEdit={(bm) => onQuickEdit?.(bm, block.id)}
        />
      {/each}

      {#if block.bookmarks.length === 0}
        <p class="text-jnt-text-placeholder text-jnt-xs text-center py-jnt-2 col-span-2">拖拽书签到此处或右键添加</p>
      {/if}
    </div>
  {/if}
</div>
