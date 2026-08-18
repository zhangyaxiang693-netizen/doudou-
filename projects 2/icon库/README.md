# 图标库

图标的正式名称和分类记录在 `icon-manifest.json`。

命名规则：

```text
分类 / 图标名称 / 颜色
```

例如：

```text
badge-medal / pink
badge-medal / red
badge-medal / magenta
```

三种通用颜色统一使用：

- `pink`：粉色
- `red`：红色
- `magenta`：玫红色

组件引用时建议使用 manifest 中的 `id` 和颜色，不要继续依赖 Figma 导出的 `Group 214724xxxx.svg` 文件名。例如：

```ts
const icon = iconManifest.categories
  .find((category) => category.id === 'badge')
  ?.icons.find((item) => item.id === 'badge-medal')
  ?.variants.pink
```

原始 SVG 文件暂时保留原名，避免已有引用失效；正式命名先通过 manifest 统一管理。
