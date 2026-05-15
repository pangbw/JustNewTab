## Context

项目刚初始化，`App.svelte` 是占位内容。Tailwind CSS 已配置可用。

## Goals / Non-Goals

**Goals:**

- 建立清晰的双栏布局结构
- 为书签和便签功能预留语义化区域
- 支持响应式（桌面双栏，移动单栏）

**Non-Goals:**

- 不实现书签数据获取
- 不实现便签功能
- 不添加动画或过渡效果

## Decisions

### 使用 Tailwind Grid 布局

采用 `grid grid-cols-1 md:grid-cols-2` 实现响应式双栏，简洁且易维护。

### 语义化区域划分

使用独立的 section 元素划分书签区和便签区，便于后续功能开发时定位。
