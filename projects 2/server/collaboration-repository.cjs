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
      .select("id,owner_id,scope")
      .eq("id", recordId)
      .maybeSingle();
    if (error) throw storageError(error);
    return data;
  }

  async function sync(user, state, isAdmin = false) {
    await upsertCurrentUser(user);
    const timestamp = new Date().toISOString();

    for (const item of state.users || []) {
      if (!isAdmin && String(item.id) !== user.id) continue;
      const { error } = await supabase.from("app_users").upsert(
        {
          id: String(item.id),
          name: String(item.name || "未命名用户"),
          avatar_url: String(item.avatarUrl || ""),
          updated_at: timestamp,
          last_seen_at: timestamp,
        },
        { onConflict: "id" },
      );
      if (error) throw storageError(error);
    }

    for (const group of state.teams || []) {
      const { error } = await supabase.from("collaboration_groups").upsert(
        {
          id: String(group.id),
          name: String(group.name || "未命名组"),
          created_by: user.id,
          created_at: group.createdAt || timestamp,
          updated_at: timestamp,
        },
        { onConflict: "id" },
      );
      if (error) throw storageError(error);
    }

    for (const record of state.records || []) {
      const id = String(record.id || "");
      const scope = record.scope === "team" ? "team" : "personal";
      if (!id) continue;
      const existing = await getExistingRecord(id);
      if (
        existing?.scope === "personal" &&
        existing.owner_id !== user.id &&
        !isAdmin
      ) {
        throw new CollaborationRepositoryError(
          "RECORD_FORBIDDEN",
          "无权修改其他用户的个人记录",
        );
      }
      if (
        scope === "personal" &&
        String(record.ownerId || user.id) !== user.id &&
        !isAdmin
      ) {
        continue;
      }
      const ownerId =
        existing?.owner_id ||
        (isAdmin ? String(record.ownerId || user.id) : user.id);
      const { error } = await supabase.from("collaboration_records").upsert(
        {
          id,
          project_id: record.projectId || null,
          owner_id: ownerId,
          name: String(record.name || "未命名活动"),
          scope,
          group_id: scope === "team" ? String(record.teamId || "") : null,
          snapshot_json: record.snapshot || {},
          created_at: record.createdAt || timestamp,
          updated_at: timestamp,
        },
        { onConflict: "id" },
      );
      if (error) throw storageError(error);
    }

    return bootstrap(user, isAdmin);
  }

  async function overrideRecord(recordId, changes) {
    const { data: record, error: recordError } = await supabase
      .from("collaboration_records")
      .select("id,project_id,owner_id,scope")
      .eq("id", recordId)
      .maybeSingle();
    if (recordError) throw storageError(recordError);
    if (!record) {
      throw new CollaborationRepositoryError(
        "RECORD_NOT_FOUND",
        "历史记录不存在",
      );
    }

    const timestamp = new Date().toISOString();
    const snapshot = {
      ...changes.snapshot,
      savedAt: changes.snapshot.savedAt || timestamp,
    };
    const { error: updateRecordError } = await supabase
      .from("collaboration_records")
      .update({
        name: changes.name,
        snapshot_json: snapshot,
        updated_at: timestamp,
      })
      .eq("id", recordId);
    if (updateRecordError) throw storageError(updateRecordError);

    if (record.project_id) {
      const { data: latestVersion, error: versionError } = await supabase
        .from("project_versions")
        .select("version_no")
        .eq("project_id", record.project_id)
        .order("version_no", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (versionError) throw storageError(versionError);

      const { data: insertedVersion, error: insertError } = await supabase
        .from("project_versions")
        .insert({
          project_id: record.project_id,
          version_no: Number(latestVersion?.version_no || 0) + 1,
          save_type: "manual",
          schema_version: Number(snapshot.schemaVersion || 1),
          app_version: String(snapshot.appVersion || ""),
          snapshot_json: snapshot,
          snapshot_saved_at: snapshot.savedAt,
        })
        .select("id")
        .single();
      if (insertError) throw storageError(insertError);

      const { error: updateProjectError } = await supabase
        .from("projects")
        .update({
          name: changes.name,
          latest_version_id: insertedVersion.id,
          updated_at: timestamp,
        })
        .eq("id", record.project_id);
      if (updateProjectError) throw storageError(updateProjectError);
    }

    return { ...record, name: changes.name, snapshot };
  }

  return { bootstrap, overrideRecord, sync };
}

module.exports = {
  CollaborationRepositoryError,
  createCollaborationRepository,
};
