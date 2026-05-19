import { writable, derived } from "svelte/store";
import { activeWorkspaceId, workspaces } from "./workspaceStore";
import type {
  BookmarkBlock,
  Bookmark,
  BookmarkBlockCreateInput,
  BookmarkBlockUpdateInput,
  BookmarkCreateInput,
  BookmarkUpdateInput,
} from "@/types/bookmark";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const DEFAULT_BLOCK_COLOR = "#6366f1";

// Derived store that shows blocks for the active workspace
export const bookmarkBlocks = derived(
  [workspaces, activeWorkspaceId],
  ([$workspaces, $activeWorkspaceId]) => {
    const activeWs = $workspaces.find((ws) => ws.id === $activeWorkspaceId);
    return activeWs?.blocks ?? [];
  },
);

export function addBlock(input: BookmarkBlockCreateInput): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: [
            ...ws.blocks,
            {
              id: generateId(),
              name: input.name,
              color: input.color ?? DEFAULT_BLOCK_COLOR,
              icon: input.icon,
              layout: input.layout ?? "list",
              isCollapsed: false,
              bookmarks: [],
              position: { x: 0, y: ws.blocks.length },
            },
          ],
        };
      }
      return ws;
    });
  });
}

export function updateBlock(
  blockId: string,
  input: BookmarkBlockUpdateInput,
): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.map((block) =>
            block.id === blockId ? { ...block, ...input } : block,
          ),
        };
      }
      return ws;
    });
  });
}

export function removeBlock(blockId: string): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.filter((block) => block.id !== blockId),
        };
      }
      return ws;
    });
  });
}

export function addBookmark(blockId: string, input: BookmarkCreateInput): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.map((block) =>
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
              : block,
          ),
        };
      }
      return ws;
    });
  });
}

export function updateBookmark(
  blockId: string,
  bookmarkId: string,
  input: BookmarkUpdateInput,
): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  bookmarks: block.bookmarks.map((bm) =>
                    bm.id === bookmarkId ? { ...bm, ...input } : bm,
                  ),
                }
              : block,
          ),
        };
      }
      return ws;
    });
  });
}

export function removeBookmark(blockId: string, bookmarkId: string): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.map((block) =>
            block.id === blockId
              ? {
                  ...block,
                  bookmarks: block.bookmarks.filter((bm) => bm.id !== bookmarkId),
                }
              : block,
          ),
        };
      }
      return ws;
    });
  });
}

export function toggleBlockCollapse(blockId: string): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        return {
          ...ws,
          blocks: ws.blocks.map((block) =>
            block.id === blockId
              ? { ...block, isCollapsed: !block.isCollapsed }
              : block,
          ),
        };
      }
      return ws;
    });
  });
}

export function reorderBlocks(orderedIds: string[]): void {
  workspaces.update((wsList) => {
    const activeId = get_current_active_id();
    return wsList.map((ws) => {
      if (ws.id === activeId) {
        const map = new Map(ws.blocks.map((b) => [b.id, b]));
        const reorderedBlocks = orderedIds
          .map((id) => map.get(id))
          .filter((b): b is BookmarkBlock => b !== undefined);
        return { ...ws, blocks: reorderedBlocks };
      }
      return ws;
    });
  });
}

// Helper to get current active workspace ID synchronously
function get_current_active_id(): string {
  let value = "";
  activeWorkspaceId.subscribe((v) => (value = v))();
  return value;
}
