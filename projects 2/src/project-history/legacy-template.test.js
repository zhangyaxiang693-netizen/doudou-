import assert from "node:assert/strict";
import test from "node:test";
import { migrateProjectSnapshot } from "./snapshot.js";

// Minimal, anonymized structure of the legacy 8-module page / 10-module
// definition mismatch. Real business data stays outside the repository.
function legacySnapshot() {
  const schemas = ["hero", "account", "consumption", "lottery-pending", "tasks", "content", "education", "bottom"];
  const template = {
    id: "legacy-page", name: "Legacy page",
    nodes: ["hero", "account", "added-coupon", "consumption", "lottery-pending", "tasks", "content", "education", "added-guide", "bottom"]
      .map((schemaId) => [schemaId, { savedOverride: schemaId }]),
  };
  const nodes = schemas.map((schemaId, index) => ({
    id: `node-${index}`, schemaId, props: {},
    sourcePageTemplateId: template.id, sourcePageTemplateNodeIndex: index,
  }));
  nodes[2].guidedStates = [{ id: "default", node: { id: "s1", schemaId: "consumption", props: {} } }];
  nodes[2].activeGuidedStateId = "default";
  nodes[3].schemaId = "lottery-registered";
  nodes[3].activeGuidedStateId = "registered";
  nodes[3].guidedStates = [
    { id: "default", node: { id: "s2", schemaId: "lottery-pending", props: {} } },
    { id: "registered", node: { id: "s3", schemaId: "lottery-registered", props: {} } },
  ];
  nodes[4].children = [{
    id: "task", schemaId: "task", props: {},
    activeGuidedStateId: "done",
    guidedStates: [{ id: "done", node: { id: "t1", schemaId: "task", props: {} } }],
  }];
  return {
    schemaVersion: 2,
    editor: {
      activePageId: "fallback",
      pages: [
        { id: "main", sourcePageTemplateId: template.id,
          nodes: [...nodes, { id: "popup", schemaId: "runtime-popup", props: {} }] },
        { id: "fallback", isSystemFallback: true, sourcePageTemplateId: template.id, nodes: [nodes[0]] },
      ],
      prdManualModuleVersions: {
        [`page-template｜${template.id}｜2`]: Array.from({ length: 26 }, (_, i) => ({
          id: `audience-${i}`, name: `Audience ${i + 1}`,
        })),
      },
      prdTableRows: [{
        key: "页面模板变量版本｜3｜Audience 1｜2|1.amountText2", value: "20",
      }],
      pageTemplateBlueprintStates: {},
      pageTemplateChildStates: {},
    },
    templates: { activePageTemplate: template, referencedPageTemplates: [template], referencedMoleculeTemplates: [] },
    resume: { stage: "preview" },
  };
}

test("legacy restore aligns the saved definition to source module indexes, excluding runtime and fallback nodes", () => {
  const snapshot = legacySnapshot();
  const before = structuredClone(snapshot);
  const restored = migrateProjectSnapshot(snapshot);
  assert.deepEqual(restored.templates.activePageTemplate.nodes.map((entry) => entry[0]),
    ["hero", "account", "consumption", "lottery-pending", "tasks", "content", "education", "bottom"]);
  assert.equal(restored.templates.activePageTemplate.nodes[2][1].savedOverride, "consumption");
  assert.deepEqual(restored.templates.referencedPageTemplates[0], restored.templates.activePageTemplate);
  assert.deepEqual(restored.editor.prdManualModuleVersions, before.editor.prdManualModuleVersions);
  assert.deepEqual(restored.editor.prdTableRows, before.editor.prdTableRows);
  assert.deepEqual(restored.editor.pages, before.editor.pages);
  assert.deepEqual(snapshot, before);
  assert.deepEqual(migrateProjectSnapshot(restored), restored);
});

test("repair retains the displayed business and task states when old state registries are absent", () => {
  const restored = migrateProjectSnapshot(legacySnapshot());
  assert.equal(restored.editor.pageTemplateBlueprintStates["legacy-page|2"], "default");
  assert.equal(restored.editor.pageTemplateBlueprintStates["legacy-page|3"], "registered");
  assert.equal(restored.editor.pageTemplateChildStates["legacy-page|4|0"], "done");
});

test("schema 3 keeps table additions or deletions that have not yet regenerated the preview", () => {
  for (const added of [true, false]) {
    const snapshot = legacySnapshot();
    snapshot.schemaVersion = 3;
    if (!added) snapshot.templates.activePageTemplate.nodes.splice(3, 1);
    const before = structuredClone(snapshot.templates);
    assert.deepEqual(migrateProjectSnapshot(snapshot).templates, before);
  }
});

test("legacy records without a complete source index sequence or a complete schema match are left intact", () => {
  for (const incompleteIndex of [true, false]) {
    const snapshot = legacySnapshot();
    if (incompleteIndex) delete snapshot.editor.pages[0].nodes[1].sourcePageTemplateNodeIndex;
    else snapshot.editor.pages[0].nodes[1].schemaId = "unmatched-schema";
    const before = structuredClone(snapshot.templates);
    assert.deepEqual(migrateProjectSnapshot(snapshot).templates, before);
  }
});
