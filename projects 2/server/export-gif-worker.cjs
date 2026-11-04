const { parentPort, workerData } = require("node:worker_threads");
const { PNG } = require("pngjs");
const { GIFEncoder, quantize } = require("gifenc");
const MAX_BYTES = 2 * 1024 * 1024;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

function encodeGif(buffers, regions) {
  const frames = buffers.map((buffer) => PNG.sync.read(Buffer.from(buffer)));
  const { width, height } = frames[0];
  if (frames.some((frame) => frame.width !== width || frame.height !== height)) throw new Error("GIF 帧尺寸不一致");
  const mask = new Uint8Array(width * height);
  for (const region of regions) {
    const left = Math.max(0, Math.floor(region.left * width) - 3);
    const right = Math.min(width, Math.ceil(region.right * width) + 3);
    const top = Math.max(0, Math.floor(region.top * height) - 3);
    const bottom = Math.min(height, Math.ceil(region.bottom * height) + 3);
    for (let y = top; y < bottom; y++) mask.fill(1, y * width + left, y * width + right);
  }
  const reference = frames[frames.length - 1].data;
  for (const frame of frames) {
    for (let pixel = 0; pixel < mask.length; pixel++) {
      const offset = pixel * 4;
      if (!mask[pixel]) reference.copy(frame.data, offset, offset, offset + 4);
      const alpha = frame.data[offset + 3];
      if (alpha < 8) { frame.data[offset + 3] = 0; continue; }
      if (alpha < 255) {
        for (let channel = 0; channel < 3; channel++) {
          frame.data[offset + channel] = Math.round((frame.data[offset + channel] * alpha + 255 * (255 - alpha)) / 255);
        }
        frame.data[offset + 3] = 255;
      }
    }
  }
  const stride = Math.max(1, Math.ceil(width * height * frames.length / 1000000));
  const sample = Buffer.alloc(Math.ceil(width * height * frames.length / stride) * 4);
  let cursor = 0, written = 0, stableAlpha = true;
  for (const frame of frames) {
    for (let offset = 0; offset < frame.data.length; offset += 4, cursor++) {
      if ((frame.data[offset + 3] === 0) !== (frames[0].data[offset + 3] === 0)) stableAlpha = false;
      if (!frame.data[offset + 3] || cursor % stride) continue;
      frame.data.copy(sample, written, offset, offset + 4); written += 4;
    }
  }
  const palette = quantize(sample.subarray(0, Math.max(4, written)), 255, { format: "rgb565" });
  const transparentIndex = palette.length;
  palette.push([0, 0, 0]);
  const cache = new Uint16Array(65536); cache.fill(0xffff);
  const indexed = frames.map((frame) => {
    const pixels = new Uint8Array(width * height);
    for (let pixel = 0; pixel < pixels.length; pixel++) {
      const offset = pixel * 4;
      if (!frame.data[offset + 3]) { pixels[pixel] = transparentIndex; continue; }
      const x = pixel % width, y = Math.floor(pixel / width);
      const adjustment = ((BAYER[y % 4 * 4 + x % 4] + .5) / 16 - .5) * 8;
      const r = Math.max(0, Math.min(255, Math.round(frame.data[offset] + adjustment)));
      const g = Math.max(0, Math.min(255, Math.round(frame.data[offset + 1] + adjustment)));
      const b = Math.max(0, Math.min(255, Math.round(frame.data[offset + 2] + adjustment)));
      const key = ((r << 8) & 0xf800) | ((g << 2) & 0x3e0) | (b >> 3);
      if (cache[key] === 0xffff) {
        let distance = Infinity, nearest = 0;
        for (let i = 0; i < transparentIndex; i++) {
          const color = palette[i];
          const current = (r - color[0]) ** 2 + (g - color[1]) ** 2 + (b - color[2]) ** 2;
          if (current < distance) { distance = current; nearest = i; }
        }
        cache[key] = nearest;
      }
      pixels[pixel] = cache[key];
    }
    return pixels;
  });
  for (const count of [20, 18, 16, 14, 12, 10, 8]) {
    const gif = GIFEncoder();
    let previous;
    for (let i = 0; i < count; i++) {
      const frame = indexed[Math.min(indexed.length - 1, Math.floor(i * indexed.length / count))];
      let pixels = frame;
      // Stable alpha permits delta frames without clearing the background.
      if (stableAlpha && previous) {
        pixels = frame.slice();
        for (let p = 0; p < pixels.length; p++) if (frame[p] === previous[p]) pixels[p] = transparentIndex;
      }
      gif.writeFrame(pixels, width, height, {
        ...(i === 0 ? { palette } : {}), delay: 1200 / count, repeat: 0,
        transparent: true, transparentIndex, dispose: stableAlpha ? 1 : 2,
      });
      previous = frame;
    }
    gif.finish();
    const bytes = Buffer.from(gif.bytes());
    if (bytes.length <= MAX_BYTES) return bytes;
  }
  throw new Error("当前画面无法在保证清晰度的同时压缩到 2MB 以内");
}
if (parentPort) {
  try {
    const bytes = encodeGif(workerData.buffers, workerData.regions);
    parentPort.postMessage({ bytes });
  } catch (error) { parentPort.postMessage({ error: error.message }); }
}
module.exports = { encodeGif };
