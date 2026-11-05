import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { applyProjectSnapshot, createProjectSnapshot } from "./snapshot.js";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const templateId = "bigday-prd-test";
const preSchemaId = "核心权益模块-bigday发券-样式1";
const postSchemaId = `${preSchemaId}-已报名`;

function sourceFunction(name) {
  const start = appSource.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `missing ${name}`);
  return appSource.slice(start, appSource.indexOf("\n}\n", start) + 3);
}

function createHarness() {
  const schemas = new Map();
  for (const id of ["模块标题-正常", "发券-样式3", "按钮-3-规则可视", "按钮-3-规则可视-点击后", "说明文-补充说明"]) {
    schemas.set(id, JSON.parse(readFileSync(new URL(`../../${id}/schema.json`, import.meta.url), "utf8")));
  }
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const atom = (id, overrides = {}) => ({
    schemaId: id,
    type: "atom",
    props: { ...Object.fromEntries(schemas.get(id).props.map((field) => [field.key, field.default])), ...overrides },
  });
  const molecule = (id) => ({
    schemaId: id,
    type: "molecule",
    props: {},
    children: [
      atom("模块标题-正常"),
      atom("发券-样式3"),
      atom(id === postSchemaId ? "按钮-3-规则可视-点击后" : "按钮-3-规则可视"),
      atom("说明文-补充说明"),
    ],
  });
  const makeNode = () => ({
    ...molecule(preSchemaId),
    sourcePageTemplateId: templateId,
    sourcePageTemplateNodeIndex: 0,
    activeGuidedStateId: "default",
    guidedStates: [
      { id: "default", node: molecule(preSchemaId), preserveProps: true, preserveBoundProps: false },
      { id: "postSignup", node: molecule(postSchemaId), preserveProps: true, preserveBoundProps: false, lockedPropKeys: ["buttonText"] },
    ],
  });
  const pageTemplate = { id: templateId, nodes: [makeNode()] };
  const fields = [
    ["0.titleText", "模块标题"],
    ["1.amountText", "券金额"],
    ["1.conditionText", "券使用条件"],
    ["1.giftConditionText", "券门槛/赠送条件"],
    ["1.specialText", "用户标签文案"],
    ["3.text", "补充说明"],
    ["2.buttonText", "报名按钮文案"],
  ].map(([compoundKey, label]) => ({
    moduleIndex: 0, compoundKey, key: compoundKey, label,
    sourceModuleSchemaId: preSchemaId, moduleSchemaId: preSchemaId,
    rowKey: `页面模板变量｜1｜${compoundKey}`,
    field: { label }, value: "",
  }));
  const context = {
    state: {
      pages: [],
      prdTableRows: [
        ...fields.map((field) => ({ key: field.rowKey, value: `基础${field.label}` })),
        ...["个人素人", "企业"].flatMap((name, index) => fields.map((field) => ({
          key: `页面模板变量版本｜1｜${name}｜${field.compoundKey}`,
          value: field.compoundKey === "2.buttonText" ? "立即报名" : `${name}${index ? "20" : "10"}`,
        }))),
      ],
      pageTemplateBlueprintStates: {},
      prdManualModuleVersions: {
        [`page-template｜${templateId}｜0`]: [
          { id: "imported_personal", name: "个人素人" },
          { id: "imported_enterprise", name: "企业" },
        ],
      },
    },
    pageTemplates: [pageTemplate],
    customPageTemplates: [],
    moleculeSchemas: [],
    LOCKED_PAGE_TEMPLATE_BLUEPRINT_SCHEMA_IDS: new Set(),
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX: "页面模板变量",
    PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX: "页面模板变量版本",
    PAGE_TEMPLATE_STATE_DETAIL_ROW_PREFIX: "页面模板状态变量",
    PAGE_TEMPLATE_STATE_DETAIL_VERSION_ROW_PREFIX: "页面模板状态变量版本",
    PAGE_TEMPLATE_DEFAULT_BUSINESS_STATES: {},
    CONSUMPTION_RETURN_DETAIL_MODE_AUDIENCE: "audience",
    DEFAULT_BLUEPRINT_AUDIENCE_NAME: "人群1",
    clone,
    materializePageTemplateNodes: () => [makeNode()],
    getPageTemplateVariableFields: () => fields,
    getPageTemplateBusinessStateConfig: () => context.BIGDAY_COUPON_BUSINESS_STATE_CONFIG,
    getPrdPageTemplateModuleSpec: () => null,
    getModuleKind: () => "",
    getGlobalComponentDisplayName: () => "核心权益｜big-day发券",
    getBaseBlueprintAudienceVersion: (version) => ({ id: "base", name: "人群1", ...version }),
    isNoIncentiveEntryModule: () => false,
    isConsumptionReturnMoleculeNode: () => false,
    getPrdPageTemplateEntryCardStateId: () => "default",
    getStructuredPrdValue: () => "",
    getActivePrdPageTemplate: () => pageTemplate,
    getPageTemplateSourceFieldForPath: (_node, path) => fields.find((field) => field.compoundKey === path),
    isConsumptionReturnDetailShared: () => false,
    findLineageVariant: (node, id) => node.guidedLineageVariants?.find((variant) => variant.id === id),
    ensureGuidedLineage: (node) => node.guidedLineageVariants || [],
    findPrdTableRowIndexByKey: (key) => context.state.prdTableRows.findIndex((row) => row.key === key),
    findComponentSchema: (id) => ({ id }),
    createStateNodeFromSchema: (schema) => molecule(schema.id),
    getNodeValueByPath: (node, path) => path.split(".").reduce((value, key, index) => index === 0 ? value.children[Number(key)] : value.props[key], node),
    normalizePrdTableRows: (rows) => rows,
    syncDynamicMoleculeChildren: () => {},
    isLotteryPrizePropKey: () => false,
    markPrdBoundProp: () => {},
    buildGuidedLineageGraphByDimensions: () => ({}),
    normalizePageTemplateLookupName: (value) => value,
    getPageBlueprintKey: (_moduleIndex, key) => key,
    remapPageTemplateIndexedStateMap: () => {},
    swapPageTemplateIndexedStateMap: () => {},
  };
  vm.createContext(context);
  const configStart = appSource.indexOf("const BIGDAY_COUPON_BUSINESS_STATE_CONFIG =");
  const configEnd = appSource.indexOf("const PAGE_TEMPLATE_BUSINESS_STATES =", configStart);
  vm.runInContext(`${appSource.slice(configStart, configEnd).replaceAll("const ", "var ")}`, context);
  const helpers = [
    "getPageTemplateBusinessStateKey", "getPageTemplateBusinessStateSchemaId",
    "getPageTemplateActiveBusinessStateId", "getPageTemplateVersionModuleKey",
    "getPageTemplateFieldLocalCompoundKey", "getPageTemplateVariableRowKey",
    "getPageTemplateVariableVersionRowKey", "parsePageTemplateVariableRowKey",
    "parsePageTemplateVariableVersionRowKey", "getPageTemplateStateDetailRowKey",
    "parsePageTemplateStateDetailRowKey", "getInitialPageTemplateVariableValue",
    "getPageTemplateVariableRowValue", "ensurePageTemplateVariableRow",
    "ensurePageTemplateVariableVersionRow", "ensurePageTemplateStateDetailRow",
    "hasIndependentPageTemplateStateVariables", "getPageTemplateIndependentStateStorageId",
    "getPageTemplateStateSchemaDefaultValue", "getPageTemplateIndependentStateVersion",
    "buildPageTemplateVariableSections", "getManualModuleBlueprintVersions",
    "hasImportedModuleBlueprintVersions", "getConsumptionReturnAudienceStateVersion",
    "getPageTemplateVariableGroups", "applyPageTemplateVariableValuesToNode",
    "applyPageTemplateVariableRowsToNodes", "applyPageTemplateVariableVersionRowsToNodes",
    "applyGuidedBusinessState", "applyLineageVariantToNode",
    "cloneNodeForLineage", "getLineageVersionNameForVariant",
    "getPageTemplateRawNodeSchemaId", "syncBigdayCouponSharedStateField",
    "setPrdTableRowValueByKey", "setNodeValueByPath",
    "setNodeAndGuidedStatesValueByPath", "setLineagePathValueOnNode",
    "setLineagePathValueOnAllVariants", "syncPageTemplateInlineEditToRows",
    "parsePageTemplateVersionModuleKey", "renameManualModuleVersionRows",
    "deleteManualModuleVersionRows", "remapPrdTemplateRowsForInsertedModule",
    "remapPrdTemplateRowsForDeletedModule", "swapPrdTemplateModuleRows",
  ];
  for (const name of ["applyBigdayCouponStateVariableValues", "applyPageTemplateStateDetailValuesToNode"]) {
    if (appSource.includes(`function ${name}(`)) helpers.push(name);
  }
  vm.runInContext(helpers.map(sourceFunction).join("\n"), context);
  return { context, pageTemplate, makeNode };
}

