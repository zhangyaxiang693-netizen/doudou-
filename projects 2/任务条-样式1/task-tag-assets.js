import newTagUrl from "./new.png";
import aiTagUrl from "./标签-ai投放.png";
import methodologyTagUrl from "./标签-方法论.png";
import benchmarkTagUrl from "./标签-标杆领航.png";
import { normalizeTaskTag } from "../src/task-tags.js";

const assets = {
  new: { src: newTagUrl, label: "NEW", width: 75, height: 33 },
  ai投放: { src: aiTagUrl, label: "ai投放", width: 92, height: 40 },
  方法论: { src: methodologyTagUrl, label: "方法论", width: 92, height: 40 },
  标杆领航: { src: benchmarkTagUrl, label: "标杆领航", width: 116, height: 40 },
};

export function getTaskTagAsset(value) {
  return assets[normalizeTaskTag(value)] || null;
}
