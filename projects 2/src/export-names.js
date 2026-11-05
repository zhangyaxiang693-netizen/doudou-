const SHORT_NAMES = {
  头图: "头图", HeaderImage: "头图", "S级-中秋头图": "中秋头图",
  账户优惠券提示: "优惠券提醒",
  "核心权益模块-bigday发券-样式1": "发券",
  "核心权益模块-bigday发券-样式1-已报名": "发券",
  "核心权益模块-bigday发券-样式2": "预约抢券",
  "核心权益模块-发券-样式2": "领券",
  "核心玩法模块-抽奖消返-3列": "抽奖消耗返",
  "核心玩法模块-抽奖消返-4列": "抽奖消耗返",
  "核心玩法模块-抽奖-未报名": "九宫格",
  "核心玩法模块-抽奖-已报名": "九宫格",
  "抽奖九宫格-报名前": "九宫格", "抽奖九宫格-报名后": "九宫格",
  投放抽奖: "投放抽奖", "投放抽奖-旧版": "投放抽奖旧版",
  "抽奖样式2": "投放抽奖", 任务列表: "任务",
  "任务条-样式1": "任务", "任务条-样式1-点击后": "任务", "任务条-样式2": "任务",
  投稿赢流量: "投稿赢流量", "投稿赢流量-样式2": "投稿赢流量",
  "投稿赢流量-样式3": "流量扶持", 流量扶持券: "流量扶持",
  "内容诊断-样式1-点击前": "内容诊断",
  "内容诊断-样式-点击后": "内容诊断",
  "内容诊断-优质视频提示": "内容诊断",
  "内容诊断-账号诊断": "内容诊断",
  "用户教育案例-样式1": "案例", "用户教育案例-样式2": "案例推荐",
  "内容案例-样式1": "案例内容", "内容案例-样式2": "案例内容",
  "用户教育-攻略": "投放攻略", "正文-用户教育": "投放攻略",
  AI智投: "AI智投", 智投星内容: "AI智投", 节点指南: "行业指南", "节点指南-内容": "行业指南",
  官方小助手模块: "官方小助手", 官方小助手: "官方小助手",
  置底按钮: "置底按钮", StickyBottomButton: "置底按钮",
  无活动提示: "活动火爆", "弹窗-中奖": "中奖", "弹窗-未中奖": "未中奖",
  挂件: "挂件", 下单页弹窗: "下单弹窗",
  顶部banner: "顶部Banner", 个人中心banner: "个人中心Banner",
  挽留页弹窗: "挽留弹窗", 详情页弹窗: "详情弹窗",
  资源弹窗1: "详情弹窗", 资源弹窗2: "挽留弹窗",
  "模块标题-正常": "模块标题", "标题+抽奖次数": "抽奖次数",
  "发券-样式1": "领券", "发券-样式2": "领券", "发券-样式3": "领券",
  "发券-样式4": "领券", "发券-样式4-已预约": "领券",
  "发券-样式4-立即抢": "领券", "发券-样式4-已结束": "领券",
  "消耗返-样式1-3个券": "消耗返券", "消耗返样式4个券": "消耗返券",
  "抽奖+消耗返3-3个券": "消耗返券",
  "消返券-样式1-3个券-立即领单个": "消耗返券", "消返券-样式1-3个券-已领取": "消耗返券",
  横排按钮数据条: "消耗数据", "正文-带消耗阶梯": "消耗阶梯",
  "正文-活动规则样式1": "活动规则", "正文-活动规则样式2": "活动规则", "正文-活动规则样式3": "活动规则",
  "正文-带底框样式1": "正文", "正文-带底框样式2": "正文", "正文-带底框样式3": "正文",
  "诊断建议-样式1": "诊断建议", "诊断建议-样式2": "诊断建议",
  "说明文-补充说明": "补充说明", 提示: "提示", 通知: "通知",
  大按钮: "按钮", "按钮-3-规则可视": "按钮", "按钮-3-规则可视-点击后": "按钮",
  内容按钮: "内容按钮", 查看更多: "查看更多",
  "奖品-流量券": "流量券", "奖品-ai流量券": "AI流量券", 随机奖品填写地址: "地址填写",
};
const SYSTEM_LABELS = new Set([
  "默认维度", "维度1", "默认版本", "默认状态", "系统状态", "默认文案", "蓝图版本", "共用配置", "默认",
]);
const genericAudience = /^(?:人群|(?:文案)?版本|维度)\s*\d+$/;
const safe = (value) => String(value ?? "").trim()
  .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "-").replace(/\s+/g, " ").replace(/[. ]+$/g, "");
