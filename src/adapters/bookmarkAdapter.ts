import browser from 'webextension-polyfill';
import type { Bookmarks } from 'webextension-polyfill';

export interface BookmarkTreeNode {
  id: string;
  title: string;
  url?: string;
  parentId?: string;
  children?: BookmarkTreeNode[];
}

export interface CreateBookmarkInput {
  parentId?: string;
  title: string;
  url?: string;
  index?: number;
}

export interface UpdateBookmarkInput {
  title?: string;
  url?: string;
}

export async function getBookmarkTree(): Promise<BookmarkTreeNode[]> {
  const tree = await browser.bookmarks.getTree();
  return tree as BookmarkTreeNode[];
}

export async function searchBookmarks(query: string): Promise<BookmarkTreeNode[]> {
  const results = await browser.bookmarks.search(query);
  return results as BookmarkTreeNode[];
}

export async function createBookmark(input: CreateBookmarkInput): Promise<BookmarkTreeNode> {
  const result = await browser.bookmarks.create({
    parentId: input.parentId,
    title: input.title,
    url: input.url,
    index: input.index,
  });
  return result as BookmarkTreeNode;
}

export async function removeBookmark(bookmarkId: string): Promise<void> {
  await browser.bookmarks.remove(bookmarkId);
}

export async function updateBookmark(
  bookmarkId: string,
  changes: UpdateBookmarkInput
): Promise<BookmarkTreeNode> {
  const result = await browser.bookmarks.update(bookmarkId, {
    title: changes.title,
    url: changes.url,
  });
  return result as BookmarkTreeNode;
}
