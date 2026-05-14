## ADDED Requirements

### Requirement: 页面布局

新标签页 SHALL 展示双栏布局，左侧为书签区域，右侧为便签区域。

#### Scenario: 桌面端显示双栏布局

- **WHEN** 页面在桌面端（宽度 >= 768px）加载
- **THEN** 左侧显示书签区域占位
- **AND** 右侧显示便签区域占位

#### Scenario: 移动端显示单栏布局

- **WHEN** 页面在移动端（宽度 < 768px）加载
- **THEN** 书签区域和便签区域垂直堆叠
