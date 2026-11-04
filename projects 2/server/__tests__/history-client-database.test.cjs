const assert = require("node:assert/strict");
const { test } = require("node:test");
const { randomBytes, createHash } = require("node:crypto");
const { startAcceptanceServer } = require("../../scripts/history-acceptance-server.cjs");

test("browser client, HTTP routes and actual SQL preserve complete saves and lost-response retries", {
  skip: !process.env.PGLITE_MODULE_PATH && "PGLITE_MODULE_PATH required",
}, async (t) => {
  const runtime = await startAcceptanceServer({ port: 0 });
  const nativeFetch = globalThis.fetch;
  const base = `http://127.0.0.1:${runtime.server.address().port}`;
  const login = await nativeFetch(`${base}/api/auth/me`);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  globalThis.fetch = (url, input = {}) => nativeFetch(`${base}${url}`, {
    ...input, headers: { ...input.headers, cookie },
  });
  t.after(async () => { globalThis.fetch = nativeFetch; await runtime.close(); });
  const { saveProjectRecord, getProjectRecord } = await import("../../src/project-history/api.js");
  const make = (text) => ({
    recordId: "http-record", operationId: crypto.randomUUID(), create: false, scope: "team", teamId: "acceptance-team",
    name: "完整HTTP项目", snapshot: { schemaVersion: 3, savedAt: new Date().toISOString(), editor: { pages: [], text } },
  });
  const original = make("最初内容\n手动换行");
  original.create = true;
  await nativeFetch(`${base}/__history_test/lose-next-response`, { method: "POST", headers: { cookie } });
  await assert.rejects(saveProjectRecord(original), (error) => error.code === "NETWORK_ERROR");
  assert.equal((await getProjectRecord("http-record")).snapshot.editor.text, original.snapshot.editor.text);
  const newer = await saveProjectRecord(make("他人后来保存的内容"));
  const receipt = await saveProjectRecord(original);
  assert.equal(receipt.replayed, true);
  assert.equal(receipt.record.revision, 1);
  assert.equal((await getProjectRecord("http-record")).revision, newer.record.revision);
  assert.equal((await getProjectRecord("http-record")).snapshot.editor.text, "他人后来保存的内容");

  // Representative poorly-compressible inline data must span multiple parts.
  const embedded = make(randomBytes(5 * 1024 * 1024).toString("base64"));
  const progress = [];
  await nativeFetch(`${base}/__history_test/lose-next-response`, { method: "POST", headers: { cookie } });
  await assert.rejects(saveProjectRecord(embedded, { onProgress: (part, count) => progress.push([part, count]) }),
    (error) => error.code === "NETWORK_ERROR");
  assert.ok(progress.length > 10, `actual uploaded parts: ${progress.length}`);
  const digest = (text) => createHash("sha256").update(text).digest("hex");
  assert.equal(digest((await getProjectRecord("http-record")).snapshot.editor.text),
    digest(embedded.snapshot.editor.text));
  const afterMultipart = await saveProjectRecord(make("分片提交后他人的新内容"));
  const replayedMultipart = await saveProjectRecord(embedded);
  assert.equal(replayedMultipart.replayed, true);
  assert.ok(replayedMultipart.record.revision < afterMultipart.record.revision);
  assert.equal((await getProjectRecord("http-record")).snapshot.editor.text, "分片提交后他人的新内容");

  const boundary = make("");
  const overhead = Buffer.byteLength(JSON.stringify(boundary.snapshot), "utf8");
  boundary.snapshot.editor.text = "x".repeat(32 * 1024 * 1024 - overhead);
  assert.equal(Buffer.byteLength(JSON.stringify(boundary.snapshot), "utf8"), 32 * 1024 * 1024);
  const large = await saveProjectRecord(boundary);
  const loaded = await getProjectRecord("http-record");
  assert.equal(loaded.revision, large.record.revision);
  assert.equal(loaded.snapshot.editor.text.length, boundary.snapshot.editor.text.length);
  assert.equal(loaded.snapshot.editor.text, boundary.snapshot.editor.text);
  const oversized = make(`${boundary.snapshot.editor.text}x`);
  await assert.rejects(saveProjectRecord(oversized), (error) => error.code === "SNAPSHOT_TOO_LARGE");
  assert.equal((await getProjectRecord("http-record")).revision, large.record.revision);
});
