const assert = require("node:assert/strict");
const { afterEach, test } = require("node:test");
const express = require("express");
const {
  HistoryRepositoryError,
} = require("../history-repository.cjs");
const { createHistoryRouter } = require("../history-routes.cjs");

const servers = [];
const projectId = "11111111-1111-4111-8111-111111111111";
const snapshot = {
  schemaVersion: 1,
  appVersion: "0.1.0",
  savedAt: "2026-09-16T08:00:00.000Z",
  editor: { pages: [] },
};

async function startServer(options) {
  const app = express();
  app.use(express.json());
  app.use("/api", createHistoryRouter(options));
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
  });
  servers.push(server);
  const { port } = server.address();
  return `http://127.0.0.1:${port}`;
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

test("rejects project history requests without a trusted user", async () => {
  const baseUrl = await startServer({
    resolveUser: async () => null,
    repository: {},
  });
  const response = await fetch(`${baseUrl}/api/projects`);
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(body.code, "UNAUTHENTICATED");
});

test("uses the trusted user id for project creation", async () => {
  let capturedOwnerId = null;
  const repository = {
    async createProject(ownerId, input) {
      capturedOwnerId = ownerId;
      return {
        project: { id: projectId, name: input.name },
        version: { id: "22222222-2222-4222-8222-222222222222" },
      };
    },
  };
  const baseUrl = await startServer({
    resolveUser: async () => ({ id: "trusted-user" }),
    repository,
  });
  const response = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "测试活动",
      ownerId: "forged-user",
      snapshot,
    }),
  });

  assert.equal(response.status, 201);
  assert.equal(capturedOwnerId, "trusted-user");
});

test("maps cross-user repository checks to 403", async () => {
  const repository = {
    async listVersions() {
      throw new HistoryRepositoryError(
        "PROJECT_FORBIDDEN",
        "Project belongs to another user",
      );
    },
  };
  const baseUrl = await startServer({
    resolveUser: async () => ({ id: "trusted-user" }),
    repository,
  });
  const response = await fetch(
    `${baseUrl}/api/projects/${projectId}/versions`,
  );
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.code, "PROJECT_FORBIDDEN");
});

test("rejects malformed snapshots before calling storage", async () => {
  const repository = {
    async createProject() {
      assert.fail("repository must not receive invalid snapshots");
    },
  };
  const baseUrl = await startServer({
    resolveUser: async () => ({ id: "trusted-user" }),
    repository,
  });
  const response = await fetch(`${baseUrl}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "测试活动",
      snapshot: { schemaVersion: 1 },
    }),
  });
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.code, "INVALID_SNAPSHOT");
});

test("requires a base version when updating an existing project", async () => {
  const repository = {
    async saveVersion() {
      assert.fail("repository must not receive an update without a base");
    },
  };
  const baseUrl = await startServer({
    resolveUser: async () => ({ id: "trusted-user" }),
    repository,
  });
  const response = await fetch(
    `${baseUrl}/api/projects/${projectId}/versions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ snapshot }),
    },
  );
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.code, "INVALID_SNAPSHOT");
});

test("does not expose an autosave endpoint", async () => {
  const repository = {
    async saveVersion() {
      assert.fail("autosave must not reach the repository");
    },
  };
  const baseUrl = await startServer({
    resolveUser: async () => ({ id: "trusted-user" }),
    repository,
  });
  const response = await fetch(
    `${baseUrl}/api/projects/${projectId}/autosave`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseVersionId: "22222222-2222-4222-8222-222222222222",
        snapshot,
      }),
    },
  );

  assert.equal(response.status, 404);
});
