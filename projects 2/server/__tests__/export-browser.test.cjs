const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { chromium } = require("playwright-core");
const { PNG } = require("pngjs");
const { ExportRenderer } = require("../export-renderer.cjs");

function liveRenderer(t, singleProcess = true) {
  const distDir = fs.mkdtempSync(path.join(os.tmpdir(), "export-browser-live-"));
  fs.writeFileSync(path.join(distDir, "server-render.html"), `<!doctype html>
    <style>[data-server-capture] { width: 100px; height: 50px; background: white; }</style>
    <div data-server-capture></div>
    <script>
      window.serverExportRuntime = {
        load(input) {
          if (input.failLoad) throw new Error("fixture load failed");
          document.querySelector("[data-server-capture]").textContent = input.text;
        },
        plan() { return [{ id: "note", name: "note" }]; },
        render() { return { width: 100, height: 50 }; }
      };
    </script>`);
  // Keep real browser rendering. Linux's bundled single-process Chromium can
  // exit when its last context closes; macOS Chrome does not reproduce that exit.
  // The consecutive-jobs test reproduces that one observed effect below.
  const launch = chromium.launch.bind(chromium);
  t.mock.method(chromium, "launch", (options) => launch({
    ...options,
    args: [...new Set([...options.args, ...(singleProcess ? ["--single-process", "--no-sandbox", "--in-process-gpu"] : [])])],
  }));
  const renderer = new ExportRenderer({ distDir });
  t.after(async () => {
    await renderer.close();
    fs.rmSync(distDir, { recursive: true, force: true });
  });
  return renderer;
}
function liveJob(id, text, extra = {}) {
  return { id, owner_id: "browser-check", input_json: { text, ...extra, selection: { kind: "single" } } };
}

test("single-process Chromium exports consecutive jobs and reuses pages within each job", async (t) => {
  const renderer = liveRenderer(t);
  for (let index = 0; index < 3; index++) {
    const job = liveJob(`job-${index}`, `job content ${index}`);
    const [item] = await renderer.plan(job);
    const page = renderer.page;
    const first = await renderer.capture(job, item);
    const second = await renderer.capture(job, item);
    assert.equal(renderer.page, page, "a batch must not restart Chromium for every image");
    assert.deepEqual(first, second);
    const image = PNG.sync.read(first);
    assert.equal(image.width, 100);
    assert.equal(image.height, 50);
    assert.equal(await renderer.page.locator("[data-server-capture]").textContent(), job.input_json.text);
    if (process.platform === "darwin") {
      const browser = renderer.browser;
      t.mock.method(renderer.context, "close", () => browser.close());
    }
  }
  // A closed context must be replaced even when continuing the same job.
  const job = liveJob("job-2", "job content 2");
  await renderer.context.close();
  const [item] = await renderer.plan(job);
  assert.equal(PNG.sync.read(await renderer.capture(job, item)).width, 100);
});

test("failed page initialization releases Chromium before retrying the job", async (t) => {
  const renderer = liveRenderer(t, false);
  const job = liveJob("failed-job", "recovered", { failLoad: true });
  await assert.rejects(renderer.plan(job), /fixture load failed/);
  assert.equal(renderer.browser === null, true, "failed initialization must release the browser immediately");
  job.input_json.failLoad = false;
  const [item] = await renderer.plan(job);
  assert.equal(PNG.sync.read(await renderer.capture(job, item)).height, 50);
  assert.equal(await renderer.page.locator("[data-server-capture]").textContent(), "recovered");
});

test("Linux exports load packaged NSPR libraries even when Chromium is already cached", async (t) => {
  const distDir = fs.mkdtempSync(path.join(os.tmpdir(), "export-browser-check-"));
  fs.writeFileSync(path.join(distDir, "server-render.html"), "<html></html>");
  const bundlePath = require.resolve("@sparticuz/chromium");
  const nativeBundle = require(bundlePath);
  const cached = require.cache[bundlePath];
  const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform");
  const originalLibraryPath = process.env.LD_LIBRARY_PATH;
  const renderer = new ExportRenderer({ distDir });
  t.after(async () => {
    await renderer.close();
    cached.exports = nativeBundle;
    Object.defineProperty(process, "platform", originalPlatform);
    if (originalLibraryPath === undefined) delete process.env.LD_LIBRARY_PATH;
    else process.env.LD_LIBRARY_PATH = originalLibraryPath;
    fs.rmSync(distDir, { recursive: true, force: true });
  });
  // Keep the real archive extraction. Only Linux binary execution is isolated
  // so this regression also runs on a developer's macOS machine.
  cached.exports = {
    ...nativeBundle,
    default: {
      args: nativeBundle.default.args,
      async executablePath() { return path.join(os.tmpdir(), "chromium"); },
    },
  };
  Object.defineProperty(process, "platform", { ...originalPlatform, value: "linux" });
  process.env.LD_LIBRARY_PATH = "/existing-runtime-libraries";
  let launchOptions;
  t.mock.method(chromium, "launch", async (options) => {
    launchOptions = options;
    return { isConnected: () => true, async close() {} };
  });
  await renderer.open();
  assert.ok(launchOptions.env?.LD_LIBRARY_PATH, "Chromium needs an explicit packaged library search path");
  const libraryPaths = launchOptions.env.LD_LIBRARY_PATH.split(":");
  const bundledLib = path.join(os.tmpdir(), "al2023", "lib");
  assert.equal(libraryPaths[0], bundledLib);
  assert.ok(fs.existsSync(path.join(bundledLib, "libnspr4.so")), "the missing production library must actually be extracted");
  assert.ok(fs.existsSync(path.join(bundledLib, "libnss3.so")));
  assert.ok(libraryPaths.includes("/existing-runtime-libraries"));
  assert.equal(process.env.LD_LIBRARY_PATH, "/existing-runtime-libraries", "browser configuration must not alter the server environment");
});
