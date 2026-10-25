export function isTrafficCouponType(type) {
  return type === "traffic_coupon" || type === "ai_traffic_coupon";
}

export function getTrafficCouponAmountFromText(value) {
  return String(value || "").match(/(\d+(?:\.\d+)?)\s*元\s*(?:ai\s*)?流量券/i)?.[1] || "";
}

export function normalizeAiTrafficCouponName(name, prize = {}) {
  const value = String(name || "");
  return getTrafficCouponPrizeType(prize) === "ai_traffic_coupon"
    ? value.replace(/ai(?=\s*流量券)/gi, "AI")
    : value;
}

export function getTrafficCouponPrizeType(prize = {}) {
  const image = prize.image || prize.imageUrl || prize.url || prize.src || "";
  let filename = "";
  try {
    filename = decodeURIComponent(String(image).split(/[?#]/)[0].split("/").pop() || "");
  } catch {
    filename = "";
  }
  // Source images also identify prizes restored with an older build's asset hash.
  if (/^ai流量券(?:-[\w-]+)?\.png$/i.test(filename)) return "ai_traffic_coupon";
  if (prize.type) return isTrafficCouponType(prize.type) ? prize.type : "";
  if (/^(?:\d+(?:\.\d+)?元|dou\+)流量券(?:-[\w-]+)?\.png$/i.test(filename)) {
    return "traffic_coupon";
  }
  if (image) return "";
  const name = String(prize.name || prize.title || prize.label || "").replace(/\s+/g, "");
  if (/ai.*流量券/i.test(name)) return "ai_traffic_coupon";
  return getTrafficCouponAmountFromText(name) || /^(?:dou\+?)?流量券$/i.test(name)
    ? "traffic_coupon"
    : "";
}
