const crypto = require("crypto");

const TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const SECRET_KEY =
  (process.env.SESSION_SECRET || "h5-builder-secret-key-change-in-production") +
  ":admin";

function createAdminToken() {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expected = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data.exp === "number" && Date.now() < data.exp;
  } catch {
    return false;
  }
}

function extractAdminFromRequest(req) {
  return (
    Boolean(req.session?.adminUnlocked) || verifyAdminToken(req.get("x-admin-token"))
  );
}

module.exports = {
  createAdminToken,
  verifyAdminToken,
  extractAdminFromRequest,
};