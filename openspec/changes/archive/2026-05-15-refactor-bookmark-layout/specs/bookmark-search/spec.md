## MODIFIED Requirements

### Requirement: 搜索框显示

系统应在书签区域顶部显示搜索框，使用设计令牌系统。

#### Scenario: 搜索框位置

- **WHEN** 书签区域加载时
- **THEN** 系统在右上角、配置按钮旁边显示搜索框

#### Scenario: 搜索框占位文本

- **WHEN** 搜索框为空时
- **THEN** 系统显示占位文本："搜索书签..."
- **AND** 占位文本使用设计令牌定义的占位文本色（var(--jnt-text-placeholder)）

### Requirement: 搜索输入

系统应允许用户在搜索框中输入搜索词。

#### Scenario: 输入搜索词

- **WHEN** 用户在搜索框中输入搜索词
- **THEN** 系统接受输入并准备搜索

#### Scenario: 清空搜索词

- **WHEN** 用户点击搜索框中的清空按钮
- **THEN** 系统清空搜索词并显示所有书签

### Requirement: 搜索执行

系统应在用户提交搜索词时执行搜索。

#### Scenario: 按 Enter 键搜索

- **WHEN** 用户在搜索框获得焦点时按下 Enter
- **THEN** 系统执行搜索并显示结果

#### Scenario: 点击按钮搜索

- **WHEN** 用户点击搜索按钮
- **THEN** 系统执行搜索并显示结果

### Requirement: 搜索结果显示

系统应在书签区域中显示搜索结果。

#### Scenario: 显示匹配的书签

- **WHEN** 搜索找到匹配的书签
- **THEN** 系统仅显示匹配的书签，按其所在书签块分组

#### Scenario: 无搜索结果

- **WHEN** 搜索未找到匹配的书签
- **THEN** 系统显示提示信息："未找到与 '[搜索词]' 相关的书签"
- **AND** 提示信息使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

#### Scenario: 搜索结果高亮

- **WHEN** 搜索结果显示时
- **THEN** 系统在书签标题和 URL 中高亮匹配的文本
- **AND** 高亮使用品牌色背景（var(--jnt-brand-primary)）带透明度

### Requirement: 搜索范围

系统应在当前工作区的所有书签块中进行搜索。

#### Scenario: 在当前工作区搜索

- **WHEN** 用户搜索某个关键词
- **THEN** 系统仅在当前工作区的书签块中搜索

#### Scenario: 跨所有书签块搜索

- **WHEN** 用户搜索某个关键词
- **THEN** 系统在所有书签块中搜索，包括已折叠的书签块

### Requirement: 搜索过滤

系统应根据搜索词过滤书签。

#### Scenario: 按标题过滤

- **WHEN** 用户搜索某个关键词
- **THEN** 系统过滤标题包含该关键词的书签（不区分大小写）

#### Scenario: 按 URL 过滤

- **WHEN** 用户搜索某个关键词
- **THEN** 系统过滤 URL 包含该关键词的书签（不区分大小写）

### Requirement: 实时搜索

系统应在用户输入时提供实时搜索建议。

#### Scenario: 输入时显示建议

- **WHEN** 用户输入至少 3 个字符
- **THEN** 系统显示包含匹配书签建议的下拉列表
- **AND** 下拉列表使用设计令牌定义的样式

#### Scenario: 选择建议

- **WHEN** 用户点击某个建议
- **THEN** 系统将该建议填入搜索框并执行搜索

### Requirement: 搜索历史

系统应记住最近的搜索词。

#### Scenario: 显示最近搜索

- **WHEN** 用户聚焦到空的搜索框
- **THEN** 系统显示包含最近 5 个搜索词的下拉列表
- **AND** 下拉列表使用设计令牌定义的样式

#### Scenario: 清空搜索历史

- **WHEN** 用户点击搜索下拉列表中的"清空历史"
- **THEN** 系统清空所有搜索历史

### Requirement: 搜索性能

系统应高效执行搜索，不阻塞 UI。

#### Scenario: 搜索响应时间

- **WHEN** 用户执行搜索
- **THEN** 系统在 50ms 内显示结果（适用于最多 1000 个书签）

#### Scenario: 防抖搜索

- **WHEN** 用户在搜索框中快速输入
- **THEN** 系统对搜索进行防抖处理以避免过多的 API 调用

### Requirement: 搜索状态持久化

系统应在会话之间保持搜索状态。

#### Scenario: 恢复搜索词

- **WHEN** 用户关闭并重新打开浏览器
- **THEN** 系统恢复上次的搜索词和结果

#### Scenario: 切换工作区时清空搜索

- **WHEN** 用户切换到不同的工作区
- **THEN** 系统清空搜索词并显示所有书签

### Requirement: 搜索框样式

系统应确保搜索框使用统一的视觉样式，基于设计令牌系统。

#### Scenario: 搜索框外观

- **WHEN** 搜索框显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-lg)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-3)）

#### Scenario: 搜索输入框样式

- **WHEN** 搜索输入框显示时
- **THEN** 系统使用透明背景
- **AND** 使用设计令牌定义的主文本色（var(--jnt-text-primary)）
- **AND** 使用设计令牌定义的占位文本色（var(--jnt-text-placeholder)）

#### Scenario: 搜索下拉列表样式

- **WHEN** 搜索下拉列表显示时
- **THEN** 系统使用设计令牌定义的背景色（var(--jnt-bg-tertiary)）
- **AND** 使用设计令牌定义的边框色（var(--jnt-bg-elevated)）
- **AND** 使用设计令牌定义的圆角（var(--jnt-radius-lg)）
- **AND** 使用设计令牌定义的阴影（var(--jnt-shadow-xl)）
- **AND** 使用最大高度和滚动（max-h-64 overflow-y-auto）

#### Scenario: 搜索结果项样式

- **WHEN** 搜索结果项显示时
- **THEN** 系统使用设计令牌定义的字体大小（var(--jnt-text-sm)）
- **AND** 使用设计令牌定义的次文本色（var(--jnt-text-secondary)）
- **AND** 使用设计令牌定义的内边距（var(--jnt-space-2) var(--jnt-space-3)）
- **AND** 悬停时使用设计令牌定义的提升背景色（var(--jnt-bg-elevated)）

#### Scenario: 搜索结果高亮样式

- **WHEN** 搜索结果高亮显示时
- **THEN** 系统使用品牌色背景（var(--jnt-brand-primary)）带透明度
- **AND** 使用设计令牌定义的主文本色（var(--jnt-text-primary)）

#### Scenario: 搜索结果计数样式

- **WHEN** 搜索结果计数显示时
- **THEN** 系统使用设计令牌定义的字体大小（var(--jnt-text-sm)）
- **AND** 使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）

#### Scenario: 无搜索结果样式

- **WHEN** 无搜索结果显示时
- **THEN** 系统使用设计令牌定义的辅助文本色（var(--jnt-text-tertiary)）
- **AND** 使用设计令牌定义的字体大小（var(--jnt-text-sm)）
