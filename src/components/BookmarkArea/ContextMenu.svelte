<script lang="ts">
  interface MenuItem {
    id: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    separator?: boolean;
  }

  interface Props {
    items: MenuItem[];
    x: number;
    y: number;
    onSelect: (id: string) => void;
    onClose: () => void;
  }

  const { items, x, y, onSelect, onClose }: Props = $props();

  let menuEl = $state<HTMLElement | null>(null);

  function handleClickOutside(e: MouseEvent): void {
    if (menuEl && !menuEl.contains(e.target as Node)) {
      onClose();
    }
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') onClose();
  }

  function handleSelect(id: string, disabled?: boolean): void {
    if (!disabled) {
      onSelect(id);
      onClose();
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
  bind:this={menuEl}
  class="context-menu"
  style="left: {x}px; top: {y}px;"
  role="menu"
>
  {#each items as item (item.id)}
    {#if item.separator}
      <div class="border-t border-jnt-bg-elevated my-1"></div>
    {:else}
      <button
        class="context-menu-item w-full text-left {item.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
        role="menuitem"
        disabled={item.disabled}
        onclick={() => handleSelect(item.id, item.disabled)}
      >
        {item.label}
      </button>
    {/if}
  {/each}
</div>
