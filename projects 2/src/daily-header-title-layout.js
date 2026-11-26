export const DAILY_HEADER_TITLE_MAX_WIDTH = 420;
export const DAILY_HEADER_TITLE_MAX_LINES = 2;
export const DAILY_HEADER_TITLE_LINE_WIDTH = 372;

export const DAILY_HEADER_TITLE_TIERS = {
  4: { fontSize: 76, numberFontSize: 92, lineHeight: 98, visualOffsetX: -16 },
  5: { fontSize: 68, numberFontSize: 82, lineHeight: 90, visualOffsetX: 8 },
  6: { fontSize: 62, numberFontSize: 74, lineHeight: 82, visualOffsetX: 20 },
};

const TEXT_FONT = '400 62px "MFBenHeiNoncommercial"';
const LARGE_TEXT_FONT = '400 68px "MFBenHeiNoncommercial"';
const LATIN_FONT = '800 68px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const LARGE_LATIN_FONT = '800 75px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const NUMBER_FONT = '800 74px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const LARGE_NUMBER_FONT = '800 80px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const LARGE_LINE_WIDTH_REFERENCE = "中文中文";
const DATE_FONT = '500 28px "Source Han Sans CN"';
const DATE_WIDTH_REFERENCE = "中文中文中文中文中文中";
const numberPattern = /^[0-9０-９]+$/;
const LATIN_LETTER_SPACING_EM = 0.06;

let measureContext = null;

function getMeasureContext() {
  if (measureContext || typeof document === "undefined") return measureContext;
  measureContext = document.createElement("canvas").getContext("2d");
  return measureContext;
}

export function splitTextGraphemes(value) {
  const text = String(value ?? "").replace(/\r\n?/g, "\n");
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("zh-CN", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (item) => item.segment);
  }
  return Array.from(text);
}

export function isDailyHeaderTitleLargeLine(value) {
  const text = String(value ?? "").replace(/\n/g, "");
  return Boolean(text) &&
    measureDailyHeaderTitleLineAtSize(text, false) <=
      measureDailyHeaderTitleLineAtSize(LARGE_LINE_WIDTH_REFERENCE, false);
}

function getFallbackWidth(text, isNumber, isLarge) {
  const scale = isLarge ? 68 / 62 : 1;
  return splitTextGraphemes(text).reduce((width, character) => {
    if (isNumber) return width + 41 * scale;
    if (/[\u0000-\u00ff]/.test(character)) return width + 34 * scale;
    return width + 62 * scale;
  }, 0);
}

function measureSegment(text, isNumber, isLarge) {
  const context = getMeasureContext();
  const isLatinRun = /[A-Za-z]/.test(String(text));
  const fontSize = isNumber
    ? (isLarge ? 80 : 74)
    : isLatinRun
      ? (isLarge ? 75 : 68)
      : (isLarge ? 68 : 62);
  let width;
  if (!context) {
    width = getFallbackWidth(text, isNumber, isLarge);
  } else {
    context.font = isNumber
      ? (isLarge ? LARGE_NUMBER_FONT : NUMBER_FONT)
      : isLatinRun
        ? (isLarge ? LARGE_LATIN_FONT : LATIN_FONT)
        : (isLarge ? LARGE_TEXT_FONT : TEXT_FONT);
    width = context.measureText(text).width;
  }
  if (!isLatinRun) return width;
  const gapCount = Math.max(0, String(text).length - 1);
  return Math.max(
    0,
    width - gapCount * fontSize * LATIN_LETTER_SPACING_EM,
  );
}

export function measureDailyHeaderDate(value) {
  const text = String(value ?? "").replace(/\n/g, "");
  const context = getMeasureContext();
  if (!context) {
    return splitTextGraphemes(text).reduce(
      (width, character) =>
        width + (/[\u0000-\u00ff]/.test(character) ? 15.5 : 28),
      0,
    );
  }
  context.font = DATE_FONT;
  return context.measureText(text).width;
}

