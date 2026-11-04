import assert from "node:assert/strict";
import test from "node:test";
import { createTemplateOverlay } from "./template-overlay.js";

test("same-ID saved templates override live definitions only for the opened project", () => {
  const pages = [{ id: "page", name: "升级模板", nodes: [] }];
  const custom = [];
  const molecules = [{ id: "m", children: [["新版"]] }];
  const overlay = createTemplateOverlay({ pages, custom, molecules });
  overlay.apply({ templates: {
    activePageTemplate: { id: "page", name: "存档模板", nodes: [] },
    referencedPageTemplates: [{ id: "old", name: "已删除模板", nodes: [] }],
    referencedMoleculeTemplates: [{ id: "m", children: [["旧版"]] }],
  } });
  assert.equal(pages[0].name, "存档模板");
  assert.equal(custom[0].id, "old");
  assert.equal(molecules[0].children[0][0], "旧版");
  assert.equal(overlay.persistable(pages, "pages")[0].name, "升级模板");
  assert.deepEqual(overlay.persistable(custom, "custom"), []);
  custom.push({ id: "user-created", nodes: [] });
  overlay.reset();
  assert.equal(pages[0].name, "升级模板");
  assert.equal(molecules[0].children[0][0], "新版");
  assert.deepEqual(custom.map((item) => item.id), ["user-created"]);
});
