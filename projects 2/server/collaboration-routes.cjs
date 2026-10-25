const express = require("express");
const { createRequireUser } = require("./history-auth.cjs");
const {
  CollaborationRepositoryError,
  createCollaborationRepository,
} = require("./collaboration-repository.cjs");
const { getSupabaseServiceClient } = require("./supabase-client.cjs");
const { extractAdminFromRequest } = require("./admin-token.cjs");
const { validateSnapshot } = require("./history-routes.cjs");

function sendError(res, error) {
  const code =
    error instanceof CollaborationRepositoryError
      ? error.code
      : "STORAGE_ERROR";
  const status = {
    INVALID_SNAPSHOT: 400,
    INVALID_PAGINATION: 400,
    VERSION_CONFLICT: 409,
    RECORD_FORBIDDEN: 403,
    RECORD_NOT_FOUND: 404,
    STORAGE_ERROR: 500,
  }[code] || 500;
  return res.status(status).json({
    success: false,
    code,
    error:
      code === "STORAGE_ERROR"
        ? "协作数据服务暂时不可用"
        : error.message,
  });
}

function createCollaborationRouter(options = {}) {
  const router = express.Router();
  const requireUser =
    options.requireUser || createRequireUser(options.resolveUser);
  let repository = options.repository || null;
  const getRepository = () => {
    repository ||=
      createCollaborationRepository(getSupabaseServiceClient());
    return repository;
  };

  router.use(requireUser);

  router.get("/bootstrap", async (req, res) => {
    try {
      const state = await getRepository().bootstrap(
        req.historyUser,
        extractAdminFromRequest(req),
      );
      res.json({ success: true, data: { state } });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get("/records", async (req, res) => {
    try {
      const page = await getRepository().listRecords(
        req.historyUser, req.query, extractAdminFromRequest(req),
      );
      res.json({ success: true, data: page });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get("/records/:recordId", async (req, res) => {
    try {
      const record = await getRepository().getRecord(
        req.historyUser, String(req.params.recordId), extractAdminFromRequest(req),
      );
      res.json({ success: true, data: { record } });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.put("/sync", async (req, res) => {
    const collaborationState = req.body?.state;
    if (
      !collaborationState ||
      typeof collaborationState !== "object" ||
      !Array.isArray(collaborationState.users) ||
      !Array.isArray(collaborationState.teams) ||
      !Array.isArray(collaborationState.records)
    ) {
      return res.status(400).json({
        success: false,
        code: "INVALID_COLLABORATION_STATE",
        error: "协作数据格式无效",
      });
    }
    try {
      const state = await getRepository().sync(
        req.historyUser,
        collaborationState,
        extractAdminFromRequest(req),
      );
      res.json({ success: true, data: { state } });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.patch("/records/:recordId", async (req, res) => {
    if (!extractAdminFromRequest(req)) {
      return res.status(403).json({
        success: false,
        code: "ADMIN_LOCKED",
        error: "请先输入后台密码",
      });
    }
    const name = String(req.body?.name || "").trim();
    const snapshot = req.body?.snapshot;
    if (
      !name ||
      name.length > 120 ||
      !snapshot ||
      typeof snapshot !== "object" ||
      !validateSnapshot(snapshot)
    ) {
      return res.status(400).json({
        success: false,
        code: "INVALID_RECORD",
        error: "历史记录名称或快照格式无效",
      });
    }
    try {
      const record = await getRepository().overrideRecord(
        String(req.params.recordId),
        { name, snapshot, baseUpdatedAt: req.body.baseUpdatedAt || null },
        req.historyUser,
      );
      res.json({ success: true, data: { record } });
    } catch (error) {
      sendError(res, error);
    }
  });

  return router;
}

module.exports = { createCollaborationRouter };
