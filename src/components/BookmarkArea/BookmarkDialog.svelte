<script lang="ts">
  interface Props {
    title?: string;
    url?: string;
    onSave: (title: string, url: string) => void;
    onCancel: () => void;
  }

  const { title: initialTitle = '', url: initialUrl = '', onSave, onCancel }: Props = $props();

  let title = $state('');
  let url = $state('');
  let errors = $state<Record<string, string>>({});

  $effect(() => {
    title = initialTitle;
    url = initialUrl;
  });

  function handleSave(): void {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = '标题不能为空';
    }

    if (!url.trim()) {
      newErrors.url = 'URL 不能为空';
    } else if (!url.match(/^https?:\/\//)) {
      url = 'https://' + url;
    }

    if (Object.keys(newErrors).length > 0) {
      errors = newErrors;
      return;
    }

    onSave(title.trim(), url.trim());
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }

  function handleClickOutside(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.bookmark-dialog')) {
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
  class="bookmark-dialog fixed bg-jnt-bg-tertiary/80 backdrop-blur-xl border border-jnt-border-primary rounded-jnt-xl shadow-jnt-xl p-jnt-4 w-80 z-50 animate-in fade-in zoom-in-95 duration-jnt-normal"
  style="left: 50%; top: 50%; transform: translate(-50%, -50%);"
  role="dialog"
  aria-label="创建书签"
>
  <h4 class="text-jnt-text-sm font-jnt-medium text-jnt-text-primary mb-jnt-3">创建书签</h4>

  <div class="space-y-jnt-3">
    <div>
      <label class="text-jnt-text-xs text-jnt-text-tertiary mb-jnt-1 block" for="bookmark-title">标题</label>
      <input
        id="bookmark-title"
        type="text"
        bind:value={title}
        class="w-full bg-jnt-bg-elevated text-jnt-text-primary text-jnt-text-sm rounded-jnt-md px-jnt-3 py-jnt-3 outline-none focus:ring-1 focus:ring-jnt-brand-primary border border-jnt-bg-elevated"
        placeholder="输入书签标题"
      />
      {#if errors.title}
        <p class="text-jnt-color-error text-jnt-text-xs mt-jnt-1">{errors.title}</p>
      {/if}
    </div>

    <div>
      <label class="text-jnt-text-xs text-jnt-text-tertiary mb-jnt-1 block" for="bookmark-url">URL</label>
      <input
        id="bookmark-url"
        type="text"
        bind:value={url}
        class="w-full bg-jnt-bg-elevated text-jnt-text-primary text-jnt-text-sm rounded-jnt-md px-jnt-3 py-jnt-3 outline-none focus:ring-1 focus:ring-jnt-brand-primary border border-jnt-bg-elevated"
        placeholder="https://example.com"
      />
      {#if errors.url}
        <p class="text-jnt-color-error text-jnt-text-xs mt-jnt-1">{errors.url}</p>
      {/if}
    </div>
  </div>

  <div class="flex justify-end gap-jnt-2 mt-jnt-4">
    <button
      class="text-jnt-text-xs text-jnt-text-tertiary hover:text-jnt-text-secondary px-jnt-3 py-jnt-2 rounded-jnt-md transition-colors duration-jnt-fast"
      onclick={onCancel}
    >
      取消
    </button>
    <button
      class="text-jnt-text-xs bg-jnt-brand-primary hover:bg-jnt-brand-hover text-white px-jnt-3 py-jnt-2 rounded-jnt-md transition-colors duration-jnt-fast"
      onclick={handleSave}
    >
      创建
    </button>
  </div>
</div>
