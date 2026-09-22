// Project history 在线身份适配器。
// 从部署平台已校验的飞书登录 Session(req.session.user)解析当前用户。
// id 优先级: 稳定内部用户 ID(employeeId/userId) -> union_id -> open_id。
// 身份一律取自可信 Session，禁止读取 X-User-Id / 请求正文 / 查询参数。
async function resolveUser(req) {
  const user = req.session && req.session.user;
  if (!user || typeof user !== "object") return null;

  const id =
    String(user.employeeId || user.userId || "").trim() ||
    String(user.unionId || "").trim() ||
    String(user.openId || "").trim();
  if (!id) return null;

  return {
    id,
    name: String(user.name || "").trim(),
    avatarUrl: String(user.avatar || "").trim(),
  };
}

module.exports = { resolveUser };