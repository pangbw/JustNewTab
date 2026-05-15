# 设计令牌

## Purpose

提供统一的设计令牌系统，定义所有基础样式变量，确保整个应用的视觉一致性。

## Requirements

### Requirement: 设计令牌文件

系统 SHALL 提供统一的设计令牌文件，定义所有基础样式变量。

#### Scenario: 令牌文件存在

- **WHEN** 项目构建时
- **THEN** 系统包含 `src/styles/tokens.css` 文件
- **AND** 文件定义所有设计令牌

#### Scenario: 令牌文件格式

- **WHEN** 令牌文件被加载时
- **THEN** 系统使用 CSS 自定义属性格式定义令牌
- **AND** 令牌以 `--jnt-` 前缀命名

### Requirement: 颜色令牌

系统 SHALL 定义完整的颜色令牌系统。

#### Scenario: 背景颜色令牌

- **WHEN** 组件需要背景色时
- **THEN** 系统提供以下背景色令牌：
  - `--jnt-bg-primary`: 最深背景色（slate-950）
  - `--jnt-bg-secondary`: 次深背景色（slate-900）
  - `--jnt-bg-tertiary`: 中等背景色（slate-800）
  - `--jnt-bg-elevated`: 提升背景色（slate-700）

#### Scenario: 文本颜色令牌

- **WHEN** 组件需要文本色时
- **THEN** 系统提供以下文本色令牌：
  - `--jnt-text-primary`: 主文本色（white）
  - `--jnt-text-secondary`: 次文本色（slate-300）
  - `--jnt-text-tertiary`: 辅助文本色（slate-400）
  - `--jnt-text-placeholder`: 占位文本色（slate-500）

#### Scenario: 品牌颜色令牌

- **WHEN** 组件需要品牌色时
- **THEN** 系统提供品牌色令牌（Royal Indigo Night 配色）：
  - `--jnt-brand-50`: 最浅品牌色（#5C6BC0）
  - `--jnt-brand-100`: 浅品牌色（#3F51B5）
  - `--jnt-brand-200`: 中品牌色（#303F9F）
  - `--jnt-brand-300`: 深品牌色（#283593）
  - `--jnt-brand-400`: 最深品牌色（#1A237E）
  - `--jnt-brand-primary`: 主品牌色（#3F51B5）
  - `--jnt-brand-hover`: 品牌悬停色（#5C6BC0）
  - `--jnt-brand-active`: 品牌激活色（#303F9F）

#### Scenario: 语义颜色令牌

- **WHEN** 组件需要语义色时
- **THEN** 系统提供以下语义色令牌：
  - `--jnt-color-success`: 成功色（绿色）
  - `--jnt-color-warning`: 警告色（黄色）
  - `--jnt-color-error`: 错误色（红色）
  - `--jnt-color-info`: 信息色（蓝色）

### Requirement: 字体令牌

系统 SHALL 定义统一的字体令牌。

#### Scenario: 字体族令牌

- **WHEN** 组件需要设置字体时
- **THEN** 系统提供字体族令牌：
  - `--jnt-font-sans`: 无衬线字体栈
  - `--jnt-font-mono`: 等宽字体栈

#### Scenario: 字体大小令牌

- **WHEN** 组件需要设置字体大小时
- **THEN** 系统提供字体大小令牌：
  - `--jnt-text-xs`: 小号字体（12px）
  - `--jnt-text-sm`: 标准小号字体（14px）
  - `--jnt-text-base`: 基础字体（16px）
  - `--jnt-text-lg`: 大号字体（18px）
  - `--jnt-text-xl`: 超大号字体（20px）
  - `--jnt-text-2xl`: 标题字体（24px）
  - `--jnt-text-3xl`: 大标题字体（30px）

#### Scenario: 字体粗细令牌

- **WHEN** 组件需要设置字体粗细时
- **THEN** 系统提供字体粗细令牌：
  - `--jnt-font-normal`: 正常（400）
  - `--jnt-font-medium`: 中等（500）
  - `--jnt-font-semibold`: 半粗（600）
  - `--jnt-font-bold`: 粗体（700）

### Requirement: 间距令牌

系统 SHALL 定义统一的间距令牌。

#### Scenario: 间距令牌

- **WHEN** 组件需要设置间距时
- **THEN** 系统提供基于 4px 网格的间距令牌：
  - `--jnt-space-1`: 4px
  - `--jnt-space-2`: 8px
  - `--jnt-space-3`: 12px
  - `--jnt-space-4`: 16px
  - `--jnt-space-5`: 20px
  - `--jnt-space-6`: 24px
  - `--jnt-space-8`: 32px
  - `--jnt-space-10`: 40px
  - `--jnt-space-12`: 48px

### Requirement: 圆角令牌

系统 SHALL 定义统一的圆角令牌。

#### Scenario: 圆角令牌

- **WHEN** 组件需要设置圆角时
- **THEN** 系统提供圆角令牌：
  - `--jnt-radius-sm`: 小圆角（4px）
  - `--jnt-radius-md`: 中圆角（8px）
  - `--jnt-radius-lg`: 大圆角（12px）
  - `--jnt-radius-xl`: 超大圆角（16px）
  - `--jnt-radius-full`: 完全圆角（9999px）

### Requirement: 阴影令牌

系统 SHALL 定义统一的阴影令牌。

#### Scenario: 阴影令牌

- **WHEN** 组件需要设置阴影时
- **THEN** 系统提供阴影令牌：
  - `--jnt-shadow-sm`: 轻微阴影
  - `--jnt-shadow-md`: 标准阴影
  - `--jnt-shadow-lg`: 显著阴影
  - `--jnt-shadow-xl`: 悬浮阴影

### Requirement: 动画令牌

系统 SHALL 定义统一的动画令牌。

#### Scenario: 过渡时间令牌

- **WHEN** 组件需要设置过渡时间时
- **THEN** 系统提供过渡时间令牌：
  - `--jnt-duration-fast`: 快速过渡（150ms）
  - `--jnt-duration-normal`: 标准过渡（200ms）
  - `--jnt-duration-slow`: 缓慢过渡（300ms）

#### Scenario: 缓动函数令牌

- **WHEN** 组件需要设置缓动函数时
- **THEN** 系统提供缓动函数令牌：
  - `--jnt-ease-standard`: 标准缓动（ease-in-out）
  - `--jnt-ease-in`: 进入缓动（ease-in）
  - `--jnt-ease-out`: 退出缓动（ease-out）

### Requirement: Tailwind 集成

系统 SHALL 将设计令牌集成到 Tailwind CSS 配置中。

#### Scenario: Tailwind 配置扩展

- **WHEN** Tailwind CSS 编译时
- **THEN** 系统在 `tailwind.config.js` 中扩展配置
- **AND** 配置引用设计令牌变量

#### Scenario: Tailwind 类名可用

- **WHEN** 开发者使用 Tailwind 类名时
- **THEN** 系统支持使用设计令牌定义的值
- **AND** 类名与设计令牌保持一致
