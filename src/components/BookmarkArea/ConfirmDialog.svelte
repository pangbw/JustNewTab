<script lang="ts">
  interface Props {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  const { message, onConfirm, onCancel }: Props = $props();

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      onConfirm();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }

  function handleClickOutside(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.confirm-dialog')) {
      onCancel();
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
  class="confirm-dialog fixed bg-jnt-bg-tertiary/90 backdrop-blur-xl border border-jnt-border-primary rounded-jnt-xl shadow-jnt-xl p-jnt-4 w-72 z-[99999]"
  style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
  role="alertdialog"
  aria-label="确认操作"
>
  <div class="flex items-center gap-jnt-3 mb-jnt-4">
    <svg class="w-5 h-5 text-jnt-color-warning shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
    <p class="text-jnt-text-sm text-jnt-text-primary">{message}</p>
  </div>

  <div class="flex justify-end gap-jnt-2">
    <button
      class="text-jnt-text-xs text-jnt-text-tertiary hover:text-jnt-text-secondary px-jnt-3 py-jnt-2 rounded-jnt-md transition-colors duration-jnt-fast"
      onclick={onCancel}
    >
      取消
    </button>
    <button
      class="text-jnt-text-xs bg-jnt-color-error hover:bg-jnt-color-error/80 text-white px-jnt-3 py-jnt-2 rounded-jnt-md transition-colors duration-jnt-fast"
      onclick={onConfirm}
    >
      确认删除
    </button>
  </div>
</div>
