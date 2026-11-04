const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { chromium } = require("playwright-core");
const { ExportRenderer } = require("../export-renderer.cjs");

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
