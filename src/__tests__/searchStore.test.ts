import { describe, it, expect, beforeEach, vi } from "vitest";
import { get } from "svelte/store";
import {
  searchQuery,
  searchHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
  clearSearchState,
} from "@/stores/searchStore";

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((k) => delete store[k]);
  }),
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("searchStore", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    searchQuery.set("");
    searchHistory.set([]);
  });

  describe("searchQuery", () => {
    it("should initialize as empty string", () => {
      expect(get(searchQuery)).toBe("");
    });

    it("should persist query to localStorage", () => {
      searchQuery.set("test query");

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "justnewtab_search_query",
        "test query",
      );
    });

    it("should remove from localStorage when cleared", () => {
      searchQuery.set("");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "justnewtab_search_query",
      );
    });
  });

  describe("addToHistory", () => {
    it("should add a query to history", () => {
      addToHistory("search term");

      const history = get(searchHistory);
      expect(history).toEqual(["search term"]);
    });

    it("should move duplicate to front", () => {
      addToHistory("first");
      addToHistory("second");
      addToHistory("first");

      const history = get(searchHistory);
      expect(history).toEqual(["first", "second"]);
    });

    it("should limit history to 5 items", () => {
      for (let i = 1; i <= 6; i++) {
        addToHistory(`query ${i}`);
      }

      const history = get(searchHistory);
      expect(history).toHaveLength(5);
      expect(history[0]).toBe("query 6");
      expect(history[4]).toBe("query 2");
    });

    it("should ignore empty queries", () => {
      addToHistory("");
      addToHistory("   ");

      expect(get(searchHistory)).toEqual([]);
    });

    it("should trim queries before storing", () => {
      addToHistory("  hello  ");

      expect(get(searchHistory)).toEqual(["hello"]);
    });
  });

  describe("removeFromHistory", () => {
    it("should remove a specific item", () => {
      searchHistory.set(["first", "second", "third"]);

      removeFromHistory("second");

      const history = get(searchHistory);
      expect(history).toEqual(["first", "third"]);
    });

    it("should do nothing for non-existent item", () => {
      addToHistory("first");
      removeFromHistory("nonexistent");

      expect(get(searchHistory)).toEqual(["first"]);
    });
  });

  describe("clearHistory", () => {
    it("should clear all history", () => {
      addToHistory("first");
      addToHistory("second");

      clearHistory();

      expect(get(searchHistory)).toEqual([]);
    });
  });

  describe("clearSearchState", () => {
    it("should clear query", () => {
      searchQuery.set("test");
      clearSearchState();

      expect(get(searchQuery)).toBe("");
    });

    it("should remove query from localStorage", () => {
      clearSearchState();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "justnewtab_search_query",
      );
    });
  });

  describe("persistence", () => {
    it("should persist history to localStorage", () => {
      addToHistory("test");

      // The store subscriber persists to localStorage
      const stored = localStorage.getItem("justnewtab_search_history");
      expect(stored).toBeTruthy();
      if (stored) {
        expect(JSON.parse(stored)).toEqual(["test"]);
      }
    });

    it("should persist query to localStorage on set", () => {
      searchQuery.set("my search");

      const stored = localStorage.getItem("justnewtab_search_query");
      expect(stored).toBe("my search");
    });
  });
});
