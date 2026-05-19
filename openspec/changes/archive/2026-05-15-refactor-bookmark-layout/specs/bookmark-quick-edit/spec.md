## MODIFIED Requirements

### Requirement: 右键点击显示快速编辑卡片

系统应在用户右键点击书签项时显示快速编辑卡片，使用设计令牌系统。

#### Scenario: 右键点击书签

- **WHEN** 用户右键点击书签项
- **THEN** 系统在书签附近显示浮动编辑卡片，包含显示标题、URL 和描述字段
- **AND** 卡片使用设计令牌定义的深色主题样式

#### Scenario: 卡片定位

- **WHEN** 快速编辑卡片显示时
- **THEN** 系统将卡片定位在书签右侧，确保不超出视口

#### Scenario: 卡片动画

- **WHEN** 快速编辑卡片出现时
- **THEN** 系统显示平滑的淡入和缩放动画
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）

### Requirement: 编辑书签显示标题

系统应允许用户在快速编辑卡片中编辑书签的显示标题。

#### Scenario: 显示标题字段

- **WHEN** 快速编辑卡片显示时
- **THEN** 系统显示包含当前书签标题的输入框
- **AND** 输入框使用设计令牌定义的样式

#### Scenario: 修改显示标题

- **WHEN** 用户修改显示标题
- **THEN** 系统接受新标题（最多 100 个字符）

#### Scenario: 空标题验证

- **WHEN** 用户清空显示标题字段
- **THEN** 系统显示错误："显示标题不能为空"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 编辑书签 URL

系统应允许用户在快速编辑卡片中编辑书签 URL。

#### Scenario: URL 字段

- **WHEN** 快速编辑卡片显示时
- **THEN** 系统显示包含当前书签 URL 的输入框
- **AND** 输入框使用设计令牌定义的样式

#### Scenario: 修改 URL

- **WHEN** 用户修改 URL
- **THEN** 系统接受新 URL

#### Scenario: URL 验证

- **WHEN** 用户输入无效的 URL
- **THEN** 系统显示错误："请输入有效的 URL"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

#### Scenario: URL 格式规范化

- **WHEN** 用户输入不带协议的 URL
- **THEN** 系统自动添加 "https://" 前缀

### Requirement: 编辑书签描述

系统应允许用户在快速编辑卡片中编辑书签描述。

#### Scenario: 描述字段

- **WHEN** 快速编辑卡片显示时
- **THEN** 系统显示包含当前书签描述的文本区域
- **AND** 文本区域使用设计令牌定义的样式

#### Scenario: 修改描述

- **WHEN** 用户修改描述
- **THEN** 系统接受新描述（最多 500 个字符）

#### Scenario: 描述字符计数

- **WHEN** 用户在描述字段中输入时
- **THEN** 系统显示字符计数指示器
- **AND** 计数指示器使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

### Requirement: 保存书签更改

系统应在用户确认或点击卡片外部时保存书签更改。

#### Scenario: 按 Enter 键保存

- **WHEN** 用户在编辑字段时按下 Enter
- **THEN** 系统保存所有更改并关闭卡片

#### Scenario: 点击外部保存

- **WHEN** 用户点击快速编辑卡片外部
- **THEN** 系统保存所有更改并关闭卡片

#### Scenario: 保存确认

- **WHEN** 系统保存书签更改时
- **THEN** 系统更新 Store 中的书签并显示简短的成功指示
- **AND** 成功指示使用设计令牌定义的成功色（var(--jnt-color-success)）

### Requirement: 取消书签编辑

系统应允许用户取消书签编辑。

#### Scenario: 按 Escape 键取消

- **WHEN** 用户在卡片打开时按下 Escape
- **THEN** 系统丢弃所有更改并关闭卡片

#### Scenario: 取消确认

- **WHEN** 用户已进行更改并按下 Escape
- **THEN** 系统丢弃更改，无需确认（更改在按 Enter 或点击外部之前不会保存）

### Requirement: 编辑卡片验证

系统应在保存前验证所有字段。

#### Scenario: 验证所有字段

- **WHEN** 用户尝试保存更改
- **THEN** 系统验证显示标题（非空、最多 100 字符）、URL（有效格式）和描述（最多 500 字符）

#### Scenario: 显示验证错误

- **WHEN** 验证失败时
- **THEN** 系统高亮无效字段并显示错误信息
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

#### Scenario: 验证错误时阻止保存

- **WHEN** 验证失败时
- **THEN** 系统保持卡片打开并阻止保存

### Requirement: 快速编辑卡片关闭

系统应在用户点击卡片外部时关闭快速编辑卡片。

#### Scenario: 点击卡片外部

- **WHEN** 用户点击快速编辑卡片外部
- **THEN** 系统保存更改并关闭卡片

#### Scenario: 点击另一个书签

- **WHEN** 用户在编辑时点击另一个书签
- **THEN** 系统保存当前书签的更改并为新书签打开编辑卡片

### Requirement: 快速编辑卡片样式

系统应确保快速编辑卡片使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 卡片外观

- **WHEN** 快速编辑卡片显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-xl)）
- **AND** 使用设计令牌定义的阴影（var(--jnt-shadow-xl)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-4)）
- **AND** 使用固定宽度（w-80）

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

#### Scenario: 错误信息样式

- **WHEN** 验证错误显示时
- **THEN** 系统使用设计令牌定义的错误色（var(--jnt-color-error)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-xs)）

#### Scenario: 字符计数样式

- **WHEN** 字符计数显示时
- **THEN** 系统使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-xs)）
