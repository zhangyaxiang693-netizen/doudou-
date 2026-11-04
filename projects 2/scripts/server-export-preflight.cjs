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
                props: { descriptionText: "服务端字体与透明切图自检", buttonText: "填写地址" },
              }],
            }],
          },
        },
      },
    };
    const checks = [];
    // A single successful export cannot detect Chromium reuse failures.
    for (let index = 1; index <= 3; index++) {
      job.id = `export-preflight-${index}`;
      const description = `服务端字体与透明切图自检第${index}次`;
      job.input_json.snapshot.editor.pages[0].nodes[0].props.descriptionText = description;
      const entries = await renderer.plan(job);
      const item = entries.find((entry) => !/背景/.test(entry.name));
      if (!item) throw new Error("无法找到自检组件");
      const page = renderer.page;
      const bytes = await renderer.capture(job, item);
      const image = PNG.sync.read(bytes);
      if (!image.width || !image.height || image.data[3] !== 0) throw new Error("切图尺寸或透明背景自检失败");
      if (renderer.page !== page) throw new Error("同一任务未复用渲染页面");
      if (!(await page.locator("[data-server-capture]").textContent()).includes(description)) {
        throw new Error("导出文案与当前任务不一致");
      }
      checks.push({ job: index, width: image.width, height: image.height, bytes: bytes.length });
    }
    console.log(JSON.stringify({
      ready: true, platform: process.platform, architecture: process.arch,
      node: process.version, chromium: renderer.browser.version(),
      jobs: checks.length, checks,
    }, null, 2));
  } finally { await renderer.close(); }
}
main().catch((error) => {
  console.error(`服务端导出自检失败：${error.message}`);
  process.exitCode = 1;
});