function values(context, version) {
  return Object.fromEntries(version.sections.flatMap((section) => section.fields).map((field) => [
    field.compoundKey, context.state.prdTableRows[field.rowIndex].value,
  ]));
}

test("PRD audiences share all signup fields except each audience's button text", () => {
  const { context, pageTemplate } = createHarness();
  const before = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(before.activeStateId, "default");
  assert.equal(values(context, before.versions[0])["2.buttonText"], "立即报名");
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  const after = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(values(context, after.versions[0])["2.buttonText"], "已报名");
  const beforeFields = before.versions[0].sections.flatMap((section) => section.fields);
  const afterFields = after.versions[0].sections.flatMap((section) => section.fields);
  for (const field of afterFields) {
    const beforeField = beforeFields.find((item) => item.compoundKey === field.compoundKey);
    if (field.compoundKey === "2.buttonText") {
      assert.notEqual(field.rowIndex, beforeField.rowIndex);
    } else {
      assert.equal(field.rowIndex, beforeField.rowIndex, field.compoundKey);
      assert.equal(values(context, after.versions[0])[field.compoundKey], values(context, before.versions[0])[field.compoundKey]);
    }
  }
  assert.notEqual(afterFields[0].rowIndex, after.versions[1].sections[0].fields[0].rowIndex);
});

