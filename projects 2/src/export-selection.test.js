import assert from "node:assert/strict";
import { test } from "node:test";
import { getSelectedExportEntries } from "./export-selection.js";

const entries = [
  { id: "header-a", fileName: "默认.png", filePath: "头图/默认.png" },
  { id: "task-done", fileName: "默认.png", filePath: "任务/已完成/默认.png" },
  { id: "fallback", fileName: "默认.png", filePath: "兜底页/默认.png" },
];

test("selection spans modules and pages without mixing identical filenames", () => {
  const original = structuredClone(entries);
  assert.deepEqual(getSelectedExportEntries(entries, ["fallback", "header-a"]), [entries[0], entries[2]]);
  assert.deepEqual(entries, original);
});

test("repeated IDs export once in catalogue order", () => {
  assert.deepEqual(getSelectedExportEntries(entries, ["task-done", "header-a", "task-done"]), entries.slice(0, 2));
  assert.deepEqual(getSelectedExportEntries(entries, []), []);
});

test("missing cuts fail instead of silently downloading a partial selection", () => {
  assert.throws(() => getSelectedExportEntries(entries, ["header-a", "missing"]), /重新选择/);
});

test("selection requires an array of nonempty string IDs", () => {
  for (const ids of [null, "header-a", [null], [1], [""], [" "]]) {
    assert.throws(() => getSelectedExportEntries(entries, ids), /选择参数无效/);
  }
});
