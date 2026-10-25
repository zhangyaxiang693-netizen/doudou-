const assert = require("node:assert/strict");
const test = require("node:test");
const { createHistoryRepository } = require("../history-repository.cjs");

test("failed transactional overwrite is surfaced without fallback writes", async () => {
  const repository = createHistoryRepository({
    async rpc() { return { error: { message: "VERSION_CONFLICT" } }; },
    from() { assert.fail("must not fall back to non-atomic writes"); },
  });
  await assert.rejects(repository.overwriteProject("owner", "project", {}),
    (error) => error.code === "VERSION_CONFLICT");
});
