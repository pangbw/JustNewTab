<script lang="ts">
  let greeting = $state('JustNewTab')
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-5xl font-bold text-white mb-4">{greeting}</h1>
    <p class="text-slate-400 text-lg">你的新标签页，从这里开始。</p>
  </div>
</main>
