const assert = require("node:assert/strict");
const { afterEach, test } = require("node:test");
const express = require("express");
const session = require("express-session");
const { createAdminAccessRouter } = require("../admin-access.cjs");
const {
  createCollaborationRouter,
} = require("../collaboration-routes.cjs");
const {
  CollaborationRepositoryError,
} = require("../collaboration-repository.cjs");

const servers = [];

async function startServer(configure) {
  const app = express();
  app.use(express.json());
  app.use(
    session({
      secret: "test-secret",
      resave: false,
      saveUninitialized: true,
    }),
  );
  configure(app);
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });
  servers.push(server);
  return `http://127.0.0.1:${server.address().port}`;
}

function sessionCookie(response) {
  return response.headers.get("set-cookie")?.split(";")[0] || "";
}

afterEach(async () => {
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        ),
    ),
  );
});

test("admin access requires the configured password and persists in session", async () => {
  const baseUrl = await startServer((app) => {
    app.use(
      "/api/admin",
      createAdminAccessRouter({ password: "correct-password" }),
    );
  });

  const wrong = await fetch(`${baseUrl}/api/admin/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "wrong" }),
  });
  assert.equal(wrong.status, 401);

  const unlocked = await fetch(`${baseUrl}/api/admin/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "correct-password" }),
  });
  assert.equal(unlocked.status, 200);
  const cookie = sessionCookie(unlocked);

  const status = await fetch(`${baseUrl}/api/admin/status`, {
    headers: { Cookie: cookie },
  });
  assert.deepEqual(await status.json(), {
    success: true,
    data: { unlocked: true },
  });
});

test("collaboration sync uses the authenticated user and reports ownership errors", async () => {
  let capturedUser = null;
  const repository = {
    async sync(user) {
      capturedUser = user;
      throw new CollaborationRepositoryError(
        "RECORD_FORBIDDEN",
        "无权修改其他用户的个人记录",
      );
    },
  };
  const baseUrl = await startServer((app) => {
    app.use(
      "/api/collaboration",
      createCollaborationRouter({
        resolveUser: async () => ({ id: "trusted-user", name: "用户" }),
        repository,
      }),
    );
  });

  const response = await fetch(`${baseUrl}/api/collaboration/sync`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      state: { users: [], teams: [], records: [] },
    }),
  });
  assert.equal(response.status, 403);
  assert.equal(capturedUser.id, "trusted-user");
});

test("history override requires a password-unlocked session", async () => {
  let overrideCalls = 0;
  const repository = {
    async overrideRecord(recordId, changes) {
      overrideCalls += 1;
      return { id: recordId, ...changes };
    },
  };
  const baseUrl = await startServer((app) => {
    app.use(
      "/api/admin",
      createAdminAccessRouter({ password: "correct-password" }),
    );
    app.use(
      "/api/collaboration",
      createCollaborationRouter({
        resolveUser: async () => ({ id: "trusted-user", name: "用户" }),
        repository,
      }),
    );
  });
  const body = JSON.stringify({
    name: "覆盖后的记录",
    snapshot: { schemaVersion: 1 },
  });

  const locked = await fetch(
    `${baseUrl}/api/collaboration/records/record-1`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body,
    },
  );
  assert.equal(locked.status, 403);
  assert.equal(overrideCalls, 0);

  const unlocked = await fetch(`${baseUrl}/api/admin/unlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "correct-password" }),
  });
  const cookie = sessionCookie(unlocked);
  const updated = await fetch(
    `${baseUrl}/api/collaboration/records/record-1`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body,
    },
  );
  assert.equal(updated.status, 200);
  assert.equal(overrideCalls, 1);
});
