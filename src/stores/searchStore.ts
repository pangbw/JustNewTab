import { writable, derived } from "svelte/store";

const STORAGE_KEY_QUERY = "justnewtab_search_query";
const STORAGE_KEY_HISTORY = "justnewtab_search_history";
const MAX_HISTORY = 5;

function loadQuery(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_QUERY) ?? "";
  } catch {
    return "";
  }
}

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const searchQuery = writable<string>(loadQuery());
export const searchHistory = writable<string[]>(loadHistory());

searchQuery.subscribe((value) => {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY_QUERY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY_QUERY);
    }
  } catch {
    // Storage unavailable
  }
});

searchHistory.subscribe((value) => {
  try {
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(value));
  } catch {
    // Storage unavailable
  }
});

export function addToHistory(query: string): void {
  const trimmed = query.trim();
  if (!trimmed) return;

  searchHistory.update((history) => {
    const filtered = history.filter((h) => h !== trimmed);
    return [trimmed, ...filtered].slice(0, MAX_HISTORY);
  });
}

export function removeFromHistory(query: string): void {
  searchHistory.update((history) => history.filter((h) => h !== query));
}

export function clearHistory(): void {
  searchHistory.set([]);
}

export function clearSearchState(): void {
  searchQuery.set("");
  try {
    localStorage.removeItem(STORAGE_KEY_QUERY);
  } catch {
    // Storage unavailable
  }
}
