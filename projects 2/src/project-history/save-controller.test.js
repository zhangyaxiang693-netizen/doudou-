import assert from "node:assert/strict";
import test from "node:test";
import { createSaveController } from "./save-controller.js";

const snapshot = (text) => ({ savedAt: new Date().toISOString(), editor: { pages: [], text } });
const deferred = () => {
  let resolve;
  const promise = new Promise((r) => { resolve = r; });
  return { resolve, promise };
};
const acknowledge = (command, revision = 1) => ({
  record: { id: command.recordId, name: command.name, revision, scope: command.scope, teamId: command.teamId },
});

test("save captures click-time values and a late response never changes a newly opened session", async () => {
  const gate = deferred();
  const sent = [];
  const applied = [];
  const controller = createSaveController({
    send: async (command) => { sent.push(structuredClone(command)); await gate.promise; return acknowledge(command); },
    onSaved: (result, context) => applied.push(context),
  });
  controller.start({ userId: "a", recordId: "record-a", scope: "personal" });
  const source = snapshot("A点击时");
  const saving = controller.save({ snapshot: source, name: "A" });
  source.editor.text = "之后更改";
  controller.start({ userId: "a", recordId: "record-b", scope: "personal" });
  gate.resolve();
  assert.equal((await saving).cloudSaved, true);
  assert.equal(sent[0].snapshot.editor.text, "A点击时");
  assert.equal(sent[0].recordId, "record-a");
  assert.equal(controller.current().recordId, "record-b");
  assert.equal(applied[0].isCurrent, false);
});

test("duplicate clicks share one operation and subsequent saves overwrite the created record", async () => {
  const gate = deferred();
  const sent = [];
  const controller = createSaveController({
    send: async (command) => { sent.push(structuredClone(command)); await gate.promise; return acknowledge(command, sent.length); },
  });
  controller.start({ userId: "a", scope: "personal" });
  const source = snapshot("首次");
  const one = controller.save({ snapshot: source, name: "A" });
  const duplicate = controller.save({ snapshot: source, name: "A" });
  gate.resolve();
  assert.equal((await one).cloudSaved, true);
  assert.equal((await duplicate).cloudSaved, true);
  await controller.save({ snapshot: snapshot("再次修改"), name: "A" });
  assert.equal(sent.length, 2);
  assert.equal(sent[0].create, true);
  assert.equal(sent[1].create, false);
  assert.equal(sent[1].recordId, sent[0].recordId);
  assert.notEqual(sent[1].operationId, sent[0].operationId);
});

test("unknown save outcome retries the identical command before saving changed content", async () => {
  const sent = [];
  let unavailable = true;
  const controller = createSaveController({
    send: async (command) => {
      sent.push(structuredClone(command));
      if (unavailable) throw Object.assign(new Error("断网"), { code: "NETWORK_ERROR" });
      return acknowledge(command);
    },
  });
  controller.start({ userId: "a", scope: "personal" });
  assert.equal((await controller.save({ snapshot: snapshot("第一稿"), name: "A" })).cloudSaved, false);
  unavailable = false;
  assert.equal((await controller.save({ snapshot: snapshot("新稿"), name: "A" })).cloudSaved, true);
  assert.deepEqual(sent[1], sent[0]);
  assert.equal(sent[2].snapshot.editor.text, "新稿");
  assert.equal(sent[2].create, false);
});

test("backup quota failure cannot turn a committed cloud save into a failure", async () => {
  const controller = createSaveController({
    send: async (command) => acknowledge(command),
    backup: { put: async () => { throw new Error("quota"); }, acknowledge: async () => { throw new Error("quota"); } },
  });
  controller.start({ userId: "a", recordId: "a", scope: "personal" });
  assert.equal((await controller.save({ snapshot: snapshot("全部内容"), name: "A" })).cloudSaved, true);
});

test("a definitive rejected create retains editable backup without an uncommitted record or retry command", async () => {
  const backups = [];
  const controller = createSaveController({
    backup: { put: async (draft) => backups.push(structuredClone(draft)) },
    send: async () => { throw Object.assign(new Error("容量超限"), { status: 413, code: "SNAPSHOT_TOO_LARGE" }); },
  });
  controller.start({ userId: "a" });
  assert.equal((await controller.save({ name: "A", snapshot: snapshot("完整编辑") })).cloudSaved, false);
  const retained = backups.at(-1);
  assert.equal(retained.command, null);
  assert.equal(retained.recordId, null, "rejected create did not create a cloud record");
  assert.equal(retained.snapshot.editor.text, "完整编辑");
  const sent = [];
  const reopened = createSaveController({
    send: async (command) => { sent.push(command); return acknowledge(command); },
  });
  reopened.resumeDraft(retained);
  assert.equal((await reopened.save({ name: "A", snapshot: snapshot("减少素材后的编辑") })).cloudSaved, true);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].create, true);
  assert.equal(sent[0].snapshot.editor.text, "减少素材后的编辑");
});

test("copy creates an independent record and later updates the copy", async () => {
  const sent = [];
  const controller = createSaveController({
    send: async (command) => { sent.push(structuredClone(command)); return acknowledge(command); },
  });
  controller.start({ userId: "a", recordId: "source", scope: "personal" });
  await controller.save({ snapshot: snapshot("内容"), name: "副本", copy: true, scope: "team", teamId: "g" });
  await controller.save({ snapshot: snapshot("副本更改"), name: "副本" });
  assert.equal(sent[0].create, true);
  assert.notEqual(sent[0].recordId, "source");
  assert.equal(sent[1].recordId, sent[0].recordId);
  assert.equal(sent[1].scope, "team");
});

test("retrying a copy after a lost response reuses its record and operation", async () => {
  const sent = [];
  const controller = createSaveController({
    send: async (command) => {
      sent.push(structuredClone(command));
      if (sent.length === 1) throw Object.assign(new Error("响应丢失"), { code: "NETWORK_ERROR" });
      return acknowledge(command);
    },
  });
  controller.start({ userId: "a", recordId: "source" });
  const input = { snapshot: snapshot("副本"), name: "副本", copy: true, scope: "team", teamId: "g" };
  assert.equal((await controller.save(input)).cloudSaved, false);
  assert.equal((await controller.save(input)).cloudSaved, true);
  assert.equal(sent.length, 2);
  assert.deepEqual(sent[1], sent[0]);
});

test("only the latest load in the same editor session remains valid", () => {
  const controller = createSaveController({});
  controller.start({ userId: "a" });
  const first = controller.beginLoad();
  const second = controller.beginLoad();
  assert.equal(controller.isCurrentLoad(first), false);
  assert.equal(controller.isCurrentLoad(second), true);
  controller.start({ userId: "a" });
  assert.equal(controller.isCurrentLoad(second), false);
});
