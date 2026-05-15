# JustNewTab UI 样式规范

## 设计原则

1. **深色主题优先** - 采用深色背景，减少视觉疲劳
2. **高对比度** - 确保文本在深色背景上清晰可读
3. **双主题支持** - 支持深色和浅色主题切换
4. **Royal Indigo Night 品牌色** - 深色主题使用靛蓝色系
5. **Ocean Depths 品牌色** - 浅色主题使用海洋蓝色系
6. **大面积留白** - 保持界面简洁，避免视觉拥挤
7. **一致性** - 所有组件使用统一的设计令牌

## 品牌色彩

### 深色主题 - Royal Indigo Night 色板

| 令牌                  | 色值    | 用途                 |
| --------------------- | ------- | -------------------- |
| `--jnt-brand-50`      | #5C6BC0 | 最浅品牌色，用于高亮 |
| `--jnt-brand-100`     | #3F51B5 | 主品牌色             |
| `--jnt-brand-200`     | #303F9F | 深色品牌色           |
| `--jnt-brand-300`     | #283593 | 更深品牌色           |
| `--jnt-brand-400`     | #1A237E | 最深品牌色           |
| `--jnt-brand-primary` | #3F51B5 | 主要操作色           |
| `--jnt-brand-hover`   | #5C6BC0 | 悬停状态             |
| `--jnt-brand-active`  | #303F9F | 按下状态             |

### 浅色主题 - Ocean Depths 色板

| 令牌                  | 色值    | 用途               |
| --------------------- | ------- | ------------------ |
| `--jnt-brand-50`      | #81D4FA | 最浅蓝色，用于高亮 |
| `--jnt-brand-100`     | #29B6F6 | 浅蓝色             |
| `--jnt-brand-200`     | #42A5F5 | 中蓝色             |
| `--jnt-brand-300`     | #1976D2 | 深蓝色             |
| `--jnt-brand-400`     | #1565C0 | 最深蓝色           |
| `--jnt-brand-primary` | #1976D2 | 主要操作色         |
| `--jnt-brand-hover`   | #42A5F5 | 悬停状态           |
| `--jnt-brand-active`  | #1565C0 | 按下状态           |

### 深色主题背景色

| 令牌                 | 色值    | 用途             |
| -------------------- | ------- | ---------------- |
| `--jnt-bg-primary`   | #0f172a | 页面主背景       |
| `--jnt-bg-secondary` | #1e293b | 次级背景         |
| `--jnt-bg-tertiary`  | #1e293b | 卡片、区块背景   |
| `--jnt-bg-elevated`  | #334155 | 悬停、弹出层背景 |

### 浅色主题背景色

| 令牌                 | 色值    | 用途             |
| -------------------- | ------- | ---------------- |
| `--jnt-bg-primary`   | #ffffff | 页面主背景       |
| `--jnt-bg-secondary` | #f8fafc | 次级背景         |
| `--jnt-bg-tertiary`  | #f1f5f9 | 卡片、区块背景   |
| `--jnt-bg-elevated`  | #e2e8f0 | 悬停、弹出层背景 |

### 深色主题文本色

| 令牌                     | 色值    | 用途       |
| ------------------------ | ------- | ---------- |
| `--jnt-text-primary`     | #ffffff | 主要文本   |
| `--jnt-text-secondary`   | #cbd5e1 | 次要文本   |
| `--jnt-text-tertiary`    | #94a3b8 | 辅助文本   |
| `--jnt-text-placeholder` | #64748b | 占位符文本 |

### 浅色主题文本色

| 令牌                     | 色值    | 用途       |
| ------------------------ | ------- | ---------- |
| `--jnt-text-primary`     | #0f172a | 主要文本   |
| `--jnt-text-secondary`   | #334155 | 次要文本   |
| `--jnt-text-tertiary`    | #64748b | 辅助文本   |
| `--jnt-text-placeholder` | #94a3b8 | 占位符文本 |

### 语义色

| 令牌                  | 深色主题 | 浅色主题 | 用途     |
| --------------------- | -------- | -------- | -------- |
| `--jnt-color-success` | #22c55e  | #16a34a  | 成功状态 |
| `--jnt-color-warning` | #eab308  | #ca8a04  | 警告状态 |
| `--jnt-color-error`   | #ef4444  | #dc2626  | 错误状态 |
| `--jnt-color-info`    | #3b82f6  | #2563eb  | 信息提示 |

