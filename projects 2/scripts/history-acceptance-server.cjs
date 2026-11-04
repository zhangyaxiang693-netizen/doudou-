// Isolated acceptance runner: no .env loading and no Supabase network client.
const path = require("node:path");
const fs = require("node:fs/promises");
const express = require("express");
const session = require("express-session");
const { createHistoryRouter } = require("../server/history-routes.cjs");
const { createHistoryRepository } = require("../server/history-repository.cjs");
const { createCollaborationRouter } = require("../server/collaboration-routes.cjs");
const { createCollaborationRepository } = require("../server/collaboration-repository.cjs");
const { createSessionOptions, renewAuthenticatedSession } = require("../server/session-options.cjs");
const { historyRequestContext, sendHistoryError } = require("../server/history-http.cjs");
const { MAX_REQUEST_BYTES } = require("../server/project-record-contract.cjs");
const root = path.resolve(__dirname, "..");
const identifier = (value) => {
  if (!/^[a-z_][a-z0-9_]*$/i.test(value)) throw new Error("Invalid SQL identifier");
  return `"${value}"`;
};

function createSqlClient(db) {
  return {
    async rpc(name, args) {
      const entries = Object.entries(args);
      try {
        const result = await db.query(`select public.${identifier(name)}(${entries.map(([key], i) =>
          `${identifier(key)}=>$${i + 1}`).join(",")}) as result`,
        entries.map(([, value]) => value && typeof value === "object" ? JSON.stringify(value) : value));
        return { data: result.rows[0].result };
      } catch (error) { return { error }; }
    },
    from(table) {
      let columns = "*", single = false, maximum, upsert, update, deleting = false;
      const where = [], order = [], parameters = [];
      const parameter = (value) => { parameters.push(value); return `$${parameters.length}`; };
      const query = {
        select(value) { columns = value.split(",").map((column) => {
          if (["updated_at", "created_at"].includes(column)) {
            return `to_char(${identifier(column)} at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.US"Z"') as ${identifier(column)}`;
          }
          return identifier(column);
        }).join(","); return query; },
        eq(column, value) { where.push(`${identifier(column)}=${parameter(value)}`); return query; },
        lt(column, value) { where.push(`${identifier(column)}<${parameter(value)}`); return query; },
        is(column, value) {
          if (value !== null) throw new Error("Only null checks supported");
          where.push(`${identifier(column)} is null`); return query;
        },
        order(column, { ascending = true } = {}) { order.push(`${identifier(column)} ${ascending ? "asc" : "desc"}`); return query; },
        limit(value) { maximum = Number(value); return query; },
        or(value) {
          const match = value.match(/^updated_at\.lt\.(.+),and\(updated_at\.eq\.(.+),id\.lt\.([a-zA-Z0-9_-]+)\)$/);
          if (!match || match[1] !== match[2]) throw new Error("Invalid pagination");
          where.push(`(updated_at,id)<(${parameter(match[1])}::timestamptz,${parameter(match[3])}::text)`);
          return query;
        },
        maybeSingle() { single = true; return query; },
        upsert(value) { upsert = value; return query; },
        update(value) { update = value; return query; },
        delete() { deleting = true; return query; },
        async then(resolve, reject) {
          try {
            let sql;
            if (upsert) {
              const keys = Object.keys(upsert);
              sql = `insert into ${identifier(table)}(${keys.map(identifier)}) values(${keys.map((key) =>
                parameter(upsert[key]))}) on conflict(id) do update set ${keys.filter((key) => key !== "id")
                .map((key) => `${identifier(key)}=excluded.${identifier(key)}`).join(",")}`;
            } else if (update || deleting) {
              sql = deleting ? `delete from ${identifier(table)}`
                : `update ${identifier(table)} set ${Object.keys(update).map((key) =>
                  `${identifier(key)}=${parameter(update[key])}`).join(",")}`;
              sql += where.length ? ` where ${where.join(" and ")}` : "";
            } else {
              sql = `select ${columns} from ${identifier(table)}${where.length ? ` where ${where.join(" and ")}` : ""}` +
                `${order.length ? ` order by ${order.join(",")}` : ""}${maximum ? ` limit ${maximum}` : ""}`;
            }
            const result = await db.query(sql, parameters);
            resolve({ data: single ? result.rows[0] || null : result.rows });
          } catch (error) { resolve({ error }); }
        },
      };
      return query;
    },
  };
}

