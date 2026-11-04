const { gunzip } = require("node:zlib");
const { promisify } = require("node:util");
const { MAX_REQUEST_BYTES, snapshotError, RECORD_ID_PATTERN, OPERATION_ID_PATTERN } = require("./project-record-contract.cjs");
const { ProjectRecordError, recordStorageError } = require("./project-record-repository.cjs");
const gunzipAsync = promisify(gunzip);

function validPart(id, operation, index, part) {
  return RECORD_ID_PATTERN.test(id) && OPERATION_ID_PATTERN.test(operation) &&
    Number.isInteger(index) && Number.isInteger(part?.totalParts) &&
    index >= 0 && index < part.totalParts && part.totalParts <= 160 &&
    ["gzip", "identity"].includes(part.encoding) && typeof part.data === "string" &&
    part.data.length > 0 && part.data.length <= 349528 &&
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(part.data) &&
    Buffer.from(part.data, "base64").length <= 256 * 1024;
}

function createProjectUploadRepository(supabase, records) {
  async function stageUpload(user, id, operation, index, part) {
    if (!validPart(id, operation, index, part)) throw new ProjectRecordError("INVALID_UPLOAD", "上传分片格式无效");
    const { error } = await supabase.rpc("stage_project_save_chunk", {
      p_user_id: user.id, p_record_id: id, p_operation_id: operation,
      p_part_index: index, p_total_parts: part.totalParts, p_encoding: part.encoding, p_data: part.data,
    });
    if (error) throw recordStorageError(error);
  }

  async function commitUpload(user, id, operation, isAdmin = false) {
    const args = { p_user_id: user.id, p_record_id: id, p_operation_id: operation };
    const { data: parts, error } = await supabase.rpc("read_project_save_upload", args);
    if (error) throw recordStorageError(error);
    const count = parts?.[0]?.totalParts;
    if (!Array.isArray(parts) || !count || count !== parts.length || count > 160 ||
        parts.some((part, index) => part.index !== index || part.totalParts !== count ||
          part.encoding !== parts[0].encoding || !validPart(id, operation, index, part))) {
      throw new ProjectRecordError("INCOMPLETE_UPLOAD", "保存分片不完整或已过期，请再次保存");
    }
    let body;
    try {
      let bytes = Buffer.concat(parts.map((part) => Buffer.from(part.data, "base64")));
      if (bytes.length > MAX_REQUEST_BYTES) throw new Error("oversize");
      if (parts[0].encoding === "gzip") bytes = await gunzipAsync(bytes, { maxOutputLength: MAX_REQUEST_BYTES });
      body = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    } catch {
      throw new ProjectRecordError("INVALID_UPLOAD", "保存分片无法完整读取，请再次保存");
    }
    const invalid = snapshotError(body?.snapshot);
    if (invalid || body?.operationId !== operation || typeof body.create !== "boolean" ||
      typeof body.name !== "string" || !body.name.trim() || body.name.length > 120) {
      throw new ProjectRecordError(invalid || "INVALID_UPLOAD", "项目保存数据无效或超过32MiB，当前编辑已保留");
    }
    // Allowlist excludes owner/admin claims and binds the command to the route.
    const result = await records.writeRecord(user, id, {
      name: body.name.trim(), snapshot: body.snapshot, operationId: operation, create: body.create,
      ...(body.scope !== undefined ? { scope: body.scope } : {}),
      ...(body.teamId !== undefined ? { teamId: body.teamId } : {}),
    }, isAdmin);
    // A cleanup failure cannot turn a committed save into a failure.
    try { await supabase.rpc("drop_project_save_upload", args); } catch {}
    return result;
  }
  return { stageUpload, commitUpload };
}

module.exports = { createProjectUploadRepository, validPart };
