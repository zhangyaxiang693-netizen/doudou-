export const SNAPSHOT_SCHEMA_VERSION = 3;

const EDITOR_FIELDS = [
  "workflowType",
  "resourceLevel",
  "resourceDrafts",
  "resourcePreviewVersionIds",
  "generatedPageBaseline",
  "activity",
  "pages",
  "currentTemplateId",
  "activePageId",
  "selectedDimension",
  "prdTextInput",
  "prdBlueprintPasteTemplateName",
  "prdBlueprintPasteVersions",
  "prdBlueprintPasteModuleVersions",
  "prdBlueprintPasteRows",
  "prdTableRows",
  "prdManualModuleVersions",
  "selectedDemoPackageId",
  "selectedBlueprintAudienceId",
  "selectedBlueprintSceneId",
  "prdTableBlueprint",
  "prdTableBlueprintSignature",
  "pageTemplateBlueprintStates",
  "pageTemplateChildStates",
  "guidedPageThemeId",
  "guidedHeaderLevelId",
  "guidedHeaderLevelDrafts",
  "guidedHeaderDefaultPageSnapshots",
  "guidedLotteryPrizeOverrides",
  "guidedVisiblePageIds",
  "guidedVisibleCompanionNodeIds",
  "prdTemplatePreviewVersions",
  "guidedLineageVersion",
  "selectedLineageVariantId",
  "guidedWorkspaceMode",
  "createDraft",
];

const TRANSIENT_DEFAULTS = {
  blueprintReturningFromPreview: false,
  demoSelectedNodeId: null,
  prdTemplateAddAfterIndex: null,
  prdTemplateAddModal: null,
  prdTemplateSelectedModuleIndex: null,
  prdBlueprintPasteError: "",
  selectedId: null,
  dropIndex: null,
  dropPageId: null,
  dropMoleculeId: null,
  dropChildIndex: null,
  draggingNodeId: null,
  pointerDrag: null,
  suppressClick: false,
  colorPanelOpen: false,
  variantPanelOpen: false,
  propsPanelOpen: false,
  richtextEditorOpen: false,
  canvasColorPanelOpen: false,
  guidedPanelMode: null,
  guidedStateMenuNodeId: null,
  guidedAddTargetContext: null,
  guidedCanvasInitialized: false,
  saveScopeModalOpen: false,
  canvasPanDrag: null,
  canvasZoom: 1,
  canvasPanX: 40,
  canvasPanY: 40,
};

const EDITOR_DEFAULTS = {
  workflowType: "venue",
  resourceLevel: "daily",
  resourceDrafts: {},
  resourcePreviewVersionIds: {},
  generatedPageBaseline: null,
  activity: { name: "未命名活动", note: "活动 → 维度 → 页面 → 模块 → 变体" },
  pages: [],
  currentTemplateId: null,
  activePageId: "",
  selectedDimension: "",
  prdTextInput: "",
  prdBlueprintPasteTemplateName: "",
  prdBlueprintPasteVersions: [],
  prdBlueprintPasteModuleVersions: {},
  prdBlueprintPasteRows: [],
  prdTableRows: [],
  prdManualModuleVersions: {},
  selectedDemoPackageId: "",
  selectedBlueprintAudienceId: "",
  selectedBlueprintSceneId: "",
  prdTableBlueprint: null,
  prdTableBlueprintSignature: "",
  pageTemplateBlueprintStates: {},
  pageTemplateChildStates: {},
  guidedPageThemeId: "pink",
  guidedHeaderLevelId: "default",
  guidedHeaderLevelDrafts: {
    s: { mainTitle: "任务通关赢X元流量", highlightText: "X元流量", subtitle: "为爱加投", dateText: "" },
  },
  guidedHeaderDefaultPageSnapshots: [],
  guidedLotteryPrizeOverrides: null,
  guidedVisiblePageIds: [],
  guidedVisibleCompanionNodeIds: [],
  prdTemplatePreviewVersions: {},
  guidedLineageVersion: "v3",
  selectedLineageVariantId: "base",
  guidedWorkspaceMode: "split",
  createDraft: { name: "新活动", dimensions: ["个人用户"], pages: {} },
};

