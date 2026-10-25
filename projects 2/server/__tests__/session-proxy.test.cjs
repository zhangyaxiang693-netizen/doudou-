const assert = require("node:assert/strict");
const test = require("node:test");
const express = require("express");
const session = require("express-session");
const { configureSessionProxy } = require("../session-proxy.cjs");

test("HTTPS reverse proxy can issue a secure login cookie", async (t) => {
  const app = express();
  configureSessionProxy(app, { NODE_ENV: "production" });
  app.use(session({
    secret: "test-only-secret", resave: false, saveUninitialized: false,
    cookie: { secure: true },
  }));
  app.get("/", (req, res) => { req.session.user = "test"; res.send("ok"); });
  const server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const response = await fetch(`http://127.0.0.1:${server.address().port}`, {
    headers: { "X-Forwarded-Proto": "https" },
  });
  assert.match(response.headers.get("set-cookie"), /;\s*Secure/);
  const direct = await fetch(`http://127.0.0.1:${server.address().port}`);
  assert.equal(direct.headers.get("set-cookie"), null);
});
