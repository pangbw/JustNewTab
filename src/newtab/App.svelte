<script lang="ts">
  import BookmarkArea from '@/components/BookmarkArea/BookmarkArea.svelte';
  import ThemeToggle from '@/components/ThemeToggle.svelte';
  import '@/styles/tokens.css';
</script>

<main class="min-h-screen bg-jnt-bg-primary p-jnt-6">
  <div class="flex items-center justify-between mb-jnt-6">
    <h1 class="text-jnt-3xl font-jnt-bold text-jnt-text-primary">JustNewTab</h1>
    <ThemeToggle />
  </div>

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
