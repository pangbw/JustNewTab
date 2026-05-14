## Context

JustNewTab 是一个多浏览器新标签页扩展，需要实现一个功能完整的书签区域。当前项目使用 Svelte + TypeScript + Tailwind CSS 技术栈，支持 Chrome、Edge、Firefox 浏览器。

### 当前状态

- 项目处于初始阶段，已配置基本骨架
- 使用 Vite 作为打包工具
- 使用 webextension-polyfill 处理跨浏览器兼容性
- 支持 Manifest V3 (Chrome/Edge) 和 Manifest V2/V3 (Firefox)

### 技术约束

- 必须使用 Svelte 组件化开发
- 必须使用 TypeScript 进行类型安全
- 必须使用 Tailwind CSS 进行样式管理
- 必须处理浏览器 API 差异
- 必须保持扩展体积在合理范围内

## Goals / Non-Goals

### Goals

1. **书签块管理**: 实现书签块的创建、编辑、删除、拖动和收起/展开功能
2. **工作区管理**: 实现多页签工作区，支持切换和创建新工作区
3. **搜索功能**: 实现书签快速搜索和筛选
4. **右键菜单**: 实现右键菜单功能，支持创建块和书签
5. **快速配置**: 实现书签块的快速配置功能，支持编辑名称和颜色
6. **书签快速编辑**: 实现书签右键快速编辑功能，支持编辑显示内容、URL、描述
7. **书签打开状态**: 实现已打开书签的着重显示和快速关闭功能
8. **书签导航**: 实现书签点击导航行为，支持在当前页面打开（预留新标签页配置）
9. **响应式布局**: 实现自适应布局，适配不同屏幕尺寸
10. **多浏览器兼容**: 确保在 Chrome、Edge、Firefox 中正常工作

### Non-Goals

1. **书签同步**: 不实现跨设备书签同步功能
2. **书签导入/导出**: 不实现书签批量导入导出功能
3. **书签标签**: 不实现书签标签分类功能
4. **书签历史**: 不实现书签访问历史记录
5. **书签分享**: 不实现书签分享功能
6. **智能排序**: 不实现基于使用频率的智能排序
7. **统计功能**: 不实现书签访问统计功能

## Decisions

### 1. 组件架构设计

**决策**: 采用组合式组件架构，将功能拆分为多个小组件

**理由**:
- 符合 Svelte 组件化最佳实践
- 便于代码维护和测试
- 提高组件复用性
- 符合项目编码规范（200-400行，最多800行）

**组件结构**:
```
BookmarkArea/
├── BookmarkArea.svelte          # 主容器组件
├── WorkspaceTabs.svelte         # 工作区页签组件
├── SearchBox.svelte             # 搜索框组件
├── BookmarkBlock.svelte         # 书签块组件
├── BookmarkItem.svelte          # 单个书签项组件
├── ContextMenu.svelte           # 右键菜单组件
├── QuickConfig.svelte           # 快速配置卡片组件
├── QuickEdit.svelte             # 书签快速编辑卡片组件
├── OpenTabIndicator.svelte      # 已打开书签指示器组件
└── stores/
    ├── bookmarkStore.ts         # 书签数据状态管理
    ├── workspaceStore.ts        # 工作区状态管理
    ├── dragStore.ts             # 拖拽状态管理
    └── tabStore.ts              # 标签页状态管理
```

**替代方案**: 单一大组件
- **缺点**: 代码难以维护，不符合项目规范

### 2. 状态管理方案

**决策**: 使用 Svelte 的 writable store 进行状态管理

**理由**:
- Svelte 原生支持，无需额外依赖
- 简单易用，适合中小型应用
- 响应式更新，性能良好
- 符合不可变数据操作规范

**数据结构**:
```typescript
interface BookmarkBlock {
  id: string;
  name: string;
  color: string;
  isCollapsed: boolean;
  bookmarks: Bookmark[];
  position: { x: number; y: number };
}

interface Workspace {
  id: string;
  name: string;
  blocks: BookmarkBlock[];
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;  // 书签描述
  favicon?: string;
  isOpen?: boolean;      // 是否已打开
  displayTitle?: string; // 自定义显示标题
}
```

**替代方案**: 使用更复杂的状态管理库（如 Redux）
- **缺点**: 增加依赖，复杂度高，不适合当前项目规模

### 3. 拖拽实现方案

**决策**: 使用 HTML5 Drag and Drop API 原生实现

**理由**:
- 无需额外依赖，减小扩展体积
- 浏览器原生支持，性能好
- 兼容性好，支持所有目标浏览器
- 符合项目最小依赖原则

**实现策略**:
- 使用 `draggable` 属性标记可拖拽元素
- 实现 `dragstart`、`dragover`、`drop` 事件处理
- 使用 CSS transform 实现平滑拖拽效果
- 保存拖拽后的位置到 store

**替代方案**: 使用 svelte-dnd-action 库
- **缺点**: 增加依赖，可能影响扩展体积

