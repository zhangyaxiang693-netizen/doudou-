import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import AccountCouponNotice from "../账户优惠券提示";
import CouponIssueStyle1 from "../发券-样式1";
import CouponIssueStyle2 from "../发券-样式2";
import CouponIssueStyle3 from "../发券-样式3";
import CouponIssueStyle4 from "../发券-样式4";
import LotteryConsumeReturn3Coupons from "../抽奖+消耗返3-3个券";
import ConsumeReturnStyle4Coupons from "../消耗返样式4个券";
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
import LotteryGridBeforeSignup from "../抽奖九宫格-报名前";
import LotteryGridAfterSignup from "../抽奖九宫格-报名后";
import TaskBarStyle1 from "../任务条-样式1";
import TaskBarStyle2 from "../任务条-样式2";

const roots = new WeakMap();

const componentMap = {
  账户优惠券提示: AccountCouponNotice,
  "发券-样式1": CouponIssueStyle1,
  "发券-样式2": CouponIssueStyle2,
  "发券-样式3": CouponIssueStyle3,
  "发券-样式4": CouponIssueStyle4,
  "抽奖+消耗返3-3个券": LotteryConsumeReturn3Coupons,
  "消耗返样式4个券": ConsumeReturnStyle4Coupons,
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
  "抽奖九宫格-报名前": LotteryGridBeforeSignup,
  "抽奖九宫格-报名后": LotteryGridAfterSignup,
  "任务条-样式1": TaskBarStyle1,
  "任务条-样式2": TaskBarStyle2,
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
    if (key === "className" || value == null || value === "") return;
    if (typeof value !== "string" && typeof value !== "number") return;
    const targetText = normalizeText(value);
    if (!targetText.length) return;
    const target =
      findExactTextTarget(host, targetText, usedTargets) ||
      findPartialTextTarget(host, value, usedTargets);
    if (!target) return;
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

export function renderReactMaterials() {
  document.querySelectorAll("[data-react-component]").forEach((element) => {
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

      flushSync(() => {
        root.render(<Component {...props} />);
      });
      markEditableFields(element, props);
    } catch (error) {
      console.error(`组件渲染失败：${componentName}`, error);
      element.dataset.renderFailed = "true";
    }
  });
}