export function isDailyHeaderDateOverflow(value) {
  return measureDailyHeaderDate(value) > measureDailyHeaderDate(DATE_WIDTH_REFERENCE);
}

function measureDailyHeaderTitleLineAtSize(value, isLarge) {
  return String(value ?? "")
    .split(/([A-Za-z+＋&＆]+|[0-9０-９]+)/g)
    .filter(Boolean)
    .reduce(
      (width, segment) =>
        width + measureSegment(segment, numberPattern.test(segment), isLarge),
      0,
    );
}

export function measureDailyHeaderTitleLine(value) {
  return measureDailyHeaderTitleLineAtSize(
    value,
    isDailyHeaderTitleLargeLine(value),
  );
}

export function measureDailyHeaderTitleCompact(value) {
  return measureDailyHeaderTitleLineAtSize(value, false);
}

export function getDailyHeaderTitleTier(value) {
  const lines = splitDailyHeaderTitleLines(value).slice(0, DAILY_HEADER_TITLE_MAX_LINES);
  const longestLineWidth = lines.reduce(
    (max, line) => Math.max(max, measureDailyHeaderTitleCompact(line)),
    0,
  );
  const units = longestLineWidth / 62;
  if (units <= 4.05) return 4;
  if (units <= 5.05) return 5;
  return 6;
}

export function getDailyHeaderTitleLineLayout(value) {
  const tier = getDailyHeaderTitleTier(value);
  const layout = DAILY_HEADER_TITLE_TIERS[tier];
  const units = measureDailyHeaderTitleCompact(value) / 62;
  const tierWidth = units * layout.fontSize;
  const fontSize = tierWidth > DAILY_HEADER_TITLE_LINE_WIDTH
    ? (DAILY_HEADER_TITLE_LINE_WIDTH - 1) / units
    : layout.fontSize;
  const scale = fontSize / layout.fontSize;
  return {
    tier,
    fontSize: Math.floor(fontSize * 100) / 100,
    lineHeight: Math.floor(layout.lineHeight * scale * 100) / 100,
    numberFontSize: Math.floor(layout.numberFontSize * scale * 100) / 100,
  };
}

export function splitDailyHeaderTitleLines(value) {
  const lines = [];
  let currentLine = "";

  splitTextGraphemes(value).forEach((character) => {
    if (character === "\n") {
      lines.push(currentLine);
      currentLine = "";
      return;
    }
    const candidate = `${currentLine}${character}`;
    if (
      currentLine &&
      measureDailyHeaderTitleLine(candidate) > DAILY_HEADER_TITLE_MAX_WIDTH
    ) {
      lines.push(currentLine);
      currentLine = character;
      return;
    }
    currentLine = candidate;
  });
  lines.push(currentLine);
  return lines;
}

export function clampDailyHeaderTitle(value) {
  const graphemes = splitTextGraphemes(value);
  let accepted = "";
  for (const character of graphemes) {
    const candidate = `${accepted}${character}`;
    if (splitDailyHeaderTitleLines(candidate).length > DAILY_HEADER_TITLE_MAX_LINES) {
      return { value: accepted, overflow: true };
    }
    accepted = candidate;
  }
  return { value: accepted, overflow: false };
}

export function getFittingDailyHeaderInsertion(value, start, end, insertion) {
  const source = String(value ?? "");
  const prefix = source.slice(0, start);
  const suffix = source.slice(end);
  let accepted = "";
  for (const character of splitTextGraphemes(insertion)) {
    const candidate = `${prefix}${accepted}${character}${suffix}`;
    if (clampDailyHeaderTitle(candidate).overflow) break;
    accepted += character;
  }
  return accepted;
}

export function getFittingDailyHeaderDateInsertion(value, start, end, insertion) {
  const source = String(value ?? "");
  const prefix = source.slice(0, start);
  const suffix = source.slice(end);
  let accepted = "";
  for (const character of splitTextGraphemes(insertion)) {
    const candidate = `${prefix}${accepted}${character}${suffix}`;
    if (isDailyHeaderDateOverflow(candidate)) break;
    accepted += character;
  }
  return accepted;
}
