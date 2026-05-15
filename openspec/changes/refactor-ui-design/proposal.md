## Why

当前项目的 UI 样式缺乏统一的设计规范，各组件样式分散且不一致。构建统一的前端 UI 样式规范，提升产品的视觉品质和用户体验。

**设计风格特征**：

- 深色主题，高对比度，科技未来感
- Royal Indigo Night 配色作为品牌色（#1A237E → #5C6BC0）
- 浅色主题使用 Ocean Depths 配色（#1565C0 → #81D4FA）
- 大面积留白，呼吸感强
- 圆角矩形组件，柔和阴影
- 极简主义 + 品牌叙事性

## What Changes

- 建立项目统一的设计令牌系统（Design Tokens）
- 定义颜色、字体、间距、圆角、阴影等基础样式变量
- 重构现有组件样式以符合新设计规范
- 优化深色主题的视觉层次和对比度
- 统一动画和过渡效果
- 新增浅色主题支持，使用 Ocean Depths 配色方案

## Capabilities

### New Capabilities

- `design-tokens`: 定义项目的设计令牌系统，包括颜色、字体、间距、圆角、阴影等基础样式变量
- `ui-style-guide`: 建立 UI 样式规范文档，指导组件开发
- `light-theme`: 新增浅色主题支持，使用 Ocean Depths 配色方案，支持主题切换

### Modified Capabilities

- `page-layout`: 更新页面整体布局样式，采用 MiMo 风格的大面积留白和居中对齐
- `bookmark-block`: 重构书签块组件样式，使用新的设计令牌
- `bookmark-context-menu`: 重构右键菜单样式，使用新的设计令牌
- `bookmark-quick-edit`: 重构快速编辑卡片样式，使用新的设计令牌
- `bookmark-quick-config`: 重构快速配置卡片样式，使用新的设计令牌
- `bookmark-search`: 重构搜索框样式，使用新的设计令牌

## Impact

- **受影响的代码**:
  - `src/styles/` - 新增设计令牌文件，重构现有样式
  - `src/components/` - 所有 Svelte 组件的样式类名
  - `tailwind.config.js` - 可能需要扩展 Tailwind 配置
- **API 变更**: 无
- **依赖变更**: 无新增依赖
- **浏览器兼容性**: 无影响，基于标准 CSS 变量和 Tailwind
- **扩展体积**: 轻微增加（CSS 变量定义）

## 非目标

- 不改变现有功能逻辑
- 不添加新的 UI 组件
- 不引入新的 CSS 框架
- 不改变组件的交互行为
