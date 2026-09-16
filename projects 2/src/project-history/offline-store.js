const DATABASE_NAME = "h5-builder-project-history";
const DATABASE_VERSION = 1;
const DRAFT_STORE = "drafts";

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(DRAFT_STORE)) {
        const store = database.createObjectStore(DRAFT_STORE, {
          keyPath: "id",
        });
        store.createIndex("ownerId", "ownerId", { unique: false });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function runTransaction(mode, operation) {
  const database = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(DRAFT_STORE, mode);
      const store = transaction.objectStore(DRAFT_STORE);
      const request = operation(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      transaction.onerror = () => reject(transaction.error);
    });
  } finally {
    database.close();
  }
}

export async function saveLocalDraft({
  id,
  ownerId = "anonymous",
  projectId = null,
  baseVersionId = null,
  name,
  snapshot,
  synced = false,
}) {
  const record = {
    id,
    ownerId,
    projectId,
    baseVersionId,
    name: String(name || "未命名活动"),
    snapshot,
    synced,
    updatedAt: new Date().toISOString(),
  };
  await runTransaction("readwrite", (store) => store.put(record));
  return record;
}

export async function listLocalDrafts(ownerId = "anonymous") {
  const records = await runTransaction("readonly", (store) =>
    store.index("ownerId").getAll(ownerId),
  );
  return (records || []).sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
}

export function getLocalDraft(id) {
  return runTransaction("readonly", (store) => store.get(id));
}

export function deleteLocalDraft(id) {
  return runTransaction("readwrite", (store) => store.delete(id));
}
