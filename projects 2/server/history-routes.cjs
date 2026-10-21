const express = require("express");
const { createRequireUser } = require("./history-auth.cjs");
const {
  HistoryRepositoryError,
  createHistoryRepository,
} = require("./history-repository.cjs");
const { getSupabaseServiceClient } = require("./supabase-client.cjs");

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_SNAPSHOT_BYTES = 5 * 1024 * 1024;

function validateSnapshot(snapshot) {
  const hasInvalidShape =
    !snapshot ||
    typeof snapshot !== "object" ||
    Array.isArray(snapshot) ||
    !Number.isInteger(snapshot.schemaVersion) ||
    snapshot.schemaVersion < 1 ||
    typeof snapshot.savedAt !== "string" ||
    Number.isNaN(Date.parse(snapshot.savedAt)) ||
    !snapshot.editor ||
    typeof snapshot.editor !== "object" ||
    !Array.isArray(snapshot.editor.pages);
  if (hasInvalidShape) {
    return false;
  }
  try {
    return Buffer.byteLength(JSON.stringify(snapshot), "utf8") <=
      MAX_SNAPSHOT_BYTES;
  } catch {
    return false;
  }
}

function validateProjectId(value) {
  return UUID_PATTERN.test(String(value || ""));
}

function sendError(res, error) {
  const statusByCode = {
    INVALID_SNAPSHOT: 400,
    UNAUTHENTICATED: 401,
    PROJECT_FORBIDDEN: 403,
    PROJECT_NOT_FOUND: 404,
    VERSION_CONFLICT: 409,
    STORAGE_ERROR: 500,
  };
  const code =
    error instanceof HistoryRepositoryError
      ? error.code
      : "STORAGE_ERROR";
  return res.status(statusByCode[code] || 500).json({
    success: false,
    code,
    error:
      code === "STORAGE_ERROR"
        ? "项目历史服务暂时不可用"
        : error.message,
  });
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

  router.use(requireUser);

  router.get("/me", (req, res) => {
    res.json({ success: true, data: req.historyUser });
  });

  router.get("/projects", async (req, res) => {
    try {
      const projects = await getRepository().listProjects(req.historyUser.id);
      res.json({ success: true, data: { projects } });
    } catch (error) {
      sendError(res, error);
    }
  });

  router.post("/projects", async (req, res) => {
    const name = String(req.body?.name || "").trim();
    const snapshot = req.body?.snapshot;
    if (!name || name.length > 120 || !validateSnapshot(snapshot)) {
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
