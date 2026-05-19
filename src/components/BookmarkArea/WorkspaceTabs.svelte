<script lang="ts">
  import { workspaces, activeWorkspaceId, addWorkspace, removeWorkspace, renameWorkspace, setActiveWorkspace } from '@/stores/workspaceStore';
  import type { Workspace } from '@/types/workspace';

  let isCreating = $state(false);
  let newWorkspaceName = $state('');
  let editingId = $state<string | null>(null);
  let editingName = $state('');

  const MAX_WORKSPACES = 20;

  function handleCreate(): void {
    if (!newWorkspaceName.trim()) return;
    if ($workspaces.length >= MAX_WORKSPACES) return;

    addWorkspace({ name: newWorkspaceName.trim() });
    newWorkspaceName = '';
    isCreating = false;
  }

  function handleStartEdit(workspace: Workspace): void {
    editingId = workspace.id;
    editingName = workspace.name;
  }

  function handleSaveEdit(): void {
    if (editingId && editingName.trim()) {
      renameWorkspace(editingId, editingName.trim());
    }
    editingId = null;
    editingName = '';
  }

  function handleCancelEdit(): void {
    editingId = null;
    editingName = '';
  }

  function handleDelete(workspaceId: string): void {
    if ($workspaces.length <= 1) return;
    removeWorkspace(workspaceId);
  }

  function handleKeydown(e: KeyboardEvent, action: 'create' | 'edit'): void {
    if (e.key === 'Enter') {
      action === 'create' ? handleCreate() : handleSaveEdit();
    } else if (e.key === 'Escape') {
      action === 'create' ? (isCreating = false) : handleCancelEdit();
    }
  }
</script>

<div class="flex items-center gap-jnt-1 overflow-x-auto">
  {#each $workspaces as workspace (workspace.id)}
    <div
      class="workspace-tab group flex items-center gap-jnt-2 px-jnt-3 py-jnt-2 text-jnt-text-sm cursor-pointer transition-all duration-jnt-fast backdrop-blur-sm {workspace.id === $activeWorkspaceId ? 'bg-jnt-bg-tertiary/60 text-jnt-text-primary font-jnt-medium rounded-t-jnt-lg border border-jnt-border-primary border-b-0 relative -mb-px' : 'text-jnt-text-secondary hover:bg-jnt-bg-elevated/50 hover:shadow-jnt-sm rounded-t-jnt-lg'}"
      role="tab"
      aria-selected={workspace.id === $activeWorkspaceId}
      tabindex="0"
      onclick={() => setActiveWorkspace(workspace.id)}
      ondblclick={() => handleStartEdit(workspace)}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveWorkspace(workspace.id); } }}
    >
      {#if editingId === workspace.id}
        <input
          type="text"
          bind:value={editingName}
          class="bg-jnt-bg-elevated text-jnt-text-primary outline-none w-24 text-jnt-sm px-jnt-2 py-jnt-1 rounded-jnt-sm border border-jnt-bg-elevated"
          onkeydown={(e) => handleKeydown(e, 'edit')}
          onblur={handleSaveEdit}
        />
      {:else}
        <span class="whitespace-nowrap">{workspace.name}</span>
        {#if $workspaces.length > 1}
          <button
            class="opacity-0 group-hover:opacity-100 text-jnt-text-tertiary hover:text-jnt-error transition-opacity duration-jnt-fast"
            onclick={(e) => { e.stopPropagation(); handleDelete(workspace.id); }}
            aria-label="删除工作区"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      {/if}
    </div>
  {/each}

  {#if isCreating}
    <input
      type="text"
      bind:value={newWorkspaceName}
      placeholder="工作区名称"
      class="bg-jnt-bg-elevated text-jnt-text-primary text-jnt-sm px-jnt-3 py-jnt-2 rounded-jnt-md outline-none w-32 border border-jnt-bg-elevated placeholder:text-jnt-text-placeholder"
      onkeydown={(e) => handleKeydown(e, 'create')}
      onblur={handleCreate}
    />
  {:else if $workspaces.length < MAX_WORKSPACES}
    <button
      class="text-jnt-text-tertiary hover:text-jnt-text-secondary hover:bg-jnt-bg-elevated/50 px-jnt-2 py-jnt-2 text-jnt-sm transition-all duration-jnt-fast rounded-jnt-md"
      onclick={() => { isCreating = true; newWorkspaceName = ''; }}
      aria-label="创建工作区"
    >
      +
    </button>
  {/if}
</div>
