## Why

书签区域的样式存在一些问题，影响用户体验。当前样式在某些情况下显示不正确，需要修复以确保视觉一致性和可用性。

## What Changes

- 修复书签项悬停状态的样式问题
- 改善书签块的边框和阴影效果
- 优化深色主题下的颜色对比度
- 修复响应式布局在不同屏幕尺寸下的显示问题
- 统一组件间的间距和内边距

## Capabilities

### New Capabilities

（无新增功能）

### Modified Capabilities

- `bookmark-block`: 修复书签块的样式问题，包括边框、阴影和悬停效果
- `bookmark-context-menu`: 优化右键菜单的样式和定位
- `bookmark-quick-edit`: 修复快速编辑卡片的样式问题
- `bookmark-quick-config`: 修复快速配置卡片的样式问题
- `bookmark-search`: 优化搜索框和搜索结果的样式
- `page-layout`: 改善整体页面布局和响应式设计

## Impact

- **受影响的代码**: `src/styles/bookmark-area.css`、各 Svelte 组件的 Tailwind 类名
- **API 变更**: 无
- **依赖变更**: 无
- **浏览器兼容性**: 无影响，修复基于标准 CSS 和 Tailwind
- **扩展体积**: 无显著影响

## 非目标

- 不改变现有功能逻辑
- 不添加新的 UI 功能
- 不重构组件架构
- 不引入新的 CSS 框架或工具
