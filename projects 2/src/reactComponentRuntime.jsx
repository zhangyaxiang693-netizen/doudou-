import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import AccountCouponNotice from "../账户优惠券提示";
import CouponIssueStyle1 from "../发券-样式1";
import CouponIssueStyle2 from "../发券-样式2";
import CouponIssueStyle3 from "../发券-样式3";
import CouponIssueStyle4 from "../发券-样式4";
import CouponIssueStyle4Booked from "../发券-样式4-已预约";
import CouponIssueStyle4GrabNow from "../发券-样式4-立即抢";
import CouponIssueStyle4Ended from "../发券-样式4-已结束";
import LotteryConsumeReturn3Coupons from "../抽奖+消耗返3-3个券";
import ConsumeReturnStyle4Coupons from "../消耗返样式4个券";
import ConsumeReturn2 from "../消耗返-样式1-3个券";
import SingleConsumeReturnGrabNow from "../消返券-样式1-3个券-立即领单个";
import SingleConsumeReturnClaimed from "../消返券-样式1-3个券-已领取";
import PromptNotice from "../提示";
import NotificationNotice from "../通知";
import SupplementalNote from "../说明文-补充说明";
import HorizontalButtonDataBar from "../横排按钮数据条";
import ModuleTitleNormal from "../模块标题-正常";
import ActivityRuleStyle1 from "../正文-活动规则样式1";
import ActivityRuleStyle2 from "../正文-活动规则样式2";
import ActivityRuleStyle3 from "../正文-活动规则样式3";
import FramedBodyStyle1 from "../正文-带底框样式1";
import FramedBodyStyle2 from "../正文-带底框样式2";
import FramedBodyStyle3 from "../正文-带底框样式3";
import ConsumptionLadderBody from "../正文-带消耗阶梯";
import LotteryGridBeforeSignup from "../抽奖九宫格-报名前";
import LotteryGridAfterSignup from "../抽奖九宫格-报名后";
import LotteryStyle2 from "../抽奖样式2";
import TaskBarStyle1 from "../任务条-样式1";
import TaskBarStyle1Clicked from "../任务条-样式1-点击后";
import TaskBarStyle2 from "../任务条-样式2";
import RuleVisualButton3 from "../按钮-3-规则可视";
import RuleVisualButton3Clicked from "../按钮-3-规则可视-点击后";
import BigButton from "../大按钮";
import TrafficSubmissionStyle2 from "../投稿赢流量-样式2";
import TrafficSupportCoupon from "../流量扶持券";
import ContentDiagnosisStyle1Before from "../内容诊断-样式1-点击前";
import DiagnosisSuggestionStyle1 from "../诊断建议-样式1";
import DiagnosisSuggestionStyle2 from "../诊断建议-样式2";
import ViewMore from "../查看更多";
import ContentButton from "../内容按钮";
import AccountDiagnosis from "../内容诊断-账号诊断";
import ContentCaseStyle2 from "../内容案例-样式2";
import ContentCaseStyle1 from "../内容案例-样式1";
import UserEducationBody from "../正文-用户教育";
import NodeGuideContent from "../节点指南-内容";
import SmartInvestContent from "../智投星内容";
import OfficialAssistant from "../官方小助手";
import BottomButton from "../置底按钮";
import LotteryLosePopup from "../弹窗-未中奖";
import LotteryWinPopup from "../弹窗-中奖";
import TitleDrawCount from "../标题+抽奖次数";
import NoActivityNotice from "../无活动提示";
import HeaderImage from "../头图";
import MidAutumnSHeader from "../S级-中秋头图";
import ResourcePopup1 from "../资源位/资源弹窗1";
import ResourcePopup2 from "../资源位/资源弹窗2";
import ProfileCenterBanner from "../资源位/个人中心banner";
import TopBanner from "../资源位/顶部banner";
import CheckoutPopup from "../资源位/下单页弹窗";
import Pendant from "../资源位/挂件";
import TrafficCouponPrize from "../奖品-流量券";
import AiTrafficCouponPrize from "../奖品-ai流量券";
import RandomPrizeAddress from "../随机奖品填写地址";

