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
      assert.equal(name, "sync_collaboration_changes");
      assert.equal(args.p_user_id, "trusted-user");
      assert.equal(args.p_is_admin, false);
      return { error: { message: "VERSION_CONFLICT" } };
    },
  });
  await assert.rejects(repository.sync({ id: "trusted-user" }, {
    users: [], teams: [], records: [],
  }), (error) => error.code === "VERSION_CONFLICT");
});
