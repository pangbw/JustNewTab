import { writable } from 'svelte/store';
import browser from 'webextension-polyfill';

export const openUrls = writable<Set<string>>(new Set());

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    let normalized = parsed.hostname + parsed.pathname;
    normalized = normalized.replace(/\/+$/, '');
    return normalized.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

export function isUrlOpen(url: string): boolean {
  let isOpen = false;
  openUrls.subscribe((urls) => {
    const normalized = normalizeUrl(url);
    for (const openUrl of urls) {
      if (normalizeUrl(openUrl) === normalized) {
        isOpen = true;
        break;
      }
    }
  })();
  return isOpen;
}

export async function refreshOpenTabs(): Promise<void> {
  try {
    const tabs = await browser.tabs.query({});
    const urls = new Set(
      tabs
        .map((tab) => tab.url)
        .filter((url): url is string => !!url)
    );
    openUrls.set(urls);
  } catch {
    // Tab query may fail in non-extension context
  }
}

export async function closeTab(tabId: number): Promise<void> {
  await browser.tabs.remove(tabId);
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedRefresh(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    refreshOpenTabs();
  }, 500);
}

// Listen for tab changes
try {
  browser.tabs.onCreated.addListener(debouncedRefresh);
  browser.tabs.onRemoved.addListener(debouncedRefresh);
  browser.tabs.onUpdated.addListener(debouncedRefresh);
} catch {
  // Ignore in non-extension context
}
