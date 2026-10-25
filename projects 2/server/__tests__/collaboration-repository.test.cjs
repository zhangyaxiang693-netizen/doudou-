const assert = require("node:assert/strict");
const test = require("node:test");
const { createCollaborationRepository } = require("../collaboration-repository.cjs");

test("failed sync cannot report success or fall back to per-record writes", async () => {
  const repository = createCollaborationRepository({
    from(table) {
      assert.equal(table, "app_users");
      return { async upsert() { return {}; } };
    },
    async rpc(name, args) {
      assert.equal(name, "sync_collaboration_changes_compact");
      assert.equal(args.p_user_id, "trusted-user");
      assert.equal(args.p_is_admin, false);
      return { error: { message: "VERSION_CONFLICT" } };
    },
  });
  await assert.rejects(repository.sync({ id: "trusted-user" }, {
    users: [], teams: [], records: [],
  }), (error) => error.code === "VERSION_CONFLICT");
});

test("bootstrap does not fetch project snapshots or any project records", async () => {
  const tables = [];
  const repository = createCollaborationRepository({
    from(table) {
      tables.push(table);
      assert.notEqual(table, "collaboration_records");
      return {
        upsert: async () => ({}),
        select() { return this; },
        eq() { return this; },
        order() { return { data: [], error: null }; },
      };
    },
  });
  const state = await repository.bootstrap({ id: "user" }, true);
  assert.deepEqual(state.records, []);
  assert.deepEqual(tables.sort(), ["app_users", "app_users", "collaboration_groups"]);
});

test("detail permits any team member and rejects another user's personal record", async () => {
  let scope = "personal";
  const repository = createCollaborationRepository({
    from() {
      return {
        select() { return this; }, eq() { return this; },
        maybeSingle: async () => ({ data: {
          id: "r", owner_id: "owner", scope, snapshot_json: { editor: { pages: [] } },
        } }),
      };
    },
  });
  await assert.rejects(repository.getRecord({ id: "member" }, "r"),
    (error) => error.code === "RECORD_FORBIDDEN");
  scope = "team";
  assert.deepEqual((await repository.getRecord({ id: "member" }, "r")).snapshot, { editor: { pages: [] } });
  scope = "personal";
  assert.ok((await repository.getRecord({ id: "member" }, "r", true)).snapshot);
});
