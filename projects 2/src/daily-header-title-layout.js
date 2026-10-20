export const DAILY_HEADER_TITLE_MAX_WIDTH = 380;
export const DAILY_HEADER_TITLE_MAX_LINES = 2;

const TEXT_FONT = '400 70px "MFBenHeiNoncommercial"';
const LARGE_TEXT_FONT = '400 76px "MFBenHeiNoncommercial"';
const NUMBER_FONT = '800 82px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const LARGE_NUMBER_FONT = '800 89px "Douyin Number ABC", "MFBenHeiNoncommercial"';
const LARGE_LINE_WIDTH_REFERENCE = "中文中文";
const DATE_FONT = '500 28px "Source Han Sans CN"';
const DATE_WIDTH_REFERENCE = "中文中文中文中文中文中";
const numberPattern = /^[0-9０-９]+$/;

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
  const scale = isLarge ? 76 / 70 : 1;
  return splitTextGraphemes(text).reduce((width, character) => {
    if (isNumber) return width + 46 * scale;
    if (/[\u0000-\u00ff]/.test(character)) return width + 39 * scale;
    return width + 70 * scale;
  }, 0);
}

function measureSegment(text, isNumber, isLarge) {
  const context = getMeasureContext();
  if (!context) return getFallbackWidth(text, isNumber, isLarge);
  context.font = isNumber
    ? (isLarge ? LARGE_NUMBER_FONT : NUMBER_FONT)
    : (isLarge ? LARGE_TEXT_FONT : TEXT_FONT);
  return context.measureText(text).width;
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
    .split(/([0-9０-９]+)/g)
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
