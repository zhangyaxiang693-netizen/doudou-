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

export function createCollaborationQueue() {
  let pending = Promise.resolve();
  return (operation) => {
    const result = pending.then(operation);
    pending = result.catch(() => {});
    return result;
  };
}
