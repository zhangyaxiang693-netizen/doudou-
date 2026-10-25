// Never upload untouched cached objects when saving one record.
export function collaborationChanges(previous, next) {
  const changes = {};
  for (const collection of ["users", "teams", "records"]) {
    const existing = new Map(previous[collection].map((item) => [item.id, item]));
    changes[collection] = next[collection]
      .filter((item) => JSON.stringify(item) !== JSON.stringify(existing.get(item.id)))
      .map((item) => collection === "users" ? item : {
        ...item,
        baseUpdatedAt: item.baseUpdatedAt ?? existing.get(item.id)?.updatedAt ?? null,
      });
  }
  return changes;
}

export function mergeCollaborationChanges(previous, response) {
  const next = { ...previous, updatedAt: response.updatedAt || previous.updatedAt };
  for (const collection of ["users", "teams", "records"]) {
    const items = new Map(previous[collection].map((item) => [item.id, item]));
    for (const item of response[collection] || []) {
      // Replace the acknowledged object; never keep an old snapshot with a new timestamp.
      const { snapshot, baseUpdatedAt, ...metadata } = item;
      items.set(item.id, collection === "records" ? metadata : item);
    }
    next[collection] = [...items.values()];
  }
  return next;
}

export function createCollaborationQueue() {
  let pending = Promise.resolve();
  return (operation) => {
    const result = pending.then(operation);
    pending = result.catch(() => {});
    return result;
  };
}