### 4. 右键菜单实现

**决策**: 自定义右键菜单组件，拦截浏览器默认右键菜单

**理由**:
- 可以完全自定义菜单样式和功能
- 避免浏览器默认菜单的干扰
- 支持动态菜单项
- 用户体验更好

**实现策略**:
- 监听 `contextmenu` 事件
- 阻止默认行为 `e.preventDefault()`
- 根据点击位置显示自定义菜单
- 支持点击空白处关闭菜单

**替代方案**: 使用浏览器原生 context menu API
- **缺点**: 样式受限，功能有限

### 5. 书签数据获取

**决策**: 使用 webextension-polyfill 的 bookmarks API

**理由**:
- 统一 Chrome 和 Firefox 的 API 差异
- 官方推荐的方式
- 类型安全（TypeScript 支持）
- 符合项目多浏览器兼容策略

**API 使用**:
```typescript
import browser from 'webextension-polyfill';

// 获取书签树
const bookmarkTree = await browser.bookmarks.getTree();

// 搜索书签
const results = await browser.bookmarks.search(query);

// 创建书签
const newBookmark = await browser.bookmarks.create({
  title: 'Example',
  url: 'https://example.com'
});
```

**浏览器差异处理**:
- Chrome: 使用 `chrome.bookmarks` API
- Firefox: 使用 `browser.bookmarks` API
- webextension-polyfill 自动处理差异

### 6. 样式方案

**决策**: 使用 Tailwind CSS 实用优先的方式

**理由**:
- 符合项目技术栈要求
- 开发效率高
- 样式一致性好
- 支持响应式设计

**实现策略**:
- 使用 Tailwind 的 utility classes
- 自定义颜色变量用于书签块颜色
- 使用 CSS Grid 或 Flexbox 实现布局
- 响应式断点：sm, md, lg, xl

**替代方案**: 使用 CSS-in-JS 或 scoped CSS
- **缺点**: 增加复杂度，不符合项目技术栈

### 7. 工作区存储方案

**决策**: 使用浏览器本地存储 (localStorage) 保存工作区配置

**理由**:
- 无需后端服务
- 数据持久化
- 访问速度快
- 兼容所有目标浏览器

**存储结构**:
```typescript
interface WorkspaceConfig {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  settings: {
    defaultBlockColor: string;
    showFavicon: boolean;
    itemsPerRow: number;
    bookmarkOpenMode: 'current-tab' | 'new-tab' | 'new-window'; // 新增：书签打开方式
  };
}
```

**替代方案**: 使用 IndexedDB
- **缺点**: 复杂度高，对于配置数据来说过于重量级

### 8. 搜索实现

**决策**: 使用浏览器原生书签搜索 API + 前端过滤

**理由**:
- 浏览器 API 搜索速度快
- 支持标题和 URL 搜索
- 无需额外索引
- 兼容性好

**实现策略**:
- 使用 `browser.bookmarks.search(query)` 进行搜索
- 前端对结果进行二次过滤和排序
- 支持实时搜索（防抖处理）
- 高亮显示搜索关键词

### 9. 书签快速编辑实现

**决策**: 使用悬浮卡片组件实现书签快速编辑

**理由**:
- 用户体验直观，右键即可编辑
- 避免跳转到新页面编辑
- 支持实时预览修改效果
- 符合现代 Web 应用交互模式

**实现策略**:
- 右键书签时显示悬浮卡片
- 卡片内包含表单：显示内容、URL、描述
- 使用 zod 进行输入验证
- 支持 Enter 保存、Escape 取消
- 点击外部自动保存并关闭

**数据结构扩展**:
```typescript
interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;  // 新增：书签描述
  favicon?: string;
  isOpen?: boolean;      // 新增：是否已打开
  displayTitle?: string; // 新增：自定义显示标题
}
```

**替代方案**: 使用模态对话框编辑
- **缺点**: 打断用户操作流程，体验较差

### 10. 书签打开状态检测

**决策**: 使用浏览器 tabs API 检测已打开的书签

**理由**:
- 实时获取浏览器标签页状态
- 准确匹配书签 URL
- 支持快速关闭已打开的标签页
- 跨浏览器兼容性好

**实现策略**:
- 使用 `browser.tabs.query()` 获取所有打开的标签页
- 定期轮询或监听标签页变化事件
- 比较标签页 URL 与书签 URL
- 已打开书签添加高亮样式（如背景色、边框）
- 显示关闭图标，点击调用 `browser.tabs.remove()` 关闭标签页

**浏览器差异处理**:
- Chrome: 使用 `chrome.tabs` API
- Firefox: 使用 `browser.tabs` API
- webextension-polyfill 统一封装

**性能优化**:
- 使用防抖处理标签页变化事件
- 缓存已打开 URL 集合，避免重复查询
- 仅在书签区域可见时进行检测

**替代方案**: 使用书签访问历史判断
- **缺点**: 不够准确，无法实时反映当前状态

