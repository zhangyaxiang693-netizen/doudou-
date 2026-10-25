const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createHistoryRepository } = require("../history-repository.cjs");
const { createCollaborationRepository } = require("../collaboration-repository.cjs");

// Optional isolated PostgreSQL runtime; never connects to a Supabase environment.
test("history transactions on isolated PostgreSQL", {
  skip: !process.env.PGLITE_MODULE_PATH && "Set PGLITE_MODULE_PATH to run SQL integration checks",
}, async (t) => {
  const { PGlite } = require(process.env.PGLITE_MODULE_PATH);
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec("create role anon; create role authenticated; create role service_role;");
  for (const file of [
    "202609160001_create_project_history.sql",
    "202610090001_create_collaboration.sql",
    "202610250001_history_consistency.sql",
  ]) {
    const sql = await fs.readFile(path.join(__dirname, "../../supabase/migrations", file), "utf8");
    // PGlite has core gen_random_uuid(), but does not bundle pgcrypto.
    await db.exec(sql.replace("create extension if not exists pgcrypto;", ""));
  }
  const snapshot = (name) => ({
    schemaVersion: 2, savedAt: "2026-10-25T08:00:00Z",
    editor: { activity: { name }, pages: [] },
  });
  const input = (name) => ({ name, snapshot: snapshot(name) });
  const write = async (owner, id, value) => (await db.query(
    "select public.write_history_project($1, $2, $3::jsonb) as result",
    [owner, id, JSON.stringify(value)],
  )).rows[0].result;
  const sync = async (user, records = [], teams = [], admin = false) => db.query(
    "select public.sync_collaboration_changes($1, $2::jsonb, $3)",
    [user, JSON.stringify({ users: [], teams, records }), admin],
  );
  const record = async (id) => {
    const row = (await db.query("select * from collaboration_records where id=$1", [id])).rows[0];
    return row && {
      id: row.id, projectId: row.project_id, ownerId: row.owner_id, scope: row.scope,
      teamId: row.group_id, name: row.name, snapshot: row.snapshot_json,
      updatedAt: row.updated_at.toISOString(),
    };
  };
  await sync("owner", [], [{ id: "g1", name: "公共组" }]);
  let saved;
  await t.test("create team project commits destination and snapshot together", async () => {
    saved = await write("owner", null, { ...input("活动"), scope: "team", teamId: "g1" });
    assert.equal((await record(saved.project.id)).scope, "team");
    assert.equal((await record(saved.project.id)).teamId, "g1");
    const before = (await db.query("select count(*) from projects")).rows[0].count;
    await assert.rejects(write("owner", null, { ...input("失败"), scope: "team", teamId: "missing" }), /INVALID_GROUP/);
    assert.equal((await db.query("select count(*) from projects")).rows[0].count, before);
  });
  await t.test("team member overwrite updates owner's snapshot without creating another version", async () => {
    const old = await record(saved.project.id);
    await sync("member", [{ ...old, ...input("成员修改"), baseUpdatedAt: old.updatedAt }]);
    const rows = (await db.query("select * from project_versions where project_id=$1", [saved.project.id])).rows;
    assert.equal(rows.length, 1);
    assert.equal(rows[0].id, saved.version.id);
    assert.equal(rows[0].snapshot_json.editor.activity.name, "成员修改");
    assert.equal((await record(saved.project.id)).ownerId, "owner");
    await assert.rejects(write("owner", saved.project.id, {
      ...input("过期覆盖"), baseUpdatedAt: saved.project.updated_at,
    }), /VERSION_CONFLICT/);
  });
  await t.test("stale clients cannot overwrite another member's changes", async () => {
    const old = await record(saved.project.id);
    await sync("member", [{ ...old, ...input("最新修改"), baseUpdatedAt: old.updatedAt }]);
    await assert.rejects(sync("owner", [{ ...old, ...input("过期修改"), baseUpdatedAt: old.updatedAt }]), /VERSION_CONFLICT/);
    await assert.rejects(sync("owner", [{ ...old, ...input("旧客户端全量缓存") }]), /VERSION_CONFLICT/);
    assert.equal((await record(saved.project.id)).name, "最新修改");
  });
  await t.test("a failure after writing the version rolls back both snapshot stores", async () => {
    const old = await record(saved.project.id);
    await db.exec(`create function reject_test_project_update() returns trigger language plpgsql as $$
      begin if new.name = 'FAIL_AFTER_VERSION' then raise exception 'injected failure'; end if; return new; end $$;
      create trigger reject_test_update before update on projects
      for each row execute function reject_test_project_update();`);
    await assert.rejects(sync("member", [{
      ...old, ...input("FAIL_AFTER_VERSION"), baseUpdatedAt: old.updatedAt,
    }]), /injected failure/);
    assert.equal((await record(saved.project.id)).name, old.name);
    const version = (await db.query("select snapshot_json from project_versions where id=$1", [saved.version.id])).rows[0];
    assert.equal(version.snapshot_json.editor.activity.name, old.name);
    const current = (await db.query("select updated_at from projects where id=$1", [saved.project.id])).rows[0];
    await assert.rejects(write("owner", saved.project.id, {
      ...input("FAIL_AFTER_VERSION"), baseUpdatedAt: current.updated_at.toISOString(),
    }), /injected failure/);
    assert.equal((await record(saved.project.id)).name, old.name);
  });
  await t.test("deletion removes collaboration copy and rejects stale reupload", async () => {
    const old = await record(saved.project.id);
    await db.query("update projects set deleted_at=now() where id=$1", [saved.project.id]);
    assert.equal(await record(saved.project.id), undefined);
    await assert.rejects(sync("owner", [old]), /RECORD_NOT_FOUND/);
    await assert.rejects(write("owner", saved.project.id, input("复活")), /PROJECT_NOT_FOUND/);
  });
  await t.test("personal ownership, atomic batches and independent copies", async () => {
    const own = await write("owner", null, input("个人"));
    const old = await record(own.project.id);
    await assert.rejects(sync("member", [{ ...old, ...input("越权"), baseUpdatedAt: old.updatedAt }]), /RECORD_FORBIDDEN/);
    await assert.rejects(write("member", own.project.id, { ...input("越权"), baseUpdatedAt: old.updatedAt }), /PROJECT_FORBIDDEN/);
    await assert.rejects(sync("member", [
      { id: "copy-rolled-back", scope: "personal", ...input("副本") },
      { ...old, ...input("越权"), baseUpdatedAt: old.updatedAt },
    ]), /RECORD_FORBIDDEN/);
    assert.equal(await record("copy-rolled-back"), undefined);
    await sync("member", [{ id: "independent-copy", scope: "personal", ...input("副本") }]);
    assert.equal((await record("independent-copy")).ownerId, "member");
    assert.equal((await record("independent-copy")).projectId, null);
  });
  await t.test("repository maps transactional results and preserves overwrite version id", async () => {
    const repository = createHistoryRepository({
      async rpc(name, args) {
        assert.equal(name, "write_history_project");
        try {
          return { data: await write(args.p_owner_id, args.p_project_id, args.p_input) };
        } catch (error) { return { error }; }
      },
    });
    const original = await repository.createProject("owner", input("原稿"));
    const changed = await repository.overwriteProject("owner", original.project.id, {
      ...input("覆盖"), baseUpdatedAt: original.project.updatedAt,
    });
    assert.equal(changed.version.id, original.version.id);
    assert.equal(changed.project.name, "覆盖");
    await assert.rejects(repository.overwriteProject("owner", original.project.id, {
      ...input("冲突"), baseUpdatedAt: original.project.updatedAt,
    }), (error) => error.code === "VERSION_CONFLICT");
  });
  await t.test("database RPCs are unavailable to public browser roles", async () => {
    const result = await db.query(`select
      has_function_privilege('anon', 'write_history_project(text,uuid,jsonb)', 'execute') as anon,
      has_function_privilege('authenticated', 'sync_collaboration_changes(text,jsonb,boolean)', 'execute') as auth`);
    assert.deepEqual(result.rows[0], { anon: false, auth: false });
  });
  await t.test("sync returns committed timestamps without a separate bootstrap read", async () => {
    const repository = createCollaborationRepository({
      from(table) {
        assert.equal(table, "app_users");
        return { async upsert() { return {}; } };
      },
      async rpc(name, args) {
        const result = await sync(args.p_user_id, args.p_state.records, args.p_state.teams, args.p_is_admin);
        return { data: result.rows[0].sync_collaboration_changes };
      },
    });
    const result = await repository.sync({ id: "member" }, {
      users: [], teams: [], records: [{ id: "response-copy", scope: "personal", ...input("响应快照") }],
    });
    const saved = result.records.find((item) => item.id === "response-copy");
    assert.equal(saved.name, "响应快照");
    assert.equal(Date.parse(saved.updatedAt), Date.parse((await record("response-copy")).updatedAt));
    assert.ok(result.records.every((item) => item.scope === "team" || item.ownerId === "member"));
  });
});
