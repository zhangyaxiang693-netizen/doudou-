const crypto = require("crypto");
const express = require("express");
const { createAdminToken } = require("./admin-token.cjs");

const DEFAULT_ADMIN_PASSWORD = "zhangyaxiang";
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000;

function passwordsMatch(actual, expected) {
  const actualBuffer = Buffer.from(String(actual || ""), "utf8");
  const expectedBuffer = Buffer.from(String(expected || ""), "utf8");
  if (actualBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

function createAdminAccessRouter(options = {}) {
  const router = express.Router();
  const password =
    options.password ??
    process.env.ADMIN_ACCESS_PASSWORD ??
    DEFAULT_ADMIN_PASSWORD;
  const now = options.now || Date.now;

  router.get("/status", (req, res) => {
    res.json({
      success: true,
      data: { unlocked: Boolean(req.session?.adminUnlocked) },
    });
  });

  router.post("/unlock", async (req, res) => {
    const attempts = req.session?.adminUnlockAttempts || {
      count: 0,
      lockedUntil: 0,
    };
    if (attempts.lockedUntil > now()) {
      return res.status(429).json({
        success: false,
        code: "ADMIN_LOCKED",
        error: "密码错误次数过多，请稍后再试",
      });
    }

    if (!passwordsMatch(req.body?.password, password)) {
      attempts.count += 1;
      if (attempts.count >= MAX_FAILED_ATTEMPTS) {
        attempts.count = 0;
        attempts.lockedUntil = now() + LOCKOUT_MS;
      }
      req.session.adminUnlockAttempts = attempts;
      await new Promise((resolve) => setTimeout(resolve, 250));
      return res.status(401).json({
        success: false,
        code: "ADMIN_PASSWORD_INVALID",
        error: "后台密码错误",
      });
    }

    req.session.adminUnlocked = true;
    req.session.adminUnlockAttempts = { count: 0, lockedUntil: 0 };
    return res.json({
      success: true,
      data: { unlocked: true, token: createAdminToken() },
    });
  });

  router.post("/lock", (req, res) => {
    req.session.adminUnlocked = false;
    res.json({ success: true, data: { unlocked: false } });
  });

  return router;
}

function requireAdminAccess(req, res, next) {
  if (!req.session?.adminUnlocked) {
    return res.status(403).json({
      success: false,
      code: "ADMIN_LOCKED",
      error: "请先输入后台密码",
    });
  }
  return next();
}

module.exports = {
  createAdminAccessRouter,
  requireAdminAccess,
};
