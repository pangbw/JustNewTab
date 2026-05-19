# JustNewTab

一款多浏览器可用的新标签页插件，提供书签管理和 TODO 便签功能。

## 功能

- **书签管理** - 在新标签页展示和管理浏览器书签
  - 多工作区支持，每个工作区独立管理书签块和书签
  - 书签块支持创建、编辑、删除、拖拽排序、折叠/展开
  - 书签支持快速编辑、删除、新标签页打开
  - 书签搜索功能，支持实时搜索和历史记录
  - 已打开标签页检测和快速关闭
  - 数据持久化到 localStorage

- **TODO 便签** - 快速记录待办事项和便签（待实现）

- **主题切换** - 支持深色/浅色模式切换

## 界面布局

- **顶栏** - 工作区页签切换、搜索框、TODO 展开/收起按钮
- **主区域** - 双栏布局（书签区域 75% + TODO 区域 25%）
- **底栏** - 应用标题、Tailwind 测试按钮、主题切换按钮

## 技术栈

- **前端框架**: Svelte 5 + TypeScript
- **CSS**: Tailwind CSS + 自定义设计令牌系统
- **打包工具**: Vite
- **跨浏览器兼容**: webextension-polyfill（Manifest V3）
- **状态管理**: Svelte 5 Stores（响应式派生 store）
- **数据持久化**: localStorage

## 项目结构

```
src/
├── components/
│   └── BookmarkArea/       # 书签区域组件
│       ├── BookmarkArea.svelte     # 主容器
│       ├── BookmarkBlock.svelte    # 书签块
│       ├── BookmarkItem.svelte     # 书签项
│       ├── BookmarkDialog.svelte   # 创建书签对话框
│       ├── ConfirmDialog.svelte    # 确认对话框
│       ├── ContextMenu.svelte      # 右键菜单
│       ├── QuickConfig.svelte      # 快速配置卡片
│       ├── QuickEdit.svelte        # 快速编辑卡片
│       ├── SearchBox.svelte        # 搜索框
│       └── WorkspaceTabs.svelte    # 工作区页签
├── stores/                 # 状态管理
│   ├── bookmarkStore.ts    # 书签数据 store
│   ├── workspaceStore.ts   # 工作区 store
│   ├── searchStore.ts      # 搜索 store
│   ├── tabStore.ts         # 标签页 store
│   └── themeStore.ts       # 主题 store
├── styles/                 # 样式
│   ├── tokens.css          # 设计令牌（颜色、字体、间距、圆角、阴影、动画）
│   └── global.css          # 全局样式
├── types/                  # TypeScript 类型定义
├── utils/                  # 工具函数
│   └── storage.ts          # localStorage 持久化
├── adapters/               # 浏览器 API 适配器
└── newtab/                 # 新标签页入口
    └── App.svelte          # 主应用组件
```

## 设计令牌

项目使用完整的 CSS 自定义属性（CSS Variables）设计令牌系统：

- **颜色**: 背景色、文本色、品牌色（Royal Indigo Night / Ocean Depths）、语义色
- **字体**: 字体族、字号（xs ~ 3xl）、字重
- **间距**: 基于 4px 网格（1 ~ 12）
- **圆角**: sm / md / lg / xl / full
- **阴影**: sm / md / lg / xl
- **动画**: 过渡时间（fast / normal / slow）、缓动函数

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（热重载）
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 类型检查
pnpm check

# 运行测试
pnpm test
```

## 浏览器扩展构建

```bash
# 构建 Chrome/Edge 扩展（Manifest V3）
pnpm build

# 输出目录: dist/
# - manifest.json: 扩展配置
# - newtab/: 新标签页 HTML 和资源
```

## 多浏览器兼容性

- Chrome: Manifest V3
- Edge: Manifest V3
- Firefox: Manifest V2/V3（需适配）

## 许可证

[Apache License 2.0](LICENSE)
