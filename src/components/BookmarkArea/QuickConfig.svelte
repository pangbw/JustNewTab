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

  let name = $state('');
  let color = $state('');
  let icon = $state('');
  let layout = $state<BlockLayout>('grid');

  // Initialize from props
  $effect(() => {
    name = block.name;
    color = block.color;
    icon = block.icon ?? '';
    layout = block.layout ?? 'grid';
  });

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
  <h4 class="text-jnt-sm font-jnt-medium text-jnt-text-primary mb-jnt-3">块配置</h4>

  <div class="space-y-jnt-3">
    <div>
      <label class="text-jnt-xs text-jnt-text-tertiary mb-1 block" for="config-name">名称</label>
      <input
        id="config-name"
        type="text"
        bind:value={name}
        class="w-full bg-jnt-bg-elevated/50 text-jnt-text-primary text-jnt-sm rounded-jnt-lg px-jnt-3 py-jnt-2 outline-none focus:ring-1 focus:ring-jnt-brand-primary"
        onkeydown={handleKeydown}
      />
    </div>

    <div>
      <span class="text-jnt-xs text-jnt-text-tertiary mb-1 block">颜色</span>
      <div class="flex flex-wrap gap-jnt-2" role="radiogroup" aria-label="选择颜色">
        {#each PRESET_COLORS as presetColor (presetColor)}
          <button
            class="w-6 h-6 rounded-full border-2 transition-transform {color === presetColor ? 'border-jnt-brand-primary scale-110' : 'border-transparent hover:scale-110'}"
            style="background-color: {presetColor}"
            onclick={() => { color = presetColor; }}
            aria-label="选择颜色 {presetColor}"
            role="radio"
            aria-checked={color === presetColor}
          ></button>
        {/each}
      </div>
    </div>

    <div>
      <span class="text-jnt-xs text-jnt-text-tertiary mb-1 block">图标</span>
      <div class="flex flex-wrap gap-1.5" role="radiogroup" aria-label="选择图标">
        <button
          class="w-7 h-7 rounded-jnt-lg border-2 text-jnt-sm flex items-center justify-center transition-transform {icon === '' ? 'border-jnt-brand-primary scale-110' : 'border-transparent hover:scale-110'}"
          onclick={() => { icon = ''; }}
          aria-label="无图标"
          role="radio"
          aria-checked={icon === ''}
        >
          <span class="text-jnt-text-placeholder text-jnt-xs">无</span>
        </button>
        {#each PRESET_ICONS as presetIcon (presetIcon)}
          <button
            class="w-7 h-7 rounded-jnt-lg border-2 text-jnt-sm flex items-center justify-center transition-transform {icon === presetIcon ? 'border-jnt-brand-primary scale-110' : 'border-transparent hover:scale-110'}"
            onclick={() => { icon = presetIcon; }}
            aria-label="选择图标 {presetIcon}"
            role="radio"
            aria-checked={icon === presetIcon}
          >
            {presetIcon}
          </button>
        {/each}
      </div>
    </div>

    <div>
      <span class="text-jnt-xs text-jnt-text-tertiary mb-1 block">布局</span>
      <div class="flex gap-jnt-2" role="radiogroup" aria-label="选择布局">
        {#each LAYOUT_OPTIONS as option (option.value)}
          <button
            class="flex items-center gap-1.5 px-jnt-3 py-1.5 rounded-jnt-lg border text-jnt-xs transition-colors {layout === option.value ? 'border-jnt-brand-primary bg-jnt-brand-primary/20 text-jnt-brand-50' : 'border-jnt-bg-elevated text-jnt-text-tertiary hover:border-jnt-text-placeholder'}"
            onclick={() => { layout = option.value; }}
            role="radio"
            aria-checked={layout === option.value}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex justify-end gap-jnt-2 mt-jnt-4">
    <button
      class="text-jnt-xs text-jnt-text-tertiary hover:text-jnt-text-secondary px-jnt-3 py-1.5"
      onclick={onClose}
    >
      取消
    </button>
    <button
      class="text-jnt-xs bg-jnt-brand-primary hover:bg-jnt-brand-hover text-white px-jnt-3 py-1.5 rounded-jnt-lg"
      onclick={handleSave}
    >
      保存
    </button>
  </div>
</div>
