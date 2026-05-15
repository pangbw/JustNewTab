<script lang="ts">
  import { currentTheme, toggleTheme } from '@/stores/themeStore';

  const isDark = $derived($currentTheme === 'dark');
</script>

<button
  class="theme-toggle"
  onclick={toggleTheme}
  aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
  title={isDark ? '切换到浅色模式' : '切换到深色模式'}
>
  {#if isDark}
    <!-- Sun icon for light mode -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {:else}
    <!-- Moon icon for dark mode -->
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    @apply p-2 rounded-jnt-lg text-jnt-text-secondary hover:text-jnt-text-primary hover:bg-jnt-bg-elevated transition-all duration-jnt-fast;
  }
</style>
