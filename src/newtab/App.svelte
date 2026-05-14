<script lang="ts">
  import BookmarkArea from '@/components/BookmarkArea/BookmarkArea.svelte';
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
  <h1 class="text-3xl font-bold text-white mb-6">JustNewTab</h1>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <section class="bg-slate-800/50 rounded-xl p-5">
      <BookmarkArea />
    </section>

    <section class="bg-slate-800/50 rounded-xl p-5">
      <h2 class="text-xl font-semibold text-white mb-4">便签</h2>
      <p class="text-slate-400">便签区域（待实现）</p>
    </section>
  </div>
</main>
