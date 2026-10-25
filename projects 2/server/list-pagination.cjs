const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

function readPagination(options = {}) {
  const limit = options.limit === undefined ? DEFAULT_PAGE_SIZE : Number(options.limit);
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_PAGE_SIZE) {
    throw new Error("INVALID_PAGINATION");
  }
  let cursor = null;
  if (options.cursor) {
    try {
      if (typeof options.cursor !== "string" || options.cursor.length > 600) throw new Error();
      cursor = JSON.parse(Buffer.from(options.cursor, "base64url").toString("utf8"));
      if (!/^\d{4}-\d{2}-\d{2}T[\d:.]+(?:Z|[+-]\d{2}:\d{2})$/.test(cursor.updatedAt) ||
          !Number.isFinite(Date.parse(cursor.updatedAt)) ||
          !/^[a-zA-Z0-9_-]{1,160}$/.test(cursor.id)) throw new Error();
    } catch {
      throw new Error("INVALID_PAGINATION");
    }
  }
  return { limit, cursor };
}

function paginateQuery(query, { limit, cursor }) {
  // Keep the original timestamp precision; converting to Date would lose microseconds.
  if (cursor) {
    query = query.or(
      `updated_at.lt.${cursor.updatedAt},and(updated_at.eq.${cursor.updatedAt},id.lt.${cursor.id})`,
    );
  }
  return query.order("updated_at", { ascending: false })
    .order("id", { ascending: false }).limit(limit + 1);
}

function pageResult(rows, limit, map) {
  const hasMore = rows.length > limit;
  const page = rows.slice(0, limit);
  const last = page.at(-1);
  return {
    items: page.map(map),
    hasMore,
    nextCursor: hasMore && last ? Buffer.from(JSON.stringify({
      updatedAt: last.updated_at, id: last.id,
    })).toString("base64url") : null,
  };
}

module.exports = { readPagination, paginateQuery, pageResult };
