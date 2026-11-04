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

  assert.equal(snapshot.schemaVersion, 3);
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

  assert.equal(migrated.schemaVersion, 3);
  assert.equal(migrated.editor.workflowType, "venue");
  assert.equal(migrated.editor.resourceLevel, "daily");
});

test("saves all mutable activity sources and the previous generated pages", () => {
  const sources = {
    demoPrdBlueprint: { activityName: "保存完整来源", summary: "" },
    demoActivityPackage: { id: "audience-only", audiences: [{ id: "a", modules: [{ rows: [{ value: "两行\n文案" }] }] }] },
    demoTimeActivityPackage: { id: "audience-time", scenes: [] },
  };
  const source = createState();
  source.generatedPageBaseline = [{ id: "original", nodes: [] }];
  source.resourcePreviewVersionIds = { slot: "audience-2" };
  const snapshot = createProjectSnapshot(source, { activitySources: sources });
  const migrated = applyProjectSnapshot({}, snapshot);
  sources.demoPrdBlueprint.summary = "后来改变";
  assert.equal(migrated.activitySources.demoPrdBlueprint.summary, "");
  assert.equal(migrated.activitySources.demoActivityPackage.audiences[0].modules[0].rows[0].value, "两行\n文案");
  assert.deepEqual(migrated.editor.generatedPageBaseline, source.generatedPageBaseline);
  assert.deepEqual(migrated.editor.resourcePreviewVersionIds, { slot: "audience-2" });
});

test("malformed snapshots leave every current editor field unchanged", () => {
  for (const broken of [
    { schemaVersion: 2, editor: {} },
    { schemaVersion: 3, editor: { pages: [null] } },
    { schemaVersion: 2, editor: { pages: [{ id: "p", nodes: {} }] } },
    { schemaVersion: 3, editor: { pages: [] }, templates: { referencedPageTemplates: {} } },
  ]) {
    const target = createState();
    const before = structuredClone(target);
    assert.throws(() => applyProjectSnapshot(target, broken), /格式|无效/);
    assert.deepEqual(target, before);
  }
});

test("damaged activity sources, editor collections and active templates are rejected before application", () => {
  const snapshot = createProjectSnapshot(createState());
  const patches = [
    { activitySources: { demoPrdBlueprint: "broken" } },
    { activitySources: { demoActivityPackage: { audiences: {} } } },
    { activitySources: { demoTimeActivityPackage: { scenes: [null] } } },
    { editor: { ...snapshot.editor, prdTableRows: {} } },
    { editor: { ...snapshot.editor, guidedVisiblePageIds: "broken" } },
    { editor: { ...snapshot.editor, pageTemplateChildStates: [] } },
    { templates: { activePageTemplate: { id: "template", nodes: [null] } } },
    { templates: { referencedMoleculeTemplates: [{ id: "m", children: "broken" }] } },
    { source: [] },
    { resume: "preview" },
  ];
  for (const patch of patches) {
    const target = createState();
    const before = structuredClone(target);
    assert.throws(() => applyProjectSnapshot(target, { ...snapshot, ...patch }), /格式|无效/);
    assert.deepEqual(target, before);
  }
});

test("old projects clear another project's child states, resource selections and header drafts", () => {
  const target = {
    pageTemplateChildStates: { stale: "old child" },
    pageTemplateBlueprintStates: { stale: "old blueprint" },
    guidedHeaderLevelId: "s",
    guidedHeaderLevelDrafts: { s: { mainTitle: "别的项目" } },
    resourcePreviewVersionIds: { slot: "old-version" },
    selectedLineageVariantId: "other",
    prdTemplatePreviewVersions: { old: 1 },
  };
  applyProjectSnapshot(target, { schemaVersion: 1, editor: { pages: [] } });
  assert.deepEqual(target.pageTemplateChildStates, {});
  assert.deepEqual(target.pageTemplateBlueprintStates, {});
  assert.deepEqual(target.resourcePreviewVersionIds, {});
  assert.deepEqual(target.prdTemplatePreviewVersions, {});
  assert.equal(target.selectedLineageVariantId, "base");
  assert.equal(target.guidedHeaderLevelId, "default");
  assert.equal(target.guidedHeaderLevelDrafts.s.mainTitle, "任务通关赢X元流量");
  target.guidedHeaderLevelDrafts.s.mainTitle = "修改默认值";
  const another = {};
  applyProjectSnapshot(another, { schemaVersion: 1, editor: { pages: [] } });
  assert.equal(another.guidedHeaderLevelDrafts.s.mainTitle, "任务通关赢X元流量");
});
