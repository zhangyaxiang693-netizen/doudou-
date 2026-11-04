const assert = require("node:assert/strict");
const { test } = require("node:test");
const express = require("express");
const { createExportRouter } = require("../export-routes.cjs");
const { advanceExportJob, publicJob } = require("../export-jobs.cjs");
const { zipLocalHeader, zipCentralDirectory, crc32 } = require("../export-zip.cjs");

test("export endpoints reject anonymous users and another account's job", async (t) => {
  let reads = 0;
  const app = express();
  app.use(express.json());
  app.use("/api/exports", createExportRouter({
    resolveUser: (req) => req.headers["x-test-user"] ? { id: req.headers["x-test-user"] } : null,
    repository: { async get(owner) { reads++; return owner === "owner" ? { id: "job" } : null; } },
    renderer: {},
  }));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/api/exports/11111111-1111-4111-8111-111111111111`;
  assert.equal((await fetch(url)).status, 401);
  assert.equal(reads, 0);
  assert.equal((await fetch(url, { headers: { "x-test-user": "other" } })).status, 404);
});

test("a restarted worker continues the next image and never re-renders completed files", async () => {
  const renders = [];
  let saved;
  const job = {
    id: "job", owner_id: "owner", build_id: "build", status: "pending",
    input_json: { format: "zip" },
    progress_json: { items: [{ id: "a", path: "一.png" }, { id: "b", path: "二.png" }], next: 1, phase: "render", files: [{ size: 3, parts: 1, crc: 1 }] },
  };
  const repository = {
    async putBuffer(_job, _lease, index, data) { assert.equal(index, 1); return { size: data.length, parts: 1, crc: crc32(data) }; },
    async checkpoint(_job, _lease, progress, status = "pending") { saved = { ...job, progress_json: progress, status }; return saved; },
  };
  await advanceExportJob({ job, lease: "lease", repository, renderer: {
    buildId: "build",
    async capture(_job, item) { renders.push(item.id); return Buffer.from("png"); },
  } });
  assert.deepEqual(renders, ["b"]);
  assert.equal(saved.progress_json.next, 2);
  assert.equal(saved.progress_json.phase, "pack");
  assert.equal(saved.status, "pending");
});

test("public progress excludes activity contents, owner identity and leases", () => {
  const visible = publicJob({
    id: "job", status: "pending", filename: "活动.zip", input_json: { secret: true },
    owner_id: "private", lease_token: "secret", progress_json: { items: [{ id: "a" }], next: 0, phase: "render" },
  });
  assert.equal(visible.total, 1);
  assert.equal(visible.input_json, undefined);
  assert.equal(visible.lease_token, undefined);
  assert.equal(visible.owner_id, undefined);
});

test("server ZIP preserves UTF-8 names and valid CRC/offsets", () => {
  const data = Buffer.from("test");
  const file = { path: "页面/版本.png", size: data.length, crc: crc32(data), offset: 0 };
  const header = zipLocalHeader(file);
  const central = zipCentralDirectory([file], header.length + data.length);
  assert.equal(header.readUInt32LE(0), 0x04034b50);
  assert.equal(header.readUInt16LE(6), 0x800);
  assert.equal(header.readUInt32LE(14), 0xd87f7e0c);
  assert.equal(central.readUInt32LE(central.length - 22), 0x06054b50);
  assert.equal(central.readUInt32LE(central.length - 6), header.length + data.length);
});

test("PostgreSQL leases prevent duplicate workers and stale writes after a restart", {
  skip: !process.env.PGLITE_MODULE_PATH && "PGLITE_MODULE_PATH required",
}, async (t) => {
  const { PGlite } = require(process.env.PGLITE_MODULE_PATH);
  const fs = require("node:fs/promises"), path = require("node:path");
  const db = new PGlite(); t.after(() => db.close());
  await db.exec("create role anon; create role authenticated; create role service_role;");
  const sql = await fs.readFile(path.join(__dirname, "../../supabase/migrations/202611040003_server_exports.sql"), "utf8");
  await db.exec(sql); await db.exec(sql); // migrations are safe to reapply
  const id = "11111111-1111-4111-8111-111111111111";
  const old = "22222222-2222-4222-8222-222222222222";
  const next = "33333333-3333-4333-8333-333333333333";
  await db.query("select create_export_job($1,'owner','{}','hash','build','test.png')", [id]);
  await db.query("select claim_export_job($1,'owner',$2)", [id, old]);
  assert.equal((await db.query("select claim_export_job($1,'owner',$2) as job", [id, next])).rows[0].job, null);
  await db.query("select write_export_chunk($1,$2,0,0,'cG5n',3)", [id, old]);
  await db.query("update export_jobs set leased_until=now()-interval '1 second' where id=$1", [id]);
  await db.query("select claim_export_job($1,'owner',$2)", [id, next]);
  await assert.rejects(db.query("select write_export_chunk($1,$2,0,0,'eA==',1)", [id, old]), /EXPORT_LEASE_LOST/);
  await db.query("select checkpoint_export_job($1,$2,'{\"next\":1}','pending',null)", [id, next]);
  assert.equal((await db.query("select progress_json->>'next' as n from export_jobs")).rows[0].n, "1");
  await db.query("update export_jobs set expires_at=now()-interval '1 second'");
  await db.query("select cleanup_export_jobs()");
  assert.equal((await db.query("select count(*)::int as n from export_job_chunks")).rows[0].n, 0);
});
