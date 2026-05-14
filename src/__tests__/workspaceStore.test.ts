import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import {
  workspaces,
  activeWorkspaceId,
  activeWorkspace,
  settings,
  addWorkspace,
  removeWorkspace,
  renameWorkspace,
  setActiveWorkspace,
  updateSettings,
  initializeWorkspace,
} from '@/stores/workspaceStore';

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
  removeItem: vi.fn((key: string) => { delete store[key]; }),
  clear: vi.fn(() => { Object.keys(store).forEach((k) => delete store[k]); }),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

describe('workspaceStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    workspaces.set([]);
    activeWorkspaceId.set('');
  });

  describe('initializeWorkspace', () => {
    it('should create default workspace when none exists', () => {
      initializeWorkspace();

      const ws = get(workspaces);
      expect(ws).toHaveLength(1);
      expect(ws[0].name).toBe('默认工作区');
      expect(ws[0].blocks).toEqual([]);
      expect(get(activeWorkspaceId)).toBe(ws[0].id);
    });

    it('should load existing workspaces from storage', () => {
      const existing = [
        { id: 'ws1', name: 'My Workspace', blocks: [] },
      ];
      store['justnewtab_workspaces'] = JSON.stringify(existing);
      store['justnewtab_active_workspace'] = 'ws1';

      initializeWorkspace();

      expect(get(workspaces)).toEqual(existing);
      expect(get(activeWorkspaceId)).toBe('ws1');
    });
  });

  describe('addWorkspace', () => {
    it('should add a new workspace', () => {
      initializeWorkspace();
      addWorkspace({ name: 'Work' });

      const ws = get(workspaces);
      expect(ws).toHaveLength(2);
      expect(ws[1].name).toBe('Work');
    });

    it('should switch to new workspace', () => {
      initializeWorkspace();
      addWorkspace({ name: 'New' });

      const ws = get(workspaces);
      expect(get(activeWorkspaceId)).toBe(ws[1].id);
    });
  });

  describe('removeWorkspace', () => {
    it('should remove a workspace', () => {
      initializeWorkspace();
      addWorkspace({ name: 'To Remove' });
      const ws = get(workspaces);
      const toRemove = ws[1];

      removeWorkspace(toRemove.id);

      expect(get(workspaces)).toHaveLength(1);
    });

    it('should not remove the last workspace', () => {
      initializeWorkspace();
      const ws = get(workspaces);

      removeWorkspace(ws[0].id);

      expect(get(workspaces)).toHaveLength(1);
    });

    it('should switch to first workspace when removing active', () => {
      initializeWorkspace();
      addWorkspace({ name: 'Second' });
      const ws = get(workspaces);

      removeWorkspace(ws[1].id);

      expect(get(activeWorkspaceId)).toBe(ws[0].id);
    });
  });

  describe('renameWorkspace', () => {
    it('should rename a workspace', () => {
      initializeWorkspace();
      const ws = get(workspaces);

      renameWorkspace(ws[0].id, 'New Name');

      expect(get(workspaces)[0].name).toBe('New Name');
    });
  });

  describe('setActiveWorkspace', () => {
    it('should set active workspace', () => {
      initializeWorkspace();
      addWorkspace({ name: 'Second' });
      const ws = get(workspaces);

      setActiveWorkspace(ws[0].id);

      expect(get(activeWorkspaceId)).toBe(ws[0].id);
    });
  });

  describe('activeWorkspace', () => {
    it('should derive active workspace', () => {
      initializeWorkspace();
      const ws = get(activeWorkspace);

      expect(ws).toBeDefined();
      expect(ws?.name).toBe('默认工作区');
    });
  });

  describe('updateSettings', () => {
    it('should update settings', () => {
      updateSettings({ defaultBlockColor: '#ef4444' });

      expect(get(settings).defaultBlockColor).toBe('#ef4444');
    });

    it('should merge settings', () => {
      updateSettings({ showFavicon: false });

      const s = get(settings);
      expect(s.showFavicon).toBe(false);
      expect(s.itemsPerRow).toBeDefined();
    });
  });
});
