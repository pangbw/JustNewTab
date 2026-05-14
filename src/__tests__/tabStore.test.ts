import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
  openUrls,
  isUrlOpen,
  refreshOpenTabs,
  closeTab,
} from '@/stores/tabStore';

// Mock browser.tabs API
const mockTabs = [
  { id: 1, url: 'https://google.com', title: 'Google' },
  { id: 2, url: 'https://github.com', title: 'GitHub' },
  { id: 3, url: 'https://example.com/path/', title: 'Example' },
];

vi.mock('webextension-polyfill', () => ({
  default: {
    tabs: {
      query: vi.fn(() => Promise.resolve(mockTabs)),
      remove: vi.fn(() => Promise.resolve()),
      onCreated: { addListener: vi.fn() },
      onRemoved: { addListener: vi.fn() },
      onUpdated: { addListener: vi.fn() },
    },
  },
}));

describe('tabStore', () => {
  beforeEach(() => {
    openUrls.set(new Set());
  });

  describe('isUrlOpen', () => {
    it('should return true for open URL', () => {
      openUrls.set(new Set(['https://google.com']));

      expect(isUrlOpen('https://google.com')).toBe(true);
    });

    it('should return false for non-open URL', () => {
      openUrls.set(new Set(['https://google.com']));

      expect(isUrlOpen('https://example.com')).toBe(false);
    });

    it('should match ignoring trailing slash', () => {
      openUrls.set(new Set(['https://example.com/path/']));

      expect(isUrlOpen('https://example.com/path')).toBe(true);
    });

    it('should match ignoring protocol difference', () => {
      openUrls.set(new Set(['https://google.com']));

      expect(isUrlOpen('http://google.com')).toBe(true);
    });

    it('should match ignoring fragment', () => {
      openUrls.set(new Set(['https://example.com/page#section']));

      expect(isUrlOpen('https://example.com/page')).toBe(true);
    });
  });

  describe('refreshOpenTabs', () => {
    it('should populate open URLs from tabs', async () => {
      await refreshOpenTabs();

      const urls = get(openUrls);
      expect(urls.size).toBeGreaterThan(0);
    });
  });

  describe('closeTab', () => {
    it('should call browser.tabs.remove', async () => {
      const browser = (await import('webextension-polyfill')).default;

      await closeTab(1);

      expect(browser.tabs.remove).toHaveBeenCalledWith(1);
    });
  });
});