test("state and audience edits survive switching and project save/restore independently", () => {
  const { context, pageTemplate } = createHarness();
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  const group = context.getPageTemplateVariableGroups(pageTemplate)[0];
  const button = group.versions[0].sections.flatMap((section) => section.fields).find((field) => field.compoundKey === "2.buttonText");
  context.state.prdTableRows[button.rowIndex].value = "报名成功";
  const snapshot = createProjectSnapshot(context.state);
  context.state.prdTableRows = [];
  applyProjectSnapshot(context.state, snapshot);
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "default";
  const before = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(values(context, before.versions[0])["2.buttonText"], "立即报名");
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  const after = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(values(context, after.versions[0])["2.buttonText"], "报名成功");
  assert.equal(values(context, after.versions[1])["2.buttonText"], "已报名");
});

test("preview and export nodes retain each audience's two state values after rebuilding", () => {
  const { context, pageTemplate, makeNode } = createHarness();
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  const group = context.getPageTemplateVariableGroups(pageTemplate)[0];
  const button = group.versions[0].sections.flatMap((section) => section.fields).find((field) => field.compoundKey === "2.buttonText");
  context.state.prdTableRows[button.rowIndex].value = "报名成功";
  const nodes = [makeNode()];
  context.applyPageTemplateVariableRowsToNodes(nodes, context.state.prdTableRows);
  context.applyPageTemplateVariableVersionRowsToNodes(nodes, context.state.prdTableRows, templateId);
  const [personal, enterprise] = nodes[0].guidedLineageVariants;
  context.applyGuidedBusinessState(nodes[0], "postSignup");
  assert.equal(nodes[0].children[2].props.buttonText, "报名成功");
  context.applyLineageVariantToNode(nodes[0], enterprise);
  assert.equal(nodes[0].children[2].props.buttonText, "已报名");
  context.applyLineageVariantToNode(nodes[0], personal);
  assert.equal(nodes[0].children[2].props.buttonText, "报名成功");
  context.applyGuidedBusinessState(personal.node, "postSignup");
  context.applyGuidedBusinessState(enterprise.node, "postSignup");
  assert.equal(personal.node.children[2].props.buttonText, "报名成功");
  assert.equal(enterprise.node.children[2].props.buttonText, "已报名");
  context.applyGuidedBusinessState(personal.node, "default");
  assert.equal(personal.node.children[2].props.buttonText, "立即报名");
});

test("registered audience rows follow audience renames and module moves", () => {
  const { context } = createHarness();
  context.state.prdTableRows = [{
    key: context.getPageTemplateStateDetailRowKey(templateId, 0, "postSignup", "2.buttonText", "个人素人"),
    value: "报名成功",
  }];
  context.renameManualModuleVersionRows(`page-template｜${templateId}｜0`, "个人素人", "新客");
  assert.equal(context.parsePageTemplateStateDetailRowKey(context.state.prdTableRows[0].key).versionName, "新客");
  context.remapPrdTemplateRowsForInsertedModule(0);
  assert.equal(context.parsePageTemplateStateDetailRowKey(context.state.prdTableRows[0].key).moduleIndex, 1);
  context.swapPrdTemplateModuleRows(1, 2);
  assert.equal(context.parsePageTemplateStateDetailRowKey(context.state.prdTableRows[0].key).moduleIndex, 2);
  context.remapPrdTemplateRowsForDeletedModule(0);
  assert.equal(context.parsePageTemplateStateDetailRowKey(context.state.prdTableRows[0].key).moduleIndex, 1);
  context.deleteManualModuleVersionRows(`page-template｜${templateId}｜1`, "新客");
  assert.equal(context.state.prdTableRows.length, 0);
});

