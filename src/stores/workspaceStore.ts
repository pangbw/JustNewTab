import { writable, derived } from "svelte/store";
import type {
  Workspace,
  WorkspaceSettings,
  WorkspaceCreateInput,
} from "@/types/workspace";
import { saveToStorage, loadFromStorage } from "@/utils/storage";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const WORKSPACES_KEY = "justnewtab_workspaces";
const ACTIVE_WORKSPACE_KEY = "justnewtab_active_workspace";
const SETTINGS_KEY = "justnewtab_settings";

const DEFAULT_SETTINGS: WorkspaceSettings = {
  defaultBlockColor: "#6366f1",
  showFavicon: true,
  itemsPerRow: 4,
  bookmarkOpenMode: "current-tab",
};

export const workspaces = writable<Workspace[]>([]);
export const activeWorkspaceId = writable<string>("");
export const settings = writable<WorkspaceSettings>({ ...DEFAULT_SETTINGS });

export const activeWorkspace = derived(
  [workspaces, activeWorkspaceId],
  ([$workspaces, $activeWorkspaceId]) =>
    $workspaces.find((ws) => ws.id === $activeWorkspaceId) ?? null,
);

// Persist on change
workspaces.subscribe((value) => {
  saveToStorage(WORKSPACES_KEY, value);
});

activeWorkspaceId.subscribe((value) => {
  if (value) saveToStorage(ACTIVE_WORKSPACE_KEY, value);
});

settings.subscribe((value) => {
  saveToStorage(SETTINGS_KEY, value);
});

export function initializeWorkspace(): void {
  const saved = loadFromStorage<Workspace[]>(WORKSPACES_KEY, []);
  const savedActiveId = loadFromStorage<string>(ACTIVE_WORKSPACE_KEY, "");
  const savedSettings = loadFromStorage<Partial<WorkspaceSettings>>(
    SETTINGS_KEY,
    {},
  );

  if (saved && saved.length > 0) {
    workspaces.set(saved);
    activeWorkspaceId.set(savedActiveId || saved[0].id);
  } else {
    const defaultWs: Workspace = {
      id: generateId(),
      name: "默认工作区",
      blocks: [],
    };
    workspaces.set([defaultWs]);
    activeWorkspaceId.set(defaultWs.id);
  }

  if (savedSettings) {
    settings.update((s) => ({ ...s, ...savedSettings }));
  }
}

export function addWorkspace(input: WorkspaceCreateInput): void {
  const newWs: Workspace = {
    id: generateId(),
    name: input.name,
    blocks: [],
  };
  workspaces.update((ws) => [...ws, newWs]);
  activeWorkspaceId.set(newWs.id);
}

export function removeWorkspace(workspaceId: string): void {
  const wsList = get_current_workspaces();
  if (wsList.length <= 1) return;

  workspaces.update((ws) => ws.filter((w) => w.id !== workspaceId));

  if (get_current_active_id() === workspaceId) {
    const remaining = get_current_workspaces();
    activeWorkspaceId.set(remaining[0].id);
  }
}

export function renameWorkspace(workspaceId: string, newName: string): void {
  workspaces.update((ws) =>
    ws.map((w) => (w.id === workspaceId ? { ...w, name: newName } : w)),
  );
}

export function setActiveWorkspace(workspaceId: string): void {
  activeWorkspaceId.set(workspaceId);
}

export function updateSettings(partial: Partial<WorkspaceSettings>): void {
  settings.update((s) => ({ ...s, ...partial }));
}

// Helper to get current value synchronously
function get_current_workspaces(): Workspace[] {
  let value: Workspace[] = [];
  workspaces.subscribe((v) => (value = v))();
  return value;
}

function get_current_active_id(): string {
  let value = "";
  activeWorkspaceId.subscribe((v) => (value = v))();
  return value;
}
