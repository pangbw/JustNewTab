## 1. 设计令牌系统搭建

- [x] 1.1 创建设计令牌文件
  - 文件：`src/styles/tokens.css`
  - 定义所有 CSS 自定义属性
  - 验证：文件存在且包含所有令牌定义

- [x] 1.2 定义颜色令牌
  - 文件：`src/styles/tokens.css`
  - 定义背景色、文本色、品牌色、语义色
  - 验证：所有颜色令牌可用

- [x] 1.3 定义字体令牌
  - 文件：`src/styles/tokens.css`
  - 定义字体族、字体大小、字体粗细
  - 验证：所有字体令牌可用

- [x] 1.4 定义间距令牌
  - 文件：`src/styles/tokens.css`
  - 定义基于 4px 网格的间距
  - 验证：所有间距令牌可用

- [x] 1.5 定义圆角令牌
  - 文件：`src/styles/tokens.css`
  - 定义圆角层级
  - 验证：所有圆角令牌可用

- [x] 1.6 定义阴影令牌
  - 文件：`src/styles/tokens.css`
  - 定义阴影层级
  - 验证：所有阴影令牌可用

- [x] 1.7 定义动画令牌
  - 文件：`src/styles/tokens.css`
  - 定义过渡时间和缓动函数
  - 验证：所有动画令牌可用

## 2. Tailwind 配置集成

- [x] 2.1 扩展 Tailwind 配置
  - 文件：`tailwind.config.js`
  - 引用设计令牌变量
  - 验证：Tailwind 类名可使用设计令牌

- [ ] 2.2 测试 Tailwind 集成
  - 创建测试组件验证 Tailwind 类名
  - 验证：设计令牌在 Tailwind 中可用

## 3. 页面布局重构

- [x] 3.1 重构页面背景样式
  - 文件：`src/newtab/App.svelte`
  - 使用设计令牌定义的背景色
  - 验证：页面背景使用设计令牌

- [x] 3.2 重构页面标题样式
  - 文件：`src/newtab/App.svelte`
  - 使用设计令牌定义的字体和间距
  - 验证：标题样式使用设计令牌

- [x] 3.3 重构区域容器样式
  - 文件：`src/newtab/App.svelte`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：区域容器使用设计令牌

- [x] 3.4 重构区域标题样式
  - 文件：`src/newtab/App.svelte`
  - 使用设计令牌定义的字体和颜色
  - 验证：区域标题使用设计令牌

## 4. 书签块组件重构

- [x] 4.1 重构书签块基础样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：书签块使用设计令牌

- [x] 4.2 重构书签块悬停效果
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的过渡和缓动
  - 验证：悬停效果使用设计令牌

- [x] 4.3 重构书签块拖拽状态
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的品牌色
  - 验证：拖拽状态使用设计令牌

- [x] 4.4 重构书签块标题样式
  - 文件：`src/components/BookmarkArea/BookmarkBlock.svelte`
  - 使用设计令牌定义的字体
  - 验证：标题样式使用设计令牌

## 5. 右键菜单组件重构

- [x] 5.1 重构右键菜单基础样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：右键菜单使用设计令牌

- [x] 5.2 重构右键菜单项样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的字体和颜色
  - 验证：菜单项使用设计令牌

- [x] 5.3 重构右键菜单动画
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的过渡
  - 验证：菜单动画使用设计令牌

## 6. 快速编辑卡片重构

- [x] 6.1 重构快速编辑卡片基础样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：卡片使用设计令牌

- [x] 6.2 重构快速编辑输入框样式
  - 文件：`src/components/BookmarkArea/QuickEdit.svelte`
  - 使用设计令牌定义的背景、边框、圆角
  - 验证：输入框使用设计令牌

- [x] 6.3 重构快速编辑按钮样式
  - 文件：`src/components/BookmarkArea/QuickEdit.svelte`
  - 使用设计令牌定义的品牌色
  - 验证：按钮使用设计令牌

- [x] 6.4 重构快速编辑标签和错误样式
  - 文件：`src/components/BookmarkArea/QuickEdit.svelte`
  - 使用设计令牌定义的字体和颜色
  - 验证：标签和错误使用设计令牌

## 7. 快速配置卡片重构

- [x] 7.1 重构快速配置卡片基础样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：卡片使用设计令牌

- [x] 7.2 重构快速配置输入框样式
  - 文件：`src/components/BookmarkArea/QuickConfig.svelte`
  - 使用设计令牌定义的背景、边框、圆角
  - 验证：输入框使用设计令牌

- [x] 7.3 重构快速配置按钮样式
  - 文件：`src/components/BookmarkArea/QuickConfig.svelte`
  - 使用设计令牌定义的品牌色
  - 验证：按钮使用设计令牌

