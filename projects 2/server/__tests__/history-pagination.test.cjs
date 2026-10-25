const assert = require("node:assert/strict");
const test = require("node:test");
const { readPagination, paginateQuery, pageResult } = require("../list-pagination.cjs");
const { createCollaborationRepository } = require("../collaboration-repository.cjs");
const { createHistoryRepository } = require("../history-repository.cjs");

function clientFor(rows, calls) {
  return {
    from(table) {
      calls.push(["from", table]);
      const query = {};
      for (const method of ["select", "eq", "is", "or", "order"]) {
        query[method] = (...args) => { calls.push([method, ...args]); return query; };
      }
      query.limit = async (limit) => {
        calls.push(["limit", limit]);
        return { data: rows.slice(0, limit) };
      };
      return query;
    },
  };
}

test("cursor preserves timestamp precision and uses an ID tie-break for equal times", () => {
  const rows = [
    { id: "b", updated_at: "2026-10-26T08:00:00.123456+00:00" },
    { id: "a", updated_at: "2026-10-26T08:00:00.123456+00:00" },
  ];
  const page = pageResult(rows, 1, (row) => row);
  const pagination = readPagination({ limit: 1, cursor: page.nextCursor });
  assert.equal(pagination.cursor.updatedAt, rows[0].updated_at);
  const calls = [];
  paginateQuery({
    or(value) { calls.push(value); return this; },
    order() { return this; }, limit() { return this; },
  }, pagination);
  assert.equal(calls[0], "updated_at.lt.2026-10-26T08:00:00.123456+00:00,and(updated_at.eq.2026-10-26T08:00:00.123456+00:00,id.lt.b)");
  assert.equal(page.hasMore, true);
  assert.equal(pageResult([rows[1]], 1, (row) => row).nextCursor, null);
});

test("invalid cursors and unbounded page sizes are rejected", () => {
  for (const options of [{ limit: 0 }, { limit: 1000 }, { limit: 1.5 }, { cursor: "invalid" }]) {
    assert.throws(() => readPagination(options), /INVALID_PAGINATION/);
  }
  assert.throws(() => readPagination({
    cursor: Buffer.from(JSON.stringify({ updatedAt: "2026-10-26T08:00:00Z", id: "x),scope.eq.team" })).toString("base64url"),
  }), /INVALID_PAGINATION/);
});

test("personal pages include linked and copied records, without snapshots", async () => {
  const rows = [
    { id: "linked", project_id: "project", owner_id: "owner", scope: "personal", updated_at: "2026-10-26T08:00:00Z" },
    { id: "copy", project_id: null, owner_id: "owner", scope: "personal", updated_at: "2026-10-25T08:00:00Z" },
    { id: "older", owner_id: "owner", scope: "personal", updated_at: "2026-10-24T08:00:00Z" },
  ];
  const calls = [];
  const repository = createCollaborationRepository(clientFor(rows, calls));
  const page = await repository.listRecords({ id: "owner" }, { limit: 2 });
  assert.deepEqual(page.records.map((record) => record.id), ["linked", "copy"]);
  assert.equal(page.hasMore, true);
  assert.ok(calls.some((call) => call[0] === "eq" && call[1] === "owner_id" && call[2] === "owner"));
  assert.ok(calls.every((call) => call[0] !== "select" || !call[1].includes("snapshot")));
  assert.equal(Object.hasOwn(page.records[0], "snapshot"), false);
});

test("team pages filter by group and all-user history requires admin access", async () => {
  const calls = [];
  const repository = createCollaborationRepository(clientFor([], calls));
  await repository.listRecords({ id: "member" }, { scope: "team", teamId: "group" });
  assert.ok(calls.some((call) => call[0] === "eq" && call[1] === "group_id" && call[2] === "group"));
  assert.ok(!calls.some((call) => call[0] === "eq" && call[1] === "owner_id"));
  await assert.rejects(repository.listRecords({ id: "member" }, { scope: "all" }),
    (error) => error.code === "RECORD_FORBIDDEN");
  assert.deepEqual((await repository.listRecords({ id: "admin" }, { scope: "all" }, true)).records, []);
});

test("project endpoint uses bounded pages instead of truncating to 100", async () => {
  const calls = [];
  const repository = createHistoryRepository(clientFor([], calls));
  assert.deepEqual(await repository.listProjects("owner"), {
    projects: [], hasMore: false, nextCursor: null,
  });
  assert.ok(calls.some((call) => call[0] === "limit" && call[1] === 21));
  assert.ok(calls.some((call) => call[0] === "is" && call[1] === "deleted_at"));
});
