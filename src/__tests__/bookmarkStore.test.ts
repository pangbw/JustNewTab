import { describe, it, expect, beforeEach } from "vitest";
import { get } from "svelte/store";
import {
  bookmarkBlocks,
  addBlock,
  updateBlock,
  removeBlock,
  addBookmark,
  updateBookmark,
  removeBookmark,
  reorderBlocks,
  toggleBlockCollapse,
} from "@/stores/bookmarkStore";
import type { BookmarkBlock } from "@/types/bookmark";

describe("bookmarkStore", () => {
  beforeEach(() => {
    bookmarkBlocks.set([]);
  });

  describe("addBlock", () => {
    it("should add a new block", () => {
      addBlock({ name: "Favorites", color: "#3b82f6" });

      const blocks = get(bookmarkBlocks);
      expect(blocks).toHaveLength(1);
      expect(blocks[0].name).toBe("Favorites");
      expect(blocks[0].color).toBe("#3b82f6");
      expect(blocks[0].isCollapsed).toBe(false);
      expect(blocks[0].bookmarks).toEqual([]);
      expect(blocks[0].id).toBeDefined();
    });

    it("should add block with default color", () => {
      addBlock({ name: "Work" });

      const blocks = get(bookmarkBlocks);
      expect(blocks[0].color).toBe("#6366f1");
    });

    it("should add multiple blocks", () => {
      addBlock({ name: "Block 1" });
      addBlock({ name: "Block 2" });

      const blocks = get(bookmarkBlocks);
      expect(blocks).toHaveLength(2);
      expect(blocks[0].name).toBe("Block 1");
      expect(blocks[1].name).toBe("Block 2");
    });

    it("should add block with icon", () => {
      addBlock({ name: "Favorites", icon: "⭐" });

      const blocks = get(bookmarkBlocks);
      expect(blocks[0].icon).toBe("⭐");
    });

    it("should add block with layout option", () => {
      addBlock({ name: "Grid Block", layout: "grid" });

      const blocks = get(bookmarkBlocks);
      expect(blocks[0].layout).toBe("grid");
    });

    it("should default to list layout", () => {
      addBlock({ name: "Default Block" });

      const blocks = get(bookmarkBlocks);
      expect(blocks[0].layout).toBe("list");
    });
  });

  describe("updateBlock", () => {
    it("should update block name", () => {
      addBlock({ name: "Old Name" });
      const blocks = get(bookmarkBlocks);
      updateBlock(blocks[0].id, { name: "New Name" });

      const updated = get(bookmarkBlocks);
      expect(updated[0].name).toBe("New Name");
    });

    it("should update block color", () => {
      addBlock({ name: "Test", color: "#ef4444" });
      const blocks = get(bookmarkBlocks);
      updateBlock(blocks[0].id, { color: "#10b981" });

      const updated = get(bookmarkBlocks);
      expect(updated[0].color).toBe("#10b981");
    });

    it("should update block icon", () => {
      addBlock({ name: "Test" });
      const blocks = get(bookmarkBlocks);
      updateBlock(blocks[0].id, { icon: "🚀" });

      const updated = get(bookmarkBlocks);
      expect(updated[0].icon).toBe("🚀");
    });

    it("should update block layout", () => {
      addBlock({ name: "Test" });
      const blocks = get(bookmarkBlocks);
      updateBlock(blocks[0].id, { layout: "grid" });

      const updated = get(bookmarkBlocks);
      expect(updated[0].layout).toBe("grid");
    });

    it("should not modify original array", () => {
      addBlock({ name: "Test" });
      const original = get(bookmarkBlocks);
      updateBlock(original[0].id, { name: "Updated" });

      expect(original[0].name).toBe("Test");
    });
  });

  describe("removeBlock", () => {
    it("should remove a block by id", () => {
      addBlock({ name: "Block 1" });
      addBlock({ name: "Block 2" });
      const blocks = get(bookmarkBlocks);

      removeBlock(blocks[0].id);

      const remaining = get(bookmarkBlocks);
      expect(remaining).toHaveLength(1);
      expect(remaining[0].name).toBe("Block 2");
    });

    it("should do nothing when removing non-existent block", () => {
      addBlock({ name: "Block 1" });
      removeBlock("non-existent-id");

      expect(get(bookmarkBlocks)).toHaveLength(1);
    });
  });

  describe("addBookmark", () => {
    it("should add a bookmark to a block", () => {
      addBlock({ name: "Test Block" });
      const blocks = get(bookmarkBlocks);

      addBookmark(blocks[0].id, {
        title: "Google",
        url: "https://google.com",
      });

      const updated = get(bookmarkBlocks);
      expect(updated[0].bookmarks).toHaveLength(1);
      expect(updated[0].bookmarks[0].title).toBe("Google");
      expect(updated[0].bookmarks[0].url).toBe("https://google.com");
      expect(updated[0].bookmarks[0].id).toBeDefined();
    });

    it("should add bookmark with optional fields", () => {
      addBlock({ name: "Test Block" });
      const blocks = get(bookmarkBlocks);

      addBookmark(blocks[0].id, {
        title: "GitHub",
        url: "https://github.com",
        description: "Code hosting",
        displayTitle: "GH",
      });

      const updated = get(bookmarkBlocks);
      expect(updated[0].bookmarks[0].description).toBe("Code hosting");
      expect(updated[0].bookmarks[0].displayTitle).toBe("GH");
    });
  });

  describe("updateBookmark", () => {
    it("should update bookmark title", () => {
      addBlock({ name: "Test" });
      const blocks = get(bookmarkBlocks);
      addBookmark(blocks[0].id, { title: "Old", url: "https://example.com" });

      const updated = get(bookmarkBlocks);
      const bookmarkId = updated[0].bookmarks[0].id;
      updateBookmark(blocks[0].id, bookmarkId, { title: "New" });

      const final = get(bookmarkBlocks);
      expect(final[0].bookmarks[0].title).toBe("New");
    });
  });

  describe("removeBookmark", () => {
    it("should remove a bookmark from a block", () => {
      addBlock({ name: "Test" });
      let blocks = get(bookmarkBlocks);
      addBookmark(blocks[0].id, { title: "B1", url: "https://b1.com" });
      addBookmark(blocks[0].id, { title: "B2", url: "https://b2.com" });

      blocks = get(bookmarkBlocks);
      const bookmarkId = blocks[0].bookmarks[0].id;
      removeBookmark(blocks[0].id, bookmarkId);

      const final = get(bookmarkBlocks);
      expect(final[0].bookmarks).toHaveLength(1);
      expect(final[0].bookmarks[0].title).toBe("B2");
    });
  });

  describe("toggleBlockCollapse", () => {
    it("should toggle collapsed state", () => {
      addBlock({ name: "Test" });
      const blocks = get(bookmarkBlocks);

      expect(blocks[0].isCollapsed).toBe(false);

      toggleBlockCollapse(blocks[0].id);
      expect(get(bookmarkBlocks)[0].isCollapsed).toBe(true);

      toggleBlockCollapse(blocks[0].id);
      expect(get(bookmarkBlocks)[0].isCollapsed).toBe(false);
    });
  });

  describe("reorderBlocks", () => {
    it("should reorder blocks", () => {
      addBlock({ name: "Block 1" });
      addBlock({ name: "Block 2" });
      addBlock({ name: "Block 3" });

      const blocks = get(bookmarkBlocks);
      const ids = blocks.map((b) => b.id);
      const reordered = [ids[2], ids[0], ids[1]];

      reorderBlocks(reordered);

      const result = get(bookmarkBlocks);
      expect(result[0].name).toBe("Block 3");
      expect(result[1].name).toBe("Block 1");
      expect(result[2].name).toBe("Block 2");
    });
  });
});
