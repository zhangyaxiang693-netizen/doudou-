const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createHistoryRepository,
} = require("../history-repository.cjs");

test("overwriting a project updates its latest snapshot without inserting a version", async () => {
  const projectId = "11111111-1111-4111-8111-111111111111";
  const versionId = "22222222-2222-4222-8222-222222222222";
  const updates = [];
  let insertCount = 0;
  const rows = {
    projects: [
      {
        id: projectId,
        owner_id: "user-1",
        name: "原活动",
        prd_url: "",
        template_id: "",
        latest_version_id: versionId,
        created_at: "2026-10-20T08:00:00.000Z",
        updated_at: "2026-10-20T08:00:00.000Z",
        deleted_at: null,
      },
    ],
    project_versions: [
      {
        id: versionId,
        project_id: projectId,
        version_no: 2,
        save_type: "manual",
        schema_version: 1,
        app_version: "0.1.0",
        created_at: "2026-10-20T08:00:00.000Z",
      },
    ],
  };

  class Query {
    constructor(table) {
      this.table = table;
      this.filters = [];
      this.changes = null;
    }

    select() {
      return this;
    }

    eq(field, value) {
      this.filters.push([field, value]);
      return this;
    }

    is(field, value) {
      this.filters.push([field, value]);
      return this;
    }

    update(changes) {
      this.changes = changes;
      updates.push({ table: this.table, changes });
      return this;
    }

    insert() {
      insertCount += 1;
      return this;
    }

    row() {
      const row = (rows[this.table] || []).find((item) =>
        this.filters.every(([field, value]) => item[field] === value),
      );
      return row && this.changes ? { ...row, ...this.changes } : row;
    }

    async maybeSingle() {
      return { data: this.row() || null, error: null };
    }

    async single() {
      return { data: this.row() || null, error: null };
    }
  }

  const repository = createHistoryRepository({
    from(table) {
      return new Query(table);
    },
  });
  const snapshot = {
    schemaVersion: 1,
    appVersion: "0.1.0",
    savedAt: "2026-10-21T10:00:00.000Z",
    editor: { pages: [] },
  };

  const result = await repository.overwriteProject("user-1", projectId, {
    name: "覆盖后的活动",
    prdUrl: "https://example.com/prd",
    templateId: "template-1",
    snapshot,
  });

  assert.equal(insertCount, 0);
  assert.equal(result.version.id, versionId);
  assert.equal(result.version.versionNo, 2);
  assert.deepEqual(
    updates.map((update) => update.table),
    ["project_versions", "projects"],
  );
  assert.equal(updates[0].changes.snapshot_json, snapshot);
  assert.equal(updates[1].changes.name, "覆盖后的活动");
});
