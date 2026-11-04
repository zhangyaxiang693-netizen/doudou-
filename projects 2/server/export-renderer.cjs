const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { Worker } = require("node:worker_threads");
const { chromium } = require("playwright-core");
const { ExportError } = require("./export-repository.cjs");

class ExportRenderer {
  constructor({ distDir = path.join(__dirname, "..", "dist"), executablePath } = {}) {
    this.distDir = distDir;
    this.executablePath = executablePath;
    const entry = path.join(distDir, "server-render.html");
    if (!fs.existsSync(entry)) throw new ExportError("缺少服务端渲染构建产物，请重新构建部署", "EXPORT_NOT_BUILT", 503);
    const hash = crypto.createHash("sha256").update(fs.readFileSync(entry));
    for (const file of ["export-gif-worker.cjs", "export-renderer.cjs", "export-jobs.cjs", "export-zip.cjs"]) {
      hash.update(fs.readFileSync(path.join(__dirname, file)));
    }
    this.buildId = hash.digest("hex").slice(0, 24);
  }
  async open() {
    if (this.browser?.isConnected()) return;
    if (this.opening) return this.opening;
    this.opening = (async () => {
      if (!this.assetServer) {
        const app = express();
        app.use(express.static(this.distDir, { index: false, fallthrough: false }));
        this.assetServer = await new Promise((resolve, reject) => {
          const server = app.listen(0, "127.0.0.1", () => resolve(server));
          server.once("error", reject);
        });
        this.assetServer.unref();
        this.origin = `http://127.0.0.1:${this.assetServer.address().port}`;
      }
      let executablePath = this.executablePath || process.env.EXPORT_CHROMIUM_PATH;
      let args = ["--disable-dev-shm-usage"];
      if (!executablePath && process.platform === "darwin") executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
      if (!executablePath && process.platform === "linux") {
        const bundled = require("@sparticuz/chromium").default;
        executablePath = await bundled.executablePath();
        args = bundled.args;
      }
      if (!executablePath) throw new ExportError("请配置 EXPORT_CHROMIUM_PATH", "EXPORT_BROWSER_MISSING", 503);
      this.browser = await chromium.launch({ executablePath, args, headless: true, timeout: 25000 });
    })().finally(() => { this.opening = null; });
    return this.opening;
  }
  async pageFor(job) {
    await this.open();
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => this.close().catch(() => {}), 120000);
    this.idleTimer.unref();
    if (this.jobId === job.id && this.page && !this.page.isClosed()) return this.page;
    await this.context?.close();
    this.context = await this.browser.newContext({
      viewport: { width: 1200, height: 1000 }, deviceScaleFactor: job.input_json.selection.kind === "admin" ? 2 : 1,
      serviceWorkers: "block", reducedMotion: "no-preference",
    });
    await this.context.addInitScript((ownerId) => {
      window.currentUser = { employeeId: ownerId, name: "导出任务" };
    }, job.owner_id || "server-renderer");
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(25000);
    this.loadErrors = [];
    this.page.on("pageerror", (error) => this.loadErrors.push(error.message));
    this.assetErrors = new Set();
    await this.page.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.protocol === "data:" || url.protocol === "blob:") return route.continue();
      if (url.origin === this.origin && (url.pathname === "/server-render.html" || url.pathname.startsWith("/assets/"))) return route.continue();
      // Old snapshots contain absolute deployed asset URLs. Resolve their
      // hashed filenames against the current local build without network access.
      if (url.pathname.startsWith("/assets/")) {
        const relative = decodeURIComponent(url.pathname).slice(1);
        const file = path.resolve(this.distDir, relative);
        if (file.startsWith(path.join(this.distDir, "assets") + path.sep) && fs.existsSync(file)) {
          return route.fulfill({ response: await route.fetch({ url: `${this.origin}${url.pathname}` }) });
        }
      }
      this.assetErrors.add(url.pathname.slice(0, 160));
      return route.abort();
    });
    this.page.on("response", (response) => {
      if (response.status() >= 400) this.assetErrors.add(new URL(response.url()).pathname.slice(0, 160));
    });
    await this.page.goto(`${this.origin}/server-render.html`, { waitUntil: "networkidle", timeout: 30000 });
    await this.page.waitForFunction(() => Boolean(window.serverExportRuntime || window.serverExportLoadError))
      .catch((error) => { throw new ExportError(`渲染入口加载失败：${this.loadErrors[0] || [...this.assetErrors][0] || error.message}`); });
    const loadError = await this.page.evaluate(() => window.serverExportLoadError);
    if (loadError) throw new ExportError(`渲染入口加载失败：${loadError}`);
    await this.page.evaluate((input) => window.serverExportRuntime.load(input), job.input_json);
    this.jobId = job.id;
    return this.page;
  }
  async plan(job) {
    const page = await this.pageFor(job);
    return page.evaluate(() => window.serverExportRuntime.plan());
  }
  async prepare(job, item, format = "png") {
    const page = await this.pageFor(job);
    this.assetErrors.clear();
    const dimensions = await page.evaluate(({ id, format }) => window.serverExportRuntime.render(id, format), { id: item.id, format });
    if (!dimensions.width || !dimensions.height || dimensions.width * dimensions.height > (format === "gif" ? 2000000 : 16000000)) {
      throw new ExportError("切图尺寸过大，请缩减单个组件内容", "EXPORT_DIMENSIONS_TOO_LARGE", 413);
    }
    if (this.assetErrors.size) throw new ExportError(`切图素材不可用：${[...this.assetErrors][0]}`, "EXPORT_ASSET_MISSING", 422);
    return page;
  }
  async capture(job, item) {
    const page = await this.prepare(job, item);
    return page.locator("[data-server-capture]").screenshot({ type: "png", omitBackground: true, animations: "disabled", timeout: 25000 });
  }
  async captureFrames(job, item, start, count) {
    const page = await this.prepare(job, item, "gif");
    const frames = [], regions = [];
    for (let index = start; index < start + count; index++) {
      regions.push(...await page.evaluate((time) => window.serverExportRuntime.frame(time), index * 60));
      frames.push(await page.locator("[data-server-capture]").screenshot({ type: "png", omitBackground: true, animations: "allow", timeout: 25000 }));
    }
    return { frames, regions };
  }
  encodeGif(buffers, regions) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, "export-gif-worker.cjs"), { workerData: { buffers, regions } });
      const timer = setTimeout(() => {
        worker.terminate();
        reject(new ExportError("GIF 压缩超时，请稍后重试", "EXPORT_GIF_TIMEOUT", 503));
      }, 30000);
      worker.once("message", (result) => {
        clearTimeout(timer);
        worker.terminate();
        result.error ? reject(new ExportError(result.error, "EXPORT_GIF_FAILED", 422)) : resolve(Buffer.from(result.bytes));
      });
      worker.once("error", (error) => { clearTimeout(timer); reject(error); });
      worker.once("exit", (code) => { if (code && code !== 1) { clearTimeout(timer); reject(new ExportError("GIF 压缩进程退出")); } });
    });
  }
  async close() {
    clearTimeout(this.idleTimer);
    this.jobId = null;
    const browser = this.browser; this.browser = null;
    this.page = null; this.context = null;
    await browser?.close();
    if (this.assetServer) {
      await new Promise((resolve) => this.assetServer.close(resolve));
      this.assetServer = null;
    }
  }
}
module.exports = { ExportRenderer };