## 字体系统

### 字体族

| 令牌              | 值                                   | 用途     |
| ----------------- | ------------------------------------ | -------- |
| `--jnt-font-sans` | system-ui, -apple-system, sans-serif | 正文文本 |
| `--jnt-font-mono` | ui-monospace, monospace              | 代码文本 |

### 字体大小

| 令牌              | 值       | Tailwind 类     |
| ----------------- | -------- | --------------- |
| `--jnt-text-xs`   | 0.75rem  | `text-jnt-xs`   |
| `--jnt-text-sm`   | 0.875rem | `text-jnt-sm`   |
| `--jnt-text-base` | 1rem     | `text-jnt-base` |
| `--jnt-text-lg`   | 1.125rem | `text-jnt-lg`   |
| `--jnt-text-xl`   | 1.25rem  | `text-jnt-xl`   |
| `--jnt-text-2xl`  | 1.5rem   | `text-jnt-2xl`  |
| `--jnt-text-3xl`  | 1.875rem | `text-jnt-3xl`  |

### 字体粗细

| 令牌                  | 值  | Tailwind 类         |
| --------------------- | --- | ------------------- |
| `--jnt-font-normal`   | 400 | `font-jnt-normal`   |
| `--jnt-font-medium`   | 500 | `font-jnt-medium`   |
| `--jnt-font-semibold` | 600 | `font-jnt-semibold` |
| `--jnt-font-bold`     | 700 | `font-jnt-bold`     |

## 间距系统

基于 4px 网格的间距系统：

| 令牌            | 值      | Tailwind 类                       |
| --------------- | ------- | --------------------------------- |
| `--jnt-space-1` | 0.25rem | `p-jnt-1`, `m-jnt-1`, `gap-jnt-1` |
| `--jnt-space-2` | 0.5rem  | `p-jnt-2`, `m-jnt-2`, `gap-jnt-2` |
| `--jnt-space-3` | 0.75rem | `p-jnt-3`, `m-jnt-3`, `gap-jnt-3` |
| `--jnt-space-4` | 1rem    | `p-jnt-4`, `m-jnt-4`, `gap-jnt-4` |
| `--jnt-space-5` | 1.25rem | `p-jnt-5`, `m-jnt-5`, `gap-jnt-5` |
| `--jnt-space-6` | 1.5rem  | `p-jnt-6`, `m-jnt-6`, `gap-jnt-6` |
| `--jnt-space-8` | 2rem    | `p-jnt-8`, `m-jnt-8`, `gap-jnt-8` |

## 圆角系统

| 令牌                | 值       | Tailwind 类        | 用途         |
| ------------------- | -------- | ------------------ | ------------ |
| `--jnt-radius-sm`   | 0.25rem  | `rounded-jnt-sm`   | 小元素       |
| `--jnt-radius-md`   | 0.375rem | `rounded-jnt-md`   | 按钮、输入框 |
| `--jnt-radius-lg`   | 0.5rem   | `rounded-jnt-lg`   | 卡片         |
| `--jnt-radius-xl`   | 0.75rem  | `rounded-jnt-xl`   | 大卡片       |
| `--jnt-radius-full` | 9999px   | `rounded-jnt-full` | 圆形         |

## 阴影系统

| 令牌              | 值                          | Tailwind 类     | 用途     |
| ----------------- | --------------------------- | --------------- | -------- |
| `--jnt-shadow-sm` | 0 1px 2px rgba(0,0,0,0.3)   | `shadow-jnt-sm` | 轻微阴影 |
| `--jnt-shadow-md` | 0 4px 6px rgba(0,0,0,0.3)   | `shadow-jnt-md` | 中等阴影 |
| `--jnt-shadow-lg` | 0 10px 15px rgba(0,0,0,0.3) | `shadow-jnt-lg` | 明显阴影 |
| `--jnt-shadow-xl` | 0 20px 25px rgba(0,0,0,0.3) | `shadow-jnt-xl` | 强烈阴影 |

## 动画系统

### 过渡时间

| 令牌                    | 值    | Tailwind 类           |
| ----------------------- | ----- | --------------------- |
| `--jnt-duration-fast`   | 150ms | `duration-jnt-fast`   |
| `--jnt-duration-normal` | 200ms | `duration-jnt-normal` |
| `--jnt-duration-slow`   | 300ms | `duration-jnt-slow`   |

### 缓动函数

