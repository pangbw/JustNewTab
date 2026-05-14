<script lang="ts">
  import type { BookmarkBlock, BlockLayout } from '@/types/bookmark';
  import { updateBlock } from '@/stores/bookmarkStore';

  interface Props {
    block: BookmarkBlock;
    x: number;
    y: number;
    onClose: () => void;
  }

  const { block, x, y, onClose }: Props = $props();

  let name = $state(block.name);
  let color = $state(block.color);
  let icon = $state(block.icon ?? '');
  let layout = $state<BlockLayout>(block.layout ?? 'grid');

  const PRESET_COLORS = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
    '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#06b6d4', '#3b82f6', '#6b7280', '#f8fafc',
  ];

  const PRESET_ICONS = [
    '📁', '⭐', '🔗', '💼', '🎮', '🎵', '📷', '🛒',
    '📚', '🏠', '💡', '🔧', '🎯', '🚀', '❤️', '📌',
  ];

  const LAYOUT_OPTIONS: Array<{ value: BlockLayout; label: string; icon: string }> = [
    { value: 'grid', label: '网格', icon: '⊞' },
    { value: 'list', label: '列表', icon: '☰' },
  ];

  function handleSave(): void {
    if (name.trim()) {
      updateBlock(block.id, {
        name: name.trim(),
        color,
        icon: icon || undefined,
        layout,
      });
    }
    onClose();
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') onClose();
  }

  function handleClickOutside(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.quick-config-card')) {
      handleSave();
    }
  }

  $effect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div
  class="quick-config-card"
  style="left: {x}px; top: {y}px;"
  role="dialog"
  aria-label="快速配置"
>
  <h4 class="text-sm font-medium text-white mb-3">块配置</h4>

  <div class="space-y-3">
    <div>
      <label class="text-xs text-slate-400 mb-1 block" for="config-name">名称</label>
      <input
        id="config-name"
        type="text"
        bind:value={name}
        class="w-full bg-slate-700/50 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
        onkeydown={handleKeydown}
      />
    </div>

    <div>
      <label class="text-xs text-slate-400 mb-1 block">颜色</label>
      <div class="flex flex-wrap gap-2">
        {#each PRESET_COLORS as presetColor (presetColor)}
          <button
            class="w-6 h-6 rounded-full border-2 transition-transform {color === presetColor ? 'border-white scale-110' : 'border-transparent hover:scale-110'}"
            style="background-color: {presetColor}"
            onclick={() => { color = presetColor; }}
            aria-label="选择颜色 {presetColor}"
          ></button>
        {/each}
      </div>
    </div>

    <div>
      <label class="text-xs text-slate-400 mb-1 block">图标</label>
      <div class="flex flex-wrap gap-1.5">
        <button
          class="w-7 h-7 rounded-lg border-2 text-sm flex items-center justify-center transition-transform {icon === '' ? 'border-white scale-110' : 'border-transparent hover:scale-110'}"
          onclick={() => { icon = ''; }}
          aria-label="无图标"
        >
          <span class="text-slate-500 text-xs">无</span>
        </button>
        {#each PRESET_ICONS as presetIcon (presetIcon)}
          <button
            class="w-7 h-7 rounded-lg border-2 text-sm flex items-center justify-center transition-transform {icon === presetIcon ? 'border-white scale-110' : 'border-transparent hover:scale-110'}"
            onclick={() => { icon = presetIcon; }}
            aria-label="选择图标 {presetIcon}"
          >
            {presetIcon}
          </button>
        {/each}
      </div>
    </div>

    <div>
      <label class="text-xs text-slate-400 mb-1 block">布局</label>
      <div class="flex gap-2">
        {#each LAYOUT_OPTIONS as option (option.value)}
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors {layout === option.value ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-600 text-slate-400 hover:border-slate-500'}"
            onclick={() => { layout = option.value; }}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex justify-end gap-2 mt-4">
    <button
      class="text-xs text-slate-400 hover:text-slate-300 px-3 py-1.5"
      onclick={onClose}
    >
      取消
    </button>
    <button
      class="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg"
      onclick={handleSave}
    >
      保存
    </button>
  </div>
</div>
