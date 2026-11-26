const session = require("express-session");
const { SupabaseSessionStore } = require("./supabase-session-store.cjs");

function createSessionStore(env = process.env) {
  if (
    env.NODE_ENV === "development" &&
    env.LOCAL_PREVIEW_SESSION_STORE === "memory"
  ) {
    return new session.MemoryStore();
  }
  return new SupabaseSessionStore();
}

module.exports = { createSessionStore };
