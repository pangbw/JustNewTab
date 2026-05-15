## MODIFIED Requirements

### 需求：快速编辑卡片样式

系统应确保快速编辑卡片使用统一的视觉样式。

#### 场景：卡片外观

- **当**快速编辑卡片显示时
- **则**系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **且**使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **且**使用设计令牌定义的圆角（var(--jnt-radius-xl)）
- **且**使用设计令牌定义的阴影（var(--jnt-shadow-xl)）
- **且**使用设计令牌定义的内边距（var(--jnt-space-4)）
- **且**使用固定宽度（w-80）

#### 场景：卡片标题样式

- **当**卡片标题显示时
- **则**系统使用设计令牌定义的字体大小（var(--jnt-text-sm)）
- **且**使用设计令牌定义的字体粗细（var(--jnt-font-medium)）
- **且**使用设计令牌定义的主文本色（var(--jnt-text-primary)）

#### 场景：输入框样式

- **当**输入框显示时
- **则**系统使用设计令牌定义的提升背景色（var(--jnt-bg-elevated)）
- **且**使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **且**使用设计令牌定义的圆角（var(--jnt-radius-md)）
- **且**使用设计令牌定义的内边距（var(--jnt-space-3)）
- **且**使用设计令牌定义的主文本色（var(--jnt-text-primary)）
- **且**焦点状态使用品牌色边框（var(--jnt-brand-primary)）

#### 场景：标签样式

- **当**输入框标签显示时
- **则**系统使用设计令牌定义的字体大小（var(--jnt-text-xs)）
- **且**使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

#### 场景：按钮样式

- **当**按钮显示时
- **则**主要按钮使用品牌色背景（var(--jnt-brand-primary)）
- **且**主要按钮使用主文本色（var(--jnt-text-primary)）
- **且**次要按钮使用透明背景
- **且**次要按钮使用辅助文本色（var(--jnt-text-tertiary)）
- **且**按钮使用设计令牌定义的圆角（var(--jnt-radius-md)）

#### 场景：错误信息样式

- **当**验证错误显示时
- **则**系统使用设计令牌定义的错误色（var(--jnt-color-error)）
- **且**使用设计令牌定义的字体大小（var(--jnt-text-xs)）

#### 场景：字符计数样式

- **当**字符计数显示时
- **则**系统使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）
- **且**使用设计令牌定义的字体大小（var(--jnt-text-xs)）
