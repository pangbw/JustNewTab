export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  favicon?: string;
  isOpen?: boolean;
  displayTitle?: string;
}

export type BlockLayout = "grid" | "list";

export interface BookmarkBlock {
  id: string;
  name: string;
  color: string;
  icon?: string;
  layout?: BlockLayout;
  isCollapsed: boolean;
  bookmarks: Bookmark[];
  position: { x: number; y: number };
}

export interface BookmarkBlockCreateInput {
  name: string;
  color?: string;
  icon?: string;
  layout?: BlockLayout;
}

export interface BookmarkBlockUpdateInput {
  name?: string;
  color?: string;
  icon?: string;
  layout?: BlockLayout;
  isCollapsed?: boolean;
  position?: { x: number; y: number };
}

export interface BookmarkCreateInput {
  title: string;
  url: string;
  description?: string;
  displayTitle?: string;
}

export interface BookmarkUpdateInput {
  title?: string;
  url?: string;
  description?: string;
  displayTitle?: string;
}
