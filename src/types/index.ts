export interface TabInfo {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
}

export interface BookmarkNode {
  id: string;
  title: string;
  url?: string;
  children?: BookmarkNode[];
  dateAdded?: number;
}

export interface Note {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