function clone(value) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}

export function createProjectSnapshot(
  state,
  {
    appVersion = "",
    activePageTemplate = null,
    referencedPageTemplates = [],
    referencedMoleculeTemplates = [],
    activitySources = null,
    stage = "blueprint",
  } = {},
) {
  const editor = {};
  EDITOR_FIELDS.forEach((field) => {
    if (state[field] !== undefined) editor[field] = clone(state[field]);
  });

  return {
    schemaVersion: SNAPSHOT_SCHEMA_VERSION,
    appVersion,
    savedAt: new Date().toISOString(),
    source: {
      prdUrl: String(state.prdFeishuUrl || ""),
      prdText: String(state.prdTextInput || ""),
      templateName: String(state.prdBlueprintPasteTemplateName || ""),
    },
    editor,
    templates: {
      activePageTemplate: clone(activePageTemplate),
      referencedPageTemplates: clone(referencedPageTemplates),
      referencedMoleculeTemplates: clone(referencedMoleculeTemplates),
    },
    activitySources: clone(activitySources),
    resume: {
      stage: ["preview", "workbench"].includes(stage) ? stage : "blueprint",
    },
  };
}

export function validateProjectSnapshot(snapshot) {
  const object = (value) => value && typeof value === "object" && !Array.isArray(value);
  const validNodes = (nodes) => Array.isArray(nodes) && nodes.every((node) =>
    object(node) && typeof node.id === "string" && typeof node.schemaId === "string" &&
    (node.props === undefined || object(node.props)) &&
    (node.children === undefined || validNodes(node.children)) &&
    ["guidedStates", "guidedLineageVariants"].every((field) => node[field] === undefined ||
      (Array.isArray(node[field]) && node[field].every((entry) =>
        object(entry) && (entry.node === undefined || validNodes([entry.node]))))));
  const validPages = (pages) => Array.isArray(pages) && pages.every((page) =>
    object(page) && typeof page.id === "string" && validNodes(page.nodes));
  const validTemplateEntries = (entries) => Array.isArray(entries) && entries.every((entry) =>
    Array.isArray(entry)
      ? typeof entry[0] === "string" && (entry[1] === undefined || object(entry[1]))
      : object(entry) && typeof entry.schemaId === "string" &&
        (entry.props === undefined || object(entry.props)) &&
        (entry.children === undefined || validTemplateEntries(entry.children)));
  const validTemplate = (template) => object(template) && typeof template.id === "string" &&
    validTemplateEntries(template.nodes ?? template.children);
  const validSource = (source) => object(source) &&
    ["audiences", "scenes", "modules", "rows"].every((field) => source[field] === undefined ||
      (Array.isArray(source[field]) && source[field].every(validSource)));
  const validEditorCollections = (editor) => EDITOR_FIELDS.every((field) => {
    const value = editor[field], fallback = EDITOR_DEFAULTS[field];
    if (value === undefined || fallback === null) return true;
    if (Array.isArray(fallback)) return Array.isArray(value);
    return !object(fallback) || object(value);
  });
  return Boolean(object(snapshot) &&
      Number.isInteger(snapshot.schemaVersion) &&
      snapshot.schemaVersion > 0 &&
      object(snapshot.editor) && validPages(snapshot.editor.pages) && validEditorCollections(snapshot.editor) &&
      (snapshot.source === undefined || object(snapshot.source)) &&
      (snapshot.resume === undefined || object(snapshot.resume)) &&
      (snapshot.editor.activity === undefined || object(snapshot.editor.activity)) &&
      (snapshot.editor.resourceDrafts === undefined || object(snapshot.editor.resourceDrafts)) &&
      (snapshot.editor.generatedPageBaseline == null || validPages(snapshot.editor.generatedPageBaseline)) &&
      (snapshot.activitySources == null || (object(snapshot.activitySources) &&
        ["demoPrdBlueprint", "demoActivityPackage", "demoTimeActivityPackage"].every((field) =>
          snapshot.activitySources[field] === undefined || validSource(snapshot.activitySources[field])))) &&
      (snapshot.templates === undefined || (object(snapshot.templates) &&
        (snapshot.templates.activePageTemplate == null || validTemplate(snapshot.templates.activePageTemplate)) &&
        ["referencedPageTemplates", "referencedMoleculeTemplates"].every((field) =>
          snapshot.templates[field] === undefined || (Array.isArray(snapshot.templates[field]) &&
            snapshot.templates[field].every(validTemplate))))));
}