const normalized = (value) => String(value || "").replace(/\s+/g, "").toLowerCase();
const label = (value) => SYSTEM_LABELS.has(String(value || "").replace(/\s+/g, "")) ? "" : String(value || "").trim();

function platformLabel(value) {
  let platform = "";
  const text = String(value || "").replace(/[\[【](安卓|Android|iOS)[\]】]|^(安卓|Android|iOS)(?=$|[\s·_-])/gi,
    (_, bracketed, leading) => {
      platform = /^(安卓|Android)$/i.test(bracketed || leading) ? "安卓" : "iOS";
      return "";
    }).replace(/^[\s·_-]+|[\s·_-]+$/g, "");
  return { platform, text };
}

function stateLabel(entry) {
  if (entry.exportKind === "lottery-popup") return entry.naming?.prizeIndex ? "中奖" : "未中奖";
  const schemaId = entry.sourceNode?.schemaId || "";
  let value = label(entry.naming?.stateTitle || "");
  if (value === "报名前") value = "未报名";
  if (/^任务条/.test(schemaId) || entry.naming?.taskIndex) {
    if (value === "点击前") value = "未完成";
    if (value === "点击后") value = "已完成";
  }
  if (/^内容诊断/.test(schemaId)) {
    if (value === "点击前") value = "入口";
    if (value === "点击后") value = "报告";
    if (!value) {
      value = {
        "内容诊断-样式1-点击前": "入口", "内容诊断-样式-点击后": "报告",
        "内容诊断-优质视频提示": "优质视频", "内容诊断-账号诊断": "账号问题",
      }[schemaId] || "";
    }
  }
  if (!value) value = {
    "发券-样式4-已预约": "已预约", "发券-样式4-立即抢": "立即抢", "发券-样式4-已结束": "已结束",
    "消返券-样式1-3个券-立即领单个": "立即领", "消返券-样式1-3个券-已领取": "已领取",
    "抽奖九宫格-报名前": "未报名", "抽奖九宫格-报名后": "已报名",
    "任务条-样式1-点击后": "已完成",
  }[schemaId] || "";
  return value;
}

function moduleName(entry) {
  if (entry.exportKind === "page-background") return "页面底图";
  if (entry.exportKind === "lottery-popup") return "抽奖结果";
  if (entry.naming?.taskIndex) return "任务";
  return SHORT_NAMES[entry.sourceNode?.schemaId] ||
    safe(entry.moduleTitle).split("｜").pop().replace(/\s+/g, "") || "模块";
}

function sliceName(entry, module) {
  const kind = entry.exportKind;
  if (kind === "page-background") return "页面底图";
  if (kind === "task-list-title") return "任务标题";
  if (kind === "case-showcase-shell") return "案例底板";
  if (kind === "case-showcase-card") return "案例";
  if (kind === "node-guide-title") return "行业指南标题";
  if (kind === "node-guide-card") return "行业指南";
  if (entry.naming?.taskIndex) return `任务${entry.naming.taskIndex}`;
  return module;
}

function joinAudience(dimension, version, count) {
  const parts = [label(dimension), label(version)].filter(Boolean);
  const realParts = parts.filter((part) => !genericAudience.test(part));
  const unique = realParts.filter((part, index) =>
    realParts.findIndex((other) => normalized(other) === normalized(part)) === index);
  if (unique.length > 1) {
    return unique.filter((part) => !unique.some((other) =>
      other !== part && normalized(other).startsWith(`${normalized(part)}-`))).join("-");
  }
  if (unique.length) return unique[0];
  return count > 1 ? parts.find((part) => genericAudience.test(part)) || "人群1" : "";
}

function exportCategory(entry, page, mainPages, workflowType) {
  if (workflowType === "resource") return "【资源位】";
  if (entry.exportKind === "lottery-popup") return "【弹窗】";
  if (page?.isSystemFallback) return `【兜底页】${safe(page.name) || "兜底"}`;
  const base = "【落地页】";
  return mainPages.length > 1 ? `${base}/${safe(page?.name) || "页面"}-${mainPages.findIndex((item) => item.id === page?.id) + 1}` : base;
}

