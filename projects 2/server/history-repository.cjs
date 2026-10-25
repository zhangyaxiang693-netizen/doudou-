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
  async function getOwnedProject(ownerId, projectId) {
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,owner_id,name,prd_url,template_id,latest_version_id,created_at,updated_at,deleted_at",
      )
      .eq("id", projectId)
      .maybeSingle();

    if (error) throw storageError(error);
    if (!data || data.deleted_at) {
      throw new HistoryRepositoryError(
        "PROJECT_NOT_FOUND",
        "Project not found",
      );
    }
    if (data.owner_id !== ownerId) {
      throw new HistoryRepositoryError(
        "PROJECT_FORBIDDEN",
        "Project belongs to another user",
      );
    }
    return data;
  }

  async function listProjects(ownerId) {
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,name,prd_url,template_id,latest_version_id,created_at,updated_at",
      )
      .eq("owner_id", ownerId)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false })
      .limit(100);

    if (error) throw storageError(error);
    return (data || []).map(mapProject);
  }

  async function createProject(ownerId, input) {
    return writeProject(ownerId, null, input);
  }

  async function overwriteProject(ownerId, projectId, input) {
    return writeProject(ownerId, projectId, input);
  }

  async function writeProject(ownerId, projectId, input) {
    const { data, error } = await supabase.rpc("write_history_project", {
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
    await getOwnedProject(ownerId, projectId);
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
    return (data || []).map((row) => mapVersion(row));
  }

  async function getVersion(ownerId, projectId, versionId) {
    await getOwnedProject(ownerId, projectId);
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
    await getOwnedProject(ownerId, projectId);
    const { error } = await supabase
      .from("projects")
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .eq("owner_id", ownerId)
      .is("deleted_at", null);

    if (error) throw storageError(error);
  }

  return {
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
