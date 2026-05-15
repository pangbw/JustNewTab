## ADDED Requirements

### Requirement: UI 样式规范文档

系统 SHALL 提供 UI 样式规范文档，指导组件开发。

#### Scenario: 规范文档存在

- **WHEN** 开发者需要了解样式规范时
- **THEN** 系统包含 `docs/ui-style-guide.md` 文件
- **AND** 文件定义所有样式规范

#### Scenario: 规范文档内容

- **WHEN** 开发者阅读规范文档时
- **THEN** 文档包含以下内容：
  - 设计原则和理念
  - 颜色使用指南
  - 字体使用指南
  - 间距使用指南
  - 组件样式示例

### Requirement: 设计原则

系统 SHALL 定义清晰的设计原则。

#### Scenario: 设计原则定义

- **WHEN** 开发者需要理解设计理念时
- **THEN** 系统定义以下设计原则：
  - 极简主义：界面简洁，信息层次清晰
  - 科技未来感：深色主题，高对比度
  - 品牌识别度：Royal Indigo Night 配色，统一风格
  - 呼吸感：大面积留白，避免拥挤

### Requirement: 颜色使用指南

系统 SHALL 定义颜色使用规范。

#### Scenario: 背景色使用

- **WHEN** 开发者需要设置背景色时
- **THEN** 系统定义背景色使用规则：
  - 最深背景用于页面背景
  - 次深背景用于主要容器
  - 中等背景用于卡片和区块
  - 提升背景用于悬停和激活状态

#### Scenario: 文本色使用

- **WHEN** 开发者需要设置文本色时
- **THEN** 系统定义文本色使用规则：
  - 主文本用于标题和重要内容
  - 次文本用于正文
  - 辅助文本用于说明和注释
  - 占位文本用于输入框占位符

#### Scenario: 品牌色使用

- **WHEN** 开发者需要使用品牌色时
- **THEN** 系统定义品牌色使用规则：
  - 主品牌色用于强调和行动点
  - 品牌悬停色用于交互反馈
  - 品牌激活色用于按下状态

### Requirement: 字体使用指南

系统 SHALL 定义字体使用规范。

#### Scenario: 字体层级

- **WHEN** 开发者需要设置字体时
- **THEN** 系统定义字体层级：
  - 大标题：3xl，粗体
  - 标题：2xl，半粗体
  - 小标题：xl，半粗体
  - 正文：base，正常
  - 辅助文本：sm，正常
  - 小字：xs，正常

### Requirement: 间距使用指南

系统 SHALL 定义间距使用规范。

#### Scenario: 间距使用规则

- **WHEN** 开发者需要设置间距时
- **THEN** 系统定义间距使用规则：
  - 组件内间距：space-2 到 space-4
  - 组件间间距：space-4 到 space-6
  - 区块间间距：space-8 到 space-12
  - 页面边距：space-6

### Requirement: 组件样式示例

系统 SHALL 提供组件样式示例。

#### Scenario: 卡片组件示例

- **WHEN** 开发者需要创建卡片组件时
- **THEN** 系统提供卡片样式示例：
  - 背景色：bg-tertiary
  - 圆角：radius-lg
  - 内边距：space-4
  - 阴影：shadow-md
  - 悬停效果：bg-elevated + shadow-lg

#### Scenario: 按钮组件示例

- **WHEN** 开发者需要创建按钮组件时
- **THEN** 系统提供按钮样式示例：
  - 主按钮：品牌色背景，白色文本
  - 次按钮：透明背景，品牌色边框
  - 文字按钮：透明背景，品牌色文本

#### Scenario: 输入框组件示例

- **WHEN** 开发者需要创建输入框组件时
- **THEN** 系统提供输入框样式示例：
  - 背景色：bg-elevated
  - 边框：1px solid slate-600
  - 圆角：radius-md
  - 内边距：space-3
  - 焦点状态：品牌色边框

### Requirement: 设计风格参考

系统 SHALL 定义统一的设计风格。

#### Scenario: 设计风格参考

- **WHEN** 开发者需要了解设计风格时
- **THEN** 系统定义以下风格：
  - 深色主题，高对比度
  - Royal Indigo Night 配色作为品牌色（#1A237E → #5C6BC0）
  - 大面积留白，呼吸感强
  - 圆角矩形组件，柔和阴影
  - 极简主义 + 品牌叙事性
