function configureSessionProxy(app, env = process.env) {
  // Production HTTPS terminates at the platform's reverse proxy.
  const hops = Number(env.TRUST_PROXY_HOPS ?? (env.NODE_ENV === "production" ? 1 : 0));
  if (!Number.isInteger(hops) || hops < 0) {
    throw new Error("TRUST_PROXY_HOPS must be a non-negative integer");
  }
  app.set("trust proxy", hops);
}

module.exports = { configureSessionProxy };
