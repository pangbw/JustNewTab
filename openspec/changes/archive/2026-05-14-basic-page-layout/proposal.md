## Why

当前新标签页只显示一个占位问候语，没有任何功能区域。需要建立基础页面布局，为后续的书签展示和便签功能提供结构支撑。

## What Changes

- 将 `App.svelte` 中的占位问候语替换为双栏布局
- 左侧为书签展示区域（预留）
- 右侧为便签/TODO 区域（预留）
- 使用 Tailwind CSS 实现响应式布局

## Capabilities

### New Capabilities

- `page-layout`: 新标签页的双栏布局结构

## Impact

- `src/newtab/App.svelte`: 替换占位内容为布局结构
