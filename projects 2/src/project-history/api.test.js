import assert from "node:assert/strict";
import test from "node:test";
import { getCurrentUser, request, saveProjectRecord } from "./api.js";

test("history requests bypass cache and include correlated error details", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  let options;
  globalThis.fetch = async (url, input) => {
    options = input;
    return new Response(JSON.stringify({ success: false, code: "STORAGE_ERROR", error: "数据库暂不可用", requestId: "request-1" }), { status: 503 });
  };
  await assert.rejects(getCurrentUser(), (error) => {
    assert.equal(error.requestId, "request-1");
    return true;
  });
  assert.equal(options.cache, "no-store");
  assert.ok(options.signal);
});

test("requests time out instead of leaving a save button blocked indefinitely", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = (url, input) => new Promise((resolve, reject) => {
    input.signal.addEventListener("abort", () => reject(new Error("aborted")));
  });
  await assert.rejects(request("/me", { timeoutMs: 5 }), (error) => error.code === "TIMEOUT");
});

test("non-JSON gateway errors preserve status and request correlation", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => new Response("gateway unavailable", { status: 503, headers: { "X-Request-Id": "gateway-1" } });
  await assert.rejects(getCurrentUser(), (error) => {
    assert.equal(error.status, 503);
    assert.equal(error.requestId, "gateway-1");
    return true;
  });
});

test("large commands use durable gzip parts that reconstruct the entire original command", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  const command = {
    recordId: "large", operationId: "00000000-0000-4000-8000-000000000001", create: true, name: "全部数据",
    snapshot: { schemaVersion: 3, savedAt: new Date().toISOString(), editor: { pages: [], text: "中".repeat(150000) } },
  };
  const parts = [];
  let commit = false;
  globalThis.fetch = async (path, input) => {
    assert.equal(input.headers["X-Project-User"], "editing-account");
    if (path.endsWith("/commit")) {
      commit = true;
      const { gunzipSync } = await import("node:zlib");
      const bytes = Buffer.concat(parts.map((part) => Buffer.from(part.data, "base64")));
      const restored = JSON.parse((parts[0].encoding === "gzip" ? gunzipSync(bytes) : bytes).toString("utf8"));
      const { recordId, ...body } = command;
      assert.deepEqual(restored, body);
      return Response.json({ success: true, data: { record: { id: "large", revision: 1 } } });
    }
    assert.match(path, /\/uploads\/[^/]+\/\d+$/);
    parts.push(JSON.parse(input.body));
    assert.ok(Buffer.from(parts.at(-1).data, "base64").length <= 256 * 1024);
    return Response.json({ success: true });
  };
  assert.equal((await saveProjectRecord(command, { expectedUserId: "editing-account" })).record.id, "large");
  assert.equal(commit, true);
});