- [x] 7.4 重构颜色选择器样式
  - 文件：`src/components/BookmarkArea/QuickConfig.svelte`
  - 使用设计令牌定义的品牌色边框
  - 验证：颜色选择器使用设计令牌

- [x] 7.5 重构图标和布局选择器样式
  - 文件：`src/components/BookmarkArea/QuickConfig.svelte`
  - 使用设计令牌定义的品牌色边框
  - 验证：选择器使用设计令牌

## 8. 搜索框组件重构

- [x] 8.1 重构搜索框基础样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角
  - 验证：搜索框使用设计令牌

- [x] 8.2 重构搜索输入框样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的颜色
  - 验证：输入框使用设计令牌

- [x] 8.3 重构搜索下拉列表样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的背景、圆角、阴影
  - 验证：下拉列表使用设计令牌

- [x] 8.4 重构搜索结果项样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的字体和颜色
  - 验证：结果项使用设计令牌

- [x] 8.5 重构搜索高亮样式
  - 文件：`src/styles/bookmark-area.css`
  - 使用设计令牌定义的品牌色
  - 验证：高亮使用设计令牌

## 9. 样式规范文档

- [x] 9.1 创建 UI 样式规范文档
  - 文件：`docs/ui-style-guide.md`
  - 定义设计原则和使用指南
  - 验证：文档存在且内容完整

- [x] 9.2 添加颜色使用指南
  - 文件：`docs/ui-style-guide.md`
  - 定义颜色使用规则
  - 验证：颜色指南完整

- [x] 9.3 添加字体使用指南
  - 文件：`docs/ui-style-guide.md`
  - 定义字体使用规则
  - 验证：字体指南完整

- [x] 9.4 添加组件样式示例
  - 文件：`docs/ui-style-guide.md`
  - 提供卡片、按钮、输入框示例
  - 验证：示例完整

## 10. 测试验证

- [ ] 10.1 在 Chrome 浏览器中测试设计令牌
  - 加载扩展并打开新标签页
  - 验证设计令牌正确应用
  - 检查 CSS 变量是否生效

- [ ] 10.2 在 Firefox 浏览器中测试设计令牌
  - 加载扩展并打开新标签页
  - 验证设计令牌正确应用
  - 测试 Manifest V2/V3 兼容性

- [ ] 10.3 在 Edge 浏览器中测试设计令牌
  - 加载扩展并打开新标签页
  - 验证设计令牌正确应用
  - 测试深色主题可读性

- [ ] 10.4 测试响应式布局
  - 使用浏览器开发者工具测试不同屏幕尺寸
  - 验证设计令牌在响应式布局中生效
  - 测试移动端和桌面端显示

- [ ] 10.5 测试 MiMo 风格一致性
  - 对比参考网站设计风格
  - 验证深色主题、橙色点缀、大面积留白
  - 确认设计风格符合预期

## 11. 浅色主题支持

- [x] 11.1 定义浅色主题颜色令牌
  - 文件：`src/styles/tokens.css`
  - 添加 `[data-theme="light"]` 选择器
  - 定义 Ocean Depths 品牌色（#1565C0 → #81D4FA）
  - 定义浅色背景色（白色 → 浅灰）
  - 定义浅色文本色（深色 → 浅灰）
  - 验证：浅色主题颜色令牌可用

- [x] 11.2 定义浅色主题阴影令牌
  - 文件：`src/styles/tokens.css`
  - 为浅色主题定义更明显的阴影效果
  - 验证：浅色主题阴影效果正确

- [x] 11.3 实现主题切换功能
  - 文件：`src/stores/themeStore.ts`（新建）
  - 创建主题状态管理
  - 实现主题切换函数
  - 支持 localStorage 持久化
  - 支持系统主题检测（prefers-color-scheme）
  - 验证：主题切换功能正常

- [x] 11.4 创建主题切换 UI 组件
  - 文件：`src/components/ThemeToggle.svelte`（新建）
  - 创建主题切换按钮
  - 显示当前主题状态（太阳/月亮图标）
  - 点击切换主题
  - 验证：主题切换按钮显示和功能正常

- [x] 11.5 集成主题切换到页面
  - 文件：`src/newtab/App.svelte`
  - 添加 ThemeToggle 组件
  - 在页面右上角显示
  - 验证：主题切换按钮位置正确

- [x] 11.6 测试浅色主题组件适配
  - 验证书签块在浅色主题下正确显示
  - 验证右键菜单在浅色主题下正确显示
  - 验证输入框在浅色主题下正确显示
  - 验证按钮在浅色主题下正确显示
  - 验证：所有组件在浅色主题下视觉正确

- [x] 11.7 更新样式规范文档
  - 文件：`docs/ui-style-guide.md`
  - 添加浅色主题配色指南
  - 添加主题切换使用说明
  - 验证：文档包含浅色主题信息
