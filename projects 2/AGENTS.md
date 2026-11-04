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
    │   ├── index.cjs                  # Express 服务器
    │   ├── supabase-session-store.cjs # express-session 用 Supabase 表持久化登录态
    │   └── supabase-client.cjs        # Supabase 客户端（getSupabaseServiceClient）
    ├── supabase/migrations/           # 数据库迁移脚本（含 POST /api/auth 相关建表）
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

### ⚠️ Session 已持久化到 Supabase（FaaS 重启不丢登录态，关键教训）

- **问题根因**：`express-session` 默认走进程内 `MemoryStore`。线上是 FaaS 无状态/多实例部署（日志可见 `[FaaS System] Received signal "terminated"`），实例重建或缩容时内存 session 被清空 → 浏览器带着有效的 `connect.sid`，服务端却查不到对应 session，历史保存等接口返回 401「请先登录」。症状："已登录但操作一会儿后点保存提示重新登录"（尤其闲置较久后）。
- **修复方案**：新增 `server/supabase-session-store.cjs`（`SupabaseSessionStore extends session.Store`，实现 get/set/touch/destroy），在 `server/index.cjs` 的 `session({ store: new SupabaseSessionStore() })` 中替换默认 MemoryStore，把 session 持久化到 `public.sessions` 表。复用既有 `getSupabaseServiceClient()`（service_role 客户端）；表已 `revoke` anon/authenticated，仅 service_role 可读写，sess 以 jsonb 存整份。
- **建表**（`supabase/migrations/20261022210001_create_sessions.sql`）：`public.sessions(id text pk, sess jsonb, expire timestamptz)`，含 `expire` 索引；`expire` 由 cookie 的 expires/maxAge 推导，读到时过期自动销毁；store 定时 tidy 清理过期行。**迁移已手动在库中应用**（`exec_sql` 执行 CREATE TABLE 成功）；与协作 migration 同理，新环境需在对应 Supabase 库（develop/product 各一份）应用同一 DDL。
- **兜底行为**：store 依赖 Supabase 连接；若连接失败/表缺失，会话读写会 callback error（不静默丢 session 也绝不 crash），需注意运维监控 `sessions` 表可写。

## 项目历史登录态（关键）

- `server/history-auth.cjs` 通过环境变量 `PROJECT_HISTORY_AUTH_ADAPTER` 加载"在线身份适配器"，从飞书登录 Session 解析当前用户。
- 该变量指向 `server/deployment-auth.cjs`（从 `req.session.user` 解析用户，优先 employeeId/userId → union_id → open_id）。
- **若 `.env.local` 缺失 `PROJECT_HISTORY_AUTH_ADAPTER` 或 `deployment-auth.cjs` 文件丢失，历史接口会返回 503「项目历史服务尚未接入部署平台登录态」**，前端降级为本地草稿保存，历史记录将无法云端保存。
- 恢复方式：确保 `server/deployment-auth.cjs` 存在，且 `.env.local` 含 `PROJECT_HISTORY_AUTH_ADAPTER=server/deployment-auth.cjs` 与 `DEPLOY_BASE_URL`（OAuth 回调域名）。
- 未携带登录态访问历史接口时返回 401「请先登录」（这是正常的，区别于 503）。

## 协作共享与后台管理（关键）

实现"所有登录用户可见后台入口 + 每次进后台输入统一密码 + 个人/公共组项目 + 个人↔组复制 + 后台管理用户/组/历史"。代码在 commit `c834f44`（远端）落地，后端接口已挂载、数据库 migration 已在本库应用（截至本次）。

