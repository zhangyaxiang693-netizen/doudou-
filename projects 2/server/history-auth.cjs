const path = require("path");

class IdentityUnavailableError extends Error {
  constructor(message = "Project history identity adapter is not configured") {
    super(message);
    this.name = "IdentityUnavailableError";
    this.code = "IDENTITY_UNAVAILABLE";
  }
}

function normalizeUser(user) {
  if (!user || typeof user !== "object") return null;

  const id = String(user.id || user.unionId || user.openId || "").trim();
  if (!id) return null;

  return {
    id,
    name: String(user.name || user.displayName || "").trim(),
    avatarUrl: String(user.avatarUrl || user.avatar_url || "").trim(),
  };
}

function loadConfiguredResolver() {
  const configuredPath = String(
    process.env.PROJECT_HISTORY_AUTH_ADAPTER || "",
  ).trim();
  if (!configuredPath) {
    throw new IdentityUnavailableError();
  }

  const modulePath = path.isAbsolute(configuredPath)
    ? configuredPath
    : path.resolve(__dirname, "..", configuredPath);
  const adapter = require(modulePath);
  const resolver =
    typeof adapter === "function" ? adapter : adapter.resolveUser;

  if (typeof resolver !== "function") {
    throw new IdentityUnavailableError(
      "PROJECT_HISTORY_AUTH_ADAPTER must export resolveUser(req)",
    );
  }
  return resolver;
}

let configuredResolver;

async function resolveTrustedUser(req) {
  configuredResolver ||= loadConfiguredResolver();
  return normalizeUser(await configuredResolver(req));
}

function createRequireUser(resolveUser = resolveTrustedUser) {
  return async function requireUser(req, res, next) {
    try {
      const user = normalizeUser(await resolveUser(req));
      if (!user) {
        return res.status(401).json({
          success: false,
          code: "UNAUTHENTICATED",
          error: "请先登录",
        });
      }
      req.historyUser = user;
      return next();
    } catch (error) {
      if (error instanceof IdentityUnavailableError) {
        return res.status(503).json({
          success: false,
          code: error.code,
          error: "项目历史服务尚未接入部署平台登录态",
        });
      }
      return next(error);
    }
  };
}

module.exports = {
  IdentityUnavailableError,
  createRequireUser,
  normalizeUser,
  resolveTrustedUser,
};