test("registered preview edits update their state row without overwriting PRD pre-signup", () => {
  const { context, pageTemplate, makeNode } = createHarness();
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  context.getPageTemplateVariableGroups(pageTemplate);
  const nodes = [makeNode()];
  context.applyPageTemplateVariableRowsToNodes(nodes, context.state.prdTableRows);
  context.applyPageTemplateVariableVersionRowsToNodes(nodes, context.state.prdTableRows, templateId);
  context.state.pages = [{ sourcePageTemplateId: templateId, nodes }];
  context.applyGuidedBusinessState(nodes[0], "postSignup");
  context.syncPageTemplateInlineEditToRows(nodes[0], "imported_personal", "2.buttonText", "预览报名成功");
  const group = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(values(context, group.versions[0])["2.buttonText"], "预览报名成功");
  assert.equal(values(context, group.versions[1])["2.buttonText"], "已报名");
  context.applyGuidedBusinessState(nodes[0], "default");
  assert.equal(nodes[0].children[2].props.buttonText, "立即报名");
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "default";
  assert.equal(values(context, context.getPageTemplateVariableGroups(pageTemplate)[0].versions[0])["2.buttonText"], "立即报名");
});

test("registered preview edits share content with pre-signup within the selected audience", () => {
  const { context, pageTemplate, makeNode } = createHarness();
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  context.getPageTemplateVariableGroups(pageTemplate);
  const nodes = [makeNode()];
  context.applyPageTemplateVariableRowsToNodes(nodes, context.state.prdTableRows);
  context.applyPageTemplateVariableVersionRowsToNodes(nodes, context.state.prdTableRows, templateId);
  context.state.pages = [{ sourcePageTemplateId: templateId, nodes }];
  context.applyGuidedBusinessState(nodes[0], "postSignup");
  for (const [path, value] of [["0.titleText", "个人新标题"], ["1.amountText", "888"], ["3.text", "个人新说明"]]) {
    context.syncPageTemplateInlineEditToRows(nodes[0], "imported_personal", path, value);
  }
  context.applyGuidedBusinessState(nodes[0], "default");
  assert.equal(nodes[0].children[0].props.titleText, "个人新标题");
  assert.equal(nodes[0].children[1].props.amountText, "888");
  assert.equal(nodes[0].children[3].props.text, "个人新说明");
  assert.equal(nodes[0].children[2].props.buttonText, "立即报名");
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "default";
  const before = context.getPageTemplateVariableGroups(pageTemplate)[0];
  assert.equal(values(context, before.versions[0])["1.amountText"], "888");
  assert.equal(values(context, before.versions[1])["1.amountText"], "企业20");
});

test("old registered content rows cannot override shared PRD content after restore", () => {
  const { context, pageTemplate, makeNode } = createHarness();
  context.state.prdTableRows.push(
    { key: context.getPageTemplateStateDetailRowKey(templateId, 0, "postSignup", "0.titleText", "个人素人"), value: "错误独立标题" },
    { key: context.getPageTemplateStateDetailRowKey(templateId, 0, "postSignup", "1.amountText", "个人素人"), value: "999" },
    { key: context.getPageTemplateStateDetailRowKey(templateId, 0, "postSignup", "2.buttonText", "个人素人"), value: "报名成功" },
  );
  const snapshot = createProjectSnapshot(context.state);
  context.state.prdTableRows = [];
  applyProjectSnapshot(context.state, snapshot);
  const nodes = [makeNode()];
  context.applyPageTemplateVariableRowsToNodes(nodes, context.state.prdTableRows);
  context.applyPageTemplateVariableVersionRowsToNodes(nodes, context.state.prdTableRows, templateId);
  const [personal, enterprise] = nodes[0].guidedLineageVariants;
  context.applyGuidedBusinessState(personal.node, "postSignup");
  context.applyGuidedBusinessState(enterprise.node, "postSignup");
  assert.equal(personal.node.children[0].props.titleText, "个人素人10");
  assert.equal(personal.node.children[1].props.amountText, "个人素人10");
  assert.equal(personal.node.children[2].props.buttonText, "报名成功");
  assert.equal(enterprise.node.children[0].props.titleText, "企业20");
  context.state.pageTemplateBlueprintStates[`${templateId}|0`] = "postSignup";
  assert.equal(values(context, context.getPageTemplateVariableGroups(pageTemplate)[0].versions[0])["1.amountText"], "个人素人10");
});
