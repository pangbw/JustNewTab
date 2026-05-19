## Context

当前书签区域已有基础实现，包括 8 个 Svelte 组件：
- `BookmarkArea.svelte` - 主容器
- `BookmarkBlock.svelte` - 书签块
- `BookmarkItem.svelte` - 书签项
- `ContextMenu.svelte` - 右键菜单
- `QuickConfig.svelte` - 快速配置
- `QuickEdit.svelte` - 快速编辑
- `SearchBox.svelte` - 搜索框
- `WorkspaceTabs.svelte` - 工作区页签

**问题**：
- 现有代码未遵循设计令牌系统，样式硬编码
- 布局比例为 1:1，不符合产品定位
- 组件结构和样式缺乏一致性

**约束**：
- 必须使用设计令牌系统（`tokens.css`）
- 必须遵循 MiMo 设计风格
- 必须保持多浏览器兼容性
- 组件文件控制在 200-400 行

## Goals / Non-Goals

**Goals:**
- 完全重构书签区域组件，使用设计令牌系统
- 实现 3:1 布局比例（书签:便签）
- 确保视觉风格符合 MiMo 设计规范
- 保持所有现有功能完整
- 提升代码可维护性

**Non-Goals:**
- 不添加新功能
- 不修改便签区域
- 不改变设计令牌系统
- 不修改浏览器兼容性策略

## Decisions

### Decision 1: 组件架构 - 保持现有组件划分

**选择**: 保持现有的 8 个组件结构

**理由**:
- 现有组件划分合理，职责清晰
- 重构重点是样式和布局，而非架构
- 减少迁移风险

**替代方案**:
- 合并小组件 → 增加复杂度，不利于维护

### Decision 2: 布局实现 - CSS Grid + 设计令牌

**选择**: 使用 CSS Grid 实现 3:1 布局，比例值使用设计令牌

**实现**:
```css
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--jnt-space-6);
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
```

**理由**:
- CSS Grid 原生支持比例布局
- 响应式处理简单
- 浏览器兼容性好

**替代方案**:
- Flexbox → 需要额外计算，不如 Grid 直观

### Decision 3: 样式策略 - Tailwind + 设计令牌变量

**选择**: 使用 Tailwind 类名 + CSS 变量引用设计令牌

**实现**:
```svelte
<div class="bg-[var(--jnt-bg-tertiary)] rounded-[var(--jnt-radius-xl)] p-[var(--jnt-space-4)]">
```

**理由**:
- Tailwind 提供实用类，设计令牌提供一致性
- 易于维护和主题切换
- 符合项目技术栈

**替代方案**:
- 纯 CSS → 失去 Tailwind 优势
- Tailwind 插件 → 增加配置复杂度

### Decision 4: 拖拽功能 - 保持现有方案

**选择**: 继续使用 HTML5 Drag and Drop API

**理由**:
- 无额外依赖
- 浏览器原生支持
- 现有实现已验证

**替代方案**:
- svelte-dnd-action → 增加依赖体积

### Decision 5: 状态管理 - 保持现有 Store 结构

**选择**: 继续使用 Svelte stores，不改变数据流

**理由**:
- 现有 store 结构满足需求
- 重构重点是视图层
- 减少数据层变更风险

## Risks / Trade-offs

### Risk 1: 样式遗漏
**风险**: 重构过程中可能遗漏某些样式细节

**缓解**:
- 逐组件重构，每完成一个组件立即验证
- 对照设计规范检查清单
- 视觉回归测试

### Risk 2: 功能回归
**风险**: 重构可能引入功能 bug

**缓解**:
- 保持现有功能逻辑不变
- 逐个功能点测试
- 保留关键交互代码

### Risk 3: 响应式问题
**风险**: 3:1 布局在小屏幕上可能显示不佳

**缓解**:
- 768px 断点切换为单列布局
- 测试多种屏幕尺寸
- 保持移动端优先设计

### Trade-off: 代码量 vs 可维护性
**权衡**: 使用设计令牌会增加样式代码量，但提升可维护性

**接受**: 可维护性比代码量更重要，符合项目长期目标

## Migration Plan

### Phase 1: 准备
1. 备份现有组件代码（git commit）
2. 确认设计令牌系统就绪
3. 准备测试用例

### Phase 2: 重构（按组件顺序）
1. `BookmarkArea.svelte` - 主容器和布局
2. `WorkspaceTabs.svelte` - 工作区页签
3. `SearchBox.svelte` - 搜索框
4. `BookmarkBlock.svelte` - 书签块
5. `BookmarkItem.svelte` - 书签项
6. `ContextMenu.svelte` - 右键菜单
7. `QuickConfig.svelte` - 快速配置
8. `QuickEdit.svelte` - 快速编辑

### Phase 3: 验证
1. 功能测试（所有交互）
2. 视觉测试（设计规范对照）
3. 响应式测试（多尺寸）
4. 跨浏览器测试

### Rollback Strategy
- 每个组件重构前创建 git checkpoint
- 如发现问题，回退到最近的 checkpoint
- 保持向后兼容的 API 接口

## Open Questions

1. 是否需要为 3:1 比例添加设计令牌？
   - **决策**: 暂不添加，使用 CSS Grid 直接定义比例
   - **理由**: 比例是布局级别的，不属于通用设计令牌

2. 是否需要优化现有 store 结构？
   - **决策**: 本次重构不涉及
   - **理由**: 避免范围蔓延，保持聚焦

3. 是否需要添加动画设计令牌？
   - **决策**: 使用现有的 `--jnt-duration-*` 和 `--jnt-ease-*`
   - **理由**: 已满足需求