const roots = new WeakMap();
const renderJobsByElement = new WeakMap();
const projectFontFamilies = new Set([
  "Source Han Sans CN",
  "Source Han Sans CN ExtraLight",
  "Source Han Sans CN Light",
  "Source Han Sans CN Regular",
  "Source Han Sans CN Medium",
  "Source Han Sans CN Bold",
  "Source Han Sans CN Heavy",
  "MFBenHeiNoncommercial",
  "MFYuanHeiNoncommercial",
  "OPPOSans",
  "Douyin Sans",
  "Douyin Latin",
  "Douyin Latin Banner",
  "Douyin Number ABC",
  "Douyin Number ABC Medium",
  "Douyin Number ABC Bold",
  "Douyin Number ABC ExtraBold",
  "Popup Number ExtraBold",
  "Douyin Number ABC Condensed",
  "Douyin Number ABC Condensed Medium",
]);
const fontSamples = {
  MFYuanHeiNoncommercial: "抽",
  "Douyin Number ABC": "0123456789+.-",
  "Douyin Number ABC Medium": "0123456789+.-",
  "Douyin Number ABC Bold": "0123456789+.-",
  "Douyin Number ABC ExtraBold": "0123456789+.-",
  "Popup Number ExtraBold": "0123456789+.-",
  "Douyin Number ABC Condensed": "0123456789+.-",
  "Douyin Number ABC Condensed Medium": "0123456789+.-",
  "Douyin Latin": "DOU+0123456789",
  "Douyin Latin Banner": "DOU+0123456789",
};
const fontLoadPromises = new Map();

