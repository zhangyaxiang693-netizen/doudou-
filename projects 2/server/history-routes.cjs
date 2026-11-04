const express = require("express");
const { createRequireUser } = require("./history-auth.cjs");
const {
  HistoryRepositoryError,
  createHistoryRepository,
} = require("./history-repository.cjs");
const { getSupabaseServiceClient } = require("./supabase-client.cjs");
const { extractAdminFromRequest } = require("./admin-token.cjs");
const { historyRequestContext, sendHistoryError } = require("./history-http.cjs");
const { RECORD_ID_PATTERN, OPERATION_ID_PATTERN, snapshotError } = require("./project-record-contract.cjs");

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function validateSnapshot(snapshot) {
  return !snapshotError(snapshot);
}

function validateProjectId(value) {
  return UUID_PATTERN.test(String(value || ""));
}

function sendError(res, error) {
  return sendHistoryError(res, error);
}

function createHistoryRouter(options = {}) {
  const router = express.Router();
  const requireUser =
    options.requireUser || createRequireUser(options.resolveUser);
  let repository = options.repository || null;
  const getRepository = () => {
    repository ||= createHistoryRepository(getSupabaseServiceClient());
    return repository;
  };

  router.use(historyRequestContext, requireUser);
  router.use((req, res, next) => {
    const expectedUser = req.get("X-Project-User");
    if (expectedUser && ["PUT", "POST"].includes(req.method) &&
      req.path.startsWith("/project-records/") && expectedUser !== req.historyUser.id) {
      return sendError(res, new HistoryRepositoryError("ACCOUNT_CHANGED",
        "登录账号与当前编辑账号不同，请切回原账号后保存；当前编辑已保留"));
    }
    next();
  });

  router.get("/project-records", async (req, res) => {
    try {
      const page = await getRepository().listRecords(req.historyUser, req.query, extractAdminFromRequest(req));
      res.json({ success: true, data: page });
    } catch (error) { sendError(res, error); }
  });

  router.get("/project-records/:recordId", async (req, res) => {
    try {
      const record = await getRepository().getRecord(req.historyUser, req.params.recordId, extractAdminFromRequest(req));
      res.json({ success: true, data: { record } });
    } catch (error) { sendError(res, error); }
  });

  router.put("/project-records/:recordId", async (req, res) => {
    const body = req.body || {};
    if (!RECORD_ID_PATTERN.test(req.params.recordId) || !OPERATION_ID_PATTERN.test(body.operationId || "") ||
        (body.create !== undefined && typeof body.create !== "boolean")) {
      return sendError(res, new HistoryRepositoryError("INVALID_OPERATION", "保存请求标识无效"));
    }
    const invalid = snapshotError(body.snapshot);
    const name = String(body.name || "").trim();
    if (invalid || !name || name.length > 120) {
      return sendError(res, new HistoryRepositoryError(invalid || "INVALID_SNAPSHOT",
        invalid === "SNAPSHOT_TOO_LARGE" ? "单条项目超过32MiB，当前编辑已保留" : "项目名称或数据格式无效"));
    }
    const input = {
      name, snapshot: body.snapshot, operationId: body.operationId, create: Boolean(body.create),
      ...(body.scope !== undefined ? { scope: body.scope } : {}),
      ...(body.teamId !== undefined ? { teamId: body.teamId } : {}),
    };
    try {
      const result = await getRepository().writeRecord(req.historyUser, req.params.recordId,
        input, extractAdminFromRequest(req));
      res.json({ success: true, data: result });
    } catch (error) { sendError(res, error); }
  });

  router.delete("/project-records/:recordId", async (req, res) => {
    try {
      await getRepository().deleteRecord(req.historyUser, req.params.recordId, extractAdminFromRequest(req));
      res.json({ success: true });
    } catch (error) { sendError(res, error); }
  });

  router.put("/project-records/:recordId/uploads/:operationId/:partIndex", async (req, res) => {
    try {
      await getRepository().stageUpload(req.historyUser, req.params.recordId, req.params.operationId,
        Number(req.params.partIndex), req.body);
      res.json({ success: true });
    } catch (error) { sendError(res, error); }
  });

  router.post("/project-records/:recordId/uploads/:operationId/commit", async (req, res) => {
    try {
      const result = await getRepository().commitUpload(req.historyUser, req.params.recordId,
        req.params.operationId, extractAdminFromRequest(req));
      res.json({ success: true, data: result });
    } catch (error) { sendError(res, error); }
  });

  router.get("/me", (req, res) => {
    res.json({ success: true, data: req.historyUser });
  });

  router.get("/projects", async (req, res) => {
    try {
      const page = await getRepository().listProjects(req.historyUser.id, req.query);
      res.json({ success: true, data: page });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.post("/projects", async (req, res) => {
    const name = String(req.body?.name || "").trim();
    const snapshot = req.body?.snapshot;
    if (!name || name.length > 120 || !validateSnapshot(snapshot) ||
        (req.body?.scope && !["personal", "team"].includes(req.body.scope)) ||
        (req.body?.scope === "team" && !String(req.body.teamId || "").trim())) {
      return sendError(
        res,
        new HistoryRepositoryError(
          "INVALID_SNAPSHOT",
          "项目名称或快照格式无效",
        ),
      );
    }

    try {
      const result = await getRepository().createProject(
        req.historyUser.id,
        {
          name,
          prdUrl: String(req.body?.prdUrl || "").trim(),
          templateId: String(req.body?.templateId || "").trim(),
          snapshot,
          scope: req.body?.scope === "team" ? "team" : "personal",
          teamId: req.body?.scope === "team" ? String(req.body.teamId).trim() : null,
        },
      );
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.patch("/projects/:projectId", async (req, res) => {
    const name = String(req.body?.name || "").trim();
    if (
      !validateProjectId(req.params.projectId) ||
      !name ||
      name.length > 120 ||
      !validateSnapshot(req.body?.snapshot)
    ) {
      return sendError(
        res,
        new HistoryRepositoryError(
          "INVALID_SNAPSHOT",
          "项目 ID、名称或快照格式无效",
        ),
      );
    }

    try {
      const result = await getRepository().overwriteProject(
        req.historyUser.id,
        req.params.projectId,
        {
          name,
          prdUrl: String(req.body?.prdUrl || "").trim(),
          templateId: String(req.body?.templateId || "").trim(),
          snapshot: req.body.snapshot,
          baseUpdatedAt: req.body.baseUpdatedAt || null,
        },
      );
      res.json({ success: true, data: result });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get("/projects/:projectId/versions", async (req, res) => {
    if (!validateProjectId(req.params.projectId)) {
      return sendError(
        res,
        new HistoryRepositoryError("PROJECT_NOT_FOUND", "Project not found"),
      );
    }
    try {
      const versions = await getRepository().listVersions(
        req.historyUser.id,
        req.params.projectId,
      );
      res.json({ success: true, data: { versions } });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.get(
    "/projects/:projectId/versions/:versionId",
    async (req, res) => {
      if (
        !validateProjectId(req.params.projectId) ||
        !validateProjectId(req.params.versionId)
      ) {
        return sendError(
          res,
          new HistoryRepositoryError(
            "PROJECT_NOT_FOUND",
            "Project version not found",
          ),
        );
      }
      try {
        const version = await getRepository().getVersion(
          req.historyUser.id,
          req.params.projectId,
          req.params.versionId,
        );
        res.json({ success: true, data: { version } });
      } catch (error) {
        sendError(res, error);
      }
    },
  );

  router.delete("/projects/:projectId", async (req, res) => {
    if (!validateProjectId(req.params.projectId)) {
      return sendError(
        res,
        new HistoryRepositoryError("PROJECT_NOT_FOUND", "Project not found"),
      );
    }
    try {
      await getRepository().deleteProject(
        req.historyUser.id,
        req.params.projectId,
      );
      res.json({ success: true });
    } catch (error) {
      sendError(res, error);
    }
  });

  return router;
}

module.exports = {
  createHistoryRouter,
  validateSnapshot,
};
