## MODIFIED Requirements

### Requirement: 检测已打开的标签页

系统应检测哪些书签当前已在浏览器标签页中打开。

#### Scenario: 查询已打开的标签页

- **WHEN** 书签区域加载或标签页被打开/关闭时
- **THEN** 系统查询所有已打开的浏览器标签页，并将其 URL 与书签 URL 进行比对

#### Scenario: URL 匹配

- **WHEN** 比对标签页和书签时
- **THEN** 系统在匹配 URL 时忽略协议（http/https）、尾部斜杠和锚点片段

#### Scenario: 实时更新

- **WHEN** 标签页被打开或关闭时
- **THEN** 系统在 500ms 内更新受影响书签的打开状态

### Requirement: 高亮已打开的书签

系统应以视觉方式高亮当前已在浏览器标签页中打开的书签，使用设计令牌系统。

#### Scenario: 已打开书签的样式

- **WHEN** 书签被检测为已打开状态
- **THEN** 系统应用醒目的视觉样式（使用设计令牌定义的品牌色边框、背景高亮）

#### Scenario: 多个标签页打开相同 URL

- **WHEN** 多个标签页的 URL 与某书签相同
- **THEN** 系统仍然只将该书签标记为已打开（仅显示一次）

#### Scenario: 高亮动画

- **WHEN** 书签的打开状态发生变化时
- **THEN** 系统显示平滑的过渡动画
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-normal)）

### Requirement: 关闭标签页按钮

系统应在当前已打开的书签上显示关闭按钮，使用设计令牌系统。

#### Scenario: 关闭按钮可见性

- **WHEN** 书签被检测为已打开状态
- **THEN** 系统在书签右侧显示关闭图标（X）

#### Scenario: 关闭按钮定位

- **WHEN** 关闭按钮显示时
- **THEN** 系统将其放置在书签项的右边缘，垂直居中

#### Scenario: 关闭按钮悬停效果

- **WHEN** 用户将鼠标悬停在关闭按钮上
- **THEN** 系统以醒目的悬停效果高亮该按钮
- **AND** 使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 关闭标签页操作

系统应在用户点击关闭按钮时关闭对应的浏览器标签页。

#### Scenario: 点击关闭标签页

- **WHEN** 用户点击已打开书签上的关闭按钮
- **THEN** 系统关闭对应的浏览器标签页并移除打开状态高亮

#### Scenario: 关闭确认

- **WHEN** 用户点击关闭按钮
- **THEN** 系统立即关闭标签页，无需确认（遵循标准浏览器行为）

#### Scenario: 关闭错误处理

- **WHEN** 系统关闭标签页失败（如权限不足）
- **THEN** 系统显示错误信息："关闭标签页失败"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 标签页 Store 管理

系统应维护一个当前已打开标签页 URL 的 Store。

#### Scenario: 初始化标签页 Store

- **WHEN** 扩展加载时
- **THEN** 系统查询所有已打开的标签页并填充标签页 Store

#### Scenario: 标签页创建时更新

- **WHEN** 新标签页被创建时
- **THEN** 系统将该标签页 URL 添加到标签页 Store

#### Scenario: 标签页关闭时更新

- **WHEN** 标签页被关闭时
- **THEN** 系统从标签页 Store 中移除该标签页 URL

#### Scenario: 标签页 URL 变化时更新

- **WHEN** 标签页的 URL 发生变化（页面导航）
- **THEN** 系统相应地更新标签页 Store

### Requirement: 性能优化

系统应优化标签页检测以确保性能。

#### Scenario: 防抖更新

- **WHEN** 多个标签页事件快速连续触发时
- **THEN** 系统对标签页 Store 更新进行防抖处理（500ms 延迟）

#### Scenario: 高效 URL 查找

- **WHEN** 检查书签是否已打开时
- **THEN** 系统使用 Set 数据结构实现 O(1) 的 URL 查找

#### Scenario: 条件性轮询

- **WHEN** 书签区域不可见时
- **THEN** 系统暂停标签页检测以节省资源

### Requirement: 跨浏览器兼容性

系统应在 Chrome、Edge 和 Firefox 中保持一致的行为。

#### Scenario: Chrome 标签页 API

- **WHEN** 在 Chrome 中运行时
- **THEN** 系统通过 webextension-polyfill 使用 chrome.tabs API

#### Scenario: Firefox 标签页 API

- **WHEN** 在 Firefox 中运行时
- **THEN** 系统通过 webextension-polyfill 使用 browser.tabs API

#### Scenario: 权限处理

- **WHEN** 未授予 tabs 权限时
- **THEN** 系统优雅地禁用打开状态功能，并显示权限提示

### Requirement: 已打开书签样式

系统应确保已打开书签使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 已打开书签边框

- **WHEN** 书签被标记为已打开状态
- **THEN** 系统使用品牌色左边框（var(--jnt-brand-primary)）
- **AND** 边框宽度为 3px

#### Scenario: 已打开书签背景

- **WHEN** 书签被标记为已打开状态
- **THEN** 系统使用轻微的品牌色背景（带透明度）

#### Scenario: 已打开书签标题

- **WHEN** 书签被标记为已打开状态
- **THEN** 系统使用品牌色文本（var(--jnt-brand-primary)）

#### Scenario: 关闭按钮样式

- **WHEN** 关闭按钮显示时
- **THEN** 系统使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）
- **AND** 悬停时使用错误色（var(--jnt-color-error)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）