export function assignExportNames(entries, { pages = [], workflowType = "venue" } = {}) {
  const counts = new Map();
  const scope = (entry) => `${entry.pageId}|${entry.naming?.audienceScopeId || entry.nodeId || entry.exportKind || entry.id}`;
  entries.forEach((entry) => {
    const key = scope(entry);
    if (!counts.has(key)) counts.set(key, new Set());
    counts.get(key).add(`${label(entry.dimensionTitle)}|${label(entry.naming?.audienceTitle)}`);
  });
  const mainPages = pages.filter((page) => !page.isSystemFallback);
  const planned = entries.map((entry) => {
    const page = pages.find((item) => item.id === entry.pageId);
    const dimension = platformLabel(entry.dimensionTitle);
    const version = platformLabel(entry.naming?.audienceTitle);
    const platform = version.platform || dimension.platform ||
      platformLabel(page?.dimension).platform || platformLabel(page?.name).platform;
    const module = moduleName(entry);
    const slice = sliceName(entry, module);
    const state = stateLabel(entry);
    const audience = entry.exportKind === "page-background" ? ""
      : joinAudience(dimension.text, version.text, counts.get(scope(entry)).size);
    let parts = [slice, audience];
    if (entry.exportKind === "lottery-popup") {
      parts = entry.naming?.prizeIndex
        ? ["中奖", `奖品${entry.naming.prizeIndex}-${entry.naming.prizeName || "奖品"}`]
        : ["未中奖"];
    } else {
      let detail = entry.naming?.sliceTitle || "";
      if (entry.exportKind === "node-guide-card") detail = detail.replace(/行业$/, "");
      parts.push(detail, state);
    }
    const stem = `${platform ? `【${platform}】` : ""}${parts.filter(Boolean).map(safe).filter(Boolean).join("_")}`;
    const category = exportCategory(entry, page, mainPages, workflowType);
    return { ...entry, exportModuleName: module, exportStateTitle: state, exportCategory: category, stem };
  });
  const reservedModules = new Set(planned.map((entry) =>
    normalized(`${entry.exportCategory}/${safe(entry.exportModuleName)}`)));
  const moduleFolders = new Map();
  const usedModules = new Set();
  planned.forEach((entry) => {
    const key = `${entry.exportCategory}|${scope(entry)}`;
    if (!moduleFolders.has(key)) {
      const base = safe(entry.exportModuleName);
      let folder = base;
      let number = 2;
      while (usedModules.has(normalized(`${entry.exportCategory}/${folder}`))) {
        do {
          folder = `${base}_${number++}`;
        } while (reservedModules.has(normalized(`${entry.exportCategory}/${folder}`)));
      }
      moduleFolders.set(key, folder);
      usedModules.add(normalized(`${entry.exportCategory}/${folder}`));
    }
    entry.exportModuleFolder = moduleFolders.get(key);
    entry.exportFolder = [
      entry.exportCategory, entry.exportModuleFolder, safe(entry.exportStateTitle),
    ].filter(Boolean).join("/");
  });
  // Reserve original names first so a duplicate suffix cannot take another
  // audience's real name (e.g. the explicitly named audience "新客_2").
  const reserved = new Set(planned.map((entry) => normalized(`${entry.exportFolder}/${entry.stem}.png`)));
  const used = new Set();
  return planned.map(({ stem, ...entry }) => {
    let fileName = `${stem}.png`;
    let key = normalized(`${entry.exportFolder}/${fileName}`);
    if (used.has(key)) {
      let number = 2;
      do {
        fileName = `${stem}_${number++}.png`;
        key = normalized(`${entry.exportFolder}/${fileName}`);
      } while (used.has(key) || reserved.has(key));
    }
    used.add(key);
    return {
      ...entry, fileName, filePath: `${entry.exportFolder}/${fileName}`,
      moduleFilePath: [entry.exportModuleFolder, safe(entry.exportStateTitle), fileName].filter(Boolean).join("/"),
    };
  });
}

export function makeExportArchiveName(name) {
  return `${safe(name).replace(/\s+/g, "_") || "活动"}_切图.zip`;
}
