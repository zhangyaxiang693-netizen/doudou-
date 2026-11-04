export const projectContentKey = (snapshot) => JSON.stringify({
  editor: snapshot.editor, source: snapshot.source,
  templates: snapshot.templates, activitySources: snapshot.activitySources,
});
export function syncResourceDraftField(drafts, levelId, slotId, variantId, path, value) {
  const versions = drafts?.[levelId]?.modules?.[slotId]?.versions || [];
  const version = versions.find((item) => item.id === (variantId || "base"));
  if (!version || String(path).includes(".")) return false;
  version.values ||= {};
  version.values[path] = value;
  return true;
}
