import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import {
  getTrafficCouponAmountFromText,
  getTrafficCouponPrizeType,
  isTrafficCouponType,
  normalizeAiTrafficCouponName,
} from "./traffic-coupon.js";

const aiImage = "/assets/ai%E6%B5%81%E9%87%8F%E5%88%B8-Ab12cd.png";
const normalImage = "/assets/10元流量券.png";
const packImage = "/assets/券包.png";
const library = [
  { id: "traffic_coupon", type: "traffic_coupon", name: "10元流量券", image: normalImage },
  { id: "ai_traffic_coupon", type: "ai_traffic_coupon", name: "10元ai流量券", image: aiImage },
  { id: "coupon_pack", type: "standard", name: "1000元心动券包", image: packImage },
];

// Exercise the editor's real serializers, including its original source/type lock.
const app = readFileSync(new URL("./app.js", import.meta.url), "utf8");
const prizeFunctions = app.slice(
  app.indexOf("function serializePrizeOption("),
  app.indexOf("function isTrafficCouponPrizeValue("),
);
const serializers = runInNewContext(
  `${prizeFunctions}\n({parsePrizeValue, serializePrizeValueWithName, serializePrizeValueWithAmount, serializePrizeValueWithCopy})`,
  {
    mockPrizeLibrary: library,
    getTrafficCouponAmountFromText,
    getTrafficCouponPrizeType,
    isTrafficCouponType,
    normalizeAiTrafficCouponName,
    normalizePrizeLookupText: (value) => String(value || "").replace(/\s+/g, "").toLowerCase(),
    getDefaultTrafficCouponThreshold: (amount) => ({ 10: "100", 22: "280" })[amount] || "00",
  },
);

test("AI and ordinary coupons have distinct identities, including legacy image URLs", () => {
  assert.equal(getTrafficCouponPrizeType({ type: "ai_traffic_coupon", name: "自定义奖品" }), "ai_traffic_coupon");
  assert.equal(getTrafficCouponPrizeType({ type: "traffic_coupon", name: "ai流量券" }), "traffic_coupon");
  assert.equal(getTrafficCouponPrizeType({ image: aiImage, name: "自定义奖品" }), "ai_traffic_coupon");
  assert.equal(getTrafficCouponPrizeType({ image: normalImage }), "traffic_coupon");
  assert.equal(getTrafficCouponPrizeType({ name: "10元AI流量券" }), "ai_traffic_coupon");
  assert.equal(getTrafficCouponAmountFromText("22元 AI 流量券"), "22");
});

test("editing AI coupon numbers and copy preserves its independent source", () => {
  let value = JSON.stringify({ ...library[1], copyAmount: "10", copyThreshold: "100", copy: "满100元赠价值10元流量" });
  value = serializers.serializePrizeValueWithName(value, "22元ai流量券");
  let prize = JSON.parse(value);
  assert.equal(prize.copyAmount, "22");
  assert.equal(prize.copyThreshold, "280");
  value = serializers.serializePrizeValueWithAmount(value, "1234");
  prize = JSON.parse(value);
  assert.equal(prize.type, "ai_traffic_coupon");
  assert.equal(prize.image, aiImage);
  assert.equal(prize.copyAmount, "1234");
  assert.equal(prize.copy, "满00元赠价值1234元流量");
  value = serializers.serializePrizeValueWithCopy(value, "满200元赠价值1234元流量");
  prize = JSON.parse(value);
  assert.equal(prize.copyThreshold, "200");
  assert.equal(prize.type, "ai_traffic_coupon");
  assert.equal(prize.image, aiImage);
  value = serializers.serializePrizeValueWithName(value, prize.name);
  prize = JSON.parse(value);
  assert.equal(prize.copyAmount, "1234", "preview rebuild must retain a manually edited amount");
  assert.equal(prize.copyThreshold, "200");
});

test("coupon-like names never replace the original normal coupon or coupon pack", () => {
  const normal = JSON.parse(serializers.serializePrizeValueWithName(JSON.stringify(library[0]), "22元ai流量券"));
  assert.equal(normal.type, "traffic_coupon");
  assert.equal(normal.image, normalImage);
  const pack = JSON.parse(serializers.serializePrizeValueWithName(JSON.stringify(library[2]), "1000元心动券包含22元ai流量券"));
  assert.equal(pack.type, "standard");
  assert.equal(pack.image, packImage);
  assert.equal(pack.copyAmount, "");
  assert.equal(getTrafficCouponPrizeType(pack), "");
  assert.equal(getTrafficCouponPrizeType({ image: packImage, name: "22元流量券" }), "");
});
