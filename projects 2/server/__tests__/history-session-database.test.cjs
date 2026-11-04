const assert = require("node:assert/strict");
const { test } = require("node:test");
const session = require("express-session");
const { startAcceptanceServer } = require("../../scripts/history-acceptance-server.cjs");
const { SupabaseSessionStore } = require("../supabase-session-store.cjs");
const { SESSION_TTL_MS, renewAuthenticatedSession } = require("../session-options.cjs");

test("actual session SQL survives another store instance, 25 days idle and renewal, then expires correctly", {
  skip: !process.env.PGLITE_MODULE_PATH && "PGLITE_MODULE_PATH required",
}, async (t) => {
  const runtime = await startAcceptanceServer({ port: 0 });
  t.after(() => runtime.close());
  const stores = [];
  const makeStore = () => {
    const store = new SupabaseSessionStore();
    store.client = runtime.client;
    stores.push(store);
    return store;
  };
  t.after(() => stores.forEach((store) => store.close()));
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2026-11-04T00:00:00Z").getTime() });
  const call = (store, method, ...args) => new Promise((resolve, reject) =>
    store[method](...args, (error, value) => error ? reject(error) : resolve(value)));
  const original = makeStore();
  await call(original, "set", "durable-idle", {
    user: { id: "test-a", employeeId: "test-a" },
    cookie: new session.Cookie({ maxAge: SESSION_TTL_MS }),
  });
  original.close();
  const restarted = makeStore();
  t.mock.timers.tick(25 * 86400000);
  const loaded = await call(restarted, "get", "durable-idle");
  assert.equal(loaded.user.id, "test-a", "new process must read durable identity after idle");
  const req = { session: { ...loaded, cookie: new session.Cookie(loaded.cookie) } };
  renewAuthenticatedSession(req, {}, () => {});
  await call(restarted, "touch", "durable-idle", req.session);
  t.mock.timers.tick(25 * 86400000);
  assert.equal((await call(makeStore(), "get", "durable-idle")).user.id, "test-a",
    "renewal must extend SQL expiry beyond the original cookie deadline");
  t.mock.timers.tick(6 * 86400000);
  assert.equal(await call(restarted, "get", "durable-idle"), null);
  const rows = await runtime.db.query("select id from sessions where id='durable-idle'");
  assert.equal(rows.rows.length, 0, "expired identity must be removed, not silently renewed");
});
