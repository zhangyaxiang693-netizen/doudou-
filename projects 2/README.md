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
