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
    snapshot: row.snapshot_json,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
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
    const [usersResult, groupsResult, recordsResult] = await Promise.all([
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
      isAdmin
        ? supabase
            .from("collaboration_records")
            .select(
              "id,project_id,owner_id,name,scope,group_id,snapshot_json,created_at,updated_at",
            )
            .order("updated_at", { ascending: false })
        : supabase
            .from("collaboration_records")
            .select(
              "id,project_id,owner_id,name,scope,group_id,snapshot_json,created_at,updated_at",
            )
            .or(`scope.eq.team,and(scope.eq.personal,owner_id.eq.${user.id})`)
            .order("updated_at", { ascending: false }),
    ]);

    const error =
      usersResult.error || groupsResult.error || recordsResult.error;
    if (error) throw storageError(error);
    return {
      version: 1,
      users: (usersResult.data || []).map(mapUser),
      teams: (groupsResult.data || []).map(mapGroup),
      records: (recordsResult.data || []).map(mapRecord),
      updatedAt: new Date().toISOString(),
    };
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

  async function sync(user, state, isAdmin = false) {
    await upsertCurrentUser(user);
    const { data, error } = await supabase.rpc("sync_collaboration_changes", {
      p_user_id: user.id,
      p_state: state,
      p_is_admin: isAdmin,
    });
    if (error) throw storageError(error);
    return {
      version: 1,
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

  return { bootstrap, overrideRecord, sync };
}

module.exports = {
  CollaborationRepositoryError,
  createCollaborationRepository,
};
