const assert = require("node:assert/strict");
const { test } = require("node:test");
const { app } = require("../index.cjs");
const { SupabaseSessionStore } = require("../supabase-session-store.cjs");
const fs = require("node:fs");
const path = require("node:path");

test("server transport accepts payloads above 10MiB before checking authentication", async (t) => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/projects`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "large", padding: "x".repeat(12 * 1024 * 1024) }),
  });
  assert.equal(response.status, 401, "JSON parser must not reject a supported save payload");
  assert.equal((await response.json()).code, "UNAUTHENTICATED");
});

test("server returns structured JSON and a request ID for malformed payloads", async (t) => {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/projects`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
  });
  assert.equal(response.status, 400);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const body = await response.json();
  assert.equal(body.code, "INVALID_SNAPSHOT");
  assert.ok(body.requestId);
});

test("durable sessions use a 30 day fallback and renew cookies on authenticated activity", () => {
  const store = new SupabaseSessionStore();
  try {
    const ttl = store._expireMs({}) - Date.now();
    assert.ok(ttl >= 30 * 24 * 60 * 60 * 1000 - 1000, `actual TTL ${ttl}`);
    const modulePath = path.join(__dirname, "../session-options.cjs");
    assert.ok(fs.existsSync(modulePath), "shared cookie and durable-store policy missing");
    const { createSessionOptions, SESSION_TTL_MS } = require(modulePath);
    const options = createSessionOptions(store);
    assert.equal(options.rolling, true);
    assert.equal(options.cookie.maxAge, SESSION_TTL_MS);
    assert.equal(options.store, store);
    assert.equal(options.cookie.httpOnly, true);
  } finally { store.close(); }
});

test("activity upgrades existing seven day sessions without requiring a new login", () => {
  const { renewAuthenticatedSession, SESSION_TTL_MS } = require("../session-options.cjs");
  assert.equal(typeof renewAuthenticatedSession, "function");
  const req = { session: { user: { employeeId: "user" }, cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } } };
  let proceeded = false;
  renewAuthenticatedSession(req, {}, () => { proceeded = true; });
  assert.equal(req.session.cookie.maxAge, SESSION_TTL_MS);
  assert.equal(proceeded, true);
});
