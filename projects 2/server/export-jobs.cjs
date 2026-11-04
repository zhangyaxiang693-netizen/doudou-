const { ExportError } = require("./export-repository.cjs");
const { zipLocalHeader, zipCentralDirectory } = require("./export-zip.cjs");
const MAX_OUTPUT_BYTES = 512 * 1024 * 1024;
const GIF_FRAMES = 20;
function publicJob(job) {
  const progress = job.progress_json || {};
  return {
    id: job.id, status: job.status, filename: job.filename, error: job.error || "",
    completed: progress.next || 0, total: progress.items?.length || 0,
    phase: progress.phase || "prepare", frames: progress.frames?.length || 0,
    packed: progress.packed || 0, size: progress.result?.size || 0,
    createdAt: job.created_at, expiresAt: job.expires_at,
    downloadUrl: job.status === "ready" ? `/api/exports/${job.id}/download` : null,
  };
}
async function advanceExportJob({ job, lease, repository, renderer }) {
  if (job.build_id !== renderer.buildId) throw new ExportError("服务已更新，请取消此任务并重新导出", "EXPORT_VERSION_CHANGED", 409);
  let progress = structuredClone(job.progress_json || {});
  if (!progress.items) {
    progress = { items: await renderer.plan(job), next: 0, phase: "render", files: [] };
    if (!progress.items.length || progress.items.length > 2000) throw new ExportError("可导出切图数量需在 1–2000 张之间", "EXPORT_INVALID", 400);
    return repository.checkpoint(job, lease, progress);
  }
  if (progress.phase === "render" && job.input_json.format === "gif") {
    const frames = progress.frames ||= [];
    // Persist four frames per request so GIF capture also survives FaaS restarts.
    if (frames.length < GIF_FRAMES) {
      const batch = await renderer.captureFrames(job, progress.items[0], frames.length, Math.min(4, GIF_FRAMES - frames.length));
      for (const frame of batch.frames) {
        frames.push(await repository.putBuffer(job, lease, 10000 + frames.length, frame));
      }
      (progress.regions ||= []).push(...batch.regions);
      return repository.checkpoint(job, lease, progress);
    }
    const buffers = [];
    for (let i = 0; i < frames.length; i++) buffers.push(await repository.readBuffer(job, 10000 + i, frames[i]));
    const bytes = await renderer.encodeGif(buffers, progress.regions);
    progress.files[0] = await repository.putBuffer(job, lease, 0, bytes);
    progress.next = 1;
    progress.result = { ...progress.files[0], fileIndex: 0, mime: "image/gif" };
    progress.phase = "done";
    delete progress.frames; delete progress.regions;
    return repository.checkpoint(job, lease, progress, "ready");
  }
  if (progress.phase === "render") {
    const index = progress.next;
    const bytes = await renderer.capture(job, progress.items[index]);
    progress.files[index] = await repository.putBuffer(job, lease, index, bytes);
    if (progress.files.reduce((sum, file) => sum + file.size, 0) > MAX_OUTPUT_BYTES) {
      throw new ExportError("本次切图超过 512MB，请按模块分别导出", "EXPORT_TOO_LARGE", 413);
    }
    progress.next++;
    if (progress.next === progress.items.length) {
      if (job.input_json.format !== "zip") {
        progress.result = { ...progress.files[0], fileIndex: 0, mime: "image/png" };
        progress.phase = "done";
        return repository.checkpoint(job, lease, progress, "ready");
      }
      progress.phase = "pack";
      progress.packed = 0; progress.zipParts = 0; progress.zipSize = 0; progress.offsets = [];
    }
    return repository.checkpoint(job, lease, progress);
  }
  // Append one already-persisted PNG to the ZIP per request, with bounded memory.
  if (progress.phase === "pack") {
    const index = progress.packed;
    if (index < progress.items.length) {
      const file = { ...progress.files[index], path: progress.items[index].path, offset: progress.zipSize };
      progress.offsets[index] = file.offset;
      const header = zipLocalHeader(file);
      let chunk = await repository.putBuffer(job, lease, -1, header, progress.zipParts);
      progress.zipParts += chunk.parts; progress.zipSize += chunk.size;
      for (let part = 0; part < file.parts; part++) {
        const bytes = await repository.getChunk(job, index, part);
        await repository.putChunk(job, lease, -1, progress.zipParts++, bytes);
        progress.zipSize += bytes.length;
      }
      progress.packed++;
      return repository.checkpoint(job, lease, progress);
    }
    const central = zipCentralDirectory(progress.items.map((item, i) => ({
      ...progress.files[i], path: item.path, offset: progress.offsets[i],
    })), progress.zipSize);
    const tail = await repository.putBuffer(job, lease, -1, central, progress.zipParts);
    progress.result = { fileIndex: -1, mime: "application/zip", parts: progress.zipParts + tail.parts, size: progress.zipSize + tail.size };
    progress.phase = "done";
    return repository.checkpoint(job, lease, progress, "ready");
  }
  throw new ExportError("导出任务状态无效，请重新生成");
}
module.exports = { advanceExportJob, publicJob, GIF_FRAMES };
