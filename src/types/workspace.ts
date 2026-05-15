import type { BookmarkBlock } from "./bookmark";

export interface Workspace {
  id: string;
  name: string;
  blocks: BookmarkBlock[];
}

export interface WorkspaceSettings {
  defaultBlockColor: string;
  showFavicon: boolean;
  itemsPerRow: number;
  bookmarkOpenMode: "current-tab" | "new-tab" | "new-window";
}

export interface WorkspaceConfig {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  settings: WorkspaceSettings;
}

export interface WorkspaceCreateInput {
  name: string;
}
