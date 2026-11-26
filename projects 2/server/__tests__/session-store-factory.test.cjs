const assert = require("node:assert/strict");
const test = require("node:test");
const express = require("express");
const session = require("express-session");
const { SupabaseSessionStore } = require("../supabase-session-store.cjs");

test("session storage stays persistent unless local development explicitly opts in", () => {
  const { createSessionStore } = require("../session-store-factory.cjs");
  for (const env of [
    {},
    { NODE_ENV: "development" },
    { NODE_ENV: "production" },
    { NODE_ENV: "production", LOCAL_PREVIEW_SESSION_STORE: "memory" },
    { LOCAL_PREVIEW_SESSION_STORE: "memory" },
    { NODE_ENV: "test", LOCAL_PREVIEW_SESSION_STORE: "memory" },
    { NODE_ENV: "development", LOCAL_PREVIEW_SESSION_STORE: "supabase" },
  ]) {
    const store = createSessionStore(env);
    try {
      assert.ok(store instanceof SupabaseSessionStore, JSON.stringify(env));
    } finally {
      store.close?.();
    }
  }
});

test("explicit local development uses a memory session store", () => {
  const { createSessionStore } = require("../session-store-factory.cjs");
  const store = createSessionStore({
    NODE_ENV: "development",
    LOCAL_PREVIEW_SESSION_STORE: "memory",
  });
  assert.ok(store instanceof session.MemoryStore);
});

test("local preview login completes and its cookie restores the user without cloud storage", async (t) => {
  const { createSessionStore } = require("../session-store-factory.cjs");
  const app = express();
  app.use(session({
    secret: "test-only-local-preview-secret",
    store: createSessionStore({
      NODE_ENV: "development",
      LOCAL_PREVIEW_SESSION_STORE: "memory",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  }));
  app.post("/login", (req, res) => {
    req.session.user = { userId: "local-user" };
    res.json({ success: true });
  });
  app.get("/me", (req, res) => res.json(req.session.user || null));
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const login = await fetch(`${baseUrl}/login`, {
    method: "POST",
    signal: AbortSignal.timeout(2000),
  });
  assert.equal(login.status, 200);
  assert.deepEqual(await login.json(), { success: true });
  const cookie = login.headers.get("set-cookie");
  assert.ok(cookie);
  const me = await fetch(`${baseUrl}/me`, {
    headers: { Cookie: cookie.split(";")[0] },
    signal: AbortSignal.timeout(2000),
  });
  assert.deepEqual(await me.json(), { userId: "local-user" });
});
