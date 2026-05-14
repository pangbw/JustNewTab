## Why

项目目前只有配置文件（CLAUDE.md、OpenSpec config），没有任何源代码、构建工具或依赖管理。需要搭建基础脚手架才能开始功能开发。

## What Changes

- 创建 `package.json` 管理项目依赖和脚本
- 配置 Vite 作为打包工具，支持多入口（newtab 页面）
- 配置 TypeScript 严格模式
- 集成 Tailwind CSS
- 创建 Chrome MV3 manifest 和 Firefox 兼容 manifest
- 搭建 Svelte 应用基础结构（newtab 入口）
- 封装 webextension-polyfill 统一浏览器 API

## Capabilities

### New Capabilities

- `project-scaffolding`: 项目构建基础设施，包含依赖管理、打包配置、浏览器扩展 manifest、Svelte 应用入口

### Modified Capabilities

<!-- 无现有能力需要修改 -->

## Impact

- `package.json`: 新建 - 项目依赖和脚本
- `vite.config.ts`: 新建 - Vite 打包配置
- `tsconfig.json`: 新建 - TypeScript 配置
- `tailwind.config.js`: 新建 - Tailwind CSS 配置
- `manifest.json`: 新建 - Chrome MV3 扩展配置
- `manifest.firefox.json`: 新建 - Firefox 兼容配置
- `src/newtab/`: 新建 - 新标签页 Svelte 应用入口
- `src/lib/browser.ts`: 新建 - 浏览器 API polyfill 封装
- `src/types/`: 新建 - 共享类型定义

## 非目标

- 不实现具体业务功能（书签管理器、便签等）
- 不配置 CI/CD 流程
- 不添加单元测试或 E2E 测试框架（后续 change 处理）
- 不实现 popup 或 options 页面

## 多浏览器兼容性影响

- Chrome/Edge 使用 Manifest V3，Firefox 使用 MV2/V3 兼容方案
- webextension-polyfill 统一 `chrome`/`browser` API 差异
- 构建时需生成两份 manifest，体积影响极小（仅 manifest 文件差异）

## 扩展体积影响

- 脚手架本身不增加用户可见的扩展体积
- 依赖（Svelte、Tailwind、polyfill）会增加约 50-80KB 打包体积
- Vite tree-shaking 会自动移除未使用的代码
