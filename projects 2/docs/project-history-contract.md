# 用户项目历史协作契约

## 目标

用户完成飞书登录后，可以保存当前活动项目，并在“我的”中查看和恢复历史版本。
前端部署更新后，原有 PRD 输入、蓝图变量、页面结构和组件状态仍可恢复。

## 职责边界

### 线上 Agent

- 从部署平台的可信登录会话中解析当前用户。
- 实现项目和版本数据库表。
- 实现本文件定义的 `/api/me`、`/api/projects` 和版本 API。
- 所有读写操作在服务端校验 `owner_id`。
- 提供数据库迁移、线上环境变量和部署配置。

### 本地 Agent

- 实现项目快照创建、校验、迁移和恢复。
- 实现手动保存、自动草稿和失败重试。
- 实现“我的”项目与版本列表。
- 接入本文件定义的 API。
- 使用 IndexedDB 保存离线草稿，但不将其作为正式数据源。

## 身份约束

服务端必须从可信 Session、JWT 或部署平台上下文中取得用户标识。
禁止使用请求正文或查询参数中的 `owner_id` 作为身份依据。

用户标识优先级：

1. 部署平台提供的稳定内部用户 ID
2. 飞书 `union_id`
3. 当前飞书应用内稳定的 `open_id`

`GET /api/me` 响应：

```json
{
  "success": true,
  "data": {
    "id": "stable-user-id",
    "name": "用户显示名",
    "avatarUrl": ""
  }
}
```

未登录统一返回 HTTP `401`。

本地代码通过环境变量接入线上身份适配器：

```text
PROJECT_HISTORY_AUTH_ADAPTER=server/deployment-auth.cjs
```

该模块必须导出 `async resolveUser(req)`，返回 `{ id, name, avatarUrl }` 或未登录时返回
`null`。`id` 必须来自部署平台已校验的 Session/JWT 上下文；禁止读取前端可伪造的
`X-User-Id`、请求正文或查询参数。未配置适配器时历史 API 返回 HTTP `503`
和 `IDENTITY_UNAVAILABLE`，不会降级为不安全身份。

## 数据表

### projects

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 项目 ID |
| owner_id | text | 服务端解析的稳定用户 ID |
| name | text | 活动名称 |
| prd_url | text | 原始 PRD 链接 |
| template_id | text | 页面模板 ID |
| latest_version_id | uuid | 最新正式版本 |
| created_at | timestamptz | 创建时间 |
| updated_at | timestamptz | 更新时间 |
| deleted_at | timestamptz nullable | 软删除时间 |

索引：`(owner_id, updated_at desc)`。

### project_versions

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | uuid | 版本 ID |
| project_id | uuid | 所属项目 |
| version_no | integer | 项目内递增版本号 |
| save_type | text | `manual` 或 `autosave` |
| schema_version | integer | 快照结构版本 |
| app_version | text | 保存时应用版本 |
| snapshot_json | jsonb | 完整项目快照 |
| snapshot_saved_at | timestamptz | 客户端生成快照的时间，用于拒绝乱序自动保存 |
| created_at | timestamptz | 保存时间 |

约束：`(project_id, version_no)` 唯一。

每个项目只保留一条可覆盖的 `autosave`；手动版本不可覆盖。
同一客户端必须串行提交保存请求；服务端仅允许较新的 `snapshot_saved_at` 覆盖自动草稿。

## 快照格式

```json
{
  "schemaVersion": 1,
  "appVersion": "0.1.0",
  "savedAt": "ISO-8601",
  "source": {
    "prdUrl": "",
    "prdText": "",
    "templateName": ""
  },
  "editor": {
    "activity": {},
    "pages": [],
    "currentTemplateId": "",
    "activePageId": "",
    "selectedDimension": "",
    "selectedDemoPackageId": "",
    "prdTableRows": [],
    "prdTableBlueprint": {},
    "prdTableBlueprintSignature": "",
    "prdBlueprintPasteRows": [],
    "prdBlueprintPasteTemplateName": "",
    "prdBlueprintPasteVersions": [],
    "prdBlueprintPasteModuleVersions": {},
    "prdManualModuleVersions": {},
    "pageTemplateBlueprintStates": {},
    "pageTemplateChildStates": {},
    "guidedHeaderLevelId": "",
    "guidedHeaderLevelDrafts": {},
    "guidedHeaderDefaultPageSnapshots": {},
    "guidedLotteryPrizeOverrides": {}
  },
  "templates": {
    "activePageTemplate": {},
    "referencedPageTemplates": [],
    "referencedMoleculeTemplates": []
  },
  "resume": {
    "stage": "blueprint"
  }
}
```

`templates` 保存当前活动实际引用的模板定义，避免平台更新或模板删除后历史项目无法恢复。
`resume` 只保存恢复工作所需的轻量 UI 上下文；当前阶段仅允许 `blueprint` 或 `preview`。

不保存弹窗开关、拖拽状态、选中框、滚动位置、加载状态和错误提示等临时 UI 状态。

## API

### 查询项目

`GET /api/projects`

只返回当前用户且未删除的项目，按 `updated_at desc` 排序。

### 创建项目

`POST /api/projects`

```json
{
  "name": "活动名称",
  "prdUrl": "",
  "templateId": "",
  "snapshot": {}
}
```

创建项目并生成第一个手动版本。

### 更新项目自动草稿

`PUT /api/projects/:projectId/autosave`

```json
{
  "baseVersionId": "uuid",
  "snapshot": {}
}
```

### 创建正式版本

`POST /api/projects/:projectId/versions`

```json
{
  "baseVersionId": "uuid",
  "snapshot": {}
}
```

### 查询版本

`GET /api/projects/:projectId/versions`

### 读取版本

`GET /api/projects/:projectId/versions/:versionId`

### 删除项目

`DELETE /api/projects/:projectId`

采用软删除。

## 错误码

| HTTP | code | 说明 |
| --- | --- | --- |
| 400 | INVALID_SNAPSHOT | 快照格式无效 |
| 401 | UNAUTHENTICATED | 未登录 |
| 403 | PROJECT_FORBIDDEN | 项目不属于当前用户 |
| 404 | PROJECT_NOT_FOUND | 项目或版本不存在 |
| 409 | VERSION_CONFLICT | 基础版本已过期 |
| 500 | STORAGE_ERROR | 云端保存失败 |

## 恢复和升级

- 前端恢复前必须执行 `migrateSnapshot(snapshot)`。
- 数据迁移按 `schemaVersion` 逐级执行，禁止跳版本。
- 新字段补默认值，字段改名显式转换。
- 无法识别的组件保留原始节点并展示兼容占位，禁止静默丢弃。
- 应用部署版本变化不得清空项目数据。

## 验收

1. 同一飞书用户在刷新和重新登录后仍能查看项目。
2. 不同用户不能读取、修改或删除彼此项目。
3. 恢复后 PRD、蓝图、人群、状态、页面及组件内容一致。
4. 平台升级后旧 `schemaVersion` 快照可以迁移打开。
5. 云端保存失败时保留本地草稿，网络恢复后可重试。
