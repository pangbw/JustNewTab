## MODIFIED Requirements

### Requirement: 创建书签块

系统应允许用户在工作区内创建新的书签块。

#### Scenario: 通过右键菜单创建书签块

- **WHEN** 用户在书签区域右键点击并选择"创建书签块"
- **THEN** 系统创建一个带有默认名称和颜色的新书签块
- **AND** 新书签块使用设计令牌定义的样式（边框、阴影、圆角）

#### Scenario: 通过按钮创建书签块

- **WHEN** 用户点击"添加书签块"按钮
- **THEN** 系统在下一个可用位置创建新的书签块
- **AND** 新书签块使用设计令牌定义的样式

### Requirement: 编辑书签块

系统应允许用户编辑书签块属性。

#### Scenario: 编辑书签块名称

- **WHEN** 用户双击书签块标题
- **THEN** 系统启用书签块名称的内联编辑
- **AND** 编辑状态有清晰的视觉反馈（使用设计令牌定义的焦点样式）

#### Scenario: 保存书签块名称

- **WHEN** 用户完成编辑并按下 Enter 键或点击其他区域
- **THEN** 系统保存新的书签块名称
- **AND** 恢复正常的显示样式

### Requirement: 删除书签块

系统应允许用户删除书签块。

#### Scenario: 通过右键菜单删除书签块

- **WHEN** 用户右键点击书签块并选择"删除书签块"
- **THEN** 系统删除该书签块及其所有书签

#### Scenario: 删除确认

- **WHEN** 用户尝试删除包含书签的书签块
- **THEN** 系统在删除前显示确认对话框
- **AND** 确认对话框使用设计令牌定义的样式

### Requirement: 书签块拖拽

系统应允许用户拖拽书签块以重新排列位置。

#### Scenario: 拖拽书签块

- **WHEN** 用户将书签块拖拽到新位置
- **THEN** 系统将书签块移动到新位置并更新布局

#### Scenario: 拖拽反馈

- **WHEN** 用户正在拖拽书签块时
- **THEN** 系统显示视觉反馈（幽灵元素、放置区域高亮）
- **AND** 拖拽状态使用设计令牌定义的透明度和缩放效果

#### Scenario: 无效放置位置

- **WHEN** 用户尝试将书签块放置在书签区域外
- **THEN** 系统取消拖拽并将书签块返回到原始位置

### Requirement: 书签块折叠/展开

系统应允许用户折叠和展开书签块。

#### Scenario: 折叠书签块

- **WHEN** 用户点击书签块上的折叠按钮
- **THEN** 系统折叠书签块，隐藏其书签内容，仅显示标题

#### Scenario: 展开书签块

- **WHEN** 用户点击已折叠书签块上的展开按钮
- **THEN** 系统展开书签块，显示所有书签内容

#### Scenario: 折叠/展开动画

- **WHEN** 用户折叠或展开书签块时
- **THEN** 系统显示平滑的动画过渡效果
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）
- **AND** 使用设计令牌定义的缓动函数（var(--jnt-ease-standard)）

### Requirement: 向书签块添加书签

系统应允许用户向书签块添加书签。

#### Scenario: 通过右键菜单添加书签

- **WHEN** 用户右键点击书签块并选择"添加书签"
- **THEN** 系统显示输入书签标题和 URL 的对话框
- **AND** 对话框使用设计令牌定义的样式

#### Scenario: 通过拖放添加书签

- **WHEN** 用户从浏览器书签栏拖拽书签到书签块中
- **THEN** 系统将书签添加到该书签块

### Requirement: 从书签块删除书签

系统应允许用户从书签块删除书签。

#### Scenario: 通过右键菜单删除书签

- **WHEN** 用户右键点击书签并选择"删除书签"
- **THEN** 系统从书签块中删除该书签

#### Scenario: 通过键盘删除书签

- **WHEN** 用户选中书签并按下 Delete 键
- **THEN** 系统从书签块中删除该书签

### Requirement: 书签块数量限制

系统应限制每个工作区的书签块数量。

#### Scenario: 达到书签块上限

- **WHEN** 用户在达到上限（20 个）时尝试创建书签块
- **THEN** 系统阻止创建并显示错误提示
- **AND** 错误提示使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 书签块位置持久化

系统应在会话之间保持书签块位置。

#### Scenario: 位置持久化

- **WHEN** 用户关闭并重新打开浏览器
- **THEN** 系统恢复所有书签块到最后已知的位置

### Requirement: 书签块样式一致性

系统应确保所有书签块使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 书签块背景和边框

- **WHEN** 书签块显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-xl)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-4)）
- **AND** 使用设计令牌定义的阴影（var(--jnt-shadow-md)）

#### Scenario: 书签块悬停效果

- **WHEN** 用户将鼠标悬停在书签块上
- **THEN** 系统显示悬停状态，使用设计令牌定义的提升背景色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）
- **AND** 使用设计令牌定义的缓动函数（var(--jnt-ease-standard)）

#### Scenario: 书签块拖拽状态

- **WHEN** 用户正在拖拽书签块
- **THEN** 系统显示半透明效果（opacity-50）
- **AND** 显示缩放效果（scale-95）

#### Scenario: 书签块拖放目标状态

- **WHEN** 用户拖拽书签块到目标位置
- **THEN** 系统显示品牌色边框高亮（使用 var(--jnt-brand-primary)）

#### Scenario: 书签块标题样式

- **WHEN** 书签块标题显示时
- **THEN** 标题使用设计令牌定义的字体大小（var(--jnt-text-lg)）
- **AND** 标题使用设计令牌定义的字体粗细（var(--jnt-font-semibold)）
- **AND** 标题使用设计令牌定义的主文本色（var(--jnt-text-primary)）

#### Scenario: 书签块折叠/展开动画

- **WHEN** 用户折叠或展开书签块时
- **THEN** 系统显示平滑的动画过渡效果
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）
- **AND** 使用设计令牌定义的缓动函数（var(--jnt-ease-standard)）

#### Scenario: 书签块错误提示样式

- **WHEN** 书签块显示错误提示时
- **THEN** 错误提示使用设计令牌定义的错误色（var(--jnt-color-error)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-sm)）
