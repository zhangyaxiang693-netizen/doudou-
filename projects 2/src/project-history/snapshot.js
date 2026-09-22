export const SNAPSHOT_SCHEMA_VERSION = 2;

const EDITOR_FIELDS = [
  "workflowType",
  "resourceLevel",
  "resourceDrafts",
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
  "guidedHeaderLevelId",
  "guidedHeaderLevelDrafts",
  "guidedHeaderDefaultPageSnapshots",
  "guidedLotteryPrizeOverrides",
  "guidedVisiblePageIds",
  "guidedVisibleCompanionNodeIds",
  "prdTemplatePreviewVersions",
  "guidedLineageVersion",
  "selectedLineageVariantId",
];

const TRANSIENT_DEFAULTS = {
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
    resume: {
      stage: stage === "preview" ? "preview" : "blueprint",
    },
  };
}

export function validateProjectSnapshot(snapshot) {
  return Boolean(
    snapshot &&
      typeof snapshot === "object" &&
      !Array.isArray(snapshot) &&
      Number.isInteger(snapshot.schemaVersion) &&
      snapshot.schemaVersion > 0 &&
      snapshot.editor &&
      typeof snapshot.editor === "object" &&
      Array.isArray(snapshot.editor.pages),
  );
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
  migrated.editor.pages ||= [];
  migrated.editor.guidedLotteryPrizeOverrides ||= null;
  migrated.templates.activePageTemplate ||= null;
  migrated.templates.referencedPageTemplates ||= [];
  migrated.templates.referencedMoleculeTemplates ||= [];
  migrated.resume.stage =
    migrated.resume.stage === "preview" ? "preview" : "blueprint";
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

  let migrated = clone(snapshot);
  while (migrated.schemaVersion < SNAPSHOT_SCHEMA_VERSION) {
    if (migrated.schemaVersion === 1) {
      migrated = migrateV1ToV2(migrated);
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
    if (migrated.editor[field] !== undefined) {
      state[field] = clone(migrated.editor[field]);
    }
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
