import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
function source(name) {
  const start = app.indexOf(`function ${name}(`);
  assert.ok(start >= 0, name);
  return app.slice(start, app.indexOf("\n}\n", start) + 3);
}

function harness(imported, shared = false) {
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const templateId = "page-lottery-consumption-return";
  const schemaId = (count) => `核心玩法模块-抽奖消返-${count}列`;
  const molecule = (id) => ({
    id: "coupon-node", schemaId: id, type: "molecule", props: {},
    sourcePageTemplateId: templateId, sourcePageTemplateNodeIndex: 0,
    activeGuidedStateId: "default",
    children: [
      { type: "atom", props: { titleText: "默认标题" } },
      { type: "atom", props: { amountText2: "110", consumeAmountText2: "30", hideProgressGraphic: true } },
      { type: "atom", props: {} },
      { type: "atom", props: { titleText: "活动说明" } },
      { type: "atom", props: { buttonText: "查看详情" } },
    ],
  });
  const rowsFor = (name, title, amount, count, button) => [
    ["0.titleText", title], ["1.amountText2", amount],
    ["__consumptionReturnTierCount", String(count)], ["4.buttonText", button],
  ].map(([key, value]) => ({
    key: `${name ? `页面模板变量版本｜1｜${name}` : "页面模板变量｜1"}｜${key}`, value,
  }));
  const state = {
    prdTableRows: [
      ...rowsFor("", imported ? "基础默认标题" : "专属A", imported ? "110" : "21", imported ? 4 : 3, imported ? "查看详情" : "去查看A"),
      ...(imported ? rowsFor("人群1", "专属A", "21", 3, "去查看A") : []),
      ...rowsFor("人群2", "专属B", "42", 4, "去查看B"),
      { key: "页面模板变量｜1｜__consumptionReturnDetailMode", value: shared ? "shared" : "audience" },
    ],
    prdManualModuleVersions: {
      [`page-template｜${templateId}｜0`]: [
        ...(imported ? [{ id: "imported_a", name: "人群1" }] : []),
        { id: imported ? "imported_b" : "manual_b", name: "人群2" },
      ],
    },
  };
  const context = vm.createContext({
    state, clone, BIGDAY_COUPON_BUSINESS_STATE_CONFIG: {},
    BIGDAY_COUPON_BUSINESS_STATE_SCHEMA_IDS: new Set(),
    BIGDAY_COUPON_SHARED_STATE_FIELD_KEYS: new Set(),
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX: "页面模板变量",
    PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX: "页面模板变量版本",
    PAGE_TEMPLATE_STATE_DETAIL_ROW_PREFIX: "页面模板状态变量",
    PAGE_TEMPLATE_STATE_DETAIL_VERSION_ROW_PREFIX: "页面模板状态变量版本",
    CONSUMPTION_RETURN_TIER_COUNT_KEY: "__consumptionReturnTierCount",
    CONSUMPTION_RETURN_DETAIL_MODE_KEY: "__consumptionReturnDetailMode",
    CONSUMPTION_RETURN_DETAIL_MODE_SHARED: "shared",
    CONSUMPTION_RETURN_DETAIL_MODE_AUDIENCE: "audience",
    DEFAULT_BLUEPRINT_AUDIENCE_NAME: "人群1",
    findComponentSchema: (id) => ({ id }),
    createStateNodeFromSchema: (schema, _overrides, config) => {
      const node = molecule(schema.id);
      Object.entries(config.childProps || {}).forEach(([index, props]) => Object.assign(node.children[index].props, props));
      return node;
    },
    createMoleculeNode: (id) => molecule(id),
    normalizePrdTableRows: (rows) => rows,
    syncDynamicMoleculeChildren: () => {},
    isLotteryPrizePropKey: () => false,
    markPrdBoundProp: (node, key) => {
      node.__prdBoundPropKeys = [...new Set([...(node.__prdBoundPropKeys || []), key])];
    },
    buildGuidedLineageGraphByDimensions: () => ({}),
  });
  const configStart = app.indexOf("const PAGE_TEMPLATE_BUSINESS_STATES =");
  const configEnd = app.indexOf("const PAGE_TEMPLATE_DEFAULT_BUSINESS_STATES =", configStart);
  vm.runInContext(app.slice(configStart, configEnd).replace("const PAGE_TEMPLATE_BUSINESS_STATES", "var PAGE_TEMPLATE_BUSINESS_STATES"), context);
  vm.runInContext([
    "parsePageTemplateVariableRowKey", "parsePageTemplateVariableVersionRowKey",
    "getPageTemplateStateDetailRowKey", "parsePageTemplateStateDetailRowKey",
    "getPageTemplateVersionModuleKey", "getManualModuleBlueprintVersions",
    "hasImportedModuleBlueprintVersions", "isConsumptionReturnMoleculeNode",
    "getConsumptionReturnMoleculeIdByTierCount", "getConsumptionReturnTierCountFromValues",
    "getConsumptionReturnDetailMode", "isConsumptionReturnAudienceSpecificKey",
    "getConsumptionReturnVariantValues", "createPageTemplateBusinessStateEntry",
    "ensureConsumptionReturnBusinessStates", "createConsumptionReturnNodeForTier",
    "applyPageTemplateVariableValuesToNode", "applyConsumptionReturnStateVariableValues",
    "applyPageTemplateVariableRowsToNodes",
    "applyPageTemplateVariableVersionRowsToNodes", "applyPageTemplateStateDetailValuesToNode",
    "cloneNodeForLineage", "applyGuidedBusinessState", "applyLineageVariantToNode",
    "setNodeValueByPath", "setNodeAndGuidedStatesValueByPath",
    "getPrdBoundPropKeys", "getLotteryPrizePropMatch", "applyPrdBoundPropsToStateNode",
  ].map(source).join("\n") + "\nconst PRD_BOUND_PROP_KEYS = '__prdBoundPropKeys';", context);
  const node = molecule(schemaId(4));
  context.ensureConsumptionReturnBusinessStates(node);
  const nodes = [node];
  context.applyPageTemplateVariableRowsToNodes(nodes, state.prdTableRows);
  context.applyPageTemplateVariableVersionRowsToNodes(nodes, state.prdTableRows, templateId);
  return { context, nodes, state };
}

