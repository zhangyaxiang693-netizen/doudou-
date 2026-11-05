export function getSelectedExportEntries(entries, entryIds) {
  if (!Array.isArray(entryIds) || entryIds.some((id) =>
    typeof id !== "string" || !id.trim())) {
    throw new Error("切图选择参数无效");
  }
  const ids = new Set(entryIds);
  const selected = entries.filter((entry) => ids.has(entry.id));
  if (selected.length !== ids.size) {
    throw new Error("所选切图已变化，请返回导出页重新选择");
  }
  return selected;
}
