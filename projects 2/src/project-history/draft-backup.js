import { projectContentKey } from "./editor-content.js";
const sameSnapshot = (a, b) => projectContentKey(a) === projectContentKey(b);
export function createDraftBackup({ indexedDB = globalThis.indexedDB, name = "dou-project-drafts-v3" } = {}) {
  let opening;
  function open() {
    if (!indexedDB) return Promise.reject(new Error("浏览器本地备份不可用，云端保存仍可继续"));
    if (!opening) opening = new Promise((resolve, reject) => {
      const request = indexedDB.open(name, 1);
      request.onupgradeneeded = () => {
        const store = request.result.createObjectStore("drafts", { keyPath: "key" });
        store.createIndex("userId", "userId");
      };
      request.onerror = () => { opening = null; reject(new Error("浏览器本地备份不可用")); };
      request.onblocked = () => { opening = null; reject(new Error("浏览器本地备份被其他页面占用")); };
      request.onsuccess = () => {
        request.result.onversionchange = () => { request.result.close(); opening = null; };
        resolve(request.result);
      };
    });
    return opening;
  }
  async function transaction(mode, run) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("drafts", mode);
      let result;
      tx.oncomplete = () => resolve(result);
      tx.onabort = tx.onerror = () => reject(new Error("本地备份写入失败，可能已达浏览器容量限制"));
      run(tx.objectStore("drafts"), (value) => { result = value; });
    });
  }
  const key = (userId, sessionId) => `${encodeURIComponent(userId)}:${sessionId}`;
  return {
    put(draft) {
      if (!draft.userId || !draft.sessionId) return Promise.reject(new Error("本地备份缺少账号或编辑会话"));
      return transaction("readwrite", (store) => {
        const id = key(draft.userId, draft.sessionId);
        const request = store.get(id);
        request.onsuccess = () => {
          const previous = request.result;
          const capturedAt = draft.capturedAt || Date.now();
          const newer = previous && previous.capturedAt > capturedAt;
          store.put({
            ...(previous || {}), ...draft,
            ...(newer ? { snapshot: previous.snapshot, name: previous.name, capturedAt: previous.capturedAt } : { capturedAt }),
            command: draft.command === undefined ? previous?.command || null : draft.command,
            key: id, updatedAt: Date.now(),
          });
        };
      });
    },
    list(userId) {
      return transaction("readonly", (store, finish) => {
        const request = store.index("userId").getAll(userId);
        request.onsuccess = () => finish(request.result.sort((a, b) => b.updatedAt - a.updatedAt));
      });
    },
    acknowledge(userId, sessionId, operationId) {
      return transaction("readwrite", (store) => {
        const id = key(userId, sessionId);
        const request = store.get(id);
        request.onsuccess = () => {
          const draft = request.result;
          if (draft?.command?.operationId !== operationId) return;
          if (sameSnapshot(draft.snapshot, draft.command.snapshot)) store.delete(id);
          else store.put({ ...draft, recordId: draft.command.recordId, command: null });
        };
      });
    },
    remove(userId, sessionId) {
      return transaction("readwrite", (store) => store.delete(key(userId, sessionId)));
    },
  };
}
