# 服务端切图实现与部署

PNG（单张、模块/全量 ZIP、管理员组件验证器）及 GIF 的生成均通过 `/api/exports`。浏览器保留预览，生成过程不调用 html-to-image、Canvas 截图、字体内嵌或 ZIP/GIF 编码；下载使用文件 URL，避免在浏览器内存中重建成品 Blob。

## 实现

- `src/server-export-client.js` 提交一次冻结快照，展示进度，分步调用 `advance`，并提供暂停、继续、取消与下载。
- `server/export-routes.cjs` 复用可信登录身份。任务创建、读写、推进和下载都检查账号；管理员创建验证器切图时还需有效管理令牌。
- `server/export-repository.cjs` 与 `202611040003_server_exports.sql` 持久化任务及 512KiB 文件分块。数据库全局租约 90 秒，每个进程也限制并发。
- `server/export-jobs.cjs` 每次推进一个步骤：准备清单、生成一张 PNG、生成四帧 GIF、编码 GIF、追加一个 ZIP 文件或写 ZIP 中央目录。每步落库，实例重启从检查点继续。
- `server/export-renderer.cjs` 用 Playwright 控制服务端 Chromium，通过私有 loopback 静态服务加载 `dist/server-render.html`，直接截图真实组件 DOM。加载原存档模板和模块顺序，保留动态高度、真实字体、透明背景；验证器倍率为 2。
- `src/server-render-entry.js` 与 `src/app.js` 的服务端分支复用组件渲染逻辑；只保留最终切图区域，PNG 禁止动效，GIF 以固定时间推进动画。
- `server/export-gif-worker.cjs` 在 worker 中统一调色板，静态区域冻结；透明范围稳定时用差分帧。透明索引独立于黑色，超过 2MiB 时逐级降帧。
- `server/export-zip.cjs` 生成 UTF-8 文件名的普通 ZIP，以分块追加而非一次性持有全部文件。

渲染器只允许当前构建 `/assets/`、渲染入口及 data/blob 资源。旧存档中的绝对 `/assets/` URL 按路径读取本地构建，缺素材显式失败。私有页面不携带生产登录 cookie；公开服务器不提供 `server-render.html`。

## 必要部署步骤

1. 在目标数据库执行 `supabase/migrations/202611040003_server_exports.sql`，确认末尾四项 `ready` 为 true。develop/product 分别执行。迁移可重复执行，不改变活动历史表。
2. 保持现有 Coze 根目录构建/启动脚本。安装 production dependencies，生成 `dist`；运行时为 Node.js 24。
3. Linux 默认解压 `@sparticuz/chromium` 自带浏览器到临时目录。需允许子进程、可写临时目录以及兼容浏览器运行库。可通过 `EXPORT_CHROMIUM_PATH` 指定浏览器。建议至少 2GiB 内存起评估，需按实际任务监测；不是已验证的 Coze 资源值。
4. 在目标运行环境执行 `pnpm export:check`。该 CLI 连续生成三个不同任务的透明 PNG，核对各自文案和同任务页面复用，不连接数据库、不修改活动，也不阻断网站普通启动。
5. 部署后通过生产 `/api/exports` 实际完成一次 PNG、ZIP 和 GIF，确认 FaaS 请求时限与数据库配额。macOS 检查不能代替 Linux 运行验证。

复用既有服务端 Supabase 与历史身份适配器配置。新增表与函数仅 service_role 可用，前端不得持有服务端数据库凭据。

### Coze 生产运行库修复（2026-11-04）

首次生产导出在 Chromium 启动时退出。生产日志明确记录：

```text
/tmp/chromium: error while loading shared libraries: libnspr4.so:
cannot open shared object file: No such file or directory
```

开发容器自检通过不能证明生产容器拥有同一套系统库。`@sparticuz/chromium` 仅在识别到特定 AWS/Vercel 环境时自动解压 `al2023.tar.br`，该归档实际包含缺失的 NSPR/NSS 库。

修复后的 Linux 默认渲染器显式解压该归档，将其 `lib/` 和临时目录加入 Chromium 子进程的 `LD_LIBRARY_PATH`，保留已有搜索路径，并配置打包字体目录。即使 `/tmp/chromium` 已缓存，也执行库准备；不修改服务器进程的环境变量。

针对“浏览器已缓存但生产运行库缺失”的回归检查先复现失败，再通过实际归档解压和启动参数检查验证修复。在 Coze Linux x64 / Node 24.21.0 / Chromium 153.0.8010.0 中，临时使用上述库加载配置实际生成了透明 PNG：750×128、17248 bytes、`ready: true`。没有修改 Coze 源码或数据库。

