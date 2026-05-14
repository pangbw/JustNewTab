## 1. 项目初始化

- [x] 1.1 创建 `package.json`，定义项目元信息和依赖
- [x] 1.2 安装依赖：`npm install`
- [x] 1.3 创建 `.gitignore` 更新（添加 `node_modules/`、`dist/`）

## 2. 构建工具配置

- [x] 2.1 创建 `vite.config.ts`，配置 Svelte 插件和多入口打包
- [x] 2.2 创建 `tsconfig.json`，启用严格模式
- [x] 2.3 创建 `tailwind.config.js`，配置内容扫描路径
- [x] 2.4 创建 `postcss.config.js`，集成 Tailwind 插件

## 3. 浏览器扩展 Manifest

- [x] 3.1 创建 `manifest.json`（Chrome MV3），包含 `chrome_url_overrides.newtab`
- [x] 3.2 创建 `manifest.firefox.json`（Firefox 兼容），使用 `browser_url_overrides`

## 4. Svelte 应用入口

- [x] 4.1 创建 `src/newtab/index.html` 入口 HTML 文件
- [x] 4.2 创建 `src/newtab/main.ts` Svelte 挂载点
- [x] 4.3 创建 `src/newtab/App.svelte` 根组件（包含 Tailwind 基础样式）

## 5. 共享模块

- [x] 5.1 创建 `src/lib/browser.ts`，封装 webextension-polyfill
- [x] 5.2 创建 `src/types/index.ts`，定义共享类型

## 6. 验证

- [x] 6.1 执行 `npm run build`，确认构建成功
- [x] 6.2 检查 `dist/` 目录包含 newtab 页面和 manifest
- [x] 6.3 执行 `npx tsc --noEmit`，确认无类型错误
