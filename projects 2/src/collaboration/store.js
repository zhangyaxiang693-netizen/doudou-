export const COLLABORATION_STORAGE_KEY = "h5_builder_collaboration_v1";

const now = () => new Date().toISOString();
const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;

function normalizeUser(user = {}) {
  const id = String(
    user.id || user.employeeId || user.userId || user.openId || "",
  ).trim();
  if (!id) return null;
  return {
    id,
    name: String(user.name || "未命名用户").trim() || "未命名用户",
    avatarUrl: String(user.avatarUrl || user.avatar || "").trim(),
    role: user.role === "admin" || user.isAdmin ? "admin" : "member",
  };
}

export function createCollaborationState(currentUser, options = {}) {
  const normalizedCurrentUser = normalizeUser(currentUser);
  const adminIds = new Set(
    (options.adminIds || []).map((id) => String(id).trim()),
  );
  if (normalizedCurrentUser && adminIds.has(normalizedCurrentUser.id)) {
    normalizedCurrentUser.role = "admin";
  }
  return {
    version: 1,
    cacheUserId: normalizedCurrentUser?.id || "",
    users: normalizedCurrentUser ? [normalizedCurrentUser] : [],
    teams: [],
    records: [],
    updatedAt: now(),
  };
}

export function normalizeCollaborationState(value, currentUser, options = {}) {
  const base =
    value && typeof value === "object"
      ? {
          version: 1,
          cacheUserId: String(currentUser?.id || ""),
          users: Array.isArray(value.users)
            ? value.users.map(normalizeUser).filter(Boolean)
            : [],
          teams: Array.isArray(value.teams) ? value.teams : [],
          records: Array.isArray(value.records) ? value.records : [],
          updatedAt: value.updatedAt || now(),
        }
      : createCollaborationState(currentUser, options);
  const sessionUser = normalizeUser(currentUser);
  const adminIds = new Set(
    (options.adminIds || []).map((id) => String(id).trim()),
  );
  if (sessionUser) {
    if (adminIds.has(sessionUser.id)) sessionUser.role = "admin";
    const index = base.users.findIndex((user) => user.id === sessionUser.id);
    if (index >= 0) {
      base.users[index] = {
        ...base.users[index],
        avatarUrl: sessionUser.avatarUrl || base.users[index].avatarUrl,
        role:
          sessionUser.role === "admin" ? "admin" : base.users[index].role,
      };
    } else {
      base.users.push(sessionUser);
    }
  }
  base.teams = base.teams
    .filter((team) => team && team.id)
    .map((team) => ({
      id: String(team.id),
      name: String(team.name || "未命名组"),
      createdAt: team.createdAt || now(),
      updatedAt: team.updatedAt || now(),
    }));
  base.records = base.records
    .filter((record) => record && record.id && record.ownerId)
    .map((record) => ({
      ...record,
      id: String(record.id),
      ownerId: String(record.ownerId),
      scope: record.scope === "team" ? "team" : "personal",
      teamId: record.scope === "team" ? String(record.teamId || "") : null,
    }));
  return base;
}

export function loadCollaborationState(currentUser, options = {}) {
  if (typeof localStorage === "undefined") {
    return createCollaborationState(currentUser, options);
  }
  let stored = null;
  try {
    stored = JSON.parse(
      localStorage.getItem(
        `${COLLABORATION_STORAGE_KEY}:${encodeURIComponent(currentUser?.id || "")}`,
      ) || "null",
    );
    // Do not import the former shared cache: its account/admin origin is unknown.
  } catch {
    stored = null;
  }
  const state = normalizeCollaborationState(stored, currentUser, options);
  saveCollaborationState(state);
  return state;
}

export function saveCollaborationState(state) {
  const next = { ...state, updatedAt: now() };
  try {
    if (typeof localStorage !== "undefined" && next.cacheUserId) {
      localStorage.setItem(
        `${COLLABORATION_STORAGE_KEY}:${encodeURIComponent(next.cacheUserId)}`,
        JSON.stringify({
          ...next,
          users: next.users.filter((user) => user.id === next.cacheUserId),
          records: next.records.filter(
            (record) => record.scope === "team" || record.ownerId === next.cacheUserId,
          ),
        }),
      );
    }
  } catch {
    // Browser quota/private mode must not turn a successful cloud write into failure.
  }
  return next;
}

