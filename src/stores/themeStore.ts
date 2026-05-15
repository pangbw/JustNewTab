import { writable } from "svelte/store";

export type Theme = "light" | "dark";

const STORAGE_KEY = "justnewtab_theme";

function detectSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
}

function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // Storage unavailable
  }
  return detectSystemTheme();
}

function applyTheme(theme: Theme): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export const currentTheme = writable<Theme>(loadTheme());

// Apply theme on initialization
applyTheme(loadTheme());

currentTheme.subscribe((theme) => {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage unavailable
  }
});

export function toggleTheme(): void {
  currentTheme.update((theme) => (theme === "dark" ? "light" : "dark"));
}

export function setTheme(theme: Theme): void {
  currentTheme.set(theme);
}

// Listen for system theme changes
if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      // Only update if user hasn't manually set a preference
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          currentTheme.set(e.matches ? "light" : "dark");
        }
      } catch {
        // Storage unavailable
      }
    });
}
