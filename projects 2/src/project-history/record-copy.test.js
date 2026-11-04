import assert from "node:assert/strict";
import test from "node:test";
import * as controllers from "./save-controller.js";

test("list copy coalesces clicks, retries one lost response, and preserves the source session", async () => {
  assert.equal(typeof controllers.createRecordCopier, "function", "列表复制需要独立且可重试的保存控制器");
  const sent = [];
  let reads = 0;
  let fail = true;
  const copier = controllers.createRecordCopier({
    read: async () => {
      reads++;
      return { name: "源项目", snapshot: { schemaVersion: 3, editor: { pages: [], text: "源内容" } } };
    },
    send: async (command) => {
      sent.push(structuredClone(command));
      if (fail) throw Object.assign(new Error("响应丢失"), { code: "NETWORK_ERROR" });
      return { record: { id: command.recordId, revision: 1 } };
    },
  });
  const destination = { scope: "team", teamId: "g" };
  const first = copier.copy("source", destination);
  const duplicate = copier.copy("source", destination);
  assert.strictEqual(first, duplicate);
  assert.equal((await first).cloudSaved, false);
  fail = false;
  assert.equal((await copier.copy("source", destination)).cloudSaved, true);
  assert.equal(reads, 1);
  assert.equal(sent.length, 2);
  assert.deepEqual(sent[1], sent[0]);
  assert.notEqual(sent[0].recordId, "source");
  assert.equal((await copier.copy("source", destination)).cloudSaved, true);
  assert.notEqual(sent[2].recordId, sent[0].recordId, "成功后的新复制应当新建独立记录");
});
