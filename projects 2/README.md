# H5 Visual Builder

一个干净的 H5 活动页可视化搭建底座。

当前状态：

- 物料库已清空，没有内置原子/分子组件。
- 模板库已清空。
- 只保留空白活动入口。
- 项目已升级为 Vite + React + TypeScript，可以接入真实 React 组件。

## 新组件放置方式

把每个组件作为独立文件夹放在项目根目录：

```text
组件名/
  index.tsx
  index.module.scss
  schema.json
  assets/        可选
```

`schema.json` 至少包含：

```json
{
  "id": "coupon-card",
  "title": "优惠券组件",
  "description": "展示优惠券信息",
  "type": "atom",
  "props": [
    { "name": "amount", "label": "金额", "type": "string", "default": "800" },
    { "name": "title", "label": "标题", "type": "string", "default": "优惠券" }
  ]
}
```

要求：

- `index.tsx` 默认导出 React 组件。
- 可编辑内容必须通过 props 传入。
- 图片、SVG 等资源放进组件自己的 `assets/`。
- 不要依赖远程图片链接。

## 读取企业内部飞书文档

服务端通过飞书企业自建应用读取内部文档。运行或部署时配置：

```bash
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx
```

应用需要发布并获得以下权限：

- `docx:document:readonly`：读取新版文档
- `drive:document:readonly`：访问云空间文档
- `docs:doc:readonly`：读取旧版文档（按需）
- `wiki:wiki:readonly`：解析知识库链接（按需）

目标文档必须将该应用添加为“可阅读”协作者；批量文档可对上级文件夹授权。`App Secret` 只能配置在服务端环境变量中，不得写入前端代码。

接口 `POST /api/fetch-feishu-doc` 接收 `{ "url": "飞书文档链接" }`。服务端自动获取并缓存 `tenant_access_token`，过期前会自动刷新。
