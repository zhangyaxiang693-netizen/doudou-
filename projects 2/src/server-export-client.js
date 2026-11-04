import { getAdminToken } from "./collaboration/api.js";
import "./server-export.css";

let active = null;
let panel = null;
let currentUser = "";

async function request(path, { body, ...options } = {}) {
  let response;
  try {
    response = await fetch(`/api/exports${path}`, {
      credentials: "same-origin", cache: "no-store", signal: AbortSignal.timeout(60000),
      ...options,
      headers: { "Content-Type": "application/json", "x-export-user": currentUser, ...(getAdminToken() ? { "x-admin-token": getAdminToken() } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error("连接中断，导出进度已保留。网络恢复后点击继续；登录过期时请先重新登录");
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) throw new Error(result?.error || `导出请求失败（${response.status}）`);
  return result.data;
}
function download(job) {
  const link = document.createElement("a");
  link.href = `${job.downloadUrl}?user=${encodeURIComponent(currentUser)}`;
  link.download = job.filename;
  document.body.append(link);
  link.click();
  link.remove();
}
function progressText(job) {
  if (job.status === "ready") return "生成完成";
  if (job.status === "failed") return job.error || "生成失败，已保留进度";
  if (job.status === "cancelled") return "已取消";
  if (job.phase === "pack") return `打包 ${job.packed}/${job.total}`;
  if (job.frames) return `生成 GIF ${job.frames}/20 帧`;
  return job.total ? `生成切图 ${job.completed}/${job.total}` : "准备导出";
}
function ensurePanel() {
  if (panel?.isConnected) return panel;
  panel = document.createElement("aside");
  panel.className = "server-export-panel";
  panel.setAttribute("aria-label", "导出任务");
  panel.innerHTML = '<header><strong>导出任务</strong><button type="button" data-export-close aria-label="收起">×</button></header><div data-export-jobs></div>';
  panel.querySelector("[data-export-close]").onclick = () => { panel.hidden = true; };
  document.body.append(panel);
  return panel;
}
function showJob(job, notice = "") {
  const root = ensurePanel(); root.hidden = false;
  const list = root.querySelector("[data-export-jobs]");
  let row = [...list.children].find((element) => element.dataset.jobId === job.id);
  if (!row) {
    row = document.createElement("div"); row.className = "server-export-job"; row.dataset.jobId = job.id;
    row.innerHTML = '<strong></strong><span role="status"></span><div></div>';
    list.prepend(row);
  }
  row.querySelector("strong").textContent = job.filename || "导出";
  row.querySelector("span").textContent = notice || progressText(job);
  const actions = row.querySelector("div"); actions.replaceChildren();
  const action = (label, callback) => {
    const button = document.createElement("button"); button.type = "button"; button.textContent = label;
    button.onclick = callback; actions.append(button);
  };
  if (active?.id === job.id && active.submitting) return;
  if (job.status === "ready") action("下载文件", () => download(job));
  else if (job.status !== "cancelled") {
    if (active?.id === job.id && !active.paused) action("暂停", () => { active.paused = true; showJob(job, "暂停中，当前图片完成后保留进度"); });
    else action("继续", () => continueJob(job).catch((error) => showJob(job, error.message)));
    action("取消任务", async () => {
      if (active?.id === job.id) active.paused = true;
      try { showJob(await request(`/${job.id}/cancel`, { method: "POST" })); }
      catch (error) { showJob(job, error.message); }
    });
  }
}
async function continueJob(initial) {
  if (active) {
    showJob(initial, "请先暂停当前导出任务，再继续此任务");
    return;
  }
  const run = { id: initial.id, paused: false }; active = run;
  let job = initial;
  try {
    if (job.status === "failed") job = await request(`/${job.id}/retry`, { method: "POST" });
    showJob(job);
    while (!run.paused && !["ready", "failed", "cancelled"].includes(job.status)) {
      job = await request(`/${job.id}/advance`, { method: "POST" });
      showJob(job);
      if (!["ready", "failed", "cancelled"].includes(job.status)) await new Promise((resolve) => window.setTimeout(resolve, 400));
    }
    if (job.status === "ready") download(job);
  } catch (error) {
    run.notice = error.message;
    throw error;
  } finally {
    active = null;
    showJob(job, run.notice || (run.paused && !["ready", "cancelled"].includes(job.status) ? "已暂停，点击继续可恢复进度" : ""));
  }
}
export async function runServerExport(input, userId) {
  currentUser = String(userId || "");
  if (active) { ensurePanel().hidden = false; return; }
  const pending = { id: crypto.randomUUID(), filename: input.filename, status: "pending" };
  // Repeat submission with the same id if the response was lost; never create
  // duplicate rendering jobs for one click.
  async function submit() {
    if (active) return;
    active = { id: pending.id, submitting: true, paused: false };
    showJob(pending, "提交活动内容");
    let job;
    try { job = await request("", { method: "POST", body: { ...input, id: pending.id } }); }
    catch (error) {
      active = null;
      showJob(pending, error.message);
      const actions = [...ensurePanel().querySelector("[data-export-jobs]").children].find((row) => row.dataset.jobId === pending.id)?.querySelector("div");
      actions?.replaceChildren();
      const retry = document.createElement("button"); retry.type = "button"; retry.textContent = "重新提交";
      retry.onclick = () => submit().catch(() => {});
      actions?.append(retry);
      throw error;
    }
    active = null;
    return continueJob(job);
  }
  return submit();
}
export async function refreshServerExports(userId, { show = false } = {}) {
  currentUser = String(userId || "");
  try {
    const jobs = await request("");
    if (!jobs.length) return;
    jobs.slice().reverse().forEach((job) => showJob(job));
    if (!show && !active) ensurePanel().hidden = true;
  } catch (error) {
    if (show) {
      ensurePanel().hidden = false;
      ensurePanel().querySelector("[data-export-jobs]").textContent = error.message;
    }
  }
}
export function openServerExports(userId) { return refreshServerExports(userId, { show: true }); }