for (const imported of [false, true]) {
  const entry = imported ? "PRD" : "direct";
  test(`${entry}: mixed tiers keep each audience's following detail after rebuilding and state changes`, () => {
    const { context, nodes } = harness(imported);
    const [a, b] = nodes[0].guidedLineageVariants;
    context.applyGuidedBusinessState(a.node, "default");
    context.applyGuidedBusinessState(b.node, "default");
    assert.equal(a.node.schemaId, "核心玩法模块-抽奖消返-3列");
    assert.equal(a.node.children[0].props.titleText, "专属A");
    assert.equal(a.node.children[4].props.buttonText, "去查看A");
    assert.equal(b.node.children[0].props.titleText, "专属B");
    context.applyGuidedBusinessState(a.node, "unregistered");
    assert.equal(a.node.children[4].props.buttonText, "立即报名");
    assert.equal(a.node.children[0].props.titleText, "专属A");
    context.applyGuidedBusinessState(a.node, "default");
    assert.equal(a.node.children[4].props.buttonText, "去查看A");
  });

  test(`${entry}: applying another audience keeps that audience's state nodes`, () => {
    const { context, nodes } = harness(imported);
    const [a, b] = nodes[0].guidedLineageVariants;
    assert.equal(nodes[0].schemaId, a.node.schemaId);
    context.applyLineageVariantToNode(nodes[0], b);
    context.applyGuidedBusinessState(nodes[0], "unregistered");
    context.applyGuidedBusinessState(nodes[0], "default");
    assert.equal(nodes[0].schemaId, b.node.schemaId);
    assert.equal(nodes[0].children[0].props.titleText, "专属B");
    assert.equal(nodes[0].children[4].props.buttonText, "去查看B");
    context.applyLineageVariantToNode(nodes[0], a);
    assert.equal(nodes[0].schemaId, a.node.schemaId);
    assert.equal(nodes[0].children[0].props.titleText, "专属A");
  });

  test(`${entry}: export state preparation preserves each audience's edited detail`, () => {
    const { context, nodes } = harness(imported);
    const [a, b] = nodes[0].guidedLineageVariants;
    context.setNodeAndGuidedStatesValueByPath(b.node, "0.titleText", "B预览编辑");
    context.setNodeAndGuidedStatesValueByPath(b.node, "4.buttonText", "B新按钮");
    context.ensureConsumptionReturnBusinessStates(b.node);
    context.applyGuidedBusinessState(b.node, "unregistered");
    assert.equal(b.node.children[0].props.titleText, "B预览编辑");
    assert.equal(b.node.children[4].props.buttonText, "立即报名");
    context.applyGuidedBusinessState(b.node, "default");
    assert.equal(b.node.children[0].props.titleText, "B预览编辑");
    assert.equal(b.node.children[4].props.buttonText, "B新按钮");
    assert.equal(a.node.children[0].props.titleText, "专属A");
  });

  test(`${entry}: tier and audience changes keep the selected business state`, () => {
    const { context, nodes } = harness(imported);
    const [, b] = nodes[0].guidedLineageVariants;
    context.applyGuidedBusinessState(nodes[0], "unregistered");
    context.applyLineageVariantToNode(nodes[0], b);
    assert.equal(nodes[0].activeGuidedStateId, "unregistered");
    assert.equal(b.node.activeGuidedStateId, "unregistered");
    assert.equal(nodes[0].children[0].props.titleText, "专属B");
    const threeTier = context.createConsumptionReturnNodeForTier(nodes[0], 3);
    assert.equal(threeTier.activeGuidedStateId, "unregistered");
    context.applyGuidedBusinessState(threeTier, "unregistered");
    assert.equal(threeTier.schemaId, "核心玩法模块-抽奖消返-3列");
    assert.equal(threeTier.children[0].props.titleText, "专属B");
  });

  test(`${entry}: shared details stay shared across mixed tier audiences`, () => {
    const { context, nodes } = harness(imported, true);
    const [a, b] = nodes[0].guidedLineageVariants;
    for (const variant of [a, b]) context.applyGuidedBusinessState(variant.node, "default");
    const expected = imported ? "基础默认标题" : "专属A";
    assert.equal(a.node.children[0].props.titleText, expected);
    assert.equal(b.node.children[0].props.titleText, expected);
    assert.equal(a.node.children[1].props.amountText2, "21");
    assert.equal(b.node.children[1].props.amountText2, "42");
  });
}
