const { getSupabaseServiceClient } = require("./supabase-client.cjs");
const { crc32 } = require("./export-zip.cjs");
const CHUNK_BYTES = 512 * 1024;
class ExportError extends Error {
  constructor(message, code = "EXPORT_FAILED", status = 500) {
    super(message); this.code = code; this.status = status;
  }
}
function unwrap({ data, error }) {
  if (error) {
    const message = error.message || "";
    if (message.includes("EXPORT_LEASE_LOST")) throw new ExportError("任务已由另一个实例接手，请稍后继续", "EXPORT_LEASE_LOST", 409);
    if (message.includes("EXPORT_ACTIVE_LIMIT")) throw new ExportError("已有两个未完成的导出任务，请先继续或取消", "EXPORT_ACTIVE_LIMIT", 429);
    if (message.includes("EXPORT_ID_CONFLICT")) throw new ExportError("导出任务编号已被使用", "EXPORT_ID_CONFLICT", 409);
    if (error.code === "42P01" || error.code === "PGRST202" || error.code === "PGRST205") {
      throw new ExportError("服务端导出尚未初始化，请先执行导出迁移 SQL", "EXPORT_NOT_CONFIGURED", 503);
    }
    console.error("[export-db]", error.code, message);
    throw new ExportError("导出存储暂时不可用，请稍后重试", "EXPORT_STORAGE_UNAVAILABLE", 503);
  }
  return data;
}
class ExportRepository {
  constructor(client) { this.client = client; }
  db() { return this.client ||= getSupabaseServiceClient(); }
  async create(owner, input, hash, build, filename) {
    const data = unwrap(await this.db().rpc("create_export_job", {
      p_id: input.id, p_owner: owner, p_input: input, p_hash: hash, p_build: build, p_filename: filename,
    }));
    return Array.isArray(data) ? data[0] : data;
  }
  async get(owner, id) {
    return unwrap(await this.db().from("export_jobs").select("*").eq("id", id).eq("owner_id", owner)
      .gt("expires_at", new Date().toISOString()).maybeSingle());
  }
  async list(owner) {
    unwrap(await this.db().rpc("cleanup_export_jobs"));
    return unwrap(await this.db().from("export_jobs").select("id,status,filename,progress_json,error,created_at,expires_at")
      .eq("owner_id", owner).neq("status", "cancelled").gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false }).limit(20));
  }
  async claim(owner, id, token) {
    const data = unwrap(await this.db().rpc("claim_export_job", { p_id: id, p_owner: owner, p_token: token }));
    return Array.isArray(data) ? data[0] : data;
  }
  async checkpoint(job, token, progress, status = "pending", error = null) {
    const data = unwrap(await this.db().rpc("checkpoint_export_job", {
      p_id: job.id, p_token: token, p_progress: progress, p_status: status, p_error: error,
    }));
    return Array.isArray(data) ? data[0] : data;
  }
  async putChunk(job, token, file, part, bytes) {
    unwrap(await this.db().rpc("write_export_chunk", {
      p_id: job.id, p_token: token, p_file: file, p_part: part,
      p_data: bytes.toString("base64"), p_bytes: bytes.length,
    }));
  }
  async putBuffer(job, token, file, bytes, partStart = 0) {
    let parts = 0;
    for (let start = 0; start < bytes.length; start += CHUNK_BYTES) {
      await this.putChunk(job, token, file, partStart + parts++, bytes.subarray(start, start + CHUNK_BYTES));
    }
    return { size: bytes.length, parts, crc: crc32(bytes) };
  }
  async getChunk(job, file, part) {
    const row = unwrap(await this.db().from("export_job_chunks").select("data,byte_count")
      .eq("job_id", job.id).eq("file_index", file).eq("part_index", part).single());
    const bytes = Buffer.from(row.data, "base64");
    if (bytes.length !== row.byte_count) throw new ExportError("导出文件分块不完整，请重新生成");
    return bytes;
  }
  async readBuffer(job, file, metadata) {
    const chunks = [];
    for (let i = 0; i < metadata.parts; i++) chunks.push(await this.getChunk(job, file, i));
    const bytes = Buffer.concat(chunks);
    if (bytes.length !== metadata.size) throw new ExportError("导出文件不完整");
    return bytes;
  }
  async partSizes(job, file, start, end) {
    return unwrap(await this.db().from("export_job_chunks").select("part_index,byte_count")
      .eq("job_id", job.id).eq("file_index", file).gte("part_index", start).lte("part_index", end)
      .order("part_index"));
  }
  async change(owner, id, action) {
    const updates = action === "retry"
      ? { status: "pending", error: null, lease_token: null, leased_until: null }
      : { status: "cancelled", input_json: {}, lease_token: null, leased_until: null };
    const query = this.db().from("export_jobs").update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id).eq("owner_id", owner).gt("expires_at", new Date().toISOString());
    const row = unwrap(await (action === "retry" ? query.eq("status", "failed") : query.in("status", ["pending", "running", "failed"]))
      .select("*").maybeSingle());
    if (row && action !== "retry") unwrap(await this.db().from("export_job_chunks").delete().eq("job_id", id));
    return row || this.get(owner, id);
  }
}
module.exports = { ExportRepository, ExportError, CHUNK_BYTES };