function parseFontFamilies(value) {
  return String(value || "")
    .split(",")
    .map((family) => family.trim().replace(/^['"]|['"]$/g, ""))
    .filter((family) => projectFontFamilies.has(family));
}

function loadProjectFont(family, weight, style) {
  const fontSpec = `${style || "normal"} ${weight || "400"} 16px "${family}"`;
  const sample = fontSamples[family] || "字体DOU+0123456789";
  const cacheKey = `${fontSpec}|${sample}`;
  if (!fontLoadPromises.has(cacheKey)) {
    const promise = document.fonts.load(fontSpec, sample).then((faces) => {
      if (!faces.length) throw new Error(`字体未注册：${family} ${weight}`);
      return faces;
    }).catch((error) => {
      fontLoadPromises.delete(cacheKey);
      throw error;
    });
    fontLoadPromises.set(cacheKey, promise);
  }
  return fontLoadPromises.get(cacheKey);
}

export async function waitForReactMaterialFonts(root = document) {
  if (!document.fonts || !root) return;
  const elements = root instanceof Element
    ? [root, ...root.querySelectorAll("*")]
    : [...root.querySelectorAll("[data-react-component], [data-react-component] *")];
  const requests = new Map();

  elements.forEach((element) => {
    const style = window.getComputedStyle(element);
    parseFontFamilies(style.fontFamily).forEach((family) => {
      const key = `${family}|${style.fontWeight}|${style.fontStyle}`;
      requests.set(key, [family, style.fontWeight, style.fontStyle]);
    });
  });

  await Promise.all(
    [...requests.values()].map(([family, weight, style]) =>
      loadProjectFont(family, weight, style)
    ),
  );
  await document.fonts.ready;
}

window.waitForReactMaterialFonts = waitForReactMaterialFonts;

const componentMap = {
  账户优惠券提示: AccountCouponNotice,
  "发券-样式1": CouponIssueStyle1,
  "发券-样式2": CouponIssueStyle2,
  "发券-样式3": CouponIssueStyle3,
  "发券-样式4": CouponIssueStyle4,
  "发券-样式4-已预约": CouponIssueStyle4Booked,
  "发券-样式4-立即抢": CouponIssueStyle4GrabNow,
  "发券-样式4-已结束": CouponIssueStyle4Ended,
  "抽奖+消耗返3-3个券": LotteryConsumeReturn3Coupons,
  "消耗返样式4个券": ConsumeReturnStyle4Coupons,
  "消耗返-样式1-3个券": ConsumeReturn2,
  "消返券-样式1-3个券-立即领单个": SingleConsumeReturnGrabNow,
  "消返券-样式1-3个券-已领取": SingleConsumeReturnClaimed,
  "提示": PromptNotice,
  "通知": NotificationNotice,
  "说明文-补充说明": SupplementalNote,
  "横排按钮数据条": HorizontalButtonDataBar,
  "模块标题-正常": ModuleTitleNormal,
  "正文-活动规则样式1": ActivityRuleStyle1,
  "正文-活动规则样式2": ActivityRuleStyle2,
  "正文-活动规则样式3": ActivityRuleStyle3,
  "正文-带底框样式1": FramedBodyStyle1,
  "正文-带底框样式2": FramedBodyStyle2,
  "正文-带底框样式3": FramedBodyStyle3,
  "正文-带消耗阶梯": ConsumptionLadderBody,
  "抽奖九宫格-报名前": LotteryGridBeforeSignup,
  "抽奖九宫格-报名后": LotteryGridAfterSignup,
  "抽奖样式2": LotteryStyle2,
  "任务条-样式1": TaskBarStyle1,
  "任务条-样式1-点击后": TaskBarStyle1Clicked,
  "任务条-样式2": TaskBarStyle2,
  "按钮-3-规则可视": RuleVisualButton3,
  "按钮-3-规则可视-点击后": RuleVisualButton3Clicked,
  "大按钮": BigButton,
  "投稿赢流量-样式2": TrafficSubmissionStyle2,
  "流量扶持券": TrafficSupportCoupon,
  "内容诊断-样式1-点击前": ContentDiagnosisStyle1Before,
  "诊断建议-样式1": DiagnosisSuggestionStyle1,
  "诊断建议-样式2": DiagnosisSuggestionStyle2,
  "查看更多": ViewMore,
  "内容按钮": ContentButton,
  "内容诊断-账号诊断": AccountDiagnosis,
  "内容案例-样式2": ContentCaseStyle2,
  "内容案例-样式1": ContentCaseStyle1,
  "正文-用户教育": UserEducationBody,
  "节点指南-内容": NodeGuideContent,
  "智投星内容": SmartInvestContent,
  "官方小助手": OfficialAssistant,
  "置底按钮": BottomButton,
    "弹窗-未中奖": LotteryLosePopup,
    "弹窗-中奖": LotteryWinPopup,
  "标题+抽奖次数": TitleDrawCount,
  "无活动提示": NoActivityNotice,
  "头图": HeaderImage,
  "S级-中秋头图": MidAutumnSHeader,
  "详情页弹窗": ResourcePopup1,
  "挽留页弹窗": ResourcePopup2,
  "资源弹窗1": ResourcePopup1,
  "资源弹窗2": ResourcePopup2,
  "个人中心banner": ProfileCenterBanner,
  "顶部banner": TopBanner,
  "下单页弹窗": CheckoutPopup,
  "挂件": Pendant,
  "奖品-流量券": TrafficCouponPrize,
  "奖品-ai流量券": AiTrafficCouponPrize,
  "随机奖品填写地址": RandomPrizeAddress,
};

function parseProps(element) {
  try {
    const props = JSON.parse(element.dataset.props || "{}");
    Object.keys(props).forEach((key) => {
      if (/^on[A-Z]/.test(key) && typeof props[key] !== "function") {
        delete props[key];
      }
    });
    return props;
  } catch {
    return {};
  }
}

function normalizeText(value) {
  return String(value ?? "").replace(/\s+/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLineageTextDiff(value, initialValue) {
  const currentChars = Array.from(String(value ?? ""));
  const initialChars = Array.from(String(initialValue ?? ""));
  if (!currentChars.length) return "";
  if (currentChars.join("") === initialChars.join("")) {
    return escapeHtml(currentChars.join(""));
  }

  const dp = Array.from({ length: initialChars.length + 1 }, () =>
    Array(currentChars.length + 1).fill(0),
  );
  for (let i = initialChars.length - 1; i >= 0; i -= 1) {
    for (let j = currentChars.length - 1; j >= 0; j -= 1) {
      dp[i][j] =
        initialChars[i] === currentChars[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const unchangedIndexes = new Set();
  let i = 0;
  let j = 0;
  while (i < initialChars.length && j < currentChars.length) {
    if (initialChars[i] === currentChars[j]) {
      unchangedIndexes.add(j);
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return currentChars
    .map((char, index) => {
      const escaped = escapeHtml(char);
      return unchangedIndexes.has(index)
        ? escaped
        : `<span class="lineage-char-changed">${escaped}</span>`;
    })
    .join("");
}

const editableTextSelector = [
  "div",
  "span",
  "p",
  "strong",
  "em",
  "b",
  "i",
  "label",
  "button",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
].join(",");

function findExactTextTarget(host, targetText, usedTargets) {
  const candidates = [...host.querySelectorAll(editableTextSelector)].filter((element) => {
    if (usedTargets.has(element)) return false;
    if (normalizeText(element.textContent) !== targetText) return false;
    return [...element.children].every((child) => normalizeText(child.textContent) !== targetText);
  });
  return candidates.sort(
    (a, b) => a.textContent.length - b.textContent.length,
  )[0];
}

function findPartialTextTarget(host, value, usedTargets) {
  const normalizedValue = normalizeText(value);
  const rawValue = String(value ?? "");
  if (!normalizedValue) return null;
  const candidates = [...host.querySelectorAll(editableTextSelector)].filter((element) => {
    if (usedTargets.has(element)) return false;
    if (!String(element.textContent ?? "").includes(rawValue)) return false;
    const normalizedElementText = normalizeText(element.textContent);
    if (!normalizedElementText.includes(normalizedValue)) return false;
    return [...element.children].every(
      (child) => !normalizeText(child.textContent).includes(normalizedValue),
    );
  });
  return candidates.sort(
    (a, b) => a.textContent.length - b.textContent.length,
  )[0];
}

function findExplicitEditableTarget(host, key, usedTargets) {
  const target = host.querySelector(`[data-react-edit-prop="${CSS.escape(key)}"]`);
  return target && !usedTargets.has(target) ? target : null;
}

function renderEmbeddedLineageTextDiff(fullText, value, initialValue) {
  const source = String(fullText ?? "");
  const current = String(value ?? "");
  const index = source.indexOf(current);
  if (index < 0) {
    return {
      html: renderLineageTextDiff(source, initialValue),
      prefix: "",
      suffix: "",
    };
  }
  const prefix = source.slice(0, index);
  const suffix = source.slice(index + current.length);
  return {
    html: `${escapeHtml(prefix)}${renderLineageTextDiff(current, initialValue)}${escapeHtml(suffix)}`,
    prefix,
    suffix,
  };
}

function markEditableFields(host, props) {
  const mode = host.dataset.editMode;
  if (mode !== "canvas" && mode !== "variant" && mode !== "lineage") return;
  let lineageInitialProps = {};
  if (mode === "lineage") {
    try {
      lineageInitialProps = JSON.parse(host.dataset.lineageInitialProps || "{}");
    } catch {
      lineageInitialProps = {};
    }
  }

  const usedTargets = new WeakSet();

  Object.entries(props).forEach(([key, value]) => {
    if (key === "className" || value == null) return;
    if (typeof value !== "string" && typeof value !== "number") return;
    const explicitTarget = findExplicitEditableTarget(host, key, usedTargets);
    const targetText = normalizeText(value);
    if (!targetText.length && !explicitTarget) return;
    const target =
      explicitTarget ||
      findExactTextTarget(host, targetText, usedTargets) ||
      findPartialTextTarget(host, value, usedTargets);
    if (!target) return;
    if (
      !explicitTarget &&
      (
        host.dataset.reactComponent === "弹窗-中奖" ||
        target.querySelector?.("[data-react-edit-prop]")
      )
    ) {
      return;
    }
    usedTargets.add(target);
    const exactMatch = normalizeText(target.textContent) === targetText;

    target.contentEditable = "true";
    target.spellcheck = false;
    if (mode === "variant") {
      target.dataset.variantId = host.dataset.variantId || "";
      target.dataset.variantProp = key;
    } else if (mode === "lineage") {
      const initial = lineageInitialProps[key] ?? "";
      target.dataset.guidedLineageInline = `${host.dataset.variantId || ""}|${host.dataset.lineagePrefix || ""}${key}`;
      target.dataset.initialValue = String(initial);
      target.classList.toggle("lineage-text-changed", String(value) !== String(initial));
      if (exactMatch) {
        delete target.dataset.lineageValuePrefix;
        delete target.dataset.lineageValueSuffix;
        target.innerHTML = renderLineageTextDiff(value, initial);
      } else {
        const embedded = renderEmbeddedLineageTextDiff(target.textContent, value, initial);
        target.dataset.lineageValuePrefix = embedded.prefix;
        target.dataset.lineageValueSuffix = embedded.suffix;
        target.innerHTML = embedded.html;
      }
    } else {
      target.dataset.editProp = key;
    }
  });
}

export function renderReactMaterials(scope = document) {
  const elements = [];
  if (scope instanceof Element && scope.matches("[data-react-component]")) {
    elements.push(scope);
  }
  elements.push(...scope.querySelectorAll("[data-react-component]"));

  const renderJobs = [];
  elements.forEach((element) => {
    const componentName = element.dataset.reactComponent || "";
    const Component = componentMap[componentName];
    if (!Component) return;

    try {
      const props = parseProps(element);
      let root = roots.get(element);
      if (!root) {
        root = createRoot(element);
        roots.set(element, root);
      }
      const job = { element, componentName, Component, props, root };
      renderJobsByElement.set(element, job);
      delete element.dataset.fontsReady;
      delete element.dataset.fontsFailed;
      delete element.dataset.renderFailed;
      renderJobs.push(job);
    } catch (error) {
      console.error(`组件渲染准备失败：${componentName}`, error);
      element.dataset.renderFailed = "true";
    }
  });

  flushSync(() => {
    renderJobs.forEach(({ Component, props, root }) => {
      root.render(<Component {...props} />);
    });
  });

  const isCurrentJob = (job) => renderJobsByElement.get(job.element) === job;
  const loadFonts = async (job) => {
    try {
      await waitForReactMaterialFonts(job.element);
      return isCurrentJob(job);
    } catch (error) {
      if (isCurrentJob(job)) {
        job.element.dataset.fontsFailed = "true";
        console.error(`组件字体加载失败：${job.componentName}`, error);
      }
      return false;
    }
  };

  // A font wait alone cannot update line breaks or sizes calculated in render.
  // Re-render with the loaded fonts, then mark editable DOM and signal readiness.
  // Keep this barrier shared by the editor, cut preview and server PNG/GIF export.
  return Promise.all(renderJobs.map(loadFonts)).then(async (ready) => {
    const currentJobs = renderJobs.filter((job, index) => ready[index] && isCurrentJob(job));
    flushSync(() => {
      currentJobs.forEach(({ Component, props, root }) => {
        root.render(<Component {...props} />);
      });
    });
    await Promise.all(currentJobs.map(async (job) => {
      if (!await loadFonts(job)) return;
      try {
        markEditableFields(job.element, job.props);
        job.element.dataset.fontsReady = "true";
      } catch (error) {
        console.error(`组件渲染失败：${job.componentName}`, error);
        job.element.dataset.renderFailed = "true";
      }
    }));
  });
}
