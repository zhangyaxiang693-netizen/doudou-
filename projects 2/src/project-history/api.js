export class ProjectHistoryApiError extends Error {
  constructor(message, { status = 0, code = "NETWORK_ERROR" } = {}) {
    super(message);
    this.name = "ProjectHistoryApiError";
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      credentials: "same-origin",
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch (error) {
    throw new ProjectHistoryApiError("网络连接失败，本次修改已保存在本地", {
      code: "NETWORK_ERROR",
    });
  }

  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new ProjectHistoryApiError(
      result?.error || `请求失败（${response.status}）`,
      {
        status: response.status,
        code: result?.code || "REQUEST_FAILED",
      },
    );
  }
  return result.data;
}

export function getCurrentUser() {
  return request("/me");
}

export async function listProjects() {
  const data = await request("/projects");
  return data.projects || [];
}

export function createProject({ name, prdUrl, templateId, snapshot }) {
  return request("/projects", {
    method: "POST",
    body: JSON.stringify({ name, prdUrl, templateId, snapshot }),
  });
}

export function saveAutosave(projectId, { baseVersionId, snapshot }) {
  return request(`/projects/${encodeURIComponent(projectId)}/autosave`, {
    method: "PUT",
    body: JSON.stringify({ baseVersionId, snapshot }),
  });
}

export function createVersion(projectId, { baseVersionId, snapshot }) {
  return request(`/projects/${encodeURIComponent(projectId)}/versions`, {
    method: "POST",
    body: JSON.stringify({ baseVersionId, snapshot }),
  });
}

export async function listVersions(projectId) {
  const data = await request(
    `/projects/${encodeURIComponent(projectId)}/versions`,
  );
  return data.versions || [];
}

export async function getVersion(projectId, versionId) {
  const data = await request(
    `/projects/${encodeURIComponent(projectId)}/versions/${encodeURIComponent(
      versionId,
    )}`,
  );
  return data.version;
}

export function deleteProject(projectId) {
  return request(`/projects/${encodeURIComponent(projectId)}`, {
    method: "DELETE",
  });
}
