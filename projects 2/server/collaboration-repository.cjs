const { readPagination, paginateQuery, pageResult } = require("./list-pagination.cjs");
const RECORD_COLUMNS = "id,project_id,owner_id,name,scope,group_id,created_at,updated_at";

class CollaborationRepositoryError extends Error {
  constructor(code, message, cause) {
    super(message);
    this.name = "CollaborationRepositoryError";
    this.code = code;
    this.cause = cause;
  }
}

function storageError(error) {
  if (error instanceof CollaborationRepositoryError) return error;
  const messages = {
    VERSION_CONFLICT: "该记录已被更新，请保留当前编辑并另存副本，或重新打开最新记录",
    RECORD_NOT_FOUND: "历史记录不存在或已删除，请刷新",
    RECORD_FORBIDDEN: "无权修改该个人记录",
    INVALID_SNAPSHOT: "项目快照格式无效",
  };
  if (messages[error?.message]) {
    return new CollaborationRepositoryError(error.message, messages[error.message], error);
  }
  return new CollaborationRepositoryError(
    "STORAGE_ERROR",
    error?.message || "Collaboration storage failed",
    error,
  );
}

function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url || "",
    role: "member",
  };
}

function mapGroup(row) {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRecord(row) {
  return {
    id: row.id,
    projectId: row.project_id || null,
    ownerId: row.owner_id,
    name: row.name,
    scope: row.scope,
    teamId: row.group_id || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(Object.hasOwn(row, "snapshot_json") ? { snapshot: row.snapshot_json } : {}),
  };
}

function createCollaborationRepository(supabase) {
  async function upsertCurrentUser(user) {
    const timestamp = new Date().toISOString();
    const { error } = await supabase.from("app_users").upsert(
      {
        id: user.id,
        name: user.name || "未命名用户",
        avatar_url: user.avatarUrl || "",
        last_seen_at: timestamp,
        updated_at: timestamp,
      },
      { onConflict: "id" },
    );
    if (error) throw storageError(error);
  }

  async function bootstrap(user, isAdmin = false) {
    await upsertCurrentUser(user);
    const [usersResult, groupsResult] = await Promise.all([
      isAdmin
        ? supabase
            .from("app_users")
            .select("id,name,avatar_url")
            .order("updated_at", { ascending: false })
        : supabase
            .from("app_users")
            .select("id,name,avatar_url")
            .eq("id", user.id),
      supabase
        .from("collaboration_groups")
        .select("id,name,created_at,updated_at")
        .order("updated_at", { ascending: false }),
    ]);

    const error = usersResult.error || groupsResult.error;
    if (error) throw storageError(error);
    return {
      version: 1,
      users: (usersResult.data || []).map(mapUser),
      teams: (groupsResult.data || []).map(mapGroup),
      records: [],
      updatedAt: new Date().toISOString(),
    };
  }

  async function listRecords(user, options = {}, isAdmin = false) {
    const scope = options.scope || "personal";
    if (!["personal", "team", "all"].includes(scope) || (scope === "all" && !isAdmin)) {
      throw new CollaborationRepositoryError("RECORD_FORBIDDEN", "无权查看该范围的记录");
    }
    let pagination;
    try { pagination = readPagination(options); } catch {
      throw new CollaborationRepositoryError("INVALID_PAGINATION", "分页参数无效");
    }
    let query = supabase.from("collaboration_records").select(RECORD_COLUMNS);
    if (scope !== "all") query = query.eq("scope", scope);
    if (scope === "personal") query = query.eq("owner_id", user.id);
    if (scope === "team" && options.teamId) query = query.eq("group_id", String(options.teamId));
    const { data, error } = await paginateQuery(query, pagination);
    if (error) throw storageError(error);
    const page = pageResult(data || [], pagination.limit, mapRecord);
    return { records: page.items, hasMore: page.hasMore, nextCursor: page.nextCursor };
  }

  async function getExistingRecord(recordId) {
    const { data, error } = await supabase
      .from("collaboration_records")
      .select("id,project_id,owner_id,name,scope,group_id,snapshot_json,created_at,updated_at")
      .eq("id", recordId)
      .maybeSingle();
    if (error) throw storageError(error);
    return data;
  }

  async function getRecord(user, recordId, isAdmin = false) {
    const row = await getExistingRecord(recordId);
    if (!row) throw new CollaborationRepositoryError("RECORD_NOT_FOUND", "历史记录不存在或已删除");
    if (!isAdmin && row.scope !== "team" && row.owner_id !== user.id) {
      throw new CollaborationRepositoryError("RECORD_FORBIDDEN", "无权查看该个人记录");
    }
    return mapRecord(row);
  }

  async function sync(user, state, isAdmin = false) {
    await upsertCurrentUser(user);
    const { data, error } = await supabase.rpc("sync_collaboration_changes_compact", {
      p_user_id: user.id,
      p_state: state,
      p_is_admin: isAdmin,
    });
    if (error) throw storageError(error);
    return {
      version: 1,
      partial: true,
      users: data.users.map(mapUser),
      teams: data.teams.map(mapGroup),
      records: data.records.map(mapRecord),
      updatedAt: new Date().toISOString(),
    };
  }

  async function overrideRecord(recordId, changes, user) {
    const record = await getExistingRecord(recordId);
    if (!record) {
      throw new CollaborationRepositoryError(
        "RECORD_NOT_FOUND",
        "历史记录不存在",
      );
    }

    const result = await sync(user, {
      users: [], teams: [],
      records: [{ ...mapRecord(record), ...changes }],
    }, true);
    return result.records.find((item) => item.id === recordId);
  }

  return { bootstrap, listRecords, getRecord, overrideRecord, sync };
}

module.exports = {
  CollaborationRepositoryError,
  createCollaborationRepository,
};
