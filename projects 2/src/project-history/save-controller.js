import { projectContentKey } from "./editor-content.js";
const clone = (value) => structuredClone(value);
const signature = (input) => JSON.stringify({
  name: input.name, scope: input.scope, teamId: input.teamId,
  snapshot: { ...input.snapshot, savedAt: "" },
});
const uncertain = (error) => !error?.status || error.status >= 500 ||
  ["TIMEOUT", "NETWORK_ERROR", "LOGIN_REQUIRED", "INCOMPLETE_UPLOAD"].includes(error.code) ||
  error.status === 401;

export function createSaveController({ send, backup, onSaved, onError, createId = () => crypto.randomUUID() } = {}) {
  let currentSession = null;
  let chain = Promise.resolve();
  let loadToken = 0;
  const knownRecords = new Set();
  const safely = async (task) => { try { return await task?.(); } catch { return null; } };
  function start(input = {}) {
    loadToken++;
    if (input.recordId) knownRecords.add(input.recordId);
    currentSession = {
      ...input, id: createId(), recordId: input.recordId || null,
      targetId: input.recordId || createId(), scope: input.scope || "personal",
      teamId: input.teamId || null, pending: null, running: new Map(),
    };
    return currentSession;
  }
  async function commit(session, command) {
    session.pending = command;
    await safely(() => backup?.put({
      userId: session.userId, sessionId: session.id, recordId: command.recordId,
      snapshot: command.snapshot, name: command.name, command,
      capturedAt: command.capturedAt,
    }));
    const { capturedAt, ...payload } = command;
    const result = await send(clone(payload), { expectedUserId: session.userId });
    if (!result?.record?.id || result.record.id !== command.recordId || !result.record.revision) {
      throw Object.assign(new Error("保存响应不完整，请重试确认"), { code: "NETWORK_ERROR" });
    }
    knownRecords.add(command.recordId);
    session.recordId = command.recordId;
    session.savedContentKey = projectContentKey(command.snapshot);
    if (session.pending === command) session.pending = null;
    await safely(() => backup?.acknowledge(session.userId, session.id, command.operationId));
    await safely(() => onSaved?.(result, { session, command, isCurrent: currentSession === session }));
    return result;
  }
  function save(input, session = currentSession || start()) {
    const captured = clone(input);
    captured.scope ||= session.scope;
    captured.teamId = captured.scope === "team" ? captured.teamId || session.teamId : null;
    const key = `${captured.copy ? "copy:" : ""}${signature(captured)}`;
    if (session.running.has(key)) return session.running.get(key);
    const retryingCopy = session.pending?.create &&
      session.pending.recordId === session.targetId &&
      captured.scope === session.pending.scope && captured.teamId === session.pending.teamId;
    if (captured.copy && !retryingCopy) session.targetId = createId();
    const command = {
      recordId: session.targetId, operationId: createId(), create: false,
      name: captured.name, snapshot: captured.snapshot,
      scope: captured.scope, teamId: captured.teamId,
      capturedAt: Date.now(),
    };
    const operation = chain.catch(() => null).then(async () => {
      try {
        const pending = session.pending;
        if (pending && pending.recordId === command.recordId) {
          const previous = await commit(session, pending);
          if (signature(pending) === signature(command) && pending.recordId === command.recordId) {
            return { cloudSaved: true, ...previous };
          }
        }
        command.create = !knownRecords.has(command.recordId);
        const result = await commit(session, command);
        session.scope = command.scope;
        session.teamId = command.teamId;
        return { cloudSaved: true, ...result };
      } catch (error) {
        if (!uncertain(error)) {
          session.pending = null;
          await safely(() => backup?.put({
            userId: session.userId, sessionId: session.id, recordId: session.recordId,
            snapshot: command.snapshot, name: command.name, command: null,
            scope: session.scope, teamId: session.teamId, capturedAt: command.capturedAt,
          }));
        }
        await safely(() => onError?.(error, { session, command, isCurrent: currentSession === session }));
        return { cloudSaved: false, error, snapshot: command.snapshot };
      }
    });
    chain = operation;
    session.running.set(key, operation);
    operation.finally(() => session.running.delete(key));
    return operation;
  }
  function resumeDraft(draft) {
    const session = start({
      userId: draft.userId, recordId: draft.recordId,
      scope: draft.command?.scope || draft.scope, teamId: draft.command?.teamId || draft.teamId,
    });
    session.id = draft.sessionId;
    session.targetId = draft.command?.recordId || draft.recordId || session.targetId;
    session.pending = clone(draft.command || null);
    if (draft.command?.create) knownRecords.delete(draft.command.recordId);
    return session;
  }
  return {
    start, save, resumeDraft, current: () => currentSession,
    invalidateLoads: () => ++loadToken,
    beginLoad: () => ++loadToken,
    isCurrentLoad: (token) => token === loadToken,
  };
}

export function createRecordCopier({ read, send, onSaved, prepare = (value) => value } = {}) {
  const commands = new Map();
  return {
    copy(recordId, destination) {
      const key = JSON.stringify([recordId, destination.scope, destination.teamId || null]);
      let entry = commands.get(key);
      if (entry?.running) return entry.running;
      if (!entry) {
        const controller = createSaveController({ send, onSaved });
        controller.start({ userId: destination.ownerId, scope: destination.scope, teamId: destination.teamId });
        entry = { controller, input: null, running: null };
        commands.set(key, entry);
      }
      const operation = Promise.resolve().then(async () => {
        if (!entry.input) {
          const source = await read(recordId);
          entry.input = {
            name: source.name, snapshot: prepare(source.snapshot),
            scope: destination.scope, teamId: destination.teamId || null,
          };
        }
        const result = await entry.controller.save(entry.input);
        if (result.cloudSaved) commands.delete(key);
        return result;
      });
      entry.running = operation;
      operation.finally(() => { entry.running = null; }).catch(() => {});
      return operation;
    },
  };
}
