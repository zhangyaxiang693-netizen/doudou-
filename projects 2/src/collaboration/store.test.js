import test from "node:test";
import assert from "node:assert/strict";
import {
  copyRecord,
  createCollaborationState,
  createTeam,
  listRecordsForUser,
  upsertRecord,
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