| 令牌                  | 值                           | Tailwind 类         |
| --------------------- | ---------------------------- | ------------------- |
| `--jnt-ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | `ease-jnt-standard` |
| `--jnt-ease-in`       | cubic-bezier(0.4, 0, 1, 1)   | `ease-jnt-in`       |
| `--jnt-ease-out`      | cubic-bezier(0, 0, 0.2, 1)   | `ease-jnt-out`      |

## 组件样式示例

### 卡片

```html
<div class="bg-jnt-bg-tertiary rounded-jnt-xl p-jnt-5 shadow-jnt-md">
  <h3 class="text-jnt-lg font-jnt-semibold text-jnt-text-primary mb-jnt-3">
    标题
  </h3>
  <p class="text-jnt-sm text-jnt-text-secondary">内容</p>
</div>
```

### 按钮

**主要按钮：**

```html
<button
  class="bg-jnt-brand-primary hover:bg-jnt-brand-hover text-white px-jnt-4 py-jnt-2 rounded-jnt-lg text-jnt-sm font-jnt-medium transition-colors duration-jnt-fast"
>
  操作
</button>
```

**次要按钮：**

```html
<button
  class="text-jnt-text-tertiary hover:text-jnt-text-secondary px-jnt-4 py-jnt-2 rounded-jnt-lg text-jnt-sm transition-colors duration-jnt-fast"
>
  取消
</button>
```

### 输入框

```html
<input
  type="text"
  class="w-full bg-jnt-bg-elevated/50 text-jnt-text-primary text-jnt-sm rounded-jnt-lg px-jnt-3 py-jnt-2 outline-none focus:ring-1 focus:ring-jnt-brand-primary"
  placeholder="输入内容..."
/>
```

### 标签

```html
<label class="text-jnt-xs text-jnt-text-tertiary mb-1 block">标签名</label>
```

### 错误提示

```html
<p class="text-jnt-error text-jnt-xs mt-1">错误信息</p>
```

## 使用指南

### 颜色使用规则

1. **背景色层级**：primary → secondary → tertiary → elevated（由深到浅）
2. **文本色层级**：primary → secondary → tertiary → placeholder（由亮到暗）
3. **品牌色用途**：主要操作按钮、选中状态、高亮显示
4. **语义色用途**：仅用于状态提示（成功、警告、错误、信息）

### 字体使用规则

1. **标题**：使用 `text-jnt-lg` 以上，`font-jnt-semibold` 或 `font-jnt-bold`
2. **正文**：使用 `text-jnt-sm` 或 `text-jnt-base`，`font-jnt-normal`
3. **辅助文本**：使用 `text-jnt-xs`，`text-jnt-text-tertiary`
4. **代码**：使用 `font-jnt-mono`

### 间距使用规则

1. **组件内间距**：使用 `p-jnt-3` 到 `p-jnt-5`
2. **组件间间距**：使用 `gap-jnt-4` 到 `gap-jnt-6`
3. **元素间间距**：使用 `mb-jnt-2` 到 `mb-jnt-4`

## 主题切换

### 主题切换机制

系统使用 `data-theme` 属性在 `<html>` 元素上切换主题：

```html
<!-- 深色主题（默认） -->
<html data-theme="dark">
  <!-- 浅色主题 -->
  <html data-theme="light"></html>
</html>
```

### 主题切换组件

使用 `ThemeToggle` 组件进行主题切换：

```svelte
<script>
  import ThemeToggle from '@/components/ThemeToggle.svelte';
</script>

<ThemeToggle />
```

### 主题切换 Store

使用 `themeStore` 管理主题状态：

```typescript
import { currentTheme, toggleTheme, setTheme } from "@/stores/themeStore";

// 读取当前主题
$currentTheme; // 'light' | 'dark'

// 切换主题
toggleTheme();

// 设置特定主题
setTheme("light");
```

### 主题持久化

主题偏好自动保存到 `localStorage`：

- 键名：`justnewtab_theme`
- 值：`'light'` 或 `'dark'`
- 如果没有保存的偏好，自动检测系统主题（`prefers-color-scheme`）

### 添加新主题

如需添加新主题，在 `tokens.css` 中添加新的 `[data-theme="xxx"]` 选择器：

```css
[data-theme="custom"] {
  --jnt-bg-primary: #custom-color;
  --jnt-text-primary: #custom-color;
  /* ... 其他令牌 ... */
}
```
