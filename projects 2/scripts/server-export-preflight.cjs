// Run in the deployment runtime after building. Does not access the database.
const { PNG } = require("pngjs");
const { ExportRenderer } = require("../server/export-renderer.cjs");

async function main() {
  const renderer = new ExportRenderer();
  try {
    const job = {
      id: "export-preflight", owner_id: "export-preflight",
      input_json: {
        filename: "自检.png", format: "png", selection: { kind: "all" },
        snapshot: {
          schemaVersion: 3, savedAt: new Date().toISOString(),
          editor: {
            workflowType: "venue", guidedPageThemeId: "pink",
            activity: { name: "服务端导出自检" },
            pages: [{
              id: "page", name: "自检", dimension: "个人用户",
              nodes: [{
                id: "note", schemaId: "随机奖品填写地址",
                props: { prizeDescription: "服务端字体与透明切图自检", buttonText: "填写地址" },
              }],
            }],
          },
        },
      },
    };
    const entries = await renderer.plan(job);
    const item = entries.find((entry) => !/背景/.test(entry.name));
    if (!item) throw new Error("无法找到自检组件");
    const bytes = await renderer.capture(job, item);
    const image = PNG.sync.read(bytes);
    if (!image.width || !image.height || image.data[3] !== 0) throw new Error("切图尺寸或透明背景自检失败");
    console.log(JSON.stringify({
      ready: true, platform: process.platform, architecture: process.arch,
      node: process.version, chromium: renderer.browser.version(),
      width: image.width, height: image.height, bytes: bytes.length,
    }, null, 2));
  } finally { await renderer.close(); }
}
main().catch((error) => {
  console.error(`服务端导出自检失败：${error.message}`);
  process.exitCode = 1;
});