function migrateV1(snapshot) {
  const migrated = clone(snapshot);
  migrated.source ||= {};
  migrated.editor ||= {};
  migrated.templates ||= {};
  migrated.resume ||= {};
  migrated.source.prdUrl ||= "";
  migrated.source.prdText ||= migrated.editor.prdTextInput || "";
  migrated.source.templateName ||=
    migrated.editor.prdBlueprintPasteTemplateName || "";
  migrated.editor.activity ||= {
    name: "未命名活动",
    note: "活动 → 维度 → 页面 → 模块 → 变体",
  };
  migrated.editor.guidedPageThemeId ||=
    migrated.editor.pages.find((page) => page.colorThemeId)?.colorThemeId || "pink";
  migrated.editor.guidedLotteryPrizeOverrides ||= null;
  migrated.templates.activePageTemplate ||= null;
  migrated.templates.referencedPageTemplates ||= [];
  migrated.templates.referencedMoleculeTemplates ||= [];
  migrated.resume.stage =
    ["preview", "workbench"].includes(migrated.resume.stage) ? migrated.resume.stage : "blueprint";
  return migrated;
}

function migrateV1ToV2(snapshot) {
  const migrated = clone(snapshot);
  migrated.schemaVersion = 2;
  migrated.editor ||= {};
  migrated.editor.workflowType ||= "venue";
  migrated.editor.resourceLevel ||= "daily";
  migrated.editor.resourceDrafts ||= {};
  return migrated;
}

export function migrateProjectSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") {
    throw new Error("项目快照不存在");
  }
  if (snapshot.schemaVersion > SNAPSHOT_SCHEMA_VERSION) {
    throw new Error("该项目由更高版本创建，请先更新应用");
  }
  // Validate before defaults: absent pages are damaged data, not an empty project.
  if (!validateProjectSnapshot(snapshot)) {
    throw new Error("项目快照格式无效，当前编辑未改变");
  }

  let migrated = clone(snapshot);
  while (migrated.schemaVersion < SNAPSHOT_SCHEMA_VERSION) {
    if (migrated.schemaVersion === 1) {
      migrated = migrateV1ToV2(migrated);
      continue;
    }
    if (migrated.schemaVersion === 2) {
      migrated.schemaVersion = 3;
      migrated.activitySources ??= null;
      migrated.editor.generatedPageBaseline ??= null;
      continue;
    }
    throw new Error(`暂不支持快照版本 ${migrated.schemaVersion}`);
  }
  migrated = migrateV1(migrated);

  if (!validateProjectSnapshot(migrated)) {
    throw new Error("项目快照格式无效");
  }
  return migrated;
}

export function applyProjectSnapshot(state, snapshot) {
  const migrated = migrateProjectSnapshot(snapshot);
  EDITOR_FIELDS.forEach((field) => {
    state[field] = clone(
      migrated.editor[field] === undefined
        ? EDITOR_DEFAULTS[field]
        : migrated.editor[field],
    );
  });

  state.prdFeishuUrl = String(migrated.source.prdUrl || "");
  state.prdTextInput = String(
    migrated.editor.prdTextInput ?? migrated.source.prdText ?? "",
  );
  state.prdBlueprintPasteTemplateName = String(
    migrated.editor.prdBlueprintPasteTemplateName ??
      migrated.source.templateName ??
      "",
  );
  Object.assign(state, clone(TRANSIENT_DEFAULTS));

  const activePageExists = state.pages.some(
    (page) => page.id === state.activePageId,
  );
  if (!activePageExists) {
    state.activePageId = state.pages[0]?.id || "";
  }
  if (!state.selectedDimension) {
    state.selectedDimension = state.pages[0]?.dimension || "默认维度";
  }

  return migrated;
}
