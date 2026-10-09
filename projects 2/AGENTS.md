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

本项目为多层结构：工作区根 `/workspace/projects/` 与技术项目根 `projects 2/` 不重合。

```
/workspace/projects/                    # 工作区根目录
├── .coze                              # 根 .coze（平台入口，sub_id=e872924c）
├── .gitignore
└── projects 2/                        # 技术项目根目录
    ├── .coze                          # 子项目 .coze（sub_id=d370d584）
    ├── .preview                       # 预览端口声明（expose_port=5000）
    ├── AGENTS.md                      # 本文件
    ├── index.html                     # Vite 入口 HTML
    ├── package.json                   # 依赖声明
    ├── pnpm-workspace.yaml            # pnpm workspace 配置（packages=["."])
    ├── vite.config.js                 # Vite 构建配置
    ├── src/
    │   ├── builder-entry.js           # 应用入口
    │   ├── app.js                     # 组件注册与 schema 加载
    │   ├── styles.css                 # 全局样式与字体声明
    │   ├── components/                # 公共组件
    │   ├── utils/                     # 工具函数
    │   └── reactComponentRuntime.jsx  # React 组件运行时
    ├── fonts/                         # 字体文件
    ├── scripts/
    │   ├── build.sh                   # 构建脚本（pnpm install + vite build）
    │   └── run.sh                     # 启动脚本（Express 服务器）
    ├── server/
    │   └── index.cjs                  # Express 服务器
    ├── dist/                          # 构建产物
    └── [组件目录]/                     # 各组件源码
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

后端仅保留飞书文档抓取代理接口（用于解决浏览器跨域问题）。分子模板和页面模板数据保存在浏览器 localStorage 中（key：`builder_molecule_templates`、`builder_page_templates`）。项目历史（云端版本）功能依赖飞书 OAuth 登录态。

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/auth/login`、`/api/auth/callback`、`/api/auth/me`、POST `/api/auth/logout` | 飞书 OAuth 登录/登出（需要 `express-session`、`FEISHU_APP_ID/SECRET`、`DEPLOY_BASE_URL`） |
| GET | `/api/me`、`/api/projects` 等 | 项目历史版本管理，需登录态 |

## 飞书登录系统（关键）

- **前端入口拦截**：`src/builder-entry.js` 的 `checkAuth()` 在加载应用前请求 `/api/auth/me`，未登录则重定向到 `/api/auth/login?state=...`；`index.html` 含 `#auth-loading` 登录加载页。**若这两处被移除/回退，登录系统会"消失"（应用直接进入、无登录拦截）。**
- **后端 OAuth**：`server/index.cjs` 提供 `/api/auth/login`（重定向飞书授权页）、`/api/auth/callback`（换 token + 取用户 + 写 session）、`/api/auth/me`、`/api/auth/logout`，依赖 `express-session`。
- OAuth 回调地址 = `DEPLOY_BASE_URL/api/auth/callback`，`DEPLOY_BASE_URL` 默认 `https://doujiadacu.coze.bytedance.net`，需与环境匹配，且飞书应用后台已配置该回调白名单。

## 项目历史登录态（关键）

- `server/history-auth.cjs` 通过环境变量 `PROJECT_HISTORY_AUTH_ADAPTER` 加载"在线身份适配器"，从飞书登录 Session 解析当前用户。
- 该变量指向 `server/deployment-auth.cjs`（从 `req.session.user` 解析用户，优先 employeeId/userId → union_id → open_id）。
- **若 `.env.local` 缺失 `PROJECT_HISTORY_AUTH_ADAPTER` 或 `deployment-auth.cjs` 文件丢失，历史接口会返回 503「项目历史服务尚未接入部署平台登录态」**，前端降级为本地草稿保存，历史记录将无法云端保存。
- 恢复方式：确保 `server/deployment-auth.cjs` 存在，且 `.env.local` 含 `PROJECT_HISTORY_AUTH_ADAPTER=server/deployment-auth.cjs` 与 `DEPLOY_BASE_URL`（OAuth 回调域名）。
- 未携带登录态访问历史接口时返回 401「请先登录」（这是正常的，区别于 503）。

## 协作共享与后台管理（关键）

实现"所有登录用户可见后台入口 + 每次进后台输入统一密码 + 个人/公共组项目 + 个人↔组复制 + 后台管理用户/组/历史"。代码在 commit `c834f44`（远端）落地，后端接口已挂载、数据库 migration 已在本库应用（截至本次）。

- **数据库表**（`supabase/migrations/202610090001_create_collaboration.sql`）：`app_users`（登录用户）、`collaboration_groups`（公共组）、`collaboration_records`（协作记录，scope=personal/team）。迁移含对已有 `projects` 数据回填到 personal 记录 + `sync_project_collaboration_record` 触发器（projects 增改时同步协作记录）。**本次迁移已在目标库应用，除开发库回润空库外回填 0 行。**
- **后台密码**：`server/admin-access.cjs`，统一密码（默认 `zhangyaxiang`，可用 `ADMIN_ACCESS_PASSWORD` 覆盖），5 次错误锁定 60s；session 用 `adminUnlocked` 标记，`lock`/`unlock` 控制。前端入口在 `data-open-admin-dashboard`（所有登录用户可见），进入后台弹密码框。
- **协作接口**：`server/collaboration-routes.cjs` → `GET/PUT /api/collaboration/bootstrap|sync`（需登录态，admin 返回全量、普通用户只返回本人 personal + 全部 team）、`PATCH /api/collaboration/records/:id`（需 `adminUnlocked`，后台覆盖历史记录时**同步创建新 `project_versions` 版本**）。
- **前端状态**：`src/collaboration/store.js`（`copyRecord` 实现个人↔组复制，生成新 record id）、`src/collaboration/api.js`（调用协作接口）、`src/app.js` 中 `state.collaboration` 管理与后台面板（adminSection=users/teams/history/design）。
- **权限边界**：个人记录归 `owner_id`；公共组记录 `scope=team` 所有登录用户可查看/编辑/复制；仅 admin（输密码解锁后）可管理全部用户/组/历史。

## 常见问题和预防

## 组件开发

- 每个组件是一个独立目录，包含 `index.tsx`、`index.module.scss`、`schema.json`
- `schema.json` 定义组件名称、描述、属性配置（props）
- 新组件目录放在项目根目录下，`src/app.js` 会自动通过 glob 发现

## 常见问题和预防

- `package.json` 中 `"type": "module"`，Node.js 脚本需用 `.cjs` 扩展名
- 字体文件较大（总计 ~50MB），首次加载较慢
- Sass legacy JS API 有 deprecation 警告，不影响构建
- 构建产物在 `dist/`，预览服务器服务该目录
- `pnpm-workspace.yaml` 必须包含 `packages: ["."]`，否则 pnpm 会因缺少 packages 字段报错
- 项目中存在 `package-lock.json`（历史遗留），实际使用 pnpm 管理依赖，不要删除 pnpm-lock.yaml
- 目录名 `projects 2` 含空格，部署平台执行时会被截断。根目录 `scripts/build.sh` 和 `scripts/run.sh` 是包装脚本，正确引用子项目路径，`.coze` 的 `[deploy]` 指向这两个包装脚本而非子项目内的脚本
