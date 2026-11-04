const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs/promises");
const path = require("node:path");

const migrationDir = path.join(__dirname, "../../supabase/migrations");
const originalMigrations = [
  "202609160001_create_project_history.sql",
  "202610090001_create_collaboration.sql",
  "202610250001_history_consistency.sql",
  "202610260001_history_pagination.sql",
];
const migration = "202611040001_unified_project_records.sql";
const snapshot = (name) => ({
  schemaVersion: 2, savedAt: "2026-11-04T08:00:00Z",
  editor: { activity: { name }, pages: [], resourceDrafts: { daily: { activityName: name } } },
});

test("rebuilt history on isolated PostgreSQL", {
  skip: !process.env.PGLITE_MODULE_PATH && "PGLITE_MODULE_PATH required for actual SQL checks",
}, async (t) => {
  const { PGlite } = require(process.env.PGLITE_MODULE_PATH);
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec("create role anon; create role authenticated; create role service_role;");
  for (const file of originalMigrations) {
    await db.exec((await fs.readFile(path.join(migrationDir, file), "utf8"))
      .replace("create extension if not exists pgcrypto;", ""));
  }
  const oldWrite = async (user, id, name, extra = {}) => (await db.query(
    "select write_history_project_compact($1,$2,$3::jsonb) as result",
    [user, id, JSON.stringify({ name, snapshot: snapshot(name), ...extra })],
  )).rows[0].result;
  const oldSync = async (user, state, admin = false) => (await db.query(
    "select sync_collaboration_changes_compact($1,$2::jsonb,$3) as result",
    [user, JSON.stringify({ users: [], teams: [], records: [], ...state }), admin],
  )).rows[0].result;
  await oldSync("owner", { teams: [{ id: "g1", name: "公共组" }] });
  const legacy = await oldWrite("owner", null, "旧会场", { scope: "team", teamId: "g1" });
  await oldSync("owner", { records: [{
    id: "legacy-copy", name: "旧副本", scope: "personal", snapshot: snapshot("旧副本"),
  }] });
  const deleted = await oldWrite("owner", null, "已删除");
  await db.query("update projects set deleted_at=now() where id=$1", [deleted.project.id]);
  // A damaged but valid-json legacy record must not break migration or the list.
  await db.query(`insert into collaboration_records
    (id,owner_id,name,scope,snapshot_json) values ('damaged','owner','坏记录','personal','{}')`);
  try {
    await db.exec(await fs.readFile(path.join(migrationDir, migration), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  await t.test("older open pages may actively overwrite a newer committed save", async () => {
    const first = await oldWrite("owner", legacy.project.id, "第一人修改", {
      baseUpdatedAt: legacy.project.updated_at,
    });
    const last = await oldWrite("owner", legacy.project.id, "后保存成为最新", {
      baseUpdatedAt: legacy.project.updated_at,
    }).catch((error) => ({ rejected: error.message }));
    assert.equal(last.project?.name, "后保存成为最新", last.rejected);
    assert.notEqual(last.project?.updated_at, first.project.updated_at);
  });
  const exists = (await db.query(`select to_regprocedure(
    'public.write_project_record(text,text,jsonb,boolean)') is not null as present`)).rows[0].present;
  await t.test("unified transactional record service is available", () => {
    assert.equal(exists, true, "unified record service is missing");
  });
  if (!exists) return;

  let op = 0;
  const operationId = () => `00000000-0000-4000-8000-${String(++op).padStart(12, "0")}`;
  const write = async (user, id, name, options = {}, admin = false) => (await db.query(
    "select write_project_record($1,$2,$3::jsonb,$4) as result",
    [user, id, JSON.stringify({ name, snapshot: snapshot(name), operationId: operationId(), ...options }), admin],
  )).rows[0].result;
  const get = async (id) => (await db.query("select * from project_records where id=$1", [id])).rows[0];
  const remove = (user, id, admin = false) => db.query(
    "select delete_project_record($1,$2,$3)", [user, id, admin],
  );

  await t.test("migration preserves IDs, scope, copies, damaged data and all original snapshots", async () => {
    const copy = await get("legacy-copy");
    assert.equal(copy.owner_id, "owner");
    assert.equal(copy.project_id, null);
    assert.deepEqual(copy.snapshot_json, snapshot("旧副本"));
    assert.equal((await get(legacy.project.id)).group_id, "g1");
    assert.ok((await get(deleted.project.id)).deleted_at);
    assert.deepEqual((await get("damaged")).snapshot_json, {});
    assert.ok((await get("damaged")).migration_issue);
    const original = (await db.query("select snapshot_json from project_versions where id=$1",
      [legacy.version.id])).rows[0].snapshot_json;
    assert.deepEqual(original, snapshot("旧会场"));
    const before = await get("legacy-copy");
    await db.exec(await fs.readFile(path.join(migrationDir, migration), "utf8"));
    assert.deepEqual(await get("legacy-copy"), before, "migration must be safe to reapply");
  });
  await t.test("all team writers use server commit order, keep ownership and monotonic revisions", async () => {
    const before = await get(legacy.project.id);
    const a = await write("member-a", legacy.project.id, "成员A");
    const b = await write("member-b", legacy.project.id, "成员B", { baseUpdatedAt: before.updated_at });
    const c = await write("owner", legacy.project.id, "最后覆盖", { baseUpdatedAt: before.updated_at });
    assert.equal(b.record.revision, a.record.revision + 1);
    assert.equal(c.record.revision, b.record.revision + 1);
    assert.equal((await get(legacy.project.id)).name, "最后覆盖");
    assert.equal(c.record.owner_id, "owner");
    assert.equal(c.record.group_id, "g1");
    assert.equal(Object.hasOwn(c.record, "snapshot_json"), false);
  });
  await t.test("the same operation confirms its receipt without replaying after a later save", async () => {
    const id = "11111111-1111-4111-8111-111111111111";
    const firstOp = operationId();
    const first = await write("owner", id, "首次保存", { create: true, operationId: firstOp });
    const newer = await write("owner", id, "更新保存");
    const retry = await write("owner", id, "首次保存", { create: true, operationId: firstOp });
    assert.equal(retry.replayed, true);
    assert.equal(retry.record.revision, first.record.revision);
    assert.equal((await get(id)).revision, newer.record.revision);
    assert.equal((await get(id)).name, "更新保存");
    await assert.rejects(write("owner", id, "改变旧请求", { create: true, operationId: firstOp }),
      /OPERATION_MISMATCH/);
    assert.equal((await db.query("select count(*) from project_records where id=$1", [id])).rows[0].count, 1);
  });
  await t.test("legacy save acknowledgements also retain the original revision on an old retry", async () => {
    const operation = operationId();
    const first = await oldWrite("owner", null, "兼容请求原稿", { operationId: operation });
    await write("owner", first.project.id, "后来的新稿");
    const retry = await oldWrite("owner", null, "兼容请求原稿", { operationId: operation });
    assert.equal(retry.replayed, true);
    assert.equal(retry.project.name, first.project.name);
    assert.equal(retry.project.revision, first.project.revision);
    assert.equal((await get(first.project.id)).name, "后来的新稿");
  });
  await t.test("failed transaction never leaves a record or a success receipt", async () => {
    await db.exec(`create function reject_test_record() returns trigger language plpgsql as $$
      begin if new.name='FAIL_COMMIT' then raise exception 'injected failure'; end if; return new; end $$;
      create trigger reject_test_record before insert or update on project_records
        for each row execute function reject_test_record();`);
    const id = "22222222-2222-4222-8222-222222222222";
    const operation = operationId();
    await assert.rejects(write("owner", id, "FAIL_COMMIT", { create: true, operationId: operation }),
      /injected failure/);
    assert.equal(await get(id), undefined);
    assert.equal((await db.query("select count(*) from project_save_receipts where operation_id=$1",
      [operation])).rows[0].count, 0);
  });
  await t.test("personal permissions cannot be expanded by forged metadata; copies are independent", async () => {
    const id = "33333333-3333-4333-8333-333333333333";
    await write("owner", id, "个人", { create: true, ownerId: "forged" });
    assert.equal((await get(id)).owner_id, "owner");
    await assert.rejects(write("member", id, "越权", { scope: "team", teamId: "g1" }), /RECORD_FORBIDDEN/);
    await assert.rejects(remove("member", id), /RECORD_FORBIDDEN/);
    await write("owner", "new-copy", "独立副本", { create: true, scope: "team", teamId: "g1" });
    await write("member", "new-copy", "副本覆盖");
    assert.equal((await get(id)).name, "个人");
    await assert.rejects(write("owner", id, "擅自移动", { scope: "team", teamId: "g1" }), /DESTINATION_MISMATCH/);
    await assert.rejects(write("owner", "invalid-group", "坏组", {
      create: true, scope: "team", teamId: "missing",
    }), /INVALID_GROUP/);
  });
  await t.test("deleted copies and projects cannot be revived by stale commands, creates or receipts", async () => {
    const operation = operationId();
    await write("owner", "delete-copy", "待删除", { create: true, operationId: operation });
    await remove("owner", "delete-copy");
    await assert.rejects(write("owner", "delete-copy", "旧页"), /RECORD_NOT_FOUND/);
    await assert.rejects(write("owner", "delete-copy", "待删除", { create: true, operationId: operation }), /RECORD_NOT_FOUND/);
    await assert.rejects(write("owner", "delete-copy", "复活", { create: true }), /RECORD_NOT_FOUND/);
    assert.ok((await get("delete-copy")).deleted_at);
    await assert.rejects(write("owner", deleted.project.id, "复活", { create: true }), /RECORD_NOT_FOUND/);
    await write("owner", "save-after-delete", "另存", { create: true });
    assert.equal((await get("save-after-delete")).name, "另存");
  });
  await t.test("large snapshots exceed the former 5MiB cap and repeated saves keep snapshot rows bounded", async () => {
    const large = snapshot("大项目");
    large.editor.prdTextInput = "中".repeat(2 * 1024 * 1024);
    for (let i = 0; i < 12; i++) {
      const result = await write("owner", "large-project", `大项目${i}`, {
        create: i === 0, snapshot: large,
      });
      assert.ok(JSON.stringify(result).length < 2000);
    }
    assert.deepEqual((await get("large-project")).snapshot_json, large);
    assert.equal((await db.query("select count(*) from project_records where id='large-project'")).rows[0].count, 1);
    assert.equal((await db.query("select count(*) from project_versions where snapshot_json=$1::jsonb",
      [JSON.stringify(large)])).rows[0].count, 0);
  });
  await t.test("record pagination has no product count cap and excludes tombstones", async () => {
    for (let i = 0; i < 240; i++) {
      await write("page-owner", `page-${String(i).padStart(3, "0")}`, `记录${i}`, { create: true });
    }
    await remove("page-owner", "page-239");
    const { readPagination, pageResult } = require("../list-pagination.cjs");
    await db.exec("update project_records set updated_at='2026-11-04T08:00:00.123456Z' where owner_id='page-owner'");
    let cursor, ids = [];
    do {
      const page = readPagination({ cursor, limit: 20 });
      const rows = (await db.query(`select id,updated_at::text from project_records
        where owner_id='page-owner' and deleted_at is null
        and ($1::timestamptz is null or (updated_at,id)<($1::timestamptz,$2::text))
        order by updated_at desc,id desc limit 21`,
      [page.cursor?.updatedAt || null, page.cursor?.id || null])).rows
        .map((row) => ({ ...row, updated_at: row.updated_at.replace(" ", "T").replace(/\+00$/, "+00:00") }));
      const result = pageResult(rows, 20, (row) => row.id);
      ids.push(...result.items);
      cursor = result.nextCursor;
    } while (cursor);
    assert.equal(ids.length, 239);
    assert.equal(new Set(ids).size, 239);
  });
  await t.test("legacy API adapters use canonical data for old projects and standalone copies", async () => {
    const response = await oldSync("owner", { records: [{
      id: "legacy-copy", name: "旧接口覆盖副本", scope: "personal", snapshot: snapshot("旧接口覆盖副本"),
      baseUpdatedAt: "2000-01-01T00:00:00Z",
    }] });
    assert.equal(response.records[0].name, "旧接口覆盖副本");
    assert.equal((await get("legacy-copy")).name, "旧接口覆盖副本");
    assert.deepEqual((await db.query("select snapshot_json from collaboration_records where id='legacy-copy'"))
      .rows[0].snapshot_json, snapshot("旧副本"));
  });
  await t.test("record writes have no global write lock and public roles cannot invoke privileged RPCs", async () => {
    const functions = (await db.query(`select prosrc from pg_proc
      where proname in ('write_project_record','sync_collaboration_changes_compact')`)).rows;
    assert.ok(functions.every((row) => !row.prosrc.includes("history-collaboration-write")));
    const roles = (await db.query(`select
      has_function_privilege('anon','write_project_record(text,text,jsonb,boolean)','execute') as anon,
      has_function_privilege('authenticated','delete_project_record(text,text,boolean)','execute') as auth`)).rows[0];
    assert.deepEqual(roles, { anon: false, auth: false });
  });
  await t.test("large resumable uploads persist across server instances and commit atomically", async () => {
    const uploadMigration = path.join(migrationDir, "202611040002_project_record_uploads.sql");
    try { await db.exec(await fs.readFile(uploadMigration, "utf8")); }
    catch (error) { if (error.code !== "ENOENT") throw error; }
    const present = (await db.query(`select to_regprocedure(
      'public.stage_project_save_chunk(text,text,uuid,integer,integer,text,text)') is not null as present`)).rows[0].present;
    assert.equal(present, true, "persistent upload staging is missing");
    if (!present) return;
    const { createProjectRecordRepository } = require("../project-record-repository.cjs");
    const { createProjectUploadRepository } = require("../project-record-upload.cjs");
    const rpcClient = {
      async rpc(name, args) {
        const entries = Object.entries(args);
        const params = entries.map(([key], i) => `${key}=>$${i + 1}`);
        try {
          const result = await db.query(`select public.${name}(${params}) as result`,
            entries.map(([, value]) => value && typeof value === "object" ? JSON.stringify(value) : value));
          return { data: result.rows[0].result };
        } catch (error) { return { error }; }
      },
    };
    const user = { id: "upload-owner" };
    const operation = operationId();
    const body = {
      name: "分片大项目", operationId: operation, create: true,
      snapshot: { ...snapshot("分片大项目"), editor: { pages: [], prdTextInput: "中".repeat(2 * 1024 * 1024) } },
    };
    const { gzipSync } = require("node:zlib");
    const compressed = gzipSync(Buffer.from(JSON.stringify(body)));
    const parts = [];
    for (let start = 0; start < compressed.length; start += 1024) {
      parts.push(compressed.subarray(start, start + 1024).toString("base64"));
    }
    const firstServer = createProjectUploadRepository(rpcClient, createProjectRecordRepository(rpcClient));
    const secondServer = createProjectUploadRepository(rpcClient, createProjectRecordRepository(rpcClient));
    await firstServer.stageUpload(user, "uploaded", operation, 0, {
      totalParts: parts.length, encoding: "gzip", data: parts[0],
    });
    await assert.rejects(secondServer.commitUpload(user, "uploaded", operation), /分片|完整/);
    assert.equal(await get("uploaded"), undefined);
    for (let i = 1; i < parts.length; i++) {
      await secondServer.stageUpload(user, "uploaded", operation, i, {
        totalParts: parts.length, encoding: "gzip", data: parts[i],
      });
    }
    await assert.rejects(firstServer.stageUpload(user, "uploaded", operation, 0, {
      totalParts: parts.length, encoding: "gzip", data: "e30=",
    }), /标识|一致|改变/);
    const saved = await secondServer.commitUpload(user, "uploaded", operation);
    assert.equal(saved.record.revision, 1);
    assert.deepEqual((await get("uploaded")).snapshot_json, body.snapshot);
    assert.equal((await db.query("select count(*) from project_save_chunks where operation_id=$1",
      [operation])).rows[0].count, 0);
    const expired = operationId();
    await firstServer.stageUpload(user, "expired", expired, 0, { totalParts: 1, encoding: "identity", data: "e30=" });
    await db.query("update project_save_chunks set expires_at='2000-01-01' where operation_id=$1", [expired]);
    await assert.rejects(secondServer.commitUpload(user, "expired", expired), /分片|过期|完整/);
  });
});
