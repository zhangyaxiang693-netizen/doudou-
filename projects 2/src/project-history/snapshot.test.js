import assert from "node:assert/strict";
import test from "node:test";
import {
  applyProjectSnapshot,
  createProjectSnapshot,
  migrateProjectSnapshot,
} from "./snapshot.js";

function createState() {
  return {
    workflowType: "resource",
    resourceLevel: "daily",
    resourceDrafts: {
      daily: {
        activityName: "测试资源位",
        audiences: [],
      },
    },
    activity: { name: "测试项目" },
    pages: [
      {
        id: "page_1",
        name: "页面 1",
        dimension: "人群 A",
        nodes: [{ id: "node_1", schemaId: "任务条-样式1", props: {} }],
      },
    ],
    activePageId: "page_1",
    selectedDimension: "人群 A",
    prdFeishuUrl: "https://example.feishu.cn/docx/example",
    prdTextInput: "PRD 正文",
    prdTableRows: [{ module: "任务", field: "标题", values: ["完成任务"] }],
    guidedLotteryPrizeOverrides: { prize1: "5元流量券" },
    selectedId: "node_1",
    colorPanelOpen: true,
  };
}

test("creates a business snapshot without transient selection state", () => {
  const snapshot = createProjectSnapshot(createState(), {
    appVersion: "0.1.0",
  });

  assert.equal(snapshot.schemaVersion, 2);
  assert.equal(snapshot.source.prdText, "PRD 正文");
  assert.equal(snapshot.editor.guidedLotteryPrizeOverrides.prize1, "5元流量券");
  assert.equal(snapshot.editor.workflowType, "resource");
  assert.equal(snapshot.editor.resourceDrafts.daily.activityName, "测试资源位");
  assert.equal("selectedId" in snapshot.editor, false);
  assert.equal("colorPanelOpen" in snapshot.editor, false);
});

test("restores editor fields and clears transient UI state", () => {
  const source = createState();
  const snapshot = createProjectSnapshot(source);
  const target = {
    pages: [],
    activePageId: "",
    selectedDimension: "",
    selectedId: "stale-selection",
    colorPanelOpen: true,
  };

  applyProjectSnapshot(target, snapshot);

  assert.equal(target.activity.name, "测试项目");
  assert.equal(target.pages[0].nodes[0].schemaId, "任务条-样式1");
  assert.equal(target.selectedId, null);
  assert.equal(target.colorPanelOpen, false);
});

test("preserves the selected page theme when saving and restoring a project", () => {
  const source = createState();
  source.guidedPageThemeId = "node-anniversary";
  source.pages[0].colorThemeId = "node-anniversary";
  const snapshot = createProjectSnapshot(source, { stage: "preview" });
  source.guidedPageThemeId = "pink";
  source.pages[0].colorThemeId = "pink";
  const target = { ...createState(), guidedPageThemeId: "blue" };

  applyProjectSnapshot(target, snapshot);

  assert.equal(snapshot.editor.guidedPageThemeId, "node-anniversary");
  assert.equal(target.guidedPageThemeId, "node-anniversary");
  assert.equal(target.pages[0].colorThemeId, "node-anniversary");
  assert.equal(snapshot.resume.stage, "preview");
});

test("restores the theme from saved pages for older snapshots", () => {
  const source = createState();
  source.pages[0].colorThemeId = "blue";
  const snapshot = createProjectSnapshot(source);
  delete snapshot.editor.guidedPageThemeId;
  const target = { ...createState(), guidedPageThemeId: "node-anniversary" };

  applyProjectSnapshot(target, snapshot);

  assert.equal(target.guidedPageThemeId, "blue");
});

test("uses the default theme for an older project without saved colors", () => {
  const snapshot = createProjectSnapshot(createState());
  delete snapshot.editor.guidedPageThemeId;
  const target = { ...createState(), guidedPageThemeId: "node-anniversary" };

  applyProjectSnapshot(target, snapshot);

  assert.equal(target.guidedPageThemeId, "pink");
});

test("rejects snapshots created by a newer schema", () => {
  assert.throws(
    () =>
      migrateProjectSnapshot({
        schemaVersion: 99,
        editor: { pages: [] },
      }),
    /更高版本/,
  );
});

test("migrates venue snapshots from schema version 1", () => {
  const migrated = migrateProjectSnapshot({
    schemaVersion: 1,
    editor: {
      pages: [],
    },
  });

  assert.equal(migrated.schemaVersion, 2);
  assert.equal(migrated.editor.workflowType, "venue");
  assert.equal(migrated.editor.resourceLevel, "daily");
});
