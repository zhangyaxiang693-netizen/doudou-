const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const { PNG } = require("pngjs");
const { ExportRenderer } = require("../export-renderer.cjs");

const distDir = path.join(__dirname, "../../dist");
const enabled = process.env.EXPORT_VISUAL_TESTS === "1";

function headerJob(text) {
  return {
    id: `header-font-${text}`, owner_id: "font-regression",
    input_json: {
      format: "zip", selection: { kind: "all" }, filename: "切图.zip",
      snapshot: {
        schemaVersion: 3,
        editor: {
          workflowType: "venue", guidedPageThemeId: "pink",
          pages: [{
            id: "font-page", name: "字体排版", colorThemeId: "pink",
            nodes: [{ id: "font-header", schemaId: "头图", type: "atom", props: {
              text, dateText: "6月10日-6月21日",
            } }],
          }],
        },
      },
    },
  };
}

async function titleLayout(page) {
  return page.locator('[data-react-edit-prop="text"]').evaluate((title) => ({
    lines: [...title.children].map((line) => line.textContent),
    overflow: [...title.children].flatMap((line) => {
      const box = line.getBoundingClientRect();
      const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
      const clipped = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        for (let index = 0; index < node.length; index++) {
          const range = document.createRange();
          range.setStart(node, index); range.setEnd(node, index + 1);
          const rect = range.getBoundingClientRect();
          if (rect.left < box.left - 1 || rect.right > box.right + 1 || rect.top >= box.bottom - 1) {
            clipped.push(node.textContent[index]);
          }
        }
      }
      return clipped;
    }),
  }));
}

test("real PNG keeps every header glyph and matches a render with cached fonts", {
  skip: !enabled && "set EXPORT_VISUAL_TESTS=1 after npm run build",
}, async (t) => {
  assert.ok(fs.existsSync(path.join(distDir, "server-render.html")), "build the real rendering entry first");
  const renderer = new ExportRenderer({ distDir });
  t.after(() => renderer.close());
  const job = headerJob("抽888元流量大奖");
  const entries = await renderer.plan(job);
  const item = entries.find((entry) => entry.id.includes("__font-header__"));
  assert.ok(item, "the snapshot must select the real header cut");
  await renderer.page.evaluate(() => {
    // macOS has a CJK fallback that Linux's minimal image does not. Reproduce
    // narrow fallback metrics only until the real font readiness barrier;
    // final layout and every PNG pixel still use the real production fonts.
    let fontsReady = false;
    const measure = CanvasRenderingContext2D.prototype.measureText;
    CanvasRenderingContext2D.prototype.measureText = function (text) {
      const metrics = measure.call(this, text);
      if (!fontsReady && this.font.includes("MFBenHeiNoncommercial") && /[\u4e00-\u9fff]/.test(text)) {
        return { width: metrics.width * 0.62 };
      }
      return metrics;
    };
    const load = document.fonts.load.bind(document.fonts);
    document.fonts.load = async (...args) => {
      const faces = await load(...args);
      fontsReady = true;
      return faces;
    };
  });
  const coldPng = await renderer.capture(job, item);
  const cold = await titleLayout(renderer.page);
  const warmPng = await renderer.capture(job, item);
  const warm = await titleLayout(renderer.page);
  if (process.env.EXPORT_EVIDENCE_DIR) {
    fs.writeFileSync(path.join(process.env.EXPORT_EVIDENCE_DIR, "头图-首次下载.png"), coldPng);
    fs.writeFileSync(path.join(process.env.EXPORT_EVIDENCE_DIR, "头图-再次下载.png"), warmPng);
  }
  assert.deepEqual(cold, warm, "a fresh export cannot retain wrapping calculated with fallback fonts");
  assert.deepEqual(cold.lines, ["抽888元流", "量大奖"]);
  assert.deepEqual(cold.overflow, [], "no glyph may wrap behind the following title line");
  assert.deepEqual(coldPng, warmPng, "actual PNG pixels must match with cold and cached fonts");
  const png = PNG.sync.read(coldPng);
  assert.equal(png.width, 750);
  assert.equal(png.height, 400);
  assert.equal(await renderer.page.locator('[contenteditable="true"]').count(), 0);
});

test("real export refuses a registered font that fails to load", {
  skip: !enabled && "set EXPORT_VISUAL_TESTS=1 after npm run build",
}, async (t) => {
  const renderer = new ExportRenderer({ distDir });
  t.after(() => renderer.close());
  const job = headerJob("抽666元流量大奖");
  const entries = await renderer.plan(job);
  const item = entries.find((entry) => entry.id.includes("__font-header__"));
  await renderer.page.evaluate(() => {
    document.fonts.load = async () => { throw new Error("字体加载失败回归用例"); };
  });
  await assert.rejects(renderer.capture(job, item), /字体加载失败/);
});
