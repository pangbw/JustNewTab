<script lang="ts">
  /**
   * Tailwind 集成测试组件
   * 用于验证设计令牌在 Tailwind 中是否正确可用
   * 任务 2.2: 测试 Tailwind 集成
   */

  let showDetails = false

  const toggleDetails = () => {
    showDetails = !showDetails
  }
</script>

<div class="bg-jnt-bg-secondary rounded-jnt-xl p-jnt-6 space-y-jnt-6">
  <div class="flex items-center justify-between">
    <h2 class="text-jnt-2xl font-jnt-bold text-jnt-text-primary">
      Tailwind 集成测试
    </h2>
    <button
      class="bg-jnt-brand-primary text-white px-jnt-4 py-jnt-2 rounded-jnt-md
             hover:bg-jnt-brand-hover transition-colors duration-jnt-normal"
      on:click={toggleDetails}
    >
      {showDetails ? '隐藏详情' : '显示详情'}
    </button>
  </div>

  <!-- 颜色测试 -->
  <section class="space-y-jnt-3">
    <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary">颜色</h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-jnt-3">
      <div class="bg-jnt-bg-primary p-jnt-3 rounded-jnt-md">
        <span class="text-jnt-text-primary">主背景</span>
      </div>
      <div class="bg-jnt-bg-tertiary p-jnt-3 rounded-jnt-md">
        <span class="text-jnt-text-secondary">次背景</span>
      </div>
      <div class="bg-jnt-brand-primary p-jnt-3 rounded-jnt-md">
        <span class="text-white">品牌色</span>
      </div>
      <div class="bg-jnt-error p-jnt-3 rounded-jnt-md">
        <span class="text-white">错误色</span>
      </div>
    </div>
  </section>

  <!-- 字体测试 -->
  <section class="space-y-jnt-3">
    <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary">字体</h3>
    <div class="space-y-jnt-2">
      <p class="text-jnt-xs text-jnt-text-tertiary">超小文本 (xs)</p>
      <p class="text-jnt-sm text-jnt-text-secondary">小号文本 (sm)</p>
      <p class="text-jnt-base text-jnt-text-primary">基础文本 (base)</p>
      <p class="text-jnt-lg font-jnt-medium text-jnt-text-primary">中号文本 (lg)</p>
      <p class="text-jnt-xl font-jnt-semibold text-jnt-text-primary">大号文本 (xl)</p>
      <p class="text-jnt-2xl font-jnt-bold text-jnt-text-primary">超大文本 (2xl)</p>
    </div>
  </section>

  <!-- 间距测试 -->
  <section class="space-y-jnt-3">
    <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary">间距</h3>
    <div class="flex flex-wrap gap-jnt-2">
      <div class="bg-jnt-brand-50 px-jnt-1 py-jnt-1 rounded">space-1</div>
      <div class="bg-jnt-brand-100 px-jnt-2 py-jnt-2 rounded">space-2</div>
      <div class="bg-jnt-brand-200 px-jnt-3 py-jnt-3 rounded">space-3</div>
      <div class="bg-jnt-brand-300 px-jnt-4 py-jnt-4 rounded text-white">space-4</div>
      <div class="bg-jnt-brand-400 px-jnt-6 py-jnt-6 rounded text-white">space-6</div>
    </div>
  </section>

  <!-- 圆角测试 -->
  <section class="space-y-jnt-3">
    <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary">圆角</h3>
    <div class="flex flex-wrap gap-jnt-4">
      <div class="bg-jnt-bg-elevated p-jnt-4 rounded-jnt-sm">sm</div>
      <div class="bg-jnt-bg-elevated p-jnt-4 rounded-jnt-md">md</div>
      <div class="bg-jnt-bg-elevated p-jnt-4 rounded-jnt-lg">lg</div>
      <div class="bg-jnt-bg-elevated p-jnt-4 rounded-jnt-xl">xl</div>
      <div class="bg-jnt-bg-elevated p-jnt-4 rounded-jnt-full">full</div>
    </div>
  </section>

  <!-- 阴影测试 -->
  <section class="space-y-jnt-3">
    <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary">阴影</h3>
    <div class="flex flex-wrap gap-jnt-4">
      <div class="bg-jnt-bg-tertiary p-jnt-4 rounded-jnt-md shadow-jnt-sm">sm</div>
      <div class="bg-jnt-bg-tertiary p-jnt-4 rounded-jnt-md shadow-jnt-md">md</div>
      <div class="bg-jnt-bg-tertiary p-jnt-4 rounded-jnt-md shadow-jnt-lg">lg</div>
      <div class="bg-jnt-bg-tertiary p-jnt-4 rounded-jnt-md shadow-jnt-xl">xl</div>
    </div>
  </section>

  <!-- 详情面板 -->
  {#if showDetails}
    <div class="bg-jnt-bg-primary rounded-jnt-lg p-jnt-4 border border-jnt-bg-elevated">
      <h4 class="text-jnt-base font-jnt-semibold text-jnt-text-primary mb-jnt-3">
        测试结果
      </h4>
      <ul class="space-y-jnt-2 text-jnt-sm text-jnt-text-secondary">
        <li>✅ 背景色令牌 - bg-jnt-*</li>
        <li>✅ 文本色令牌 - text-jnt-*</li>
        <li>✅ 品牌色令牌 - bg-jnt-brand-*</li>
        <li>✅ 字体大小令牌 - text-jnt-*</li>
        <li>✅ 字体粗细令牌 - font-jnt-*</li>
        <li>✅ 间距令牌 - p-jnt-*, gap-jnt-*, space-y-jnt-*</li>
        <li>✅ 圆角令牌 - rounded-jnt-*</li>
        <li>✅ 阴影令牌 - shadow-jnt-*</li>
        <li>✅ 过渡动画 - duration-jnt-*</li>
      </ul>
    </div>
  {/if}
</div>
