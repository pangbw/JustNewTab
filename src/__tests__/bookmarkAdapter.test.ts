import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBookmarkTree,
  searchBookmarks,
  createBookmark,
  removeBookmark,
  updateBookmark,
} from '@/adapters/bookmarkAdapter';

const mockBookmarks = [
  {
    id: '1',
    title: 'Root',
    children: [
      {
        id: '2',
        title: 'Folder',
        children: [
          { id: '3', title: 'Google', url: 'https://google.com' },
          { id: '4', title: 'GitHub', url: 'https://github.com' },
        ],
      },
    ],
  },
];

vi.mock('webextension-polyfill', () => ({
  default: {
    bookmarks: {
      getTree: vi.fn(() => Promise.resolve(mockBookmarks)),
      search: vi.fn(() =>
        Promise.resolve([
          { id: '3', title: 'Google', url: 'https://google.com' },
        ])
      ),
      create: vi.fn((input) =>
        Promise.resolve({ id: 'new-id', ...input })
      ),
      remove: vi.fn(() => Promise.resolve()),
      update: vi.fn((id, changes) =>
        Promise.resolve({ id, ...changes })
      ),
    },
  },
}));

describe('bookmarkAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBookmarkTree', () => {
    it('should return bookmark tree', async () => {
      const tree = await getBookmarkTree();

      expect(tree).toBeDefined();
      expect(tree.length).toBeGreaterThan(0);
    });
  });

  describe('searchBookmarks', () => {
    it('should search bookmarks', async () => {
      const results = await searchBookmarks('google');

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Google');
    });

    it('should return empty array for no results', async () => {
      const browser = (await import('webextension-polyfill')).default;
      (browser.bookmarks.search as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
        []
      );

      const results = await searchBookmarks('nonexistent');
      expect(results).toHaveLength(0);
    });
  });

  describe('createBookmark', () => {
    it('should create a bookmark', async () => {
      const result = await createBookmark({
        parentId: '2',
        title: 'New Site',
        url: 'https://newsite.com',
      });

      expect(result.id).toBe('new-id');
      expect(result.title).toBe('New Site');
    });
  });

  describe('removeBookmark', () => {
    it('should remove a bookmark', async () => {
      await removeBookmark('3');

      const browser = (await import('webextension-polyfill')).default;
      expect(browser.bookmarks.remove).toHaveBeenCalledWith('3');
    });
  });

  describe('updateBookmark', () => {
    it('should update a bookmark', async () => {
      const result = await updateBookmark('3', { title: 'Updated' });

      expect(result.title).toBe('Updated');
    });
  });
});
