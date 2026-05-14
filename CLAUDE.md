# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

JustNewTab - 一款多浏览器可用的新标签页插件。项目使用 Apache License 2.0 开源协议。

## 当前状态

项目处于初始阶段，尚未添加源代码。已配置 OpenSpec 工具用于规范化需求管理。

## 需求管理工具

项目使用 OpenSpec 进行需求管理和变更流程规范化：

| 命令            | 用途                                                  |
| --------------- | ----------------------------------------------------- |
| `/opsx:explore` | 探索模式 - 调研问题、思考方案（不写代码）             |
| `/opsx:propose` | 创建变更提案（生成 proposal.md、design.md、tasks.md） |
| `/opsx:apply`   | 实施变更任务                                          |
| `/opsx:archive` | 归档已完成的变更                                      |

### OpenSpec 工作流

```
explore（探索）→ propose（提案）→ apply（实施）→ archive（归档）
```

## 浏览器扩展开发指南

### 核心文件结构

- `manifest.json` - 扩展配置文件
- `src/` - 源代码目录
- `dist/` - 构建输出目录

### 多浏览器兼容性

- Chrome/Edge: 使用 Manifest V3
- Firefox: 支持 Manifest V2/V3
- 需处理 API 差异（如 `chrome` vs `browser` 全局对象）

### 技术栈

- **前端框架**: Svelte + TypeScript
- **CSS**: Tailwind CSS
- **打包工具**: Vite
- **跨浏览器兼容**: webextension-polyfill

### 核心功能

- 书签管理器 - 展示和管理浏览器书签
- 便签/TODO - 快速记录待办事项和便签

### 编码规范

- 不可变数据操作，创建新对象而非修改原对象
- 多个小文件优于少量大文件（200-400行，最多800行）
- 全面的错误处理，提供用户友好的错误信息
- 使用 zod 进行输入验证
- 无 console.log、无硬编码值、无深层嵌套（>4层）
- 语义化命名，函数简短（<50行）
- 提交信息遵循 Conventional Commits 规范

## 配置说明

- `.claude/settings.json` - 项目级配置（可提交）
- `.claude/settings.local.json` - 敏感配置（不提交，已在 .gitignore 中）
- `openspec/config.yaml` - OpenSpec 配置
