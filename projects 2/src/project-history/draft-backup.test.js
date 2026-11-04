import assert from "node:assert/strict";
import test from "node:test";
import { createRequire } from "node:module";
import { createDraftBackup } from "./draft-backup.js";
const require = createRequire(import.meta.url);

test("durable backups isolate accounts and preserve newer edits when an older save finishes", {
  skip: !process.env.FAKE_INDEXEDDB_MODULE_PATH && "FAKE_INDEXEDDB_MODULE_PATH required",
}, async () => {
  const { indexedDB } = require(process.env.FAKE_INDEXEDDB_MODULE_PATH);
  const name = `history-test-${crypto.randomUUID()}`;
  const first = createDraftBackup({ indexedDB, name });
  await first.put({ userId: "a", sessionId: "one", capturedAt: 1, snapshot: { editor: { text: "保存稿" } },
    command: { operationId: "op", recordId: "record", snapshot: { editor: { text: "保存稿" } } } });
  await first.put({ userId: "b", sessionId: "one", capturedAt: 1, snapshot: { editor: { text: "B" } } });
  await first.put({ userId: "a", sessionId: "one", capturedAt: 2, snapshot: { editor: { text: "保存期间的新改动" } } });
  const reopened = createDraftBackup({ indexedDB, name });
  assert.equal((await reopened.list("a"))[0].snapshot.editor.text, "保存期间的新改动");
  assert.equal((await reopened.list("a"))[0].command.operationId, "op");
  await first.acknowledge("a", "one", "op");
  const saved = (await reopened.list("a"))[0];
  assert.equal(saved.snapshot.editor.text, "保存期间的新改动");
  assert.equal(saved.command, null);
  assert.equal(saved.recordId, "record");
  assert.equal((await reopened.list("b"))[0].snapshot.editor.text, "B");
  await reopened.remove("a", "one");
  assert.equal((await first.list("a")).length, 0);
  assert.equal((await first.list("b")).length, 1);
});

test("local backup unavailability is an explicit recoverable storage error", async () => {
  const backup = createDraftBackup({ indexedDB: null });
  await assert.rejects(backup.put({ userId: "a", sessionId: "s" }), /备份|浏览器/);
});
