<script lang="ts">
  import BookmarkArea from '@/components/BookmarkArea/BookmarkArea.svelte';
  import ThemeToggle from '@/components/ThemeToggle.svelte';
  import TailwindTest from '@/components/TailwindTest.svelte';
  import '@/styles/tokens.css';

  let showTailwindTest = false;
</script>

<main class="min-h-screen bg-jnt-bg-primary p-jnt-6">
  <div class="flex items-center justify-between mb-jnt-6">
    <h1 class="text-jnt-3xl font-jnt-bold text-jnt-text-primary">JustNewTab</h1>
    <div class="flex items-center gap-jnt-4">
      <button
        class="bg-jnt-bg-elevated text-jnt-text-secondary px-jnt-3 py-jnt-1 rounded-jnt-md
               hover:bg-jnt-bg-tertiary transition-colors duration-jnt-normal text-jnt-sm"
        on:click={() => showTailwindTest = !showTailwindTest}
      >
        {showTailwindTest ? '隐藏测试' : 'Tailwind 测试'}
      </button>
      <ThemeToggle />
    </div>
  </div>

  {#if showTailwindTest}
    <div class="mb-jnt-6">
      <TailwindTest />
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-jnt-6">
    <section class="bg-jnt-bg-tertiary rounded-jnt-xl p-jnt-5 shadow-jnt-md">
      <BookmarkArea />
    </section>

    <section class="bg-jnt-bg-tertiary rounded-jnt-xl p-jnt-5 shadow-jnt-md">
      <h2 class="text-jnt-xl font-jnt-semibold text-jnt-text-primary mb-jnt-4">便签</h2>
      <p class="text-jnt-text-tertiary">便签区域（待实现）</p>
    </section>
  </div>
</main>
