export class CollaborationApiError extends Error {
  constructor(message, { status = 0, code = "NETWORK_ERROR" } = {}) {
    super(message);
    this.name = "CollaborationApiError";
    this.status = status;
    this.code = code;
  }
}

let adminToken = null;

export function setAdminToken(token) {
  adminToken = token || null;
}

export function getAdminToken() {
  return adminToken;
}

async function request(path, options = {}) {
  let response;
  try {
    const headers = { ...options.headers };
    if (adminToken) headers["x-admin-token"] = adminToken;
    response = await fetch(`/api${path}`, {
      credentials: "same-origin",
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
    });
  } catch {
    throw new CollaborationApiError("协作服务暂时无法连接");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new CollaborationApiError(
      result?.error || `请求失败（${response.status}）`,
      {
        status: response.status,
        code: result?.code || "REQUEST_FAILED",
      },
    );
  }
  return result.data;
}

export async function getCollaborationState() {
  const data = await request("/collaboration/bootstrap");
  return data.state;
}

export async function syncCollaborationState(state) {
  const data = await request("/collaboration/sync", {
    method: "PUT",
    body: JSON.stringify({ state }),
  });
  return data.state;
}

export async function overrideCollaborationRecord(recordId, changes) {
  const data = await request(
    `/collaboration/records/${encodeURIComponent(recordId)}`,
    {
      method: "PATCH",
      body: JSON.stringify(changes),
    },
  );
  return data.record;
}

export async function getAdminAccessStatus() {
  const data = await request("/admin/status");
  return Boolean(data.unlocked);
}

export async function unlockAdminAccess(password) {
  const data = await request("/admin/unlock", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  if (data.token) setAdminToken(data.token);
  return Boolean(data.unlocked);
}

export function lockAdminAccess() {
  setAdminToken(null);
  return request("/admin/lock", { method: "POST" });
}
