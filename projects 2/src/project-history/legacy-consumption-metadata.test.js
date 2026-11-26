import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const source = (name, next) => app.slice(app.indexOf(`function ${name}(`), app.indexOf(`function ${next}(`));

test("legacy explicit three-tier settings override retained fourth-tier values in the table", () => {
  const state = { prdTableRows: [
    { key: "页面模板变量版本｜3｜Legacy audience｜2|__consumptionReturnTierCount", value: "3" },
    { key: "amount4", value: "110" },
    { key: "threshold4", value: "180" },
  ] };
  const context = vm.createContext({
    state, CONSUMPTION_RETURN_TIER_COUNT_KEY: "__consumptionReturnTierCount",
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX: "页面模板变量",
    PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX: "页面模板变量版本",
    escapeAttr: String, escapeHtml: String, isSelectPropField: () => false,
    renderSelectFieldControl: () => "",
  });
  vm.runInContext(
    source("getConsumptionReturnTierCountRowKey", "getConsumptionReturnDetailMode") +
    source("parsePageTemplateVariableRowKey", "applyPageTemplateVariableValuesToNode") +
    source("parsePageTemplateVariableVersionRowKey", "getPageTemplateVariableLabel") +
    source("renderConsumptionReturnBlueprintMatrix", "refreshConsumptionReturnTierControlForInput"), context,
  );
  const version = { id: "legacy", name: "Legacy audience", isManual: true,
    sections: [{ fields: [
      { key: "rewardType4", rowIndex: 1 },
      { key: "amountText4", rowIndex: 1 },
      { key: "consumeAmountText4", rowIndex: 2 },
    ] }],
  };
  const render = () => context.renderConsumptionReturnBlueprintMatrix(
    0, [version], false, "page-template｜legacy｜2", { templateId: "legacy", moduleIndex: 2 });
  assert.match(render(), /<option value="3" selected>/);
  assert.doesNotMatch(render(), /<option value="4" selected>/);
  assert.equal(state.prdTableRows.length, 3);
  // A later user change in the current key format takes precedence.
  state.prdTableRows.push({ key: "页面模板变量版本｜3｜Legacy audience｜__consumptionReturnTierCount", value: "4" });
  assert.match(render(), /<option value="4" selected>/);
});

test("mixed two/three/four-tier audiences keep the highest tier count for the page template", () => {
  const context = vm.createContext({
    CONSUMPTION_RETURN_TIER_COUNT_KEY: "__consumptionReturnTierCount",
    normalizePageTemplateLookupName: (value) =>
      String(value || "").replace(/\s+/g, "").toLowerCase(),
  });
  vm.runInContext(
    source(
      "getConsumptionReturnTierCountFromRows",
      "applyConsumptionReturnMoleculeByTierCount",
    ),
    context,
  );
  assert.equal(
    context.getConsumptionReturnTierCountFromRows([
      { key: "页面模板变量｜3｜__consumptionReturnTierCount", value: "2" },
      { key: "页面模板变量版本｜3｜人群2｜__consumptionReturnTierCount", value: "4" },
      { key: "页面模板变量版本｜3｜人群3｜__consumptionReturnTierCount", value: "3" },
    ]),
    4,
  );
  assert.equal(
    context.getConsumptionReturnTierCountFromRows([
      { module: "核心玩法｜抽奖消耗返", field: "第1档 · 消耗门槛", value: "68" },
      { module: "核心玩法｜抽奖消耗返", field: "第3档 · 消耗门槛", value: "400" },
    ]),
    3,
  );
});

test("shared detail synchronization recognizes the legacy embedded module index", () => {
  const context = vm.createContext({
    state: { prdTableRows: [{ key: "页面模板变量｜3｜2|__consumptionReturnDetailMode", value: "shared" }] },
    CONSUMPTION_RETURN_DETAIL_MODE_KEY: "__consumptionReturnDetailMode",
    CONSUMPTION_RETURN_DETAIL_MODE_SHARED: "shared",
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX: "页面模板变量",
    PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX: "页面模板变量版本",
    isConsumptionReturnAudienceSpecificKey: (path) => path.startsWith("1."),
  });
  vm.runInContext(
    source("getConsumptionReturnTierCountRowKey", "getConsumptionReturnDetailMode") +
    source("parsePageTemplateVariableRowKey", "applyPageTemplateVariableValuesToNode") +
    source("parsePageTemplateVariableVersionRowKey", "getPageTemplateVariableLabel") +
    source("isConsumptionReturnDetailShared", "syncSharedConsumptionReturnLineageControls"), context,
  );
  assert.equal(context.isConsumptionReturnDetailShared({ sourcePageTemplateNodeIndex: 2 }, "0.titleText"), true);
});
