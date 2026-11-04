import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { applyProjectSnapshot } from "./snapshot.js";
import { createTemplateOverlay } from "./template-overlay.js";

const app = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const functionSource = (name, nextName) => app.slice(
  app.indexOf(`function ${name}(`),
  app.indexOf(`function ${nextName}(`),
);

function restoredProject({ savedInBuiltIns = true, keepLocalCopy = false } = {}) {
  const name = "模板3 抽奖 + 消耗返";
  const savedTemplate = { id: "saved-consumption-template", name, nodes: [] };
  const newerTemplate = { id: "local-newer-template", name, nodes: [] };
  const catalogues = {
    pages: savedInBuiltIns ? [{ ...savedTemplate }] : [],
    custom: savedInBuiltIns ? [newerTemplate] : [
      ...(keepLocalCopy ? [{ ...savedTemplate }] : []),
      newerTemplate,
    ],
    molecules: [],
  };
  const versions = Array.from({ length: 26 }, (_, index) => ({
    id: `imported_audience_${index + 1}`,
    name: `回归人群${index + 1}`,
  }));
  const snapshot = {
    schemaVersion: 2,
    editor: {
      selectedDemoPackageId: "prd-table",
      activity: { name: "旧存档恢复回归" },
      pages: [{
        id: "saved-page",
        sourcePageTemplateId: savedTemplate.id,
        nodes: [{
          id: "consumption-node",
          schemaId: "核心玩法模块-抽奖消返-4列",
          sourcePageTemplateId: savedTemplate.id,
          sourcePageTemplateNodeIndex: 3,
          guidedLineageVariants: versions.map((version) => ({
            id: version.id,
            title: version.name,
          })),
        }],
      }],
      activePageId: "saved-page",
      prdManualModuleVersions: {
        [`page-template｜${savedTemplate.id}｜3`]: versions,
      },
      prdTableRows: [{
        key: `页面模板变量版本｜4｜${versions[0].name}｜1.reward1AmountText`,
        value: "20",
      }],
    },
    templates: {
      activePageTemplate: savedTemplate,
      referencedPageTemplates: [savedTemplate],
    },
    resume: { stage: "preview" },
  };
  const state = {};
  const migrated = applyProjectSnapshot(state, snapshot);
  createTemplateOverlay(catalogues).apply(migrated);
  const context = vm.createContext({
    state,
    pageTemplates: catalogues.pages,
    customPageTemplates: catalogues.custom,
    templateSchemas: [],
    PRD_PAGE_TEMPLATE_ALIASES: { [name]: [name] },
    normalizePageTemplateLookupName: (value) => String(value || "").replace(/\s+/g, "").toLowerCase(),
    activePage: () => state.pages.find((page) => page.id === state.activePageId),
  });
  vm.runInContext(
    functionSource("findLatestCustomPageTemplateByName", "addPageFromCustomTemplate") +
      functionSource("getManualModuleBlueprintVersions", "hasImportedModuleBlueprintVersions"),
    context,
  );
  return { context, state, savedTemplate, newerTemplate, name, versions };
}

test("a restored project uses its saved template even when a newer local template has the same name", () => {
  const fixture = restoredProject();
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.id, fixture.savedTemplate.id);
  const tableVersions = fixture.context.getManualModuleBlueprintVersions(
    `page-template｜${selected.id}｜3`,
  );
  assert.equal(tableVersions.length, 26);
  assert.deepEqual(Array.from(tableVersions, (version) => version.name),
    fixture.versions.map((version) => version.name));
  assert.equal(fixture.state.prdTableRows[0].value, "20");
});

test("restoring an existing custom template keeps its audience registry despite local catalogue order", () => {
  const fixture = restoredProject({ savedInBuiltIns: false, keepLocalCopy: true });
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.id, fixture.savedTemplate.id);
});

test("a new project still selects the latest template by name", () => {
  const fixture = restoredProject();
  fixture.state.pages = [];
  fixture.state.activePageId = "";
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.id, fixture.newerTemplate.id);
});

test("changing the requested page type does not reuse an unrelated saved template", () => {
  const fixture = restoredProject();
  const other = { id: "other-template", name: "模板1 只发券", nodes: [] };
  fixture.context.customPageTemplates.push(other);
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(other.name);
  assert.equal(selected.id, other.id);
});

test("an active companion page does not hide the main page's saved template", () => {
  const fixture = restoredProject();
  fixture.state.pages.push({ id: "companion-page", nodes: [] });
  fixture.state.activePageId = "companion-page";
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.id, fixture.savedTemplate.id);
});

test("a missing source template leaves normal catalogue selection available", () => {
  const fixture = restoredProject();
  fixture.state.pages[0].sourcePageTemplateId = "unavailable-template";
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.id, fixture.newerTemplate.id);
});

test("saved template selection supports the page type's registered aliases", () => {
  const fixture = restoredProject();
  fixture.context.PRD_PAGE_TEMPLATE_ALIASES[fixture.name].push("消耗返旧模板别名");
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType("消耗返旧模板别名");
  assert.equal(selected.id, fixture.savedTemplate.id);
});

test("the restored definition wins when a stale custom catalogue entry reuses a built-in ID", () => {
  const fixture = restoredProject();
  fixture.context.pageTemplates[0].description = "saved definition";
  fixture.context.customPageTemplates.unshift({
    ...fixture.savedTemplate, description: "stale local definition",
  });
  const selected = fixture.context.findLatestCustomPageTemplateByPrdType(fixture.name);
  assert.equal(selected.description, "saved definition");
  assert.equal(selected.isCustom, false);
});