- **数据库表**（`supabase/migrations/202610090001_create_collaboration.sql`）：`app_users`（登录用户）、`collaboration_groups`（公共组）、`collaboration_records`（协作记录，scope=personal/team）。迁移含对已有 `projects` 数据回填到 personal 记录 + `sync_project_collaboration_record` 触发器（projects 增改时同步协作记录）。
- **⚠️ 迁移须在线上库手动应用（关键教训）**：迁移 SQL 建表 + 回填 + 触发器三部分必须**在线上( product )库完整执行**，否则后台"用户/历史记录"面板为空。此前线上库只建了表、**回填未执行且触发器缺失**，导致 8 个活跃项目的历史不在 `collaboration_records` 里、后台看不到数据。已手动补齐：回填 8 条 personal 记录 + `app_users` 增至 2 用户 + 重建 `projects_sync_collaboration_record` 触发器（`tgenabled=79` 启用）。排除差异时注意：**开发库( develop )与线上库( product )是不同 Supabase**，开发库无有效数据不代表线上无数据。
- **后台密码**：`server/admin-access.cjs`，统一密码（默认 `zhangyaxiang`，可用 `ADMIN_ACCESS_PASSWORD` 覆盖），5 次错误锁定 60s；session 用 `adminUnlocked` 标记，`lock`/`unlock` 控制。前端入口在 `data-open-admin-dashboard`（所有登录用户可见），进入后台弹密码框。
- **协作接口**：`server/collaboration-routes.cjs` → `GET/PUT /api/collaboration/bootstrap|sync`（需登录态，admin 返回全量、普通用户只返回本人 personal + 全部 team）、`PATCH /api/collaboration/records/:id`（需 `adminUnlocked`，后台覆盖历史记录时**同步创建新 `project_versions` 版本**）。
- **前端状态**：`src/collaboration/store.js`（`copyRecord` 实现个人↔组复制，生成新 record id）、`src/collaboration/api.js`（调用协作接口）、`src/app.js` 中 `state.collaboration` 管理与后台面板（adminSection=users/teams/history/design）。
- **权限边界**：个人记录归 `owner_id`；公共组记录 `scope=team` 所有登录用户可查看/编辑/复制；仅 admin（输密码解锁后）可管理全部用户/组/历史。
- **⚠️ FaaS 部署下不可依赖 MemoryStore 会话做 admin 判定（关键教训）**：`express-session` 默认 MemoryStore 把 `adminUnlocked` 存在单进程内存。线上 FaaS 无状态/多实例部署时，`unlock`（写 session）与后续 `bootstrap/sync`（读 session）可能落在不同实例，导致 admin 判定失效、后台永远以普通用户视角返回（只显示当前登录者），症状即"后台只看到自己、看不到所有用户"。**修复方案**：`server/admin-token.cjs` 用共享密钥（`SESSION_SECRET`+`:admin` 加盐）签发带过期时间的 HMAC 签名令牌（TTL 2h）；`unlock` 成功后返回 `{ unlocked, token }`，前端存 `adminToken`，`request()` 对所有 `x-admin-token` 携带；后端 `bootstrap/sync/override` 改用 `extractAdminFromRequest(req)`（`session.adminUnlocked || 校验 x-admin-token`）。改动同时兼顾本地单实例（session 可用）与线上多实例（token 兜底）。

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

## 服务端导出（2026-11-04 本地实现）

- 所有 PNG、ZIP 和 GIF 生成入口走 `/api/exports`；浏览器只预览、提交快照和下载文件，不恢复 html-to-image 截图或浏览器 ZIP/GIF 编码。
- 服务端渲染入口为 `server-render.html`；Vite 必须保留双入口构建。公开静态服务器禁用该 HTML，渲染器使用私有 loopback 服务加载。
- 上线前在目标 Supabase 库执行 `supabase/migrations/202611040003_server_exports.sql`。任务表与历史表独立，仅 service_role 可访问。
- FaaS 下使用数据库租约与分步检查点，不依赖进程内任务队列。页面关闭会暂停后续步骤，重开同账号后继续；不可宣称关闭浏览器后仍自动完成。
- Linux 默认使用随依赖安装的 Chromium，需在实际部署环境执行 `pnpm export:check` 并完成一次生产切图。macOS 通过不等于 Coze/Linux 已验证。
- Coze 生产容器曾实际缺少 `libnspr4.so`。Linux 默认浏览器启动必须显式解压依赖包中的 `al2023.tar.br`，给 Chromium 子进程配置该归档 `lib/` 的搜索路径；不能只依赖依赖包对 AWS/Vercel 的环境识别，也不能因 Chromium 可执行文件已缓存而跳过运行库准备。
- 详细实现、容量、清理和部署边界见 `docs/server-export.md`。
