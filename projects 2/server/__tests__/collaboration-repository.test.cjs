const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createCollaborationRepository,
} = require("../collaboration-repository.cjs");

function createSupabaseMock(seed) {
  const writes = [];

  class Query {
    constructor(table) {
      this.table = table;
      this.filters = [];
    }

    select() {
      return this;
    }

    eq(field, value) {
      this.filters.push([field, value]);
      return this;
    }

    or() {
      return this;
    }

    order() {
      return this;
    }

    rows() {
      return (seed[this.table] || []).filter((row) =>
        this.filters.every(([field, value]) => row[field] === value),
      );
    }

    async maybeSingle() {
      return { data: this.rows()[0] || null, error: null };
    }

    async upsert(value) {
      writes.push({ table: this.table, value });
      return { error: null };
    }

    then(resolve, reject) {
      return Promise.resolve({ data: this.rows(), error: null }).then(
        resolve,
        reject,
      );
    }
  }

  return {
    client: {
      from(table) {
        return new Query(table);
      },
    },
    writes,
  };
}

test("full collaboration sync preserves each record and group timestamp", async () => {
  const oldTime = "2026-10-20T08:00:00.000Z";
  const newTime = "2026-10-21T09:30:00.000Z";
  const { client, writes } = createSupabaseMock({
    app_users: [{ id: "user-1", name: "用户一", avatar_url: "" }],
    collaboration_groups: [
      {
        id: "group-1",
        name: "增长组",
        created_at: oldTime,
        updated_at: oldTime,
      },
    ],
    collaboration_records: [
      {
        id: "record-old",
        owner_id: "user-1",
        name: "旧记录",
        scope: "personal",
        created_at: oldTime,
        updated_at: oldTime,
        snapshot_json: {},
      },
      {
        id: "record-new",
        owner_id: "user-1",
        name: "新记录",
        scope: "personal",
        created_at: oldTime,
        updated_at: newTime,
        snapshot_json: {},
      },
    ],
  });
  const repository = createCollaborationRepository(client);

  await repository.sync(
    { id: "user-1", name: "用户一" },
    {
      users: [],
      teams: [
        {
          id: "group-1",
          name: "增长组",
          createdAt: oldTime,
          updatedAt: oldTime,
        },
      ],
      records: [
        {
          id: "record-old",
          ownerId: "user-1",
          name: "旧记录",
          scope: "personal",
          createdAt: oldTime,
          updatedAt: oldTime,
          snapshot: {},
        },
        {
          id: "record-new",
          ownerId: "user-1",
          name: "新记录",
          scope: "personal",
          createdAt: oldTime,
          updatedAt: newTime,
          snapshot: {},
        },
      ],
    },
  );

  const groupWrite = writes.find(
    (write) => write.table === "collaboration_groups",
  );
  const recordWrites = writes.filter(
    (write) => write.table === "collaboration_records",
  );
  assert.equal(groupWrite.value.updated_at, oldTime);
  assert.deepEqual(
    recordWrites.map((write) => write.value.updated_at),
    [oldTime, newTime],
  );
});
