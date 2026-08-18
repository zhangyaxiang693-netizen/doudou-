## 项目概述

H5 Visual Builder — 一个 H5 页面可视化搭建工具。基于 Vite + React 构建，包含大量可视化组件（优惠券、按钮、公告、任务模块等）。

## 技术栈

- 框架：React 18 + Vite 5
- 样式：SCSS Modules
- 包管理器：pnpm
- 运行时：Node.js 24
- 后端：Express 5（`server/index.cjs`），提供静态文件服务 + 飞书文档代理接口
- 数据存储：前端 localStorage（分子模板和页面模板持久化在浏览器本地）
- 字体：思源黑体（Source Han Sans CN）、造字工房本黑体、抖音数字字体（Douyin Number ABC）

## 目录结构

```
/workspace/projects/
├── .coze              # 项目配置
├── .preview           # 预览端口声明
├── index.html         # Vite 入口 HTML
├── package.json       # 依赖声明
├── vite.config.js     # Vite 构建配置
├── src/
│   ├── builder-entry.js    # 应用入口
│   ├── app.js              # 组件注册与 schema 加载
│   ├── styles.css          # 全局样式与字体声明
│   ├── components/         # 公共组件（如 InlineSvg）
│   ├── utils/              # 工具函数
│   └── reactComponentRuntime.jsx  # React 组件运行时
├── fonts/             # 字体文件（Source Han Sans、抖音字体等）
├── scripts/
│   ├── build.sh       # 构建脚本（pnpm install + vite build）
│   └── run.sh         # 启动脚本（启动 Express 服务器）
├── server/
│   └── index.cjs      # Express 服务器（静态文件 + 飞书文档代理）
├── dist/              # 构建产物
├── _backup_build/     # 原始构建产物备份
├── [组件目录]/         # 各组件源码（BigButton、PromoCoupon 等）
│   ├── index.tsx      # 组件实现
│   ├── index.module.scss  # 组件样式
│   ├── schema.json    # 组件属性定义
│   └── assets/        # 组件资源
└── AGENTS.md
```

## 关键入口

- Vite 入口：`index.html` → `src/builder-entry.js`
- 组件注册：`src/app.js`（通过 `import.meta.glob` 动态加载各组件的 `schema.json`）
- 全局样式：`src/styles.css`（CSS 变量、字体声明）
- 构建配置：`vite.config.js`（base: "./"，输出到 dist/）

## 运行与预览

- 构建：`pnpm vite build`（输出到 `dist/`）
- 预览：`bash scripts/run.sh` 启动 Express 服务器（API + 静态文件）
- 端口：从 `.preview` 读取 `expose_port`，fallback 5000
- 绑定地址：`0.0.0.0`

## API 接口

后端仅保留飞书文档抓取代理接口（用于解决浏览器跨域问题）。分子模板和页面模板数据保存在浏览器 localStorage 中（key：`builder_molecule_templates`、`builder_page_templates`）。

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/api/fetch-feishu-doc` | 抓取飞书公开文档正文（body: `{url}`） |

## 组件开发

- 每个组件是一个独立目录，包含 `index.tsx`、`index.module.scss`、`schema.json`
- `schema.json` 定义组件名称、描述、属性配置（props）
- 新组件目录放在项目根目录下，`src/app.js` 会自动通过 glob 发现

## 常见问题和预防

- `package.json` 中 `"type": "module"`，Node.js 脚本需用 `.cjs` 扩展名
- 字体文件较大（总计 ~50MB），首次加载较慢
- Sass legacy JS API 有 deprecation 警告，不影响构建
- 构建产物在 `dist/`，预览服务器服务该目录
