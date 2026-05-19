## MODIFIED Requirements

### Requirement: 快速配置图标显示

系统应在每个书签块上显示快速配置图标，使用设计令牌系统。

#### Scenario: 图标位置

- **WHEN** 书签块显示时
- **THEN** 系统在书签块右上角显示快速配置图标（齿轮或铅笔）
- **AND** 图标使用设计令牌定义的样式

#### Scenario: 图标可见性

- **WHEN** 用户将鼠标悬停在书签块上
- **THEN** 系统以淡入动画显示快速配置图标
- **AND** 图标使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

### Requirement: 快速配置卡片显示

系统应在用户点击快速配置图标时显示配置卡片，使用设计令牌系统。

#### Scenario: 显示配置卡片

- **WHEN** 用户点击快速配置图标
- **THEN** 系统在图标下方显示浮动配置卡片
- **AND** 卡片使用设计令牌定义的深色主题样式

#### Scenario: 卡片定位

- **WHEN** 配置卡片显示时
- **THEN** 系统将卡片定位在视口范围内

#### Scenario: 卡片动画

- **WHEN** 配置卡片出现时
- **THEN** 系统显示平滑的淡入和缩放动画
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）

### Requirement: 书签块名称编辑

系统应允许用户在配置卡片中编辑书签块名称。

#### Scenario: 编辑书签块名称

- **WHEN** 用户点击快速配置图标且卡片出现后
- **THEN** 系统显示包含当前书签块名称的输入框
- **AND** 输入框使用设计令牌定义的样式

#### Scenario: 保存书签块名称

- **WHEN** 用户修改书签块名称并按下 Enter 或点击保存
- **THEN** 系统保存新名称并更新书签块标题

#### Scenario: 取消名称编辑

- **WHEN** 用户按下 Escape 或点击取消
- **THEN** 系统丢弃更改并关闭卡片

### Requirement: 书签块颜色编辑

系统应允许用户在配置卡片中编辑书签块颜色。

#### Scenario: 显示颜色选项

- **WHEN** 配置卡片显示时
- **THEN** 系统显示预定义颜色的调色板
- **AND** 调色板使用设计令牌定义的样式

#### Scenario: 选择颜色

- **WHEN** 用户点击调色板中的某个颜色
- **THEN** 系统将该颜色应用到书签块标题并保存

#### Scenario: 自定义颜色

- **WHEN** 用户点击"自定义颜色"
- **THEN** 系统显示颜色选择器供用户自定义颜色

### Requirement: 书签块图标编辑

系统应允许用户在配置卡片中编辑书签块图标。

#### Scenario: 显示图标选项

- **WHEN** 配置卡片显示时
- **THEN** 系统显示预定义图标的选择列表
- **AND** 图标选择列表使用设计令牌定义的样式

#### Scenario: 选择图标

- **WHEN** 用户点击某个图标
- **THEN** 系统将该图标应用到书签块并保存

#### Scenario: 移除图标

- **WHEN** 用户点击"移除图标"
- **THEN** 系统从书签块中移除图标

### Requirement: 书签块布局选项

系统应允许用户在配置卡片中配置书签块布局。

#### Scenario: 网格布局选项

- **WHEN** 用户选择"网格布局"
- **THEN** 系统以网格格式显示书签

#### Scenario: 列表布局选项

- **WHEN** 用户选择"列表布局"
- **THEN** 系统以列表格式显示书签

#### Scenario: 保存布局偏好

- **WHEN** 用户更改布局选项
- **THEN** 系统保存偏好并立即应用

### Requirement: 快速配置卡片关闭

系统应在用户点击卡片外部时关闭配置卡片。

#### Scenario: 点击卡片外部

- **WHEN** 用户点击配置卡片外部区域
- **THEN** 系统关闭卡片并保存待处理的更改

#### Scenario: 按下 Escape 键

- **WHEN** 用户在卡片打开时按下 Escape
- **THEN** 系统关闭卡片并丢弃未保存的更改

### Requirement: 配置持久化