此修复仅需更新代码并重新部署，不增加 SQL。新生产部署的 HTTP 出图仍需复测；重新部署后取消旧失败任务并新建导出，避免使用旧构建继续推进。

### 连续任务浏览器复用修复（2026-11-04）

运行库修复部署后，用户出现部分任务成功、部分失败。生产日志在 21:31:10 和 21:31:39 记录 `browserContext.newPage: Target page, context or browser has been closed`，失败发生在创建渲染页面时。

原渲染器切换任务时关闭旧 context，再在同一浏览器创建新 context。打包 Chromium 默认使用 `--single-process`，关闭最后一个 context 后继续使用该浏览器存在兼容性风险。修复为每个任务使用独立浏览器；同任务的图片、GIF 帧继续复用页面。页面关闭、浏览器断开时重建；初始化失败立即释放资源。

两个新增检查先失败再通过：连续任务及关闭后恢复、初始化失败释放及同任务重试。macOS 使用真实单进程 Chrome 出图，并仅模拟 Linux 关闭 context 时浏览器退出的效果；不将此称为真实 Linux 验收。最终 8 项导出检查通过，包括既有数据库租约检查。

更新后的自检连续生成三个 PNG（750×128），并分别核对第 1、2、3 次任务文案。真实 HTTP/隔离数据库链路连续完成 PNG（22304 bytes）、ZIP（71170 bytes）、双倍组件 PNG（47455 bytes）及 GIF（150298 bytes）。证据位于工作区 `output/server-export-lifecycle/`；不连接生产数据库。

Coze 终端的后续连续任务验证未取得可核查结果，浏览器桥接随后超时；修复后的 Linux 自检及生产 HTTP 连续导出仍为 `not_run`。前端构建产物未改变，本次无需重跑 Vite；部署仍应使用现有构建脚本。此修复不增加 SQL。

附加视觉观察：修正烟测夹具的真实字段名 `descriptionText` 后，长文案能写入渲染 DOM，但“随机奖品填写地址”现有组件的 95.06px 固定高度和 `overflow: hidden` 会裁切过长文字。样图 `output/server-export-lifecycle/服务端会场.png` 已观察到该问题。该组件样式未纳入本次浏览器生命周期修复，不将长文案完整显示标记为通过；按用户保留的视觉手测范围单独处理。

## 任务语义与限制

- 这是页面驱动、可恢复的分步生成，尚无独立常驻队列消费者。关闭浏览器后暂停，重新打开导出任务并手动继续；不保证关闭页面后后台完成。
- 请求失败后的重新提交使用同一 UUID 与相同内容，数据库拒绝 ID 内容冲突。已落库文件不因恢复重新生成；在检查点之前中断的当前一步可重新生成。
- 新部署导致 build ID 改变时，未完成任务显式要求取消并重新导出。ready 文件保持可下载，至其原有效期结束。
- 单账号两个未完成任务，全局一个租约；最多 2000 张，PNG 总量 512MiB，PNG/GIF 捕获区域分别 16M/2M 像素。ZIP 头部增加的少量字节不计入 PNG 总量。
- 任务期限为创建后 24 小时。过期读取受阻；清理由后续创建/列表查询触发，每次 100 条并级联删除分块。没有固定时刻清理保证。
- 成品与临时帧保存在数据库，base64 约有 4/3 存储开销。ZIP 打包时源 PNG 与 ZIP 并存；ready 删除源分块与输入快照。监测 Supabase 容量并评估未来迁移至对象存储。
- 文件下载通过带登录态的直接 URL 流式输出，支持单区间 Range。无前端渲染 fallback。

## 本地验证记录（2026-11-04）

5 个必要 Node 检查通过：接口权限、重启续图、公开进度字段、UTF-8 ZIP/CRC、真实 PostgreSQL 语义的全局租约及过期级联清理（PGlite）。

隔离数据库、真实 Chromium、HTTP 导出/下载链路生成以下文件，并核对大小与 Range：

| 产物 | 结果 |
|---|---|
| 旧活动模块 PNG | 750×1104，122150 bytes，长内容完整、透明外侧 |
| ZIP | 两文件，66863 bytes，解压 CRC 检查通过 |
| 管理员组件 PNG | 1500×256，47455 bytes，2 倍尺寸、透明外侧 |
| 挂件 GIF | 152×152，20 帧，150298 bytes |

Vite 生产构建通过；已有 Sass 警告与历史素材警告仍存在。生产数据库、Linux 启动及 Coze 资源/HTTP 时限未在本地验证。

工具：`scripts/server-export-smoke.cjs`（隔离数据库产物检查）、`scripts/server-export-preflight.cjs`（部署环境自检）。用户要求保留其余视觉与交互手测，不扩展全量 UI 回归。
