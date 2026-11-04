const { readPagination, paginateQuery, pageResult } = require("./list-pagination.cjs");
const { createProjectRecordRepository } = require("./project-record-repository.cjs");
const { createProjectUploadRepository } = require("./project-record-upload.cjs");

class HistoryRepositoryError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = "HistoryRepositoryError";
    this.code = code;
    this.cause = cause;
  }
}

function storageError(error) {
  if (error instanceof HistoryRepositoryError) return error;
  const messages = {
    VERSION_CONFLICT: "该记录已被更新，请保留当前编辑并另存副本，或重新打开最新记录",
    PROJECT_NOT_FOUND: "项目不存在或已删除",
    PROJECT_FORBIDDEN: "无权修改该项目",
    INVALID_GROUP: "所选组不存在，请刷新后重试",
  };
  if (messages[error?.message]) {
    return new HistoryRepositoryError(error.message, messages[error.message], error);
  }
  return new HistoryRepositoryError(
    "STORAGE_ERROR",
    error?.message || "Project history storage failed",
    error,
  );
}

function mapProject(row) {
  return {
    id: row.id,
    name: row.name,
    prdUrl: row.prd_url || "",
    templateId: row.template_id || "",
    latestVersionId: row.latest_version_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    revision: Number(row.revision || 1),
  };
}

function mapVersion(row, includeSnapshot = false) {
  const version = {
    id: row.id,
    projectId: row.project_id,
    versionNo: row.version_no,
    saveType: row.save_type,
    schemaVersion: row.schema_version,
    appVersion: row.app_version,
    createdAt: row.created_at,
  };
  if (includeSnapshot) version.snapshot = row.snapshot_json;
  return version;
}

function createHistoryRepository(supabase) {
  const records = createProjectRecordRepository(supabase);
  async function getOwnedProject(ownerId, projectId) {
    try {
      return await records.getRecord({ id: ownerId }, projectId);
    } catch (error) {
      const code = { RECORD_NOT_FOUND: "PROJECT_NOT_FOUND", RECORD_FORBIDDEN: "PROJECT_FORBIDDEN" }[error.code];
      throw code ? new HistoryRepositoryError(code, error.message, error) : error;
    }
  }

  async function listProjects(ownerId, options = {}) {
    let pagination;
    try { pagination = readPagination(options); } catch {
      throw new HistoryRepositoryError("INVALID_PAGINATION", "分页参数无效");
    }
    const query = supabase
      .from("project_records")
      .select(
        "id,name,version_id,revision,created_at,updated_at",
      )
      .eq("owner_id", ownerId)
      .is("deleted_at", null);
    const { data, error } = await paginateQuery(query, pagination);

    if (error) throw storageError(error);
    const page = pageResult(data || [], pagination.limit, (row) => mapProject({
      ...row, latest_version_id: row.version_id,
    }));
    return { projects: page.items, hasMore: page.hasMore, nextCursor: page.nextCursor };
  }

  async function createProject(ownerId, input) {
    return writeProject(ownerId, null, input);
  }

  async function overwriteProject(ownerId, projectId, input) {
    return writeProject(ownerId, projectId, input);
  }

  async function writeProject(ownerId, projectId, input) {
    const { data, error } = await supabase.rpc("write_history_project_compact", {
      p_owner_id: ownerId,
      p_project_id: projectId,
      p_input: input,
    });
    if (error) throw storageError(error);
    return {
      project: mapProject(data.project),
      version: mapVersion(data.version),
    };
  }

  async function listVersions(ownerId, projectId) {
    const record = await getOwnedProject(ownerId, projectId);
    const { data, error } = await supabase
      .from("project_versions")
      .select(
        "id,project_id,version_no,save_type,schema_version,app_version,created_at",
      )
      .eq("project_id", projectId)
      .eq("save_type", "manual")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw storageError(error);
    const latest = {
      id: record.versionId, projectId, versionNo: record.revision, saveType: "manual",
      schemaVersion: record.snapshot.schemaVersion, appVersion: record.snapshot.appVersion || "",
      createdAt: record.updatedAt,
    };
    return [latest, ...(data || []).filter((row) => row.id !== latest.id).map((row) => mapVersion(row))];
  }

  async function getVersion(ownerId, projectId, versionId) {
    const record = await getOwnedProject(ownerId, projectId);
    if (record.versionId === versionId) {
      return {
        id: versionId, projectId, versionNo: record.revision, saveType: "manual",
        schemaVersion: record.snapshot.schemaVersion, appVersion: record.snapshot.appVersion || "",
        createdAt: record.updatedAt, snapshot: record.snapshot,
      };
    }
    const { data, error } = await supabase
      .from("project_versions")
      .select(
        "id,project_id,version_no,save_type,schema_version,app_version,snapshot_json,created_at",
      )
      .eq("project_id", projectId)
      .eq("id", versionId)
      .maybeSingle();

    if (error) throw storageError(error);
    if (!data) {
      throw new HistoryRepositoryError(
        "PROJECT_NOT_FOUND",
        "Project version not found",
      );
    }
    return mapVersion(data, true);
  }

  async function deleteProject(ownerId, projectId) {
    await records.deleteRecord({ id: ownerId }, projectId);
  }

  return {
    ...records,
    ...createProjectUploadRepository(supabase, records),
    createProject,
    deleteProject,
    getVersion,
    listProjects,
    listVersions,
    overwriteProject,
  };
}

module.exports = {
  HistoryRepositoryError,
  createHistoryRepository,
};
