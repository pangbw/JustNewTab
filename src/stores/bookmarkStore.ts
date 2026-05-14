import { writable } from 'svelte/store';
import type {
  BookmarkBlock,
  Bookmark,
  BookmarkBlockCreateInput,
  BookmarkBlockUpdateInput,
  BookmarkCreateInput,
  BookmarkUpdateInput,
} from '@/types/bookmark';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const DEFAULT_BLOCK_COLOR = '#6366f1';

export const bookmarkBlocks = writable<BookmarkBlock[]>([]);

export function addBlock(input: BookmarkBlockCreateInput): void {
  bookmarkBlocks.update((blocks) => [
    ...blocks,
    {
      id: generateId(),
      name: input.name,
      color: input.color ?? DEFAULT_BLOCK_COLOR,
      icon: input.icon,
      layout: input.layout ?? 'list',
      isCollapsed: false,
      bookmarks: [],
      position: { x: 0, y: blocks.length },
    },
  ]);
}

export function updateBlock(blockId: string, input: BookmarkBlockUpdateInput): void {
  bookmarkBlocks.update((blocks) =>
    blocks.map((block) =>
      block.id === blockId ? { ...block, ...input } : block
    )
  );
}

export function removeBlock(blockId: string): void {
  bookmarkBlocks.update((blocks) => blocks.filter((block) => block.id !== blockId));
}

export function addBookmark(blockId: string, input: BookmarkCreateInput): void {
  bookmarkBlocks.update((blocks) =>
    blocks.map((block) =>
      block.id === blockId
        ? {
            ...block,
            bookmarks: [
              ...block.bookmarks,
              {
                id: generateId(),
                title: input.title,
                url: input.url,
                description: input.description,
                displayTitle: input.displayTitle,
              },
            ],
          }
        : block
    )
  );
}

export function updateBookmark(
  blockId: string,
  bookmarkId: string,
  input: BookmarkUpdateInput
): void {
  bookmarkBlocks.update((blocks) =>
    blocks.map((block) =>
      block.id === blockId
        ? {
            ...block,
            bookmarks: block.bookmarks.map((bm) =>
              bm.id === bookmarkId ? { ...bm, ...input } : bm
            ),
          }
        : block
    )
  );
}

export function removeBookmark(blockId: string, bookmarkId: string): void {
  bookmarkBlocks.update((blocks) =>
    blocks.map((block) =>
      block.id === blockId
        ? {
            ...block,
            bookmarks: block.bookmarks.filter((bm) => bm.id !== bookmarkId),
          }
        : block
    )
  );
}

export function toggleBlockCollapse(blockId: string): void {
  bookmarkBlocks.update((blocks) =>
    blocks.map((block) =>
      block.id === blockId ? { ...block, isCollapsed: !block.isCollapsed } : block
    )
  );
}

export function reorderBlocks(orderedIds: string[]): void {
  bookmarkBlocks.update((blocks) => {
    const map = new Map(blocks.map((b) => [b.id, b]));
    return orderedIds
      .map((id) => map.get(id))
      .filter((b): b is BookmarkBlock => b !== undefined);
  });
}