async function startAcceptanceServer({ port = 5091 } = {}) {
  if (!process.env.PGLITE_MODULE_PATH) throw new Error("PGLITE_MODULE_PATH is required; never use a production database");
  const { PGlite } = require(process.env.PGLITE_MODULE_PATH);
  const db = new PGlite();
  await db.exec("create role anon; create role authenticated; create role service_role;");
  const files = (await fs.readdir(path.join(root, "supabase/migrations"))).filter((file) => file.endsWith(".sql")).sort();
  for (const file of files) {
    await db.exec((await fs.readFile(path.join(root, "supabase/migrations", file), "utf8"))
      .replace("create extension if not exists pgcrypto;", ""));
  }
  const client = createSqlClient(db);
  const history = createHistoryRepository(client);
  const collaboration = createCollaborationRepository(client);
  await collaboration.sync({ id: "test-a", name: "隔离验收用户A" },
    { users: [], teams: [{ id: "acceptance-team", name: "隔离验收组" }], records: [] });
  const app = express();
  app.use(historyRequestContext);
  app.use(express.json({ limit: MAX_REQUEST_BYTES }));
  app.use(session({ ...createSessionOptions(new session.MemoryStore()), secret: "isolated-acceptance-only", cookie: { maxAge: 30 * 86400000, httpOnly: true, sameSite: "lax" } }));
  app.use(renewAuthenticatedSession);
  const user = (id) => ({ id, employeeId: id, name: id === "test-b" ? "隔离验收用户B" : "隔离验收用户A" });
  app.use((req, res, next) => {
    if (!req.session.initialized) { req.session.initialized = true; req.session.user = user("test-a"); }
    next();
  });
  app.get("/api/auth/me", (req, res) => res.json({ success: true, data: req.session.user || null }));
  app.get("/api/auth/login", (req, res) => { req.session.user = user("test-a"); res.redirect("/?historyReauth=1"); });
  app.post("/__history_test/session", (req, res) => {
    req.session.user = req.body.id ? user(req.body.id) : null;
    res.json({ success: true });
  });
  app.post("/__history_test/lose-next-response", (req, res) => { req.session.loseResponse = true; res.json({ success: true }); });
  app.use((req, res, next) => {
    const isSave = req.method === "PUT" && /^\/api\/project-records\/[^/]+$/.test(req.path) ||
      req.method === "POST" && /^\/api\/project-records\/[^/]+\/uploads\/[^/]+\/commit$/.test(req.path);
    if (req.session.loseResponse && isSave) {
      req.session.loseResponse = false;
      req.session.save(() => {});
      const json = res.json.bind(res);
      res.json = (body) => {
        if (body.success && body.data?.record) { res.socket?.destroy(); return res; }
        return json(body);
      };
    }
    next();
  });
  const resolveUser = (req) => req.session.user;
  app.post("/api/admin/lock", (req, res) => res.json({ success: true, data: { unlocked: false } }));
  app.use("/api/collaboration", createCollaborationRouter({ repository: collaboration, resolveUser }));
  app.use("/api", createHistoryRouter({ repository: history, resolveUser }));
  app.use((error, req, res, next) => sendHistoryError(res, { code: error.type === "entity.too.large" ? "SNAPSHOT_TOO_LARGE" : "INVALID_SNAPSHOT" }));
  app.use(express.static(path.join(root, "dist")));
  app.use((req, res) => res.sendFile(path.join(root, "dist/index.html")));
  const server = await new Promise((resolve) => {
    const running = app.listen(port, "127.0.0.1", () => resolve(running));
  });
  console.log(`Isolated history acceptance server: http://127.0.0.1:${server.address().port}`);
  return { server, db, client, close: async () => { await new Promise((resolve) => server.close(resolve)); await db.close(); } };
}

if (require.main === module) startAcceptanceServer({ port: Number(process.env.HISTORY_ACCEPTANCE_PORT || 5091) })
  .catch((error) => { console.error(error.message); process.exitCode = 1; });
module.exports = { startAcceptanceServer, createSqlClient };
