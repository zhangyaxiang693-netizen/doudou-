const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function createSessionOptions(store) {
  return {
    secret: process.env.SESSION_SECRET || "h5-builder-secret-key-change-in-production",
    store, resave: false, saveUninitialized: false, rolling: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true, sameSite: "lax", maxAge: SESSION_TTL_MS,
    },
  };
}

function renewAuthenticatedSession(req, res, next) {
  if (req.session?.user) req.session.cookie.maxAge = SESSION_TTL_MS;
  next();
}

module.exports = { SESSION_TTL_MS, createSessionOptions, renewAuthenticatedSession };
