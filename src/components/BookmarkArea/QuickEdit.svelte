<script lang="ts">
  import type { Bookmark } from '@/types/bookmark';
  import { updateBookmark } from '@/stores/bookmarkStore';
  import { z } from 'zod';

  interface Props {
    bookmark: Bookmark;
    blockId: string;
    x: number;
    y: number;
    onClose: () => void;
  }

  const { bookmark, blockId, x, y, onClose }: Props = $props();

  let title = $state(bookmark.displayTitle ?? bookmark.title);
  let url = $state(bookmark.url);
  let description = $state(bookmark.description ?? '');

  const schema = z.object({
    title: z.string().min(1, '标题不能为空').max(100, '标题最多100字符'),
    url: z.string().url('请输入有效的 URL'),
    description: z.string().max(500, '描述最多500字符'),
  });

  let errors = $state<Record<string, string>>({});

  function handleSave(): void {
    // Auto-prepend https if missing
    if (url && !url.match(/^https?:\/\//)) {
      url = 'https://' + url;
    }

    const result = schema.safeParse({ title, url, description });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      errors = fieldErrors;
      return;
    }

    updateBookmark(blockId, bookmark.id, {
      title,
      url,
      description: description || undefined,
      displayTitle: title !== bookmark.title ? title : undefined,
    });
    onClose();
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }

  function handleClickOutside(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.quick-edit-card')) {
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
  class="quick-edit-card"
  style="left: {x}px; top: {y}px;"
  role="dialog"
  aria-label="快速编辑书签"
>
  <h4 class="text-jnt-sm font-jnt-medium text-jnt-text-primary mb-jnt-3">编辑书签</h4>

  <div class="space-y-jnt-3">
    <div>
      <label class="text-jnt-xs text-jnt-text-tertiary mb-1 block" for="edit-title">显示标题</label>
      <input
        id="edit-title"
        type="text"
        bind:value={title}
        class="w-full bg-jnt-bg-elevated/50 text-jnt-text-primary text-jnt-sm rounded-jnt-lg px-jnt-3 py-jnt-2 outline-none focus:ring-1 focus:ring-jnt-brand-primary"
        placeholder="显示标题"
      />
      {#if errors.title}
        <p class="text-jnt-error text-jnt-xs mt-1">{errors.title}</p>
      {/if}
    </div>

    <div>
      <label class="text-jnt-xs text-jnt-text-tertiary mb-1 block" for="edit-url">URL</label>
      <input
        id="edit-url"
        type="text"
        bind:value={url}
        class="w-full bg-jnt-bg-elevated/50 text-jnt-text-primary text-jnt-sm rounded-jnt-lg px-jnt-3 py-jnt-2 outline-none focus:ring-1 focus:ring-jnt-brand-primary"
        placeholder="https://example.com"
      />
      {#if errors.url}
        <p class="text-jnt-error text-jnt-xs mt-1">{errors.url}</p>
      {/if}
    </div>

    <div>
      <label class="text-jnt-xs text-jnt-text-tertiary mb-1 block" for="edit-desc">
        描述 <span class="text-jnt-text-placeholder">({description.length}/500)</span>
      </label>
      <textarea
        id="edit-desc"
        bind:value={description}
        class="w-full bg-jnt-bg-elevated/50 text-jnt-text-primary text-jnt-sm rounded-jnt-lg px-jnt-3 py-jnt-2 outline-none focus:ring-1 focus:ring-jnt-brand-primary resize-none"
        rows="3"
        placeholder="添加描述..."
        maxlength="500"
      ></textarea>
      {#if errors.description}
        <p class="text-jnt-error text-jnt-xs mt-1">{errors.description}</p>
      {/if}
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