系统应在会话之间保持书签块配置。

#### Scenario: 保存配置

- **WHEN** 用户修改书签块配置
- **THEN** 系统立即将更改保存到本地存储

#### Scenario: 恢复配置

- **WHEN** 用户关闭并重新打开浏览器
- **THEN** 系统恢复所有书签块配置（名称、颜色、图标、布局）

### Requirement: 快速配置验证

系统应验证配置卡片中的用户输入。

#### Scenario: 验证书签块名称

- **WHEN** 用户输入空的书签块名称
- **THEN** 系统显示错误信息："书签块名称不能为空"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

#### Scenario: 验证书签块名称长度

- **WHEN** 用户输入超过 50 个字符的书签块名称
- **THEN** 系统显示错误信息："书签块名称不能超过 50 个字符"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

#### Scenario: 验证书签块名称唯一性

- **WHEN** 用户输入在当前工作区中已存在的书签块名称
- **THEN** 系统显示错误信息："书签块名称已存在"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 快速配置撤销

系统应允许用户撤销配置更改。

#### Scenario: 撤销上次更改

- **WHEN** 用户在卡片打开时按下 Ctrl+Z
- **THEN** 系统撤销上次配置更改

#### Scenario: 重置为默认值

- **WHEN** 用户点击"重置为默认值"
- **THEN** 系统将所有书签块配置重置为默认值

### Requirement: 快速配置卡片样式

系统应确保快速配置卡片使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 卡片外观

- **WHEN** 快速配置卡片显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-xl)）
- **AND** 使用设计令牌定义的阴影（var(--jnt-shadow-xl)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-4)）
- **AND** 使用固定宽度（w-72）

#### Scenario: 卡片标题样式

- **WHEN** 卡片标题显示时
- **THEN** 系统使用设计令牌定义的字体大小（var(--jnt-text-sm)）
- **AND** 使用设计令牌定义的字体粗细（var(--jnt-font-medium)）
- **AND** 使用设计令牌定义的主文本色（var(--jnt-text-primary)）

#### Scenario: 输入框样式

- **WHEN** 输入框显示时
- **THEN** 系统使用设计令牌定义的提升背景色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-md)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-3)）
- **AND** 使用设计令牌定义的主文本色（var(--jnt-text-primary)）
- **AND** 焦点状态使用品牌色边框（var(--jnt-brand-primary)）

#### Scenario: 标签样式

- **WHEN** 输入框标签显示时
- **THEN** 系统使用设计令牌定义的字体大小（var(--jnt-text-xs)）
- **AND** 使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

#### Scenario: 按钮样式

- **WHEN** 按钮显示时
- **THEN** 主要按钮使用品牌色背景（var(--jnt-brand-primary)）
- **AND** 主要按钮使用主文本色（var(--jnt-text-primary)）
- **AND** 次要按钮使用透明背景
- **AND** 次要按钮使用辅助文本色（var(--jnt-text-tertiary)）
- **AND** 按钮使用设计令牌定义的圆角（var(--jnt-radius-md)）

#### Scenario: 颜色选择器样式

- **WHEN** 颜色选择器显示时
- **THEN** 颜色选项使用圆形展示（rounded-full）
- **AND** 选中的颜色有品牌色边框（var(--jnt-brand-primary)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

#### Scenario: 图标选择器样式

- **WHEN** 图标选择器显示时
- **THEN** 图标选项使用设计令牌定义的圆角（var(--jnt-radius-md)）
- **AND** 选中的图标有品牌色边框（var(--jnt-brand-primary)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

#### Scenario: 布局选择器样式

- **WHEN** 布局选择器显示时
- **THEN** 布局选项使用设计令牌定义的圆角（var(--jnt-radius-md)）
- **AND** 选中的布局有品牌色边框（var(--jnt-brand-primary)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

#### Scenario: 错误信息样式

- **WHEN** 验证错误显示时
- **THEN** 系统使用设计令牌定义的错误色（var(--jnt-color-error)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-xs)）
