## MODIFIED Requirements

### Requirement: 页面布局

新标签页 SHALL 展示双栏布局，左侧为书签区域，右侧为便签区域，比例为 3:1。

#### Scenario: 桌面端显示双栏布局

- **WHEN** 页面在桌面端（宽度 >= 768px）加载
- **THEN** 左侧显示书签区域占 75% 宽度
- **AND** 右侧显示便签区域占 25% 宽度
- **AND** 两个区域使用统一的样式
- **AND** 使用 CSS Grid 的 `grid-template-columns: 3fr 1fr` 实现比例

#### Scenario: 移动端显示单栏布局

- **WHEN** 页面在移动端（宽度 < 768px）加载
- **THEN** 书签区域和便签区域垂直堆叠
- **AND** 堆叠布局使用统一的样式
- **AND** 每个区域占满容器宽度

### Requirement: 区域容器样式

系统应为书签区域和便签区域提供统一的容器样式，使用设计令牌系统。

#### Scenario: 区域容器外观

- **WHEN** 区域容器显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-xl)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-5)）
- **AND** 使用设计令牌定义的阴影（var(--jnt-shadow-md)）

#### Scenario: 区域容器间距

- **WHEN** 多个区域容器显示时
- **THEN** 系统使用设计令牌定义的间距（var(--jnt-space-6)）
- **AND** 使用 CSS Grid 的 gap 属性实现间距

### Requirement: 区域标题

系统应为每个区域显示标题，使用设计令牌系统。

#### Scenario: 便签区域标题

- **WHEN** 便签区域显示时
- **THEN** 系统显示标题 "便签"
- **AND** 标题使用设计令牌定义的字体大小（var(--jnt-text-xl)）
- **AND** 标题使用设计令牌定义的字体粗细（var(--jnt-font-semibold)）
- **AND** 标题使用设计令牌定义的主文本色（var(--jnt-text-primary)）
- **AND** 标题使用设计令牌定义的底部外边距（var(--jnt-space-4)）

#### Scenario: 区域占位文本

- **WHEN** 区域内容尚未实现时
- **THEN** 系统显示占位文本
- **AND** 占位文本使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

### Requirement: 页面样式一致性

系统应确保所有页面元素使用统一的视觉样式，遵循 MiMo 设计规范。

#### Scenario: 颜色系统

- **WHEN** 页面元素显示时
- **THEN** 系统使用设计令牌定义的颜色系统
- **AND** 背景色使用设计令牌
- **AND** 文本色使用设计令牌

#### Scenario: 字体系统

- **WHEN** 文本显示时
- **THEN** 系统使用设计令牌定义的字体系统
- **AND** 字体大小使用设计令牌
- **AND** 字体粗细使用设计令牌

#### Scenario: 间距系统

- **WHEN** 元素间距设置时
- **THEN** 系统使用设计令牌定义的间距系统
- **AND** 保持一致的间距节奏

#### Scenario: MiMo 风格应用

- **WHEN** 页面整体呈现时
- **THEN** 系统参考小米 MiMo 网站的设计风格
- **AND** 使用深色主题，高对比度
- **AND** 大面积留白，呼吸感强
- **AND** 圆角矩形组件，柔和阴影
