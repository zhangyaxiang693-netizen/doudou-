const MAX_SNAPSHOT_BYTES = 32 * 1024 * 1024;
const MAX_REQUEST_BYTES = 40 * 1024 * 1024;
const RECORD_ID_PATTERN = /^[a-zA-Z0-9_-]{1,160}$/;
const OPERATION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function snapshotError(snapshot) {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot) ||
    !Number.isInteger(snapshot.schemaVersion) || snapshot.schemaVersion < 1 ||
    typeof snapshot.savedAt !== "string" || !Number.isFinite(Date.parse(snapshot.savedAt)) ||
    !snapshot.editor || typeof snapshot.editor !== "object" || Array.isArray(snapshot.editor) ||
    !Array.isArray(snapshot.editor.pages)) return "INVALID_SNAPSHOT";
  try {
    return Buffer.byteLength(JSON.stringify(snapshot), "utf8") > MAX_SNAPSHOT_BYTES
      ? "SNAPSHOT_TOO_LARGE" : null;
  } catch {
    return "INVALID_SNAPSHOT";
  }
}

module.exports = {
  MAX_SNAPSHOT_BYTES, MAX_REQUEST_BYTES, RECORD_ID_PATTERN, OPERATION_ID_PATTERN, snapshotError,
};