### 11. 书签导航行为

**决策**: 实现可配置的书签打开方式

**理由**:
- 不同用户有不同的使用习惯
- 默认在当前页面打开更符合直觉
- 预留配置项便于后续扩展
- 支持多种打开方式（当前页、新标签页、新窗口）

**实现策略**:
- 默认行为：左键点击在当前页面打开（`window.location.href = url`）
- 预留配置：在设置中添加"书签打开方式"选项
- 配置选项：当前页面、新标签页、新窗口
- 使用 localStorage 保存用户偏好
- 支持快捷键修饰：Ctrl+点击在新标签页打开

**数据结构扩展**:
```typescript
interface WorkspaceSettings {
  // ... 现有设置
  bookmarkOpenMode: 'current-tab' | 'new-tab' | 'new-window';
}
```

**用户体验优化**:
- 悬停时显示目标 URL（原生 title 属性）
- 点击时显示加载状态
- 支持中键点击（始终在新标签页打开）

**替代方案**: 固定在新标签页打开
- **缺点**: 不符合部分用户习惯，缺乏灵活性

## Risks / Trade-offs

### 风险 1: 浏览器 API 差异

**风险**: Chrome 和 Firefox 的书签 API 存在细微差异

**影响**: 功能在不同浏览器中表现不一致

**缓解措施**:
- 使用 webextension-polyfill 统一 API
- 编写浏览器特定的适配器层
- 充分的跨浏览器测试

### 风险 2: 拖拽性能问题

**风险**: 大量书签块的拖拽可能导致性能问题

**影响**: 用户体验下降，界面卡顿

**缓解措施**:
- 使用 CSS transform 而非 top/left
- 实现虚拟滚动（如果书签块数量超过 50 个）
- 优化渲染逻辑，避免不必要的重绘

### 风险 3: 扩展体积超标

**风险**: 新增功能可能导致扩展体积超过 150KB 限制

**影响**: 影响扩展分发和用户体验

**缓解措施**:
- 使用 Tree-shaking 移除未使用代码
- 压缩图片资源
- 按需加载非关键功能
- 监控构建产物大小

### 风险 4: 数据存储限制

**风险**: localStorage 有存储大小限制（通常 5-10MB）

**影响**: 大量书签数据可能无法完整保存

**缓解措施**:
- 实现数据压缩
- 监控存储使用情况
- 提供数据清理机制
- 考虑使用 IndexedDB 作为备选方案

### 风险 5: 书签权限问题

**风险**: 浏览器可能限制书签 API 的访问权限

**影响**: 功能无法正常使用

**缓解措施**:
- 在 manifest.json 中声明必要的权限
- 优雅降级处理权限拒绝情况
- 提供清晰的用户提示

### 风险 6: 标签页检测性能问题

**风险**: 频繁查询浏览器标签页状态可能导致性能问题

**影响**: 界面卡顿，CPU 占用过高

**缓解措施**:
- 使用防抖处理标签页变化事件（建议 500ms）
- 仅在书签区域可见时进行检测
- 缓存已打开 URL 集合，避免重复查询
- 使用 Set 数据结构优化 URL 查找（O(1) 复杂度）

### 风险 7: 书签编辑数据丢失

**风险**: 快速编辑过程中浏览器崩溃或意外关闭可能导致数据丢失

**影响**: 用户编辑的书签信息丢失

**缓解措施**:
- 实现自动保存机制（编辑完成后立即保存）
- 添加编辑历史记录（可选）
- 提供撤销功能（Ctrl+Z）
- 在关闭前提示用户保存

## Open Questions

1. **书签块最大数量**: 是否需要限制每个工作区的书签块数量？
   - 建议：初始版本限制为 20 个，后续根据用户反馈调整

2. **书签图标获取**: 如何获取网站的 favicon？
   - 方案 A：使用浏览器 API 获取
   - 方案 B：使用第三方 favicon 服务
   - 建议：优先使用浏览器 API，失败时使用 Google 的 favicon 服务

3. **工作区同步**: 是否需要支持工作区配置的导入/导出？
   - 建议：初始版本不支持，后续根据需求添加

4. **书签块布局**: 是否支持自定义布局（如网格布局、列表布局）？
   - 建议：初始版本支持自由拖拽，后续添加布局选项

5. **快捷键支持**: 是否需要添加快捷键支持？
   - 建议：初始版本不支持，后续添加常用快捷键

## 依赖清单

### 必需依赖

- `webextension-polyfill`: 跨浏览器兼容层（已在项目中）

### 可选依赖（根据实现决定）

- 无（使用原生 API 实现所有功能）

### 开发依赖

- 无新增

## 性能指标

- **首次加载时间**: < 100ms
- **书签搜索响应时间**: < 50ms
- **拖拽响应时间**: < 16ms (60fps)
- **内存占用**: < 50MB
- **扩展体积增量**: < 150KB
