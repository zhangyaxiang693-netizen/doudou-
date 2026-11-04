export class ProjectHistoryApiError extends Error {
  constructor(message, { status = 0, code = "NETWORK_ERROR", requestId = "" } = {}) {
    super(message);
    this.name = "ProjectHistoryApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

export async function request(path, { timeoutMs = 45000, ...options } = {}) {
  let response;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    response = await fetch(`/api${path}`, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      signal: controller.signal,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  const result = await response.json().catch((error) => {
    if (controller.signal.aborted) throw error;
    return null;
  });
  if (!response.ok || !result?.success) {
    throw new ProjectHistoryApiError(
      result?.error || `请求失败（${response.status}）`,
      {
        status: response.status,
        code: result?.code || (response.ok && !result ? "NETWORK_ERROR" : "REQUEST_FAILED"),
        requestId: result?.requestId || response.headers.get("X-Request-Id") || "",
      },
    );
  }
  return result.data;
  } catch (error) {
    if (error instanceof ProjectHistoryApiError) throw error;
    throw new ProjectHistoryApiError(controller.signal.aborted
      ? "保存服务响应超时，当前编辑已保留，可再次保存确认"
      : "网络连接或响应异常，当前编辑已保留，请重试", {
      code: controller.signal.aborted ? "TIMEOUT" : "NETWORK_ERROR",
    });
  } finally {
    clearTimeout(timer);
  }
}

export function getProjectRecord(id) {
  return request(`/project-records/${encodeURIComponent(id)}`).then((data) => data.record);
}

export function listProjectRecords({ scope = "personal", teamId = "", cursor = "", limit = 20 } = {}) {
  const query = new URLSearchParams({ scope, limit: String(limit) });
  if (teamId) query.set("teamId", teamId);
  if (cursor) query.set("cursor", cursor);
  return request(`/project-records?${query}`);
}

export function deleteProjectRecord(id) {
  return request(`/project-records/${encodeURIComponent(id)}`, { method: "DELETE" });
}

function base64(bytes) {
  let text = "";
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    text += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  }
  return btoa(text);
}

export async function saveProjectRecord(command, { onProgress, expectedUserId } = {}) {
  const { recordId, ...body } = command;
  const snapshotBytes = new TextEncoder().encode(JSON.stringify(body.snapshot)).byteLength;
  if (snapshotBytes > 32 * 1024 * 1024) {
    throw new ProjectHistoryApiError("项目超过32MiB，当前编辑已保留，请减少内嵌素材后保存", { code: "SNAPSHOT_TOO_LARGE", status: 413 });
  }
  const path = `/project-records/${encodeURIComponent(recordId)}`;
  const headers = expectedUserId ? { "X-Project-User": expectedUserId } : {};
  const json = JSON.stringify(body);
  let bytes = new TextEncoder().encode(json);
  if (bytes.length <= 240 * 1024) {
    return request(path, { method: "PUT", body: json, headers });
  }
  let encoding = "identity";
  if (typeof CompressionStream !== "undefined") {
    try {
      const compressed = new Uint8Array(await new Response(
        new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip")),
      ).arrayBuffer());
      if (compressed.length < bytes.length) { bytes = compressed; encoding = "gzip"; }
    } catch { /* Browsers without usable gzip keep the same lossless command. */ }
  }
  const totalParts = Math.ceil(bytes.length / (256 * 1024));
  const uploadPath = `${path}/uploads/${encodeURIComponent(body.operationId)}`;
  for (let index = 0; index < totalParts; index++) {
    await request(`${uploadPath}/${index}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        totalParts, encoding,
        data: base64(bytes.subarray(index * 256 * 1024, (index + 1) * 256 * 1024)),
      }),
    });
    onProgress?.(index + 1, totalParts);
  }
  return request(`${uploadPath}/commit`, { method: "POST", body: "{}", headers, timeoutMs: 90000 });
}

export function getCurrentUser() {
  return request("/me");
}

export function listProjects({ cursor = "", limit = 20 } = {}) {
  const query = new URLSearchParams({ limit: String(limit) });
  if (cursor) query.set("cursor", cursor);
  return request(`/projects?${query}`);
}

export function createProject({
  name,
  prdUrl,
  templateId,
  snapshot,
  scope = "personal",
  teamId = null,
}) {
  return request("/projects", {
    method: "POST",
    body: JSON.stringify({
      name,
      prdUrl,
      templateId,
      snapshot,
      scope,
      teamId,
    }),
  });
}

export function overwriteProject(
  projectId,
  { name, prdUrl, templateId, snapshot, baseUpdatedAt },
) {
  return request(`/projects/${encodeURIComponent(projectId)}`, {
    method: "PATCH",
    body: JSON.stringify({ name, prdUrl, templateId, snapshot, baseUpdatedAt }),
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
