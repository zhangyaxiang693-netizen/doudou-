import test from "node:test";
import assert from "node:assert/strict";
import {
  copyRecord,
  createCollaborationState,
  createTeam,
  listRecordsForUser,
  upsertRecord,
  loadCollaborationState,
  saveCollaborationState,
  COLLABORATION_STORAGE_KEY,
} from "./store.js";

test("group history is visible to every user while personal history stays private", () => {
  let state = createCollaborationState(
    { id: "admin", name: "管理员" },
    { adminIds: ["admin"] },
  );
  state = {
    ...state,
    users: [
      ...state.users,
      { id: "member", name: "成员", role: "member", avatarUrl: "" },
    ],
  };
  state = createTeam(state, {
    name: "增长组",
  });
  const team = state.teams[0];

  state = upsertRecord(state, {
    id: "team-record",
    ownerId: "admin",
    name: "团队活动",
    scope: "team",
    teamId: team.id,
    snapshot: { schemaVersion: 1 },
  });
  state = upsertRecord(state, {
    id: "personal-record",
    ownerId: "member",
    name: "个人活动",
    scope: "personal",
    snapshot: { schemaVersion: 1 },
  });

  assert.deepEqual(
    listRecordsForUser(state, "member", "team").map((record) => record.id),
    ["team-record"],
  );
  assert.deepEqual(
    listRecordsForUser(state, "member", "personal").map(
      (record) => record.id,
    ),
    ["personal-record"],
  );
});

test("account cache is isolated and never imports the former shared admin cache", () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
  };
  try {
    values.set(COLLABORATION_STORAGE_KEY, JSON.stringify({
      records: [{ id: "private", ownerId: "other", scope: "personal" }],
    }));
    let first = loadCollaborationState({ id: "first" });
    assert.equal(first.records.length, 0);
    first = upsertRecord(first, { id: "first-private", ownerId: "first" });
    saveCollaborationState(first);
    const second = loadCollaborationState({ id: "second" });
    assert.equal(second.records.length, 0);
    assert.equal(loadCollaborationState({ id: "first" }).records[0].id, "first-private");
  } finally { delete globalThis.localStorage; }
});

test("browser quota failure does not interrupt loading or cloud state acceptance", () => {
  globalThis.localStorage = {
    getItem() { throw new Error("storage disabled"); },
    setItem() { throw new Error("quota exceeded"); },
  };
  try {
    const state = loadCollaborationState({ id: "owner" });
    assert.doesNotThrow(() => upsertRecord(state, { id: "record", ownerId: "owner" }));
  } finally { delete globalThis.localStorage; }
});

test("copy has an independent snapshot and restores with the copy name", () => {
  const state = upsertRecord(createCollaborationState({ id: "u" }), {
    id: "r", ownerId: "u", name: "原稿", snapshot: { editor: { activity: { name: "原稿" } } },
  });
  const next = copyRecord(state, "r", { ownerId: "u" });
  assert.equal(next.records[0].snapshot.editor.activity.name, "原稿 - 副本");
  assert.equal(state.records[0].snapshot.editor.activity.name, "原稿");
});

test("records can be copied between personal and group scopes", () => {
  let state = createCollaborationState({ id: "user-1", name: "用户一" });
  state = {
    ...state,
    users: [
      ...state.users,
      { id: "user-2", name: "用户二", role: "member", avatarUrl: "" },
    ],
  };
  state = createTeam(state, { name: "公共组" });
  state = upsertRecord(state, {
    id: "personal-record",
    ownerId: "user-1",
    name: "个人活动",
    scope: "personal",
    snapshot: { schemaVersion: 1 },
  });
  state = copyRecord(state, "personal-record", {
    ownerId: "user-1",
    scope: "team",
    teamId: state.teams[0].id,
  });
  const groupCopy = listRecordsForUser(state, "user-2", "team")[0];
  assert.equal(groupCopy.name, "个人活动 - 副本");

  state = copyRecord(state, groupCopy.id, {
    ownerId: "user-2",
    scope: "personal",
  });
  assert.equal(
    listRecordsForUser(state, "user-2", "personal")[0].name,
    "个人活动 - 副本 - 副本",
  );
});
