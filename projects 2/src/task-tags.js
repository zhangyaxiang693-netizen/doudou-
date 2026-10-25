export const TASK_TAG_OPTIONS = [
  { value: "new", label: "NEW" },
  { value: "ai投放", label: "ai投放" },
  { value: "方法论", label: "方法论" },
  { value: "标杆领航", label: "标杆领航" },
];

export function normalizeTaskTag(value) {
  const text = String(value ?? "").trim();
  if (/^(?:true|1|yes|是|开启|开|new)$/i.test(text)) return "new";
  return TASK_TAG_OPTIONS.find((tag) => tag.value.toLowerCase() === text.toLowerCase())?.value || "";
}
