import assert from "node:assert/strict";
import test from "node:test";
import { projectContentKey, syncResourceDraftField } from "./editor-content.js";

test("saved content comparisons ignore save times and resume location but include every business source", () => {
  const a = { savedAt: "one", editor: { text: "内容" }, source: { prdUrl: "url" }, activitySources: { name: "a" }, templates: {}, resume: { stage: "preview" } };
  const b = { ...a, savedAt: "two", resume: { stage: "blueprint" } };
  assert.equal(projectContentKey(a), projectContentKey(b));
  assert.notEqual(projectContentKey(a), projectContentKey({ ...b, activitySources: { name: "b" } }));
});

test("resource preview edits update only the corresponding audience including empty strings and switches", () => {
  const drafts = { daily: { modules: { banner: { versions: [
    { id: "base", values: { title: "人群1", enabled: true } },
    { id: "second", values: { title: "人群2", enabled: true } },
  ] } } } };
  assert.equal(syncResourceDraftField(drafts, "daily", "banner", "second", "title", ""), true);
  assert.equal(syncResourceDraftField(drafts, "daily", "banner", "second", "enabled", false), true);
  assert.equal(drafts.daily.modules.banner.versions[1].values.title, "");
  assert.equal(drafts.daily.modules.banner.versions[1].values.enabled, false);
  assert.equal(drafts.daily.modules.banner.versions[0].values.title, "人群1");
  assert.equal(syncResourceDraftField(drafts, "daily", "banner", "removed", "title", "错值"), false);
});
