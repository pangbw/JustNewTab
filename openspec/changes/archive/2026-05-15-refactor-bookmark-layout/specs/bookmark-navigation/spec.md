## MODIFIED Requirements

### Requirement: 默认书签导航行为

系统应在用户点击书签时默认在当前标签页中打开。

#### Scenario: 左键点击书签

- **WHEN** 用户左键点击书签
- **THEN** 系统将当前标签页导航到书签 URL

#### Scenario: 导航反馈

- **WHEN** 用户点击书签时
- **THEN** 系统在导航前显示简短的加载指示器
- **AND** 加载指示器使用设计令牌定义的样式

#### Scenario: 无效 URL 处理

- **WHEN** 书签 URL 无效或无法访问
- **THEN** 系统显示错误信息："打开书签失败"
- **AND** 错误信息使用设计令牌定义的错误色（var(--jnt-color-error)）

### Requirement: 键盘修饰键支持

系统应支持键盘修饰键以实现不同的导航行为。

#### Scenario: Ctrl+点击（Windows/Linux）

- **WHEN** 用户按住 Ctrl 并点击书签
- **THEN** 系统在新标签页中打开书签

#### Scenario: Cmd+点击（Mac）

- **WHEN** 用户按住 Cmd 并点击书签
- **THEN** 系统在新标签页中打开书签

#### Scenario: Shift+点击

- **WHEN** 用户按住 Shift 并点击书签
- **THEN** 系统在新窗口中打开书签

#### Scenario: 中键点击

- **WHEN** 用户中键点击书签
- **THEN** 系统在新标签页中打开书签

### Requirement: 可配置的导航模式

系统应提供设置选项以配置默认的书签导航行为。

#### Scenario: 导航设置位置

- **WHEN** 用户打开设置面板
- **THEN** 系统显示"书签打开模式"设置及其选项

#### Scenario: 设置选项

- **WHEN** 用户查看导航设置时
- **THEN** 系统显示三个选项："当前标签页"、"新标签页"、"新窗口"

#### Scenario: 默认设置

- **WHEN** 用户首次安装扩展
- **THEN** 系统将默认导航模式设置为"当前标签页"

### Requirement: 保存导航偏好

系统应持久化用户的导航偏好设置。

#### Scenario: 保存设置

- **WHEN** 用户更改导航模式设置
- **THEN** 系统将偏好保存到 localStorage

#### Scenario: 恢复设置

- **WHEN** 用户打开新的浏览器会话
- **THEN** 系统恢复已保存的导航偏好

#### Scenario: 设置跨工作区同步

- **WHEN** 用户更改导航设置
- **THEN** 系统将设置应用到所有工作区

### Requirement: 导航模式应用

系统应在用户点击书签时应用已配置的导航模式。

#### Scenario: 当前标签页模式

- **WHEN** 导航模式设置为"当前标签页"且用户点击书签
- **THEN** 系统将当前标签页导航到书签 URL

#### Scenario: 新标签页模式

- **WHEN** 导航模式设置为"新标签页"且用户点击书签
- **THEN** 系统打开新标签页并加载书签 URL

#### Scenario: 新窗口模式

- **WHEN** 导航模式设置为"新窗口"且用户点击书签
- **THEN** 系统打开新窗口并加载书签 URL

### Requirement: 书签悬停预览

系统应在用户悬停在书签上时显示书签 URL。

#### Scenario: 悬停提示

- **WHEN** 用户将鼠标悬停在书签上
- **THEN** 系统以提示框（title 属性）形式显示完整 URL

#### Scenario: URL 显示格式

- **WHEN** 提示框显示时
- **THEN** 系统显示不带协议的 URL（例如显示 "example.com/path" 而非 "https://example.com/path"）

### Requirement: 导航历史感知

系统应处理新标签页内的导航行为。

#### Scenario: 浏览器后退按钮

- **WHEN** 用户导航到书签页面后点击浏览器后退按钮
- **THEN** 系统返回新标签页

#### Scenario: 导航状态保留

- **WHEN** 用户返回新标签页时
- **THEN** 系统恢复之前的工作区和滚动位置

### Requirement: 跨浏览器导航兼容性

系统应在各浏览器中保持一致的导航行为。

#### Scenario: Chrome 导航

- **WHEN** 在 Chrome 中运行时
- **THEN** 系统通过 webextension-polyfill 使用 chrome.tabs.update() 或 window.location.href

#### Scenario: Firefox 导航

- **WHEN** 在 Firefox 中运行时
- **THEN** 系统通过 webextension-polyfill 使用 browser.tabs.update() 或 window.location.href

#### Scenario: Edge 导航

- **WHEN** 在 Edge 中运行时
- **THEN** 系统通过 webextension-polyfill 使用 chrome.tabs.update() 或 window.location.href

### Requirement: 书签导航样式

系统应确保书签导航交互使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 书签悬停效果

- **WHEN** 用户将鼠标悬停在书签上
- **THEN** 系统使用设计令牌定义的提升背景色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

#### Scenario: 书签点击效果

- **WHEN** 用户点击书签时
- **THEN** 系统显示短暂的点击反馈动画
- **AND** 使用设计令牌定义的过渡时间（var(--jnt-duration-fast)）

#### Scenario: 加载指示器样式

- **WHEN** 书签正在加载时
- **THEN** 系统使用品牌色加载指示器（var(--jnt-brand-primary)）
- **AND** 使用设计令牌定义的动画缓动（var(--jnt-ease-standard)）

#### Scenario: 错误提示样式

- **WHEN** 导航失败时
- **THEN** 系统使用设计令牌定义的错误色（var(--jnt-color-error)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-sm)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-3)）
