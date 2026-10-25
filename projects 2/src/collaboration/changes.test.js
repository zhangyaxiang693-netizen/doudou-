import test from "node:test";
import assert from "node:assert/strict";
import { collaborationChanges, createCollaborationQueue, mergeCollaborationChanges } from "./changes.js";

test("saving one object never resends other cached records or groups", () => {
  const old = {
    users: [{ id: "u", name: "用户" }],
    teams: [{ id: "g", name: "组", updatedAt: "old" }],
    records: [{ id: "a", name: "旧", updatedAt: "base" }, { id: "b", name: "无关缓存" }],
  };
  const next = { ...old, records: [{ ...old.records[0], name: "新" }, old.records[1]] };
  assert.deepEqual(collaborationChanges(old, next), {
    users: [], teams: [], records: [{ id: "a", name: "新", updatedAt: "base", baseUpdatedAt: "base" }],
  });
});

test("an editor retains its original conflict timestamp after a list refresh", () => {
  const old = { users: [], teams: [], records: [{ id: "a", updatedAt: "remote-new" }] };
  const next = { ...old, records: [{ id: "a", updatedAt: "now", baseUpdatedAt: "opened-at" }] };
  assert.equal(collaborationChanges(old, next).records[0].baseUpdatedAt, "opened-at");
});

test("queue waits for cloud completion, reports failures, then allows retry", async () => {
  const enqueue = createCollaborationQueue();
  const events = [];
  let reject;
  const first = enqueue(() => new Promise((_, fail) => { reject = fail; events.push("started"); }));
  const failure = assert.rejects(first, /offline/);
  const second = enqueue(() => { events.push("retry"); return "saved"; });
  await Promise.resolve();
  assert.deepEqual(events, ["started"]);
  reject(new Error("offline"));
  await failure;
  assert.equal(await second, "saved");
  assert.deepEqual(events, ["started", "retry"]);
});

test("compact acknowledgements preserve unrelated pages and remove outdated snapshot/base timestamps", () => {
  const previous = {
    users: [{ id: "u", name: "用户" }], teams: [{ id: "g", name: "组" }],
    records: [
      { id: "a", updatedAt: "old", snapshot: { old: true }, baseUpdatedAt: "old" },
      { id: "b", updatedAt: "unrelated" },
    ],
  };
  const next = mergeCollaborationChanges(previous, {
    users: [], teams: [], records: [{ id: "a", updatedAt: "committed", name: "已保存" }],
  });
  assert.equal(next.records.length, 2);
  assert.equal(next.records[1], previous.records[1]);
  assert.deepEqual(next.users, previous.users);
  assert.deepEqual(next.teams, previous.teams);
  assert.deepEqual(next.records[0], { id: "a", updatedAt: "committed", name: "已保存" });
});
