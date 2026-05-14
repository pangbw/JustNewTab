## ADDED Requirements

### Requirement: 项目依赖管理

项目 SHALL 使用 npm 管理依赖，MUST 包含以下核心依赖：

- `svelte` - 前端框架
- `typescript` - 类型系统
- `vite` - 打包工具
- `@sveltejs/vite-plugin-svelte` - Svelte Vite 插件
- `tailwindcss` - CSS 框架
- `webextension-polyfill` - 浏览器 API 兼容层
- `@types/webextension-polyfill` - 类型定义
- `zod` - 输入验证

#### Scenario: 安装依赖后项目可构建

- **WHEN** 执行 `npm install`
- **THEN** 所有依赖安装成功，无错误
- **AND** 执行 `npm run build` 可成功构建

### Requirement: Vite 多入口打包配置

Vite MUST 配置为支持浏览器扩展的多入口打包。

#### Scenario: newtab 页面入口

- **WHEN** 执行构建
- **THEN** 输出目录 SHALL 包含 `newtab/index.html`
- **AND** 包含对应的 JS 和 CSS 文件

#### Scenario: 构建输出到 dist 目录

- **WHEN** 执行 `npm run build`
- **THEN** 所有构建产物 SHALL 输出到 `dist/` 目录
- **AND** `dist/` 目录 MUST 包含 manifest.json

### Requirement: TypeScript 严格模式

TypeScript MUST 启用严格模式，确保类型安全。

#### Scenario: 类型检查通过

- **WHEN** 执行 `npx tsc --noEmit`
- **THEN** SHALL 无类型错误

### Requirement: Tailwind CSS 集成

Tailwind CSS MUST 正确集成到 Vite 构建流程中。

#### Scenario: Tailwind 类可用

- **WHEN** 在 Svelte 组件中使用 Tailwind 类（如 `class="text-red-500"`）
- **THEN** 构建后 CSS SHALL 包含对应的样式

### Requirement: Chrome Manifest V3

MUST 提供符合 Manifest V3 规范的 `manifest.json`。

#### Scenario: manifest 包含必要字段

- **WHEN** 读取 `manifest.json`
- **THEN** MUST 包含 `manifest_version: 3`
- **AND** MUST 包含 `chrome_url_overrides.newtab` 指向 newtab 页面
- **AND** MUST 包含 `name` 和 `version` 字段

### Requirement: Firefox 兼容 Manifest

MUST 提供 Firefox 兼容的 manifest 配置。

#### Scenario: Firefox manifest 可用

- **WHEN** 构建 Firefox 版本
- **THEN** 输出目录 SHALL 包含 Firefox 兼容的 manifest
- **AND** MUST 使用 `browser_url_overrides` 替代 `chrome_url_overrides`

### Requirement: 浏览器 API Polyfill 封装

MUST 封装 webextension-polyfill，提供统一的浏览器 API 调用接口。

#### Scenario: 统一 API 导出

- **WHEN** 从 `src/lib/browser.ts` 导入 `browser` 对象
- **THEN** SHALL 可以使用标准的 `browser.*` API
- **AND** 在 Chrome 和 Firefox 中行为一致

### Requirement: Svelte 应用入口

MUST 创建 newtab 页面的 Svelte 应用入口。

#### Scenario: newtab 页面可渲染

- **WHEN** 扩展加载到浏览器
- **THEN** 新标签页 SHALL 显示 Svelte 应用
- **AND** 页面 MUST 包含基本的 HTML 结构和样式
