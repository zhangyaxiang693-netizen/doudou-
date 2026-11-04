// Small real-output check; never connects to the production database.
// node scripts/server-export-smoke.cjs <pglite module> <output directory> [snapshot.json]
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const express = require("express");
const { PNG } = require("pngjs");
const { ExportRepository } = require("../server/export-repository.cjs");
const { ExportRenderer } = require("../server/export-renderer.cjs");
const { createExportRouter } = require("../server/export-routes.cjs");

async function main() {
  const [modulePath, outputDir, snapshotPath] = process.argv.slice(2);
  if (!modulePath || !outputDir) throw new Error("需要 PGlite 模块路径和输出目录");
  await fs.access(outputDir);
  const { PGlite } = require(modulePath);
  const db = new PGlite();
  const renderer = new ExportRenderer();
  await db.exec("create role anon; create role authenticated; create role service_role;");
  await db.exec(await fs.readFile(path.join(__dirname, "../supabase/migrations/202611040003_server_exports.sql"), "utf8"));
  const client = { async rpc(name, args = {}) {
    try {
      const values = Object.values(args);
      const result = await db.query(`select to_jsonb(public.${name}(${values.map((_, i) => `$${i + 1}`).join(",")})) as value`,
        values.map((value) => value && typeof value === "object" ? JSON.stringify(value) : value));
      return { data: result.rows[0].value };
    } catch (error) { return { error }; }
  } };
  class LocalRepository extends ExportRepository {
    async get(owner, id) { return (await db.query("select * from export_jobs where owner_id=$1 and id=$2", [owner, id])).rows[0] || null; }
    async getChunk(job, file, part) {
      const row = (await db.query("select data from export_job_chunks where job_id=$1 and file_index=$2 and part_index=$3", [job.id, file, part])).rows[0];
      return Buffer.from(row.data, "base64");
    }
    async partSizes(job, file, start, end) {
      return (await db.query("select part_index,byte_count from export_job_chunks where job_id=$1 and file_index=$2 and part_index between $3 and $4 order by part_index",
        [job.id, file, start, end])).rows;
    }
  }
  const repository = new LocalRepository(client);
  const app = express(); app.use(express.json({ limit: "40mb" }));
  app.use((req, res, next) => { req.session = { adminUnlocked: true }; next(); });
  app.use("/api/exports", createExportRouter({ repository, renderer, resolveUser: () => ({ id: "smoke-user" }) }));
  const server = await new Promise((resolve) => { const value = app.listen(0, "127.0.0.1", () => resolve(value)); });
  const base = `http://127.0.0.1:${server.address().port}/api/exports`;
  const report = [];
  async function api(suffix, body) {
    const response = await fetch(base + suffix, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
    const result = await response.json();
    assert.equal(response.ok, true, JSON.stringify(result));
    return result.data;
  }
  async function complete(input, outputName) {
    const start = Date.now();
    let job = await api("", { id: crypto.randomUUID(), ...input });
    for (let step = 0; step < 50 && job.status !== "ready"; step++) {
      job = await api(`/${job.id}/advance`, {});
      assert.notEqual(job.status, "failed", job.error);
    }
    assert.equal(job.status, "ready");
    const response = await fetch(base + `/${job.id}/download`);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.length, job.size);
    const part = await fetch(base + `/${job.id}/download`, { headers: { Range: "bytes=5-12" } });
    assert.equal(part.status, 206); assert.deepEqual(Buffer.from(await part.arrayBuffer()), bytes.subarray(5, 13));
    await fs.writeFile(path.join(outputDir, outputName), bytes);
    report.push({ file: outputName, bytes: bytes.length, seconds: (Date.now() - start) / 1000, total: job.total });
    return bytes;
  }
  const fixture = (name, nodes, workflowType = "venue") => ({
    schemaVersion: 3, savedAt: new Date().toISOString(),
    editor: { workflowType, activity: { name }, pages: [{ id: "page", name, dimension: "个人用户", nodes }], guidedPageThemeId: "pink" },
  });
  try {
    const node = { id: "note", schemaId: "随机奖品填写地址", props: { descriptionText: "毛绒公仔、挂件、盲盒随机发一件\n请填写准确地址\n第三行验收文案", buttonText: "填写地址" } };
    const venue = snapshotPath ? JSON.parse(await fs.readFile(snapshotPath, "utf8")) : fixture("切图", [node]);
    const previewJob = { id: "plan-venue", input_json: { snapshot: venue, format: "zip", selection: { kind: "all" } } };
    const entries = await renderer.plan(previewJob);
    const chosen = entries.find((entry) => /消耗返|消返/.test(entry.name)) || entries.find((entry) => !/背景/.test(entry.name));
    const png = await complete({ snapshot: venue, format: "png", selection: { kind: "single", entryId: chosen.id }, filename: "会场.png" }, "服务端会场.png");
    assert.equal(PNG.sync.read(png).width, 750);
    if (!snapshotPath) assert.ok((await renderer.page.locator("[data-server-capture]").textContent()).includes("第三行验收文案"));
    const small = fixture("透明切图", [node]);
    const zip = await complete({ snapshot: small, format: "zip", selection: { kind: "all" }, filename: "完整切图.zip" }, "服务端批量.zip");
    assert.equal(zip.readUInt32LE(0), 0x04034b50);
    const admin = await complete({ snapshot: small, format: "png", selection: { kind: "admin" },
      verifier: { type: "atom", schemaId: "随机奖品填写地址", parentThemeId: "pink", blueprint: {}, variantId: "default_pink" }, filename: "组件.png" }, "服务端组件2x.png");
    assert.ok(PNG.sync.read(admin).width >= 1000);
    assert.equal(PNG.sync.read(admin).data[3], 0, "outer cut must preserve transparency");
    const pendant = fixture("挂件", [{ id: "pendant", schemaId: "挂件", props: { buttonText: "周年庆抽奖", mainVisualImage: "subject-1" } }], "resource");
    const gifPlan = await renderer.plan({ id: "plan-gif", input_json: { snapshot: pendant, format: "zip", selection: { kind: "all" } } });
    const gif = await complete({ snapshot: pendant, format: "gif", selection: { kind: "single", entryId: gifPlan[0].id }, filename: "挂件.gif" }, "服务端挂件.gif");
    assert.equal(gif.subarray(0, 6).toString(), "GIF89a"); assert.ok(gif.length <= 2 * 1024 * 1024);
    await fs.writeFile(path.join(outputDir, "服务端导出烟测.json"), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally {
    await renderer.close();
    await new Promise((resolve) => server.close(resolve));
    await db.close();
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
