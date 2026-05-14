## Context

JustNewTab 是一个全新的浏览器扩展项目，目前只有配置文件。需要从零搭建项目基础设施，为后续功能开发做好准备。

## Goals / Non-Goals

**Goals:**

- 建立可运行的项目构建流程
- 配置多浏览器兼容的扩展 manifest
- 创建 newtab 页面的 Svelte 应用入口
- 封装浏览器 API 兼容层

**Non-Goals:**

- 不实现具体业务功能
- 不配置测试框架
- 不添加 CI/CD
- 不实现 popup/options 页面

## Decisions

### Decision 1: 使用 Vite 作为打包工具

选择 Vite 而非 Webpack，原因：

- 更快的开发体验（原生 ESM）
- Svelte 官方推荐
- 配置简单，适合小型扩展
- 内置 TypeScript 支持

### Decision 2: 多入口打包策略

浏览器扩展需要多个独立入口（newtab、popup、options 等）。采用 Vite 的 `rollupOptions.input` 配置多入口：

```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      input: {
        newtab: "src/newtab/index.html",
      },
    },
  },
};
```

每个入口对应一个独立的 HTML 文件和 Svelte 应用实例。

### Decision 3: Manifest 双版本方案

Chrome 使用 MV3，Firefox 需要 MV2/MV3 兼容。方案：

- 维护 `manifest.json`（Chrome MV3）
- 维护 `manifest.firefox.json`（Firefox 兼容）
- 构建脚本根据目标浏览器复制对应的 manifest

### Decision 4: webextension-polyfill 封装

使用 `webextension-polyfill` 统一 `chrome`/`browser` API。在 `src/lib/browser.ts` 中导出：

```typescript
import browser from "webextension-polyfill";
export { browser };
```

所有需要浏览器 API 的模块统一从此处导入，避免直接使用 `chrome.*` 或 `browser.*`。

### Decision 5: Tailwind CSS 集成方式

使用 Tailwind CSS v3 + PostCSS 方案：

- `tailwind.config.js` 配置内容扫描路径
- `postcss.config.js` 集成 Tailwind 插件
- 在 Svelte 组件中直接使用 Tailwind 类

## 文件结构

```
JustNewTab/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── manifest.json              ← Chrome MV3
├── manifest.firefox.json      ← Firefox 兼容
├── src/
│   ├── newtab/
│   │   ├── index.html         ← 入口 HTML
│   │   ├── main.ts            ← Svelte 挂载点
│   │   └── App.svelte         ← 根组件
│   ├── lib/
│   │   └── browser.ts         ← polyfill 封装
│   └── types/
│       └── index.ts           ← 共享类型
└── public/
    └── icons/                 ← 扩展图标（占位）
```
