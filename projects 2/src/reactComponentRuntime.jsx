import React from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import Announcement from "../Announcement";
import BigButton from "../BigButton";
import BigDayCouponClassic from "../BigDayCouponClassic";
import BigDayCouponSignup from "../BigDay优惠券报名";
import ConsumptionRewardDataRules from "../消耗返数据报名规则";
import LotteryAnnouncementGrid from "../抽奖公告九宫格";
import StickyBottomButton from "../StickyBottomButton";
import CouponTriplePack from "../CouponTriplePack";
import DoublePromotion from "../DoublePromotion";
import DualCoupon from "../DualCoupon";
import HeaderImage from "../HeaderImage";
import IconTitleCountdown from "../IconTitleCountdown";
import LotteryGrid from "../LotteryGrid";
import LotteryGridInteractive from "../LotteryGridInteractive";
import LotteryResultPopup from "../抽奖弹窗";
import OrangeCoupon from "../OrangeCoupon";
import PromoCoupon from "../PromoCoupon";
import PromotionData from "../PromotionData";
import PromotionModule from "../PromotionModule";
import RedPacketCoupon from "../RedPacketCoupon";
import SectionTitle from "../SectionTitle";
import TaskModule from "../TaskModule";
import TaskTitle from "../TaskTitle";
import ThreePrizes from "../ThreePrizes";
import TimeNotification from "../TimeNotification";
import TopicContestNewPrize from "../TopicContestNewPrize";
import TwoColumnLiveData from "../TwoColumnLiveData";
import TripleCouponWithBg from "../TripleCouponWithBg";
import TripleFlatCouponBg from "../TripleFlatCouponBg";
import TripleOpenCoupon from "../TripleOpenCoupon";
import MoleculeContainer from "../MoleculeContainer";
import RichText from "../RichText";
import SingleCoupon from "../SingleCoupon";
import TripleSingleCoupon from "../TripleSingleCoupon";
import DouPlusJunePromoAnimationV2 from "../动效/DOU+6月大促_第二版";
import DouPlusJunePromoAnimationV3 from "../动效/DOU+6月大促_第三版";
import OneClickBoost from "../一键上热门";
import TextComponentOne from "../文本组件1";
import TextComponentTwo from "../文本组件2";
import TextComponentThree from "../文本组件3";
import AccountCouponNotice from "../账户优惠券提示";
import ThresholdRegistration from "../门槛加报名";
import ConsumptionRewardProgress from "../消耗返进度条";
import PlacementCase from "../投放案例";
import QualityVideoDiagnosis from "../优质视频诊断组件";
import DouPlusPlacementGuide from "../DOU+投放攻略";
import QualityPlacementCase from "../投放优质案例";
import TextComponentSix from "../文本组件6";

const roots = new WeakMap();

const componentMap = {
  Announcement,
  BigButton,
  BigDayCouponClassic,
  BigDayCouponSignup,
  ConsumptionRewardDataRules,
  LotteryAnnouncementGrid,
  StickyBottomButton,
  CouponTriplePack,
  DoublePromotion,
  DualCoupon,
  HeaderImage,
  IconTitleCountdown,
  LotteryGrid,
  LotteryGridInteractive,
  "抽奖弹窗": LotteryResultPopup,
  OrangeCoupon,
  PromoCoupon,
  PromotionData,
  PromotionModule,
  RedPacketCoupon,
  SectionTitle,
  TaskModule,
  TaskTitle,
  ThreePrizes,
  TimeNotification,
  TopicContestNewPrize,
  TwoColumnLiveData,
  TripleCouponWithBg,
  TripleFlatCouponBg,
  TripleOpenCoupon,
  MoleculeContainer,
  RichText,
  SingleCoupon,
  TripleSingleCoupon,
  DouPlusJunePromoAnimationV2,
  DouPlusJunePromoAnimationV3,
  OneClickBoost,
  TextComponentOne,
  TextComponentTwo,
  "文本组件3": TextComponentThree,
  "账户优惠券提示": AccountCouponNotice,
  "门槛加报名": ThresholdRegistration,
  "BigDay优惠券报名": BigDayCouponSignup,
  "消耗返数据报名规则": ConsumptionRewardDataRules,
  "抽奖公告九宫格": LotteryAnnouncementGrid,
  "消耗返进度条": ConsumptionRewardProgress,
  "投放案例": PlacementCase,
  "DOU+投放攻略": DouPlusPlacementGuide,
  "投放优质案例": QualityPlacementCase,
  "文本组件6": TextComponentSix,
  QualityVideoDiagnosis,
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
