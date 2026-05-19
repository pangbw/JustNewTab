<script lang="ts">
  import BookmarkArea from '@/components/BookmarkArea/BookmarkArea.svelte';
  import WorkspaceTabs from '@/components/BookmarkArea/WorkspaceTabs.svelte';
  import SearchBox from '@/components/BookmarkArea/SearchBox.svelte';
  import ThemeToggle from '@/components/ThemeToggle.svelte';
  import TailwindTest from '@/components/TailwindTest.svelte';
  import '@/styles/tokens.css';
  import type { BookmarkTreeNode } from '@/adapters/bookmarkAdapter';

  let showTailwindTest = $state(false);
  let showSidebar = $state(true);
  let searchResults = $state<BookmarkTreeNode[] | null>(null);
  let searchQueryText = $state('');

  function handleSearchResults(results: BookmarkTreeNode[], query: string) {
    searchResults = results;
    searchQueryText = query ?? '';
  }

  function handleSearchClear() {
    searchResults = null;
    searchQueryText = '';
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-jnt-bg-primary via-jnt-bg-tertiary to-jnt-bg-primary flex flex-col">
  <!-- 顶部页签栏 -->
  <header class="backdrop-blur-xl bg-jnt-bg-secondary/80 px-jnt-4 py-jnt-2">
    <div class="flex items-center gap-jnt-4">
      <div class="flex-1">
        <WorkspaceTabs />
      </div>
      <div class="w-64">
        <SearchBox
          onResults={handleSearchResults}
          onClear={handleSearchClear}
        />
      </div>
      <button
        class="text-jnt-text-secondary hover:text-jnt-text-primary p-jnt-1 rounded-jnt-md transition-all duration-jnt-fast"
        onclick={() => showSidebar = !showSidebar}
        aria-label={showSidebar ? '收起 TODO' : '展开 TODO'}
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if showSidebar}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          {/if}
        </svg>
      </button>
    </div>
  </header>

  {#if showTailwindTest}
    <div class="px-jnt-4 py-jnt-3">
      <TailwindTest />
    </div>
  {/if}

  <!-- 主要内容区域 -->
  <div class="flex-1 flex overflow-hidden">
    <div class="flex-1 p-jnt-4 overflow-y-auto">
      <section class="backdrop-blur-xl bg-jnt-bg-tertiary/60 rounded-b-jnt-xl rounded-tr-jnt-xl p-jnt-4 shadow-jnt-md border border-jnt-border-primary border-t-0 h-full">
        <BookmarkArea
          {searchResults}
          {searchQueryText}
        />
      </section>
    </div>

    {#if showSidebar}
      <div class="w-80 p-jnt-4 pl-0 overflow-y-auto">
        <section class="backdrop-blur-xl bg-jnt-bg-tertiary/60 rounded-jnt-xl p-jnt-4 shadow-jnt-md border border-jnt-bg-elevated/30 h-full">
          <h2 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary mb-jnt-3">TODO</h2>
          <p class="text-jnt-text-tertiary text-jnt-sm">待办事项区域（待实现）</p>
        </section>
      </div>
    {/if}
  </div>

  <!-- 底部状态栏 -->
  <footer class="backdrop-blur-xl bg-jnt-bg-secondary/80 border-t border-jnt-border-primary px-jnt-4 py-jnt-2">
    <div class="flex items-center justify-between">
      <h1 class="text-jnt-xs font-jnt-normal text-jnt-text-tertiary">JustNewTab</h1>
      <div class="flex items-center gap-jnt-4">
        <button
          class="bg-jnt-bg-elevated/50 backdrop-blur-sm text-jnt-text-secondary px-jnt-2 py-jnt-1 rounded-jnt-md
                 hover:bg-jnt-bg-tertiary transition-all duration-jnt-normal text-jnt-xs border border-jnt-bg-elevated/50"
          onclick={() => showTailwindTest = !showTailwindTest}
        >
          {showTailwindTest ? '隐藏测试' : 'Tailwind 测试'}
        </button>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</main>
