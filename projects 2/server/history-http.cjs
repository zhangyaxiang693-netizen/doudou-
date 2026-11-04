const { randomUUID } = require("node:crypto");

function historyRequestContext(req, res, next) {
  req.historyRequestId ||= randomUUID();
  res.setHeader("X-Request-Id", req.historyRequestId);
  res.setHeader("Cache-Control", "no-store");
  next();
}

function sendHistoryError(res, error) {
  const statusByCode = {
    INVALID_SNAPSHOT: 400, INVALID_OPERATION: 400, INVALID_PAGINATION: 400,
    INVALID_GROUP: 400, DESTINATION_MISMATCH: 400, INVALID_UPLOAD: 400, INCOMPLETE_UPLOAD: 400,
    UNAUTHENTICATED: 401, ACCOUNT_CHANGED: 401, PROJECT_FORBIDDEN: 403, RECORD_FORBIDDEN: 403,
    PROJECT_NOT_FOUND: 404, RECORD_NOT_FOUND: 404,
    OPERATION_MISMATCH: 409, RECORD_EXISTS: 409, VERSION_CONFLICT: 409,
    SNAPSHOT_TOO_LARGE: 413, STORAGE_ERROR: 503,
  };
  const code = Object.hasOwn(statusByCode, error?.code) ? error.code : "STORAGE_ERROR";
  const requestId = res.req?.historyRequestId || randomUUID();
  res.setHeader("X-Request-Id", requestId);
  if (code === "STORAGE_ERROR") {
    // Correlate failures without logging the user's snapshot, cookies or credentials.
    console.error("[project-history]", { requestId, code, databaseCode: error?.cause?.code || null });
  }
  return res.status(statusByCode[code]).json({
    success: false, code, requestId,
    error: code === "STORAGE_ERROR" ? "项目保存服务暂时不可用，请保留编辑后重试" : error.message,
  });
}

module.exports = { historyRequestContext, sendHistoryError };
