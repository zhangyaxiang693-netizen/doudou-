const assert = require("node:assert/strict");
const path = require("node:path");
const { test } = require("node:test");
const { ExportRenderer } = require("../export-renderer.cjs");
const { crc32, zipLocalHeader, zipCentralDirectory } = require("../export-zip.cjs");

function atom(id, schemaId, props = {}) {
  return { id, schemaId, type: "atom", props };
}

function audienceNode(node, names, dimension = "蓝图版本") {
  return {
    ...node,
    activeLineageVariantId: "base",
    guidedLineageVariants: names.map((title, index) => ({
      id: index ? `version${index + 1}` : "base", title, node: structuredClone(node),
    })),
    guidedLineageGraph: {
      dimensions: [{ id: "dimension1", title: dimension }],
      nodes: names.map((_, index) => ({
        id: `graph${index}`, variantId: index ? `version${index + 1}` : "base",
        kind: "component", dimensionId: "dimension1",
      })),
      edges: [],
    },
  };
}

function namingSnapshot() {
  const task = atom("task1", "任务条-样式1", { taskTitle: "投一单DOU+" });
  task.guidedStates = [
    { id: "default", name: "点击前", node: structuredClone(task) },
    { id: "clicked", name: "点击后", node: atom("task1-done", "任务条-样式1-点击后", task.props) },
  ];
  return {
    schemaVersion: 3,
    editor: {
      workflowType: "venue", guidedPageThemeId: "pink",
      pages: [{
        id: "main", name: "命名测试", colorThemeId: "pink",
        nodes: [
          audienceNode(atom("header", "头图", { text: "抽888元流量大奖" }),
            ["高消耗老客", "人群2"]),
          audienceNode({
            id: "tasks", schemaId: "任务列表", type: "molecule",
            children: [atom("task-title", "模块标题-正常"), task],
          }, ["近30天消耗(0,100]"], "个人素人"),
          atom("prizes", "弹窗-中奖", {
            prizeCount: 2, prize1Text: "10元流量券", prize2Text: "1000元心动券包",
          }),
        ],
      }, {
        id: "hot", name: "活动火爆", isSystemFallback: true, colorThemeId: "pink",
        nodes: [atom("hot-tip", "无活动提示")],
      }],
    },
  };
}

test("production plans use actual audiences consistently for single, module and ZIP exports", {
  skip: process.env.EXPORT_VISUAL_TESTS !== "1" && "set EXPORT_VISUAL_TESTS=1 after npm run build",
}, async (t) => {
  const renderer = new ExportRenderer({ distDir: path.join(__dirname, "../../dist") });
  t.after(() => renderer.close());
  const snapshot = namingSnapshot();
  const original = structuredClone(snapshot);
  const input = { snapshot, format: "zip", filename: "活动_切图.zip", selection: { kind: "all" } };
  const job = { id: "naming-plan", owner_id: "naming-regression", input_json: input };
  const entries = await renderer.plan(job);
  const names = entries.map((entry) => entry.name);
  assert.ok(names.includes("头图_高消耗老客.png"));
  assert.ok(names.includes("头图_人群2.png"));
  assert.ok(names.includes("任务标题_个人素人-近30天消耗(0,100].png"));
  assert.ok(names.includes("任务1_个人素人-近30天消耗(0,100]_未完成.png"));
  assert.ok(names.includes("任务1_个人素人-近30天消耗(0,100]_已完成.png"));
  assert.ok(names.includes("中奖_奖品2-1000元心动券包.png"));
  assert.ok(entries.some((entry) => entry.path === "【兜底页】活动火爆/页面底图/页面底图.png"));
  assert.ok(entries.some((entry) => entry.path === "【落地页】/任务/未完成/任务1_个人素人-近30天消耗(0,100]_未完成.png"));
  assert.ok(entries.some((entry) => entry.path === "【弹窗】/抽奖结果/未中奖/未中奖.png"));
  assert.equal(new Set(entries.map((entry) => entry.path)).size, entries.length);
  assert.deepEqual(snapshot, original, "planning cannot change the persisted input");

  async function plan(selection, format = "zip", nextSnapshot = snapshot) {
    return renderer.page.evaluate((value) => {
      window.serverExportRuntime.load(value);
      return window.serverExportRuntime.plan();
    }, { ...input, snapshot: nextSnapshot, selection, format });
  }
  const header = entries.find((entry) => entry.name === "头图_高消耗老客.png");
  const single = await plan({ kind: "single", entryId: header.id }, "png");
  assert.deepEqual(single, [header]);
  const module = await plan({ kind: "module", pageId: "main", moduleKey: "node:header" });
  assert.deepEqual(module.map((entry) => entry.name), ["头图_高消耗老客.png", "头图_人群2.png"]);
  assert.deepEqual(module.map((entry) => entry.path), module.map((entry) => `头图/${entry.name}`));
  const tasks = await plan({ kind: "module", pageId: "main", moduleKey: "node:tasks" });
  assert.equal(tasks.length, 3);
  assert.ok(tasks.every((entry) => entry.path.startsWith("任务/")));
  const results = await plan({ kind: "module", pageId: "main", moduleKey: "node:prizes" });
  assert.equal(results.length, 3);
  assert.ok(results.every((entry) => entry.path.startsWith("抽奖结果/")));
  assert.ok(results.some((entry) => entry.path === "抽奖结果/未中奖/未中奖.png"));

  const renamed = structuredClone(snapshot);
  renamed.editor.pages[0].nodes[0].guidedLineageVariants[0].title = "个人素人";
  const after = await plan({ kind: "all" }, "zip", renamed);
  assert.deepEqual(after.map((entry) => entry.id), entries.map((entry) => entry.id));
  assert.ok(after.some((entry) => entry.name === "头图_个人素人.png"));

  // Exercise the production ZIP writer's UTF-8 path encoding with every cut.
  let offset = 0;
  const payload = Buffer.from("naming-regression");
  const files = entries.map((entry) => {
    const file = { path: entry.path, size: payload.length, crc: crc32(payload), offset };
    offset += zipLocalHeader(file).length + payload.length;
    return file;
  });
  const directory = zipCentralDirectory(files, offset);
  const zipPaths = [];
  for (let index = 0; index < directory.length - 22;) {
    assert.equal(directory.readUInt32LE(index), 0x02014b50);
    assert.equal(directory.readUInt16LE(index + 8), 0x800);
    const length = directory.readUInt16LE(index + 28);
    zipPaths.push(directory.subarray(index + 46, index + 46 + length).toString("utf8"));
    index += 46 + length;
  }
  assert.deepEqual(zipPaths, entries.map((entry) => entry.path));
});
