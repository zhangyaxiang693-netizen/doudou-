const { readPagination, paginateQuery, pageResult } = require("./list-pagination.cjs");

const RECORD_COLUMNS = "id,project_id,version_id,owner_id,name,scope,group_id,revision,saved_by,created_at,updated_at,migration_issue";
const messages = {
  INVALID_OPERATION: "保存请求标识无效",
  OPERATION_MISMATCH: "保存请求标识已被使用，请重新保存",
  RECORD_EXISTS: "记录标识已存在，请重新打开或另存",
  RECORD_NOT_FOUND: "记录不存在或已删除，当前内容可另存为新记录",
  RECORD_FORBIDDEN: "无权访问该个人记录",
  DESTINATION_MISMATCH: "保存位置发生变化，请另存到新的位置",
  INVALID_GROUP: "所选组不存在，请刷新后重试",
  INVALID_SNAPSHOT: "项目数据格式无效，当前编辑已保留",
  INVALID_UPLOAD: "上传分片格式无效",
  INCOMPLETE_UPLOAD: "保存分片不完整，请再次保存",
};

class ProjectRecordError extends Error {
  constructor(code, message, cause) {
    super(message || messages[code] || "项目保存服务暂时不可用");
    this.name = "ProjectRecordError";
    this.code = code;
    this.cause = cause;
  }
}

function recordStorageError(error) {
  return error instanceof ProjectRecordError ? error
    : new ProjectRecordError(Object.hasOwn(messages, error?.message) ? error.message : "STORAGE_ERROR",
      undefined, error);
}

function mapRecord(row) {
  return {
    id: row.id, projectId: row.project_id || null, versionId: row.version_id,
    ownerId: row.owner_id, name: row.name, scope: row.scope, teamId: row.group_id || null,
    revision: Number(row.revision || 1), savedBy: row.saved_by,
    createdAt: row.created_at, updatedAt: row.updated_at,
    migrationIssue: row.migration_issue || null,
    ...(Object.hasOwn(row, "snapshot_json") ? { snapshot: row.snapshot_json } : {}),
  };
}

function createProjectRecordRepository(supabase) {
  async function listRecords(user, options = {}, isAdmin = false) {
    const scope = options.scope || "personal";
    if (!["personal", "team", "all"].includes(scope) || (scope === "all" && !isAdmin)) {
      throw new ProjectRecordError("RECORD_FORBIDDEN");
    }
    let pagination;
    try { pagination = readPagination(options); } catch {
      throw new ProjectRecordError("INVALID_PAGINATION", "分页参数无效");
    }
    let query = supabase.from("project_records").select(RECORD_COLUMNS).is("deleted_at", null);
    if (scope !== "all") query = query.eq("scope", scope);
    if (scope === "personal") query = query.eq("owner_id", user.id);
    if (scope === "team" && options.teamId) query = query.eq("group_id", String(options.teamId));
    const { data, error } = await paginateQuery(query, pagination);
    if (error) throw recordStorageError(error);
    const page = pageResult(data || [], pagination.limit, mapRecord);
    return { records: page.items, hasMore: page.hasMore, nextCursor: page.nextCursor };
  }

  async function getRecord(user, id, isAdmin = false) {
    const { data, error } = await supabase.from("project_records")
      .select(`${RECORD_COLUMNS},snapshot_json,deleted_at`).eq("id", id).maybeSingle();
    if (error) throw recordStorageError(error);
    if (!data || data.deleted_at) throw new ProjectRecordError("RECORD_NOT_FOUND");
    if (!isAdmin && data.scope !== "team" && data.owner_id !== user.id) {
      throw new ProjectRecordError("RECORD_FORBIDDEN");
    }
    return mapRecord(data);
  }

  async function writeRecord(user, id, input, isAdmin = false) {
    const { data, error } = await supabase.rpc("write_project_record", {
      p_user_id: user.id, p_record_id: id, p_input: input, p_is_admin: isAdmin,
    });
    if (error) throw recordStorageError(error);
    if (!data?.record?.id || !data.record.revision) {
      throw new ProjectRecordError("STORAGE_ERROR");
    }
    return { record: mapRecord(data.record), replayed: Boolean(data.replayed) };
  }

  async function deleteRecord(user, id, isAdmin = false) {
    const { error } = await supabase.rpc("delete_project_record", {
      p_user_id: user.id, p_record_id: id, p_is_admin: isAdmin,
    });
    if (error) throw recordStorageError(error);
  }

  return { listRecords, getRecord, writeRecord, deleteRecord };
}

module.exports = { createProjectRecordRepository, ProjectRecordError, recordStorageError, mapRecord };
