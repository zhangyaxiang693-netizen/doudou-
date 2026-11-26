import test from "node:test";
import assert from "node:assert/strict";

import {
  DAILY_HEADER_TITLE_TIERS,
  clampDailyHeaderTitle,
  getDailyHeaderTitleTier,
  getFittingDailyHeaderDateInsertion,
  getFittingDailyHeaderInsertion,
  isDailyHeaderDateOverflow,
  isDailyHeaderTitleLargeLine,
  measureDailyHeaderDate,
  measureDailyHeaderTitleLine,
  splitDailyHeaderTitleLines,
} from "../daily-header-title-layout.js";

test("daily header title accepts content that fits within two measured lines", () => {
  const value = "好礼天天抽赢千元流量";
  assert.equal(splitDailyHeaderTitleLines(value).length, 2);
  assert.deepEqual(clampDailyHeaderTitle(value), {
    value,
    overflow: false,
  });
});

test("daily header title picks the four/five/six character layout tiers", () => {
  assert.equal(getDailyHeaderTitleTier("四字标题"), 4);
  assert.equal(getDailyHeaderTitleTier("五字主标题"), 5);
  assert.equal(getDailyHeaderTitleTier("六字标题文案"), 6);
  assert.equal(getDailyHeaderTitleTier("好礼天天抽赢千元流量"), 6);
  assert.ok(
    DAILY_HEADER_TITLE_TIERS[4].fontSize >
      DAILY_HEADER_TITLE_TIERS[5].fontSize &&
      DAILY_HEADER_TITLE_TIERS[5].fontSize >
        DAILY_HEADER_TITLE_TIERS[6].fontSize,
  );
  assert.ok(
    DAILY_HEADER_TITLE_TIERS[4].visualOffsetX <
      DAILY_HEADER_TITLE_TIERS[5].visualOffsetX &&
      DAILY_HEADER_TITLE_TIERS[5].visualOffsetX <
        DAILY_HEADER_TITLE_TIERS[6].visualOffsetX,
  );
});

test("daily header title tier follows the longest wrapped line, not the total length", () => {
  assert.equal(getDailyHeaderTitleTier("好礼天天\n抽赢"), 4);
  assert.equal(getDailyHeaderTitleTier("好礼天天抽\n赢千元"), 5);
  assert.equal(getDailyHeaderTitleTier("好礼天天抽赢\n千元流量"), 6);
  assert.equal(getDailyHeaderTitleTier("好礼天天抽赢千元流量"), 6);
});

test("daily header title wraps after about six Chinese characters per line", () => {
  const lines = splitDailyHeaderTitleLines("好礼天天抽赢千元流");
  assert.equal(lines.length, 2);
  assert.equal(lines[0], "好礼天天抽赢");
  assert.equal(lines[1], "千元流");
});

test("daily header title stops before a third line", () => {
  const value = "好礼天天抽赢千元流量券券券";
  const result = clampDailyHeaderTitle(value);
  assert.equal(result.overflow, true);
  assert.equal(splitDailyHeaderTitleLines(result.value).length, 2);
  assert.equal(result.value, "好礼天天抽赢千元流量券券");
});

test("daily header title measures English narrower than Chinese", () => {
  const chinese = clampDailyHeaderTitle("好礼天天抽赢千元流量券券券");
  const english = clampDailyHeaderTitle("abcdefghijklmnopqr");
  assert.equal(chinese.overflow, true);
  assert.equal(english.overflow, false);
});

test("lines no wider than four Chinese characters use the large treatment", () => {
  assert.equal(isDailyHeaderTitleLargeLine("四字标题"), true);
  assert.equal(isDailyHeaderTitleLargeLine("五字主标题"), false);
  assert.equal(isDailyHeaderTitleLargeLine("abcde"), true);
  assert.ok(
    measureDailyHeaderTitleLine("四字标题") >
      measureDailyHeaderTitleLine("四字标"),
  );
});

test("daily header date is limited by the width of eleven Chinese characters", () => {
  const elevenChinese = "一二三四五六七八九十中";
  assert.equal(isDailyHeaderDateOverflow(elevenChinese), false);
  assert.equal(isDailyHeaderDateOverflow(`${elevenChinese}文`), true);
  assert.ok(measureDailyHeaderDate("2026.10.15") < measureDailyHeaderDate(elevenChinese));
});

test("daily header date paste preserves the existing suffix", () => {
  const value = "活动时间";
  const insertion = getFittingDailyHeaderDateInsertion(
    value,
    2,
    2,
    "一二三四五六七八九十",
  );
  const result = `${value.slice(0, 2)}${insertion}${value.slice(2)}`;
  assert.equal(isDailyHeaderDateOverflow(result), false);
  assert.equal(result.endsWith("时间"), true);
});

test("middle insertion keeps all existing title text when no space remains", () => {
  const value = "好礼天天抽赢千元流量券券";
  assert.equal(
    getFittingDailyHeaderInsertion(value, 2, 2, "新"),
    "",
  );
  assert.equal(value, "好礼天天抽赢千元流量券券");
});

test("middle paste accepts only content that fits before the existing suffix", () => {
  const value = "好礼抽赢千元流量券券";
  const insertion = getFittingDailyHeaderInsertion(value, 2, 2, "天天天天");
  assert.equal(insertion, "天天");
  assert.equal(
    `${value.slice(0, 2)}${insertion}${value.slice(2)}`,
    "好礼天天抽赢千元流量券券",
  );
});

test("shortening an overlong legacy title always reduces its content", () => {
  const legacyValue = "好礼天天抽赢千元流量券券券";
  const shortenedValue = legacyValue.slice(0, -1);
  assert.equal(clampDailyHeaderTitle(legacyValue).overflow, true);
  assert.ok(shortenedValue.length < legacyValue.length);
});
