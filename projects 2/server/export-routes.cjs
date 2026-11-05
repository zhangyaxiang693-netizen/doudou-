const express = require("express");
const crypto = require("node:crypto");
const { Readable } = require("node:stream");
const { pipeline } = require("node:stream/promises");
const { createRequireUser } = require("./history-auth.cjs");
const { extractAdminFromRequest } = require("./admin-token.cjs");
const { snapshotError, OPERATION_ID_PATTERN } = require("./project-record-contract.cjs");
const { ExportRepository, ExportError } = require("./export-repository.cjs");
const { advanceExportJob, publicJob } = require("./export-jobs.cjs");

function createExportRouter(options = {}) {
  const router = express.Router();
  const repository = options.repository || new ExportRepository();
  let renderer = options.renderer;
  let advancing = false;
  const getRenderer = () => renderer ||= new (require("./export-renderer.cjs").ExportRenderer)();
  router.use(createRequireUser(options.resolveUser));
  router.use((req, res, next) => {
    res.setHeader("Cache-Control", "private, no-store");
    const expectedUser = req.headers["x-export-user"] || req.query.user;
    if (expectedUser && expectedUser !== req.historyUser.id) {
      return res.status(401).json({ success: false, code: "ACCOUNT_CHANGED", error: "登录账号已变化，请切回原账号继续导出" });
    }
    next();
  });
  const send = (res, job) => res.json({ success: true, data: publicJob(job) });
  const ownedJob = async (req) => {
    if (!OPERATION_ID_PATTERN.test(req.params.id)) throw new ExportError("导出任务不存在", "EXPORT_NOT_FOUND", 404);
    const job = await repository.get(req.historyUser.id, req.params.id);
    if (!job) throw new ExportError("导出任务不存在或已过期", "EXPORT_NOT_FOUND", 404);
    return job;
  };
  router.get("/", async (req, res) => res.json({ success: true, data: (await repository.list(req.historyUser.id)).map(publicJob) }));
  router.post("/", async (req, res) => {
    const input = req.body;
    const selection = input?.selection;
    if (!OPERATION_ID_PATTERN.test(input?.id || "") || !["png", "zip", "gif"].includes(input?.format) ||
        !["single", "module", "all", "selected", "admin"].includes(selection?.kind)) {
      throw new ExportError("导出参数无效", "EXPORT_INVALID", 400);
    }
    if (selection.kind === "selected") {
      if (!Array.isArray(selection.entryIds) || !selection.entryIds.length ||
          selection.entryIds.length > 2000 ||
          selection.entryIds.some((id) => typeof id !== "string" || !id.trim() || id.length > 512)) {
        throw new ExportError("请选择 1–2000 张有效切图", "EXPORT_INVALID", 400);
      }
      selection.entryIds = [...new Set(selection.entryIds)];
    }
    const issue = snapshotError(input.snapshot);
    if (issue) throw new ExportError("活动内容无效或超过 32MB", issue, 400);
    const { validateProjectSnapshot } = await import("../src/project-history/snapshot.js");
    if (!validateProjectSnapshot(input.snapshot)) throw new ExportError("活动快照格式无效", "EXPORT_INVALID", 400);
    if (selection.kind === "admin") {
      if (!extractAdminFromRequest(req)) throw new ExportError("请先解锁后台", "ADMIN_LOCKED", 403);
      if (input.format !== "png" || !input.verifier || typeof input.verifier !== "object") {
        throw new ExportError("组件验证器参数无效", "EXPORT_INVALID", 400);
      }
    } else if (input.verifier) throw new ExportError("导出参数无效", "EXPORT_INVALID", 400);
    if (["all", "module", "selected"].includes(selection.kind) !== (input.format === "zip")) {
      throw new ExportError("导出格式与选择范围不一致", "EXPORT_INVALID", 400);
    }
    if (input.format === "gif" && selection.kind !== "single") throw new ExportError("GIF 只能逐张生成", "EXPORT_INVALID", 400);
    const extension = input.format;
    const filename = `${String(input.filename || "切图").replace(/[\\/:*?"<>|\x00-\x1f]/g, "_").slice(0, 120).replace(/\.(png|gif|zip)$/i, "")}.${extension}`;
    const hash = crypto.createHash("sha256").update(JSON.stringify(input)).digest("hex");
    send(res, await repository.create(req.historyUser.id, input, hash, getRenderer().buildId, filename));
  });
  router.get("/:id", async (req, res) => send(res, await ownedJob(req)));
  router.post("/:id/advance", async (req, res) => {
    const current = await ownedJob(req);
    if (["ready", "failed", "cancelled"].includes(current.status)) return send(res, current);
    if (advancing) return send(res, current);
    advancing = true;
    try {
      const lease = crypto.randomUUID();
      const job = await repository.claim(req.historyUser.id, current.id, lease);
      if (!job?.id) return send(res, await ownedJob(req));
      try {
        const updated = await advanceExportJob({ job, lease, repository, renderer: getRenderer() });
        return send(res, updated);
      } catch (error) {
        if (error.code === "EXPORT_LEASE_LOST") return send(res, await ownedJob(req));
        console.error("[export-job]", job.id, error.message);
        const message = error instanceof ExportError ? error.message : `生成失败：${String(error.message || "未知错误").slice(0, 220)}`;
        try { await repository.checkpoint(job, lease, job.progress_json, "failed", message); }
        catch (writeError) { if (writeError.code !== "EXPORT_LEASE_LOST") throw writeError; }
        return send(res, await ownedJob(req));
      }
    } finally { advancing = false; }
  });
  router.post("/:id/retry", async (req, res) => {
    await ownedJob(req);
    send(res, await repository.change(req.historyUser.id, req.params.id, "retry"));
  });
  router.post("/:id/cancel", async (req, res) => {
    await ownedJob(req);
    send(res, await repository.change(req.historyUser.id, req.params.id, "cancel"));
  });
  router.get("/:id/download", async (req, res) => {
    const job = await ownedJob(req), result = job.progress_json?.result;
    if (job.status !== "ready" || !result) throw new ExportError("文件尚未生成完成", "EXPORT_NOT_READY", 409);
    let start = 0, end = result.size - 1;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2])) return res.status(416).set("Content-Range", `bytes */${result.size}`).end();
      if (!match[1]) start = Math.max(0, result.size - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
      if (start > end || start >= result.size) return res.status(416).set("Content-Range", `bytes */${result.size}`).end();
      res.status(206).set("Content-Range", `bytes ${start}-${end}/${result.size}`);
    }
    res.set({
      "Content-Type": result.mime, "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes", "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `attachment; filename="export.${result.mime === "application/zip" ? "zip" : result.mime === "image/gif" ? "gif" : "png"}"; filename*=UTF-8''${encodeURIComponent(job.filename).replace(/'/g, "%27")}`,
    });
    async function* stream() {
      let offset = 0;
      for (let page = 0; page < result.parts; page += 1000) {
        const rows = await repository.partSizes(job, result.fileIndex, page, Math.min(result.parts - 1, page + 999));
        for (const row of rows) {
          if (res.destroyed || offset > end) return;
          const next = offset + row.byte_count;
          if (next > start) {
            const bytes = await repository.getChunk(job, result.fileIndex, row.part_index);
            yield bytes.subarray(Math.max(0, start - offset), Math.min(bytes.length, end - offset + 1));
          }
          offset = next;
        }
      }
      if (offset < end + 1) throw new ExportError("下载文件不完整，请重试");
    }
    try { await pipeline(Readable.from(stream()), res); }
    catch (error) { if (!res.destroyed) res.destroy(error); }
  });
  router.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (!(error instanceof ExportError)) console.error("[exports]", error.message);
    res.status(error.status || 503).json({
      success: false, code: error.code || "EXPORT_UNAVAILABLE",
      error: error instanceof ExportError ? error.message : "导出服务暂时不可用，请稍后重试",
    });
  });
  return router;
}
module.exports = { createExportRouter };
