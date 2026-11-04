import assert from "node:assert/strict";
import test from "node:test";
import { reconcileGeneratedPages } from "./page-reconciliation.js";

test("template insertion and reordering retain edits on the same module identity", () => {
  const node = (key, index, text) => ({
    id: `id-${key}`, schemaId: "重复组件", sourcePageTemplateNodeIndex: index,
    sourcePageTemplateNodeKey: key, props: { text },
  });
  const page = (nodes) => [{ id: "page", sourcePageTemplateId: "template", nodes }];
  const baseline = page([node("a", 0, "A原文"), node("b", 1, "B原文")]);
  const current = page([node("b", 0, "B用户编辑"), node("c", 1, "C新增"), node("a", 2, "A用户编辑")]);
  const generated = page([node("b", 0, "B原文"), node("c", 1, "C新增"), node("a", 2, "A表格更改")]);
  const result = reconcileGeneratedPages(current, baseline, generated);
  assert.deepEqual(result[0].nodes.map((item) => item.props.text), ["B用户编辑", "C新增", "A表格更改"]);
  assert.deepEqual(result[0].nodes.map((item) => item.id), ["id-b", "id-c", "id-a"]);
});

test("table-only reordering changes preview order without losing edits or manually inserted modules", () => {
  const node = (key, text) => ({ id: key, schemaId: "重复组件",
    sourcePageTemplateNodeKey: key, props: { text } });
  const page = (nodes) => [{ id: "page", sourcePageTemplateId: "t", nodes }];
  const baseline = page([node("a", "原A"), node("b", "原B"), node("c", "原C")]);
  const current = page([node("a", "改A"), node("manual", "手动新增"), node("b", "改B"), node("c", "改C")]);
  const generated = page([node("b", "原B"), node("a", "原A"), node("c", "原C")]);
  const result = reconcileGeneratedPages(current, baseline, generated);
  assert.deepEqual(result[0].nodes.map((item) => item.id), ["b", "a", "manual", "c"]);
  assert.deepEqual(result[0].nodes.map((item) => item.props.text), ["改B", "改A", "手动新增", "改C"]);
});

test("legacy template nodes adopt new identity keys without duplicating saved modules", () => {
  const current = [{ id: "page", sourcePageTemplateId: "t", nodes: [
    { id: "saved", schemaId: "头图", sourcePageTemplateNodeIndex: 0, props: { text: "已保存编辑" } },
  ] }];
  const generated = structuredClone(current);
  generated[0].nodes[0].sourcePageTemplateNodeKey = "new-key";
  generated[0].nodes[0].props.text = "模板原文";
  const result = reconcileGeneratedPages(current, null, generated);
  assert.equal(result[0].nodes.length, 1);
  assert.equal(result[0].nodes[0].props.text, "已保存编辑");
  assert.equal(result[0].nodes[0].sourcePageTemplateNodeKey, "new-key");
});

const pages = (text = "默认标题", amount = "5") => [{
  id: "p", sourceContextId: "audience1", colorThemeId: "pink",
  nodes: [{
    id: "n", type: "atom", schemaId: "券", sourceModuleId: "reward",
    props: { text, amount, customColor: "#fff", empty: "默认" },
    guidedLineageVariants: [{ id: "base", node: { id: "v", schemaId: "券", props: { amount } } }],
  }],
}];

test("preview round trips preserve edits, identities and unsupported custom properties", () => {
  const baseline = pages();
  const current = pages("手动\n两行");
  current[0].colorThemeId = "blue";
  current[0].nodes[0].props.customColor = "#D91758";
  current[0].nodes[0].props.empty = "";
  current[0].nodes[0].offsetY = 12;
  const generated = pages();
  generated[0].id = "rebuilt-page";
  generated[0].nodes[0].id = "rebuilt-node";
  const merged = reconcileGeneratedPages(current, baseline, generated);
  assert.deepEqual(merged, current);
});

test("a changed table field updates only that field and keeps other preview edits", () => {
  const current = pages("手动标题", "9");
  current[0].nodes[0].props.customColor = "#D91758";
  const merged = reconcileGeneratedPages(current, pages(), pages("表格新标题", "5"));
  assert.equal(merged[0].nodes[0].props.text, "表格新标题");
  assert.equal(merged[0].nodes[0].props.amount, "9");
  assert.equal(merged[0].nodes[0].props.customColor, "#D91758");
});

test("manual added and removed modules survive while table additions and removals apply", () => {
  const baseline = pages();
  baseline[0].nodes.push({ id: "deleted", schemaId: "条", sourceModuleId: "deleted", props: {} });
  const current = pages();
  current[0].nodes.push({ id: "manual", schemaId: "按钮", props: { text: "新增" } });
  const next = pages();
  next[0].nodes.push({ id: "deleted-new", schemaId: "条", sourceModuleId: "deleted", props: {} });
  next[0].nodes.push({ id: "from-table", schemaId: "提示", sourceModuleId: "new", props: {} });
  const merged = reconcileGeneratedPages(current, baseline, next);
  assert.deepEqual(merged[0].nodes.map((n) => n.id), ["n", "from-table", "manual"]);
  const removed = reconcileGeneratedPages(pages(), pages(), []);
  assert.deepEqual(removed, []);
});

test("legacy saved pages without a baseline retain all content on their first rebuild", () => {
  const current = pages("旧存档", "22");
  const merged = reconcileGeneratedPages(current, null, pages());
  assert.deepEqual(merged, current);
});
