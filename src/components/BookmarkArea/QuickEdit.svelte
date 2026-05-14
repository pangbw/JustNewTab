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
  <h4 class="text-sm font-medium text-white mb-3">编辑书签</h4>

  <div class="space-y-3">
    <div>
      <label class="text-xs text-slate-400 mb-1 block" for="edit-title">显示标题</label>
      <input
        id="edit-title"
        type="text"
        bind:value={title}
        class="w-full bg-slate-700/50 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="显示标题"
      />
      {#if errors.title}
        <p class="text-red-400 text-xs mt-1">{errors.title}</p>
      {/if}
    </div>

    <div>
      <label class="text-xs text-slate-400 mb-1 block" for="edit-url">URL</label>
      <input
        id="edit-url"
        type="text"
        bind:value={url}
        class="w-full bg-slate-700/50 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="https://example.com"
      />
      {#if errors.url}
        <p class="text-red-400 text-xs mt-1">{errors.url}</p>
      {/if}
    </div>

    <div>
      <label class="text-xs text-slate-400 mb-1 block" for="edit-desc">
        描述 <span class="text-slate-500">({description.length}/500)</span>
      </label>
      <textarea
        id="edit-desc"
        bind:value={description}
        class="w-full bg-slate-700/50 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        rows="3"
        placeholder="添加描述..."
        maxlength="500"
      ></textarea>
      {#if errors.description}
        <p class="text-red-400 text-xs mt-1">{errors.description}</p>
      {/if}
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