export function isAdmin(state, userId) {
  return state.users.some(
    (user) => user.id === String(userId || "") && user.role === "admin",
  );
}

export function addUser(state, { id, name, role = "member" }) {
  const user = normalizeUser({ id, name, role });
  if (!user) throw new Error("请输入用户 ID");
  if (state.users.some((item) => item.id === user.id)) {
    throw new Error("该用户已存在");
  }
  return saveCollaborationState({
    ...state,
    users: [...state.users, user],
  });
}

export function renameUser(state, userId, name) {
  const nextName = String(name || "").trim();
  if (!nextName) throw new Error("用户名称不能为空");
  return saveCollaborationState({
    ...state,
    users: state.users.map((user) =>
      user.id === String(userId) ? { ...user, name: nextName } : user,
    ),
  });
}

export function createTeam(state, { name }) {
  const teamName = String(name || "").trim();
  if (!teamName) throw new Error("组名称不能为空");
  if (state.teams.some((team) => team.name === teamName)) {
    throw new Error("该组已存在");
  }
  const timestamp = now();
  return saveCollaborationState({
    ...state,
    teams: [
      ...state.teams,
      {
        id: createId("team"),
        name: teamName,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
  });
}

export function updateTeam(state, teamId, { name }) {
  const teamName = String(name || "").trim();
  if (!teamName) throw new Error("组名称不能为空");
  const normalizedTeamId = String(teamId);
  if (
    state.teams.some(
      (team) => team.id !== normalizedTeamId && team.name === teamName,
    )
  ) {
    throw new Error("该组已存在");
  }
  return saveCollaborationState({
    ...state,
    teams: state.teams.map((team) =>
      team.id === normalizedTeamId
        ? {
            ...team,
            name: teamName,
            updatedAt: now(),
          }
        : team,
    ),
  });
}

export function upsertRecord(state, record) {
  const id = String(record.id || record.projectId || createId("record"));
  const nextRecord = {
    id,
    projectId: record.projectId ? String(record.projectId) : null,
    ownerId: String(record.ownerId || ""),
    name: String(record.name || "未命名活动"),
    scope: record.scope === "team" ? "team" : "personal",
    teamId: record.scope === "team" ? String(record.teamId || "") : null,
    snapshot: record.snapshot || null,
    updatedAt: record.updatedAt || now(),
    createdAt: record.createdAt || now(),
  };
  const index = state.records.findIndex((item) => item.id === id);
  const records = [...state.records];
  if (index >= 0) {
    records[index] = {
      ...records[index],
      ...nextRecord,
      createdAt: records[index].createdAt || nextRecord.createdAt,
    };
  } else {
    records.unshift(nextRecord);
  }
  return saveCollaborationState({ ...state, records });
}

export function updateRecord(state, recordId, changes) {
  const id = String(recordId);
  const existing = state.records.find((record) => record.id === id);
  if (!existing) throw new Error("历史记录不存在");
  return saveCollaborationState({
    ...state,
    records: state.records.map((record) =>
      record.id === id
        ? {
            ...record,
            ...changes,
            id,
            updatedAt: now(),
          }
        : record,
    ),
  });
}

export function copyRecord(
  state,
  recordId,
  { ownerId, scope = "personal", teamId = null },
) {
  const source = state.records.find(
    (record) => record.id === String(recordId),
  );
  if (!source) throw new Error("历史记录不存在");
  const name = `${source.name} - 副本`;
  const snapshot = source.snapshot ? JSON.parse(JSON.stringify(source.snapshot)) : null;
  if (snapshot?.editor?.activity) snapshot.editor.activity.name = name;
  return upsertRecord(state, {
    ...source,
    id: createId("record"),
    projectId: null,
    ownerId,
    scope,
    teamId: scope === "team" ? teamId : null,
    name,
    snapshot,
    createdAt: now(),
    updatedAt: now(),
  });
}

export function listRecordsForUser(
  state,
  userId,
  scope = "personal",
  teamId = null,
) {
  const id = String(userId || "");
  if (scope === "team") {
    return state.records
      .filter(
        (record) =>
          record.scope === "team" &&
          (!teamId || record.teamId === String(teamId)),
      )
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
  return state.records
    .filter(
      (record) => record.scope === "personal" && record.ownerId === id,
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}
