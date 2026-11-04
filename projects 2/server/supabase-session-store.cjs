const session = require("express-session");
const { getSupabaseServiceClient } = require("./supabase-client.cjs");
const { SESSION_TTL_MS } = require("./session-options.cjs");

const DEFAULT_TTL_MS = SESSION_TTL_MS;
const DEFAULT_TIDY_INTERVAL_MS = 30 * 60 * 1000;

// 把 express-session 的登录态存到 Supabase 的表（默认 public.sessions）。
// 相比默认的内存 MemoryStore，本 store 让登录态跨 FaaS 实例重启/缩容不丢失。
// 身份数据敏感，仅用 service_role 客户端读写（表已 revoke 掉 anon / authenticated）。
class SupabaseSessionStore extends session.Store {
  constructor(options = {}) {
    super(options);
    this.table = options.table || "sessions";
    this.tidyIntervalMs = options.tidyIntervalMs || DEFAULT_TIDY_INTERVAL_MS;
    this.timer = setInterval(() => {
      this.tidy().catch(() => {});
    }, this.tidyIntervalMs);
    if (this.timer && typeof this.timer.unref === "function") {
      this.timer.unref();
    }
  }

  close() {
    if (this.timer) clearInterval(this.timer);
  }

  _client() {
    this.client ||= getSupabaseServiceClient();
    return this.client;
  }

  _expireMs(sess) {
    const expires = sess && sess.cookie && sess.cookie.expires;
    if (expires) {
      const t = new Date(expires).getTime();
      if (!Number.isNaN(t)) return t;
    }
    const maxAge =
      sess && sess.cookie && Number(sess.cookie.maxAge)
        ? Number(sess.cookie.maxAge)
        : DEFAULT_TTL_MS;
    return Date.now() + maxAge;
  }

  get(sid, callback) {
    this._client()
      .from(this.table)
      .select("sess,expire")
      .eq("id", String(sid))
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) return callback(error);
        if (!data) return callback(null, null);
        if (new Date(data.expire) <= new Date()) {
          return this.destroy(sid, (destroyError) =>
            destroyError ? callback(destroyError) : callback(null, null),
          );
        }
        callback(null, data.sess);
      })
      .catch(callback);
  }

  set(sid, sess, callback) {
    const expire = new Date(this._expireMs(sess)).toISOString();
    this._client()
      .from(this.table)
      .upsert(
        { id: String(sid), sess, expire },
        { onConflict: "id" },
      )
      .then(({ error }) => callback(error || null))
      .catch(callback);
  }

  touch(sid, sess, callback) {
    const expire = new Date(this._expireMs(sess)).toISOString();
    this._client()
      .from(this.table)
      .update({ expire })
      .eq("id", String(sid))
      .then(({ error }) => callback(error || null))
      .catch(callback);
  }

  destroy(sid, callback) {
    this._client()
      .from(this.table)
      .delete()
      .eq("id", String(sid))
      .then(({ error }) => callback(error || null))
      .catch(callback);
  }

  tidy() {
    return this._client()
      .from(this.table)
      .delete()
      .lt("expire", new Date().toISOString());
  }
}

module.exports = { SupabaseSessionStore };
