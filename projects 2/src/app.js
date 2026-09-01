import { getFontEmbedCSS, toBlob as exportNodeToBlob } from "html-to-image";

const GUIDED_CUT_EXPORT_WIDTH = 750;
const GUIDED_CUT_EXPORT_BOTTOM_SPACE = 32;
const GUIDED_TASK_BAR_EXPORT_BOTTOM_SPACE = 16;
const DEFAULT_TRAFFIC_COUPON_THRESHOLD = "00";
const DEFAULT_LOTTERY_PRIZE_COUNT = 3;
const MAX_LOTTERY_PRIZE_COUNT = 8;

function getDefaultTrafficCouponThreshold(amount) {
  const thresholds = {
    5: "30",
    6: "68",
    10: "100",
  };
  return thresholds[String(amount || "").trim()] || DEFAULT_TRAFFIC_COUPON_THRESHOLD;
}

const _schemaModules = import.meta.glob('../*/schema.json', { eager: true, as: 'json' });
const _cssVarModules = import.meta.glob('../*/index.module.scss', { eager: true, query: '?raw', import: 'default' });
const _themeHeaderImageModules = import.meta.glob("../色系头图/*.png", { eager: true, query: "?url", import: "default" });
const navigationBarSvgUrl = new URL("../导航栏/顶栏.svg", import.meta.url).href;
const contentModuleImageUrl = new URL("../内容模块.png", import.meta.url).href;
const contentModuleImage2Url = new URL("../内容模块2.png", import.meta.url).href;
const mockPrizeLibrary = [
  {
    id: "traffic_coupon_5",
    name: "5元流量券",
    image: new URL("../九宫格-奖品库/5元流量券.png", import.meta.url).href,
    copyAmount: "5",
    copyThreshold: "30",
    copy: "满30元赠价值5元流量",
  },
  {
    id: "traffic_coupon_6",
    name: "6元流量券",
    image: new URL("../九宫格-奖品库/6元流量券.png", import.meta.url).href,
    copyAmount: "6",
    copyThreshold: "68",
    copy: "满68元赠价值6元流量",
  },
  {
    id: "traffic_coupon_10",
    name: "10元流量券",
    image: new URL("../九宫格-奖品库/10元流量券.png", import.meta.url).href,
    copyAmount: "10",
    copyThreshold: "100",
    copy: "满100元赠价值10元流量",
  },
  {
    id: "official_recommendation",
    name: "DOU+官方推荐机会",
    image: new URL("../九宫格-奖品库/dou+官方推荐机会.png", import.meta.url).href,
    copy: "「DOU+小助手」官方账号给你的视频点赞并推荐",
  },
  {
    id: "douzi_merch",
    name: "DOU仔周边",
    image: new URL("../九宫格-奖品库/dou仔周边.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "douzi_family_pack",
    name: "DOU仔全家福随机发",
    image: new URL("../九宫格-奖品库/dou仔周边全家福.png", import.meta.url).href,
    copy: "毛绒公仔/毛绒挂件/AI抖仔挂件/盲盒/冰箱贴\n随机发一件",
  },
  {
    id: "douzi_canvas_bag",
    name: "DOU仔周边帆布包",
    image: new URL("../九宫格-奖品库/dou仔周边帆布包.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "douzi_keychain",
    name: "DOU仔挂件",
    image: new URL("../九宫格-奖品库/dou仔挂件.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "douzi_doll",
    name: "DOU仔玩偶",
    image: new URL("../九宫格-奖品库/dou仔玩偶.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "coupon_pack",
    name: "1314元心动券包",
    image: new URL("../九宫格-奖品库/券包.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "jianying_vip",
    name: "剪映VIP",
    image: new URL("../九宫格-奖品库/剪映vip.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "traffic_support",
    name: "流量扶持",
    image: new URL("../九宫格-奖品库/流量扶持.png", import.meta.url).href,
    copy: "",
  },
  {
    id: "points",
    name: "内容诊断积分",
    image: new URL("../九宫格-奖品库/积分.png", import.meta.url).href,
    copy: "",
  },
];

const COMPONENT_DISPLAY_NAME_BY_ID = {
  "核心权益模块-bigday发券-样式1": "核心权益｜big-day发券",
  "核心权益模块-bigday发券-样式1-已报名": "核心权益｜big-day发券（已报名）",
  "核心权益模块-bigday发券-样式2": "核心权益｜预约抢券",
  "核心权益模块-发券-样式2": "核心权益｜发券",
  "核心玩法模块-抽奖消返-3列": "核心玩法｜消耗返（三档）",
  "核心玩法模块-抽奖消返-4列": "核心玩法｜消耗返",
  "核心玩法模块-抽奖-未报名": "核心玩法｜抽奖-九宫格（报名前）",
  "核心玩法模块-抽奖-已报名": "核心玩法｜抽奖-九宫格（已报名）",
  投放抽奖: "核心玩法｜投放抽奖",
  任务列表: "核心玩法｜任务",
  投稿赢流量: "内容增长｜投稿赢流量",
  "投稿赢流量-样式3": "内容增长｜流量扶持券",
  "内容诊断-样式-点击后": "内容诊断｜生成报告后",
  "内容诊断-优质视频提示": "内容诊断｜优质视频提示",
  "诊断建议-样式1": "诊断建议",
  "诊断建议-样式2": "诊断建议",
  "用户教育案例-样式1": "用户教育｜案例展示",
  "用户教育案例-样式2": "用户教育｜案例加行动按钮",
  "用户教育-攻略": "用户教育｜投放攻略",
  AI智投: "产品教育｜AI 智投",
  节点指南: "节点营销｜行业内容指南",
  官方小助手模块: "用户教育｜官方小助手",
  "模块标题-正常": "模块标题",
  "任务条-样式1-点击后": "任务条｜已完成状态",
  "内容诊断-样式1-点击前": "内容诊断｜入口卡片",
  "内容诊断-账号诊断": "内容诊断｜账号问题提示",
  "发券-样式1": "优惠券｜横幅领券",
  横排按钮数据条: "消耗与抽奖数据",
  大按钮: "按钮",
  置底按钮: "底部行动按钮",
  账户优惠券提示: "账户优惠券提醒",
};

function getGlobalComponentDisplayName(schemaId, fallback = "") {
  return COMPONENT_DISPLAY_NAME_BY_ID[schemaId] || fallback || schemaId || "模块";
}

function _normalizeDynamicSchema(path, rawSchema) {
  const dirName = path.split('/').slice(-2)[0];
  const schemaId = rawSchema.id || dirName;
  const props = (rawSchema.props || []).map((p) => ({
    ...p,
    key: p.name || p.key,
    label: p.label || p.name || p.key,
    type: p.type || 'string',
    default: p.default ?? '',
    description: p.description || '',
  }));
  return {
    ...rawSchema,
    id: schemaId,
    name: getGlobalComponentDisplayName(
      schemaId,
      rawSchema.title || rawSchema.name || dirName,
    ),
    type: 'atom',
    description: rawSchema.description || '',
    reactComponent: rawSchema.reactComponent || dirName,
    dimensions: rawSchema.dimensions || null,
    props,
    category: rawSchema.category || '未分类',
      canvasOnly: Boolean(rawSchema.canvasOnly),
  };
}

function _extractCssVars(scssContent) {
  if (!scssContent) return [];
  const vars = new Set();
  const defMatches = scssContent.matchAll(/(--[a-z0-9-]+)\s*:/g);
  for (const m of defMatches) vars.add(m[1]);
  const usageMatches = scssContent.matchAll(/var\(\s*(--[a-z0-9-]+)/g);
  for (const m of usageMatches) vars.add(m[1]);
  return [...vars].sort();
}

function _buildDynamicSchemas() {
  const result = [];
  for (const [path, schema] of Object.entries(_schemaModules)) {
    const normalized = _normalizeDynamicSchema(path, schema);
    const dirName = path.split('/').slice(-2)[0];
    const scssKey = `../${dirName}/index.module.scss`;
    const scssRaw = _cssVarModules[scssKey];
    const scssContent = typeof scssRaw === 'string' ? scssRaw : (scssRaw?.default || '');
    const cssVars = _extractCssVars(scssContent);
    const cssProps = cssVars.map((varName) => ({
      key: `__css_var_${varName.replace(/^--/, '')}`,
      label: `CSS变量 · ${varName}`,
      type: 'string',
      default: '',
      description: `覆盖 SCSS 中的 ${varName}`,
      isCssVar: true,
      cssVarName: varName,
    }));
    result.push({ ...normalized, props: [...normalized.props, ...cssProps] });
  }
  return result;
}

const _dynamicSchemas = _buildDynamicSchemas();

const _hardcodedAtomSchemas = [];

function _mergeSchemas(hardcoded, dynamic) {
  const dynamicMap = new Map(dynamic.map((s) => [s.id, s]));
  const result = [];
  const seen = new Set();
  for (const s of hardcoded) {
    if (dynamicMap.has(s.id)) {
      const dynamicSchema = dynamicMap.get(s.id);
      result.push({
        ...s,
        ...dynamicSchema,
        dimensions: dynamicSchema.dimensions || s.dimensions,
      });
      seen.add(s.id);
    } else {
      result.push(s);
    }
  }
  for (const s of dynamic) {
    if (!seen.has(s.id)) result.push(s);
  }
  return result;
}

const atomSchemas = _mergeSchemas(_hardcodedAtomSchemas, _dynamicSchemas);

const ATOM_MODULE_BADGE_IDS = new Set([
  "任务条-样式1-点击后",
  "内容诊断-样式1-点击前",
  "内容诊断-账号诊断",
  "发券-样式1",
  "置底按钮",
  "账户优惠券提示",
]);

function isModuleLevelAtom(schema) {
  return ATOM_MODULE_BADGE_IDS.has(schema?.id);
}

function getAdminVerifierComponentOptionMarkup(verifierType, componentOptions, selectedSchemaId) {
  const renderOption = (item, labelPrefix = "") => `
    <option value="${escapeAttr(item.id)}" ${item.id === selectedSchemaId ? "selected" : ""}>
      ${escapeHtml(`${labelPrefix}${item.name || item.id}`)}
    </option>
  `;

  if (verifierType !== "atom") {
    return componentOptions.map((item) => renderOption(item)).join("");
  }

  const moduleLevelOptions = componentOptions.filter(isModuleLevelAtom);
  const normalOptions = componentOptions.filter((item) => !isModuleLevelAtom(item));
  return `
    <optgroup label="模块级原子">
      ${moduleLevelOptions.map((item) => renderOption(item, "模块级｜")).join("")}
    </optgroup>
    <optgroup label="普通原子">
      ${normalOptions.map((item) => renderOption(item)).join("")}
    </optgroup>
  `;
}

const BUILT_IN_MOLECULE_SCHEMAS = [
  {
    id: "核心权益模块-bigday发券-样式1",
    name: "核心权益模块-bigday发券-样式1",
    type: "molecule",
    description: "由标题、Bigday 发券样式 3、规则可视按钮、补充说明组成。支持「报名前 / 已报名」双状态切换，状态绑定的蓝图与画布预览自动同步。",
    className: "bigday-coupon-style1",
    children: [
      ["模块标题-正常", {}],
      ["发券-样式3", {}],
      ["按钮-3-规则可视", {}],
      ["说明文-补充说明", {}],
    ],
    states: [
      {
        id: "default",
        name: "报名前",
        schemaId: "核心权益模块-bigday发券-样式1",
      },
      {
        id: "postSignup",
        name: "已报名",
        schemaId: "核心权益模块-bigday发券-样式1-已报名",
      },
    ],
  },
  {
    id: "核心权益模块-bigday发券-样式1-已报名",
    name: "核心权益模块-bigday发券-样式1-已报名",
    type: "molecule",
    description: "【已报名状态】标题、Bigday 发券样式 3、点击后规则可视按钮（浅粉 #FF9ECA / 蓝 #FF8290 / 橘 #FF8571 三色系自动切换）、补充说明组成。与「样式1-报名前」共享双状态切换，原子组件的蓝图会自动组合为分子的蓝图并随原子同步变化。",
    className: "bigday-coupon-style1",
    children: [
      ["模块标题-正常", {}],
      ["发券-样式3", {}],
      ["按钮-3-规则可视-点击后", {}],
      ["说明文-补充说明", {}],
    ],
    states: [
      {
        id: "default",
        name: "报名前",
        schemaId: "核心权益模块-bigday发券-样式1",
      },
      {
        id: "postSignup",
        name: "已报名",
        schemaId: "核心权益模块-bigday发券-样式1-已报名",
      },
    ],
  },
  {
    id: "核心权益模块-bigday发券-样式2",
    name: "核心权益模块-bigday发券-样式2",
    type: "molecule",
    description: "由标题、通知、Bigday 发券样式 4 组成。",
    className: "bigday-coupon-style2",
    children: [
      ["模块标题-正常", { iconType: "alarm" }],
      ["通知", {}],
      ["发券-样式4", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖消返-3列",
    name: "核心玩法模块-抽奖消返-3列",
    type: "molecule",
    description: "由标题、3 列抽奖消返、数据条、活动规则样式 3、大按钮组成。",
    className: "lottery-consumption-return-3col",
    children: [
      ["模块标题-正常", {}],
      ["抽奖+消耗返3-3个券", {}],
      ["横排按钮数据条", {}],
      ["正文-活动规则样式3", {}],
      ["大按钮", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖消返-4列",
    name: "核心玩法模块-抽奖消返-4列",
    type: "molecule",
    description: "由标题、4 列消耗返、数据条、活动规则样式 3、大按钮组成。",
    className: "lottery-consumption-return-4col",
    children: [
      ["模块标题-正常", {}],
      ["消耗返样式4个券", {}],
      ["横排按钮数据条", {}],
      ["正文-活动规则样式3", {}],
      ["大按钮", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖-未报名",
    name: "核心玩法模块-抽奖-未报名",
    type: "molecule",
    description: "由标题+抽奖次数、提示、九宫格抽奖报名前、大按钮组成。",
    className: "lottery-unregistered-module",
    children: [
      ["标题+抽奖次数", {}],
      ["提示", {}],
      ["抽奖九宫格-报名前", {}],
      ["大按钮", { buttonText: "立即报名" }],
    ],
  },
  {
    id: "核心玩法模块-抽奖-已报名",
    name: "核心玩法模块-抽奖-已报名",
    type: "molecule",
    description: "由标题+抽奖次数、提示、九宫格抽奖报名后组成。",
    className: "lottery-registered-module",
    children: [
      ["标题+抽奖次数", {}],
      ["提示", {}],
      ["抽奖九宫格-报名后", {}],
    ],
  },
  {
    id: "投稿赢流量",
    name: "投稿赢流量",
    type: "molecule",
    description: "由标题、投稿赢流量样式 2、大按钮、活动规则样式 2 组成。",
    className: "traffic-submission-module",
    children: [
      ["模块标题-正常", { iconType: "folder", titleText: "话题投稿赢流量" }],
      ["投稿赢流量-样式2", {}],
      ["大按钮", { buttonText: "立即投稿" }],
      ["正文-活动规则样式2", {}],
    ],
  },
  {
    id: "投稿赢流量-样式3",
    name: "投稿赢流量-样式3",
    type: "molecule",
    description: "由标题、流量扶持券、大按钮、活动规则样式 3 组成。",
    className: "traffic-submission-style3-module",
    children: [
      ["模块标题-正常", { iconType: "folder" }],
      ["流量扶持券", {}],
      ["大按钮", { buttonText: "立即投稿" }],
      ["正文-活动规则样式3", {}],
    ],
  },
  {
    id: "内容诊断-样式-点击后",
    name: "内容诊断-样式-点击后",
    type: "molecule",
    description: "由模块标题、诊断建议、查看更多和内容按钮组成。",
    className: "content-diagnosis-clicked-module",
    states: [
      { id: "default", name: "点击前", schemaId: "内容诊断-样式1-点击前", preserveProps: true },
      { id: "clicked", name: "点击后", schemaId: "内容诊断-样式-点击后", preserveProps: true },
    ],
    children: [
      ["模块标题-正常", {}],
      ["诊断建议-样式1", {}],
      ["查看更多", {}],
      ["内容按钮", {}],
    ],
  },
  {
    id: "内容诊断-优质视频提示",
    name: "内容诊断-优质视频提示",
    type: "molecule",
    description: "由模块标题、诊断建议样式 2 和内容按钮组成。",
    className: "content-diagnosis-quality-video-module",
    children: [
      ["模块标题-正常", {}],
      ["诊断建议-样式2", {}],
      ["内容按钮", {}],
    ],
  },
  {
    id: "用户教育案例-样式1",
    name: "用户教育案例-样式1",
    type: "molecule",
    description: "由模块标题和内容案例样式 2 组成，内容案例在分子容器内横向滑动。",
    className: "user-education-case-style1-module",
    children: [
      ["模块标题-正常", { iconType: "fire" }],
      ["内容案例-样式2", {}],
    ],
  },
  {
    id: "用户教育案例-样式2",
    name: "用户教育案例-样式2",
    type: "molecule",
    description: "由模块标题、内容案例样式 1 和大按钮组成。",
    className: "user-education-case-style2-module",
    children: [
      ["模块标题-正常", { iconType: "folder" }],
      ["内容案例-样式1", {}],
      ["大按钮", { buttonText: "马上试试" }],
    ],
  },
  {
    id: "用户教育-攻略",
    name: "用户教育-攻略",
    type: "molecule",
    description: "由模块标题、用户教育正文和大按钮组成。",
    className: "user-education-guide-module",
    children: [
      ["模块标题-正常", { iconType: "tip" }],
      ["正文-用户教育", {}],
      ["大按钮", { buttonText: "立即投稿" }],
    ],
  },
  {
    id: "AI智投",
    name: "AI智投",
    type: "molecule",
    description: "由模块标题、智投星内容和大按钮组成。",
    className: "ai-smart-invest-module",
    children: [
      ["模块标题-正常", {}],
      ["智投星内容", {}],
      ["大按钮", { buttonText: "立即体验" }],
    ],
  },
  {
    id: "核心权益模块-发券-样式2",
    name: "核心权益模块-发券-样式2",
    type: "molecule",
    description: "由模块标题、发券样式 2 和大按钮组成。",
    className: "core-benefit-coupon-style2-module",
    children: [
      ["模块标题-正常", {}],
      ["发券-样式2", {}],
      ["大按钮", { buttonText: "立即使用" }],
    ],
  },
  {
    id: "投放抽奖",
    name: "投放抽奖",
    type: "molecule",
    description: "由模块标题、抽奖样式 2、正文带底框样式 1 和大按钮组成。",
    className: "placement-lottery-module",
    children: [
      ["模块标题-正常", { iconType: "gift" }],
      ["抽奖样式2", {}],
      ["正文-带底框样式1", {}],
      ["大按钮", { buttonText: "去消耗" }],
    ],
  },
  {
    id: "节点指南",
    name: "节点指南",
    type: "molecule",
    description: "由模块标题和节点指南内容组成，节点指南内容在分子内横向滑动。",
    className: "node-guide-module",
    children: [
      ["模块标题-正常", { iconType: "fire" }],
      ["节点指南-内容", {}],
    ],
  },
  {
    id: "官方小助手模块",
    name: "官方小助手模块",
    type: "molecule",
    description: "由模块标题和官方小助手组成。",
    className: "official-assistant-module",
    children: [
      ["模块标题-正常", {}],
      ["官方小助手", {}],
    ],
  },
  {
    id: "任务列表",
    name: "任务列表",
    type: "molecule",
    description: "由标题和可配置数量的任务条样式 1 组成。",
    className: "task-list-module",
    props: [
      {
        key: "taskCount",
        name: "taskCount",
        label: "任务数量",
        type: "number",
        default: 3,
        min: 1,
        description: "控制任务条-样式1的数量。",
      },
    ],
    dynamicChildren: {
      propKey: "taskCount",
      childSchemaId: "任务条-样式1",
      min: 1,
    },
    children: [
      ["模块标题-正常", { iconType: "calendar" }],
    ],
  },
];

const BUILT_IN_MOLECULE_IDS = BUILT_IN_MOLECULE_SCHEMAS.map((item) => item.id);
const moleculeSchemas = BUILT_IN_MOLECULE_SCHEMAS.map((schema) => ({
  ...schema,
  name: getGlobalComponentDisplayName(schema.id, schema.name),
}));

const MOLECULE_STORAGE_KEY = "builder_molecule_templates_empty_v1";
function loadMoleculeTemplates() {
  try {
    const raw = localStorage.getItem(MOLECULE_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (Array.isArray(list)) {
      list.forEach((item) => {
        if (item && item.id && !moleculeSchemas.find((m) => m.id === item.id)) {
          moleculeSchemas.push(item);
        }
      });
    }
  } catch (e) {
    console.warn("加载分子模板失败", e);
  }
}
function saveMoleculeTemplatesToStorage() {
  try {
    const userTemplates = moleculeSchemas.filter((item) => !BUILT_IN_MOLECULE_IDS.includes(item.id));
    localStorage.setItem(MOLECULE_STORAGE_KEY, JSON.stringify(userTemplates));
  } catch (e) {
    console.warn("保存分子模板失败", e);
  }
}
function saveSingleMoleculeToServer(template) {
  try {
    if (template && template.id && !moleculeSchemas.find((m) => m.id === template.id)) {
      moleculeSchemas.push(template);
    }
    saveMoleculeTemplatesToStorage();
  } catch (e) {
    console.warn("保存分子模板失败", e);
  }
}
function deleteMoleculeOnServer(id) {
  try {
    const idx = moleculeSchemas.findIndex((m) => m.id === id);
    if (idx !== -1) {
      moleculeSchemas.splice(idx, 1);
      saveMoleculeTemplatesToStorage();
    }
  } catch (e) {
    console.warn("删除分子模板失败", e);
  }
}
loadMoleculeTemplates();

const PAGE_TEMPLATE_STORAGE_KEY = "builder_page_templates_empty_v1";
const PRD_PAGE_TEMPLATE_ALIASES = {
  "模板1 只发券": ["模板1 只发券"],
  "模板2 只抽奖": ["模板2 只抽奖"],
  "模板3 抽奖 + 消耗返": ["模板3 抽奖 + 消耗返"],
  "模板4 无激励攻略": ["模板4 无激励攻略"],
};
const PAGE_TEMPLATE_BUSINESS_STATES = {
  "核心玩法模块-抽奖-未报名": {
    label: "核心玩法｜抽奖-九宫格",
    states: [
      { id: "default", name: "报名前", schemaId: "核心玩法模块-抽奖-未报名" },
      { id: "registered", name: "已报名", schemaId: "核心玩法模块-抽奖-已报名" },
    ],
  },
  "内容诊断-样式1-点击前": {
    label: "内容诊断｜入口卡片",
    states: [
      { id: "default", name: "点击前", schemaId: "内容诊断-样式1-点击前" },
      { id: "clicked", name: "点击后", schemaId: "内容诊断-样式-点击后" },
    ],
  },
  "内容诊断-样式-点击后": {
    label: "内容诊断｜生成报告后",
    states: [
      { id: "default", name: "点击前", schemaId: "内容诊断-样式1-点击前" },
      { id: "clicked", name: "点击后", schemaId: "内容诊断-样式-点击后" },
    ],
  },
};
const PAGE_TEMPLATE_DEFAULT_BUSINESS_STATES = {
  "page-lottery-consumption-return|3": "registered",
};
const PAGE_TEMPLATE_MODULE_BUSINESS_STATES = {
  "page-guide-no-incentive|1": {
    label: "内容诊断",
    states: [
      {
        id: "entry",
        name: "入口卡片",
        schemaId: "内容诊断-样式1-点击前",
      },
      {
        id: "quality",
        name: "优质视频提示",
        schemaId: "内容诊断-优质视频提示",
      },
      {
        id: "account",
        name: "账号问题提示",
        schemaId: "内容诊断-账号诊断",
      },
    ],
  },
};
const PAGE_TEMPLATE_ENTRY_CARD_STATES = [
  {
    id: "default",
    name: "点击前",
    schemaId: "内容诊断-样式1-点击前",
  },
  {
    id: "clicked",
    name: "点击后",
    schemaId: "内容诊断-样式-点击后",
  },
];
const LOCKED_PAGE_TEMPLATE_BLUEPRINT_SCHEMA_IDS = new Set([
  "用户教育案例-样式1",
  "用户教育案例-样式2",
  "AI智投",
  "节点指南",
]);
const customPageTemplates = [];

function normalizePageTemplateLookupName(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/[【】\[\]（）()「」『』《》]/g, "")
    .replace(/＋/g, "+")
    .replace(/消耗返回/g, "消耗返")
    .toLowerCase();
}

function repairCustomPageTemplateNames(templates) {
  let repaired = false;
  const replaceNodeSchema = (template, fromSchemaId, toSchemaId) => {
    const nodeIndex = (template.nodes || []).findIndex(
      (node) => node?.schemaId === fromSchemaId,
    );
    if (nodeIndex < 0) return false;
    const currentNode = template.nodes[nodeIndex];
    const replacement = createMoleculeNode(toSchemaId);
    if (!replacement) return false;
    replacement.id = currentNode.id || replacement.id;
    template.nodes[nodeIndex] = replacement;
    return true;
  };
  templates.forEach((item) => {
    const normalizedName = normalizePageTemplateLookupName(item?.name);
    const matchedEntry = Object.entries(PRD_PAGE_TEMPLATE_ALIASES).find(
      ([canonicalName, aliases]) =>
        normalizePageTemplateLookupName(canonicalName) === normalizedName ||
        aliases.some(
          (alias) => normalizePageTemplateLookupName(alias) === normalizedName,
        ),
    );
    if (matchedEntry && item.name !== matchedEntry[0]) {
      item.name = matchedEntry[0];
      repaired = true;
    }
    const canonicalName = matchedEntry?.[0] || item.name;
    if (canonicalName === "模板3 抽奖 + 消耗返") {
      repaired =
        replaceNodeSchema(
          item,
          "核心玩法模块-抽奖消返-3列",
          "核心玩法模块-抽奖消返-4列",
        ) || repaired;
    }
    if (canonicalName === "模板4 无激励攻略") {
      repaired =
        replaceNodeSchema(
          item,
          "用户教育案例-样式1",
          "用户教育案例-样式2",
        ) || repaired;
    }
  });

  return repaired;
}

function loadCustomPageTemplates() {
  try {
    const raw = localStorage.getItem(PAGE_TEMPLATE_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (Array.isArray(list)) {
      let migrated = false;
      migrated = repairCustomPageTemplateNames(list);
      list.forEach((item) => {
        if (item && item.id && !customPageTemplates.find((t) => t.id === item.id)) {
          customPageTemplates.push(item);
        }
      });
      if (migrated) {
        saveCustomPageTemplatesToStorage();
      }
    }
  } catch (e) {
    console.warn("加载自定义页面模板失败", e);
  }
}

function saveCustomPageTemplatesToStorage() {
  try {
    localStorage.setItem(PAGE_TEMPLATE_STORAGE_KEY, JSON.stringify(customPageTemplates));
  } catch (e) {
    console.warn("保存自定义页面模板失败", e);
  }
}

async function savePageAsTemplate(page, name) {
  const template = {
    id: `custom_page_${Date.now()}`,
    name,
    isCustom: true,
    canvasBackground: page.canvasBackground || "#ffffff",
    navBarEnabled: Boolean(page.navBarEnabled),
    nodes: JSON.parse(JSON.stringify(page.nodes)),
  };
  customPageTemplates.push(template);
  await saveCustomPageTemplatesToStorage();
}

function findLatestCustomPageTemplateByName(name) {
  const normalizedName = normalizePageTemplateLookupName(name);
  return [...customPageTemplates]
    .reverse()
    .find(
      (template) =>
        normalizePageTemplateLookupName(template?.name) === normalizedName,
    );
}

function findLatestCustomPageTemplateByPrdType(pageType) {
  const normalizedType = normalizePageTemplateLookupName(pageType);
  const aliasEntry = Object.entries(PRD_PAGE_TEMPLATE_ALIASES).find(
    ([key, aliases]) =>
      normalizePageTemplateLookupName(key) === normalizedType ||
      aliases.some((alias) => normalizePageTemplateLookupName(alias) === normalizedType),
  );
  const lookupNames = aliasEntry?.[1] || [pageType];
  for (const name of lookupNames) {
    const template = findLatestCustomPageTemplateByName(name);
    if (template) return template;
  }
  const builtInTemplates = [...pageTemplates, ...templateSchemas];
  for (const name of lookupNames) {
    const normalizedName = normalizePageTemplateLookupName(name);
    const template = builtInTemplates.find(
      (item) => normalizePageTemplateLookupName(item?.name) === normalizedName,
    );
    if (template) {
      return {
        ...template,
        isCustom: false,
        canvasBackground: template.canvasBackground || template.background || "#ffffff",
      };
    }
  }
  return null;
}

function addPageFromCustomTemplate(templateId) {
  const template = customPageTemplates.find((t) => t.id === templateId);
  if (!template) return;
  
  const dim = state.selectedDimension || activePage().dimension || "自定义维度";
  const page = {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: template.name,
    dimension: dim,
    tags: ["自定义模板"],
    nodes: JSON.parse(JSON.stringify(template.nodes)),
    canvasBackground: template.canvasBackground || "#ffffff",
    navBarEnabled: Boolean(template.navBarEnabled),
  };
  state.pages.push(page);
  state.activePageId = page.id;
  state.selectedDimension = dim;
  state.selectedId = null;
  render();
}

loadCustomPageTemplates();

const LOTTERY_CONSUMPTION_TEMPLATE_BACKGROUND = "#FFE0E9";
const lotteryConsumptionTemplateNodes = [];
const lotteryConsumptionTemplatePreview = [];
const pageBlueprintFormConfig = {
  moduleName: "页面基础信息",
  description: "先确认模板命中和活动基本信息。",
  sections: [
    { title: "活动信息", fields: ["页面类型", "活动名称", "活动时间"] },
  ],
};

const moduleBlueprintFormConfigs = {};

const moduleBlueprintFormAliases = {};

const templateSchemas = [];
const pageTemplates = [
  {
    id: "blank-page",
    name: "空白页",
    category: "基础",
    description: "从零开始搭建",
    preview: [
      { type: "empty", height: 160, gradient: "#f8f9fa", marginTop: 0, radius: 8 },
    ],
    nodes: [],
  },
  {
    id: "page-coupon",
    name: "模板1 只发券",
    category: "页面模板",
    description: "核心权益发券由用户填写，其余页面模块沿用默认内容。",
    canvasBackground: "#FFE0E9",
    background: "#FFE0E9",
    viewportWidth: 750,
    nodes: [
      ["核心权益模块-发券-样式2", {}],
      ["内容诊断-样式1-点击前", {}],
      ["用户教育-攻略", {}],
      ["用户教育案例-样式1", {}],
      ["官方小助手模块", {}],
      ["置底按钮", {}],
    ],
  },
  {
    id: "page-lottery",
    name: "模板2 只抽奖",
    category: "页面模板",
    description: "核心权益发券和投放抽奖由用户填写，其余页面模块沿用默认内容。",
    canvasBackground: "#FFE0E9",
    background: "#FFE0E9",
    viewportWidth: 750,
    nodes: [
      ["账户优惠券提示", {}],
      ["核心权益模块-发券-样式2", {}],
      ["投放抽奖", {}],
      ["内容诊断-样式1-点击前", {}],
      ["用户教育-攻略", {}],
      ["用户教育案例-样式1", {}],
      ["官方小助手模块", {}],
      ["置底按钮", {}],
    ],
  },
  {
    id: "page-lottery-consumption-return",
    name: "模板3 抽奖 + 消耗返",
    category: "页面模板",
    description: "Big-day 发券、四档消耗返、抽奖九宫格、任务和流量扶持券由用户填写，其余页面模块沿用默认内容。",
    canvasBackground: "#FFE0E9",
    background: "#FFE0E9",
    viewportWidth: 750,
    nodes: [
      ["账户优惠券提示", {}],
      ["核心权益模块-bigday发券-样式1", {}],
      ["核心玩法模块-抽奖消返-4列", {}],
      ["核心玩法模块-抽奖-未报名", {}],
      ["任务列表", {}],
      ["投稿赢流量-样式3", {}],
      ["AI智投", {}],
      ["节点指南", {}],
      ["置底按钮", {}],
    ],
  },
  {
    id: "page-guide-no-incentive",
    name: "模板4 无激励攻略",
    category: "页面模板",
    description: "无需填写 PRD，页面模块直接使用默认内容。",
    canvasBackground: "#FFE0E9",
    background: "#FFE0E9",
    viewportWidth: 750,
    nodes: [
      ["账户优惠券提示", {}],
      ["内容诊断-样式1-点击前", {}],
      ["用户教育-攻略", {}],
      ["用户教育案例-样式2", {}],
      ["置底按钮", {}],
    ],
  },
];

const PRD_PAGE_TEMPLATE_ID_BY_NAME = {
  "模板1 只发券": "page-coupon",
  "模板2 只抽奖": "page-lottery",
  "模板3 抽奖 + 消耗返": "page-lottery-consumption-return",
  "模板4 无激励攻略": "page-guide-no-incentive",
};

const PRD_PAGE_TEMPLATE_INPUT_SPECS = {
  "page-coupon": [
    {
      schemaIds: ["核心权益模块-发券-样式2"],
      moduleName: "核心权益｜发券",
      sections: [
        {
          title: "",
          fields: [
            ["0.titleText", "模块标题"],
            ["1.amountText", "券金额"],
            ["1.conditionText", "券使用条件"],
            ["2.buttonText", "主按钮文案"],
          ],
        },
      ],
    },
  ],
  "page-lottery": [
    {
      schemaIds: ["核心权益模块-发券-样式2"],
      moduleName: "核心权益｜发券",
      sections: [
        {
          title: "",
          fields: [
            ["0.titleText", "模块标题"],
            ["1.amountText", "券金额"],
            ["1.conditionText", "券使用条件"],
            ["2.buttonText", "主按钮文案"],
          ],
        },
      ],
    },
    {
      schemaIds: ["投放抽奖"],
      moduleName: "核心玩法｜投放抽奖",
      sections: [
        {
          title: "",
          fields: [["0.titleText", "模块标题"]],
        },
        {
          title: "奖品配置",
          fields: Array.from({ length: MAX_LOTTERY_PRIZE_COUNT }, (_, index) => [
            `1.prize${index + 1}`,
            `奖品${index + 1}`,
          ]),
        },
        {
          title: "参与规则",
          fields: [
            ["2.titleText", "规则标题"],
            ["2.bodyText", "规则正文"],
          ],
        },
        {
          title: "行动按钮",
          fields: [["3.buttonText", "主按钮文案"]],
        },
      ],
    },
  ],
  "page-lottery-consumption-return": [
    {
      schemaIds: [
        "核心权益模块-bigday发券-样式1",
        "核心权益模块-bigday发券-样式1-已报名",
      ],
      moduleName: "核心权益｜big-day发券",
      sections: [
        {
          title: "",
          fields: [["0.titleText", "模块标题"]],
        },
        {
          title: "券信息",
          fields: [
            ["1.amountText", "券金额"],
            ["1.conditionText", "券使用条件"],
            ["1.giftConditionText", "券门槛/赠送条件"],
            ["1.specialText", "用户标签"],
          ],
        },
        {
          title: "参与规则",
          fields: [
            ["2.limitedText", "活动限制时间"],
            ["2.actionText", "参与动作"],
            ["2.orderText", "参与门槛"],
            ["2.targetText", "投放目标说明"],
          ],
        },
        {
          title: "行动与说明",
          fields: [
            ["2.buttonText", "报名按钮文案"],
            ["3.text", "补充说明"],
          ],
        },
      ],
    },
    {
      schemaIds: ["核心玩法模块-抽奖消返-4列"],
      moduleName: "核心玩法｜消耗返",
      sections: [
        {
          title: "",
          fields: [["0.titleText", "模块标题"]],
        },
        {
          title: "返券配置",
          fields: [
            ["1.amountText1", "返券1 · 金额"],
            ["1.amountText2", "返券2 · 金额"],
            ["1.amountText3", "返券3 · 金额"],
            ["1.consumeAmountText1", "第1档 · 抽奖门槛"],
            ["1.consumeAmountText2", "返券1 · 消耗门槛"],
            ["1.consumeAmountText3", "返券2 · 消耗门槛"],
            ["1.consumeAmountText4", "返券3 · 消耗门槛"],
          ],
        },
        {
          title: "活动规则",
          fields: [
            ["3.titleText", "标题"],
            ["3.firstBodyText", "规则正文1"],
            ["3.secondBodyText", "规则正文2"],
            ["3.thirdBodyText", "规则正文3"],
            ["3.highlightText", "高亮内容"],
            ["3.paragraphCount", "规则段落数量"],
          ],
        },
      ],
    },
    {
      schemaIds: [
        "核心玩法模块-抽奖-未报名",
        "核心玩法模块-抽奖-已报名",
      ],
      moduleName: "核心玩法｜抽奖-九宫格",
      preferredStateId: "registered",
      sections: [
        {
          title: "",
          fields: [["0.titleText", "标题"]],
        },
        {
          title: "奖品配置",
          fields: Array.from({ length: 8 }, (_, index) => [
            `2.prize${index + 1}`,
            `奖品${index + 1}`,
          ]),
        },
      ],
    },
    {
      schemaIds: ["任务列表"],
      moduleName: "核心玩法｜任务",
      sections: [
        {
          title: "",
          fields: [["0.titleText", "模块标题"]],
        },
        ...Array.from({ length: 3 }, (_, index) => {
          const taskNumber = index + 1;
          return {
            title: `任务${taskNumber}`,
            fields: [
              [`${taskNumber}.taskTitle`, "标题"],
              [`${taskNumber}.showNewTag`, "NEW标签"],
              [`${taskNumber}.taskSubtitle`, "说明"],
              [`${taskNumber}.rewardCountText`, "奖励数量"],
              [`${taskNumber}.completionText`, "完成次数说明"],
            ],
          };
        }),
      ],
    },
    {
      schemaIds: ["投稿赢流量-样式3"],
      moduleName: "内容增长｜流量扶持券",
      sections: [
        {
          title: "奖励信息",
          fields: [["1.supportText", "流量扶持金额"]],
        },
        {
          title: "行动按钮",
          fields: [["2.buttonText", "主按钮文案"]],
        },
        {
          title: "活动规则",
          fields: [
            ["3.titleText", "活动规则标题"],
            ["3.firstBodyText", "规则正文1"],
            ["3.secondBodyText", "规则正文2"],
            ["3.thirdBodyText", "规则正文3"],
            ["3.highlightText", "重点说明"],
            ["3.paragraphCount", "规则段落数量"],
          ],
        },
      ],
    },
  ],
  "page-guide-no-incentive": [],
};

function getCanonicalPrdPageTemplateId(pageTemplate) {
  if (!pageTemplate) return "";
  if (Object.prototype.hasOwnProperty.call(PRD_PAGE_TEMPLATE_INPUT_SPECS, pageTemplate.id)) {
    return pageTemplate.id;
  }
  const normalizedName = normalizePageTemplateLookupName(pageTemplate.name);
  const matchedName = Object.keys(PRD_PAGE_TEMPLATE_ID_BY_NAME).find((name) => {
    if (normalizePageTemplateLookupName(name) === normalizedName) return true;
    return (PRD_PAGE_TEMPLATE_ALIASES[name] || []).some(
      (alias) => normalizePageTemplateLookupName(alias) === normalizedName,
    );
  });
  return matchedName ? PRD_PAGE_TEMPLATE_ID_BY_NAME[matchedName] : "";
}

function getPrdPageTemplateInputSpecs(pageTemplate) {
  const templateId = getCanonicalPrdPageTemplateId(pageTemplate);
  return Object.prototype.hasOwnProperty.call(PRD_PAGE_TEMPLATE_INPUT_SPECS, templateId)
    ? PRD_PAGE_TEMPLATE_INPUT_SPECS[templateId]
    : null;
}

function getPrdPageTemplateModuleSpec(pageTemplate, schemaId) {
  const specs = getPrdPageTemplateInputSpecs(pageTemplate);
  if (!specs) return null;
  return specs.find((spec) => spec.schemaIds.includes(schemaId)) || null;
}

const ACTIVITY_STORAGE_KEY = "builder_activity_data_empty_v1_";
const PRD_TABLE_PACKAGE_ID = "saved-prd-table";
try {
  localStorage.removeItem("builder_prd_generated_history");
  localStorage.removeItem("builder_prd_upload_table");
} catch (e) {
  console.warn("清理旧 PRD 本地数据失败", e);
}

function getDefaultPrdTableRows() {
  return [{ key: "", value: "" }];
}

function normalizePrdTableRows(rows) {
  if (!Array.isArray(rows)) return getDefaultPrdTableRows();
  const normalized = rows
    .map((row) => ({
      key: String(row?.key ?? ""),
      value: String(row?.value ?? ""),
    }));
  return normalized.length ? normalized : [{ key: "", value: "" }];
}

const PRD_BLUEPRINT_PASTE_FIXED_COLUMNS = ["module", "field"];
const PRD_BLUEPRINT_PASTE_FIXED_HEADERS = ["模块", "字段"];
const PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS = ["", "", "", ""];
const DEFAULT_BLUEPRINT_AUDIENCE_NAME = "人群1";

function getBaseBlueprintAudienceVersion(extra = {}) {
  return {
    id: "base",
    name: DEFAULT_BLUEPRINT_AUDIENCE_NAME,
    title: DEFAULT_BLUEPRINT_AUDIENCE_NAME,
    isBase: true,
    ...extra,
  };
}

function createEmptyPrdBlueprintPasteRow() {
  return { module: "", field: "", values: [] };
}

function normalizePrdBlueprintPasteVersions(versions, minColumns = 4) {
  const normalized = Array.isArray(versions)
    ? versions.map((version) => String(version || "").trim())
    : [];
  const fallback = [...PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS];
  while (normalized.length < minColumns) {
    normalized.push(
      normalized.length < fallback.length ? fallback[normalized.length] : "",
    );
  }
  return normalized;
}

function normalizePrdBlueprintPasteRows(rows, minRows = 12, versionCount = null) {
  const targetVersionCount = versionCount ?? Math.max(
    PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS.length,
    ...(Array.isArray(rows) ? rows.map((row) => row?.values?.length || 0) : [0]),
  );
  const normalized = Array.isArray(rows)
    ? rows.map((row) => ({
        module: String(row?.module ?? ""),
        field: String(row?.field ?? ""),
        values: Array.from({ length: targetVersionCount }, (_, index) =>
          String(row?.values?.[index] ?? row?.[`value${index}`] ?? ""),
        ),
      }))
    : [];
  while (normalized.length < minRows) normalized.push(createEmptyPrdBlueprintPasteRow());
  normalized.forEach((row) => {
    while (row.values.length < targetVersionCount) row.values.push("");
  });
  return normalized;
}

function isPrdBlueprintPasteHeaderCells(cells = []) {
  return PRD_BLUEPRINT_PASTE_FIXED_HEADERS.every((header, index) =>
    normalizePageTemplateLookupName(cells[index]) === normalizePageTemplateLookupName(header),
  );
}

function parsePrdBlueprintClipboardHtmlTables(html = "") {
  if (!html.trim()) return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  return [...doc.querySelectorAll("table")]
    .map((table) =>
      [...table.querySelectorAll("tr")]
        .map((row) =>
          [...row.querySelectorAll("th,td")].map((cell) => cell.textContent.trim()),
        )
        .filter((cells) => cells.some(Boolean)),
    )
    .filter((rows) => rows.length);
}

function parsePrdBlueprintClipboardTextTables(text = "") {
  const blocks = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.split("\t").map((cell) => cell.trim()))
        .filter((cells) => cells.some(Boolean)),
    )
    .filter((rows) => rows.length);
  return blocks.length ? blocks : [];
}

function parsePrdBlueprintClipboardTables(clipboardData) {
  const htmlTables = parsePrdBlueprintClipboardHtmlTables(
    clipboardData?.getData("text/html") || "",
  );
  return htmlTables.length
    ? htmlTables
    : parsePrdBlueprintClipboardTextTables(
        clipboardData?.getData("text/plain") || "",
      );
}

function parsePrdBlueprintClipboardRows(clipboardData) {
  return parsePrdBlueprintClipboardTables(clipboardData).flat();
}

function getPrdDocumentTableHeaderIndex(rows, headerLabel) {
  const wanted = normalizePageTemplateLookupName(headerLabel);
  return rows.findIndex(
    (cells) => normalizePageTemplateLookupName(cells[0]) === wanted,
  );
}

function getPrdDocumentSpecFieldLabels(spec) {
  return new Set(
    (spec?.sections || [])
      .flatMap((section) => section.fields || [])
      .map(([, label]) => normalizePageTemplateLookupName(label))
      .filter(Boolean),
  );
}

function getPrdDocumentTableModuleSpec(rows, headerIndex, templateName) {
  const templateId = PRD_PAGE_TEMPLATE_ID_BY_NAME[templateName];
  const specs = PRD_PAGE_TEMPLATE_INPUT_SPECS[templateId] || [];
  const fieldNames = rows
    .slice(headerIndex + 1)
    .map((cells) => normalizePageTemplateLookupName(cells[0]))
    .filter(Boolean);
  return specs
    .map((spec) => {
      const labels = getPrdDocumentSpecFieldLabels(spec);
      return {
        spec,
        score: fieldNames.filter((fieldName) => labels.has(fieldName)).length,
      };
    })
    .sort((left, right) => right.score - left.score)[0];
}

function getPrdDocumentVersionHeaders(cells = []) {
  return cells
    .slice(1)
    .map((value) => String(value || "").trim())
    .filter(
      (value) =>
        value &&
        !/^(填写示意|参考输入|默认值|示例)$/.test(value),
    );
}

function parsePrdDocumentStandardTable(rows, templateName) {
  const headerIndex = getPrdDocumentTableHeaderIndex(rows, "");
  if (headerIndex < 0) return null;
  const headers = getPrdDocumentVersionHeaders(rows[headerIndex]);
  const moduleMatch = getPrdDocumentTableModuleSpec(
    rows,
    headerIndex,
    templateName,
  );
  if (!moduleMatch?.score) return null;
  const allowedFields = getPrdDocumentSpecFieldLabels(moduleMatch.spec);
  const fields = rows
    .slice(headerIndex + 1)
    .map((cells) => ({
      field: String(cells[0] || "").trim(),
      values: headers.map((_, index) => String(cells[index + 1] || "").trim()),
    }))
    .filter(
      (row) =>
        allowedFields.has(normalizePageTemplateLookupName(row.field)) &&
        row.values.some(Boolean),
    );
  return {
    module: moduleMatch.spec.moduleName,
    versions: headers,
    fields,
  };
}

function parsePrdDocumentReturnTier(value) {
  const match = String(value || "")
    .replace(/\s+/g, "")
    .match(/送满([\d.]+)赠([\d.]+)/);
  return {
    threshold: match?.[1] || "",
    reward: match?.[2] || "",
  };
}

function parsePrdDocumentReturnStrategyTable(rows) {
  const headerIndex = getPrdDocumentTableHeaderIndex(rows, "人群策略");
  if (headerIndex < 0) return null;
  const records = rows
    .slice(headerIndex + 1)
    .map((cells) => {
      const name = String(cells[0] || "").trim();
      const drawThreshold =
        String(cells[1] || "").replace(/\s+/g, "").match(/(?:≥|>=|满)([\d.]+)/)?.[1] ||
        "";
      const tiers = [2, 3, 4].map((index) =>
        parsePrdDocumentReturnTier(cells[index]),
      );
      return { name, drawThreshold, tiers };
    })
    .filter(
      (record) =>
        record.name &&
        record.drawThreshold &&
        record.tiers.some((tier) => tier.threshold || tier.reward),
    );
  if (!records.length) return null;
  const fieldValues = [
    ["第1档 · 抽奖门槛", records.map((record) => record.drawThreshold)],
    ["返券1 · 金额", records.map((record) => record.tiers[0].reward)],
    ["返券2 · 金额", records.map((record) => record.tiers[1].reward)],
    ["返券3 · 金额", records.map((record) => record.tiers[2].reward)],
    ["返券1 · 消耗门槛", records.map((record) => record.tiers[0].threshold)],
    ["返券2 · 消耗门槛", records.map((record) => record.tiers[1].threshold)],
    ["返券3 · 消耗门槛", records.map((record) => record.tiers[2].threshold)],
  ];
  return {
    module: "核心玩法｜消耗返",
    versions: records.map((record) => record.name),
    fields: fieldValues.map(([field, values]) => ({ field, values })),
  };
}

function parsePrdDocumentGuideTable(rows) {
  const headerIndex = getPrdDocumentTableHeaderIndex(rows, "页面模块顺序");
  if (headerIndex < 0) return null;
  const diagnosisRow = rows
    .slice(headerIndex + 1)
    .find((cells) => String(cells[0] || "").trim() === "2");
  const diagnosisName = (diagnosisRow || [])
    .slice(1)
    .map((value) => String(value || "").trim())
    .find(Boolean);
  const normalizedName = normalizePageTemplateLookupName(diagnosisName);
  const stateId = normalizedName.includes(
    normalizePageTemplateLookupName("优质视频提示"),
  )
    ? "quality"
    : normalizedName.includes(normalizePageTemplateLookupName("账号问题提示"))
      ? "account"
      : "entry";
  return { stateId };
}

function adaptPrdDocumentClipboardTables(
  tables,
  templateName,
  existingVersions = [],
  hasExistingData = false,
) {
  const hasDocumentTable = tables.some(
    (rows) =>
      getPrdDocumentTableHeaderIndex(rows, "") >= 0 ||
      getPrdDocumentTableHeaderIndex(rows, "人群策略") >= 0 ||
      getPrdDocumentTableHeaderIndex(rows, "页面模块顺序") >= 0,
  );
  if (!hasDocumentTable) return null;
  if (!templateName) {
    return { error: "请先选择本次粘贴对应的页面模板" };
  }

  const returnStrategy = tables
    .map(parsePrdDocumentReturnStrategyTable)
    .find(Boolean);
  const guideTable = tables
    .map(parsePrdDocumentGuideTable)
    .find(Boolean);
  const standardTables = tables
    .map((rows) => parsePrdDocumentStandardTable(rows, templateName))
    .filter(Boolean);
  if (!standardTables.length && !returnStrategy && !guideTable) {
    return { error: "未识别到该模板的模块字段，请确认复制了完整表格" };
  }

  const versions = returnStrategy
    ? returnStrategy.versions
    : guideTable
      ? [""]
      : hasExistingData
      ? normalizePrdBlueprintPasteVersions(existingVersions, 0)
      : [...new Set(standardTables.flatMap((table) => table.versions))];
  if (!versions.length) {
    return { error: "表格中没有已填写的人群版本" };
  }

  const outputRows = [
    ["模块", "字段", ...versions],
    ["页面基础信息", "页面类型", templateName, ...versions.slice(1).map(() => "")],
  ];
  standardTables.forEach((table) => {
    table.fields.forEach((field) => {
      const values = versions.map((version, index) => {
        const sourceIndex = table.versions.findIndex(
          (sourceVersion) =>
            normalizePageTemplateLookupName(sourceVersion) ===
            normalizePageTemplateLookupName(version),
        );
        const mappedIndex = sourceIndex >= 0 ? sourceIndex : index;
        return field.values[mappedIndex] || "";
      });
      outputRows.push([table.module, field.field, ...values]);
    });
  });
  if (returnStrategy) {
    returnStrategy.fields.forEach((field) => {
      outputRows.push([returnStrategy.module, field.field, ...field.values]);
    });
  }
  return {
    rows: outputRows,
    versions,
    templateName,
    guideStateId: guideTable?.stateId || "",
  };
}

function detectPrdDocumentTemplateName(content = "") {
  const normalizedContent = normalizePageTemplateLookupName(content);
  const matched = Object.entries(PRD_PAGE_TEMPLATE_ALIASES).find(
    ([templateName, aliases]) =>
      [templateName, ...aliases].some((name) =>
        normalizedContent.includes(normalizePageTemplateLookupName(name)),
      ),
  );
  return matched?.[0] || "";
}

function mergeAdaptedPrdDocumentRows(
  currentRows,
  adapted,
  targetModuleName = "",
) {
  const versions = adapted.versions;
  const rows = normalizePrdBlueprintPasteRows(
    currentRows,
    0,
    versions.length,
  );
  adapted.rows.slice(1).forEach((cells) => {
    const moduleName = String(cells[0] || "").trim();
    const fieldName = String(cells[1] || "").trim();
    if (
      targetModuleName &&
      normalizePageTemplateLookupName(moduleName) !==
        normalizePageTemplateLookupName(targetModuleName) &&
      normalizePageTemplateLookupName(moduleName) !==
        normalizePageTemplateLookupName("页面基础信息")
    ) {
      return;
    }
    const rowIndex = rows.findIndex(
      (row) =>
        normalizePageTemplateLookupName(row.module) ===
          normalizePageTemplateLookupName(moduleName) &&
        normalizePageTemplateLookupName(row.field) ===
          normalizePageTemplateLookupName(fieldName),
    );
    if (rowIndex < 0) return;
    rows[rowIndex].values = versions.map(
      (_, index) => String(cells[index + 2] || "").trim(),
    );
  });
  return rows;
}

function getPrdBlueprintPasteVersionsFromModal(modal) {
  const versions = [...modal.querySelectorAll("[data-prd-blueprint-version-cell]")]
    .map((cell) => cell.textContent.trim())
    .filter(Boolean);
  return versions.length
    ? versions
    : normalizePrdBlueprintPasteVersions(
        state.prdBlueprintPasteVersions,
        state.prdBlueprintPasteVersions.length,
      );
}

function getPrdBlueprintPasteRowsFromModal(modal) {
  const rows = normalizePrdBlueprintPasteRows(
    state.prdBlueprintPasteRows,
    0,
    state.prdBlueprintPasteVersions.length,
  );
  [...modal.querySelectorAll("[data-prd-blueprint-paste-row]")].forEach((row) => {
    const cells = [...row.querySelectorAll("[data-prd-blueprint-cell]")];
    const rowIndex = Number(row.dataset.prdBlueprintPasteRow);
    if (!Number.isInteger(rowIndex)) return;
    rows[rowIndex] = {
      module: cells[0]?.textContent.trim() || "",
      field: cells[1]?.textContent.trim() || "",
      values: cells.slice(2).map((cell) => cell.textContent.trim()),
    };
  });
  return rows;
}

function getFilledPrdBlueprintPasteRows(rows = []) {
  return normalizePrdBlueprintPasteRows(rows, 0).filter((row) =>
    row.module.trim() || row.field.trim() || row.values.some((value) => value.trim()),
  );
}

function mergePrdBlueprintPasteRows(currentRows, currentVersions, incomingCells, startRowIndex, startCellIndex) {
  const hasHeader = isPrdBlueprintPasteHeaderCells(incomingCells[0] || []);
  const incomingRows = hasHeader ? incomingCells.slice(1) : incomingCells;
  const nextVersions = normalizePrdBlueprintPasteVersions(currentVersions);
  if (hasHeader) {
    const pastedVersions = incomingCells[0].slice(PRD_BLUEPRINT_PASTE_FIXED_COLUMNS.length).filter(Boolean);
    pastedVersions.forEach((version, index) => {
      nextVersions[index] = version;
    });
  }
  const rows = normalizePrdBlueprintPasteRows(currentRows, 12, nextVersions.length);
  incomingRows.forEach((cells, incomingRowIndex) => {
    const targetIndex = startRowIndex + incomingRowIndex;
    while (rows.length <= targetIndex) rows.push(createEmptyPrdBlueprintPasteRow());
    cells.forEach((cellValue, incomingCellIndex) => {
      const targetCellIndex = startCellIndex + incomingCellIndex;
      if (targetCellIndex === 0) rows[targetIndex].module = cellValue || "";
      if (targetCellIndex === 1) rows[targetIndex].field = cellValue || "";
      if (targetCellIndex >= 2) {
        const valueIndex = targetCellIndex - PRD_BLUEPRINT_PASTE_FIXED_COLUMNS.length;
        while (nextVersions.length <= valueIndex) nextVersions.push(`版本${nextVersions.length + 1}`);
        while (rows[targetIndex].values.length <= valueIndex) rows[targetIndex].values.push("");
        rows[targetIndex].values[valueIndex] = cellValue || "";
      }
    });
  });
  return {
    rows: normalizePrdBlueprintPasteRows(rows, 12, nextVersions.length),
    versions: nextVersions,
  };
}

function expandPrdBlueprintPasteRows(rows = [], versions = PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS) {
  const normalizedVersions = normalizePrdBlueprintPasteVersions(versions, 0);
  return getFilledPrdBlueprintPasteRows(rows).flatMap((row) =>
    row.values.map((value, index) => ({
      module: row.module,
      version: normalizedVersions[index] || "",
      field: row.field,
      value,
    })).filter((entry) => entry.value.trim()),
  );
}

function getPrdBlueprintPastePageType(rows = [], versions = PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS) {
  const expandedRows = expandPrdBlueprintPasteRows(rows, versions);
  const templateNames = Object.keys(PRD_PAGE_TEMPLATE_ALIASES);
  const directTemplateName = templateNames.find((templateName) =>
    expandedRows.some((row) =>
      [row.module, row.field, row.value].some(
        (value) =>
          normalizePageTemplateLookupName(value) ===
          normalizePageTemplateLookupName(templateName),
      ),
    ),
  );
  if (directTemplateName) return directTemplateName;
  const pageTypeRow = expandedRows.find((row) =>
    normalizePageTemplateLookupName(row.module) === normalizePageTemplateLookupName("页面基础信息") &&
    /^(页面类型|活动类型|类型)$/.test(String(row.field || "").trim()),
  );
  return normalizePrdPageTypeValue(pageTypeRow?.value || "");
}

function getPageTemplateNodeModuleAliases(pageTemplate, moduleIndex) {
  const node = materializePageTemplateNodes(pageTemplate)[moduleIndex];
  const schema = findAtomSchema(node?.schemaId) ||
    moleculeSchemas.find((item) => item.id === node?.schemaId || item.name === node?.schemaId);
  const stateConfig = getPageTemplateBusinessStateConfig(
    node?.schemaId,
    pageTemplate?.id,
    moduleIndex,
  );
  return [
    node?.name,
    node?.schemaId,
    schema?.name,
    schema?.id,
    getGlobalComponentDisplayName(node?.schemaId, node?.name),
    stateConfig?.label,
  ].filter(Boolean);
}

function isPrdBlueprintDefaultVersion(versionName) {
  const normalized = normalizePageTemplateLookupName(versionName || "默认版本");
  return !normalized || normalized === normalizePageTemplateLookupName("默认版本");
}

function addImportedManualModuleVersion(moduleKey, versionName, manualVersions) {
  if (!moduleKey || isPrdBlueprintDefaultVersion(versionName)) return;
  if (!manualVersions[moduleKey]) manualVersions[moduleKey] = [];
  if (
    manualVersions[moduleKey].some((version) =>
      normalizePageTemplateLookupName(version.name) === normalizePageTemplateLookupName(versionName),
    )
  ) {
    return;
  }
  manualVersions[moduleKey].push({
    id: `imported_${Date.now()}_${manualVersions[moduleKey].length + 1}`,
    name: versionName,
  });
}

function isPrdBlueprintTaskModuleName(moduleName) {
  const normalized = getNormalizedPrdBlueprintModuleName(moduleName);
  return normalized === normalizePageTemplateLookupName("任务列表") ||
    normalized === normalizePageTemplateLookupName("任务列表模块") ||
    normalized === normalizePageTemplateLookupName("核心玩法｜任务");
}

function getPrdBlueprintTaskNumberFromField(fieldName) {
  const match = String(fieldName || "").match(/^任务\s*(\d+)/);
  return match ? Number(match[1]) : 0;
}

function getPrdBlueprintTaskCountsByVersion(pasteRows = [], versions = PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS) {
  const explicitCounts = new Map();
  const inferredCounts = new Map();
  expandPrdBlueprintPasteRows(pasteRows, versions).forEach((row) => {
    if (!isPrdBlueprintTaskModuleName(row.module)) return;
    const versionName = row.version || "";
    if (normalizePageTemplateLookupName(row.field) === normalizePageTemplateLookupName("任务数量")) {
      const explicitCount = Number(row.value);
      if (Number.isFinite(explicitCount) && explicitCount > 0) {
        explicitCounts.set(versionName, Math.round(explicitCount));
      }
      return;
    }
    const taskNumber = getPrdBlueprintTaskNumberFromField(row.field);
    if (taskNumber > 0 && String(row.value || "").trim()) {
      inferredCounts.set(versionName, Math.max(inferredCounts.get(versionName) || 0, taskNumber));
    }
  });
  const counts = new Map();
  new Set([...explicitCounts.keys(), ...inferredCounts.keys()]).forEach((versionName) => {
    counts.set(
      versionName,
      Math.max(
        1,
        Math.round(
          explicitCounts.get(versionName) ||
            inferredCounts.get(versionName) ||
            0,
        ),
      ),
    );
  });
  return counts;
}

function getPrdBlueprintMaxTaskCount(pasteRows = [], versions = PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS) {
  return Math.max(0, ...getPrdBlueprintTaskCountsByVersion(pasteRows, versions).values());
}

function buildPageTemplateSeedBlueprintFromPasteRows(pageTemplate, pasteRows, versions) {
  const blueprint = {};
  const nodes = materializePageTemplateNodes(pageTemplate);
  const inferredTaskCount = getPrdBlueprintMaxTaskCount(pasteRows, versions);
  if (inferredTaskCount > 0) {
    const taskModuleIndex = nodes.findIndex((node, index) =>
      getPageTemplateNodeModuleAliases(pageTemplate, index).some(isPrdBlueprintTaskModuleName),
    );
    if (taskModuleIndex >= 0) {
      blueprint[getPageBlueprintKey(taskModuleIndex, "taskCount")] = inferredTaskCount;
    }
  }
  expandPrdBlueprintPasteRows(pasteRows, versions).forEach((row) => {
    if (normalizePageTemplateLookupName(row.field) !== normalizePageTemplateLookupName("任务数量")) return;
    const moduleIndex = nodes.findIndex((node, index) =>
      getPageTemplateNodeModuleAliases(pageTemplate, index).some((alias) =>
        normalizePageTemplateLookupName(alias) === normalizePageTemplateLookupName(row.module),
      ),
    );
    if (moduleIndex >= 0) blueprint[getPageBlueprintKey(moduleIndex, "taskCount")] = row.value;
  });
  return blueprint;
}

function getNormalizedPrdBlueprintModuleName(value) {
  return normalizePageTemplateLookupName(value)
    .replace(/核心玩法模块抽奖$/, "核心玩法模块抽奖未报名")
    .replace(/任务列表模块$/, "任务列表");
}

function isPrdBlueprintModuleMatch(field, moduleName) {
  const wanted = getNormalizedPrdBlueprintModuleName(moduleName);
  return field.moduleAliases.some((alias) => getNormalizedPrdBlueprintModuleName(alias) === wanted);
}

function getPrdBlueprintFieldAliases(field) {
  const label = String(field.label || "");
  const key = String(field.key || "");
  const childName = String(field.childName || "");
  const sectionTitle = String(field.sectionTitle || "");
  const aliases = new Set([
    label,
    key,
    field.field?.name,
    field.field?.label,
    childName && label ? `${childName}｜${label}` : "",
    childName && label ? `${childName}${label}` : "",
    sectionTitle && label ? `${sectionTitle}｜${label}` : "",
    sectionTitle && label ? `${sectionTitle}${label}` : "",
  ].filter(Boolean));

  const prizeMatch = label.match(/^奖品(\d+)$/);
  if (prizeMatch) aliases.add(`奖品${prizeMatch[1]}名称`);

  const taskNumber = Number(field.childIndex);
  if (Number.isFinite(taskNumber) && taskNumber > 0 && /任务条/.test(childName)) {
    const taskPrefix = `任务${taskNumber}`;
    const taskAliasMap = {
      任务标题: "标题",
      任务副标题: "描述",
      抽奖加成: "奖励数量",
      完成次数文案: "每日次数",
    };
    const suffix = taskAliasMap[label];
    if (suffix) aliases.add(`${taskPrefix}${suffix}`);
  }

  if (label === "标题内容") {
    aliases.add("模块标题");
    aliases.add("抽奖模块标题");
    aliases.add("消耗返模块标题");
    aliases.add("报名模块标题");
  }

  const consumptionAliasMap = {
    金额1: ["第1档奖励金额"],
    金额2: ["第2档奖励金额"],
    满赠券文案: ["第3档奖励金额"],
    "30元文案": ["抽奖入口文案", "第1个进度节点文案"],
    消耗金额1: ["第2个进度节点文案"],
    消耗金额2: ["第3个进度节点文案"],
    消耗金额3: ["第4个进度节点文案"],
  };
  (consumptionAliasMap[label] || []).forEach((alias) => aliases.add(alias));

  return [...aliases].map(normalizePageTemplateLookupName).filter(Boolean);
}

function getPrdBlueprintPrizeNumber(fieldName) {
  const match = String(fieldName || "").replace(/\s+/g, "").match(/^奖(?:品|池)(\d+)(?:名称)?$/);
  return match ? Number(match[1]) : 0;
}

function isLotteryPrizePropKey(propKey) {
  return /^prize\d+(Name|Text|Copy)?$/.test(String(propKey || ""));
}

function isPrdBlueprintFieldMatch(field, fieldName) {
  const wanted = normalizePageTemplateLookupName(fieldName);
  if (!wanted) return false;
  return getPrdBlueprintFieldAliases(field).includes(wanted);
}

function findPrdBlueprintMatchedField(fields, row) {
  return fields.find((field) =>
    isPrdBlueprintModuleMatch(field, row.module) &&
    isPrdBlueprintFieldMatch(field, row.field),
  );
}

function findPrdBlueprintTaskCountField(fields) {
  return fields.find((field) =>
    field.key === "taskCount" &&
    field.moduleAliases?.some(isPrdBlueprintTaskModuleName),
  );
}

function withDynamicPrdBlueprintPrizeFields(fields, dataRows) {
  const nextFields = [...fields];
  dataRows.forEach((row) => {
    const prizeIndex = getPrdBlueprintPrizeNumber(row.field);
    if (!prizeIndex || prizeIndex > MAX_LOTTERY_PRIZE_COUNT || !String(row.value || "").trim()) return;
    const baseField = nextFields.find((field) =>
      isPrdBlueprintModuleMatch(field, row.module) &&
      getPrdBlueprintPrizeNumber(field.label) === 1,
    );
    if (!baseField) return;
    const localKey = getPageTemplateFieldLocalCompoundKey(baseField);
    const childMatch = localKey.match(/^(\d+)\.prize\d+$/);
    const propKey = `prize${prizeIndex}`;
    const compoundKey = childMatch
      ? getPageBlueprintKey(baseField.moduleIndex, getMoleculeBlueprintKey(Number(childMatch[1]), propKey))
      : getPageBlueprintKey(baseField.moduleIndex, propKey);
    if (nextFields.some((field) => field.compoundKey === compoundKey)) return;
    nextFields.push({
      ...baseField,
      key: propKey,
      compoundKey,
      label: `奖品${prizeIndex}`,
      field: {
        ...(baseField.field || {}),
        key: propKey,
        name: propKey,
        label: `奖品${prizeIndex}`,
        type: "prize",
      },
    });
  });
  return nextFields;
}

function withDynamicPageTemplatePrizeFields(fields, rows) {
  const groups = new Map();
  const getGroupKey = (moduleIndex, childIndex) => `${moduleIndex}|${childIndex}`;
  const ensureGroup = (moduleIndex, childIndex) => {
    const key = getGroupKey(moduleIndex, childIndex);
    if (!groups.has(key)) {
      groups.set(key, {
        moduleIndex,
        childIndex,
        maxPrizeIndex: 0,
        explicitCount: 0,
        baseField: null,
      });
    }
    return groups.get(key);
  };
  fields.forEach((field) => {
    const localKey = getPageTemplateFieldLocalCompoundKey(field);
    const match = localKey.match(/^(\d+)\.prize(\d+)$/);
    if (!match) return;
    const group = ensureGroup(Number(field.moduleIndex), Number(match[1]));
    const prizeIndex = Number(match[2]);
    if (prizeIndex === 1) group.baseField = field;
  });
  normalizePrdTableRows(rows).forEach((row) => {
    const rowValue = String(row.value || "").trim();
    if (!rowValue) return;
    const parsed =
      parsePageTemplateVariableRowKey(row.key) ||
      parsePageTemplateVariableVersionRowKey(row.key);
    const localKey = parsed?.compoundKey || "";
    const countMatch = localKey.match(/^(\d+)\.prizeCount$/);
    if (countMatch) {
      ensureGroup(parsed.moduleIndex, Number(countMatch[1])).explicitCount = Math.min(
        MAX_LOTTERY_PRIZE_COUNT,
        Math.max(1, Number(row.value) || 1),
      );
      return;
    }
    const prizeMatch = localKey.match(/^(\d+)\.prize(\d+)$/);
    if (!prizeMatch) return;
    const group = ensureGroup(parsed.moduleIndex, Number(prizeMatch[1]));
    group.maxPrizeIndex = Math.max(
      group.maxPrizeIndex,
      Math.min(MAX_LOTTERY_PRIZE_COUNT, Number(prizeMatch[2])),
    );
  });
  let nextFields = fields.filter((field) => {
    const localKey = getPageTemplateFieldLocalCompoundKey(field);
    const match = localKey.match(/^(\d+)\.prize(\d+)$/);
    if (!match) return true;
    const group = groups.get(getGroupKey(Number(field.moduleIndex), Number(match[1])));
    const count = Math.min(
      MAX_LOTTERY_PRIZE_COUNT,
      group?.explicitCount || group?.maxPrizeIndex || DEFAULT_LOTTERY_PRIZE_COUNT,
    );
    return Number(match[2]) <= count;
  });
  groups.forEach((group) => {
    const baseField = group.baseField || nextFields.find((field) =>
      Number(field.moduleIndex) === Number(group.moduleIndex) &&
      getPageTemplateFieldLocalCompoundKey(field) === getMoleculeBlueprintKey(group.childIndex, "prize1"),
    );
    if (!baseField) return;
    const count = Math.min(
      MAX_LOTTERY_PRIZE_COUNT,
      group.explicitCount || group.maxPrizeIndex || DEFAULT_LOTTERY_PRIZE_COUNT,
    );
    for (let prizeIndex = 1; prizeIndex <= count; prizeIndex += 1) {
      const compoundKey = getPageBlueprintKey(
        group.moduleIndex,
        getMoleculeBlueprintKey(group.childIndex, `prize${prizeIndex}`),
      );
      if (nextFields.some((field) => field.compoundKey === compoundKey)) continue;
      nextFields.push({
      ...baseField,
      key: `prize${prizeIndex}`,
      compoundKey,
      label: `奖品${prizeIndex}`,
      field: {
        ...(baseField.field || {}),
        key: `prize${prizeIndex}`,
        name: `prize${prizeIndex}`,
        label: `奖品${prizeIndex}`,
        type: "prize",
      },
    });
    }
  });
  return nextFields;
}

function getPageTemplatePrizeRowKey(moduleIndex, childIndex, prizeIndex, versionName = "") {
  const compoundKey = getPageBlueprintKey(
    Number(moduleIndex),
    getMoleculeBlueprintKey(Number(childIndex), `prize${Number(prizeIndex)}`),
  );
  if (versionName) {
    return [
      PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
      String(Number(moduleIndex) + 1),
      versionName,
      compoundKey,
    ].join("｜");
  }
  return [
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
    String(Number(moduleIndex) + 1),
    compoundKey,
  ].join("｜");
}

function getPageTemplatePrizeCountRowKey(moduleIndex, childIndex, versionName = "") {
  const compoundKey = getPageBlueprintKey(
    Number(moduleIndex),
    getMoleculeBlueprintKey(Number(childIndex), "prizeCount"),
  );
  if (versionName) {
    return [
      PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
      String(Number(moduleIndex) + 1),
      versionName,
      compoundKey,
    ].join("｜");
  }
  return [
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
    String(Number(moduleIndex) + 1),
    compoundKey,
  ].join("｜");
}

function upsertPrdTableRow(key, value = "") {
  const index = findPrdTableRowIndexByKey(key);
  if (index >= 0) {
    state.prdTableRows[index].value = String(value);
    return index;
  }
  state.prdTableRows.push({ key, value: String(value) });
  return state.prdTableRows.length - 1;
}

function getPageTemplateBlueprintPrizeCount(moduleIndex, childIndex) {
  let explicitCount = 0;
  let maxPrizeIndex = 0;
  normalizePrdTableRows(state.prdTableRows).forEach((row) => {
    const value = String(row.value || "").trim();
    if (!value) return;
    const parsed =
      parsePageTemplateVariableRowKey(row.key) ||
      parsePageTemplateVariableVersionRowKey(row.key);
    if (!parsed || Number(parsed.moduleIndex) !== Number(moduleIndex)) return;
    const countMatch = String(parsed.compoundKey || "").match(/^(\d+)\.prizeCount$/);
    if (countMatch && Number(countMatch[1]) === Number(childIndex)) {
      explicitCount = Math.max(explicitCount, Number(row.value) || 0);
      return;
    }
    const prizeMatch = String(parsed.compoundKey || "").match(/^(\d+)\.prize(\d+)$/);
    if (prizeMatch && Number(prizeMatch[1]) === Number(childIndex)) {
      maxPrizeIndex = Math.max(maxPrizeIndex, Number(prizeMatch[2]));
    }
  });
  return Math.min(
    MAX_LOTTERY_PRIZE_COUNT,
    Math.max(1, explicitCount || maxPrizeIndex || DEFAULT_LOTTERY_PRIZE_COUNT),
  );
}

function setPageTemplateBlueprintPrizeCount(moduleIndex, childIndex, count, versionNames = []) {
  const nextCount = Math.min(
    MAX_LOTTERY_PRIZE_COUNT,
    Math.max(1, Math.round(Number(count) || 1)),
  );
  upsertPrdTableRow(getPageTemplatePrizeCountRowKey(moduleIndex, childIndex), String(nextCount));
  versionNames.forEach((versionName) => {
    if (versionName) {
      upsertPrdTableRow(
        getPageTemplatePrizeCountRowKey(moduleIndex, childIndex, versionName),
        String(nextCount),
      );
    }
  });
  return nextCount;
}

function addPageTemplateBlueprintPrize(moduleIndex, childIndex, versionNames = []) {
  const nextIndex = getPageTemplateBlueprintPrizeCount(moduleIndex, childIndex) + 1;
  setPageTemplateBlueprintPrizeCount(moduleIndex, childIndex, nextIndex, versionNames);
  const targets = versionNames.length ? versionNames : [""];
  targets.forEach((versionName) => {
    upsertPrdTableRow(
      getPageTemplatePrizeRowKey(moduleIndex, childIndex, nextIndex, versionName),
      "",
    );
  });
}

function deletePageTemplateBlueprintPrize(moduleIndex, childIndex, deleteIndex, versionNames = []) {
  const currentCount = getPageTemplateBlueprintPrizeCount(moduleIndex, childIndex);
  if (currentCount <= 1 || deleteIndex < 1 || deleteIndex > currentCount) return;
  const nextCount = currentCount - 1;
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows)
    .map((row) => {
      const parsedBase = parsePageTemplateVariableRowKey(row.key);
      const parsedVersion = parsePageTemplateVariableVersionRowKey(row.key);
      const parsed = parsedBase || parsedVersion;
      if (!parsed || Number(parsed.moduleIndex) !== Number(moduleIndex)) return row;
      const prizeMatch = String(parsed.compoundKey || "").match(/^(\d+)\.prize(\d+)$/);
      if (!prizeMatch || Number(prizeMatch[1]) !== Number(childIndex)) return row;
      const prizeIndex = Number(prizeMatch[2]);
      if (prizeIndex === Number(deleteIndex)) return null;
      if (prizeIndex < Number(deleteIndex)) return row;
      const nextKey = getPageTemplatePrizeRowKey(
        moduleIndex,
        childIndex,
        prizeIndex - 1,
        parsedVersion?.versionName || "",
      );
      return { ...row, key: nextKey };
    })
    .filter(Boolean);
  setPageTemplateBlueprintPrizeCount(moduleIndex, childIndex, nextCount, versionNames);
}

function appendInferredTaskCountRows({ rows, fields, taskCountsByVersion, explicitTaskCountVersions, pageTemplate, manualVersions }) {
  const taskCountField = findPrdBlueprintTaskCountField(fields);
  if (!taskCountField) return;
  taskCountsByVersion.forEach((count, versionName) => {
    if (!count || explicitTaskCountVersions.has(versionName)) return;
    if (isPrdBlueprintDefaultVersion(versionName)) {
      rows.push({
        key: getPageTemplateVariableRowKey(taskCountField),
        value: String(count),
      });
      return;
    }
    const moduleKey = getPageTemplateVersionModuleKey(pageTemplate.id, taskCountField.moduleIndex);
    addImportedManualModuleVersion(moduleKey, versionName, manualVersions);
    rows.push({
      key: getPageTemplateVariableVersionRowKey(taskCountField, versionName),
      value: String(count),
    });
  });
}

function convertBlueprintPasteRowsToPrdRows(pasteRows = [], versions = PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS) {
  const dataRows = expandPrdBlueprintPasteRows(pasteRows, versions);
  const directRows = dataRows
    .filter((row) => normalizePageTemplateLookupName(row.module) === normalizePageTemplateLookupName("页面基础信息"))
    .map((row) => ({ key: row.field, value: row.value }));
  const pageType = getPrdBlueprintPastePageType(pasteRows, versions) || getPrdPageTemplateType(directRows);
  const pageTemplate = pageType ? findLatestCustomPageTemplateByPrdType(pageType) : null;
  const manualVersions = {};
  if (!pageTemplate) {
    const fallbackRows = dataRows
      .filter((row) => normalizePageTemplateLookupName(row.module) !== normalizePageTemplateLookupName("页面基础信息"))
      .map((row) => ({
        key: [row.module, row.version || "", row.field].filter(Boolean).join("｜"),
        value: row.value,
      }));
    return { rows: normalizePrdTableRows([...directRows, ...fallbackRows]), manualVersions };
  }

  const seedBlueprint = buildPageTemplateSeedBlueprintFromPasteRows(pageTemplate, pasteRows, versions);
  const fields = withDynamicPrdBlueprintPrizeFields(
    getPrdPageTemplateInputFields(pageTemplate, { blueprint: seedBlueprint }).map((field) => ({
      ...field,
      moduleAliases: getPageTemplateNodeModuleAliases(pageTemplate, field.moduleIndex),
    })),
    dataRows,
  );
  const rows = [...directRows];
  const taskCountsByVersion = getPrdBlueprintTaskCountsByVersion(pasteRows, versions);
  const explicitTaskCountVersions = new Set(
    dataRows
      .filter((row) =>
        isPrdBlueprintTaskModuleName(row.module) &&
        normalizePageTemplateLookupName(row.field) === normalizePageTemplateLookupName("任务数量"),
      )
      .map((row) => row.version || ""),
  );

  appendInferredTaskCountRows({
    rows,
    fields,
    taskCountsByVersion,
    explicitTaskCountVersions,
    pageTemplate,
    manualVersions,
  });

  dataRows.forEach((row) => {
    if (normalizePageTemplateLookupName(row.module) === normalizePageTemplateLookupName("页面基础信息")) return;
    const matchedField = findPrdBlueprintMatchedField(fields, row);
    if (!matchedField) {
      rows.push({
        key: [row.module, row.version || "", row.field].filter(Boolean).join("｜"),
        value: row.value,
      });
      return;
    }
    const versionName = row.version || "";
    const value = isPageTemplatePrizeField(matchedField)
      ? normalizePrizeLibraryValue(row.value)
      : row.value;
    if (isPrdBlueprintDefaultVersion(versionName)) {
      rows.push({ key: getPageTemplateVariableRowKey(matchedField), value });
      return;
    }
    const moduleKey = getPageTemplateVersionModuleKey(pageTemplate.id, matchedField.moduleIndex);
    addImportedManualModuleVersion(moduleKey, versionName, manualVersions);
    rows.push({
      key: getPageTemplateVariableVersionRowKey(matchedField, versionName),
      value,
    });
  });

  return { rows: normalizePrdTableRows(rows), manualVersions };
}

function parsePrdPlainTextRows(value) {
  const lines = String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const rows = [];
  let currentRow = null;

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      if (heading[1].length === 1 && !rows.some((row) => /活动名称|标题/.test(row.key))) {
        currentRow = { key: "活动名称", value: heading[2].trim() };
      } else {
        currentRow = { key: heading[2].trim(), value: "" };
      }
      rows.push(currentRow);
      return;
    }

    const fieldLine = line.match(/^(?:[-*+]\s*)?([^:：]{1,60})\s*[:：]\s*(.*)$/);
    if (fieldLine) {
      currentRow = {
        key: fieldLine[1].replace(/\*\*/g, "").trim(),
        value: fieldLine[2].replace(/\*\*/g, "").trim(),
      };
      rows.push(currentRow);
      return;
    }

    const content = line.replace(/^(?:[-*+]\s*)/, "").trim();
    if (currentRow) {
      currentRow.value = currentRow.value
        ? `${currentRow.value}\n${content}`
        : content;
      return;
    }

    currentRow = { key: "PRD 文本", value: content };
    rows.push(currentRow);
  });

  const normalizedRows = rows.filter((row) => row.key || row.value);
  return normalizedRows.length
    ? normalizePrdTableRows(normalizedRows)
    : [];
}

function getPrdTableRowsSignature(rows) {
  return JSON.stringify(normalizePrdTableRows(rows));
}

function normalizePrdModuleName(value, index) {
  const name = String(value || "").trim();
  return name || `模块 ${index + 1}`;
}

function getPrdCombinedText(row) {
  return `${row?.key || ""}\n${row?.value || ""}`.trim();
}

function normalizePrdComponentText(value) {
  return String(value || "")
    .replace(/组件|模块|原子|分子|component|schema/gi, "")
    .replace(/[\s"'“”‘’`·_\-—:：|｜/\\()[\]{}]+/g, "")
    .toLowerCase();
}

function getPrdComponentAliases(schema) {
  const genericAliases = new Set(["标题", "头图", "公告", "富文本", "按钮", "文本"]);
  return [
    schema.id,
    schema.name,
    schema.title,
    schema.reactComponent,
  ]
    .filter(Boolean)
    .map(normalizePrdComponentText)
    .filter((alias) => alias && alias.length >= 3 && !genericAliases.has(alias));
}

function findPrdNamedComponents(row) {
  const text = getPrdCombinedText(row);
  const normalizedText = normalizePrdComponentText(text);
  const atomMatches = atomSchemas
      .filter((schema) => !schema.canvasOnly && !schema.blueprint?.excludeFromPrd)
    .filter((schema) => getPrdComponentAliases(schema).some((alias) => alias && normalizedText.includes(alias)))
    .map((schema) => schema.id);
  const moleculeMatches = moleculeSchemas
    .filter((schema) => schema.id !== "MoleculeContainer")
    .filter((schema) => getPrdComponentAliases(schema).some((alias) => alias && normalizedText.includes(alias)))
    .map((schema) => `molecule:${schema.name || schema.id}`);
  return [...new Set([...atomMatches, ...moleculeMatches])];
}

function getPrdLabeledValue(text, labels) {
  const source = String(text || "");
  for (const label of labels) {
    const match = source.match(new RegExp(`${label}\\s*[：:]\\s*([^\\n\\s，,；;]+(?:\\s+[^\\n，,；;]+){0,6})`));
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function getPrdAmount(text) {
  const match = String(text || "").match(/(\d+(?:\.\d+)?)\s*(元|券|流量券)?/);
  return match?.[1] || "";
}

function getPrdPrizeCandidates(text) {
  const source = String(text || "");
  const labeled = [...source.matchAll(/(?:奖池|奖品)\s*(\d+)?\s*[：:]\s*([^，,；;\n]+)/g)]
    .map((match) => match[2].trim())
    .filter(Boolean);
  if (labeled.length) return labeled;
  return [...source.matchAll(/(?:满\s*(?:00|\d+(?:\.\d+)?)\s*元?\s*(?:送|赠)\s*(?:价值)?\s*\d+(?:\.\d+)?\s*元?(?:\s*流量)?|送满\s*(?:00|\d+(?:\.\d+)?)\s*赠\s*\d+(?:\.\d+)?|\d+\s*元流量券|\d+\s*元|DOU仔[^，,；;\n\s]+)/g)]
    .map((match) => match[0].trim())
    .filter(Boolean);
}

function getPrdTaskVariants(text) {
  const source = String(text || "");
  const compactSections = source
    .split(/(?=(?:第\s*\d+\s*档|任务门槛\s*\d+|门槛\s*\d+))/)
    .map((section) => section.trim())
    .filter((section) => /^(?:第\s*\d+\s*档|任务门槛\s*\d+|门槛\s*\d+)/.test(section))
    .map((section) => {
      const name = section.match(/^(?:第\s*\d+\s*档|任务门槛\s*\d+|门槛\s*\d+)/)?.[0] || "";
      return {
        name,
        value: section.slice(name.length).trim().slice(0, 160),
      };
    })
    .filter((item) => item.name && item.value);
  if (compactSections.length) return compactSections.slice(0, 12);

  const matches = [...source.matchAll(/((?:任务门槛|任务|门槛)\s*\d+)[：:]?\s*([^；;\n]+)/g)]
    .map((match) => ({
      name: match[1].trim(),
      value: match[2].trim(),
    }))
    .filter((item) => item.value);
  if (matches.length) return matches.slice(0, 12);

  return source
    .split(/\n+/)
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .map((line) => {
      const match = line.match(/^(.{1,32}?)[：:|｜]\s*(.+)$/);
      return match ? { name: match[1].trim(), value: match[2].trim() } : null;
    })
    .filter((item) => item?.name && item?.value)
    .slice(0, 12);
}

function getPrdModuleComponent(row) {
  return findPrdNamedComponents(row)[0] || null;
}

function getPrdModuleComponents(row) {
  return findPrdNamedComponents(row);
}

function getPrdModuleRows(row, component) {
  const text = getPrdCombinedText(row);
  const value = String(row.value || "").trim();
  const key = String(row.key || "").trim();
  const schema = findAtomSchema(component);
  if (schema) {
    let assignedMainValue = false;
    const blueprintTextProps = Array.isArray(schema.blueprint?.textProps)
      ? new Set(schema.blueprint.textProps)
      : null;
    const propEntries = getPropEntries(schema).filter(([propKey, prop]) =>
      blueprintTextProps ? blueprintTextProps.has(propKey) : isCopyPropField(propKey, prop, prop.default),
    );
    return propEntries.map(([propKey, prop]) => {
      const label = prop.label || propKey;
      const explicitValue = getPrdLabeledValue(text, [label, propKey]);
      const shouldUseMainValue =
        !assignedMainValue &&
        !explicitValue &&
        /text|title|content|amount|description|subtitle|button/i.test(propKey);
      if (shouldUseMainValue) assignedMainValue = true;
      return {
        field: label,
        propKey,
        value: explicitValue || (shouldUseMainValue ? value || key : prop.default ?? ""),
      };
    });
  }

  return [
    { field: "文本", value: value || text },
  ];
}

function parsePrdModuleVariantGroups(content, fieldName, component, baseRows) {
  return {
    rows: baseRows,
    variantGroups: [{ id: "base", name: DEFAULT_BLUEPRINT_AUDIENCE_NAME, rows: clone(baseRows) }],
  };
}

function parsePrdLotteryPrizeGroups(content) {
  const groups = [];
  const pattern = /【\s*(个人|企业)奖品\s*】\s*[:：]\s*([\s\S]*?)(?=【\s*(?:个人|企业)奖品\s*】|$)/g;
  let match = pattern.exec(String(content || ""));
  while (match) {
    const audience = match[1];
    const segment = match[2]
      .trim()
      .replace(/^七夕心动券\s*[:：]\s*/, "");
    const prizes = segment
      .split(/[\n\r,，、;；]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (prizes.length) {
      groups.push({
        id: audience === "个人" ? "personal" : "enterprise",
        name: `${audience}奖品`,
        audience,
        dimensionTitle: audience === "个人" ? "个人用户" : "企业用户",
        prizes,
      });
    }
    match = pattern.exec(String(content || ""));
  }
  return groups.sort((left, right) => {
    const order = { personal: 0, enterprise: 1 };
    return order[left.id] - order[right.id];
  });
}

function applyPrdLotteryPrizesToRows(rows, prizes) {
  const nextRows = clone(rows || []);
  prizes.forEach((prize, index) => {
    const propKey = `prize${index + 1}`;
    const row = nextRows.find(
      (item) =>
        item.propKey === propKey ||
        String(item.field || "").replace(/\s+/g, "") === `奖品${index + 1}`,
    );
    if (row) {
      row.value = normalizePrizeLibraryValue(prize) || prize;
      row.propKey = propKey;
    } else {
      nextRows.push({
        field: `奖品${index + 1}`,
        propKey,
        value: normalizePrizeLibraryValue(prize) || prize,
      });
    }
  });
  return nextRows;
}

function parseConsumptionRewardCoupon(value) {
  const match = String(value || "")
    .replace(/,/g, "")
    .match(/(?:送)?满\s*(\d+(?:\.\d+)?)\s*赠\s*(\d+(?:\.\d+)?)/);
  return match
    ? { milestone: `消耗${match[1]}元`, amount: match[2] }
    : { milestone: "", amount: "" };
}

function parseConsumptionRewardAmount(value) {
  const coupon = parseConsumptionRewardCoupon(value);
  if (coupon.amount) return coupon.amount;
  const labeledMatch = String(value || "")
    .replace(/,/g, "")
    .match(/(?:奖励|赠)\s*(\d+(?:\.\d+)?)\s*元?/);
  if (labeledMatch?.[1]) return labeledMatch[1];
  const match = String(value || "")
    .replace(/,/g, "")
    .match(/(\d+(?:\.\d+)?)\s*元?/);
  return match?.[1] || "";
}

function parseConsumptionTaskMilestone(value) {
  const match = String(value || "")
    .replace(/,/g, "")
    .match(/(?:消耗|≥|>=|满)\s*(\d+(?:\.\d+)?)\s*元?/);
  return match ? `消耗${match[1]}元` : "";
}

function parseConsumptionMilestone(value) {
  const coupon = parseConsumptionRewardCoupon(value);
  if (coupon.milestone) return coupon.milestone;
  return parseConsumptionTaskMilestone(value);
}

function getConsumptionProgressAudience(strategy) {
  const normalized = String(strategy || "").replace(/^⭐/, "").trim();
  if (/^未首消（?个人）?/.test(normalized)) {
    return {
      id: "first-spend-personal",
      title: "未首消（个人）",
      versionTitle: "未首消（个人）",
    };
  }
  const match = normalized.match(/^(素人|入驻个人|企业)-(.+)$/);
  if (!match) return null;
  const audienceMap = {
    素人: { id: "novice", title: "素人" },
    入驻个人: { id: "settled-personal", title: "入驻个人" },
    企业: { id: "enterprise", title: "企业" },
  };
  return {
    ...audienceMap[match[1]],
    versionTitle: match[2],
  };
}

function getConsumptionProgressAudienceFromLabel(label) {
  const normalized = String(label || "").replace(/^⭐/, "").trim();
  const matchedAudience = getConsumptionProgressAudience(normalized);
  if (matchedAudience) return matchedAudience;
  if (/未首消/.test(normalized)) {
    return {
      id: "first-spend-personal",
      title: "未首消（个人）",
      versionTitle: normalized || "未首消（个人）",
    };
  }
  if (/素人/.test(normalized)) {
    return {
      id: "novice",
      title: "素人",
      versionTitle: normalized.replace(/^素人[-：:\s]*/, "") || "默认",
    };
  }
  if (/入驻个人/.test(normalized)) {
    return {
      id: "settled-personal",
      title: "入驻个人",
      versionTitle: normalized.replace(/^入驻个人[-：:\s]*/, "") || "默认",
    };
  }
  if (/企业/.test(normalized)) {
    return {
      id: "enterprise",
      title: "企业",
      versionTitle: normalized.replace(/^企业[-：:\s]*/, "") || "默认",
    };
  }
  return null;
}

function createConsumptionProgressEntry(audience, props, index, explicitTitle = "") {
  if (!audience) return null;
  return {
    id: `consumption-progress-${audience.id}-${index + 1}`,
    dimensionId: audience.id,
    dimensionTitle: audience.title,
    title: explicitTitle || audience.versionTitle,
    props: {
      lotteryText: "抽奖",
      reward1AmountText: "",
      reward1UnitText: "",
      reward1LabelText: "",
      reward2AmountText: "",
      reward2UnitText: "",
      reward2LabelText: "",
      reward3AmountText: "",
      reward3UnitText: "",
      reward3LabelText: "",
      milestone1Text: "",
      milestone2Text: "",
      milestone3Text: "",
      milestone4Text: "",
      ...props,
    },
  };
}

function completeConsumptionProgressRewardProps(props) {
  [1, 2, 3].forEach((index) => {
    const amountKey = `reward${index}AmountText`;
    if (props[amountKey]) {
      props[`reward${index}UnitText`] = "元";
      props[`reward${index}LabelText`] = "满赠券";
    }
  });
  return props;
}

function parseConsumptionProgressLine(line, index) {
  const source = String(line || "").trim().replace(/"\s*\n\s*/g, "");
  const audienceMatch = source.match(
    /^(?:⭐)?(?:未首消（?个人）?|素人-[^\s\t]+|入驻个人-[^\s\t]+|企业-[^\s\t]+)/,
  );
  if (!audienceMatch) return null;
  const audience = getConsumptionProgressAudience(audienceMatch[0]);
  if (!audience) return null;

  const rest = source.slice(audienceMatch[0].length).trim();
  let columns = rest.split(/\t+|\s{2,}/).map((item) => item.trim()).filter(Boolean);
  if (columns.length < 14) {
    columns = rest.split(/\s+/).map((item) => item.trim()).filter(Boolean);
  }
  const taskIndex = columns.findIndex((item) => /累计现金消耗/.test(item));
  const firstCouponIndex = columns.findIndex((item) => /(?:送)?满\s*\d+(?:\.\d+)?\s*赠\s*\d+/.test(item));
  if (taskIndex < 0 || firstCouponIndex < 0) return null;

  const coupons = columns
    .slice(firstCouponIndex)
    .filter((item) => /(?:送)?满\s*\d+(?:\.\d+)?\s*赠\s*\d+/.test(item))
    .slice(0, 3)
    .map(parseConsumptionRewardCoupon);

  return createConsumptionProgressEntry(
    audience,
    completeConsumptionProgressRewardProps({
      milestone1Text: parseConsumptionTaskMilestone(columns[taskIndex]),
      milestone2Text: coupons[0]?.milestone || "",
      milestone3Text: coupons[1]?.milestone || "",
      milestone4Text: coupons[2]?.milestone || "",
      reward1AmountText: coupons[0]?.amount || "",
      reward2AmountText: coupons[1]?.amount || "",
      reward3AmountText: coupons[2]?.amount || "",
    }),
    index,
  );
}

function parseExplicitConsumptionProgressConfig(rows = []) {
  const sourceRows = normalizePrdTableRows(rows);
  const markerIndex = sourceRows.findIndex((row) =>
    /消耗(?:分|返)\s*[-—–]?\s*阶梯任务进度/.test(`${row.key || ""}${row.value || ""}`),
  );
  if (markerIndex < 0) return [];

  const entries = [];
  let current = null;
  const commit = () => {
    if (!current?.audience) return;
    entries.push(createConsumptionProgressEntry(
      current.audience,
      completeConsumptionProgressRewardProps(current.props),
      entries.length,
      current.title,
    ));
  };
  const ensureCurrent = () => {
    if (!current) current = { audience: null, title: "", props: {} };
    return current;
  };

  for (let index = markerIndex + 1; index < sourceRows.length; index += 1) {
    const row = sourceRows[index];
    const key = String(row.key || "").trim();
    const value = String(row.value || "").trim();
    const combined = `${key}：${value}`.trim();

    if (
      entries.length &&
      /(?:任务模块|九宫格|奖品|规则说明|头图模块|活动类型)/.test(key)
    ) {
      break;
    }

    if (/^(?:人群|维度|人群策略)$/.test(key)) {
      if (current?.audience) commit();
      const audience = getConsumptionProgressAudienceFromLabel(value);
      current = {
        audience,
        title: audience?.versionTitle || "",
        props: {},
      };
      continue;
    }

    if (/^(?:版本|消耗区间)$/.test(key)) {
      const target = ensureCurrent();
      const audience = getConsumptionProgressAudienceFromLabel(value);
      if (audience) {
        if (target.audience) commit();
        current = {
          audience,
          title: audience.versionTitle || value,
          props: {},
        };
      } else {
        target.title = value;
      }
      continue;
    }

    if (/^(?:抽奖门槛|抽奖任务|第1档抽奖任务)$/.test(key)) {
      ensureCurrent().props.milestone1Text = parseConsumptionTaskMilestone(value) || value;
      continue;
    }

    const tierMatch = key.match(/^第\s*([123])\s*档(?:门槛|消耗|奖励)?$/);
    if (tierMatch) {
      const tierIndex = Number(tierMatch[1]);
      const target = ensureCurrent();
      target.props[`milestone${tierIndex + 1}Text`] = parseConsumptionMilestone(value);
      target.props[`reward${tierIndex}AmountText`] = parseConsumptionRewardAmount(value);
      continue;
    }

    const tierFieldMatch = key.match(/^第\s*([123])\s*档(.+)$/);
    if (tierFieldMatch) {
      const tierIndex = Number(tierFieldMatch[1]);
      const fieldName = tierFieldMatch[2];
      const target = ensureCurrent();
      if (/奖励|金额|券/.test(fieldName)) {
        target.props[`reward${tierIndex}AmountText`] = parseConsumptionRewardAmount(value);
      }
      if (/门槛|消耗|节点/.test(fieldName)) {
        target.props[`milestone${tierIndex + 1}Text`] = parseConsumptionMilestone(value) || value;
      }
      continue;
    }

    const lineEntry = parseConsumptionProgressLine(combined, entries.length);
    if (lineEntry) {
      if (current?.audience) {
        commit();
        current = null;
      }
      entries.push(lineEntry);
    }
  }
  if (current?.audience) commit();
  return entries;
}

function parsePrdConsumptionProgressConfig(rows = []) {
  const explicitEntries = parseExplicitConsumptionProgressConfig(rows);
  const fullText = rows
    .map((row) => `${row.key || ""}\n${row.value || ""}`)
    .join("\n");
  const marker = fullText.match(
    /消耗(?:分|返)\s*[-—–]?\s*阶梯任务进度\s*[:：]?/,
  );
  if (!marker && !explicitEntries.length) return null;

  const source = fullText
    .slice(marker?.index || 0)
    .replace(/\r\n?/g, "\n")
    .replace(/"\s*\n\s*/g, "");
  const lineEntries = source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^(?:⭐)?(?:未首消（?个人）?|素人-|入驻个人-|企业-)/.test(line))
    .map(parseConsumptionProgressLine)
    .filter(Boolean);

  const seenEntryKeys = new Set();
  const entries = [...explicitEntries, ...lineEntries].filter((entry) => {
    const key = `${entry.dimensionId}::${entry.title}`;
    if (seenEntryKeys.has(key)) return false;
    seenEntryKeys.add(key);
    return true;
  });
  if (!entries.length) return null;
  const dimensionOrder = [
    "first-spend-personal",
    "novice",
    "settled-personal",
    "enterprise",
  ];
  entries.sort((left, right) => {
    const dimensionDelta =
      dimensionOrder.indexOf(left.dimensionId) - dimensionOrder.indexOf(right.dimensionId);
    return dimensionDelta || 0;
  });
  return {
    entries,
    dimensions: dimensionOrder
      .map((id) => {
        const entry = entries.find((item) => item.dimensionId === id);
        return entry ? { id, title: entry.dimensionTitle } : null;
      })
      .filter(Boolean),
  };
}

function parsePrdTaskFrequency(value) {
  const text = String(value || "");
  const match = text.match(/每天可完成\s*([^\s，,。；;）)]*次)/);
  return match?.[1] ? `${match[1]}/天` : "";
}

function parsePrdTaskReward(value) {
  const match = String(value || "").match(/[（(]\s*([^+＋）)]*?)\s*[+＋]\s*([^)）]+?)\s*[）)]/);
  if (!match) return { rewardLabel: "抽奖", rewardCount: "+1" };
  return {
    rewardLabel: match[1].trim() || "抽奖",
    rewardCount: `+${match[2].trim().replace(/^[+＋]/, "")}`,
  };
}

function parsePrdTaskListConfig(rows = []) {
  const sourceRows = normalizePrdTableRows(rows);
  const markerIndex = sourceRows.findIndex((row) =>
    /任务(?:列表|分子)?模块/.test(`${row.key || ""}${row.value || ""}`),
  );
  if (markerIndex < 0) return null;

  const taskRows = [];
  for (let index = markerIndex + 1; index < sourceRows.length; index += 1) {
    const row = sourceRows[index];
    const key = String(row.key || "").trim();
    const value = String(row.value || "").trim();
    if (/^任务\s*\d+/.test(key)) {
      taskRows.push({ key, value });
      continue;
    }
    if (
      taskRows.length &&
      !/^任务\s*\d+/.test(key) &&
      /(?:模块|九宫格|消耗返|标题|规则|优惠券|按钮|头图)/.test(key)
    ) {
      break;
    }
  }

  const tasks = taskRows
    .map((row, index) => {
      const numberMatch = row.key.match(/^任务\s*(\d+)/);
      const rawValue = row.value || "";
      const { rewardLabel, rewardCount } = parsePrdTaskReward(rawValue);
      const frequency = parsePrdTaskFrequency(rawValue) || "1次/天";
      const title = rawValue
        .split(/\n/)[0]
        .replace(/[（(]\s*[^)）]+[)）]/g, "")
        .replace(/每天可完成.*$/, "")
        .replace(/[—-]{2,}.*$/, "")
        .trim();
      const description = rawValue
        .split("\n")
        .slice(1)
        .join("\n")
        .trim();

      if (!title) return null;
      return {
        id: `prd-task-${numberMatch?.[1] || index + 1}`,
        title,
        description,
        rewardLabel,
        rewardCount,
        frequency,
        buttonText: "去完成",
      };
    })
    .filter(Boolean);

  return tasks.length ? { tasks } : null;
}

function getPrdTaskListCount(rows = []) {
  const explicitCount = normalizePrdTableRows(rows).reduce((count, row) => {
    const parsed = parsePageTemplateVariableRowKey(row.key);
    const isTaskCountRow =
      parsed?.compoundKey === "taskCount" ||
      normalizePageTemplateLookupName(row.key) === normalizePageTemplateLookupName("任务数量");
    if (!isTaskCountRow) return count;
    const numericValue = Number(row.value);
    return Number.isFinite(numericValue) ? numericValue : count;
  }, 0);
  if (explicitCount > 0) return Math.max(1, Math.round(explicitCount));
  const parsedCount = parsePrdTaskListConfig(rows)?.tasks?.length || 0;
  const structuredCount = normalizePrdTableRows(rows).reduce((max, row) => {
    const match = String(row.key || "").match(/任务\s*(\d+)/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return Math.max(3, parsedCount, structuredCount);
}

function getTaskListFieldDefaultsFromPrd(rows = []) {
  const tasks = parsePrdTaskListConfig(rows)?.tasks || [];
  return Object.fromEntries(
    tasks.flatMap((task, index) => {
      const taskNumber = index + 1;
      return [
        [`任务${taskNumber}标题`, task.title],
        [`任务${taskNumber}奖励类型`, task.rewardLabel],
        [`任务${taskNumber}奖励数量`, task.rewardCount],
        [`任务${taskNumber}每日次数`, task.frequency],
        [`任务${taskNumber}按钮文案`, task.buttonText],
        [`任务${taskNumber}描述`, task.description],
      ];
    }),
  );
}

function isPrdPageTypeField(row) {
  const key = String(row?.key || "").replace(/\s+/g, "");
  const value = String(row?.value || "").trim();
  return (
    /^(类型|页面类型|活动类型|模板类型)$/.test(key) ||
    /^页面\d+$/.test(key) ||
    /(?:页面|活动|模板)?类型\s*[:：]/.test(String(row?.key || "")) ||
    /^(?:页面|活动|模板)?类型\s*[:：]/.test(value)
  );
}

function normalizePrdPageTypeValue(value) {
  return String(value || "")
    .split(/[\n\r,，;；]/)[0]
    .trim()
    .replace(/^["'“‘【\[]|["'”’】\]]$/g, "");
}

function getPrdPageTemplateType(rows = []) {
  const templateNames = Object.keys(PRD_PAGE_TEMPLATE_ALIASES);
  const directTemplateName = templateNames.find((templateName) =>
    rows.some((row) =>
      [row?.key, row?.value].some(
        (value) =>
          normalizePageTemplateLookupName(value) ===
          normalizePageTemplateLookupName(templateName),
      ),
    ),
  );
  if (directTemplateName) return directTemplateName;
  for (const row of rows) {
    if (isPrdPageTypeField(row) && String(row?.value || "").trim()) {
      const directValue = String(row.value).replace(
        /^(?:页面|活动|模板)?类型\s*[:：]\s*/i,
        "",
      );
      return normalizePrdPageTypeValue(directValue);
    }

    const candidates = [row?.key, row?.value, `${row?.key || ""}：${row?.value || ""}`];
    for (const candidate of candidates) {
      const match = String(candidate || "").match(
        /(?:页面|活动|模板)?类型\s*[:：]\s*([^\n\r,，;；]+)/i,
      );
      if (match?.[1]) return normalizePrdPageTypeValue(match[1]);
    }
  }
  return "";
}

function buildPrdTableBlueprint(rows = []) {
  const normalizedRows = normalizePrdTableRows(rows).filter((row) => row.key.trim() || row.value.trim());
  const pageType = getPrdPageTemplateType(normalizedRows);
  const moduleSourceRows = normalizedRows.filter((row) => !isPrdPageTypeField(row));
  const modules = moduleSourceRows.flatMap((row, index) => {
    const name = normalizePrdModuleName(row.key, index);
    const components = getPrdModuleComponents(row);
    return components.map((component, componentIndex) => {
      const moduleRows = getPrdModuleRows(row, component);
      const parsed = parsePrdModuleVariantGroups(row.value, name, component, moduleRows);
      const suffix = components.length > 1 ? ` · ${component === "LotteryGridInteractive" ? "抽奖" : component === "TaskModule" ? "任务" : "模块"}` : "";
      return {
        id: `prd-table-module-${index + 1}-${componentIndex + 1}`,
        slot: `prd-table-slot-${index + 1}-${componentIndex + 1}`,
        name: `${name}${suffix}`,
        component,
        blueprintRole: `根据 PRD 字段「${name}」生成页面模块。`,
        blueprintRule: parsed.blueprintRule || `已匹配为 ${component} 组件，并写入对应模块变量。`,
        blueprintBenefit: "用于拼接生成活动页面，并可在模块变量中继续编辑。",
        rows: parsed.rows,
        variantGroups: parsed.variantGroups,
      };
    });
  });
  const lotteryPrizeGroups = parsePrdLotteryPrizeGroups(
    moduleSourceRows
      .filter((row) =>
        /九宫格抽奖模块|【\s*(?:个人|企业)奖品\s*】/.test(
          `${row.key || ""}：${row.value || ""}`,
        ),
      )
      .map((row) => `${row.key || ""}：${row.value || ""}`)
      .join("\n"),
  );
  if (lotteryPrizeGroups.length >= 2) {
    const lotteryModule = modules.find(
      (module) =>
        module.component === "LotteryGrid" ||
        module.component === "LotteryGridInteractive",
    );
    if (lotteryModule) {
      lotteryModule.variantGroups = lotteryPrizeGroups.map((group, index) => ({
        id: index === 0 ? "base" : `lottery-${group.id}`,
        name: group.name,
        rows: applyPrdLotteryPrizesToRows(lotteryModule.rows, group.prizes),
      }));
      lotteryModule.rows = clone(lotteryModule.variantGroups[0].rows);
      lotteryModule.blueprintRule =
        "已定位页面模板中的九宫格模块，并将个人与企业奖品写入模块变量版本 1。";
    }
  }
  const consumptionProgressConfig = pageType
    ? parsePrdConsumptionProgressConfig(normalizedRows)
    : null;
  const taskListConfig = pageType
    ? parsePrdTaskListConfig(normalizedRows)
    : null;

  const titleRow = normalizedRows.find((row) => /活动名称|名称|标题/.test(row.key));
  const goalRow = normalizedRows.find((row) => /目标|目的|核心/.test(row.key));
  return {
    activityName: titleRow?.value?.trim() || "PRD 信息表生成页面",
    activityGoal: goalRow?.value?.trim() || "根据当前 PRD 文本拼接活动页面。",
    pageType,
    consumptionProgressConfig,
    taskListConfig,
    audiences: [
      {
        id: "prd-table-page",
        name: "PRD 生成页面",
        description: "按信息表字段顺序生成单页模块。",
        canvasBackground: "#ffffff",
        modules,
      },
    ],
    slots: modules.map((module, index) => ({
      id: module.slot,
      label: module.name || `模块 ${index + 1}`,
    })),
  };
}

function getPrdTableBlueprint() {
  const rows = normalizePrdTableRows(state.prdTableRows);
  const signature = getPrdTableRowsSignature(rows);
  if (!state.prdTableBlueprint || state.prdTableBlueprintSignature !== signature) {
    state.prdTableBlueprint = buildPrdTableBlueprint(rows);
    state.prdTableBlueprintSignature = signature;
  }
  return state.prdTableBlueprint;
}

function saveActivityToStorage() {
  try {
    if (!state.currentTemplateId) return;
    const data = {
      activity: state.activity,
      pages: state.pages,
      selectedDimension: state.selectedDimension,
      activePageId: state.activePageId,
    };
    localStorage.setItem(ACTIVITY_STORAGE_KEY + state.currentTemplateId, JSON.stringify(data));
  } catch (e) {
    console.warn("保存活动数据失败", e);
  }
}

function loadActivityFromStorage(templateId) {
  try {
    const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY + templateId);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (e) {
    console.warn("加载活动数据失败", e);
    return null;
  }
}

const state = {
  view: "home",
  currentTemplateId: null,
  createDraft: {
    name: "新活动",
    dimensions: ["个人用户"],
    pages: {},
  },
  createModalOpen: false,
  pageTemplateModalOpen: false,
  pageTemplateModalDimension: "",
  draftTemplateModalOpen: false,
  draftTemplateModalTarget: null,
  activePanelTab: "materials",
  activity: {
    name: "未命名活动",
    note: "活动 → 维度 → 页面 → 模块 → 变体",
  },
  activeLibrary: "materials",
  activeTab: "atom",
  activePageId: "page_1",
  selectedDimension: "默认维度",
  pages: [{ id: "page_1", name: "页面 1", dimension: "默认维度", tags: ["默认场景"], nodes: [], canvasBackground: "#ffffff", navBarEnabled: false }],
  selectedId: null,
  dropIndex: null,
  dropPageId: null,
  dropMoleculeId: null,
  dropChildIndex: null,
  draggingNodeId: null,
  pointerDrag: null,
  suppressClick: false,
  colorPanelOpen: false,
  variantPanelOpen: false,
  propsPanelOpen: false,
  richtextEditorOpen: false,
  canvasColorPanelOpen: false,
  canvasZoom: 1,
  canvasPanX: 40,
  canvasPanY: 40,
  spaceDown: false,
  canvasPanDrag: null,
  adminComponentVerifier: {
    type: "atom",
    schemaId: "账户优惠券提示",
    parentThemeId: "pink",
    variantId: "default_pink",
    blueprint: {
      amountText: "600",
      actionText: "立即使用",
    },
  },
  prdDemoStep: "upload",
  prdFileModalOpen: false,
  prdTextInput: "",
  prdTextError: "",
  prdBlueprintPasteRows: normalizePrdBlueprintPasteRows([]),
  prdBlueprintPasteVersions: normalizePrdBlueprintPasteVersions([]),
  prdBlueprintPasteTemplateName: "",
  prdBlueprintPasteError: "",
  prdTableRows: [],
  prdTableBlueprint: null,
  prdTableBlueprintSignature: "",
  selectedDemoPackageId: "",
  selectedBlueprintAudienceId: "",
  selectedBlueprintSceneId: "",
  demoSelectedNodeId: null,
  blueprintReturningFromPreview: false,
  guidedPanelMode: null,
  guidedWorkspaceMode: "split",
  guidedCanvasInitialized: false,
  guidedVisiblePageIds: [],
  guidedVisibleCompanionNodeIds: [],
  guidedStateMenuNodeId: null,
  guidedAddTargetContext: null,
  prdTemplateAddAfterIndex: null,
  prdTemplateAddModal: null,
  prdTemplateSelectedModuleIndex: null,
  pageTemplateBlueprintStates: {},
  pageTemplateChildStates: {},
  guidedLineageZoom: 1,
  guidedLineagePanX: 0,
  guidedLineagePanY: 0,
  guidedLineagePanDrag: null,
  guidedLineageVersion: "v3",
  selectedLineageVariantId: "base",
  prdManualModuleVersions: {},
  libraryReturnView: null,
};

const $ = (selector) => document.querySelector(selector);
let prdParseTimer = null;
let guidedCanvasFitToken = 0;
const uid = () => `node_${Date.now()}_${Math.random().toString(16).slice(2)}`;
const clone = (value) => JSON.parse(JSON.stringify(value));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const colorChoices = ["#1677ff", "#101828", "#1f9d62", "#e5484d", "#f59e0b", "#ffffff"];
const guidedPageThemePresets = [
  {
    id: "pink",
    name: "日常色系-粉色",
    background: "#FFDFE9",
    primary: "#FFDFE9",
    secondary: "#FFDFE9",
    variantThemeId: "pink",
    filter: "none",
  },
  {
    id: "node-womens-day",
    name: "节点色系-三八",
    background: "#FEF6E5",
    primary: "#FEF6E5",
    secondary: "#FEF6E5",
    variantThemeId: "pink",
    filter: "none",
  },
  {
    id: "sky",
    name: "日常色系-蓝色",
    background: "#CCE3FF",
    primary: "#CCE3FF",
    secondary: "#CCE3FF",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "daily-cyan",
    name: "日常色系-青色",
    background: "#D0F9FC",
    primary: "#D0F9FC",
    secondary: "#D0F9FC",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "daily-purple",
    name: "日常色系-紫色",
    background: "#E9CCFF",
    primary: "#E9CCFF",
    secondary: "#E9CCFF",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "daily-green",
    name: "日常色系-绿色",
    background: "#EFFCDE",
    primary: "#EFFCDE",
    secondary: "#EFFCDE",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "node-breath",
    name: "节点色系-气息",
    background: "#FFE8F7",
    primary: "#FFE8F7",
    secondary: "#FFE8F7",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "node-anniversary",
    name: "节点色系-周年庆",
    background: "#FFE8E8",
    primary: "#FFE8E8",
    secondary: "#FFE8E8",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "node-double-festival",
    name: "节点色系-双旦",
    background: "#E6F8FF",
    primary: "#E6F8FF",
    secondary: "#E6F8FF",
    variantThemeId: "sky",
    filter: "none",
  },
  {
    id: "apricot",
    name: "日常色系-卡其色",
    background: "#FFE3CC",
    primary: "#FFE3CC",
    secondary: "#FFE3CC",
    variantThemeId: "apricot",
    filter: "none",
  },
  {
    id: "daily-yellow",
    name: "日常色系-黄色",
    background: "#FFF6D1",
    primary: "#FFF6D1",
    secondary: "#FFF6D1",
    variantThemeId: "apricot",
    filter: "none",
  },
  {
    id: "node-new-year",
    name: "节点色系-新年",
    background: "#FFE8E9",
    primary: "#FFE8E9",
    secondary: "#FFE8E9",
    variantThemeId: "apricot",
    filter: "none",
  },
  {
    id: "node-mid-autumn",
    name: "节点色系-中秋",
    background: "#FFE8FA",
    primary: "#FFE8FA",
    secondary: "#FFE8FA",
    variantThemeId: "apricot",
    filter: "none",
  },
  {
    id: "node-double-11",
    name: "节点色系-双11",
    background: "#FFF7E8",
    primary: "#FFF7E8",
    secondary: "#FFF7E8",
    variantThemeId: "apricot",
    filter: "none",
  },
];
const canvasColorChoices = guidedPageThemePresets.map((theme) => theme.background);

function getGuidedThemePreset(themeOrId) {
  if (typeof themeOrId === "object" && themeOrId) return themeOrId;
  return guidedPageThemePresets.find((theme) => theme.id === themeOrId) || null;
}

function getGuidedVariantThemeId(themeOrId) {
  const theme = getGuidedThemePreset(themeOrId);
  return theme?.variantThemeId || theme?.id || themeOrId || "pink";
}

function getGuidedThemeCategory(theme) {
  return String(theme?.name || "").startsWith("节点色系-") ? "节点色系" : "日常色系";
}

function renderGuidedThemeButton(item, activeThemeId) {
  return `
    <button
      class="${item.id === activeThemeId ? "active" : ""}"
      data-guided-page-theme="${escapeAttr(item.id)}"
      aria-label="使用${escapeAttr(item.name)}色系"
      title="${escapeAttr(item.name)}"
    >
      <i style="background:linear-gradient(135deg, ${escapeAttr(item.primary)} 0 50%, ${escapeAttr(item.secondary)} 50% 100%)"></i>
      <span>${escapeHtml(item.name)}</span>
    </button>
  `;
}

function getThemeHeaderImageUrl(themeOrId) {
  const theme = getGuidedThemePreset(themeOrId);
  const themeName = String(theme?.name || "");
  if (!themeName) return "";
  const match = Object.entries(_themeHeaderImageModules).find(([path]) => {
    const fileName = decodeURIComponent(path.split("/").pop() || "").replace(/\.[^.]+$/, "");
    return fileName === themeName;
  });
  return match?.[1] || "";
}

function renderGuidedPageThemeHeader(page) {
  const theme = getGuidedPageTheme(page);
  const imageUrl = getThemeHeaderImageUrl(theme);
  if (!imageUrl) return "";
  return `
    <div class="guided-page-theme-header">
      <img src="${escapeAttr(imageUrl)}" alt="" />
    </div>
  `;
}

function findAtomSchema(schemaId) {
  const normalized = String(schemaId || "").replace(/\s+/g, "").toLowerCase();
  if (!normalized) return null;
  return atomSchemas.find((item) => {
    const candidates = [item.id, item.name, item.title, item.reactComponent, item.component].map((value) =>
      String(value || "").replace(/\s+/g, "").toLowerCase(),
    );
    return candidates.includes(normalized);
  });
}

const moduleKindMap = {};

const moduleKindLabels = {
  hero: "头图/动效",
  title: "标题",
  notice: "通知",
  rule: "规则说明",
  cta: "按钮",
  reward: "奖励/券包",
  task: "任务",
  data: "数据",
  play: "玩法",
  service: "服务权益",
};

const demoReplacementMap = {};

const demoPrdBlueprint = {
  activityName: "",
  sourceName: "",
  matchedPackage: "",
  confidence: 0,
  summary: "",
  audiences: [],
};

const demoCaseModuleRows = [];

const demoActivityPackage = {
  id: "audience-only",
  name: "空活动包",
  dimensionLabel: "",
  slots: [],
  audiences: [],
};

const demoTimePersonalOldPeakModules = [];

const demoTimeActivityPackage = {
  id: "audience-time",
  name: "空活动包",
  dimensionLabel: "",
  slots: [],
  audiences: [],
  phases: [],
  scenes: [],
};

function applyDemoPackageComponents() {
  return null;
}

applyDemoPackageComponents();

function activePage() {
  return state.pages.find((page) => page.id === state.activePageId) || state.pages[0];
}

function createPage() {
  const pageNumber = state.pages.length + 1;
  return {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: `页面 ${pageNumber}`,
    dimension: "自定义维度",
    tags: ["自定义场景"],
    nodes: [],
    canvasBackground: "#ffffff",
    navBarEnabled: false,
  };
}

Object.defineProperty(state, "nodes", {
  get() {
    return activePage().nodes;
  },
  set(nodes) {
    activePage().nodes = nodes;
  },
});

Object.defineProperty(state, "canvasBackground", {
  get() {
    return activePage().canvasBackground;
  },
  set(color) {
    activePage().canvasBackground = color;
  },
});

function defaultProps(schemaId, overrides = {}) {
  const schema = findAtomSchema(schemaId);
  const props = {};
  getPropEntries(schema).forEach(([key, field]) => {
    props[key] = field.default;
  });
  (schema?.style || []).forEach((field) => {
    props[field.key] = field.default;
  });
  return { ...props, ...overrides };
}

function getMoleculeDefaultProps(schema) {
  const props = {};
  getPropEntries(schema).forEach(([key, field]) => {
    props[key] = field.default ?? "";
  });
  return props;
}

function getDynamicChildCount(value, config = {}) {
  const min = Number.isFinite(Number(config.min)) ? Number(config.min) : 0;
  const max = Number.isFinite(Number(config.max))
    ? Number(config.max)
    : Number.MAX_SAFE_INTEGER;
  const numericValue = Number(value);
  const count = Number.isFinite(numericValue) ? Math.round(numericValue) : min;
  return Math.min(max, Math.max(min, count));
}

function getMoleculeChildEntries(schema, props = {}) {
  const entries = [...(schema?.children || [])];
  const config = schema?.dynamicChildren;
  if (!config?.childSchemaId || !config?.propKey) return entries;
  const count = getDynamicChildCount(props[config.propKey], config);
  for (let index = 0; index < count; index += 1) {
    entries.push([config.childSchemaId, config.overrides || {}]);
  }
  return entries;
}

function syncDynamicMoleculeChildren(node) {
  const schema = moleculeSchemas.find((item) => item.id === node?.schemaId);
  const config = schema?.dynamicChildren;
  if (!config?.childSchemaId || !config?.propKey) return;
  const staticCount = (schema.children || []).length;
  const count = getDynamicChildCount(node.props?.[config.propKey], config);
  if (node.props) node.props[config.propKey] = count;
  const staticChildren = (node.children || []).slice(0, staticCount);
  const existingDynamicChildren = (node.children || [])
    .slice(staticCount)
    .filter((child) => child.schemaId === config.childSchemaId);
  const dynamicChildren = Array.from({ length: count }, (_, index) =>
    existingDynamicChildren[index] || createAtomNode(config.childSchemaId, config.overrides || {}),
  );
  node.children = [...staticChildren, ...dynamicChildren];
}

function getPropEntries(schema) {
  if (!schema) return [];
  if (Array.isArray(schema.props)) return schema.props.map((field) => [field.key, field]);
  return Object.entries(schema.props || {});
}

function normalizeVariants(schema) {
  return (schema?.variants || []).map((variant) => ({
    ...variant,
    id: variant.id || variant.key,
    name: variant.name || variant.label,
    props: { ...(variant.props || {}) },
  }));
}

function findComponentSchema(schemaId) {
  return findAtomSchema(schemaId) || moleculeSchemas.find((item) => item.id === schemaId || item.name === schemaId);
}

function createStateNodeFromSchema(stateSchema, overrides = {}, stateConfig = {}) {
  if (stateSchema?.type === "molecule") {
    const props = {
      ...getMoleculeDefaultProps(stateSchema),
      ...(stateConfig.props || {}),
    };
    return {
      id: uid(),
      schemaId: stateSchema.id,
      name: stateSchema.name || stateSchema.id,
      type: "molecule",
      allowedChildren: stateSchema.allowedChildren || null,
      className: stateSchema.className || "",
      props,
      children: getMoleculeChildEntries(stateSchema, props).map(([schemaId, childOverrides]) =>
        createAtomNode(schemaId, childOverrides),
      ),
    };
  }
  const variants = normalizeVariants(stateSchema);
  return {
    id: uid(),
    schemaId: stateSchema.id,
    name: stateSchema.name || stateSchema.id,
    type: "atom",
    activeVariantId: variants[0]?.id || null,
    variants,
    props: defaultProps(stateSchema.id, {
      ...overrides,
      ...(stateConfig.props || {}),
    }),
  };
}

function createComponentStateEntries(schema, overrides = {}) {
  return (schema?.states || [])
    .map((stateConfig) => {
      const stateSchemaId = stateConfig.schemaId || stateConfig.component;
      const stateSchema = findComponentSchema(stateSchemaId);
      if (!stateSchema) return null;
      return {
        id: stateConfig.id || stateSchema.id,
        name: stateConfig.name || stateSchema.name || stateSchema.id,
        component: stateSchema.id,
        preserveProps: Boolean(stateConfig.preserveProps),
        lockedPropKeys: [...(stateConfig.lockedPropKeys || [])],
        node: createStateNodeFromSchema(stateSchema, overrides, stateConfig),
      };
    })
    .filter(Boolean);
}

function getAtomSchemaStateOptions(schema) {
  return (schema?.states || [])
    .map((stateConfig) => {
      const stateSchemaId = stateConfig.schemaId || stateConfig.component;
      const stateSchema = findComponentSchema(stateSchemaId);
      if (!stateSchema) return null;
      return {
        id: stateConfig.id || stateSchema.id,
        name: stateConfig.name || stateSchema.name || stateSchema.id,
        schemaId: stateSchema.id,
      };
    })
    .filter(Boolean);
}

function createAtomNode(schemaId, overrides = {}) {
  const schema = findAtomSchema(schemaId);
  const variants = normalizeVariants(schema);
  const node = {
    id: uid(),
    schemaId: schema?.id || schemaId,
    name: schema?.name || schemaId,
    type: "atom",
    activeVariantId: variants[0]?.id || null,
    variants,
    props: defaultProps(schemaId, overrides),
  };
  const guidedStates = createComponentStateEntries(schema, overrides);
  if (guidedStates.length) {
    node.guidedStates = guidedStates;
    node.activeGuidedStateId =
      guidedStates.find((entry) => entry.component === node.schemaId)?.id ||
      guidedStates[0]?.id ||
      null;
  }
  return node;
}

function createMoleculeNode(moleculeId) {
  const schema = moleculeSchemas.find((item) => item.id === moleculeId);
  if (!schema) return null;
  const props = getMoleculeDefaultProps(schema);
  const node = {
    id: uid(),
    schemaId: moleculeId,
    name: schema.name,
    type: "molecule",
    allowedChildren: schema.allowedChildren || null,
    className: schema.className || "",
    props,
    children: getMoleculeChildEntries(schema, props).map(([schemaId, overrides]) => createAtomNode(schemaId, overrides)),
  };
  const guidedStates = createComponentStateEntries(schema, props);
  if (guidedStates.length) {
    node.guidedStates = guidedStates;
    node.activeGuidedStateId =
      guidedStates.find((entry) => entry.component === node.schemaId)?.id ||
      guidedStates[0]?.id ||
      null;
  }
  return node;
}

function createPageTemplateMoleculeEntry(template, moleculeId) {
  const schema = moleculeSchemas.find((item) => item.id === moleculeId);
  if (!schema) return null;
  if (template?.isCustom) {
    const node = createMoleculeNode(moleculeId);
    if (node) {
      delete node.id;
      node.name = schema.name;
      node.isBlueprintInserted = true;
    }
    return node;
  }
  const entry = [moleculeId, {}];
  entry.isBlueprintInserted = true;
  return entry;
}

function getActivePrdPageTemplate() {
  if (state.selectedDemoPackageId !== PRD_TABLE_PACKAGE_ID) return null;
  const blueprint = getPrdTableBlueprint();
  const pageType = blueprint?.pageType || "";
  return pageType ? findLatestCustomPageTemplateByPrdType(pageType) : null;
}

function remapPrdTemplateRowsForInsertedModule(insertIndex) {
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows).map((row) => {
    const parsed = parsePageTemplateVariableRowKey(row.key);
    if (parsed && parsed.moduleIndex >= insertIndex) {
      const nextIndex = parsed.moduleIndex + 1;
      return {
        ...row,
        key: [
          PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
          String(nextIndex + 1),
          getPageBlueprintKey(nextIndex, parsed.compoundKey),
        ].join("｜"),
      };
    }
    const parsedVersion = parsePageTemplateVariableVersionRowKey(row.key);
    if (!parsedVersion || parsedVersion.moduleIndex < insertIndex) return row;
    const nextIndex = parsedVersion.moduleIndex + 1;
    return {
      ...row,
      key: [
        PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
        String(nextIndex + 1),
        parsedVersion.versionName,
        getPageBlueprintKey(nextIndex, parsedVersion.compoundKey),
      ].join("｜"),
    };
  });
  remapPageTemplateIndexedStateMap("prdManualModuleVersions", insertIndex);
  remapPageTemplateIndexedStateMap("pageTemplateBlueprintStates", insertIndex);
  remapPageTemplateIndexedStateMap("pageTemplateChildStates", insertIndex);
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
}

function remapPrdTemplateRowsForDeletedModule(deleteIndex) {
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows)
    .map((row) => {
      const parsed = parsePageTemplateVariableRowKey(row.key);
      if (parsed) {
        if (parsed.moduleIndex === deleteIndex) return null;
        if (parsed.moduleIndex > deleteIndex) {
          const nextIndex = parsed.moduleIndex - 1;
          return {
            ...row,
            key: [
              PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
              String(nextIndex + 1),
              getPageBlueprintKey(nextIndex, parsed.compoundKey),
            ].join("｜"),
          };
        }
        return row;
      }
      const parsedVersion = parsePageTemplateVariableVersionRowKey(row.key);
      if (!parsedVersion) return row;
      if (parsedVersion.moduleIndex === deleteIndex) return null;
      if (parsedVersion.moduleIndex > deleteIndex) {
        const nextIndex = parsedVersion.moduleIndex - 1;
        return {
          ...row,
          key: [
            PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
            String(nextIndex + 1),
            parsedVersion.versionName,
            getPageBlueprintKey(nextIndex, parsedVersion.compoundKey),
          ].join("｜"),
        };
      }
      return row;
    })
    .filter(Boolean);
  remapPageTemplateIndexedStateMap("prdManualModuleVersions", deleteIndex, -1);
  remapPageTemplateIndexedStateMap("pageTemplateBlueprintStates", deleteIndex, -1);
  remapPageTemplateIndexedStateMap("pageTemplateChildStates", deleteIndex, -1);
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
}

function swapPrdTemplateModuleRows(firstIndex, secondIndex) {
  const remapIndex = (moduleIndex) => {
    if (moduleIndex === firstIndex) return secondIndex;
    if (moduleIndex === secondIndex) return firstIndex;
    return moduleIndex;
  };
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows).map((row) => {
    const parsed = parsePageTemplateVariableRowKey(row.key);
    if (parsed) {
      const nextIndex = remapIndex(parsed.moduleIndex);
      if (nextIndex === parsed.moduleIndex) return row;
      return {
        ...row,
        key: [
          PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
          String(nextIndex + 1),
          getPageBlueprintKey(nextIndex, parsed.compoundKey),
        ].join("｜"),
      };
    }
    const parsedVersion = parsePageTemplateVariableVersionRowKey(row.key);
    if (!parsedVersion) return row;
    const nextIndex = remapIndex(parsedVersion.moduleIndex);
    if (nextIndex === parsedVersion.moduleIndex) return row;
    return {
      ...row,
      key: [
        PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
        String(nextIndex + 1),
        parsedVersion.versionName,
        getPageBlueprintKey(nextIndex, parsedVersion.compoundKey),
      ].join("｜"),
    };
  });
  swapPageTemplateIndexedStateMap("prdManualModuleVersions", firstIndex, secondIndex);
  swapPageTemplateIndexedStateMap("pageTemplateBlueprintStates", firstIndex, secondIndex);
  swapPageTemplateIndexedStateMap("pageTemplateChildStates", firstIndex, secondIndex);
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
}

function remapPageTemplateIndexedStateMap(stateKey, targetIndex, delta = 1) {
  const source = state[stateKey];
  if (!source || typeof source !== "object") return;
  const next = {};
  Object.entries(source).forEach(([key, value]) => {
    const parts = String(key).split("｜");
    if (parts[0] === "page-template" && Number.isFinite(Number(parts[2]))) {
      const moduleIndex = Number(parts[2]);
      if (delta < 0 && moduleIndex === targetIndex) return;
      const nextIndex = moduleIndex >= targetIndex ? moduleIndex + delta : moduleIndex;
      next[[parts[0], parts[1], String(nextIndex)].join("｜")] = value;
      return;
    }
    const pipeParts = String(key).split("|");
    if (pipeParts.length >= 2 && Number.isFinite(Number(pipeParts[1]))) {
      const moduleIndex = Number(pipeParts[1]);
      if (delta < 0 && moduleIndex === targetIndex) return;
      const nextIndex = moduleIndex >= targetIndex ? moduleIndex + delta : moduleIndex;
      next[[pipeParts[0], String(nextIndex), ...pipeParts.slice(2)].join("|")] = value;
      return;
    }
    next[key] = value;
  });
  state[stateKey] = next;
}

function swapPageTemplateIndexedStateMap(stateKey, firstIndex, secondIndex) {
  const source = state[stateKey];
  if (!source || typeof source !== "object") return;
  const swapIndex = (moduleIndex) => {
    if (moduleIndex === firstIndex) return secondIndex;
    if (moduleIndex === secondIndex) return firstIndex;
    return moduleIndex;
  };
  const next = {};
  Object.entries(source).forEach(([key, value]) => {
    const parts = String(key).split("｜");
    if (parts[0] === "page-template" && Number.isFinite(Number(parts[2]))) {
      const nextIndex = swapIndex(Number(parts[2]));
      next[[parts[0], parts[1], String(nextIndex)].join("｜")] = value;
      return;
    }
    const pipeParts = String(key).split("|");
    if (pipeParts.length >= 2 && Number.isFinite(Number(pipeParts[1]))) {
      const nextIndex = swapIndex(Number(pipeParts[1]));
      next[[pipeParts[0], String(nextIndex), ...pipeParts.slice(2)].join("|")] = value;
      return;
    }
    next[key] = value;
  });
  state[stateKey] = next;
}

function syncInsertedMoleculeToPageTemplate(page, insertIndex, moleculeId) {
  const template = page?.sourcePageTemplateId
    ? [...pageTemplates, ...customPageTemplates].find((item) => item.id === page.sourcePageTemplateId)
    : getActivePrdPageTemplate();
  if (!template?.nodes) return false;
  const entry = createPageTemplateMoleculeEntry(template, moleculeId);
  if (!entry) return false;
  const boundedIndex = Math.max(0, Math.min(insertIndex, template.nodes.length));
  remapPrdTemplateRowsForInsertedModule(boundedIndex);
  template.nodes.splice(boundedIndex, 0, entry);
  if (template.isCustom) saveCustomPageTemplatesToStorage();
  return true;
}

function insertGuidedMoleculeAt(pageId, insertIndex, moleculeId, options = {}) {
  const page = state.pages.find((item) => item.id === pageId) || activePage();
  if (!page || page.isSystemFallback) return null;
  const node = createMoleculeNode(moleculeId);
  if (!node) return null;
  const sortableNodes = (page.nodes || []).filter((item) => item.canvasPlacement !== "page-side");
  const sideNodes = (page.nodes || []).filter((item) => item.canvasPlacement === "page-side");
  const boundedIndex = Math.max(0, Math.min(insertIndex, sortableNodes.length));
  if (options.syncTemplate !== false) {
    syncInsertedMoleculeToPageTemplate(page, boundedIndex, moleculeId);
  }
  node.sourcePageTemplateId = page.sourcePageTemplateId || getActivePrdPageTemplate()?.id || "";
  node.sourcePageTemplateNodeIndex = boundedIndex;
  sortableNodes.splice(boundedIndex, 0, node);
  sortableNodes.forEach((item, index) => {
    if (item.sourcePageTemplateId === node.sourcePageTemplateId) {
      item.sourcePageTemplateNodeIndex = index;
    }
  });
  page.nodes = [...sortableNodes, ...sideNodes];
  state.activePageId = page.id;
  state.selectedId = node.id;
  state.guidedPanelMode = null;
  state.guidedStateMenuNodeId = null;
  return node;
}

function getGuidedEditablePageFallback() {
  const visibleIds = new Set(state.guidedVisiblePageIds || []);
  return (
    state.pages.find((page) => page.id === state.activePageId && !page.isSystemFallback) ||
    state.pages.find((page) => visibleIds.has(page.id) && !page.isSystemFallback) ||
    state.pages.find((page) => !page.isSystemFallback) ||
    null
  );
}

function insertMoleculeIntoPrdPageTemplate(templateId, insertIndex, moleculeId) {
  const template = [...pageTemplates, ...customPageTemplates].find((item) => item.id === templateId);
  if (!template?.nodes) return false;
  const page = { sourcePageTemplateId: template.id };
  const success = syncInsertedMoleculeToPageTemplate(page, insertIndex, moleculeId);
  if (!success) return false;
  state.prdTemplateAddAfterIndex = null;
  state.prdTemplateAddModal = null;
  state.prdTemplateSelectedModuleIndex = null;
  return true;
}

function deleteMoleculeFromPrdPageTemplate(templateId, moduleIndex) {
  const template = [...pageTemplates, ...customPageTemplates].find((item) => item.id === templateId);
  if (!template?.nodes?.length) return false;
  const boundedIndex = Number(moduleIndex);
  if (!Number.isInteger(boundedIndex) || boundedIndex < 0 || boundedIndex >= template.nodes.length) return false;
  template.nodes.splice(boundedIndex, 1);
  remapPrdTemplateRowsForDeletedModule(boundedIndex);
  if (template.isCustom) saveCustomPageTemplatesToStorage();
  state.prdTemplateSelectedModuleIndex = null;
  state.prdTemplateAddModal = null;
  state.prdTemplateAddAfterIndex = null;
  return true;
}

function moveMoleculeInPrdPageTemplate(templateId, moduleIndex, direction) {
  const template = [...pageTemplates, ...customPageTemplates].find((item) => item.id === templateId);
  if (!template?.nodes?.length) return false;
  const currentIndex = Number(moduleIndex);
  const delta = direction === "up" ? -1 : direction === "down" ? 1 : 0;
  const nextIndex = currentIndex + delta;
  if (
    !Number.isInteger(currentIndex) ||
    !delta ||
    nextIndex < 0 ||
    nextIndex >= template.nodes.length
  ) {
    return false;
  }
  const [entry] = template.nodes.splice(currentIndex, 1);
  template.nodes.splice(nextIndex, 0, entry);
  swapPrdTemplateModuleRows(currentIndex, nextIndex);
  if (template.isCustom) saveCustomPageTemplatesToStorage();
  state.prdTemplateSelectedModuleIndex = nextIndex;
  state.prdTemplateAddModal = null;
  state.prdTemplateAddAfterIndex = null;
  return true;
}

function getPageTemplateBusinessStateConfig(schemaId, templateId = "", moduleIndex = -1) {
  return (
    PAGE_TEMPLATE_MODULE_BUSINESS_STATES[
      getPageTemplateBusinessStateKey(templateId, moduleIndex)
    ] ||
    PAGE_TEMPLATE_BUSINESS_STATES[schemaId] ||
    null
  );
}

function getPageTemplateBusinessStateKey(templateId, moduleIndex) {
  return `${templateId || ""}|${moduleIndex}`;
}

function isNoIncentiveEntryModule(templateId, moduleIndex) {
  return getPageTemplateBusinessStateKey(templateId, moduleIndex) ===
    "page-guide-no-incentive|1";
}

function getPageTemplateEntryCardStateKey(templateId, moduleIndex) {
  return `${getPageTemplateBusinessStateKey(templateId, moduleIndex)}|entry-card`;
}

function getPageTemplateEntryCardStateId(templateId, moduleIndex) {
  const saved = state.pageTemplateBlueprintStates?.[
    getPageTemplateEntryCardStateKey(templateId, moduleIndex)
  ];
  return PAGE_TEMPLATE_ENTRY_CARD_STATES.some((item) => item.id === saved)
    ? saved
    : PAGE_TEMPLATE_ENTRY_CARD_STATES[0].id;
}

function getPageTemplateBusinessStateSchemaId(
  templateId,
  moduleIndex,
  stateConfig,
  activeStateId,
) {
  if (isNoIncentiveEntryModule(templateId, moduleIndex) && activeStateId === "entry") {
    const entryStateId = getPageTemplateEntryCardStateId(templateId, moduleIndex);
    return PAGE_TEMPLATE_ENTRY_CARD_STATES.find(
      (item) => item.id === entryStateId,
    )?.schemaId;
  }
  return stateConfig?.states?.find((item) => item.id === activeStateId)?.schemaId;
}

function getPageTemplateActiveBusinessStateId(templateId, moduleIndex, config) {
  const key = getPageTemplateBusinessStateKey(templateId, moduleIndex);
  const saved = state.pageTemplateBlueprintStates?.[key];
  const configuredDefault = PAGE_TEMPLATE_DEFAULT_BUSINESS_STATES[key];
  const template = [...pageTemplates, ...customPageTemplates].find(
    (item) => item.id === templateId,
  );
  const sourceNode = materializePageTemplateNodes(template)[moduleIndex];
  const preferredStateId = getPrdPageTemplateModuleSpec(
    template,
    sourceNode?.schemaId,
  )?.preferredStateId;
  return config?.states?.some((item) => item.id === saved)
    ? saved
    : config?.states?.some((item) => item.id === configuredDefault)
      ? configuredDefault
      : config?.states?.some((item) => item.id === preferredStateId)
        ? preferredStateId
        : config?.states?.[0]?.id || "default";
}

function createPageTemplateBusinessStateEntry(stateConfig) {
  const stateSchema = findComponentSchema(stateConfig.schemaId);
  if (!stateSchema) return null;
  const stateNode = createStateNodeFromSchema(stateSchema, {}, stateConfig);
  return {
    id: stateConfig.id,
    name: stateConfig.name,
    component: stateConfig.schemaId,
    node: stateNode,
  };
}

function attachPageTemplateBusinessStates(nodes = [], templateId = "") {
  nodes.forEach((node, nodeIndex) => {
    const config = getPageTemplateBusinessStateConfig(
      node.schemaId,
      templateId,
      nodeIndex,
    );
    if (!config?.states?.length) return;
    const entries = config.states
      .map((stateConfig) =>
        createPageTemplateBusinessStateEntry({
          ...stateConfig,
          schemaId:
            getPageTemplateBusinessStateSchemaId(
              templateId,
              nodeIndex,
              config,
              stateConfig.id,
            ) || stateConfig.schemaId,
        }),
      )
      .filter(Boolean);
    if (!entries.length) return;
    node.guidedStates = entries;
    node.activeGuidedStateId = getPageTemplateActiveBusinessStateId(templateId, nodeIndex, config);
  });
}

function persistPageTemplateBusinessState(node) {
  if (!node?.sourcePageTemplateId || node.sourcePageTemplateNodeIndex === undefined || !node.activeGuidedStateId) return;
  state.pageTemplateBlueprintStates = state.pageTemplateBlueprintStates || {};
  state.pageTemplateBlueprintStates[
    getPageTemplateBusinessStateKey(node.sourcePageTemplateId, node.sourcePageTemplateNodeIndex)
  ] = node.activeGuidedStateId;
}

function setPageTemplateBlueprintBusinessState(templateId, moduleIndex, stateId) {
  const key = getPageTemplateBusinessStateKey(templateId, moduleIndex);
  state.pageTemplateBlueprintStates = state.pageTemplateBlueprintStates || {};
  state.pageTemplateBlueprintStates[key] = stateId;
  state.pages.forEach((page) => {
    if (page.sourcePageTemplateId !== templateId) return;
    const node = page.nodes?.find(
      (item) => Number(item.sourcePageTemplateNodeIndex) === Number(moduleIndex),
    );
    if (node?.guidedStates?.length) applyGuidedBusinessState(node, stateId);
  });
}

function setPageTemplateEntryCardState(templateId, moduleIndex, stateId) {
  if (!PAGE_TEMPLATE_ENTRY_CARD_STATES.some((item) => item.id === stateId)) return;
  state.pageTemplateBlueprintStates = state.pageTemplateBlueprintStates || {};
  state.pageTemplateBlueprintStates[
    getPageTemplateEntryCardStateKey(templateId, moduleIndex)
  ] = stateId;
  const stateOption = PAGE_TEMPLATE_ENTRY_CARD_STATES.find(
    (item) => item.id === stateId,
  );
  state.pages.forEach((page) => {
    if (page.sourcePageTemplateId !== templateId) return;
    const node = page.nodes?.find(
      (item) => Number(item.sourcePageTemplateNodeIndex) === Number(moduleIndex),
    );
    const entryState = node?.guidedStates?.find((item) => item.id === "entry");
    const schema = findComponentSchema(stateOption?.schemaId);
    if (!entryState || !schema) return;
    entryState.component = stateOption.schemaId;
    entryState.node = createStateNodeFromSchema(schema, {}, stateOption);
    if (node.activeGuidedStateId === "entry") {
      applyGuidedBusinessState(node, "entry");
    }
  });
}

function applyStoredPageTemplateBusinessStates(nodes = [], templateId = "") {
  nodes.forEach((node, nodeIndex) => {
    if (!node?.guidedStates?.length) return;
    const activeStateId = getPageTemplateActiveBusinessStateId(
      templateId || node.sourcePageTemplateId,
      nodeIndex,
      { states: node.guidedStates },
    );
    applyGuidedBusinessState(node, activeStateId);
  });
}

function getPageTemplateChildStateKey(templateId, moduleIndex, childIndex) {
  return `${templateId || ""}|${moduleIndex}|${childIndex}`;
}

function getPageTemplateChildStateId(templateId, moduleIndex, childIndex, stateOptions = []) {
  const key = getPageTemplateChildStateKey(templateId, moduleIndex, childIndex);
  const saved = state.pageTemplateChildStates?.[key];
  return stateOptions.some((item) => item.id === saved)
    ? saved
    : stateOptions[0]?.id || null;
}

function setPageTemplateChildState(templateId, moduleIndex, childIndex, stateId) {
  state.pageTemplateChildStates = state.pageTemplateChildStates || {};
  state.pageTemplateChildStates[
    getPageTemplateChildStateKey(templateId, moduleIndex, childIndex)
  ] = stateId;
  state.pages.forEach((page) => {
    if (page.sourcePageTemplateId !== templateId) return;
    const molecule = page.nodes?.find(
      (item) => Number(item.sourcePageTemplateNodeIndex) === Number(moduleIndex),
    );
    const child = molecule?.children?.[Number(childIndex)];
    if (child?.guidedStates?.length) applyGuidedBusinessState(child, stateId);
  });
}

function applyStoredPageTemplateChildStates(nodes = [], templateId = "") {
  nodes.forEach((node, moduleIndex) => {
    (node?.children || []).forEach((child, childIndex) => {
      if (!child?.guidedStates?.length) return;
      const activeStateId = getPageTemplateChildStateId(
        templateId || node.sourcePageTemplateId,
        moduleIndex,
        childIndex,
        child.guidedStates,
      );
      if (activeStateId) applyGuidedBusinessState(child, activeStateId);
    });
  });
}

function openMoleculeTemplateEditor(moleculeId) {
  const schema = moleculeSchemas.find((item) => item.id === moleculeId);
  const node = createMoleculeNode(moleculeId);
  if (!schema || !node) return;
  node.sourceMoleculeTemplateId = moleculeId;
  const page = {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: "分子模板编辑",
    dimension: "组件模板",
    tags: ["后台管理", "分子模板"],
    nodes: [node],
    canvasBackground: "#f8fafc",
    navBarEnabled: false,
  };
  state.currentTemplateId = null;
  state.activity = {
    name: `编辑模板：${schema.name}`,
    note: "后台管理 → 分子模板修改",
  };
  state.pages = [page];
  state.activePageId = page.id;
  state.selectedDimension = page.dimension;
  state.selectedId = node.id;
  state.dropIndex = null;
  state.dropPageId = null;
  state.dropMoleculeId = null;
  state.dropChildIndex = null;
  state.activePanelTab = "materials";
  state.activeLibrary = "materials";
  state.activeTab = "atom";
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
  state.canvasZoom = 1;
  state.canvasPanX = 40;
  state.canvasPanY = 40;
  state.view = "workbench";
  render();
  requestAnimationFrame(() => fitAllPagesToView());
}

function makeNode(schemaId, type) {
  return type === "molecule" ? createMoleculeNode(schemaId) : createAtomNode(schemaId);
}

function createTemplateNode(entry) {
  const [schemaId, overrides = {}] = entry;
  const molecule = moleculeSchemas.find((item) => item.id === schemaId);
  return molecule ? createMoleculeNode(schemaId) : createAtomNode(schemaId, overrides);
}

function materializePageTemplateNodes(template) {
  if (!template?.nodes) return [];
  if (template.isCustom) {
    const normalizeNodeNames = (node) => {
      node.name = getGlobalComponentDisplayName(node.schemaId, node.name);
      (node.children || []).forEach(normalizeNodeNames);
      return node;
    };
    return clone(template.nodes).map(normalizeNodeNames);
  }
  return template.nodes.map(createTemplateNode).filter(Boolean);
}

function createTemplatePage(template, overrides = {}) {
  return {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: overrides.name || template.name,
    dimension: overrides.dimension || "页面维度",
    tags: overrides.tags || [template.audience, template.goal],
    nodes: materializePageTemplateNodes(template),
    canvasBackground: template.background || "#ffffff",
    navBarEnabled: Boolean(overrides.navBarEnabled || template.navBarEnabled),
  };
}

function createActivityPage(config, index) {
  if (config.templateId) {
    const template = templateSchemas.find((item) => item.id === config.templateId);
    if (template) return createTemplatePage(template, config);
  }
  return {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: config.name || `页面 ${index + 1}`,
    dimension: config.dimension || "自定义维度",
    tags: config.tags || ["自定义场景"],
    nodes: (config.nodes || []).map(createTemplateNode),
    canvasBackground: config.canvasBackground || "#ffffff",
    navBarEnabled: Boolean(config.navBarEnabled),
  };
}

function openActivity(activity) {
  const pages = activity.pages.map(createActivityPage);
  state.activity = {
    name: activity.name,
    note: activity.description || "活动 → 页面 → 分子 → 原子",
  };
  state.pages = pages.length ? pages : [createPage()];
  state.activePageId = state.pages[0].id;
  state.selectedDimension = state.pages[0].dimension || "未分组";
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
  state.canvasZoom = 1;
  state.canvasPanX = 40;
  state.canvasPanY = 40;
  state.view = "workbench";
  render();
  requestAnimationFrame(() => fitAllPagesToView());
}

function createActivityFromDraft() {
  const { name, dimensions, pages: draftPages } = state.createDraft;
  const pages = [];
  dimensions.forEach((dim) => {
    const dimPages = draftPages[dim] || [];
    if (dimPages.length === 0) {
      pages.push({
        id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
        name: "页面 1",
        dimension: dim,
        tags: ["默认场景"],
        nodes: [],
        canvasBackground: "#ffffff",
        navBarEnabled: false,
      });
    } else {
      dimPages.forEach((page) => {
        let nodes = [];
        let canvasBackground = "#ffffff";
        let navBarEnabled = false;
        
        if (page.templateId) {
          const template = [...pageTemplates, ...customPageTemplates].find((t) => t.id === page.templateId);
          if (template) {
            nodes = materializePageTemplateNodes(template);
            canvasBackground = template.canvasBackground || template.background || "#ffffff";
            navBarEnabled = Boolean(template.navBarEnabled);
          }
        }
        
        pages.push({
          id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          name: page.name || "页面",
          dimension: dim,
          tags: page.templateId ? ["自定义模板"] : ["默认场景"],
          nodes,
          canvasBackground,
          navBarEnabled,
        });
      });
    }
  });
  openActivity({
    name: name || "新活动",
    description: "自定义创建的活动",
    dimensions,
    pages,
  });
}

function addMaterial(schemaId, type, index = state.nodes.length) {
  const node = makeNode(schemaId, type);
  state.nodes.splice(index, 0, node);
  state.selectedId = node.id;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.dropIndex = null;
  state.dropPageId = null;
  render();
}

function addPage(dimension = state.selectedDimension || activePage().dimension || "自定义维度") {
  const page = createPage();
  page.dimension = dimension;
  state.pages.push(page);
  state.activePageId = page.id;
  state.selectedDimension = dimension;
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  render();
}

function addTemplatePage(templateId) {
  const template = templateSchemas.find((item) => item.id === templateId);
  if (!template) return;
  const page = createTemplatePage(template);
  state.pages.push(page);
  state.activePageId = page.id;
  state.selectedDimension = page.dimension || "未分组";
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
  render();
}

function addPageFromPageTemplate(templateId, dimension) {
  const template = pageTemplates.find((t) => t.id === templateId);
  if (!template) return;
  const dim = dimension || state.selectedDimension || activePage().dimension || "自定义维度";
  const page = {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: template.name,
    dimension: dim,
    tags: [template.category],
    nodes: materializePageTemplateNodes(template),
    canvasBackground: template.canvasBackground || template.background || "#ffffff",
    navBarEnabled: Boolean(template.navBarEnabled),
  };
  state.pages.push(page);
  state.activePageId = page.id;
  state.selectedDimension = dim;
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
  state.pageTemplateModalOpen = false;
  state.pageTemplateModalDimension = "";
  render();
}

function openPageTemplateModal(dimension) {
  state.pageTemplateModalOpen = true;
  state.pageTemplateModalDimension = dimension || "";
  render();
}

function closePageTemplateModal() {
  state.pageTemplateModalOpen = false;
  state.pageTemplateModalDimension = "";
  render();
}

function deletePage(pageId) {
  if (state.pages.length <= 1) return;
  const index = state.pages.findIndex((page) => page.id === pageId);
  if (index < 0) return;
  state.pages.splice(index, 1);
  if (state.activePageId === pageId) {
    const nextPage = state.pages[Math.max(0, index - 1)] || state.pages[0];
    state.activePageId = nextPage.id;
  }
  state.selectedDimension = activePage().dimension || "未分组";
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
  render();
}

function setActivePage(pageId) {
  if (state.activePageId === pageId) return;
  state.activePageId = pageId;
  state.selectedDimension = activePage().dimension || "未分组";
  state.selectedId = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
  state.canvasColorPanelOpen = false;
}

function findNode(nodes, id, parent = null) {
  for (const node of nodes) {
    if (node.id === id) return { node, parent };
    if (node.children) {
      const found = findNode(node.children, id, node);
      if (found) return found;
    }
  }
  return null;
}

function getSelectedNodeInfo() {
  const id = state.selectedId || document.querySelector(".node-wrap.selected")?.dataset.nodeId;
  return id ? findNode(state.nodes, id) : null;
}

function removeNode(id, nodes = state.nodes) {
  const index = nodes.findIndex((node) => node.id === id);
  if (index >= 0) {
    nodes.splice(index, 1);
    return true;
  }
  return nodes.some((node) => node.children && removeNode(id, node.children));
}

function moveRootNode(id, index, sourcePageId = state.activePageId, targetPageId = state.activePageId) {
  const sourcePage = state.pages.find((page) => page.id === sourcePageId) || activePage();
  const targetPage = state.pages.find((page) => page.id === targetPageId) || activePage();

  let node = null;
  let currentIndex = sourcePage.nodes.findIndex((n) => n.id === id);
  if (currentIndex >= 0) {
    [node] = sourcePage.nodes.splice(currentIndex, 1);
  } else {
    const found = findNode(sourcePage.nodes, id);
    if (found && found.parent) {
      const parentChildren = found.parent.children;
      currentIndex = parentChildren.findIndex((n) => n.id === id);
      if (currentIndex >= 0) {
        [node] = parentChildren.splice(currentIndex, 1);
      }
    }
  }
  if (!node) return;

  const nextIndex = sourcePage === targetPage && currentIndex >= 0 && currentIndex < index ? index - 1 : index;
  targetPage.nodes.splice(Math.max(0, Math.min(nextIndex, targetPage.nodes.length)), 0, node);
}

function addAtomToMolecule(schemaId, moleculeId, index) {
  const moleculeInfo = findNode(state.nodes, moleculeId);
  if (!moleculeInfo) return;
  const allowedChildren = moleculeInfo.node.allowedChildren;
  if (Array.isArray(allowedChildren) && !allowedChildren.includes(schemaId)) return;
  const node = createAtomNode(schemaId);
  moleculeInfo.node.children.splice(Math.max(0, Math.min(index, moleculeInfo.node.children.length)), 0, node);
  state.selectedId = node.id;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
}

function moveNodeToMolecule(nodeId, moleculeId, index) {
  const nodeInfo = findNode(state.nodes, nodeId);
  if (!nodeInfo) return;
  const moleculeInfo = findNode(state.nodes, moleculeId);
  if (!moleculeInfo) return;
  if (nodeId === moleculeId) return;

  const node = nodeInfo.node;
  if (node.type === "molecule") return;
  const allowedChildren = moleculeInfo.node.allowedChildren;
  if (Array.isArray(allowedChildren) && !allowedChildren.includes(node.schemaId)) return;

  const isSameParent = nodeInfo.parent && nodeInfo.parent.id === moleculeId;
  let currentIndex = -1;

  if (nodeInfo.parent) {
    const parentChildren = nodeInfo.parent.children;
    currentIndex = parentChildren.findIndex((n) => n.id === nodeId);
    if (currentIndex >= 0) parentChildren.splice(currentIndex, 1);
  } else {
    currentIndex = state.nodes.findIndex((n) => n.id === nodeId);
    if (currentIndex >= 0) state.nodes.splice(currentIndex, 1);
  }

  const targetChildren = moleculeInfo.node.children;
  let nextIndex = index;
  if (isSameParent && currentIndex >= 0 && currentIndex < index) {
    nextIndex = index - 1;
  }
  nextIndex = Math.max(0, Math.min(nextIndex, targetChildren.length));
  targetChildren.splice(nextIndex, 0, node);
  state.selectedId = nodeId;
  state.colorPanelOpen = false;
  state.variantPanelOpen = false;
}

function readableTextColor(background) {
  const hex = background.replace("#", "");
  if (hex.length !== 6) return "#ffffff";
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "#17212f" : "#ffffff";
}

async function saveMoleculeAsTemplate(moleculeId, name) {
  const moleculeInfo = findNode(state.nodes, moleculeId);
  if (!moleculeInfo) return null;
  const children = moleculeInfo.node.children || [];
  if (!children.length) return null;

  const templateId = `molecule_${Date.now()}`;
  const template = {
    id: templateId,
    name: name || "新分子",
    type: "molecule",
    description: `由 ${children.length} 个原子组成的分子组件`,
    children: children.map((child) => [child.schemaId, { ...child.props }]),
  };
  moleculeSchemas.push(template);
  await saveSingleMoleculeToServer(template);
  return template;
}

async function deleteMoleculeTemplate(moleculeId) {
  if (moleculeId === "MoleculeContainer") return false;
  const index = moleculeSchemas.findIndex((item) => item.id === moleculeId);
  if (index < 0) return false;
  moleculeSchemas.splice(index, 1);
  await deleteMoleculeOnServer(moleculeId);
  return true;
}

function showSaveMoleculeDialog(moleculeId) {
  const moleculeInfo = findNode(state.nodes, moleculeId);
  if (!moleculeInfo) return;
  const sourceTemplateId = moleculeInfo.node.sourceMoleculeTemplateId;
  const sourceTemplate = sourceTemplateId
    ? moleculeSchemas.find((item) => item.id === sourceTemplateId)
    : null;

  const existingBar = document.querySelector(".save-molecule-bar");
  if (existingBar) existingBar.remove();

  const bar = document.createElement("div");
  bar.className = "save-molecule-bar";
  bar.innerHTML = `
    <span style="font-size:13px;color:#344054;font-weight:600;">${sourceTemplate ? "修改分子模板" : "保存分子模板"}</span>
    <input type="text" placeholder="输入分子名称" value="${escapeAttr(sourceTemplate?.name || "新分子")}" data-molecule-name />
    <div style="display:flex;gap:8px;">
      <button class="save-btn" data-confirm-save-molecule>${sourceTemplate ? "覆盖保存" : "保存到物料库"}</button>
      <button data-cancel-save-molecule>取消</button>
    </div>
  `;
  document.body.appendChild(bar);

  const target = document.querySelector(`[data-node-id="${moleculeId}"]`);
  if (target) {
    const rect = target.getBoundingClientRect();
    bar.style.left = `${Math.min(window.innerWidth - 480, rect.left)}px`;
    bar.style.top = `${Math.max(10, rect.top - 60)}px`;
  } else {
    bar.style.left = "50%";
    bar.style.top = "80px";
    bar.style.transform = "translateX(-50%)";
  }

  const nameInput = bar.querySelector("[data-molecule-name]");
  nameInput.focus();
  nameInput.select();

  function buildTemplate() {
    const name = nameInput.value.trim() || "新分子";
    const children = moleculeInfo.node.children || [];
    return {
      id: sourceTemplate?.id || `molecule_${Date.now()}`,
      name,
      type: "molecule",
      description: `由 ${children.length} 个原子组成的分子组件`,
      children: children.map((child) => [child.schemaId, { ...child.props }]),
    };
  }

  bar.querySelector("[data-cancel-save-molecule]").addEventListener("click", () => {
    bar.remove();
  });

  bar.querySelector("[data-confirm-save-molecule]").addEventListener("click", () => {
    const template = buildTemplate();
    const existingIndex = sourceTemplate
      ? moleculeSchemas.findIndex((item) => item.id === sourceTemplate.id)
      : -1;
    if (existingIndex >= 0) {
      moleculeSchemas.splice(existingIndex, 1, template);
      moleculeInfo.node.name = template.name;
    } else {
      moleculeSchemas.push(template);
      moleculeInfo.node.sourceMoleculeTemplateId = template.id;
    }
    saveSingleMoleculeToServer(template);
    state.activeTab = "molecule";
    render();
    bar.remove();
  });

  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      bar.querySelector("[data-confirm-save-molecule]").click();
    } else if (e.key === "Escape") {
      bar.remove();
    }
  });
}

function getGuidedNodeOrderInfo(nodeId) {
  const page = state.pages.find((item) =>
    !item.isSystemFallback && (item.nodes || []).some((node) => node.id === nodeId),
  );
  if (!page) return null;
  const sortableNodes = (page.nodes || []).filter((node) => node.canvasPlacement !== "page-side");
  const index = sortableNodes.findIndex((node) => node.id === nodeId);
  if (index < 0) return null;
  return {
    page,
    sortableNodes,
    index,
    canMoveUp: index > 0,
    canMoveDown: index < sortableNodes.length - 1,
  };
}

function moveGuidedPageNodeByDirection(pageId, nodeId, direction) {
  const page = state.pages.find((item) => item.id === pageId);
  if (!page?.nodes?.length || page.isSystemFallback) return false;
  const sortableNodes = page.nodes.filter((node) => node.canvasPlacement !== "page-side");
  const sideNodes = page.nodes.filter((node) => node.canvasPlacement === "page-side");
  const currentIndex = sortableNodes.findIndex((node) => node.id === nodeId);
  if (currentIndex < 0) return false;
  const delta = direction === "up" ? -1 : direction === "down" ? 1 : 0;
  const nextIndex = currentIndex + delta;
  if (nextIndex < 0 || nextIndex >= sortableNodes.length) return false;
  const [node] = sortableNodes.splice(currentIndex, 1);
  sortableNodes.splice(nextIndex, 0, node);
  page.nodes = [...sortableNodes, ...sideNodes];
  state.activePageId = page.id;
  state.selectedId = node.id;
  state.guidedPanelMode = null;
  state.guidedStateMenuNodeId = null;
  syncGuidedPageTemplateOrder(page);
  return true;
}

function deleteGuidedPageNode(pageId, nodeId) {
  const page = state.pages.find((item) => item.id === pageId) || activePage();
  if (!page?.nodes?.length || page.isSystemFallback) return false;
  const target = (page.nodes || []).find((node) => node.id === nodeId);
  if (!target) return false;

  const templateId = target.sourcePageTemplateId || page.sourcePageTemplateId;
  const templateIndex = Number(target.sourcePageTemplateNodeIndex);
  const groupId = target.moduleGroupId;
  page.nodes = (page.nodes || []).filter((node) =>
    groupId ? node.moduleGroupId !== groupId : node.id !== nodeId,
  );

  if (templateId && Number.isInteger(templateIndex)) {
    deleteMoleculeFromPrdPageTemplate(templateId, templateIndex);
    page.nodes.forEach((node) => {
      if (node.sourcePageTemplateId === templateId && Number(node.sourcePageTemplateNodeIndex) > templateIndex) {
        node.sourcePageTemplateNodeIndex = Number(node.sourcePageTemplateNodeIndex) - 1;
      }
    });
  }

  state.activePageId = page.id;
  state.selectedId = null;
  state.guidedPanelMode = null;
  state.guidedStateMenuNodeId = null;
  return true;
}

function syncGuidedPageTemplateOrder(page) {
  if (!page.sourcePageTemplateId) return false;
  const template = [...pageTemplates, ...customPageTemplates].find(
    (item) => item.id === page.sourcePageTemplateId,
  );
  if (!template?.nodes?.length) return false;
  const sortableNodes = (page.nodes || []).filter((node) => node.canvasPlacement !== "page-side");
  const templateEntries = template.nodes || [];
  const usedIndexes = new Set();
  const orderedEntries = sortableNodes
    .map((node) => {
      const index = Number(node.sourcePageTemplateNodeIndex);
      if (!Number.isInteger(index) || !templateEntries[index] || usedIndexes.has(index)) return null;
      usedIndexes.add(index);
      return templateEntries[index];
    })
    .filter(Boolean);
  const remainingEntries = templateEntries.filter((_, index) => !usedIndexes.has(index));
  template.nodes = [...orderedEntries, ...remainingEntries];
  sortableNodes.forEach((node, index) => {
    node.sourcePageTemplateNodeIndex = index;
  });
  return true;
}

function applyComponentColor(node, color) {
  if (node.type === "molecule") {
    node.children.forEach((child) => applyComponentColor(child, color));
    return;
  }
  if ("backgroundColor" in node.props) node.props.backgroundColor = color;
  const textColor = readableTextColor(color);
  node.props.background = color;
  if ("textColor" in node.props) node.props.textColor = textColor;
  if ("titleColor" in node.props) node.props.titleColor = textColor;
  if ("bodyColor" in node.props) node.props.bodyColor = textColor === "#ffffff" ? "rgba(255,255,255,0.82)" : "#667085";
  if ("priceColor" in node.props) node.props.priceColor = textColor;
  if ("bgGradientStart" in node.props) node.props.bgGradientStart = color;
  if ("bgGradientEnd" in node.props) node.props.bgGradientEnd = color;
  if ("topGradientStart" in node.props) node.props.topGradientStart = color;
  if ("topGradientEnd" in node.props) node.props.topGradientEnd = color;
  if ("dividerColor" in node.props) node.props.dividerColor = color;
  if ("tagButtonColor" in node.props) node.props.tagButtonColor = color;
  if ("titleColor" in node.props) node.props.titleColor = textColor;
  if ("amountColor" in node.props) node.props.amountColor = textColor;
  if ("unitColor" in node.props) node.props.unitColor = textColor;
  if ("tagColor" in node.props) node.props.tagColor = textColor;
  for (let index = 1; index <= 3; index += 1) {
    const prefix = `coupon${index}`;
    if (`${prefix}BgGradientStart` in node.props) node.props[`${prefix}BgGradientStart`] = color;
    if (`${prefix}BgGradientEnd` in node.props) node.props[`${prefix}BgGradientEnd`] = color;
    if (`${prefix}TopGradientStart` in node.props) node.props[`${prefix}TopGradientStart`] = color;
    if (`${prefix}TopGradientEnd` in node.props) node.props[`${prefix}TopGradientEnd`] = color;
    if (`${prefix}DividerColor` in node.props) node.props[`${prefix}DividerColor`] = color;
    if (`${prefix}TagButtonColor` in node.props) node.props[`${prefix}TagButtonColor`] = color;
    if (`${prefix}TitleColor` in node.props) node.props[`${prefix}TitleColor`] = textColor;
    if (`${prefix}AmountColor` in node.props) node.props[`${prefix}AmountColor`] = textColor;
    if (`${prefix}UnitColor` in node.props) node.props[`${prefix}UnitColor`] = textColor;
    if (`${prefix}TagColor` in node.props) node.props[`${prefix}TagColor`] = textColor;
  }
}

function getComponentColor(node) {
  return node.props?.background || node.props?.topGradientEnd || node.props?.topGradientStart || node.props?.coupon1TopGradientEnd || node.props?.coupon1TopGradientStart || "#ffffff";
}

function renderMaterialList() {
  const list = $(".material-list");
  if (state.activeLibrary === "templates") {
    renderTemplateList(list);
    return;
  }

  const items =
    state.activeTab === "atom"
      ? atomSchemas.filter((item) => !item.canvasOnly)
      : moleculeSchemas;
  if (!items.length) {
    list.innerHTML = `
      <div class="empty-library">
        <strong>暂无组件</strong>
        <span>把新组件按规范放进项目后，再录入到物料库。</span>
      </div>
    `;
    return;
  }
  list.innerHTML = items
    .map(
      (item) => {
        const preview = item.type === "molecule" ? renderMoleculePreview(item) : renderAtomPreview(item.id);
        const badge =
          state.activeTab === "atom" && ATOM_MODULE_BADGE_IDS.has(item.id)
            ? '<span class="material-badge">模块级</span>'
            : "";
        const realClass = "";
        const builtInMoleculeIds = ["MoleculeContainer", "TaskListModule", ...BUILT_IN_MOLECULE_IDS];
        const isDeletableMolecule = item.type === "molecule" && !builtInMoleculeIds.includes(item.id);
        const deleteBtn = isDeletableMolecule
          ? `<button class="material-delete-btn" data-delete-molecule="${item.id}" title="删除">×</button>`
          : "";
        return `
        <div class="material-card-wrapper">
          <button class="material-card${realClass}" data-material-id="${item.id}" data-type="${item.type}">
            <div class="material-preview">${preview}</div>
            <div class="material-meta">
              <strong>${item.name}${badge}</strong>
            </div>
          </button>
          ${deleteBtn}
        </div>
      `;
      },
    )
    .join("");
}

function renderTemplateList(list) {
  const allTemplates = [...templateSchemas, ...customPageTemplates];
  
  if (!allTemplates.length) {
    list.innerHTML = `
      <div class="empty-library">
        <strong>暂无模板</strong>
        <span>在画布中选择页面，点击保存按钮可保存为自定义模板。</span>
      </div>
    `;
    return;
  }
  
  const builtInTemplates = allTemplates.filter(t => !t.isCustom);
  const customTemplates = allTemplates.filter(t => t.isCustom);
  
  let html = "";
  
  if (builtInTemplates.length > 0) {
    html += `
      <div class="template-section">
        <div class="template-section-title">内置模板</div>
        <div class="template-grid">
          ${builtInTemplates
            .map(
              (template) => `
                <button class="template-card" data-template-id="${template.id}">
                  <div class="template-preview" style="background:${template.background}">
                    ${template.nodes.map((entry) => renderTemplatePreviewNode(entry)).join("")}
                  </div>
                  <div class="material-meta">
                    <strong>${escapeHtml(template.name)}</strong>
                    <span>${escapeHtml(template.audience || "")} · ${escapeHtml(template.goal || "")}</span>
                  </div>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }
  
  if (customTemplates.length > 0) {
    html += `
      <div class="template-section">
        <div class="template-section-title">
          自定义模板
          <span class="template-count">${customTemplates.length}</span>
        </div>
        <div class="template-grid">
          ${customTemplates
            .map(
              (template) => `
                <div class="template-card-wrapper">
                  <button class="template-card custom-template" data-custom-template-id="${template.id}">
                    <div class="template-preview" style="background:${template.canvasBackground || "#ffffff"}">
                      ${renderCustomTemplatePreview(template)}
                    </div>
                    <div class="material-meta">
                      <strong>${escapeHtml(template.name)}</strong>
                      <span>${template.nodes.length} 个组件</span>
                    </div>
                  </button>
                  <button class="template-delete" data-delete-custom-template="${template.id}" title="删除模板">×</button>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }
  
  list.innerHTML = html;
}

function renderCustomTemplatePreview(template) {
  if (!template.nodes || template.nodes.length === 0) {
    return `<div class="template-empty-preview">空白页面</div>`;
  }
  return template.nodes.map((node) => {
    if (node.type === "atom") {
      return renderAtomPreview(node.schemaId, node.props);
    } else if (node.type === "molecule") {
      const molecule = moleculeSchemas.find((m) => m.id === node.schemaId);
      return molecule ? renderMoleculePreview(molecule) : "";
    }
    return "";
  }).join("");
}

function renderTemplatePreviewNode(entry) {
  const [schemaId, overrides = {}] = entry;
  const molecule = moleculeSchemas.find((item) => item.id === schemaId);
  return molecule ? renderMoleculePreview(molecule) : renderAtomPreview(schemaId, overrides);
}

function renderActivityCenter() {
  const center = $(".activity-center");
  if (!center) return;

  center.innerHTML = `
    <div class="prd-flow-shell is-home">
      <nav class="prd-minimal-nav">
        <button class="prd-brand" data-back-home aria-label="返回首页">
          <span>+</span>
          <strong>DOU+ 活动生成器</strong>
        </button>
        <div class="prd-progress">
          <span class="active">01 上传</span>
          <i></i>
          <span>02 确认</span>
          <i></i>
          <span>03 预览</span>
        </div>
        <button type="button" class="prd-admin-link" data-open-admin-dashboard>后台管理</button>
      </nav>
      <section class="prd-home">
        <header class="prd-home-hero">
          <span>AI ACTIVITY BUILDER</span>
          <h1>从 PRD 开始<br />生成完整活动</h1>
          <p>自动识别页面、人群和业务内容，生成可直接确认的活动蓝图。</p>
        </header>
        <div class="prd-home-side">
          <div class="prd-upload-tool">
            <div class="prd-tool-head">
              <span>新建活动</span>
              <i>01</i>
            </div>
            <button class="prd-upload-target" data-demo-open-file-modal>
              <span class="prd-upload-target-icon">↑</span>
              <strong>上传活动 PRD</strong>
              <em>粘贴蓝图表格、文本或文档链接</em>
            </button>
            <div class="prd-tool-footer">
              <span>DOCX</span>
              <span>PDF</span>
              <span>表格粘贴</span>
              <b>最大 20MB</b>
            </div>
          </div>
        </div>
        ${
          state.prdFileModalOpen
            ? renderPrdFileModal()
            : ""
        }
      </section>
      ${state.createModalOpen ? renderCreateModal() : ""}
    </div>
  `;
}

function renderAdminDashboard() {
  const center = $(".activity-center");
  if (!center) return;

  center.innerHTML = `
    <section class="admin-shell">
      <nav class="admin-nav">
        <button class="admin-back" data-back-home>← 返回主流程</button>
        <span>设计师后台</span>
      </nav>

      <header class="admin-hero">
        <span>DESIGN OPS</span>
        <h1>组件模板管理</h1>
        <p>进入画布组合原子/分子，搭建活动页面。</p>
      </header>

      <section class="admin-action-grid">
        <button class="admin-action-card primary" data-open-create-modal>
          <span>01</span>
          <strong>进入后台画布</strong>
          <em>进入画布组合原子/分子，搭建活动页面</em>
        </button>
        <button class="admin-action-card" data-open-admin-component-verifier>
          <span>02</span>
          <strong>组件验收面板</strong>
          <em>快速验证蓝图同步、文字变量、父级色系联动和导出切图</em>
        </button>
      </section>
      ${state.createModalOpen ? renderCreateModal() : ""}
    </section>
  `;
}

function getSchemaDefaultValues(schema) {
  const props = {};
  getPropEntries(schema).forEach(([key, field]) => {
    props[key] = field.default ?? "";
  });
  return props;
}

function isPrizePropField(field) {
  return field?.type === "prize" || field?.control === "prize-library";
}

function isTextareaPropField(field) {
  return field?.type === "text" || field?.control === "textarea";
}

function serializePrizeOption(prize) {
  const normalized = normalizePrizeCopyMeta(prize);
  return JSON.stringify({
    name: normalized.name,
    image: normalized.image,
    copy: normalized.copy,
    copyThreshold: normalized.copyThreshold,
    copyAmount: normalized.copyAmount,
  });
}

function getTrafficCouponAmountFromText(value) {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)\s*元\s*流量券/);
  return match?.[1] || "";
}

function getTrafficCouponCopyParts(value) {
  const source = String(value || "").replace(/,/g, "");
  const match = source.match(/(?:送)?满\s*(00|\d+(?:\.\d+)?)\s*元?\s*(?:赠|送)\s*(?:价值)?\s*(\d+(?:\.\d+)?)\s*元?(?:\s*流量)?/);
  return match
    ? { threshold: match[1], amount: match[2] }
    : { threshold: "", amount: "" };
}

function renderTrafficCouponCopy(amount, threshold) {
  return amount
    ? `满${threshold || getDefaultTrafficCouponThreshold(amount)}元赠价值${amount}元流量`
    : "";
}

function isNoPrizeCopyName(name) {
  const normalized = normalizePrizeLookupText(name);
  return normalized === "1314心动券包" ||
    normalized === "1314元心动券包" ||
    normalized === "剪映vip" ||
    normalized === "剪映vip月卡" ||
    normalized === "内容诊断积分" ||
    normalized === "积分" ||
    normalized === "dou仔周边" ||
    normalized === "dou仔玩偶" ||
    normalized === "dou仔挂件" ||
    normalized === "dou仔周边帆布包";
}

function normalizePrizeCopyMeta(prize = {}, sourceText = "") {
  const name = prize.name || prize.title || prize.label || "";
  const copy = prize.copy || prize.text || prize.description || "";
  const copyParts = getTrafficCouponCopyParts([sourceText, copy, name].filter(Boolean).join(" "));
  const nameAmount = getTrafficCouponAmountFromText(name);
  const copyAmount =
    nameAmount ||
    prize.copyAmount ||
    copyParts.amount ||
    getTrafficCouponAmountFromText(sourceText);
  const copyThreshold =
    copyParts.threshold ||
    prize.copyThreshold ||
    (copyAmount ? getDefaultTrafficCouponThreshold(copyAmount) : "");
  const renderedCopy = copyAmount
    ? renderTrafficCouponCopy(copyAmount, copyThreshold)
    : copy || (isNoPrizeCopyName(name) ? "" : "满30元赠价值5元流量");
  return {
    ...prize,
    name,
    image: prize.image || prize.imageUrl || prize.url || prize.src || "",
    copy: renderedCopy,
    copyThreshold,
    copyAmount,
  };
}

function serializePrizeValueWithName(value, name) {
  const parsed = parsePrizeValue(value);
  const trimmedName = String(name ?? "").trim();
  if (!parsed) return "";
  const normalized = normalizePrizeCopyMeta({
    ...parsed,
    name: trimmedName || parsed.name || "",
  });
  return JSON.stringify({
    name: normalized.name,
    image: normalized.image,
    copy: normalized.copy,
    copyThreshold: normalized.copyThreshold,
    copyAmount: normalized.copyAmount,
  });
}

function serializePrizeValueWithCopy(value, copy) {
  const parsed = parsePrizeValue(value);
  const trimmedCopy = String(copy ?? "").trim();
  if (!parsed) return "";
  const normalized = normalizePrizeCopyMeta({
    ...parsed,
    copy: trimmedCopy || parsed.copy || "",
  }, trimmedCopy);
  return JSON.stringify({
    name: normalized.name,
    image: normalized.image,
    copy: normalized.copy,
    copyThreshold: normalized.copyThreshold,
    copyAmount: normalized.copyAmount,
  });
}

function parsePrizeValue(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return normalizePrizeCopyMeta({
        name: parsed.name || parsed.title || parsed.label || "",
        image: parsed.image || parsed.imageUrl || parsed.url || parsed.src || "",
        copy: parsed.copy || parsed.text || parsed.description || "",
        copyThreshold: parsed.copyThreshold || parsed.threshold || "",
        copyAmount: parsed.copyAmount || parsed.amount || "",
      }, raw);
    }
  } catch {
    return normalizePrizeCopyMeta({ name: raw, image: "", copy: "" }, raw);
  }
  return normalizePrizeCopyMeta({ name: raw, image: "", copy: "" }, raw);
}

function normalizePrizeLookupText(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[＋+]/g, "+")
    .toLowerCase();
}

function findPrizeLibraryItemByText(value) {
  const parsed = parsePrizeValue(value);
  const normalized = normalizePrizeLookupText(parsed?.name || value);
  if (!normalized) return null;
  const aliases = {
    券包: "coupon_pack",
    心动券包: "coupon_pack",
    "1314元心动券包": "coupon_pack",
    积分: "points",
    内容诊断积分: "points",
    剪映vip: "jianying_vip",
    剪映vip月卡: "jianying_vip",
    dou流量券: "traffic_coupon_6",
    "dou+流量券": "traffic_coupon_6",
    dou官方推荐机会: "official_recommendation",
    "dou+官方推荐机会": "official_recommendation",
    dou仔周边: "douzi_merch",
    dou仔全家福: "douzi_family_pack",
    dou仔全家福随机发: "douzi_family_pack",
    dou仔周边全家福: "douzi_family_pack",
    dou仔周边帆布包: "douzi_canvas_bag",
  };
  const aliasId = aliases[normalized];
  if (aliasId) return mockPrizeLibrary.find((item) => item.id === aliasId) || null;
  const exactNameMatchedItem = mockPrizeLibrary.find((item) =>
    normalizePrizeLookupText(item.name) === normalized
  );
  if (exactNameMatchedItem) return exactNameMatchedItem;
  const nameMatchedItem = [...mockPrizeLibrary]
    .sort((left, right) =>
      normalizePrizeLookupText(right.name).length - normalizePrizeLookupText(left.name).length
    )
    .find((item) => {
    const prizeName = normalizePrizeLookupText(item.name);
    return normalized.includes(prizeName) || prizeName.includes(normalized);
  });
  if (nameMatchedItem) return nameMatchedItem;
  const copyParts = getTrafficCouponCopyParts(value);
  return copyParts.amount
    ? mockPrizeLibrary.find((item) => String(item.copyAmount || "") === String(copyParts.amount)) || null
    : null;
}

function normalizePrizeLibraryValue(value) {
  const item = findPrizeLibraryItemByText(value);
  return item ? serializePrizeOption(normalizePrizeCopyMeta(item, value)) : "";
}

function isPageTemplatePrizeField(field) {
  return /^(\d+)\.prize\d+$/.test(getPageTemplateFieldLocalCompoundKey(field));
}

function renderPrizeLibrarySelect(value, dataAttr, ariaLabel, nameDataAttr = "", copyDataAttr = "") {
  const rawValue = String(value ?? "");
  const optionValues = new Set(mockPrizeLibrary.map((item) => serializePrizeOption(item)));
  const customPrize = rawValue && !optionValues.has(rawValue) ? parsePrizeValue(rawValue) : null;
  const selectedPrize = rawValue ? parsePrizeValue(rawValue) : null;
  return `
    <div class="prize-library-control">
      <span class="prize-library-thumb">
        ${selectedPrize?.image
          ? `<img src="${escapeAttr(selectedPrize.image)}" alt="" />`
          : "<i></i>"}
      </span>
      <select class="prize-library-select" ${dataAttr} aria-label="${escapeAttr(ariaLabel)}">
        <option value="" ${rawValue ? "" : "selected"}>占位奖品</option>
        ${mockPrizeLibrary.map((item) => {
          const optionValue = serializePrizeOption(item);
          return `
            <option value="${escapeAttr(optionValue)}" ${rawValue === optionValue ? "selected" : ""}>
              ${escapeHtml(item.name)}
            </option>
          `;
        }).join("")}
        ${customPrize ? `
          <option value="${escapeAttr(rawValue)}" selected>
            ${escapeHtml(customPrize.name || "已选奖品")}
          </option>
        ` : ""}
      </select>
      ${selectedPrize ? `
        <input
          class="prize-library-name-input"
          type="text"
          ${nameDataAttr}
          value="${escapeAttr(selectedPrize.name || "")}"
          aria-label="${escapeAttr(`${ariaLabel}名称`)}"
        />
        <input
          class="prize-library-copy-input"
          type="text"
          ${copyDataAttr}
          value="${escapeAttr(selectedPrize.copy || "满30元赠价值5元流量")}"
          aria-label="${escapeAttr(`${ariaLabel}文案`)}"
        />
      ` : ""}
    </div>
  `;
}

function renderFixedPrizeLibrarySelect(value, dataAttr, ariaLabel) {
  const selectedValue = normalizePrizeLibraryValue(value);
  const optionValues = new Set(mockPrizeLibrary.map((item) => serializePrizeOption(item)));
  const customPrize = selectedValue && !optionValues.has(selectedValue) ? parsePrizeValue(selectedValue) : null;
  const selectedPrize = selectedValue ? parsePrizeValue(selectedValue) : null;
  return `
    <div class="prize-library-control is-fixed">
      <span class="prize-library-thumb">
        ${selectedPrize?.image
          ? `<img src="${escapeAttr(selectedPrize.image)}" alt="" />`
          : "<i></i>"}
      </span>
      <select class="prize-library-select" ${dataAttr} aria-label="${escapeAttr(ariaLabel)}">
        <option value="" ${selectedValue ? "" : "selected"}>选择奖品</option>
        ${mockPrizeLibrary.map((item) => {
          const optionValue = serializePrizeOption(item);
          return `
            <option value="${escapeAttr(optionValue)}" ${selectedValue === optionValue ? "selected" : ""}>
              ${escapeHtml(item.name)}
            </option>
          `;
        }).join("")}
        ${customPrize ? `
          <option value="${escapeAttr(selectedValue)}" selected>
            ${escapeHtml(customPrize.name || "已选奖品")}
          </option>
        ` : ""}
      </select>
    </div>
  `;
}

function syncPrizeLibraryControl(select) {
  const control = select?.closest(".prize-library-control");
  const thumb = control?.querySelector(".prize-library-thumb");
  if (!thumb) return;
  const selectedPrize = parsePrizeValue(select.value);
  thumb.innerHTML = selectedPrize?.image
    ? `<img src="${escapeAttr(selectedPrize.image)}" alt="" />`
    : "<i></i>";
  let input = control.querySelector(".prize-library-name-input");
  let copyInput = control.querySelector(".prize-library-copy-input");
  if (!input && selectedPrize) {
    const childIndexAttr = select.dataset.nodePropChildIndex !== undefined
      ? ` data-node-prop-child-index="${escapeAttr(select.dataset.nodePropChildIndex)}"`
      : "";
    const nameAttr = select.dataset.adminPrizeProp
      ? `data-admin-prize-name-prop="${escapeAttr(select.dataset.adminPrizeProp)}"`
      : select.dataset.adminMoleculeBlueprintProp
        ? `data-admin-molecule-prize-name-prop="${escapeAttr(select.dataset.adminMoleculeBlueprintProp)}"`
      : select.dataset.adminPageBlueprintProp
        ? `data-admin-page-prize-name-prop="${escapeAttr(select.dataset.adminPageBlueprintProp)}"`
      : select.dataset.blueprintPrizeValue
        ? `data-blueprint-prize-name-value="${escapeAttr(select.dataset.blueprintPrizeValue)}"`
        : select.dataset.nodePropInput
          ? `data-node-prize-name-input="${escapeAttr(select.dataset.nodePropInput)}"${childIndexAttr}`
          : "";
    const copyAttr = select.dataset.adminPrizeProp
      ? `data-admin-prize-copy-prop="${escapeAttr(select.dataset.adminPrizeProp)}"`
      : select.dataset.adminMoleculeBlueprintProp
        ? `data-admin-molecule-prize-copy-prop="${escapeAttr(select.dataset.adminMoleculeBlueprintProp)}"`
      : select.dataset.adminPageBlueprintProp
        ? `data-admin-page-prize-copy-prop="${escapeAttr(select.dataset.adminPageBlueprintProp)}"`
      : select.dataset.blueprintPrizeValue
        ? `data-blueprint-prize-copy-value="${escapeAttr(select.dataset.blueprintPrizeValue)}"`
        : select.dataset.nodePropInput
          ? `data-node-prize-copy-input="${escapeAttr(select.dataset.nodePropInput)}"${childIndexAttr}`
          : "";
    if (nameAttr) {
      select.insertAdjacentHTML(
        "afterend",
        `<input class="prize-library-name-input" type="text" ${nameAttr} aria-label="奖品名称" />`,
      );
      input = control.querySelector(".prize-library-name-input");
    }
    if (copyAttr) {
      const anchor = input || select;
      anchor.insertAdjacentHTML(
        "afterend",
        `<input class="prize-library-copy-input" type="text" ${copyAttr} aria-label="奖品文案" />`,
      );
      copyInput = control.querySelector(".prize-library-copy-input");
    }
  }
  if (input && selectedPrize) input.value = selectedPrize.name || "";
  if (input && !selectedPrize) input.remove();
  if (copyInput && selectedPrize) copyInput.value = selectedPrize.copy || "满30元赠价值5元流量";
  if (copyInput && !selectedPrize) copyInput.remove();
}

function getBlueprintRowField(module, row) {
  const schema = findAtomSchema(module?.component);
  if (!schema || !row?.propKey) return null;
  const entry = getPropEntries(schema).find(([key]) => key === row.propKey);
  return entry?.[1] || null;
}

function getAdminVerifierSchema() {
  return findAtomSchema(state.adminComponentVerifier?.schemaId) || atomSchemas[0] || null;
}

function getAdminVerifierType() {
  const verifier = state.adminComponentVerifier || {};
  if (verifier.type === "page") return "page";
  if (verifier.type === "molecule") return "molecule";
  if (pageTemplates.some((item) => item.id === verifier.schemaId)) return "page";
  if (moleculeSchemas.some((item) => item.id === verifier.schemaId)) return "molecule";
  return "atom";
}

function getAdminVerifierMolecule() {
  const selected = moleculeSchemas.find((item) => item.id === state.adminComponentVerifier?.schemaId);
  return selected || moleculeSchemas.find((item) => item.id !== "MoleculeContainer") || null;
}

function getAdminVerifierPageTemplate() {
  const templates = [...pageTemplates, ...customPageTemplates].filter((item) => item.id !== "blank-page");
  const selected = templates.find((item) => item.id === state.adminComponentVerifier?.schemaId);
  return selected || templates[0] || pageTemplates[0] || null;
}

function ensureAdminVerifierState(schema) {
  const verifier = state.adminComponentVerifier || {};
  const schemaId = schema?.id || atomSchemas[0]?.id || "账户优惠券提示";
  const sameSchema = verifier.schemaId === schemaId;
  const textProps = Array.isArray(schema?.blueprint?.textProps)
    ? schema.blueprint.textProps
    : getPropEntries(schema)
        .filter(([key, field]) => isCopyPropField(key, field, field.default))
        .map(([key]) => key);
  const blueprint = sameSchema ? { ...(verifier.blueprint || {}) } : {};
  const defaults = getSchemaDefaultValues(schema);
  textProps.forEach((key) => {
    if (blueprint[key] === undefined) blueprint[key] = defaults[key] ?? "";
  });
  const variants = normalizeVariants(schema);
  const fallbackVariantId = variants[0]?.id || null;
  const variantId = sameSchema && variants.some((variant) => variant.id === verifier.variantId)
    ? verifier.variantId
    : fallbackVariantId;
  state.adminComponentVerifier = {
    type: "atom",
    schemaId,
    parentThemeId: sameSchema ? verifier.parentThemeId || getVariantThemeId(schema, variantId) : getVariantThemeId(schema, variantId),
    variantId,
    blueprint,
  };
  return state.adminComponentVerifier;
}

function getAdminVerifierVariant(schema, verifier) {
  const variants = normalizeVariants(schema);
  return variants.find((item) => item.id === verifier.variantId) || variants[0] || null;
}

function getAtomThemeOptions(schema) {
  if (!schema) return [];
  const themeIds = new Set();
  normalizeVariants(schema).forEach((variant) => {
    if (getThemeLinkedVariantProps(schema, variant).length) {
      themeIds.add(getVariantThemeId(schema, variant.id));
    }
  });
  return guidedPageThemePresets.filter((theme) => themeIds.has(getGuidedVariantThemeId(theme)));
}

function getAdminVerifierProps(schema, verifier) {
  const variant = getAdminVerifierVariant(schema, verifier);
  const variantThemeId = getGuidedVariantThemeId(
    verifier?.parentThemeId || (variant ? getVariantThemeId(schema, variant.id) : undefined)
  );
  const themeVariant = getSchemaThemeVariant(schema, variantThemeId);
  const themeProps = Object.fromEntries(getThemeLinkedVariantProps(schema, themeVariant));
  return {
    ...getSchemaDefaultValues(schema),
    ...(variant?.props || {}),
    ...themeProps,
    ...(verifier.blueprint || {}),
  };
}

function getMoleculeBlueprintKey(childIndex, propKey) {
  return `${childIndex}.${propKey}`;
}

function getPageBlueprintKey(nodeIndex, localKey) {
  return `${nodeIndex}|${localKey}`;
}

function buildLocalVerifierBlueprintForNode(node, nodeIndex, verifier) {
  const blueprint = {};
  if (node?.type === "molecule") {
    Object.entries(node.props || {}).forEach(([key, value]) => {
      blueprint[key] = value;
    });
    (node.children || []).forEach((child, childIndex) => {
      Object.entries(child.props || {}).forEach(([key, value]) => {
        blueprint[getMoleculeBlueprintKey(childIndex, key)] = value;
      });
    });
  }
  const prefix = `${nodeIndex}|`;
  Object.entries(verifier?.blueprint || {}).forEach(([key, value]) => {
    if (key.startsWith(prefix)) blueprint[key.slice(prefix.length)] = value;
  });
  return blueprint;
}

function getMoleculeVerifierFields(molecule, verifier) {
  const moleculeFields = getPropEntries(molecule).map(([key, field]) => ({
    scope: "molecule",
    key,
    compoundKey: key,
    field,
    childName: molecule?.name || "分子",
    value: verifier?.blueprint?.[key] ?? field.default ?? "",
  }));
  const moleculeProps = getMoleculeDefaultProps(molecule);
  moleculeFields.forEach(({ key, value }) => {
    moleculeProps[key] = value;
  });
  const childFields = getMoleculeChildEntries(molecule, moleculeProps).flatMap(([schemaId, overrides = {}], childIndex) => {
    const schema = findAtomSchema(schemaId);
    const blueprintTextProps = new Set(
      Array.isArray(schema?.blueprint?.textProps) ? schema.blueprint.textProps : [],
    );
    const childName = schema?.name || schemaId;
    return getPropEntries(schema)
      .filter(([key, field]) => {
        const value = overrides[key] ?? field.default;
        return blueprintTextProps.has(key) ||
          isPrizePropField(field) ||
          isCopyPropField(key, field, value);
      })
      .map(([key, field]) => ({
        childIndex,
        key,
        field,
        childName,
        value: verifier?.blueprint?.[getMoleculeBlueprintKey(childIndex, key)] ?? overrides[key] ?? field.default ?? "",
      }));
  });
  return [...moleculeFields, ...childFields];
}

function getPageTemplateVerifierFields(template, verifier) {
  return materializePageTemplateNodes(template).flatMap((node, nodeIndex) => {
    const stateConfig = getPageTemplateBusinessStateConfig(
      node?.schemaId,
      template?.id,
      nodeIndex,
    );
    const moduleSpec = getPrdPageTemplateModuleSpec(template, node?.schemaId);
    const storedStateId = state.pageTemplateBlueprintStates?.[
      getPageTemplateBusinessStateKey(template?.id, nodeIndex)
    ];
    const preferredStateId = moduleSpec?.preferredStateId;
    const activeStateId = stateConfig?.states?.some((item) => item.id === storedStateId)
      ? storedStateId
      : stateConfig?.states?.some((item) => item.id === preferredStateId)
        ? preferredStateId
        : getPageTemplateActiveBusinessStateId(
            template?.id,
            nodeIndex,
            stateConfig,
          );
    const activeSchemaId =
      getPageTemplateBusinessStateSchemaId(
        template?.id,
        nodeIndex,
        stateConfig,
        activeStateId,
      ) || node.schemaId;
    const moduleName =
      getGlobalComponentDisplayName(
        activeSchemaId,
        stateConfig?.label || node.name || `模块 ${nodeIndex + 1}`,
      );
    const activeMolecule = moleculeSchemas.find(
      (item) => item.id === activeSchemaId,
    );
    if (activeMolecule) {
      const localBlueprint = buildLocalVerifierBlueprintForNode(node, nodeIndex, verifier);
      return getMoleculeVerifierFields(activeMolecule, { blueprint: localBlueprint }).map((field) => {
        const localKey = field.compoundKey || getMoleculeBlueprintKey(field.childIndex, field.key);
        const compoundKey = getPageBlueprintKey(nodeIndex, localKey);
        return {
          ...field,
          moduleIndex: nodeIndex,
          moduleName,
          moduleSchemaId: activeSchemaId,
          sourceModuleSchemaId: node.schemaId,
          compoundKey,
          value: verifier?.blueprint?.[compoundKey] ?? field.value,
        };
      });
    }

    const schema = findAtomSchema(activeSchemaId);
    const blueprintTextProps = new Set(
      Array.isArray(schema?.blueprint?.textProps) ? schema.blueprint.textProps : [],
    );
    return getPropEntries(schema)
      .filter(([key, field]) => {
        const value = node.props?.[key] ?? field.default;
        return blueprintTextProps.has(key) ||
          isPrizePropField(field) ||
          isCopyPropField(key, field, value);
      })
      .map(([key, field]) => {
        const compoundKey = getPageBlueprintKey(nodeIndex, key);
        return {
          scope: "atom",
          moduleIndex: nodeIndex,
          moduleName,
          moduleSchemaId: activeSchemaId,
          sourceModuleSchemaId: node.schemaId,
          childName: moduleName,
          key,
          compoundKey,
          field,
          value: verifier?.blueprint?.[compoundKey] ?? node.props?.[key] ?? field.default ?? "",
        };
      });
  });
}

function getSchemaThemeVariant(schema, themeId) {
  const exactVariant = normalizeVariants(schema).find((variant) => getVariantThemeId(schema, variant.id) === themeId);
  if (exactVariant) return exactVariant;
  const variantThemeId = getGuidedVariantThemeId(themeId);
  return normalizeVariants(schema).find((variant) => getVariantThemeId(schema, variant.id) === variantThemeId) || null;
}

function getThemeLinkedVariantProps(schema, variant) {
  const fields = new Map(getPropEntries(schema));
  return Object.entries(variant?.props || {}).filter(([key, value]) => {
    const field = fields.get(key);
    if (isPrizePropField(field)) return false;
    return !isCopyPropField(key, field || { type: typeof value }, value);
  });
}

function getMoleculePropsForVerifier(molecule, verifier) {
  const props = getMoleculeDefaultProps(molecule);
  Object.keys(props).forEach((key) => {
    if (verifier?.blueprint?.[key] !== undefined) props[key] = verifier.blueprint[key];
  });
  return props;
}

function getMoleculeChildEntriesForVerifier(molecule, verifier) {
  return getMoleculeChildEntries(molecule, getMoleculePropsForVerifier(molecule, verifier));
}

function getMoleculeChildStateControls(molecule, verifier = {}) {
  let statefulIndex = 0;
  return getMoleculeChildEntriesForVerifier(molecule, verifier)
    .map(([schemaId], childIndex) => {
      const schema = findAtomSchema(schemaId);
      const stateOptions = getAtomSchemaStateOptions(schema);
      if (stateOptions.length < 2) return null;
      statefulIndex += 1;
      const savedStateId = verifier?.childStates?.[childIndex];
      const activeStateId = stateOptions.some((item) => item.id === savedStateId)
        ? savedStateId
        : stateOptions.find((item) => item.schemaId === schema?.id)?.id || stateOptions[0].id;
      return {
        childIndex,
        label: molecule?.id === "任务列表"
          ? `任务 ${statefulIndex}`
          : `子组件 ${childIndex + 1} · ${schema?.name || schemaId}`,
        activeStateId,
        stateOptions,
      };
    })
    .filter(Boolean);
}

function applyMoleculeChildStates(node, childStates = {}) {
  Object.entries(childStates || {}).forEach(([childIndex, stateId]) => {
    const child = node?.children?.[Number(childIndex)];
    if (child?.guidedStates?.length) applyGuidedBusinessState(child, stateId);
  });
  return node;
}

function getMoleculeThemeOptions(molecule, verifier = null) {
  const themeIds = new Set();
  getMoleculeChildEntriesForVerifier(molecule, verifier).forEach(([schemaId]) => {
    const schema = findAtomSchema(schemaId);
    normalizeVariants(schema).forEach((variant) => {
      if (getThemeLinkedVariantProps(schema, variant).length) {
        themeIds.add(getVariantThemeId(schema, variant.id));
      }
    });
  });
  return guidedPageThemePresets.filter((theme) => themeIds.has(getGuidedVariantThemeId(theme)));
}

function applyMoleculeThemeToVerifier(molecule, verifier, themeId) {
  if (!molecule || !verifier) return;
  verifier.parentThemeId = themeId;
  verifier.blueprint = { ...(verifier.blueprint || {}) };
  getMoleculeChildEntriesForVerifier(molecule, verifier).forEach(([schemaId], childIndex) => {
    const schema = findAtomSchema(schemaId);
    const variant = getSchemaThemeVariant(schema, themeId);
    if (!variant) return;
    getThemeLinkedVariantProps(schema, variant).forEach(([key, value]) => {
      verifier.blueprint[getMoleculeBlueprintKey(childIndex, key)] = value;
    });
  });
}

function applyThemeToMoleculeNodeChildren(node, themeId) {
  if (!node || !themeId) return;
  (node.children || []).forEach((child) => {
    const schema = findAtomSchema(child.schemaId);
    const variant = getSchemaThemeVariant(schema, themeId);
    if (!variant) return;
    child.activeVariantId = variant.id;
    getThemeLinkedVariantProps(schema, variant).forEach(([key, value]) => {
      if (child.props && key in child.props) child.props[key] = value;
    });
    if (child.children?.length) applyThemeToMoleculeNodeChildren(child, themeId);
  });
}

function applyThemeToAtomNode(node, themeId) {
  const schema = findAtomSchema(node?.schemaId);
  const variant = getSchemaThemeVariant(schema, themeId);
  if (!variant) return;
  node.activeVariantId = variant.id;
  getThemeLinkedVariantProps(schema, variant).forEach(([key, value]) => {
    if (node.props && key in node.props) node.props[key] = value;
  });
}

function createAdminVerifierMoleculeNode(molecule, verifier) {
  const node = createMoleculeNode(molecule.id);
  if (!node) return null;
  const prizeCountsByChild = new Map();
  const moleculePropKeys = new Set(getPropEntries(molecule).map(([key]) => key));
  Object.entries(verifier?.blueprint || {}).forEach(([key, value]) => {
    if (moleculePropKeys.has(key)) node.props[key] = value;
  });
  syncDynamicMoleculeChildren(node);
  (node.children || []).forEach((child, childIndex) => {
    Object.entries(verifier?.blueprint || {}).forEach(([compoundKey, value]) => {
      const [index, propKey] = compoundKey.split(".");
      if (Number(index) === childIndex && propKey && (propKey in child.props || isLotteryPrizePropKey(propKey))) {
        child.props[propKey] = value;
        const prizeIndex = Number(String(propKey).match(/^prize(\d+)/)?.[1] || 0);
        if (prizeIndex) {
          prizeCountsByChild.set(childIndex, Math.max(prizeCountsByChild.get(childIndex) || 0, prizeIndex));
        }
      }
    });
    const prizeCount = prizeCountsByChild.get(childIndex);
    if (prizeCount) child.props.prizeCount = Math.min(MAX_LOTTERY_PRIZE_COUNT, prizeCount);
  });
  applyMoleculeChildStates(node, verifier?.childStates);
  applyThemeToMoleculeNodeChildren(node, verifier?.parentThemeId);
  return node;
}

function applyCutExportRulesToNode(node) {
  if (!node) return node;
  if (node.type === "molecule") {
    (node.children || []).forEach(applyCutExportRulesToNode);
    return node;
  }
  const rule = getGuidedCutExportRule(node);
  if (rule.hiddenPropKeys?.length && node.props) {
    rule.hiddenPropKeys.forEach((key) => {
      if (key in node.props) node.props[key] = "";
    });
  }
  if (rule.exportPropOverrides) {
    node.props = {
      ...(node.props || {}),
      ...rule.exportPropOverrides,
    };
  }
  return node;
}

function createAdminVerifierMoleculeExportNode(molecule, verifier) {
  const node = createAdminVerifierMoleculeNode(molecule, verifier);
  return applyCutExportRulesToNode(node);
}

function createAdminVerifierPageNodes(template, verifier) {
  const nodes = materializePageTemplateNodes(template);
  attachPageTemplateBusinessStates(nodes, template?.id);
  applyStoredPageTemplateBusinessStates(nodes, template?.id);
  nodes.forEach((node, nodeIndex) => {
    if (node.type === "molecule") {
      const molecule = moleculeSchemas.find((item) => item.id === node.schemaId);
      const moleculePropKeys = new Set(getPropEntries(molecule).map(([key]) => key));
      Object.entries(verifier?.blueprint || {}).forEach(([compoundKey, value]) => {
        const [index, localKey] = compoundKey.split("|");
        if (Number(index) !== nodeIndex || !localKey || localKey.includes(".")) return;
        if (moleculePropKeys.has(localKey)) node.props[localKey] = value;
      });
      syncDynamicMoleculeChildren(node);
      applyThemeToMoleculeNodeChildren(node, verifier?.parentThemeId);
      const prizeCountsByChild = new Map();
      Object.entries(verifier?.blueprint || {}).forEach(([compoundKey, value]) => {
        const [index, localKey] = compoundKey.split("|");
        if (Number(index) !== nodeIndex || !localKey || !localKey.includes(".")) return;
        const [childIndex, propKey] = localKey.split(".");
        const child = node.children?.[Number(childIndex)];
        if (child?.props && (propKey in child.props || isLotteryPrizePropKey(propKey))) {
          child.props[propKey] = value;
          const prizeIndex = Number(String(propKey).match(/^prize(\d+)/)?.[1] || 0);
          if (prizeIndex) {
            prizeCountsByChild.set(childIndex, Math.max(prizeCountsByChild.get(childIndex) || 0, prizeIndex));
          }
        }
      });
      prizeCountsByChild.forEach((count, childIndex) => {
        const child = node.children?.[Number(childIndex)];
        if (child?.props) child.props.prizeCount = Math.min(MAX_LOTTERY_PRIZE_COUNT, count);
      });
      return;
    }

    applyThemeToAtomNode(node, verifier?.parentThemeId);
    Object.entries(verifier?.blueprint || {}).forEach(([compoundKey, value]) => {
      const [index, propKey] = compoundKey.split("|");
      if (Number(index) === nodeIndex && propKey && node.props && propKey in node.props) {
        node.props[propKey] = value;
      }
    });
  });
  return nodes;
}

function createAdminVerifierPageExportNodes(template, verifier) {
  return createAdminVerifierPageNodes(template, verifier).map(applyCutExportRulesToNode);
}

function getPageTemplateThemeOptions(template, verifier = null) {
  const themeIds = new Set();
  createAdminVerifierPageNodes(template, verifier).forEach((node) => {
    if (node.type === "molecule") {
      getMoleculeThemeOptions(moleculeSchemas.find((item) => item.id === node.schemaId), {
        blueprint: buildLocalVerifierBlueprintForNode(node, 0, null),
      }).forEach((theme) => themeIds.add(getGuidedVariantThemeId(theme)));
      return;
    }
    const schema = findAtomSchema(node.schemaId);
    normalizeVariants(schema).forEach((variant) => {
      if (getThemeLinkedVariantProps(schema, variant).length) {
        themeIds.add(getVariantThemeId(schema, variant.id));
      }
    });
  });
  return guidedPageThemePresets.filter((theme) => themeIds.has(getGuidedVariantThemeId(theme)));
}

function renderPageTemplateVerifierPreview(template, verifier, exportMode = false) {
  const nodes = exportMode
    ? createAdminVerifierPageExportNodes(template, verifier)
    : createAdminVerifierPageNodes(template, verifier);
  const theme = guidedPageThemePresets.find((item) => item.id === verifier?.parentThemeId);
  const background = theme?.background || template?.canvasBackground || template?.background || "#ffffff";
  return `
    <div
      class="admin-verifier-page"
      style="width:${Number(template?.viewportWidth || 750)}px;background:${escapeAttr(background)}"
    >
      ${nodes.map((node) => renderComponent(node, { editable: false })).join("")}
    </div>
  `;
}

function getMoleculeBlueprintFieldCount(molecule) {
  const moleculeFieldCount = getPropEntries(molecule).length;
  return moleculeFieldCount + getMoleculeChildEntries(molecule, getMoleculeDefaultProps(molecule)).reduce((sum, [schemaId, overrides = {}]) => {
    const schema = findAtomSchema(schemaId);
    const fields = getPropEntries(schema).filter(([key, field]) => {
      const value = overrides[key] ?? field.default;
      return isPrizePropField(field) || isCopyPropField(key, field, value);
    });
    return sum + fields.length;
  }, 0);
}

function renderAdminMoleculeVerifierSection() {
  const molecules = moleculeSchemas.filter((item) => item.id !== "MoleculeContainer");
  if (!molecules.length) return "";

  return `
    <section class="admin-template-panel admin-molecule-verifier-section">
      <div class="admin-section-head">
        <div>
          <h2>分子组件验收</h2>
          <p>分子组件由原子组件组合而成；原子本身更新后，引用它的分子组件会同步更新。</p>
        </div>
        <span>${molecules.length} 个分子</span>
      </div>
      <div class="admin-molecule-grid">
        ${molecules.map((molecule) => {
          const childNames = (molecule.children || [])
            .map(([schemaId]) => findAtomSchema(schemaId)?.name || schemaId)
            .join(" / ");
          const isBuiltIn = BUILT_IN_MOLECULE_IDS.includes(molecule.id);
          return `
            <article class="admin-molecule-card">
              <div class="admin-molecule-preview">
                ${renderMoleculePreview(molecule)}
              </div>
              <div class="admin-molecule-meta">
                <strong>${escapeHtml(molecule.name)}</strong>
                <span>${escapeHtml(childNames)}</span>
                <code>${getMoleculeBlueprintFieldCount(molecule)} 个组合蓝图变量</code>
              </div>
              <div class="admin-molecule-actions">
                <button type="button" data-admin-edit-molecule="${escapeAttr(molecule.id)}">进入画布验收</button>
                ${isBuiltIn ? "" : `<button type="button" class="danger" data-delete-molecule="${escapeAttr(molecule.id)}">删除</button>`}
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function getSchemaFontEntries(schema) {
  if (!schema) return [];
  if (Array.isArray(schema.fonts)) return schema.fonts;
  if (Array.isArray(schema.typography)) return schema.typography;
  return [];
}

function getVariantThemeId(schema, variantId) {
  const rawVariant = (schema?.variants || []).find((item) => (item.id || item.key) === variantId);
  return rawVariant?.themeBinding?.parentThemeId || "pink";
}

function renderAdminComponentVerifier() {
  const center = $(".activity-center");
  if (!center) return;

  const verifierType = getAdminVerifierType();
  const schema = verifierType === "atom" ? getAdminVerifierSchema() : null;
  const molecule = verifierType === "molecule" ? getAdminVerifierMolecule() : null;
  const pageTemplate = verifierType === "page" ? getAdminVerifierPageTemplate() : null;
  if ((verifierType === "atom" && !schema) || (verifierType === "page" && !pageTemplate)) {
    center.innerHTML = `
      <section class="admin-shell">
        <nav class="admin-nav">
          <button class="admin-back" data-back-admin>← 返回后台</button>
          <span>组件验收</span>
        </nav>
        <div class="admin-empty-state">
          <strong>没有找到待验收组件</strong>
          <span>请先注册 schema.json。</span>
        </div>
      </section>
    `;
    return;
  }

  const verifier = verifierType === "atom"
    ? ensureAdminVerifierState(schema)
    : verifierType === "molecule"
      ? (() => {
        const moleculeThemeOptions = getMoleculeThemeOptions(molecule);
        const defaultThemeId = moleculeThemeOptions[0]?.id || "pink";
        return {
          type: "molecule",
          schemaId: molecule?.id || "",
          parentThemeId: state.adminComponentVerifier?.schemaId === molecule?.id
            ? state.adminComponentVerifier?.parentThemeId || defaultThemeId
            : defaultThemeId,
          blueprint: state.adminComponentVerifier?.schemaId === molecule?.id
            ? { ...(state.adminComponentVerifier?.blueprint || {}) }
            : {},
          childStates: state.adminComponentVerifier?.schemaId === molecule?.id
            ? { ...(state.adminComponentVerifier?.childStates || {}) }
            : {},
        };
      })()
      : (() => {
        const pageThemeOptions = getPageTemplateThemeOptions(pageTemplate, state.adminComponentVerifier);
        const defaultThemeId = pageThemeOptions[0]?.id || "pink";
        return {
          type: "page",
          schemaId: pageTemplate?.id || "",
          parentThemeId: state.adminComponentVerifier?.schemaId === pageTemplate?.id
            ? state.adminComponentVerifier?.parentThemeId || defaultThemeId
            : defaultThemeId,
          blueprint: state.adminComponentVerifier?.schemaId === pageTemplate?.id
            ? { ...(state.adminComponentVerifier?.blueprint || {}) }
            : {},
        };
      })();
  if (verifierType === "molecule") state.adminComponentVerifier = verifier;
  if (verifierType === "page") state.adminComponentVerifier = verifier;

  const props = verifierType === "atom" ? getAdminVerifierProps(schema, verifier) : {};
  const textPropKeys = verifierType === "atom" && Array.isArray(schema.blueprint?.textProps) ? schema.blueprint.textProps : [];
  const textProps = verifierType === "atom"
    ? getPropEntries(schema).filter(([key]) => textPropKeys.includes(key))
    : verifierType === "molecule"
      ? getMoleculeVerifierFields(molecule, verifier)
      : getPageTemplateVerifierFields(pageTemplate, verifier);
  const blueprintVariableLabel = verifierType === "page"
    ? `${textProps.length} 个页面组合变量`
    : verifierType === "molecule"
      ? `${textProps.length} 个组合蓝图变量`
      : textProps.some(([, field]) => isPrizePropField(field))
        ? `${textProps.length} 个蓝图变量`
        : `${textProps.length} 个文字变量`;
  const fontEntries = verifierType === "atom" ? getSchemaFontEntries(schema) : [];
  const missingFontCount = fontEntries.filter((font) => font.source?.status && font.source.status !== "exact").length;
  const variants = verifierType === "atom" ? normalizeVariants(schema) : [];
  const atomStateOptions = verifierType === "atom" ? getAtomSchemaStateOptions(schema) : [];
  const moleculeChildStateControls = verifierType === "molecule"
    ? getMoleculeChildStateControls(molecule, verifier)
    : [];
  const moleculeThemeOptions = verifierType === "molecule" ? getMoleculeThemeOptions(molecule, verifier) : [];
  const atomThemeOptions = verifierType === "atom" ? getAtomThemeOptions(schema) : [];
  const pageThemeOptions = verifierType === "page" ? getPageTemplateThemeOptions(pageTemplate, verifier) : [];
  const theme = guidedPageThemePresets.find((item) => item.id === verifier.parentThemeId) || guidedPageThemePresets[0];
  const width = verifierType === "page"
    ? Number(pageTemplate?.viewportWidth || 750)
    : verifierType === "atom"
      ? Number(schema.dimensions?.width || 702)
      : 702;
  const exportWidth = GUIDED_CUT_EXPORT_WIDTH;
  const exportBottomSpace = verifierType === "atom" && isStickyBottomButtonExportNode(schema)
    ? 0
    : verifierType === "atom" && isTaskBarStyle1ExportNode(schema)
      ? GUIDED_TASK_BAR_EXPORT_BOTTOM_SPACE
      : GUIDED_CUT_EXPORT_BOTTOM_SPACE;
  const height = verifierType === "page"
    ? 1334
    : verifierType === "atom"
      ? Number(schema.dimensions?.height || 160)
      : 240;
  const exportHeight = height + exportBottomSpace;
  const isAutoHeight = verifierType === "atom" ? schema.heightMode === "auto" : true;
  const moleculeNode = verifierType === "molecule" && molecule ? createAdminVerifierMoleculeNode(molecule, verifier) : null;
  const moleculeExportNode = verifierType === "molecule" && molecule ? createAdminVerifierMoleculeExportNode(molecule, verifier) : null;
  const preview = verifierType === "atom"
    ? renderAtomPreview(schema.id, props)
    : verifierType === "page"
      ? renderPageTemplateVerifierPreview(pageTemplate, verifier)
      : moleculeNode ? renderComponent(moleculeNode, { editable: false }) : "";
  const exportPreview = verifierType === "atom"
    ? renderAtomPreview(schema.id, getCutExportProps(schema.id, props))
    : verifierType === "page"
      ? renderPageTemplateVerifierPreview(pageTemplate, verifier, true)
      : moleculeExportNode ? renderComponent(moleculeExportNode, { editable: false }) : "";
  const selectedName = verifierType === "atom"
    ? schema.name
    : verifierType === "page"
      ? pageTemplate?.name || "页面模板"
      : molecule?.name || "分子组件";
  const selectedBadge =
    verifierType === "atom" && ATOM_MODULE_BADGE_IDS.has(schema.id)
      ? '<span class="admin-verifier-title-badge">模块级原子</span>'
      : "";
  const componentOptions = verifierType === "atom"
    ? atomSchemas
    : verifierType === "page"
      ? [...pageTemplates, ...customPageTemplates].filter((item) => item.id !== "blank-page")
      : moleculeSchemas.filter((item) => item.id !== "MoleculeContainer");
  const componentSelectLabel = verifierType === "page" ? "验收页面" : "验收组件";
  const verifierIntro = verifierType === "page"
    ? "页面模板调用分子组合；在这里切换页面并检查继承来的分子变量和 750 宽页面预览。"
    : verifierType === "molecule"
      ? "分子组件直接调用原子组合；在这里切换分子并检查组合蓝图与最终预览。"
      : "固定检查蓝图输入、组件文案、父级色系联动和最终导出切图。";

  center.innerHTML = `
    <section class="admin-shell admin-verifier-shell">
      <nav class="admin-nav">
        <button class="admin-back" data-back-admin>← 返回后台</button>
        <span>组件验收</span>
      </nav>

      <header class="admin-hero admin-verifier-head">
        <span>COMPONENT QA</span>
        <div class="admin-verifier-title-row">
          <div class="admin-verifier-title-main">
            <h1>${escapeHtml(selectedName)}</h1>
            ${selectedBadge}
          </div>
          <div class="admin-verifier-select-row">
            <label class="admin-verifier-component-select admin-verifier-type-select">
              <span>组件类型</span>
              <select data-admin-verifier-type>
                <option value="atom" ${verifierType === "atom" ? "selected" : ""}>原子组件</option>
                <option value="molecule" ${verifierType === "molecule" ? "selected" : ""}>分子组件</option>
                <option value="page" ${verifierType === "page" ? "selected" : ""}>页面模板</option>
              </select>
            </label>
            <label class="admin-verifier-component-select">
              <span>${componentSelectLabel}</span>
              <select data-admin-select-component>
                ${getAdminVerifierComponentOptionMarkup(verifierType, componentOptions, verifier.schemaId)}
              </select>
            </label>
          </div>
        </div>
        <p>${verifierIntro}</p>
      </header>

      <section class="admin-verifier-grid">
        <aside class="admin-verifier-panel">
          <section class="admin-verifier-block">
            <header>
              <strong>蓝图同步</strong>
              <span>${blueprintVariableLabel}</span>
            </header>
            <div class="admin-verifier-fields">
              ${verifierType === "atom" ? textProps.map(([key, field]) => {
                const value = verifier.blueprint[key] ?? field.default ?? "";
                return `
                  <label>
                    <span>${escapeHtml(field.label || key)}</span>
                    ${isPrizePropField(field)
                      ? renderPrizeLibrarySelect(
                          value,
                          `data-admin-prize-prop="${escapeAttr(key)}"`,
                          `${schema.name} ${field.label || key}`,
                          `data-admin-prize-name-prop="${escapeAttr(key)}"`,
                            `data-admin-prize-copy-prop="${escapeAttr(key)}"`,
                        )
                      : isTextareaPropField(field)
                        ? `
                          <textarea
                            rows="${getBlueprintTextareaRows(value)}"
                            data-admin-blueprint-prop="${escapeAttr(key)}"
                          >${escapeHtml(value)}</textarea>
                        `
                      : `
                        <input
                          type="text"
                          data-admin-blueprint-prop="${escapeAttr(key)}"
                          value="${escapeAttr(value)}"
                        />
                      `}
                  </label>
                `;
              }).join("") : verifierType === "molecule" ? textProps.map(({ childIndex, childName, key, compoundKey: explicitKey, field, value }) => {
                const compoundKey = explicitKey || getMoleculeBlueprintKey(childIndex, key);
                return `
                  <label>
                    <span>${escapeHtml(`${childName} · ${field.label || key}`)}</span>
                    ${isPrizePropField(field)
                      ? renderPrizeLibrarySelect(
                          value,
                          `data-admin-molecule-blueprint-prop="${escapeAttr(compoundKey)}"`,
                          `${childName} ${field.label || key}`,
                          `data-admin-molecule-prize-name-prop="${escapeAttr(compoundKey)}"`,
                          `data-admin-molecule-prize-copy-prop="${escapeAttr(compoundKey)}"`,
                        )
                      : isTextareaPropField(field)
                        ? `
                          <textarea
                            rows="${getBlueprintTextareaRows(value)}"
                            data-admin-molecule-blueprint-prop="${escapeAttr(compoundKey)}"
                          >${escapeHtml(value)}</textarea>
                        `
                      : field.type === "number"
                        ? `
                          <input
                            type="number"
                            min="${escapeAttr(field.min ?? "")}"
                            max="${escapeAttr(field.max ?? "")}"
                            data-admin-molecule-blueprint-prop="${escapeAttr(compoundKey)}"
                            value="${escapeAttr(value)}"
                          />
                        `
                        : `
                          <input
                            type="text"
                            data-admin-molecule-blueprint-prop="${escapeAttr(compoundKey)}"
                            value="${escapeAttr(value)}"
                          />
                        `}
                  </label>
                `;
              }).join("") : textProps.map(({ moduleName, childName, compoundKey, field, value }) => {
                const label = moduleName === childName
                  ? `${moduleName} · ${field.label || compoundKey}`
                  : `${moduleName} · ${childName} · ${field.label || compoundKey}`;
                return `
                  <label>
                    <span>${escapeHtml(label)}</span>
                    ${isPrizePropField(field)
                      ? renderPrizeLibrarySelect(
                          value,
                          `data-admin-page-blueprint-prop="${escapeAttr(compoundKey)}"`,
                          `${label}`,
                          `data-admin-page-prize-name-prop="${escapeAttr(compoundKey)}"`,
                          `data-admin-page-prize-copy-prop="${escapeAttr(compoundKey)}"`,
                        )
                      : isTextareaPropField(field)
                        ? `
                          <textarea
                            rows="${getBlueprintTextareaRows(value)}"
                            data-admin-page-blueprint-prop="${escapeAttr(compoundKey)}"
                          >${escapeHtml(value)}</textarea>
                        `
                      : field.type === "number"
                        ? `
                          <input
                            type="number"
                            min="${escapeAttr(field.min ?? "")}"
                            max="${escapeAttr(field.max ?? "")}"
                            data-admin-page-blueprint-prop="${escapeAttr(compoundKey)}"
                            value="${escapeAttr(value)}"
                          />
                        `
                        : `
                          <input
                            type="text"
                            data-admin-page-blueprint-prop="${escapeAttr(compoundKey)}"
                            value="${escapeAttr(value)}"
                          />
                        `}
                  </label>
                `;
              }).join("")}
            </div>
          </section>

          ${verifierType === "molecule" && moleculeChildStateControls.length ? `<section class="admin-verifier-block">
            <header>
              <strong>子组件状态</strong>
              <span>${moleculeChildStateControls.length} 个可切换组件</span>
            </header>
            <div class="admin-verifier-child-states">
              ${moleculeChildStateControls.map((control) => `
                <section>
                  <strong>${escapeHtml(control.label)}</strong>
                  <div class="admin-verifier-state-switch">
                    ${control.stateOptions.map((item) => `
                      <button
                        type="button"
                        class="${item.id === control.activeStateId ? "active" : ""}"
                        data-admin-molecule-child-state="${escapeAttr(`${control.childIndex}|${item.id}`)}"
                      >${escapeHtml(item.name)}</button>
                    `).join("")}
                  </div>
                </section>
              `).join("")}
            </div>
          </section>` : ""}

          ${verifierType === "atom" && atomStateOptions.length > 1 ? `<section class="admin-verifier-block">
            <header>
              <strong>查看状态</strong>
              <span>${escapeHtml(atomStateOptions.find((item) => item.schemaId === schema.id)?.name || "当前状态")}</span>
            </header>
            <div class="admin-verifier-variants">
              ${atomStateOptions.map((item) => `
                <button
                  class="${item.schemaId === schema.id ? "active" : ""}"
                  type="button"
                  data-admin-preview-state="${escapeAttr(item.schemaId)}"
                >
                  <i></i>
                  <span>${escapeHtml(item.name)}</span>
                  <em>${escapeHtml(item.schemaId)}</em>
                </button>
              `).join("")}
            </div>
          </section>` : ""}

          ${verifierType === "atom" ? `<section class="admin-verifier-block">
            <header>
              <strong>组件变体</strong>
              <span>${variants.length} 项变体</span>
            </header>
            <div class="admin-verifier-variants">
              ${variants.map((variant) => {
                const themeId = getVariantThemeId(schema, variant.id);
                const variantTheme = guidedPageThemePresets.find((item) => item.id === themeId) || guidedPageThemePresets[0];
                return `
                  <button
                    class="${variant.id === verifier.variantId ? "active" : ""}"
                    type="button"
                    data-admin-preview-variant="${escapeAttr(variant.id)}"
                    style="--admin-variant-start:${escapeAttr(variant.props.containerGradientStart || variantTheme.primary)};--admin-variant-end:${escapeAttr(variant.props.containerGradientEnd || variantTheme.secondary)}"
                  >
                    <i></i>
                    <span>${escapeHtml(variant.name)}</span>
                    <em>${escapeHtml(variantTheme.name)}</em>
                  </button>
                `;
              }).join("")}
            </div>
          </section>${atomThemeOptions.length ? `<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${escapeHtml(theme.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${atomThemeOptions.map((item) => `
                <button
                  class="${item.id === verifier.parentThemeId ? "active" : ""}"
                  type="button"
                  data-admin-preview-page-theme="${escapeAttr(item.id)}"
                  style="--admin-variant-start:${escapeAttr(item.primary)};--admin-variant-end:${escapeAttr(item.secondary)}"
                >
                  <i></i>
                  <span>${escapeHtml(item.name)}</span>
                  <em>父级联动</em>
                </button>
              `).join("")}
            </div>
          </section>` : ""}` : moleculeThemeOptions.length ? `<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${escapeHtml(theme.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${moleculeThemeOptions.map((item) => `
                <button
                  class="${item.id === verifier.parentThemeId ? "active" : ""}"
                  type="button"
                  data-admin-preview-molecule-theme="${escapeAttr(item.id)}"
                  style="--admin-variant-start:${escapeAttr(item.primary)};--admin-variant-end:${escapeAttr(item.secondary)}"
                >
                  <i></i>
                  <span>${escapeHtml(item.name)}</span>
                  <em>父级联动</em>
                </button>
              `).join("")}
            </div>
          </section>` : pageThemeOptions.length ? `<section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${escapeHtml(theme.name)}</span>
            </header>
            <div class="admin-verifier-variants">
              ${pageThemeOptions.map((item) => `
                <button
                  class="${item.id === verifier.parentThemeId ? "active" : ""}"
                  type="button"
                  data-admin-preview-page-theme="${escapeAttr(item.id)}"
                  style="--admin-variant-start:${escapeAttr(item.primary)};--admin-variant-end:${escapeAttr(item.secondary)}"
                >
                  <i></i>
                  <span>${escapeHtml(item.name)}</span>
                  <em>页面联动</em>
                </button>
              `).join("")}
            </div>
          </section>` : ""}

            ${verifierType === "atom" ? `<section class="admin-verifier-block">
              <header>
                <strong>字体</strong>
                <span>${missingFontCount ? `${missingFontCount} 项缺失` : `${fontEntries.length} 项通过`}</span>
              </header>
              <div class="admin-verifier-font-list">
                ${fontEntries.map((font) => {
                  const family = font.family || font.fontFamily || "";
                  const weight = font.weight || font.fontWeight || "";
                  const size = font.size || font.fontSize || "";
                  const lineHeight = font.lineHeight || "";
                  const usage = font.usage || font.label || "";
                  const source = font.source || {};
                  const isExact = source.status === "exact";
                  const sampleText = font.text || font.sample || "";
                  const requiredFont = source.required || `${family} ${weight}`;
                  return `
                    <div class="${isExact ? "is-ok" : "is-missing"}">
                      <span
                        style="font-family:${escapeAttr(family)};font-weight:${escapeAttr(weight)};font-size:${escapeAttr(size || "18px")};line-height:${escapeAttr(lineHeight || "normal")}"
                      >${escapeHtml(sampleText || "缺少真实文案")}</span>
                      <strong>${escapeHtml(family)}</strong>
                      <em>${isExact ? "已匹配" : "缺失"}</em>
                      <code>${escapeHtml([weight && `W${weight}`, size, lineHeight && `LH ${lineHeight}`].filter(Boolean).join(" / "))}</code>
                      ${usage ? `<small>用途：${escapeHtml(usage)}</small>` : ""}
                      <small>${isExact ? `文件：${escapeHtml(source.file || "")}` : `需要：${escapeHtml(requiredFont)}`}</small>
                      ${source.note ? `<small>${escapeHtml(source.note)}</small>` : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            </section>` : ""}
        </aside>

        <main class="admin-verifier-stage">
          <section class="admin-verifier-preview" style="background:${escapeAttr(theme.background)}">
            <header>
              <strong>后台实时预览</strong>
              <span>父级页面：${escapeHtml(theme.name)}</span>
            </header>
            <div class="admin-verifier-component">${preview}</div>
          </section>

          <section class="admin-verifier-export">
            <header>
              <div>
                <strong>导出切图样子</strong>
                <span>${isAutoHeight ? `${exportWidth}px 宽，底部留白 ${exportBottomSpace}px` : `${exportWidth} x ${exportHeight}px`}，透明背景</span>
              </div>
              <button type="button" data-admin-export-cut>下载 PNG</button>
            </header>
            <div class="admin-export-canvas">
              <div
                class="admin-export-capture"
                data-admin-export-cut-capture
                style="width:${exportWidth}px;${isAutoHeight ? `min-height:${exportHeight}px` : `height:${exportHeight}px`};padding-bottom:${exportBottomSpace}px;box-sizing:border-box;"
                >${exportPreview}</div>
            </div>
          </section>
        </main>
      </section>
    </section>
  `;

  mountPreviewDetailReactMaterials();
}

function refreshAdminVerifierPreview() {
  const liveTarget = document.querySelector(".admin-verifier-component");
  const exportTarget = document.querySelector("[data-admin-export-cut-capture]");
  if (getAdminVerifierType() === "page") {
    const pageTemplate = getAdminVerifierPageTemplate();
    if (!pageTemplate) return;
    if (liveTarget) liveTarget.innerHTML = renderPageTemplateVerifierPreview(pageTemplate, state.adminComponentVerifier);
    if (exportTarget) exportTarget.innerHTML = renderPageTemplateVerifierPreview(pageTemplate, state.adminComponentVerifier, true);
    mountPreviewDetailReactMaterials();
    return;
  }

  if (getAdminVerifierType() === "molecule") {
    const molecule = getAdminVerifierMolecule();
    const node = molecule ? createAdminVerifierMoleculeNode(molecule, state.adminComponentVerifier) : null;
    const exportNode = molecule ? createAdminVerifierMoleculeExportNode(molecule, state.adminComponentVerifier) : null;
    const preview = node ? renderComponent(node, { editable: false }) : "";
    const exportPreview = exportNode ? renderComponent(exportNode, { editable: false }) : "";
    if (liveTarget) liveTarget.innerHTML = preview;
    if (exportTarget) exportTarget.innerHTML = exportPreview;
    mountPreviewDetailReactMaterials();
    return;
  }

  const schema = getAdminVerifierSchema();
  if (!schema) return;
  const verifier = ensureAdminVerifierState(schema);
  const liveProps = getAdminVerifierProps(schema, verifier);
  const exportProps = getCutExportProps(schema.id, liveProps);
  if (liveTarget) liveTarget.innerHTML = renderAtomPreview(schema.id, liveProps);
  if (exportTarget) exportTarget.innerHTML = renderAtomPreview(schema.id, exportProps);
  mountPreviewDetailReactMaterials();
}

function renderEntrySurface() {
  if (state.view === "admin") {
    renderAdminDashboard();
  } else {
    renderActivityCenter();
  }
}

function renderPrdDemoFlow() {
  const center = $(".activity-center");
  if (!center) return;
  const isUpload = state.prdDemoStep === "upload";
  const isParsing = state.prdDemoStep === "parsing";
  if (isUpload) {
    state.view = "home";
    renderActivityCenter();
    return;
  }

  center.innerHTML = `
    <div class="prd-flow-shell ${isUpload || isParsing ? "is-home" : "is-blueprint"}">
      <nav class="prd-minimal-nav">
        <button class="prd-brand" data-back-home aria-label="返回活动中心">
          <span>+</span>
          <strong>DOU+ 活动生成器</strong>
        </button>
        <div class="prd-progress">
          <span class="${isUpload ? "active" : "done"}">01 上传</span>
          <i></i>
          <span class="${isParsing ? "active" : isUpload ? "" : "active"}">02 确认</span>
          <i></i>
          <span>03 预览</span>
        </div>
      </nav>
      ${isParsing ? renderPrdParsingStep() : ""}
      ${state.prdDemoStep === "analysis" ? renderPrdAnalysisStep() : ""}
    </div>
  `;
}

function createPrdBlueprintPasteTemplateRows(templateName, versions) {
  const templateId = PRD_PAGE_TEMPLATE_ID_BY_NAME[templateName];
  const specs = PRD_PAGE_TEMPLATE_INPUT_SPECS[templateId] || [];
  return [
    {
      module: "页面基础信息",
      field: "页面类型",
      values: versions.map((_, index) => (index === 0 ? templateName : "")),
    },
    ...specs.flatMap((spec) =>
      spec.sections.flatMap((section) =>
        section.fields.map(([, label]) => ({
          module: spec.moduleName,
          field: label,
          values: versions.map(() => ""),
        })),
      ),
    ),
  ];
}

function renderPrdBlueprintStandardModuleTable(group, versions) {
  return `
    <section
      class="prd-blueprint-module-paste"
      data-prd-blueprint-module-table="${escapeAttr(group.module)}"
    >
      <header>
        <strong>${escapeHtml(group.module)}</strong>
        <span>粘贴该模块表格</span>
      </header>
      <div
        class="prd-blueprint-module-grid"
        style="--prd-blueprint-version-count:${versions.length};--prd-blueprint-min-width:${180 + versions.length * 180}px"
      >
        <div class="prd-blueprint-module-head">
          <span>填写项</span>
          ${versions.map((version) => `<span>${escapeHtml(version)}</span>`).join("")}
        </div>
        ${group.rows.map(({ row, rowIndex }) => `
          <div
            class="prd-blueprint-module-row"
            data-prd-blueprint-paste-row="${rowIndex}"
            data-prd-blueprint-paste-module="${escapeAttr(row.module)}"
          >
            <div class="prd-blueprint-hidden-cell" data-prd-blueprint-cell="0">${escapeHtml(row.module)}</div>
            <div
              class="prd-blueprint-paste-cell"
              contenteditable="true"
              data-prd-blueprint-cell="1"
              data-prd-blueprint-row-index="${rowIndex}"
              data-prd-blueprint-cell-index="1"
            >${escapeHtml(row.field)}</div>
            ${versions.map((_, versionIndex) => `
              <div
                class="prd-blueprint-paste-cell"
                contenteditable="true"
                data-prd-blueprint-cell="${versionIndex + 2}"
                data-prd-blueprint-row-index="${rowIndex}"
                data-prd-blueprint-cell-index="${versionIndex + 2}"
              >${escapeHtml(row.values[versionIndex] || "")}</div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function getPrdBlueprintPasteFieldValue(rows, moduleName, fieldName, versionIndex) {
  const row = rows.find(
    (item) =>
      normalizePageTemplateLookupName(item.row.module) ===
        normalizePageTemplateLookupName(moduleName) &&
      normalizePageTemplateLookupName(item.row.field) ===
        normalizePageTemplateLookupName(fieldName),
  );
  return row?.row.values?.[versionIndex] || "";
}

function renderPrdBlueprintReturnStrategyTable(group, versions) {
  const moduleName = group.module;
  return `
    <section
      class="prd-blueprint-module-paste is-return-strategy"
      data-prd-blueprint-module-table="${escapeAttr(moduleName)}"
    >
      <header>
        <strong>返券配置</strong>
        <span>粘贴人群策略表</span>
      </header>
      <div class="prd-blueprint-return-paste-grid">
        <div class="prd-blueprint-return-paste-head">
          <span>人群策略</span>
          <span>第1档 · 抽奖任务</span>
          <span>第2档 · 消耗返（门槛1）</span>
          <span>第3档 · 消耗返（门槛2）</span>
          <span>第4档 · 消耗返（门槛3）</span>
        </div>
        ${versions.map((version, versionIndex) => {
          const drawThreshold = getPrdBlueprintPasteFieldValue(
            group.rows,
            moduleName,
            "第1档 · 抽奖门槛",
            versionIndex,
          );
          const tiers = [1, 2, 3].map((tier) => ({
            threshold: getPrdBlueprintPasteFieldValue(
              group.rows,
              moduleName,
              `返券${tier} · 消耗门槛`,
              versionIndex,
            ),
            reward: getPrdBlueprintPasteFieldValue(
              group.rows,
              moduleName,
              `返券${tier} · 金额`,
              versionIndex,
            ),
          }));
          return `
            <div class="prd-blueprint-return-paste-row">
              <div contenteditable="true" data-prd-return-strategy-paste-target>${escapeHtml(version)}</div>
              <div contenteditable="true" data-prd-return-strategy-paste-target>${escapeHtml(drawThreshold ? `累计现金消耗≥${drawThreshold}元` : "")}</div>
              ${tiers.map((tier) => `
                <div contenteditable="true" data-prd-return-strategy-paste-target>${escapeHtml(
                  tier.threshold && tier.reward
                    ? `送满${tier.threshold}赠${tier.reward}`
                    : "",
                )}</div>
              `).join("")}
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderPrdBlueprintModulePasteTables(rows, versions, templateName) {
  if (!templateName) {
    return `<div class="prd-blueprint-paste-empty">请先选择页面模板</div>`;
  }
  const templateId = PRD_PAGE_TEMPLATE_ID_BY_NAME[templateName];
  const specs = PRD_PAGE_TEMPLATE_INPUT_SPECS[templateId] || [];
  if (!specs.length) {
    return `<div class="prd-blueprint-paste-empty">该模板没有需要粘贴的变量表格</div>`;
  }
  const indexedRows = rows.map((row, rowIndex) => ({ row, rowIndex }));
  return specs.map((spec) => {
    const moduleRows = indexedRows.filter(
      (item) =>
        normalizePageTemplateLookupName(item.row.module) ===
        normalizePageTemplateLookupName(spec.moduleName),
    );
    const returnFieldNames = new Set(
      spec.sections
        .filter((section) => section.title === "返券配置")
        .flatMap((section) =>
          section.fields.map(([, label]) => normalizePageTemplateLookupName(label)),
        ),
    );
    const standardRows = moduleRows.filter(
      (item) =>
        !returnFieldNames.has(normalizePageTemplateLookupName(item.row.field)),
    );
    const standardTable = renderPrdBlueprintStandardModuleTable(
      { module: spec.moduleName, rows: standardRows },
      versions,
    );
    if (!returnFieldNames.size) return standardTable;
    return `
      ${renderPrdBlueprintReturnStrategyTable(
        { module: spec.moduleName, rows: moduleRows },
        versions,
      )}
      ${standardTable}
    `;
  }).join("");
}

function renderPrdFileModal() {
  const pasteVersionCount = state.prdBlueprintPasteVersions.length ||
    PRD_BLUEPRINT_PASTE_DEFAULT_VERSIONS.length;
  const pasteVersions = normalizePrdBlueprintPasteVersions(
    state.prdBlueprintPasteVersions,
    pasteVersionCount,
  );
  const blueprintRows = normalizePrdBlueprintPasteRows(
    state.prdBlueprintPasteRows,
    0,
    pasteVersions.length,
  );
  return `
    <div class="prd-file-modal" data-demo-file-modal>
      <section role="dialog" aria-modal="true" aria-labelledby="prd-file-modal-title">
        <header>
          <div>
            <span>演示模式</span>
            <h2 id="prd-file-modal-title">导入 PRD</h2>
          </div>
          <button data-demo-close-file-modal aria-label="关闭">×</button>
        </header>
        <div class="prd-feishu-import">
          <div class="prd-text-import-head">
            <div>
              <strong>飞书文档链接</strong>
              <span>支持企业内部文档，应用需拥有文档阅读权限</span>
            </div>
            <em>链接</em>
          </div>
          <div class="prd-feishu-import-row">
            <input
              type="url"
              placeholder="https://xxx.feishu.cn/docx/xxx"
              data-prd-feishu-input
              value="${escapeHtml(state.prdFeishuUrl || "")}"
            />
            <button type="button" data-prd-feishu-submit>获取文档内容</button>
          </div>
          <div class="prd-feishu-import-note">
            <span class="${state.prdFeishuError ? "error" : ""}">
              ${escapeHtml(state.prdFeishuError || "支持 docx、doc 和 wiki 链接")}
            </span>
          </div>
        </div>
        <div class="prd-file-divider"><span>或粘贴蓝图表格</span></div>
        <div class="prd-blueprint-paste">
          <div class="prd-text-import-head">
            <div>
              <strong>粘贴蓝图表格</strong>
              <span>选择一个模板后，可直接粘贴 PRD 文档中的模块表格</span>
            </div>
            <em>表格</em>
          </div>
          <label class="prd-blueprint-template-select">
            <span>页面模板</span>
            <select data-prd-blueprint-template-select>
              <option value="">请选择模板</option>
              ${Object.keys(PRD_PAGE_TEMPLATE_ALIASES).map((templateName) => `
                <option
                  value="${escapeAttr(templateName)}"
                  ${state.prdBlueprintPasteTemplateName === templateName ? "selected" : ""}
                >${escapeHtml(templateName)}</option>
              `).join("")}
            </select>
          </label>
          <div class="prd-blueprint-module-paste-list">
            ${renderPrdBlueprintModulePasteTables(
              blueprintRows,
              pasteVersions,
              state.prdBlueprintPasteTemplateName,
            )}
          </div>
          <div class="prd-text-import-actions">
            <span class="${state.prdBlueprintPasteError ? "error" : ""}">
              ${escapeHtml(state.prdBlueprintPasteError || "支持文档原表格式；返券策略表会自动转换为纵向版本")}
            </span>
            <button type="button" data-prd-blueprint-table-submit>使用蓝图表格</button>
          </div>
        </div>
        <div class="prd-file-divider"><span>或粘贴普通文本</span></div>
        <div class="prd-text-import">
          <div class="prd-text-import-head">
            <div>
              <strong>粘贴 PRD 文本</strong>
              <span>支持“字段：内容”格式，也可以直接粘贴完整正文</span>
            </div>
            <em>文本</em>
          </div>
          <textarea
            rows="6"
            placeholder="例如：&#10;模板3 抽奖 + 消耗返&#10;活动名称：夏日消耗返活动&#10;核心权益｜big-day发券：..."
            data-prd-text-input
          >${escapeHtml(state.prdTextInput)}</textarea>
          <div class="prd-text-import-actions">
            <span class="${state.prdTextError ? "error" : ""}">
              ${escapeHtml(state.prdTextError || "粘贴后将转换为可编辑的 PRD 信息表")}
            </span>
            <button type="button" data-prd-text-submit>使用文本 PRD</button>
          </div>
        </div>
        <footer>
          <button data-demo-close-file-modal>取消</button>
        </footer>
      </section>
    </div>
  `;
}

function renderPrdParsingStep() {
  return `
    <section class="prd-parsing">
      <div class="prd-parsing-card">
        <div class="prd-parsing-icon" aria-hidden="true">PRD</div>
        <span class="prd-parsing-kicker">解析 PRD 中</span>
        <div class="prd-parsing-bar" aria-hidden="true"><i></i></div>
      </div>
    </section>
  `;
}

function startPrdParsing() {
  if (prdParseTimer) clearTimeout(prdParseTimer);
  state.view = "prd-demo";
  state.prdFileModalOpen = false;
  state.prdDemoStep = "analysis";
  state.prdTemplateSelectedModuleIndex = null;
  state.prdTemplateAddModal = null;
  state.prdTemplateAddAfterIndex = null;
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    state.selectedBlueprintAudienceId =
      getPrdTableBlueprint().audiences[0]?.id || "prd-table-page";
  } else if (state.selectedDemoPackageId === demoTimeActivityPackage.id) {
    state.selectedBlueprintSceneId = demoTimeActivityPackage.scenes[0].id;
  } else {
    state.selectedBlueprintAudienceId = demoActivityPackage.audiences[0].id;
  }
  render();
}

function renderPrdAnalysisStep() {
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) return renderPrdTablePackageBlueprint();
  if (state.selectedDemoPackageId === demoTimeActivityPackage.id) return renderTimePackageBlueprint();
  return renderAudiencePackageBlueprint();
}

function renderPrdTablePackageBlueprint() {
  const blueprint = getPrdTableBlueprint();
  return renderPrdTemplateMappingBlueprint(blueprint);
}

function renderPrdTemplateMappingBlueprint(blueprint) {
  const pageType = blueprint.pageType || "";
  const pageTemplate = pageType
    ? findLatestCustomPageTemplateByPrdType(pageType)
    : null;
  const prdRows = normalizePrdTableRows(state.prdTableRows)
    .map((row, sourceIndex) => ({ ...row, sourceIndex }))
    .filter((row) => row.key.trim() || row.value.trim())
    .filter((row) => !isPrdPageTypeField(row));
  const moduleItems = pageTemplate
    ? getTemplateTopLevelModuleItems(pageTemplate.nodes || [])
    : blueprint.audiences[0]?.modules.map((module, index) => ({
        id: module.id,
        order: index + 1,
        name: module.name,
        kind: getBlueprintComponentDisplayName(module.component),
        detail: "由 PRD 字段临时生成",
      })) || [];
  const rowCount = Math.max(moduleItems.length, prdRows.length, 1);
  const returningClass = state.blueprintReturningFromPreview
    ? " is-returned-from-preview"
    : "";
  const hasPageTemplate = Boolean(pageTemplate);

  return `
    <section class="blueprint-confirm blueprint-overview${returningClass}">
      <header class="blueprint-minimal-head">
        <div>
          <span>PRD 解析结果</span>
          <h1>确认活动策略</h1>
          <p>${hasPageTemplate ? "页面模板已命中；下方直接展开页面继承的分子变量，有 PRD 值自动带入，没值留空。" : `左侧是「${escapeHtml(pageType || "未识别类型")}」命中的页面模板模块；右侧是 PRD 输入表格里的具体信息，有值展示、没值留空。`}</p>
        </div>
        <button class="blueprint-side-generate" data-demo-generate-activity>
          <span>确认并预览</span>
          <b>→</b>
        </button>
      </header>

      ${hasPageTemplate ? `
        ${renderPageBlueprintBasicInfo({ templateName: pageTemplate.name })}
        ${renderPageTemplateInheritedVariableTable({
          templateName: pageTemplate.name,
          pageTemplate,
        })}
      ` : `
        <section class="prd-template-map">
        <header>
          <div>
            <span>模板模块与 PRD 信息对齐</span>
            <strong>${escapeHtml(pageTemplate?.name || pageType || "未命中模板")}</strong>
          </div>
          <em>${moduleItems.length} 个模板模块 · ${prdRows.length} 条 PRD 信息</em>
        </header>
        <div class="prd-template-map-head">
          <span>页面模块</span>
          <span>PRD 具体信息</span>
        </div>
        <div class="prd-template-map-rows">
          ${Array.from({ length: rowCount }, (_, index) =>
            renderPrdTemplateMapRow({
              index,
              module: moduleItems[index],
              row: prdRows[index],
            }),
          ).join("")}
        </div>
      </section>
      `}
    </section>
  `;
}

function findPrdTableRowIndexByLabel(label) {
  const aliases = {
    页面类型: ["类型", "页面类型", "模板类型", "页面模板类型"],
    活动名称: ["活动名称", "名称"],
    活动目标: ["活动目标", "目标", "核心目标"],
    活动时间: ["活动时间", "时间"],
  };
  const candidates = aliases[label] || [label];
  return state.prdTableRows.findIndex((row) =>
    candidates.some(
      (candidate) =>
        normalizePageTemplateLookupName(row?.key) ===
        normalizePageTemplateLookupName(candidate),
    ),
  );
}

function findPrdTableRowIndexByKey(key) {
  const normalizedKey = normalizePageTemplateLookupName(key);
  return state.prdTableRows.findIndex(
    (row) => normalizePageTemplateLookupName(row?.key) === normalizedKey,
  );
}

function ensurePrdVariableRow(label, defaultValue = "") {
  let index = findPrdTableRowIndexByLabel(label);
  if (index >= 0) return index;
  state.prdTableRows.push({
    key: label,
    value: defaultValue,
  });
  return state.prdTableRows.length - 1;
}

function ensurePrdVariableScopedRow({
  label,
  moduleName,
  versionName,
  dimensionTitle = "",
  defaultValue = "",
}) {
  const isDefaultVersion = !versionName || versionName === "默认版本";
  if (isDefaultVersion) return ensurePrdVariableRow(label, defaultValue);
  const rowKey = dimensionTitle
    ? `${moduleName}｜${dimensionTitle}｜${versionName}｜${label}`
    : `${moduleName}｜${versionName}｜${label}`;
  const existingIndex = findPrdTableRowIndexByKey(rowKey);
  if (existingIndex >= 0) return existingIndex;
  state.prdTableRows.push({
    key: rowKey,
    value: defaultValue,
  });
  return state.prdTableRows.length - 1;
}

function renderModuleBoundBlueprintTable({ templateName, moduleItems }) {
  const modules = getPageTemplateBlueprintFormModules(moduleItems)
    .map((moduleConfig) =>
      hydrateModuleBoundBlueprintForm(moduleConfig, { templateName }),
    );
  const fieldCount = modules.reduce(
    (sum, module) =>
      sum + (module.versions || []).reduce(
        (versionSum, version) =>
          versionSum +
          (version.sections || []).reduce(
            (sectionSum, section) => sectionSum + section.fields.length,
            0,
          ),
        0,
      ),
    0,
  );

  return `
    <section class="prd-variable-table">
      <header>
        <div>
          <span>页面模板文字变量表</span>
          <strong>${escapeHtml(templateName || "页面模板")}</strong>
        </div>
        <em>${modules.length} 个模块 · ${fieldCount} 个填写项</em>
      </header>
      <div class="prd-variable-table-head">
        <span>页面模块</span>
        <span>模块专属填写表单</span>
      </div>
      <div class="prd-variable-module-list">
        ${modules.map(renderModuleBoundBlueprintGroup).join("")}
      </div>
    </section>
  `;
}

const PAGE_TEMPLATE_VARIABLE_ROW_PREFIX = "页面模板变量";
const PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX = "页面模板变量版本";
const pageTemplateModulePreviewImages = {
  账户优惠券提示: "/page-module-previews/账户优惠券提示.png",
  "核心权益模块-bigday发券-样式1": "/page-module-previews/bigday-coupon-style1.png",
  "核心权益模块-bigday发券-样式1-已报名": "/page-module-previews/bigday-coupon-style1.png",
  "核心权益模块-bigday发券-样式2": "/page-module-previews/核心权益模块-bigday发券-样式2.png",
  "核心权益模块-发券-样式2": "/page-module-previews/核心权益模块-发券-样式2.png",
  "核心玩法模块-抽奖消返-3列": "/page-module-previews/lottery-consumption-return-3col.png",
  "核心玩法模块-抽奖消返-4列": "/page-module-previews/核心玩法模块-抽奖消返-4列.png",
  "核心玩法模块-抽奖-未报名": "/page-module-previews/lottery-unregistered.png",
  "核心玩法模块-抽奖-已报名": "/page-module-previews/核心玩法模块-抽奖-已报名.png",
  任务列表: "/page-module-previews/task-list.png",
  "投稿赢流量-样式3": "/page-module-previews/投稿赢流量-样式3.png",
  "内容诊断-样式1-点击前": "/page-module-previews/内容诊断.png",
  "内容诊断-样式-点击后": "/page-module-previews/内容诊断.png",
  "内容诊断-优质视频提示": "/page-module-previews/内容诊断.png",
  "内容诊断-账号诊断": "/page-module-previews/内容诊断.png",
  "用户教育-攻略": "/page-module-previews/用户教育-攻略.png",
  "用户教育案例-样式1": "/page-module-previews/用户教育案例-样式1.png",
  "用户教育案例-样式2": "/page-module-previews/用户教育案例-样式1.png",
  置底按钮: "/page-module-previews/置底按钮.png",
  "官方小助手模块": "/page-module-previews/官方小助手模块.png",
  "AI智投": "/page-module-previews/AI智投%20.png",
  "节点指南": "/page-module-previews/节点指南.png",
  "投放抽奖": "/page-module-previews/投放抽奖.png",
};

function getPageTemplateStatePreviewSrc(config, activeStateId, fallbackSrc) {
  const schemaId = config?.states?.find((item) => item.id === activeStateId)?.schemaId;
  return pageTemplateModulePreviewImages[schemaId] || fallbackSrc || "";
}

function getPageTemplateVariableRowKey(field) {
  return [
    PAGE_TEMPLATE_VARIABLE_ROW_PREFIX,
    String((field.moduleIndex ?? 0) + 1),
    field.compoundKey,
  ].join("｜");
}

function getPageTemplateVersionModuleKey(templateId, moduleIndex) {
  return ["page-template", templateId, String(moduleIndex)].join("｜");
}

function parsePageTemplateVersionModuleKey(moduleKey) {
  const [type, templateId, moduleIndex] = String(moduleKey || "").split("｜");
  if (type !== "page-template") return null;
  const parsedIndex = Number(moduleIndex);
  if (!templateId || !Number.isFinite(parsedIndex)) return null;
  return { templateId, moduleIndex: parsedIndex };
}

function getPageTemplateVariableVersionRowKey(field, versionName) {
  return [
    PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX,
    String((field.moduleIndex ?? 0) + 1),
    versionName,
    field.compoundKey,
  ].join("｜");
}

function parsePageTemplateVariableVersionRowKey(key) {
  const parts = String(key || "").split("｜");
  if (parts[0] !== PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX || parts.length < 4) return null;
  const moduleIndex = Number(parts[1]) - 1;
  const versionName = parts[2];
  let compoundKey = parts.slice(3).join("｜");
  const pageKeyMatch = compoundKey.match(/^(\d+)\|(.+)$/);
  if (pageKeyMatch) {
    const embeddedModuleIndex = Number(pageKeyMatch[1]);
    if (
      Number.isFinite(embeddedModuleIndex) &&
      (embeddedModuleIndex === moduleIndex || embeddedModuleIndex === moduleIndex + 1)
    ) {
      compoundKey = pageKeyMatch[2];
    }
  }
  if (!Number.isFinite(moduleIndex) || !versionName || !compoundKey) return null;
  return { moduleIndex, versionName, compoundKey };
}

function getPageTemplateVariableLabel(field) {
  return field.field?.label || field.key || field.compoundKey;
}

function getPageTemplateFieldLocalCompoundKey(field) {
  const compoundKey = String(field?.compoundKey || field?.key || "");
  const pageKeyMatch = compoundKey.match(/^(\d+)\|(.+)$/);
  if (!pageKeyMatch) return compoundKey;
  const embeddedModuleIndex = Number(pageKeyMatch[1]);
  return Number.isFinite(embeddedModuleIndex) &&
    embeddedModuleIndex === Number(field?.moduleIndex)
    ? pageKeyMatch[2]
    : compoundKey;
}

function getInitialPageTemplateVariableValue(field) {
  const fieldLabel = field.field?.label || field.key || field.compoundKey;
  const fullLabel = field.moduleName === field.childName
    ? `${field.moduleName} · ${fieldLabel}`
    : `${field.moduleName} · ${field.childName} · ${fieldLabel}`;
  const candidates = [
    field.label,
    fieldLabel,
    field.key,
    fullLabel,
  ].filter(Boolean);
  for (const candidate of candidates) {
    const value = getStructuredPrdValue(state.prdTableRows, candidate);
    if (value) return value;
  }
  return "";
}

function getPageTemplateVariableRowValue(field) {
  const rowKey = getPageTemplateVariableRowKey(field);
  const existingIndex = findPrdTableRowIndexByKey(rowKey);
  if (existingIndex >= 0) return state.prdTableRows[existingIndex]?.value || "";
  return getInitialPageTemplateVariableValue(field) || field.value || "";
}

function getPageTemplateVariableVersionRowValue(field, versionName) {
  const rowKey = getPageTemplateVariableVersionRowKey(field, versionName);
  const existingIndex = findPrdTableRowIndexByKey(rowKey);
  if (existingIndex >= 0) return state.prdTableRows[existingIndex]?.value || "";
  return getPageTemplateVariableRowValue(field);
}

function ensurePageTemplateVariableVersionRow(field, versionName) {
  const rowKey = getPageTemplateVariableVersionRowKey(field, versionName);
  const existingIndex = findPrdTableRowIndexByKey(rowKey);
  if (existingIndex >= 0) return existingIndex;
  state.prdTableRows.push({
    key: rowKey,
    value: getPageTemplateVariableRowValue(field),
  });
  return state.prdTableRows.length - 1;
}

function ensurePageTemplateVariableRow(field) {
  const existingIndex = findPrdTableRowIndexByKey(field.rowKey);
  if (existingIndex >= 0) return existingIndex;
  state.prdTableRows.push({
    key: field.rowKey,
    value: field.value || "",
  });
  return state.prdTableRows.length - 1;
}

function setPrdTableRowValueByKey(rowKey, value) {
  const rowIndex = findPrdTableRowIndexByKey(rowKey);
  if (rowIndex >= 0) {
    state.prdTableRows[rowIndex].value = value;
    return rowIndex;
  }
  state.prdTableRows.push({ key: rowKey, value });
  return state.prdTableRows.length - 1;
}

function getPageTemplateSourceFieldForPath(sourceNode, path) {
  const templateId = sourceNode?.sourcePageTemplateId || "";
  const moduleIndex = Number(sourceNode?.sourcePageTemplateNodeIndex);
  if (!templateId || !Number.isFinite(moduleIndex)) return null;
  const pageTemplate = [...pageTemplates, ...customPageTemplates].find(
    (item) => item.id === templateId,
  );
  if (!pageTemplate) return null;
  return getPageTemplateVariableFields(pageTemplate).find((field) => {
    if (Number(field.moduleIndex) !== moduleIndex) return false;
    const localKey = getPageTemplateFieldLocalCompoundKey(field);
    return localKey === path || field.compoundKey === path || field.key === path;
  }) || null;
}

function getLineageVersionNameForVariant(sourceNode, variantId) {
  if (!variantId || variantId === "base") return "";
  const versionModuleKey = getPageTemplateVersionModuleKey(
    sourceNode.sourcePageTemplateId,
    sourceNode.sourcePageTemplateNodeIndex,
  );
  const manualVersion = getManualModuleBlueprintVersions(versionModuleKey).find(
    (item) => item.id === variantId,
  );
  return manualVersion?.name ||
    findLineageVariant(sourceNode, variantId)?.title ||
    "";
}

function setNodeAndGuidedStatesValueByPath(node, path, value) {
  if (!node) return;
  setNodeValueByPath(node, path, value);
  (node.guidedStates || []).forEach((entry) => {
    setNodeValueByPath(entry.node, path, value);
  });
}

function setLineagePathValueOnNode(sourceNode, variantId, path, value) {
  if (!sourceNode) return;
  const targetVariantId = variantId || sourceNode.activeLineageVariantId || "base";
  if (targetVariantId && targetVariantId !== "base") {
    const variant = findLineageVariant(sourceNode, targetVariantId);
    if (variant) setNodeAndGuidedStatesValueByPath(variant.node, path, value);
    if (sourceNode.activeLineageVariantId === targetVariantId) {
      setNodeAndGuidedStatesValueByPath(sourceNode, path, value);
    }
    return;
  }
  setNodeAndGuidedStatesValueByPath(sourceNode, path, value);
  const baseVariant = findLineageVariant(sourceNode, "base");
  if (baseVariant) setNodeAndGuidedStatesValueByPath(baseVariant.node, path, value);
}

function syncPageTemplateInlineEditToRows(sourceNode, variantId, path, value) {
  const field = getPageTemplateSourceFieldForPath(sourceNode, path);
  if (!field) return false;
  const versionName = getLineageVersionNameForVariant(sourceNode, variantId);
  const rowKey = versionName
    ? getPageTemplateVariableVersionRowKey(field, versionName)
    : getPageTemplateVariableRowKey(field);
  setPrdTableRowValueByKey(rowKey, value);
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
  state.pages.forEach((page) => {
    if (page.sourcePageTemplateId !== sourceNode.sourcePageTemplateId) return;
    const node = page.nodes?.find(
      (item) => Number(item.sourcePageTemplateNodeIndex) === Number(sourceNode.sourcePageTemplateNodeIndex),
    );
    setLineagePathValueOnNode(node, variantId, path, value);
  });
  return true;
}

function findBlueprintRowForPath(rows = [], path = "") {
  const [childIndexText, childPropKey] = String(path).split(".");
  const hasChildPath = childPropKey !== undefined;
  const childIndex = Number(childIndexText);
  const propKey = hasChildPath ? childPropKey : path;
  return rows.find((row) => {
    if (hasChildPath) {
      return Number(row.childIndex) === childIndex && row.propKey === propKey;
    }
    return row.propKey === propKey || row.moleculePropKey === propKey;
  });
}

function syncBlueprintModuleInlineEditToRows(sourceNode, variantId, path, value) {
  if (!sourceNode?.sourceContextId || !sourceNode?.sourceModuleId) return false;
  const { module } = findBlueprintModule(sourceNode.sourceContextId, sourceNode.sourceModuleId);
  if (!module) return false;
  const groups = ensureBlueprintVariantGroups(module);
  const targetGroup = groups.find((group) => group.id === (variantId || sourceNode.activeLineageVariantId)) ||
    groups[0];
  const row = findBlueprintRowForPath(targetGroup?.rows || [], path);
  if (!row) return false;
  row.value = value;
  if (targetGroup === groups[0]) module.rows = clone(targetGroup.rows);

  const entries = module.inputScope === "activity"
    ? getBlueprintContexts()
        .map((context) => context.modules.find(
          (candidate) =>
            candidate.inputScope === "activity" &&
            candidate.slot === module.slot,
        ))
        .filter(Boolean)
    : [module];
  entries.forEach((candidateModule) => {
    const candidateGroups = ensureBlueprintVariantGroups(candidateModule);
    const candidateGroup = candidateGroups.find((group) => group.id === targetGroup.id) ||
      candidateGroups[0];
    const candidateRow = findBlueprintRowForPath(candidateGroup?.rows || [], path);
    if (candidateRow) candidateRow.value = value;
    if (candidateGroup === candidateGroups[0]) candidateModule.rows = clone(candidateGroup.rows);
  });
  return true;
}

function syncGuidedInlineEditToSource(found, variantId, path, value) {
  const sourceNode = found?.parent || found?.node;
  if (!sourceNode) return false;
  const sourcePath = found?.parent
    ? `${found.parent.children.indexOf(found.node)}.${path}`
    : path;
  if (syncPageTemplateInlineEditToRows(sourceNode, variantId, sourcePath, value)) return true;
  return syncBlueprintModuleInlineEditToRows(sourceNode, variantId, sourcePath, value);
}

function getPageTemplateVariableBlueprintFromRows(rows = []) {
  const blueprint = {};
  const explicitTaskCountsByModule = new Map();
  const inferredTaskCountsByModule = new Map();
  normalizePrdTableRows(rows).forEach((row) => {
    const parsed = parsePageTemplateVariableRowKey(row.key);
    const value = String(row.value || "").trim();
    const parsedVersion = parsePageTemplateVariableVersionRowKey(row.key);
    const parsedRow = parsed || parsedVersion;
    if (!parsedRow || !value) return;
    if (parsed) blueprint[getPageBlueprintKey(parsed.moduleIndex, parsed.compoundKey)] = value;
    const explicitTaskCount = parsedRow.compoundKey === "taskCount" ? Number(value) : 0;
    const taskChildMatch = String(parsedRow.compoundKey || "").match(/^(\d+)\.(?:taskTitle|showNewTag|taskSubtitle|rewardCountText|completionText)$/);
    const inferredTaskCount = taskChildMatch ? Number(taskChildMatch[1]) : 0;
    if (Number.isFinite(explicitTaskCount) && explicitTaskCount > 0) {
      explicitTaskCountsByModule.set(
        parsedRow.moduleIndex,
        Math.max(
          explicitTaskCountsByModule.get(parsedRow.moduleIndex) || 0,
          explicitTaskCount,
        ),
      );
    }
    if (Number.isFinite(inferredTaskCount) && inferredTaskCount > 0) {
      inferredTaskCountsByModule.set(
        parsedRow.moduleIndex,
        Math.max(
          inferredTaskCountsByModule.get(parsedRow.moduleIndex) || 0,
          inferredTaskCount,
        ),
      );
    }
  });
  const taskModuleIndexes = new Set([
    ...explicitTaskCountsByModule.keys(),
    ...inferredTaskCountsByModule.keys(),
  ]);
  taskModuleIndexes.forEach((moduleIndex) => {
    const taskCount =
      explicitTaskCountsByModule.get(moduleIndex) ||
      inferredTaskCountsByModule.get(moduleIndex) ||
      1;
    const key = getPageBlueprintKey(moduleIndex, "taskCount");
    blueprint[key] = String(Math.max(1, Math.round(taskCount)));
  });
  return blueprint;
}

function getPrdPageTemplateInputFields(pageTemplate, verifier) {
  const fields = getPageTemplateVerifierFields(pageTemplate, verifier);
  const specs = getPrdPageTemplateInputSpecs(pageTemplate);
  const orderedFields = specs === null
    ? fields.map((field) => ({
        field,
        fieldSpec: {
          moduleName: field.moduleName,
          sectionTitle: "",
          label: getPageTemplateVariableLabel(field),
        },
      }))
    : specs.flatMap((moduleSpec) =>
        moduleSpec.sections.flatMap((section) =>
          section.fields.map(([localKey, label]) => {
            const field = fields.find((candidate) => {
              const sourceSchemaId =
                candidate.sourceModuleSchemaId || candidate.moduleSchemaId;
              return moduleSpec.schemaIds.includes(sourceSchemaId) &&
                getPageTemplateFieldLocalCompoundKey(candidate) === localKey;
            });
            return field
              ? {
                  field,
                  fieldSpec: {
                    moduleName: moduleSpec.moduleName,
                    sectionTitle: section.title,
                    label,
                  },
                }
              : null;
          }).filter(Boolean),
        ),
      );
  return orderedFields.map(({ field, fieldSpec }) => ({
    ...field,
    ...fieldSpec,
  }));
}

function getPageTemplateVariableFields(pageTemplate) {
  const verifier = {
    blueprint: getPageTemplateVariableBlueprintFromRows(state.prdTableRows),
  };
  const allFields = getPageTemplateVerifierFields(pageTemplate, verifier);
  const prdInputFields = withDynamicPageTemplatePrizeFields(
    getPrdPageTemplateInputFields(pageTemplate, verifier),
    state.prdTableRows,
  );
  const prdFieldByKey = new Map(
    prdInputFields.map((field) => [field.compoundKey, field]),
  );
  const orderedFields = [
    ...prdInputFields,
    ...allFields.filter((field) => !prdFieldByKey.has(field.compoundKey)),
  ];
  return orderedFields.map((field) => {
    const prdField = prdFieldByKey.get(field.compoundKey);
    const normalizedField = { ...field };
    normalizedField.moduleName = prdField?.moduleName || field.moduleName;
    normalizedField.sectionTitle = prdField
      ? prdField.sectionTitle
      : field.childName && field.childName !== field.moduleName
        ? field.childName
        : "模块内容";
    if (
      !prdField &&
      normalizedField.moduleSchemaId === "任务列表" &&
      Number(field.childIndex) >= 1
    ) {
      normalizedField.sectionTitle = `任务${field.childIndex}`;
    }
    normalizedField.label =
      prdField?.label || getPageTemplateVariableLabel(field);
    normalizedField.isPrdKey = Boolean(prdField);
    normalizedField.rowKey = getPageTemplateVariableRowKey(normalizedField);
    normalizedField.value = getPageTemplateVariableRowValue(normalizedField);
    return normalizedField;
  });
}

function buildPageTemplateVariableSections(fields, getRowIndex) {
  const sections = [];
  fields.forEach((field) => {
    const title = field.sectionTitle || "";
    let section = sections.find((item) => item.title === title);
    if (!section) {
      section = { title, fields: [] };
      sections.push(section);
    }
    section.fields.push({
      ...field,
      rowIndex: getRowIndex(field),
    });
  });
  const getSectionPriority = (section) => {
    if (section.fields.some((field) => field.key === "taskCount")) return 0;
    if (
      section.fields.some(
        (field) => getPageTemplateFieldLocalCompoundKey(field) === "0.titleText",
      )
    ) {
      return 1;
    }
    return 2;
  };
  sections.sort(
    (left, right) => getSectionPriority(left) - getSectionPriority(right),
  );
  return sections;
}

function getPageTemplateVariableGroups(pageTemplate) {
  const nodes = materializePageTemplateNodes(pageTemplate);
  const editableFields = getPageTemplateVariableFields(pageTemplate);
  return nodes.map((node, moduleIndex) => {
    const moduleFields = editableFields.filter(
      (field) => Number(field.moduleIndex) === moduleIndex,
    );
    const sourceSchemaId = node.schemaId;
    const stateConfig = getPageTemplateBusinessStateConfig(
      sourceSchemaId,
      pageTemplate.id,
      moduleIndex,
    );
    const activeSchemaId =
      moduleFields[0]?.moduleSchemaId ||
      getPageTemplateBusinessStateSchemaId(
        pageTemplate.id,
        moduleIndex,
        stateConfig,
        getPageTemplateActiveBusinessStateId(
          pageTemplate.id,
          moduleIndex,
          stateConfig,
        ),
      ) ||
      sourceSchemaId;
    const activeStateId =
      stateConfig?.states?.find((item) => item.schemaId === activeSchemaId)?.id ||
      getPageTemplateActiveBusinessStateId(
        pageTemplate.id,
        moduleIndex,
        stateConfig,
      );
    const moduleSpec =
      getPrdPageTemplateModuleSpec(pageTemplate, sourceSchemaId) ||
      getPrdPageTemplateModuleSpec(pageTemplate, activeSchemaId);
    const previewSrc =
      pageTemplateModulePreviewImages[activeSchemaId] ||
      pageTemplateModulePreviewImages[sourceSchemaId] ||
      "";
    return {
      templateId: pageTemplate.id,
      moduleIndex,
      moduleSchemaId: activeSchemaId,
      sourceModuleSchemaId: sourceSchemaId,
      moduleName:
        moduleSpec?.moduleName ||
        getGlobalComponentDisplayName(
          activeSchemaId,
          stateConfig?.label || node.name,
        ),
      previewSrc: getPageTemplateStatePreviewSrc(
        stateConfig,
        activeStateId,
        previewSrc,
      ),
      stateOptions: stateConfig?.states || [],
      activeStateId,
      fields: moduleFields,
      isPrdInputModule: moduleFields.some((field) => field.isPrdKey),
      isContentLocked: LOCKED_PAGE_TEMPLATE_BLUEPRINT_SCHEMA_IDS.has(activeSchemaId),
      versionModuleKey: getPageTemplateVersionModuleKey(
        pageTemplate.id,
        moduleIndex,
      ),
    };
  }).map((group) => {
    const manualVersions = getManualModuleBlueprintVersions(group.versionModuleKey);
    const baseVersion = getBaseBlueprintAudienceVersion({
      sections: buildPageTemplateVariableSections(
        group.fields,
        ensurePageTemplateVariableRow,
      ),
    });
    const importedVersions = manualVersions.map((version) => ({
      ...version,
      sections: buildPageTemplateVariableSections(
        group.fields,
        (field) => ensurePageTemplateVariableVersionRow(field, version.name),
      ),
    }));
    const versions = hasImportedModuleBlueprintVersions(group.versionModuleKey) && importedVersions.length
      ? importedVersions
      : [
        baseVersion,
        ...importedVersions,
      ];
    const molecule = moleculeSchemas.find((item) => item.id === group.moduleSchemaId);
    if (!molecule) return { ...group, versions };
    const blueprint = {};
    group.fields.forEach((field) => {
      const localKey = getPageTemplateFieldLocalCompoundKey(field);
      if (!String(localKey || "").includes(".")) {
        blueprint[localKey] = field.value;
      }
    });
    const childStateControls = getMoleculeChildStateControls(molecule, { blueprint }).map((control) => ({
      ...control,
      activeStateId: getPageTemplateChildStateId(
        group.templateId,
        group.moduleIndex,
        control.childIndex,
        control.stateOptions,
      ),
    }));
    return { ...group, versions, childStateControls };
  });
}

function renderPageTemplateInheritedVariableTable({ pageTemplate }) {
  const groups = getPageTemplateVariableGroups(pageTemplate);
  return `
    <section class="prd-variable-table">
      <div class="prd-variable-module-list">
        ${groups.map(renderPageTemplateVariableGroup).join("")}
      </div>
    </section>
    ${renderPrdTemplateMoleculeAddModal()}
  `;
}

function renderPageTemplateVariableGroup(group, index = 0) {
  const hasMultipleVersions = (group.versions || []).length > 1;
  const isSelected =
    state.prdTemplateSelectedModuleIndex !== null &&
    state.prdTemplateSelectedModuleIndex !== undefined &&
    Number(state.prdTemplateSelectedModuleIndex) === Number(group.moduleIndex);
  return `
    <section
      class="prd-variable-module-row ${hasMultipleVersions ? "has-versions" : ""} ${isSelected ? "is-selected" : ""}"
      data-prd-template-module-row="${escapeAttr(`${group.templateId}|${group.moduleIndex}`)}"
    >
      ${
        isSelected
          ? `
            <div class="prd-module-insert-rail" aria-label="添加分子模块">
              <button
                type="button"
                class="prd-module-order-btn"
                data-prd-move-template-module="${escapeAttr(`${group.templateId}|${group.moduleIndex}|up`)}"
                aria-label="上移模块"
              >↑</button>
              <button
                type="button"
                class="prd-module-order-btn"
                data-prd-move-template-module="${escapeAttr(`${group.templateId}|${group.moduleIndex}|down`)}"
                aria-label="下移模块"
              >↓</button>
              <button
                type="button"
                data-prd-open-add-component="${escapeAttr(`${group.templateId}|${group.moduleIndex}|before`)}"
              >上方添加</button>
              <button
                type="button"
                data-prd-open-add-component="${escapeAttr(`${group.templateId}|${Number(group.moduleIndex) + 1}|after`)}"
              >下方添加</button>
              <button
                type="button"
                class="prd-module-delete-float-btn"
                data-prd-delete-template-module="${escapeAttr(`${group.templateId}|${group.moduleIndex}`)}"
              >删除模块</button>
            </div>
          `
          : ""
      }
      <article class="prd-variable-module-name">
        <strong>${escapeHtml(group.moduleName)}</strong>
        ${renderPageTemplateStateSwitch(group)}
        ${renderPageTemplateEntryCardStateSwitch(group)}
        ${renderPageTemplateChildStateControls(group)}
        ${renderPageTemplateModulePreview(group)}
      </article>
      <div class="prd-variable-section-list">
        ${
          group.isContentLocked
            ? `<div class="prd-locked-module-note">固定内容</div>`
            : renderModuleBoundBlueprintVersionMatrix(group)
        }
      </div>
    </section>
  `;
}

function renderPrdTemplateMoleculeAddModal() {
  const target = state.prdTemplateAddModal;
  if (!target) return "";
  const options = getGuidedMoleculeOptions();
  return `
    <div class="prd-template-add-modal" data-prd-add-modal>
      <section class="prd-template-add-dialog" role="dialog" aria-modal="true" aria-label="选择分子组件">
        <header>
          <div>
            <span>选择分子模块</span>
            <strong>${target.direction === "before" ? "添加到当前模块上方" : "添加到当前模块下方"}</strong>
          </div>
          <button type="button" data-prd-close-add-component aria-label="关闭">×</button>
        </header>
        <div class="prd-template-add-grid">
          ${options.map((item) => `
            <button
              type="button"
              class="prd-template-add-card"
              data-prd-template-insert-molecule="${escapeAttr(item.id)}"
              data-prd-template-id="${escapeAttr(target.templateId)}"
              data-prd-template-insert-index="${escapeAttr(target.insertIndex)}"
            >
              <div class="prd-template-add-preview ${item.imageUrl ? "is-content" : ""}">
                <div class="prd-template-add-preview-inner ${item.imageUrl ? "is-content" : ""}">
                  ${renderGuidedMoleculePreview(item)}
                </div>
              </div>
              <div class="prd-template-add-card-meta">
                <span>预存分子</span>
                <strong>${escapeHtml(item.name)}</strong>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderPageTemplateChildStateControls(group) {
  if (group?.moduleSchemaId === "任务列表") return "";
  if (!group?.childStateControls?.length) return "";
  return `
    <section class="prd-variable-section prd-child-state-section">
      <strong>任务状态</strong>
      <div class="prd-child-state-list">
        ${group.childStateControls.map((control) => `
          <div class="prd-child-state-row">
            <span>${escapeHtml(control.label)}</span>
            <div class="prd-module-state-switch" aria-label="${escapeAttr(`${control.label}状态切换`)}">
              ${control.stateOptions.map((item) => `
                <button
                  type="button"
                  class="${item.id === control.activeStateId ? "active" : ""}"
                  data-prd-template-child-state="${escapeAttr(`${group.templateId}|${group.moduleIndex}|${control.childIndex}|${item.id}`)}"
                >${escapeHtml(item.name)}</button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderPageTemplateStateSwitch(group) {
  if (!group?.stateOptions?.length) return "";
  const multiStateClass = group.stateOptions.length > 2 ? " is-multi" : "";
  return `
    <div class="prd-module-state-switch${multiStateClass}" aria-label="模块状态切换">
      ${group.stateOptions
        .map((item) => `
          <button
            type="button"
            class="${item.id === group.activeStateId ? "active" : ""}"
            data-prd-template-state="${escapeAttr(`${group.templateId}|${group.moduleIndex}|${item.id}`)}"
          >${escapeHtml(item.name)}</button>
        `)
        .join("")}
    </div>
  `;
}

function renderPageTemplateEntryCardStateSwitch(group) {
  if (
    !isNoIncentiveEntryModule(group?.templateId, group?.moduleIndex) ||
    group?.activeStateId !== "entry"
  ) {
    return "";
  }
  const activeStateId = getPageTemplateEntryCardStateId(
    group.templateId,
    group.moduleIndex,
  );
  return `
    <div
      class="prd-module-state-switch is-secondary"
      aria-label="入口卡片状态切换"
    >
      ${PAGE_TEMPLATE_ENTRY_CARD_STATES.map((item) => `
        <button
          type="button"
          class="${item.id === activeStateId ? "active" : ""}"
          data-prd-template-entry-state="${escapeAttr(`${group.templateId}|${group.moduleIndex}|${item.id}`)}"
        >${escapeHtml(item.name)}</button>
      `).join("")}
    </div>
  `;
}

function createPageTemplateBlueprintPreviewNode(group) {
  const molecule = moleculeSchemas.find((item) => item.id === group?.moduleSchemaId);
  const atom = findAtomSchema(group?.moduleSchemaId);
  const node = molecule
    ? createMoleculeNode(molecule.id)
    : atom
      ? createAtomNode(atom.id)
      : null;
  if (!node) return null;

  const fields = group?.versions?.[0]?.sections?.flatMap((section) => section.fields || []) || [];
  const prizeCountsByChild = new Map();
  fields.forEach((field) => {
    const localKey = getPageTemplateFieldLocalCompoundKey(field);
    const value = state.prdTableRows[field.rowIndex]?.value ?? field.value;
    const [childIndexText, childPropKey] = String(localKey || "").split(".");
    if (childPropKey) {
      const child = node.children?.[Number(childIndexText)];
      if (child?.props && (childPropKey in child.props || isLotteryPrizePropKey(childPropKey))) {
        child.props[childPropKey] = value;
        const prizeIndex = Number(String(childPropKey).match(/^prize(\d+)/)?.[1] || 0);
        if (prizeIndex && String(value || "").trim()) {
          prizeCountsByChild.set(
            Number(childIndexText),
            Math.max(prizeCountsByChild.get(Number(childIndexText)) || 0, prizeIndex),
          );
        }
      }
      return;
    }
    if (node.props && localKey in node.props) node.props[localKey] = value;
  });
  prizeCountsByChild.forEach((count, childIndex) => {
    const child = node.children?.[Number(childIndex)];
    if (child?.props) child.props.prizeCount = Math.min(MAX_LOTTERY_PRIZE_COUNT, count);
  });
  return node;
}

function renderPageTemplateModulePreview(group) {
  const livePreviewSchemaIds = new Set([
    "内容诊断-样式-点击后",
    "内容诊断-优质视频提示",
    "内容诊断-账号诊断",
    "投放抽奖",
  ]);
  if (livePreviewSchemaIds.has(group?.moduleSchemaId)) {
    const node = createPageTemplateBlueprintPreviewNode(group);
    if (node) {
      return `
        <div class="prd-module-preview is-live" aria-label="${escapeAttr(`${group.moduleName}预览`)}">
          <div class="prd-module-preview-live-stage">
            ${renderComponent(node, { editable: false })}
          </div>
        </div>
      `;
    }
  }
  if (!group?.previewSrc) return "";
  return `
    <div class="prd-module-preview" aria-hidden="true">
      <img src="${escapeAttr(group.previewSrc)}" alt="" loading="lazy" />
    </div>
  `;
}

function renderPageTemplateVariableField(field) {
  const value = field.value || "";
  const isLong = isTextareaPropField(field.field) || String(value).length > 18;
  return `
    <label class="prd-variable-field ${isLong ? "is-wide" : ""}">
      <span>${escapeHtml(field.label)}</span>
      <textarea
        rows="${getBlueprintTextareaRows(value)}"
        data-prd-template-variable-row="${escapeAttr(field.rowKey)}"
        data-prd-template-variable-key="${escapeAttr(getPageTemplateFieldLocalCompoundKey(field))}"
        data-prd-template-variable-label="${escapeAttr(field.label || "")}"
      >${escapeHtml(value)}</textarea>
    </label>
  `;
}

function renderPageBlueprintBasicInfo({ templateName }) {
  const form = hydrateModuleBoundBlueprintForm(pageBlueprintFormConfig, { templateName });
  const fields = form.versions?.[0]?.sections?.[0]?.fields || [];
  return `
    <section class="prd-basic-info-panel">
      <header>
        <strong>基础信息</strong>
      </header>
      <div class="prd-basic-info-grid">
        ${fields.map(renderPageBlueprintBasicInfoField).join("")}
      </div>
    </section>
  `;
}

function renderPageBlueprintBasicInfoField(field) {
  const row = state.prdTableRows[field.rowIndex] || { value: "" };
  const isWide = field.size === "wide";
  return `
    <label class="prd-basic-info-field ${isWide ? "is-wide" : ""}">
      <span>${escapeHtml(field.label)}</span>
      <textarea
        rows="${isWide ? 2 : 1}"
        data-prd-table-row="${field.rowIndex}"
      >${escapeHtml(row.value || "")}</textarea>
    </label>
  `;
}

function getPageTemplateBlueprintFormModules(moduleItems = []) {
  const moduleForms = moduleItems
    .map((moduleItem) => {
      const config = findModuleBlueprintFormConfig(moduleItem);
      if (!config) return null;
      return {
        moduleName: moduleItem.name,
        description: config.description,
        sections: config.sections,
        versionMode: config.versionMode,
        allowManualVersions: true,
      };
    })
    .filter(Boolean);
  return moduleForms;
}

function findModuleBlueprintFormConfig(moduleItem) {
  const lookupNames = [
    moduleItem?.name,
    moduleItem?.schemaId,
    moduleItem?.id,
    moduleBlueprintFormAliases[moduleItem?.schemaId],
    moduleBlueprintFormAliases[moduleItem?.name],
  ].filter(Boolean);
  for (const name of lookupNames) {
    const normalizedName = normalizePageTemplateLookupName(name);
    const directConfig = moduleBlueprintFormConfigs[name];
    if (directConfig) return directConfig;
    const matchedName = Object.keys(moduleBlueprintFormConfigs).find(
      (key) => normalizePageTemplateLookupName(key) === normalizedName,
    );
    if (matchedName) return moduleBlueprintFormConfigs[matchedName];
  }
  return null;
}

function hydrateModuleBoundBlueprintForm(moduleConfig, { templateName } = {}) {
  const versions = getModuleBoundBlueprintVersions(moduleConfig);
  const sections = getModuleBoundBlueprintSections(moduleConfig);
  return {
    ...moduleConfig,
    sections,
    versions: versions.map((version) => ({
      ...version,
      sections: hydrateModuleBoundBlueprintSections({
        moduleConfig: { ...moduleConfig, sections },
        templateName,
        version,
      }),
    })),
  };
}

function getModuleBoundBlueprintSections(moduleConfig) {
  if (!isPrdBlueprintTaskModuleName(moduleConfig.moduleName)) return moduleConfig.sections;
  const taskCount = getPrdTaskListCount(state.prdTableRows);
  return Array.from({ length: taskCount }, (_, index) => {
    const taskNumber = index + 1;
    return {
      title: `任务${taskNumber}`,
      className: "is-task-card",
      fields: [
        [`${taskNumber}.taskTitle`, "标题"],
        [`${taskNumber}.showNewTag`, "NEW标签"],
        [`${taskNumber}.taskSubtitle`, "说明"],
        [`${taskNumber}.rewardCountText`, "奖励数量"],
        [`${taskNumber}.completionText`, "完成次数说明"],
      ],
    };
  });
}

function hydrateModuleBoundBlueprintSections({ moduleConfig, templateName, version }) {
  return moduleConfig.sections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => {
      const normalizedField = Array.isArray(field)
        ? { key: field[0], label: field[1], type: /\.showNewTag$/.test(field[0]) ? "boolean" : "string" }
        : typeof field === "string"
          ? { label: field }
          : field;
      const defaultValue =
        getModuleBoundFieldDefaultValue({
          moduleConfig,
          templateName,
          version,
          label: normalizedField.label,
        });
      return {
        ...normalizedField,
        rowIndex: ensurePrdVariableScopedRow({
          label: normalizedField.label,
          moduleName: moduleConfig.moduleName,
          versionName: version.isBase ? "" : version.name,
          dimensionTitle: version.dimensionTitle,
          defaultValue,
        }),
      };
    }),
  }));
}

function getModuleBoundBlueprintVersions(moduleConfig) {
  const manualVersions = getManualModuleBlueprintVersions(moduleConfig.moduleName);
  const hasImportedVersions = hasImportedModuleBlueprintVersions(moduleConfig.moduleName);
  const appendManualVersions = (versions) => [
    ...versions,
    ...manualVersions.filter(
      (manualVersion) =>
        !versions.some(
          (version) =>
            normalizePageTemplateLookupName(version.name) ===
            normalizePageTemplateLookupName(manualVersion.name),
        ),
    ),
  ];

  if (moduleConfig.versionMode === "lotteryPrizes") {
    const groups = parsePrdLotteryPrizeGroups(
      normalizePrdTableRows(state.prdTableRows)
        .map((row) => `${row.key || ""}：${row.value || ""}`)
        .join("\n"),
    );
    if (groups.length >= 2) {
      return appendManualVersions(groups.map((group, index) => ({
        id: index === 0 ? "base" : `lottery-${group.id}`,
        name: group.name,
        dimensionTitle: group.dimensionTitle || group.audience || "奖品人群",
        defaults: Object.fromEntries(
          group.prizes.map((prize, prizeIndex) => [`奖品${prizeIndex + 1}名称`, prize]),
        ),
      })));
    }
  }

  if (moduleConfig.versionMode === "consumptionProgress") {
    const config = getPrdTableBlueprint().consumptionProgressConfig;
    if (config?.entries?.length >= 2) {
      return appendManualVersions(config.entries.map((entry, index) => ({
        id: index === 0 ? "base" : entry.id,
        name: entry.title || entry.dimensionTitle || `版本${index + 1}`,
        dimensionTitle: entry.dimensionTitle,
        defaults: getConsumptionProgressVersionDefaults(entry.props),
      })));
    }
  }

  if (hasImportedVersions && manualVersions.length) return manualVersions;
  return appendManualVersions([getBaseBlueprintAudienceVersion({ defaults: {} })]);
}

function getManualModuleBlueprintVersions(moduleName) {
  return (state.prdManualModuleVersions?.[moduleName] || []).map((version, index) => ({
    id: version.id || `manual_${index + 1}`,
    name: version.name || `自定义版本 ${index + 1}`,
    defaults: {},
    isManual: true,
  }));
}

function hasImportedModuleBlueprintVersions(moduleName) {
  return (state.prdManualModuleVersions?.[moduleName] || []).some((version) =>
    String(version?.id || "").startsWith("imported_"),
  );
}

function addManualModuleBlueprintVersion(moduleName) {
  if (!moduleName || moduleName === "页面基础信息") return;
  if (!state.prdManualModuleVersions) state.prdManualModuleVersions = {};
  const versions = state.prdManualModuleVersions[moduleName] || [];
  const nextIndex = hasImportedModuleBlueprintVersions(moduleName)
    ? versions.length + 1
    : versions.length + 2;
  versions.push({
    id: `manual_${Date.now()}_${nextIndex}`,
    name: `人群${nextIndex}`,
  });
  state.prdManualModuleVersions[moduleName] = versions;
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
}

function renameManualModuleBlueprintVersion(moduleName, versionId, nextName) {
  const versions = state.prdManualModuleVersions?.[moduleName] || [];
  const version = versions.find((item) => item.id === versionId);
  if (!version) return;
  const prevName = version.name;
  const normalizedName = String(nextName || "").trim() || prevName || "自定义版本";
  if (normalizedName === prevName) return;
  version.name = normalizedName;
  renameManualModuleVersionRows(moduleName, prevName, normalizedName);
  document.querySelectorAll("[data-prd-version-name]").forEach((input) => {
    if (
      input.dataset.prdVersionModuleKey === moduleName &&
      input.dataset.prdVersionId === versionId &&
      input.value !== normalizedName
    ) {
      input.value = normalizedName;
    }
  });
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
}

function deleteManualModuleBlueprintVersion(moduleName, versionId) {
  const versions = state.prdManualModuleVersions?.[moduleName] || [];
  const version = versions.find((item) => item.id === versionId);
  if (!version) return false;
  state.prdManualModuleVersions[moduleName] = versions.filter((item) => item.id !== versionId);
  deleteManualModuleVersionRows(moduleName, version.name);
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
  return true;
}

function renameManualModuleVersionRows(moduleName, prevName, nextName) {
  const pageModule = parsePageTemplateVersionModuleKey(moduleName);
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows).map((row) => {
    const key = String(row.key || "");
    if (pageModule) {
      const parsed = parsePageTemplateVariableVersionRowKey(key);
      if (
        parsed &&
        parsed.moduleIndex === pageModule.moduleIndex &&
        normalizePageTemplateLookupName(parsed.versionName) === normalizePageTemplateLookupName(prevName)
      ) {
        return {
          ...row,
          key: key.replace(
            `${PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX}｜${pageModule.moduleIndex + 1}｜${prevName}｜`,
            `${PAGE_TEMPLATE_VARIABLE_VERSION_ROW_PREFIX}｜${pageModule.moduleIndex + 1}｜${nextName}｜`,
          ),
        };
      }
      return row;
    }
    const prefixes = [
      {
        prev: `${moduleName}｜${prevName}｜`,
        next: `${moduleName}｜${nextName}｜`,
      },
      {
        prev: `${moduleName}｜默认维度｜${prevName}｜`,
        next: `${moduleName}｜默认维度｜${nextName}｜`,
      },
    ];
    const matchedPrefix = prefixes.find((prefix) => key.startsWith(prefix.prev));
    return matchedPrefix
      ? { ...row, key: `${matchedPrefix.next}${key.slice(matchedPrefix.prev.length)}` }
      : row;
  });
}

function deleteManualModuleVersionRows(moduleName, versionName) {
  const pageModule = parsePageTemplateVersionModuleKey(moduleName);
  state.prdTableRows = normalizePrdTableRows(state.prdTableRows).filter((row) => {
    const key = String(row.key || "");
    if (pageModule) {
      const parsed = parsePageTemplateVariableVersionRowKey(key);
      return !(
        parsed &&
        parsed.moduleIndex === pageModule.moduleIndex &&
        normalizePageTemplateLookupName(parsed.versionName) === normalizePageTemplateLookupName(versionName)
      );
    }
    return !(
      key.startsWith(`${moduleName}｜${versionName}｜`) ||
      key.startsWith(`${moduleName}｜默认维度｜${versionName}｜`)
    );
  });
}

function getConsumptionProgressVersionDefaults(props = {}) {
  return {
    抽奖入口文案: props.lotteryText,
    第1档奖励金额: props.reward1AmountText,
    第2档奖励金额: props.reward2AmountText,
    第3档奖励金额: props.reward3AmountText,
    第1个进度节点文案: props.milestone1Text,
    第2个进度节点文案: props.milestone2Text,
    第3个进度节点文案: props.milestone3Text,
    第4个进度节点文案: props.milestone4Text,
  };
}

function getModuleBoundFieldDefaultValue({ moduleConfig, templateName, version, label }) {
  if (label === "页面类型") return templateName || "";
  if (version?.defaults && Object.prototype.hasOwnProperty.call(version.defaults, label)) {
    return version.defaults[label] || "";
  }
  if (isPrdBlueprintTaskModuleName(moduleConfig.moduleName)) {
    const taskDefaults = getTaskListFieldDefaultsFromPrd(state.prdTableRows);
    if (Object.prototype.hasOwnProperty.call(taskDefaults, label)) {
      return taskDefaults[label] || "";
    }
  }
  return "";
}

function renderModuleBoundBlueprintGroup(group, index = 0) {
  const hasMultipleVersions = (group.versions || []).length > 1;
  const singleVersionName = group.versions?.[0]?.name || "";
  return `
    <section class="prd-variable-module-row ${hasMultipleVersions ? "has-versions" : ""}">
      <article class="prd-variable-module-name">
        <div class="prd-variable-module-kicker">
          <i>${String(index + 1).padStart(2, "0")}</i>
          <span>页面模块</span>
        </div>
        <strong>${escapeHtml(group.moduleName)}</strong>
        <div class="prd-variable-module-meta">
          ${hasMultipleVersions ? `<b>${group.versions.length} 个版本</b>` : (singleVersionName ? `<b>${escapeHtml(singleVersionName)}</b>` : "")}
        </div>
        ${group.allowManualVersions ? `
          <button
            type="button"
            class="prd-add-version-btn"
            data-prd-add-module-version="${escapeAttr(group.moduleName)}"
          >新增版本</button>
        ` : ""}
      </article>
      <div class="prd-variable-section-list">
        ${renderModuleBoundBlueprintVersionMatrix(group)}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintVersionMatrix(group) {
  const versions = group.versions || [];
  const baseSections = versions[0]?.sections || [];
  const dimensionGroups = getBlueprintVersionDimensionGroups(versions);
  const versionModuleKey = group.versionModuleKey || group.moduleName;
  const usesConsumptionReturnMatrix =
    group.moduleSchemaId === "核心玩法模块-抽奖消返-4列";
  const hasLongCopy = group.fields.some(
    (field) => String(field.value || "").trim().length >= 36,
  );
  const renderStandardMatrix = (sections, showAddVersion = true) => `
    <section
      class="prd-variable-version-matrix${hasLongCopy ? " has-long-copy" : ""}"
      style="--prd-version-count:${versions.length}"
    >
      ${dimensionGroups.length > 1 ? `
        <div class="prd-variable-matrix-dimensions">
          <span>维度</span>
          ${dimensionGroups.map((dimension) => `
            <strong style="grid-column: span ${dimension.count};">
              ${escapeHtml(dimension.title)}
              <em>${dimension.count} 个版本</em>
            </strong>
          `).join("")}
        </div>
      ` : ""}
      <div class="prd-variable-matrix-head">
        <span class="prd-variable-matrix-actions">
          ${
            group.isContentLocked || !showAddVersion
              ? "配置项"
              : `
                <button
                  type="button"
                  class="prd-variable-matrix-add-version"
                  data-prd-add-module-version="${escapeAttr(versionModuleKey)}"
                  aria-label="新增人群"
                >＋ 人群</button>
              `
          }
        </span>
        ${versions.map((version) =>
          renderModuleBoundBlueprintMatrixHeadCell(
            version,
            versionModuleKey,
            group.isContentLocked,
          ),
        ).join("")}
      </div>
      ${sections.map(({ section, sectionIndex }) =>
        renderModuleBoundBlueprintMatrixSection(
          section,
          sectionIndex,
          versions,
          group.isContentLocked,
        ),
      ).join("")}
    </section>
  `;

  const indexedSections = baseSections.map((section, sectionIndex) => ({
    section,
    sectionIndex,
  }));
  if (!usesConsumptionReturnMatrix) {
    return renderStandardMatrix(indexedSections);
  }

  const returnSection = indexedSections.find(
    ({ section }) => section.title === "返券配置",
  );
  const standardSections = indexedSections.filter(
    ({ section }) => section.title !== "返券配置",
  );
  return `
    <section class="prd-variable-version-matrix prd-consumption-return-table">
      ${renderConsumptionReturnBlueprintMatrix(
        returnSection?.sectionIndex ?? 0,
        versions,
        group.isContentLocked,
        versionModuleKey,
      )}
    </section>
    ${renderStandardMatrix(standardSections, false)}
  `;
}

function renderConsumptionReturnBlueprintMatrix(
  sectionIndex,
  versions,
  isContentLocked = false,
  versionModuleKey = "",
) {
  const getField = (version, key) =>
    version.sections?.[sectionIndex]?.fields?.find((field) => field.key === key);
  const renderField = (field, label) => {
    if (!field) return "";
    const row = state.prdTableRows[field.rowIndex] || { value: "" };
    return `
      <label class="prd-consumption-return-input">
        <span>${escapeHtml(label)}</span>
        <textarea
          rows="1"
          aria-label="${escapeAttr(field.label)}"
          ${isContentLocked ? "readonly" : ""}
          data-prd-table-row="${field.rowIndex}"
        >${escapeHtml(row.value || "")}</textarea>
      </label>
    `;
  };
  const renderCouponCell = (version, thresholdKey, amountKey) => `
    <div class="prd-consumption-return-cell">
      ${renderField(getField(version, thresholdKey), "满")}
      ${renderField(getField(version, amountKey), "赠")}
    </div>
  `;
  const renderVersionCell = (version) => {
    if (!version.isManual) {
      return `
        <div class="prd-consumption-return-version">
          <strong>${escapeHtml(version.name)}</strong>
          ${version.dimensionTitle ? `<span>${escapeHtml(version.dimensionTitle)}</span>` : ""}
        </div>
      `;
    }
    return `
      <div class="prd-consumption-return-version is-manual">
        <input
          type="text"
          value="${escapeAttr(version.name)}"
          aria-label="版本名称"
          ${isContentLocked ? "readonly" : ""}
          data-prd-version-name
          data-prd-version-module-key="${escapeAttr(versionModuleKey)}"
          data-prd-version-id="${escapeAttr(version.id)}"
        />
        ${
          isContentLocked
            ? ""
            : `
              <button
                type="button"
                aria-label="删除版本"
                title="删除版本"
                data-prd-delete-module-version="${escapeAttr(version.id)}"
                data-prd-version-module-key="${escapeAttr(versionModuleKey)}"
              >×</button>
            `
        }
      </div>
    `;
  };

  return `
    <section class="prd-variable-matrix-section prd-consumption-return-section">
      <div class="prd-variable-matrix-section-head">
        <strong class="prd-consumption-return-title">
          返券配置
          <b>PRD</b>
        </strong>
      </div>
      <div class="prd-consumption-return-matrix">
        <div class="prd-consumption-return-head">
          <strong class="prd-consumption-return-version-head">
            <span>版本</span>
            ${
              isContentLocked
                ? ""
                : `
                  <button
                    type="button"
                    class="prd-variable-matrix-add-version"
                    data-prd-add-module-version="${escapeAttr(versionModuleKey)}"
                    aria-label="新增返券配置人群"
                  >＋ 人群</button>
                `
            }
          </strong>
          <strong>第1档 · 抽奖任务</strong>
          <strong>第2档 · 消耗返（门槛1）</strong>
          <strong>第3档 · 消耗返（门槛2）</strong>
          <strong>第4档 · 消耗返（门槛3）</strong>
        </div>
        ${versions.map((version) => `
          <div class="prd-consumption-return-row">
            ${renderVersionCell(version)}
            <div class="prd-consumption-return-cell is-draw">
              ${renderField(getField(version, "consumeAmountText1"), "累计消耗")}
            </div>
            ${renderCouponCell(version, "consumeAmountText2", "amountText1")}
            ${renderCouponCell(version, "consumeAmountText3", "amountText2")}
            ${renderCouponCell(version, "consumeAmountText4", "amountText3")}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintMatrixHeadCell(version, versionModuleKey, isContentLocked = false) {
  if (!version.isManual) {
    return `
      <strong>
        ${escapeHtml(version.name)}
        ${version.dimensionTitle ? `<em>${escapeHtml(version.dimensionTitle)}</em>` : ""}
      </strong>
    `;
  }
  return `
    <strong class="prd-variable-version-head is-manual">
      <input
        type="text"
        value="${escapeAttr(version.name)}"
        aria-label="版本名称"
        ${isContentLocked ? "readonly" : ""}
        data-prd-version-name
        data-prd-version-module-key="${escapeAttr(versionModuleKey)}"
        data-prd-version-id="${escapeAttr(version.id)}"
      />
      ${
        isContentLocked
          ? ""
          : `
            <button
              type="button"
              aria-label="删除版本"
              title="删除版本"
              data-prd-delete-module-version="${escapeAttr(version.id)}"
              data-prd-version-module-key="${escapeAttr(versionModuleKey)}"
            >×</button>
          `
      }
    </strong>
  `;
}

function getBlueprintVersionDimensionGroups(versions = []) {
  const groups = [];
  versions.forEach((version) => {
    const title = version.dimensionTitle || "默认维度";
    const lastGroup = groups[groups.length - 1];
    if (lastGroup?.title === title) {
      lastGroup.count += 1;
    } else {
      groups.push({ title, count: 1 });
    }
  });
  return groups;
}

function renderModuleBoundBlueprintMatrixSection(
  section,
  sectionIndex,
  versions,
  isContentLocked = false,
) {
  const className = section.className ? ` ${section.className}` : "";
  const sectionTitle = section.title === "模块内容" ? "" : section.title;
  const paragraphCountField = (section.fields || []).find(
    (field) => field.key === "paragraphCount",
  );
  const taskCountField = (section.fields || []).find(
    (field) => field.key === "taskCount",
  );
  const paragraphCount = paragraphCountField
    ? clamp(
        Number(state.prdTableRows[paragraphCountField.rowIndex]?.value || paragraphCountField.value || 4),
        1,
        4,
      )
    : 4;
  const paragraphCountRowIndexes = paragraphCountField
    ? versions
        .map((version) =>
          version.sections?.[sectionIndex]?.fields?.find(
            (field) => field.key === "paragraphCount",
          )?.rowIndex,
        )
        .filter((rowIndex) => Number.isInteger(rowIndex))
    : [];
  const paragraphOrderByPrefix = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };
  const paragraphControls = paragraphCountField
    ? `
      <div class="prd-paragraph-stepper" aria-label="段落数量">
        <button
          type="button"
          data-prd-paragraph-count-delta="-1"
          data-prd-paragraph-count-rows="${escapeAttr(paragraphCountRowIndexes.join(","))}"
          aria-label="减少一段"
          ${paragraphCount <= 1 ? "disabled" : ""}
        >−</button>
        <span>${paragraphCount}</span>
        <button
          type="button"
          data-prd-paragraph-count-delta="1"
          data-prd-paragraph-count-rows="${escapeAttr(paragraphCountRowIndexes.join(","))}"
          aria-label="增加一段"
          ${paragraphCount >= 4 ? "disabled" : ""}
        >＋</button>
      </div>
    `
    : "";
  const taskCount = taskCountField
    ? Math.max(
        1,
        Math.round(
          Number(
            state.prdTableRows[taskCountField.rowIndex]?.value ||
              taskCountField.value ||
              3,
          ),
        ),
      )
    : 3;
  const taskCountRowIndexes = taskCountField
    ? versions
        .map((version) =>
          version.sections?.[sectionIndex]?.fields?.find(
            (field) => field.key === "taskCount",
          )?.rowIndex,
        )
        .filter((rowIndex) => Number.isInteger(rowIndex))
    : [];
  const taskCountControls = taskCountField
    ? `
      <div class="prd-paragraph-stepper" aria-label="任务数量">
        <button
          type="button"
          data-prd-task-count-delta="-1"
          data-prd-task-count-rows="${escapeAttr(taskCountRowIndexes.join(","))}"
          aria-label="减少一个任务"
          ${taskCount <= 1 ? "disabled" : ""}
        >−</button>
        <span>${taskCount}</span>
        <button
          type="button"
          data-prd-task-count-delta="1"
          data-prd-task-count-rows="${escapeAttr(taskCountRowIndexes.join(","))}"
          aria-label="增加一个任务"
        >＋</button>
      </div>
    `
    : "";
  const prizeFields = (section.fields || []).filter((field) =>
    /^(\d+)\.prize\d+$/.test(getPageTemplateFieldLocalCompoundKey(field)),
  );
  const firstPrizeMatch = prizeFields[0]
    ? getPageTemplateFieldLocalCompoundKey(prizeFields[0]).match(/^(\d+)\.prize\d+$/)
    : null;
  const prizeVersionNames = versions
    .filter((version) => !version.isBase && version.name)
    .map((version) => version.name);
  const prizeControls = firstPrizeMatch && !isContentLocked
    ? `
      <button
        type="button"
        class="prd-variable-prize-add"
        data-prd-prize-add
        data-prd-prize-module-index="${escapeAttr(prizeFields[0].moduleIndex)}"
        data-prd-prize-child-index="${escapeAttr(firstPrizeMatch[1])}"
        data-prd-prize-version-names="${escapeAttr(JSON.stringify(prizeVersionNames))}"
      >+ 奖品</button>
    `
    : "";
  const displaySectionTitle = sectionTitle || (taskCountField ? "任务数量" : "");
  const newTagFields = /^任务\d+$/.test(sectionTitle)
    ? versions
        .map((version) =>
          version.sections?.[sectionIndex]?.fields?.find((field) =>
            /\.showNewTag$/.test(getPageTemplateFieldLocalCompoundKey(field)),
          ),
        )
        .filter(Boolean)
    : [];
  const newTagRowIndexes = newTagFields
    .map((field) => field.rowIndex)
    .filter((rowIndex) => Number.isInteger(rowIndex));
  const isNewTagChecked = newTagFields.some((field) =>
    /^(?:true|1|yes|是|开启|开|new)$/i.test(String(state.prdTableRows[field.rowIndex]?.value || "")),
  );
  const newTagControl = newTagRowIndexes.length
    ? `
      <button
        type="button"
        class="prd-task-new-tag-toggle ${isNewTagChecked ? "is-checked" : ""}"
        data-prd-task-new-tag-rows="${escapeAttr(newTagRowIndexes.join(","))}"
        aria-pressed="${isNewTagChecked ? "true" : "false"}"
        aria-label="${isNewTagChecked ? "关闭" : "开启"}NEW标签"
        ${isContentLocked ? "disabled" : ""}
      >
        <i aria-hidden="true"></i>
        <span>NEW标签</span>
      </button>
    `
    : "";
  return `
    <section class="prd-variable-matrix-section${className}">
      ${
        displaySectionTitle
          ? `<div class="prd-variable-matrix-section-head"><strong>${escapeHtml(displaySectionTitle)}${newTagControl}</strong><div class="prd-variable-section-actions">${paragraphControls}${taskCountControls}${prizeControls}</div></div>`
          : ""
      }
      <div class="prd-variable-matrix-rows">
        ${(section.fields || []).map((field, fieldIndex) => {
          if (field.key === "paragraphCount" || field.key === "taskCount") return "";
          if (/\.showNewTag$/.test(getPageTemplateFieldLocalCompoundKey(field))) return "";
          const paragraphPrefix = Object.keys(paragraphOrderByPrefix).find((prefix) =>
            String(field.key || "").startsWith(prefix),
          );
          if (paragraphPrefix && paragraphOrderByPrefix[paragraphPrefix] > paragraphCount) return "";
          return renderModuleBoundBlueprintMatrixRow(field, {
            sectionIndex,
            fieldIndex,
            versions,
            isContentLocked,
            prizeCount: prizeFields.length,
            prizeVersionNames,
          });
        }).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintMatrixRow(
  baseField,
  { sectionIndex, fieldIndex, versions, isContentLocked = false, prizeCount = 0, prizeVersionNames = [] },
) {
  const prizeMatch = getPageTemplateFieldLocalCompoundKey(baseField).match(/^(\d+)\.prize(\d+)$/);
  const prizeDeleteButton = prizeMatch && !isContentLocked
    ? `
      <button
        type="button"
        class="prd-variable-prize-delete"
        data-prd-prize-delete
        data-prd-prize-module-index="${escapeAttr(baseField.moduleIndex)}"
        data-prd-prize-child-index="${escapeAttr(prizeMatch[1])}"
        data-prd-prize-index="${escapeAttr(prizeMatch[2])}"
        data-prd-prize-version-names="${escapeAttr(JSON.stringify(prizeVersionNames))}"
        aria-label="删除${escapeAttr(baseField.label)}"
        ${prizeCount <= 1 ? "disabled" : ""}
      >×</button>
    `
    : "";
  return `
    <div class="prd-variable-matrix-row ${baseField.isPrdKey ? "is-prd-key" : ""}">
      <span>
        <i>${escapeHtml(baseField.label)}</i>
        <em>${baseField.isPrdKey ? "<b>PRD</b>" : ""}${prizeDeleteButton}</em>
      </span>
      ${versions.map((version) => {
        const field = version.sections?.[sectionIndex]?.fields?.[fieldIndex] || baseField;
        return renderModuleBoundBlueprintMatrixCell(field, isContentLocked);
      }).join("")}
    </div>
  `;
}

function renderModuleBoundBlueprintMatrixCell(field, isContentLocked = false) {
  const row = state.prdTableRows[field.rowIndex] || { value: "" };
  if (isPageTemplatePrizeField(field)) {
    const normalizedValue = normalizePrizeLibraryValue(row.value);
    if (row.value && normalizedValue && row.value !== normalizedValue) {
      state.prdTableRows[field.rowIndex].value = normalizedValue;
      row.value = normalizedValue;
    }
    return renderFixedPrizeLibrarySelect(
      row.value,
      `${isContentLocked ? "disabled" : ""} data-prd-prize-table-row="${escapeAttr(field.rowIndex)}"`,
      field.label,
    );
  }
  if (field.type === "boolean") {
    const checked = /^(?:true|1|yes|是|开启|开|new)$/i.test(String(row.value || "").trim());
    return `
      <label class="prd-variable-checkbox">
        <input
          type="checkbox"
          data-prd-table-row="${field.rowIndex}"
          ${checked ? "checked" : ""}
          ${isContentLocked ? "disabled" : ""}
        />
        <span>${checked ? "开启" : "关闭"}</span>
      </label>
    `;
  }
  return `
    <textarea
      rows="${Math.min(2, getBlueprintTextareaRows(row.value))}"
      aria-label="${escapeAttr(field.label)}"
      ${isContentLocked ? "readonly" : ""}
      data-prd-table-row="${field.rowIndex}"
    >${escapeHtml(row.value || "")}</textarea>
  `;
}

function renderModuleBoundBlueprintVersion(version) {
  return `
    <section class="prd-variable-version">
      <header>
        <span>版本</span>
        <strong>${escapeHtml(version.name)}</strong>
        ${version.dimensionTitle ? `<em>${escapeHtml(version.dimensionTitle)}</em>` : ""}
      </header>
      <div class="prd-variable-version-sections">
        ${version.sections.map(renderModuleBoundBlueprintSection).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintSection(section) {
  const className = section.className ? ` ${section.className}` : "";
  const sectionTitle = section.title === "模块内容" ? "" : section.title;
  return `
    <section class="prd-variable-section${className}">
      ${sectionTitle ? `<strong>${escapeHtml(sectionTitle)}</strong>` : ""}
      <div class="prd-variable-field-grid">
        ${section.fields.map(renderModuleBoundBlueprintField).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintField(field) {
  const row = state.prdTableRows[field.rowIndex] || { value: "" };
  const sizeClass = field.size ? ` is-${field.size}` : "";
  if (field.type === "boolean") {
    const checked = /^(?:true|1|yes|是|开启|开|new)$/i.test(String(row.value || "").trim());
    return `
      <label class="prd-variable-field${sizeClass}">
        <span>${escapeHtml(field.label)}</span>
        <label class="prd-variable-checkbox">
          <input
            type="checkbox"
            data-prd-table-row="${field.rowIndex}"
            ${checked ? "checked" : ""}
          />
          <span>${checked ? "开启" : "关闭"}</span>
        </label>
      </label>
    `;
  }
  return `
    <label class="prd-variable-field${sizeClass}">
      <span>${escapeHtml(field.label)}</span>
      <textarea
        rows="${getBlueprintTextareaRows(row.value)}"
        data-prd-table-row="${field.rowIndex}"
      >${escapeHtml(row.value || "")}</textarea>
    </label>
  `;
}

function renderPrdTemplateMapRow({ index, module, row }) {
  const moduleName = module?.name || "";
  const moduleKind = module?.kind || "";
  const moduleDetail = module?.detail || "";
  const key = String(row?.key || "").trim();
  const value = String(row?.value || "").trim();
  return `
    <section class="prd-template-map-row">
      <article class="prd-template-module-cell ${module ? "" : "is-empty"}">
        <b>${String(index + 1).padStart(2, "0")}</b>
        <div>
          <span>${escapeHtml(moduleKind || "空模块位")}</span>
          <strong>${escapeHtml(moduleName || "模板没有对应模块")}</strong>
          <em>${escapeHtml(moduleDetail || (module ? "页面顶层模块" : "PRD 信息多于模板模块"))}</em>
        </div>
      </article>
      <label class="prd-template-info-cell ${row ? "" : "is-empty"}">
        <span>${escapeHtml(key || "无 PRD 字段")}</span>
        <textarea
          rows="${getBlueprintTextareaRows(value)}"
          ${row ? `data-prd-table-row="${row.sourceIndex}"` : "readonly"}
        >${escapeHtml(value)}</textarea>
      </label>
    </section>
  `;
}

function getTemplateTopLevelModuleItems(nodes = []) {
  return (nodes || [])
    .filter((node) => node && node.type !== "background")
    .map((node, index) => {
      const schema = findAtomSchema(node.schemaId) ||
        moleculeSchemas.find((item) => item.id === node.schemaId || item.name === node.schemaId);
      const isMolecule = node.type === "molecule" || schema?.type === "molecule";
      return {
        id: node.id || `template-module-${index + 1}`,
        schemaId: node.schemaId,
        order: index + 1,
        name: getGlobalComponentDisplayName(
          node.schemaId,
          node.name || schema?.name || `模块 ${index + 1}`,
        ),
        kind: isMolecule ? "分子模块" : "原子组件",
        detail: isMolecule
          ? `${(node.children || []).length} 个子组件`
          : schema?.category || schema?.description || "页面组件",
      };
    });
}

function renderLegacyPrdTablePackageBlueprint() {
  const blueprint = getPrdTableBlueprint();
  return renderBlueprintAudienceOverview({
    audienceGroups: blueprint.audiences.map((audience) => ({
      audience,
      contexts: [audience],
    })),
    slots: blueprint.slots,
    unitLabel: "页面",
  });
}

function renderAudiencePackageBlueprint() {
  return renderBlueprintAudienceOverview({
    audienceGroups: demoActivityPackage.audiences.map((audience) => ({
      audience,
      contexts: [audience],
    })),
    slots: demoActivityPackage.slots,
    unitLabel: "页面",
  });
}

function renderTimePackageBlueprint() {
  return renderBlueprintAudienceOverview({
    audienceGroups: demoTimeActivityPackage.audiences.map((audience) => ({
      audience,
      contexts: demoTimeActivityPackage.phases
        .map((phase) =>
          demoTimeActivityPackage.scenes.find(
            (scene) =>
              scene.audienceId === audience.id &&
              scene.phaseId === phase.id,
          ),
        )
        .filter(Boolean),
    })),
    slots: demoTimeActivityPackage.slots,
    unitLabel: "场景",
  });
}

function getBlueprintOverviewConfig() {
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    const blueprint = getPrdTableBlueprint();
    return {
      audienceGroups: blueprint.audiences.map((audience) => ({
        audience,
        contexts: [audience],
      })),
      slots: blueprint.slots,
      unitLabel: "页面",
    };
  }

  if (state.selectedDemoPackageId === demoTimeActivityPackage.id) {
    return {
      audienceGroups: demoTimeActivityPackage.audiences.map((audience) => ({
        audience,
        contexts: demoTimeActivityPackage.phases
          .map((phase) =>
            demoTimeActivityPackage.scenes.find(
              (scene) =>
                scene.audienceId === audience.id &&
                scene.phaseId === phase.id,
            ),
          )
          .filter(Boolean),
      })),
      slots: demoTimeActivityPackage.slots,
      unitLabel: "场景",
    };
  }

  return {
    audienceGroups: demoActivityPackage.audiences.map((audience) => ({
      audience,
      contexts: [audience],
    })),
    slots: demoActivityPackage.slots,
    unitLabel: "页面",
  };
}

function getBlueprintAudienceColumnWidth(group) {
  return 360;
}

function renderBlueprintAudienceOverview({ audienceGroups, slots, unitLabel }) {
  const contexts = audienceGroups.flatMap((group) => group.contexts);
  const activityInputOwners = new Map();
  const returningClass = state.blueprintReturningFromPreview
    ? " is-returned-from-preview"
    : "";

  contexts.forEach((context) => {
    context.modules.forEach((module) => {
      if (module.inputScope !== "activity") return;
      const key = `${module.slot}|${module.component}`;
      if (!activityInputOwners.has(key)) activityInputOwners.set(key, context.id);
    });
  });

  return `
    <section class="blueprint-confirm blueprint-overview${returningClass}">
      <header class="blueprint-minimal-head">
        <div>
          <span>PRD 解析结果</span>
          <h1>确认活动策略</h1>
          <p>确认系统拆出的活动目标、人群策略和页面模块，详细变量可在预览阶段继续编辑。</p>
        </div>
        <button class="blueprint-side-generate" data-demo-generate-activity>
          <span>确认并预览</span>
          <b>→</b>
        </button>
      </header>

      ${renderBlueprintActivityMap({
        contexts,
        audienceGroups,
        slots,
        activityInputOwners,
        unitLabel,
      })}
    </section>
  `;
}

function renderBlueprintActivityMap({
  contexts,
  audienceGroups,
  slots,
  activityInputOwners,
  unitLabel,
}) {
  return `
    <section class="blueprint-strategy-board">
      ${renderBlueprintStrategySummary({ contexts, audienceGroups, slots, unitLabel })}
      <section class="blueprint-strategy-audiences">
        <header>
          <div>
            <span>人群策略拆解</span>
          </div>
          <em>${audienceGroups.length} 类人群 · ${contexts.length} 个${unitLabel}</em>
        </header>
        <div
          class="blueprint-strategy-columns"
          style="--blueprint-strategy-columns:${audienceGroups.length}"
        >
          ${audienceGroups.map((group, index) =>
            renderBlueprintStrategyAudience({
              group,
              index,
              slots,
              activityInputOwners,
            }),
          ).join("")}
        </div>
      </section>
    </section>
  `;
}

function renderBlueprintStrategySummary({ contexts, audienceGroups, slots, unitLabel }) {
  const moduleCount = contexts.reduce((sum, context) => sum + context.modules.length, 0);
  return `
    <section class="blueprint-activity-hero">
      <div class="blueprint-activity-hero-main">
        <span>活动基础信息</span>
        <input
          value="${escapeAttr(getBlueprintActivityName())}"
          data-blueprint-prd-field="activityName"
          aria-label="活动名称"
        />
        <label>
          <b>核心目标</b>
          <textarea
            rows="2"
            data-blueprint-prd-field="activityGoal"
          >${escapeHtml(getBlueprintActivityFact(contexts, "activityGoal"))}</textarea>
        </label>
      </div>
      <div class="blueprint-activity-hero-facts">
        ${renderBlueprintStrategyFact({
          label: "入口",
          value: getBlueprintActivityFact(contexts, "activityEntrance"),
          key: "activityEntrance",
        })}
        ${renderBlueprintStrategyFact({
          label: "时间",
          value: getBlueprintActivityFact(contexts, "activityTime"),
          key: "activityTime",
        })}
        ${renderBlueprintStrategyFact({
          label: "人群页面",
          value: `${audienceGroups.length} 类人群，各生成 1 套${unitLabel}`,
          readonly: true,
        })}
        ${renderBlueprintStrategyFact({
          label: "模块组成",
          value: `${slots.length} 个模块位置，合计 ${moduleCount} 个模块实例`,
          readonly: true,
        })}
      </div>
    </section>
  `;
}

function renderBlueprintStrategyFact({ label, value, key, readonly = false }) {
  return `
    <label class="blueprint-strategy-fact">
      <span>${escapeHtml(label)}</span>
      <textarea
        rows="2"
        ${key ? `data-blueprint-prd-field="${escapeAttr(key)}"` : ""}
        ${readonly ? "readonly" : ""}
      >${escapeHtml(value)}</textarea>
    </label>
  `;
}

function renderBlueprintStrategyAudience({ group, index, slots, activityInputOwners }) {
  return `
    <article class="blueprint-strategy-audience">
      <header>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <em>人群策略</em>
          <input
            value="${escapeAttr(group.audience.name)}"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${escapeHtml(group.audience.ruleSummary || group.audience.description || `${group.contexts.length} 个页面场景`)}</textarea>
        </div>
      </header>
      <div class="blueprint-strategy-pages">
        ${group.contexts.map((context) =>
          renderBlueprintStrategyPage({
            context,
            group,
            slots,
            activityInputOwners,
          }),
        ).join("")}
      </div>
    </article>
  `;
}

function renderBlueprintStrategyPage({ context, group, slots, activityInputOwners }) {
  const phase = context.phaseId
    ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
    : null;
  const moduleItems = getBlueprintVisibleModuleItems(context, slots, activityInputOwners);
  return `
    <section class="blueprint-strategy-page">
      ${phase ? `
        <header>
          <span>${escapeHtml(phase.name)}</span>
        </header>
      ` : ""}
      <div class="blueprint-strategy-page-body">
        <div class="blueprint-strategy-pair-head">
          <span>页面模块</span>
          <span>模块策略</span>
        </div>
        <div class="blueprint-strategy-page-grid">
          ${moduleItems.map((item) => `
            <section class="blueprint-strategy-row">
              <div class="blueprint-page-skeleton-wrap">
                ${renderBlueprintPageSkeletonBlock({
                  context,
                  ...item,
                })}
              </div>
              <div class="blueprint-strategy-content-list">
                ${renderBlueprintStrategyContentItem({
                  context,
                  group,
                  ...item,
                })}
              </div>
            </section>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function getBlueprintVisibleModuleItems(context, slots, activityInputOwners) {
  return context.modules
    .flatMap((module) => {
      const slot = slots.find((item) => item.id === module.slot) || {
        id: module.slot,
        label: module.slot,
      };
      const activityKey = `${module.slot}|${module.component}`;
      const baseItem = {
        slot,
        module,
        isActivityReference:
          module.inputScope === "activity" &&
          activityInputOwners.get(activityKey) !== context.id,
      };
      const prependedItems = (module.prependComponents || []).map((item) => ({
        slot,
        module: {
          id: `${module.id}__${item.id}`,
          slot: module.slot,
          name: item.name || getBlueprintComponentDisplayName(item.component),
          component: item.component,
          rows: clone(item.rows || []),
          isGeneratedCompanion: true,
          blueprintRole: "承接优惠券权益展示，先给用户明确可领取的活动利益。",
          blueprintRule: "进入页面后直接展示优惠券信息，不改动组件默认文案。",
          blueprintBenefit: "红包优惠券",
        },
        isActivityReference: false,
      }));
      return [...prependedItems, baseItem];
    })
    .map((item, slotIndex) => ({
      ...item,
      slotIndex,
    }));
}

function renderBlueprintPageSkeleton({ context, moduleItems }) {
  return `
    <div class="blueprint-page-skeleton">
      ${moduleItems.map((item) =>
        renderBlueprintPageSkeletonBlock({
          context,
          ...item,
        }),
      ).join("")}
    </div>
  `;
}

function renderBlueprintPageSkeletonBlock({ slot, module }) {
  return `
    <article class="blueprint-page-skeleton-block">
      ${renderBlueprintModuleSkeleton(slot, module)}
    </article>
  `;
}

function getBlueprintComponentDisplayName(component) {
  if (!component) return "模块";
  const normalized = component.replace("molecule:", "");
  if (getModuleKind(normalized) === "hero") return "头图模块";
  if (normalized.includes("九宫格")) return "抽奖模块";
  if (normalized === "RedPacketCoupon") return "发券模块";
  if (normalized === "QualityVideoDiagnosis") return "优质视频诊断";
  if (normalized === "ContentModuleImage" || normalized === "DoublePromotion") return "优质案例";
  const schema = findAtomSchema(normalized) ||
    moleculeSchemas.find((item) => item.name === normalized || item.id === normalized);
  return getGlobalComponentDisplayName(schema?.id || normalized, schema?.name || normalized);
}

function renderBlueprintModuleSkeleton(slot, module) {
  const kind = getModuleKind(module?.component || slot.id);
  const type =
    kind === "reward"
      ? "reward"
      : kind === "play" || kind === "task"
        ? "play"
        : "content";
  const label = getBlueprintComponentDisplayName(module?.component) || module?.name || "模块";
  return `
    <div class="blueprint-module-skeleton is-${type}" aria-hidden="true">
      <strong>${escapeHtml(label)}</strong>
    </div>
  `;
}

function renderBlueprintStrategyContentItem({
  context,
  group,
  module,
  slot,
  slotIndex,
  isActivityReference,
}) {
  if (!module.isGeneratedCompanion) {
    syncMoleculeBlueprintRows(module);
    ensureBlueprintVariantGroups(module);
  }
  const summary = getBlueprintModuleBrief(module, slot);
  const fieldAttr = (key) =>
    module.isGeneratedCompanion
      ? "readonly"
      : `data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|${key}`)}"`;
  return `
    <article
      class="blueprint-strategy-content-item"
    >
      <div class="blueprint-strategy-module-body">
        <label>
          <span>策略职责</span>
          <textarea
            rows="2"
            ${fieldAttr("blueprintRole")}
          >${escapeHtml(summary.role)}</textarea>
        </label>
        <label>
          <span>核心规则</span>
          <textarea
            rows="2"
            ${fieldAttr("blueprintRule")}
          >${escapeHtml(summary.rule)}</textarea>
        </label>
        <label>
          <span>利益点</span>
          <textarea
            rows="2"
            ${fieldAttr("blueprintBenefit")}
          >${escapeHtml(summary.benefit)}</textarea>
        </label>
      </div>
    </article>
  `;
}

function renderBlueprintJourneyRoot({ contexts, audienceGroups }) {
  return `
    <section class="blueprint-journey-root">
      <span>活动</span>
      <input
        value="${escapeAttr(getBlueprintActivityName())}"
        data-blueprint-prd-field="activityName"
        aria-label="活动名称"
      />
      <div>
        <label>
          <b>目标</b>
          <input
            value="${escapeAttr(getBlueprintActivityFact(contexts, "activityGoal"))}"
            data-blueprint-prd-field="activityGoal"
            aria-label="活动目标"
          />
        </label>
        <label>
          <b>入口</b>
          <input
            value="${escapeAttr(getBlueprintActivityFact(contexts, "activityEntrance"))}"
            data-blueprint-prd-field="activityEntrance"
            aria-label="入口下发"
          />
        </label>
        <label>
          <b>人群</b>
          <input
            value="${escapeAttr(`${audienceGroups.length} 类人群`)}"
            readonly
            aria-label="人群数量"
          />
        </label>
      </div>
    </section>
  `;
}

function renderBlueprintJourneyLane({ group, index, slots, activityInputOwners }) {
  return `
    <section class="blueprint-journey-lane">
      <header class="blueprint-journey-audience">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <input
            value="${escapeAttr(group.audience.name)}"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${escapeHtml(group.audience.ruleSummary || group.audience.description || `${group.contexts.length} 个页面场景`)}</textarea>
        </div>
      </header>
      <div class="blueprint-journey-pages">
        ${group.contexts.map((context) =>
          renderBlueprintJourneyPage({
            context,
            group,
            slots,
            activityInputOwners,
          }),
        ).join("")}
      </div>
    </section>
  `;
}

function renderBlueprintJourneyPage({
  context,
  group,
  slots,
  activityInputOwners,
}) {
  const phase = context.phaseId
    ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
    : null;
  const modules = slots
    .map((slot, slotIndex) => ({
      slot,
      slotIndex,
      module: context.modules.find((candidate) => candidate.slot === slot.id),
    }))
    .filter((item) => item.module);

  return `
    <article class="blueprint-journey-page">
      <header>
        <span>${phase ? escapeHtml(phase.name) : "落地页"}</span>
        <strong>${escapeHtml(getBlueprintContextName(context))}</strong>
      </header>
      <div class="blueprint-journey-flow">
        ${modules.map(({ slot, slotIndex, module }, index) => {
          const activityKey = `${module.slot}|${module.component}`;
          return renderBlueprintJourneyModule({
            context,
            group,
            module,
            slot,
            slotIndex,
            connectorLabel: index < modules.length - 1
              ? getBlueprintJourneyConnectorLabel(slot, modules[index + 1]?.slot)
              : "",
            isActivityReference:
              module.inputScope === "activity" &&
              activityInputOwners.get(activityKey) !== context.id,
          });
        }).join("")}
      </div>
    </article>
  `;
}

function getBlueprintJourneyConnectorLabel(slot, nextSlot) {
  if (!nextSlot) return "";
  const from = slot.label || "";
  const to = nextSlot.label || "";
  if (from.includes("头图")) return "吸引进入";
  if (to.includes("内容")) return "承接转化";
  if (from.includes("玩法")) return "完成动作";
  return "继续浏览";
}

function renderBlueprintJourneyModule({
  context,
  group,
  module,
  slot,
  slotIndex,
  connectorLabel,
  isActivityReference,
}) {
  syncMoleculeBlueprintRows(module);
  ensureBlueprintVariantGroups(module);
  const summary = getBlueprintModuleBrief(module, slot);
  const contextName = getBlueprintContextName(context);
  return `
    <section class="blueprint-journey-module">
      <article class="blueprint-journey-node">
        <b>${String(slotIndex + 1).padStart(2, "0")}</b>
        <div class="blueprint-journey-node-main">
          <div>
            <span>${escapeHtml(slot.label)}</span>
            <input
              value="${escapeAttr(module.name)}"
              data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|name`)}"
              aria-label="${escapeAttr(`${contextName} ${slot.label} 模块名称`)}"
            />
          </div>
          ${isActivityReference ? `
            <p>活动公共内容，与首个人群保持一致</p>
          ` : `
            <div class="blueprint-journey-node-notes">
              <label>
                <span>规则</span>
                <textarea
                  rows="1"
                  data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintRule`)}"
                >${escapeHtml(summary.rule)}</textarea>
              </label>
              <label>
                <span>利益</span>
                <textarea
                  rows="1"
                  data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintBenefit`)}"
                >${escapeHtml(summary.benefit)}</textarea>
              </label>
            </div>
          `}
        </div>
        <em>${escapeHtml(summary.tags[0] || "模块")}</em>
        <div class="blueprint-module-controls">
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|up`)}"
            aria-label="${escapeAttr(`上移 ${module.name}`)}"
          >↑</button>
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|down`)}"
            aria-label="${escapeAttr(`下移 ${module.name}`)}"
          >↓</button>
        </div>
      </article>
      ${connectorLabel ? `
        <div class="blueprint-journey-connector" aria-hidden="true">
          <i></i>
          <span>${escapeHtml(connectorLabel)}</span>
        </div>
      ` : ""}
    </section>
  `;
}

function renderBlueprintMapAudience({ group, index, slots, activityInputOwners }) {
  return `
    <article class="blueprint-map-audience-card">
      <header class="blueprint-map-audience-head">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <input
            value="${escapeAttr(group.audience.name)}"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${escapeHtml(group.audience.ruleSummary || group.audience.description || `${group.contexts.length} 个页面场景`)}</textarea>
        </div>
      </header>
      <div class="blueprint-map-audience-body">
        <section class="blueprint-map-structure">
          <header>
            <span>结构</span>
            <strong>页面里有什么模块</strong>
          </header>
          <div class="blueprint-map-pages">
            ${group.contexts.map((context) =>
              renderBlueprintMapContextStructure({ context, slots }),
            ).join("")}
          </div>
        </section>
        <section class="blueprint-map-info">
          <header>
            <span>信息</span>
            <strong>这些模块分别要表达什么</strong>
          </header>
          <div class="blueprint-map-info-list">
            ${group.contexts.map((context) =>
              renderBlueprintMapContextInfo({
                context,
                group,
                slots,
                activityInputOwners,
              }),
            ).join("")}
          </div>
        </section>
      </div>
    </article>
  `;
}

function renderBlueprintMapContextStructure({ context, slots }) {
  const phase = context.phaseId
    ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
    : null;
  return `
    <div class="blueprint-map-page">
      ${phase ? `<em>${escapeHtml(phase.name)}</em>` : ""}
      <div class="blueprint-map-phone">
        ${slots.map((slot, slotIndex) => {
          const module = context.modules.find((candidate) => candidate.slot === slot.id);
          if (!module) return "";
          return `
            <article class="blueprint-map-module-node">
              <b>${String(slotIndex + 1).padStart(2, "0")}</b>
              <div>
                <span>${escapeHtml(slot.label)}</span>
                <strong>${escapeHtml(module.name)}</strong>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderBlueprintMapContextInfo({
  context,
  group,
  slots,
  activityInputOwners,
}) {
  const phase = context.phaseId
    ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
    : null;
  return `
    <div class="blueprint-map-info-context">
      ${phase ? `<em>${escapeHtml(phase.name)}</em>` : ""}
      ${slots.map((slot, slotIndex) => {
        const module = context.modules.find((candidate) => candidate.slot === slot.id);
        if (!module) return "";
        const activityKey = `${module.slot}|${module.component}`;
        return renderBlueprintInfoModule({
          context,
          module,
          slot,
          slotIndex,
          group,
          phase: null,
          isActivityReference:
            module.inputScope === "activity" &&
            activityInputOwners.get(activityKey) !== context.id,
        });
      }).join("")}
    </div>
  `;
}

function getFirstBlueprintRowValue(contexts, fields) {
  for (const context of contexts) {
    for (const module of context.modules || []) {
      const row = (module.rows || []).find((item) =>
        fields.some((field) => item.field.includes(field)),
      );
      if (row?.value) return row.value;
    }
  }
  return "";
}

function getBlueprintActivityFact(contexts, key) {
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    const blueprint = getPrdTableBlueprint();
    const defaults = {
      activityTime:
        getFirstBlueprintRowValue(contexts, ["活动时间", "时间", "任务周期"]) ||
        "与 PRD 信息表一致",
      activityEntrance:
        getFirstBlueprintRowValue(contexts, ["入口", "活动入口", "页面入口"]) ||
        "按 PRD 信息表配置",
      signupRule: "按 PRD 信息表配置",
      deliveryRule: "按 PRD 信息表配置",
      activityGoal: blueprint.activityGoal,
    };
    return blueprint[key] || defaults[key] || "";
  }

  const defaults = {
    activityTime:
      getFirstBlueprintRowValue(contexts, ["活动时间", "任务周期", "玩法时间"]) ||
      "与 PRD 活动时间一致",
    activityEntrance: "移动端抖音 / DOU+ 下单页 / 活动组件",
    signupRule: "需要报名",
    deliveryRule: "进入落地页下发",
    activityGoal: "原生-花钱-消耗",
  };
  return demoPrdBlueprint[key] || defaults[key] || "";
}

function getBlueprintActivityName() {
  return state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID
    ? getPrdTableBlueprint().activityName
    : demoPrdBlueprint.activityName;
}

function renderBlueprintBriefField({ label, value, key, multiline = false }) {
  const field = `
    ${multiline ? `
      <textarea
        rows="${getBlueprintTextareaRows(value)}"
        data-blueprint-prd-field="${escapeAttr(key)}"
      >${escapeHtml(value)}</textarea>
    ` : `
      <input
        value="${escapeAttr(value)}"
        data-blueprint-prd-field="${escapeAttr(key)}"
      />
    `}
  `;
  return `
    <label class="blueprint-brief-field ${multiline ? "is-multiline" : ""}">
      <span>${escapeHtml(label)}</span>
      ${field}
    </label>
  `;
}

function renderBlueprintActivityBrief(contexts, audienceGroups) {
  return `
    <section class="blueprint-activity-brief">
      <div class="blueprint-brief-title">
        <span>活动信息</span>
        <strong>这些是 PRD 的基础信息，可直接改。</strong>
      </div>
      <div class="blueprint-brief-grid">
        ${renderBlueprintBriefField({
          label: "活动名称",
          key: "activityName",
          value: getBlueprintActivityName(),
        })}
        ${renderBlueprintBriefField({
          label: "活动时间",
          key: "activityTime",
          value: getBlueprintActivityFact(contexts, "activityTime"),
        })}
        ${renderBlueprintBriefField({
          label: "活动目标",
          key: "activityGoal",
          value: getBlueprintActivityFact(contexts, "activityGoal"),
        })}
        ${renderBlueprintBriefField({
          label: "入口/下发",
          key: "activityEntrance",
          value: getBlueprintActivityFact(contexts, "activityEntrance"),
        })}
        ${renderBlueprintBriefField({
          label: "报名规则",
          key: "signupRule",
          value: getBlueprintActivityFact(contexts, "signupRule"),
        })}
      </div>
      <div class="blueprint-brief-note">
        <b>${audienceGroups.length}</b>
        <span>类人群 · 详细文案、券 ID、细分门槛进入预览后继续精修。</span>
      </div>
    </section>
  `;
}

function renderBlueprintStructureMap({ audienceGroups, slots, unitLabel }) {
  return `
    <section class="blueprint-structure-map">
      <header>
        <div>
          <span>结构图</span>
          <strong>这里只看活动骨架：人群、${unitLabel}、模块顺序。</strong>
        </div>
        <em>${audienceGroups.length} 类人群 · ${slots.length} 个模块位置</em>
      </header>
      <div class="blueprint-structure-rows">
        ${audienceGroups.map((group, groupIndex) => `
          <section class="blueprint-structure-row">
            <div class="blueprint-structure-audience">
              <span>${String(groupIndex + 1).padStart(2, "0")}</span>
              <input
                value="${escapeAttr(group.audience.name)}"
                data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|name`)}"
                aria-label="人群名称"
              />
            </div>
            <div class="blueprint-structure-pages">
              ${group.contexts.map((context) => `
                <div class="blueprint-structure-page">
                  ${context.phaseId ? `<em>${escapeHtml(demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)?.name || "")}</em>` : ""}
                  <div>
                    ${slots.map((slot, slotIndex) => {
                      const module = context.modules.find((candidate) => candidate.slot === slot.id);
                      if (!module) return "";
                      return `
                        <article class="blueprint-structure-module">
                          <b>${String(slotIndex + 1).padStart(2, "0")}</b>
                          <span>${escapeHtml(slot.label)}</span>
                          <strong>${escapeHtml(module.name)}</strong>
                        </article>
                      `;
                    }).join("")}
                  </div>
                </div>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBlueprintInformationBoard({
  contexts,
  audienceGroups,
  slots,
  activityInputOwners,
  unitLabel,
}) {
  return `
    <section class="blueprint-info-board">
      <header>
        <div>
          <span>信息确认</span>
          <strong>这里才放规则、利益点和可编辑摘要。</strong>
        </div>
        <em>${contexts.length} 个${unitLabel}</em>
      </header>
      ${renderBlueprintActivityBrief(contexts, audienceGroups)}
      <div class="blueprint-info-sections">
        <section class="blueprint-info-section">
          <header>
            <span>人群信息</span>
          </header>
          <div class="blueprint-audience-info-grid">
            ${audienceGroups.map((group) => `
              <label class="blueprint-audience-info-card">
                <span>${escapeHtml(group.audience.name)}</span>
                <textarea
                  rows="2"
                  data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|ruleSummary`)}"
                  aria-label="人群规则摘要"
                >${escapeHtml(group.audience.ruleSummary || group.audience.description || `${group.contexts.length} 个页面场景`)}</textarea>
              </label>
            `).join("")}
          </div>
        </section>
        ${slots.map((slot) => `
          <section class="blueprint-info-section">
            <header>
              <span>${escapeHtml(slot.label)}</span>
            </header>
            <div class="blueprint-module-info-grid">
              ${audienceGroups.map((group) =>
                group.contexts
                  .map((context) => {
                    const module = context.modules.find((candidate) => candidate.slot === slot.id);
                    if (!module) return "";
                    const phase = context.phaseId
                      ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
                      : null;
                    const activityKey = `${module.slot}|${module.component}`;
                    return renderBlueprintInfoModule({
                      context,
                      module,
                      slot,
                      group,
                      phase,
                      isActivityReference:
                        module.inputScope === "activity" &&
                        activityInputOwners.get(activityKey) !== context.id,
                    });
                  })
                  .join(""),
              ).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBlueprintInfoModule({
  context,
  module,
  slot,
  slotIndex,
  group,
  phase,
  isActivityReference,
}) {
  syncMoleculeBlueprintRows(module);
  ensureBlueprintVariantGroups(module);
  const summary = getBlueprintModuleBrief(module, slot);
  const contextName = getBlueprintContextName(context);

  return `
    <article class="blueprint-info-module">
      <header>
        ${Number.isInteger(slotIndex) ? `<b class="blueprint-info-module-index">${String(slotIndex + 1).padStart(2, "0")}</b>` : ""}
        <div>
          <em>${escapeHtml(group.audience.name)}${phase ? ` · ${escapeHtml(phase.name)}` : ""}</em>
          <input
            value="${escapeAttr(module.name)}"
            data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|name`)}"
            aria-label="${escapeAttr(`${contextName} ${slot.label} 模块名称`)}"
          />
        </div>
        <div class="blueprint-module-controls">
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|up`)}"
            aria-label="${escapeAttr(`上移 ${module.name}`)}"
          >↑</button>
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|down`)}"
            aria-label="${escapeAttr(`下移 ${module.name}`)}"
          >↓</button>
        </div>
      </header>
      ${isActivityReference ? `
        <div class="blueprint-activity-reference is-info">
          <strong>活动公共内容</strong>
          <span>与首个人群保持一致</span>
        </div>
      ` : `
        <label>
          <span>模块定位</span>
          <textarea
            rows="2"
            data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintRole`)}"
          >${escapeHtml(summary.role)}</textarea>
        </label>
        <label>
          <span>核心规则</span>
          <textarea
            rows="2"
            data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintRule`)}"
          >${escapeHtml(summary.rule)}</textarea>
        </label>
        <label>
          <span>利益点</span>
          <textarea
            rows="2"
            data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintBenefit`)}"
          >${escapeHtml(summary.benefit)}</textarea>
        </label>
      `}
      <div class="blueprint-module-brief-tags">
        ${summary.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </article>
  `;
}

function getBlueprintPackageName() {
  return state.selectedDemoPackageId === demoTimeActivityPackage.id
    ? demoTimeActivityPackage.name
    : demoActivityPackage.name;
}

function renderBlueprintSystemBrief({ contexts, audienceGroups, slots, unitLabel }) {
  const moduleCount = contexts.reduce((sum, context) => sum + context.modules.length, 0);
  const variantGroupCount = contexts.reduce(
    (sum, context) =>
      sum +
      context.modules.reduce(
        (moduleSum, module) => moduleSum + ensureBlueprintVariantGroups(module).length,
        0,
      ),
    0,
  );
  const components = Array.from(
    new Set(contexts.flatMap((context) => context.modules.map((module) => module.component))),
  );

  return `
    <aside class="blueprint-system-brief">
      <header>
        <span>系统理解</span>
        <strong>${escapeHtml(getBlueprintPackageName())}</strong>
      </header>
      <div class="blueprint-system-metrics">
        <span><b>${audienceGroups.length}</b>人群</span>
        <span><b>${contexts.length}</b>${unitLabel}</span>
        <span><b>${moduleCount}</b>模块</span>
        <span><b>${variantGroupCount}</b>分发组</span>
      </div>
      <dl>
        <div>
          <dt>页面结构</dt>
          <dd>${slots.map((slot) => escapeHtml(slot.label)).join(" / ")}</dd>
        </div>
        <div>
          <dt>主要组件</dt>
          <dd>${components.slice(0, 4).map((item) => escapeHtml(item.replace("molecule:", ""))).join("、")}</dd>
        </div>
        <div>
          <dt>确认重点</dt>
          <dd>活动目标、人群、模块顺序与核心规则</dd>
        </div>
      </dl>
    </aside>
  `;
}

function renderBlueprintAudienceGroup(
  group,
  slots,
  groupIndex,
  activityInputOwners,
  options = {},
) {
  const hasPhases = group.contexts.some((context) => context.phaseId);
  const pageIds = group.contexts
    .map((context) => state.pages.find((page) => page.sourceContextId === context.id)?.id)
    .filter(Boolean);
  const isVisible = pageIds.some((pageId) => options.visiblePageIds?.has(pageId));
  const pageToggle = options.showPageToggle && pageIds.length
    ? `
      <button
        type="button"
        class="blueprint-audience-page-toggle ${isVisible ? "active" : ""}"
        data-guided-context-pages="${escapeAttr(pageIds.join(","))}"
        aria-pressed="${isVisible}"
      >
        <i>${isVisible ? "✓" : ""}</i>
        <span>${isVisible ? "画布中" : "未展示"}</span>
      </button>
    `
    : "";
  const columnWidth = options.columnWidth || getBlueprintAudienceColumnWidth(group);
  return `
    <section
      class="blueprint-audience-group ${hasPhases ? "has-phases" : "single-context"}"
      style="--blueprint-audience-width:${columnWidth}px"
    >
      <header class="blueprint-audience-head">
        <span>${String(groupIndex + 1).padStart(2, "0")}</span>
        <div>
          <em>目标人群</em>
          <input
            value="${escapeAttr(group.audience.name)}"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|name`)}"
            aria-label="人群名称"
          />
          <textarea
            rows="2"
            data-blueprint-audience-field="${escapeAttr(`${group.audience.id}|ruleSummary`)}"
            aria-label="人群规则摘要"
          >${escapeHtml(group.audience.ruleSummary || group.audience.description || (hasPhases ? `${group.contexts.length} 个阶段` : "页面结构"))}</textarea>
        </div>
        ${pageToggle}
      </header>
      <div class="blueprint-audience-contexts">
        ${group.contexts
          .map((context) =>
            renderBlueprintAudienceContext(
              context,
              slots,
              hasPhases,
              activityInputOwners,
            ),
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderBlueprintAudienceContext(context, slots, hasPhases, activityInputOwners) {
  const phase = context.phaseId
    ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
    : null;

  return `
    <section class="blueprint-context-column ${hasPhases ? "is-phase" : ""}">
      ${phase ? `
        <header class="blueprint-phase-head">
          <div>
            <strong>${escapeHtml(phase.name)}</strong>
          </div>
        </header>
      ` : ""}
      <div class="blueprint-compact-modules">
        ${slots.map((slot, slotIndex) => {
          const module = context.modules.find((candidate) => candidate.slot === slot.id);
          if (!module) return "";
          const activityKey = `${module.slot}|${module.component}`;
          return renderBlueprintCompactModule({
            context,
            module,
            slot,
            slotIndex,
            hasPhases,
            isActivityReference:
              module.inputScope === "activity" &&
              activityInputOwners.get(activityKey) !== context.id,
          });
        }).join("")}
      </div>
    </section>
  `;
}

function renderBlueprintCompactModule({
  context,
  module,
  slot,
  slotIndex,
  hasPhases,
  isActivityReference,
}) {
  syncMoleculeBlueprintRows(module);
  ensureBlueprintVariantGroups(module);
  const isActivityInput = module.inputScope === "activity";
  const contextName = getBlueprintContextName(context);
  const summary = getBlueprintModuleBrief(module, slot);

  return `
    <article
      class="blueprint-compact-module ${hasPhases ? "is-phase-module" : ""} ${isActivityInput ? "is-activity-input" : ""}"
    >
      <header>
        <span>${String(slotIndex + 1).padStart(2, "0")}</span>
        <div>
          <em>${escapeHtml(slot.label)}</em>
          <input
            value="${escapeAttr(module.name)}"
            data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|name`)}"
            aria-label="${escapeAttr(`${contextName} ${slot.label} 模块名称`)}"
          />
        </div>
        ${isActivityInput ? "<b>活动公共</b>" : ""}
        <div class="blueprint-module-controls">
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|up`)}"
            aria-label="${escapeAttr(`上移 ${module.name}`)}"
          >↑</button>
          <button
            type="button"
            data-blueprint-module-move="${escapeAttr(`${context.id}|${module.id}|down`)}"
            aria-label="${escapeAttr(`下移 ${module.name}`)}"
          >↓</button>
        </div>
      </header>
      ${isActivityReference ? `
        <div class="blueprint-activity-reference">
          <strong>引用活动公共内容</strong>
          <span>与首个人群保持一致，无需重复录入</span>
        </div>
      ` : `
        <div class="blueprint-module-brief-body is-simple">
          <label>
            <span>核心规则</span>
            <textarea
              rows="2"
              data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintRule`)}"
            >${escapeHtml(summary.rule)}</textarea>
          </label>
          <label>
            <span>利益点</span>
            <textarea
              rows="2"
              data-blueprint-module-field="${escapeAttr(`${context.id}|${module.id}|blueprintBenefit`)}"
            >${escapeHtml(summary.benefit)}</textarea>
          </label>
        </div>
      `}
    </article>
  `;
}

function getModuleRowValue(module, fields) {
  const row = (module.rows || []).find((item) =>
    fields.some((field) => item.field.includes(field)),
  );
  return row?.value || "";
}

function getBlueprintModuleBrief(module, slot) {
  const groups = ensureBlueprintVariantGroups(module);
  const stateCount = module.states?.length || 0;
  const componentName = (module.component || "").replace("molecule:", "");
  const title = getModuleRowValue(module, ["标题", "主标题", "模块标题", "内容标题", "任务标题"]);
  const benefit = getModuleRowValue(module, [
    "核心利益点",
    "利益点",
    "奖励",
    "金额梯度",
    "提示文案",
    "领取条件",
  ]);
  const isRewardModule = /消耗返|Coupon|券|Reward|Promo/i.test(componentName + module.name);
  const isDiagnosisModule = componentName === "QualityVideoDiagnosis";
  const isContentModule = module.slot === "content";

  const defaults = {
    role:
      module.blueprintRole ||
      (isContentModule
        ? "承接活动说明、案例内容和权益解释。"
        : isRewardModule
          ? "承接消耗返玩法，推动用户完成活动目标。"
          : isDiagnosisModule
            ? "识别用户内容机会，引导生成诊断报告并进入下一步行动。"
            : `${slot.label}模块，承接页面中的关键业务节点。`),
    rule:
      module.blueprintRule ||
      (isRewardModule
        ? "用户在活动周期内满足现金消耗门槛后自动领取 DOU+ 优惠券。"
        : isDiagnosisModule
          ? "进入页面后展示诊断提示，点击后可切换为报告生成状态。"
          : getModuleRowValue(module, ["任务", "规则", "活动时间"]) || "规则与活动主流程保持一致。"),
    benefit:
      module.blueprintBenefit ||
      benefit ||
      title ||
      (isContentModule ? "强化活动可信度和转化理由。" : "突出该人群的核心参与理由。"),
  };

  return {
    ...defaults,
    tags: [
      moduleKindLabels[getModuleKind(module.component)] || slot.label,
      `${groups.length} 个分发组`,
      stateCount ? `${stateCount} 个状态` : "默认状态",
      isRewardModule ? "奖励规则" : "主干模块",
    ],
  };
}

function renderBlueprintVariantGroups(context, module, contextName) {
  const groups = ensureBlueprintVariantGroups(module);
  const rows = module.rows || groups[0]?.rows || [];
  return `
    <div class="blueprint-variant-groups ${groups.length === 1 ? "is-single" : "is-multiple"}">
      <header>
        <span>分发文案</span>
        <button
          type="button"
          data-blueprint-add-group="${escapeAttr(`${context.id}|${module.id}`)}"
        >+ 增加分组</button>
      </header>
      <div class="blueprint-variant-table-wrap">
        <div
          class="blueprint-variant-table"
          style="--blueprint-group-count:${groups.length}"
        >
          <div class="blueprint-variant-field-head">字段</div>
          ${groups.map((group) => `
            <div class="blueprint-variant-group-head">
              <input
                value="${escapeAttr(group.name)}"
                data-blueprint-group-name="${escapeAttr(`${context.id}|${module.id}|${group.id}`)}"
                aria-label="${escapeAttr(`${contextName} ${module.name} 分组名称`)}"
              />
              <button
                class="blueprint-variant-delete"
                type="button"
                ${groups.length <= 1 ? "disabled" : ""}
                aria-label="${escapeAttr(`删除 ${group.name}`)}"
                data-blueprint-delete-group="${escapeAttr(`${context.id}|${module.id}|${group.id}`)}"
              >×</button>
            </div>
          `).join("")}
          ${rows.map((row, rowIndex) => `
            <div class="blueprint-variant-field-name" title="${escapeAttr(row.field)}">
              ${escapeHtml(row.field)}
            </div>
            ${groups.map((group) => {
              const groupRow = group.rows[rowIndex] || row;
              return `
                <div class="blueprint-variant-value-cell ${getBlueprintTextareaRows(groupRow.value) > 1 ? "is-multiline" : ""}">
                <textarea
                    rows="${getBlueprintTextareaRows(groupRow.value)}"
                  data-blueprint-variant-value="${escapeAttr(`${context.id}|${module.id}|${group.id}|${rowIndex}`)}"
                    aria-label="${escapeAttr(`${contextName} ${module.name} ${group.name} ${row.field}`)}"
                  >${escapeHtml(groupRow.value || "")}</textarea>
                </div>
              `;
            }).join("")}
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function renderBlueprintCompactStates(context, module, contextName) {
  return (module.states || []).map((stateConfig) => {
    return `
      <section class="blueprint-compact-state">
        <header>
          <strong>${escapeHtml(stateConfig.name)}</strong>
        </header>
        ${stateConfig.rows.map((row, rowIndex) => `
          <label class="blueprint-compact-field state-field ${getBlueprintTextareaRows(row.value) > 1 ? "is-multiline" : ""}">
            <span title="${escapeAttr(row.field)}">${escapeHtml(row.field)}</span>
            <textarea
              rows="${getBlueprintTextareaRows(row.value)}"
              data-blueprint-state-value="${escapeAttr(`${context.id}|${module.id}|${stateConfig.id}|${rowIndex}`)}"
              aria-label="${escapeAttr(`${contextName} ${module.name} ${stateConfig.name} ${row.field}`)}"
            >${escapeHtml(row.value || "")}</textarea>
          </label>
        `).join("")}
      </section>
    `;
  }).join("");
}

function getBlueprintTextareaRows(value) {
  const text = String(value || "");
  const explicitLines = text.split("\n").length;
  const wrappedLines = Math.ceil(text.length / 28);
  return clamp(Math.max(explicitLines, wrappedLines, 1), 1, 4);
}

function ensureBlueprintVariantGroups(module) {
  if (!Array.isArray(module.variantGroups) || !module.variantGroups.length) {
    module.variantGroups = [
      {
        id: "base",
        name: DEFAULT_BLUEPRINT_AUDIENCE_NAME,
        rows: clone(module.rows || []),
      },
    ];
  }

  module.variantGroups.forEach((group) => {
    if (!Array.isArray(group.rows)) group.rows = clone(module.rows || []);
    (module.rows || []).forEach((row, rowIndex) => {
      if (group.rows[rowIndex]) return;
      group.rows[rowIndex] = clone(row);
    });
  });

  module.rows = clone(module.variantGroups[0].rows);
  return module.variantGroups;
}

function getBlueprintContexts() {
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    return getPrdTableBlueprint().audiences;
  }
  return state.selectedDemoPackageId === demoTimeActivityPackage.id
    ? demoTimeActivityPackage.scenes
    : demoActivityPackage.audiences;
}

function findBlueprintModule(contextId, moduleId) {
  const context = getBlueprintContexts().find((item) => item.id === contextId);
  const module = context?.modules.find((item) => item.id === moduleId);
  return { context, module };
}

function getBlueprintAudiences() {
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    return getPrdTableBlueprint().audiences;
  }
  return state.selectedDemoPackageId === demoTimeActivityPackage.id
    ? demoTimeActivityPackage.audiences
    : demoActivityPackage.audiences;
}

function moveBlueprintModule(contextId, moduleId, direction) {
  const { context, module } = findBlueprintModule(contextId, moduleId);
  if (!context || !module) return false;
  const index = context.modules.findIndex((item) => item.id === moduleId);
  const nextIndex = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || nextIndex < 0 || nextIndex >= context.modules.length) return false;

  const nextModule = context.modules[nextIndex];
  const currentSlot = module.slot;
  module.slot = nextModule.slot;
  nextModule.slot = currentSlot;
  context.modules.splice(index, 1);
  context.modules.splice(nextIndex, 0, module);
  return true;
}

function createBlueprintVariantGroup(module) {
  const groups = ensureBlueprintVariantGroups(module);
  const source = groups[0];
  const group = {
    id: `group_${Date.now()}_${groups.length}`,
    name: `文案分组 ${groups.length + 1}`,
    rows: clone(source.rows),
  };
  groups.push(group);
  return group;
}

function deleteBlueprintVariantGroup(module, groupId) {
  const groups = ensureBlueprintVariantGroups(module);
  if (groups.length <= 1) return false;
  const nextGroups = groups.filter((group) => group.id !== groupId);
  if (nextGroups.length === groups.length) return false;
  module.variantGroups = nextGroups;
  module.rows = clone(nextGroups[0].rows);
  return true;
}

function getBlueprintModuleSignature(module) {
  syncMoleculeBlueprintRows(module);
  return [
    module.slot,
    module.component,
    module.rows.map((row) => row.field).join("::"),
  ].join("|");
}

function getMoleculePropRows(module) {
  if (!module.component?.startsWith("molecule:")) return null;
  const moleculeName = module.component.slice("molecule:".length);
  const molecule = findDemoMoleculeByName(moleculeName);
  if (!molecule) return null;
  const moleculeRows = getPropEntries(molecule).map(([key, field]) => {
    const existing = module.rows.find((row) => row.moleculePropKey === key || row.propKey === key);
    return {
      field: field.label || key,
      value: existing?.value ?? String(field.default ?? ""),
      moleculePropKey: key,
      propKey: key,
    };
  });
  const moleculeProps = getMoleculeDefaultProps(molecule);
  moleculeRows.forEach((row) => {
    moleculeProps[row.moleculePropKey] = row.value;
  });
  const childEntries = getMoleculeChildEntries(molecule, moleculeProps);
  if (!childEntries.length) return moleculeRows.length ? moleculeRows : null;

  const childRows = childEntries.flatMap(([schemaId, overrides = {}], childIndex) => {
    const schema = findAtomSchema(schemaId);
    const childName = schema?.name || schemaId;
    const propEntries = schema
      ? getPropEntries(schema)
      : Object.keys(overrides).map((key) => [key, { key, label: key, type: "string", default: "" }]);

    return propEntries
      .filter(([key, field]) => {
        const value = overrides[key] ?? field.default;
        return field.type === "boolean" || isCopyPropField(key, field, value);
      })
      .map(([key, field]) => {
        const existing = module.rows.find(
          (row) => row.childIndex === childIndex && row.propKey === key,
        );
        return {
          field: `${childName} · ${field.label || key}`,
          value: existing?.value ?? String(overrides[key] ?? field.default ?? ""),
          childIndex,
          propKey: key,
        };
      });
  });
  return [...moleculeRows, ...childRows];
}

function isCopyPropField(key, field, value) {
  if (field.isCssVar || value == null || typeof value !== "string") return false;
  if (field.type && !["string", "text"].includes(field.type)) return false;

  const text = `${key} ${field.label || ""}`.toLowerCase();
  const styleKeywords = [
    "src",
    "url",
    "image",
    "img",
    "icon",
    "图片",
    "图标",
    "color",
    "colour",
    "gradient",
    "font",
    "radius",
    "spacing",
    "letter",
    "width",
    "height",
    "size",
    "gap",
    "margin",
    "padding",
    "bg",
    "background",
    "border",
    "shadow",
    "opacity",
    "颜色",
    "色调",
    "渐变",
    "字体",
    "字号",
    "字间距",
    "圆角",
    "间距",
    "宽",
    "高",
    "背景",
    "边框",
    "阴影",
  ];

  return !styleKeywords.some((keyword) => text.includes(keyword));
}

function syncMoleculeBlueprintRows(module) {
  const rows = getMoleculePropRows(module);
  if (rows?.length) module.rows = rows;
}

function getBlueprintContextName(context) {
  if (!context.phaseId) return context.name;
  const audience = demoTimeActivityPackage.audiences.find((item) => item.id === context.audienceId);
  const phase = demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId);
  return `${audience?.name || ""} · ${phase?.name || ""}`;
}

function getSharedBlueprintModules(context, module) {
  const isTimePackage = state.selectedDemoPackageId === demoTimeActivityPackage.id;
  const contexts = isTimePackage
    ? demoTimeActivityPackage.scenes.filter((item) => item.phaseId === context.phaseId)
    : getBlueprintContexts();
  const signature = getBlueprintModuleSignature(module);

  return contexts
    .map((candidate) => ({
      context: candidate,
      contextName: getBlueprintContextName(candidate),
      module: candidate.modules.find(
        (candidateModule) => getBlueprintModuleSignature(candidateModule) === signature,
      ),
    }))
    .filter((entry) => entry.module);
}

function renderBlueprintModuleTable(context, module, index, contextName = context.name) {
  syncMoleculeBlueprintRows(module);
  const slots = getBlueprintOverviewConfig().slots;
  const slot = slots.find((item) => item.id === module.slot);
  const sharedModules = getSharedBlueprintModules(context, module);
  const isActivityInput = module.inputScope === "activity";
  const isShared = !isActivityInput && sharedModules.length > 1;
  const tableContexts = isActivityInput
    ? [{ context, contextName: "统一内容", module }]
    : isShared
    ? sharedModules
    : [{ context, contextName, module }];
  return `
    <section class="blueprint-module-card ${isShared || isActivityInput ? "shared" : ""}">
      <div class="blueprint-module-order">
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${index < context.modules.length - 1 ? "<i></i>" : ""}
      </div>
      <div class="blueprint-module-main">
        <header class="blueprint-module-head">
          <div>
            <span>${escapeHtml(slot?.label || `页面位置 ${index + 1}`)}</span>
            <h3>${escapeHtml(isActivityInput ? module.name : isShared ? `${slot?.label || module.name} · 共享模块` : module.name)}</h3>
            ${isActivityInput ? "<p>活动公共内容，仅需录入一次</p>" : isShared ? `<p>适用：${tableContexts.map((entry) => escapeHtml(entry.contextName)).join("、")}</p>` : ""}
          </div>
          <div class="blueprint-module-meta">
            ${isActivityInput ? "<b>活动公共模块</b>" : isShared ? "<b>共享组件</b>" : ""}
            <code>${escapeHtml(module.component)}</code>
          </div>
        </header>
        <div
          class="blueprint-variable-table ${isShared ? "shared" : ""}"
          style="--blueprint-context-count:${tableContexts.length}"
        >
          <div class="blueprint-variable-row head ${isShared ? "shared" : ""}">
            <span>业务输入项</span>
            ${tableContexts.map((entry) => `<span>${escapeHtml(entry.contextName)}</span>`).join("")}
          </div>
          ${module.rows
            .map(
              (row, rowIndex) => {
                const field = getBlueprintRowField(module, row);
                return `
                  <div class="blueprint-variable-row ${isShared ? "shared" : ""}">
                    <strong>${escapeHtml(row.field)}</strong>
                    ${tableContexts
                      .map((entry) => {
                        const value = entry.module.rows[rowIndex].value;
                        const controlId = `${entry.context.id}|${entry.module.id}|${rowIndex}`;
                        const ariaLabel = `${entry.contextName} ${entry.module.name} ${row.field}`;
                        return isPrizePropField(field)
                          ? renderPrizeLibrarySelect(
                              value,
                              `data-blueprint-prize-value="${escapeAttr(controlId)}"`,
                              ariaLabel,
                              `data-blueprint-prize-name-value="${escapeAttr(controlId)}"`,
                              `data-blueprint-prize-copy-value="${escapeAttr(controlId)}"`,
                            )
                          : `
                            <textarea
                              rows="1"
                              data-blueprint-value="${escapeAttr(controlId)}"
                              aria-label="${escapeAttr(ariaLabel)}"
                            >${escapeHtml(value)}</textarea>
                          `;
                      })
                      .join("")}
                  </div>
                `;
              },
            )
            .join("")}
        </div>
        ${renderBlueprintStateTables(tableContexts, isShared)}
      </div>
    </section>
  `;
}

function renderBlueprintStateTables(tableContexts, isShared) {
  const primaryModule = tableContexts[0]?.module;
  if (!primaryModule?.states?.length) return "";

  return primaryModule.states
    .map((stateConfig) => {
      const stateContexts = tableContexts
        .map((entry) => ({
          ...entry,
          stateConfig: entry.module.states?.find((item) => item.id === stateConfig.id),
        }))
        .filter((entry) => entry.stateConfig);
      if (!stateContexts.length) return "";

      return `
        <section class="blueprint-state-table">
          <header>
            <span>${escapeHtml(stateConfig.name)}</span>
            <code>${escapeHtml(stateConfig.component)}</code>
          </header>
          <div
            class="blueprint-variable-table ${isShared ? "shared" : ""}"
            style="--blueprint-context-count:${stateContexts.length}"
          >
            <div class="blueprint-variable-row head ${isShared ? "shared" : ""}">
              <span>状态输入项</span>
              ${stateContexts.map((entry) => `<span>${escapeHtml(entry.contextName)}</span>`).join("")}
            </div>
            ${stateConfig.rows
              .map(
                (row, rowIndex) => `
                  <div class="blueprint-variable-row ${isShared ? "shared" : ""}">
                    <strong>${escapeHtml(row.field)}</strong>
                    ${stateContexts
                      .map(
                        (entry) => `
                          <textarea
                            rows="1"
                            data-blueprint-state-value="${escapeAttr(`${entry.context.id}|${entry.module.id}|${entry.stateConfig.id}|${rowIndex}`)}"
                            aria-label="${escapeAttr(`${entry.contextName} ${entry.module.name} ${entry.stateConfig.name} ${row.field}`)}"
                          >${escapeHtml(entry.stateConfig.rows[rowIndex]?.value || "")}</textarea>
                        `,
                      )
                      .join("")}
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function buildDemoGeneratedActivity() {
  const isTimePackage = state.selectedDemoPackageId === demoTimeActivityPackage.id;
  const isPrdTablePackage = state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID;
  const prdTableBlueprint = isPrdTablePackage ? getPrdTableBlueprint() : null;
  const prdPageType = prdTableBlueprint?.pageType || "";
  const prdPageTemplate = isPrdTablePackage && prdPageType
    ? findLatestCustomPageTemplateByPrdType(prdPageType)
    : null;
  const contexts = isPrdTablePackage
    ? prdTableBlueprint.audiences
    : isTimePackage
      ? demoTimeActivityPackage.scenes
      : demoActivityPackage.audiences;
  const pages = contexts.map((context, contextIndex) => {
    const generatedNodes = prdPageTemplate
      ? []
      : context.modules.flatMap((module) => {
          const generated = createDemoNodeFromModule(module);
          const moduleNodes = Array.isArray(generated) ? generated : [generated];
          moduleNodes.forEach((node) => {
            node.sourceContextId = context.id;
            node.sourceModuleId = module.id;
            node.sourceSlot = module.slot;
            node.sourceInputScope = module.inputScope || "context";
          });
          return moduleNodes;
        });
    const nodes = prdPageTemplate
      ? materializePageTemplateNodes(prdPageTemplate)
      : generatedNodes;
    if (prdPageTemplate) {
      nodes.forEach((node, nodeIndex) => {
        node.sourcePageTemplateId = prdPageTemplate.id;
        node.sourcePageTemplateNodeIndex = nodeIndex;
      });
      attachPageTemplateBusinessStates(nodes, prdPageTemplate.id);
    }
    replaceGuidedLotteryNodesWithInteractive(nodes);
    if (prdPageTemplate) {
      bindPrdModuleVariantsToTemplateNodes(
        nodes,
        context.modules,
        prdTableBlueprint?.consumptionProgressConfig,
        prdTableBlueprint?.taskListConfig,
        state.prdTableRows,
        prdPageTemplate.id,
      );
      applyStoredPageTemplateBusinessStates(nodes, prdPageTemplate.id);
      applyStoredPageTemplateChildStates(nodes, prdPageTemplate.id);
    }
    const audience = isPrdTablePackage
      ? context
      : isTimePackage
      ? demoTimeActivityPackage.audiences.find((item) => item.id === context.audienceId)
      : context;
    const phase = isTimePackage
      ? demoTimeActivityPackage.phases.find((item) => item.id === context.phaseId)
      : null;
    const canvasBackground =
      prdPageTemplate?.canvasBackground ||
      context.canvasBackground ||
      audience?.canvasBackground ||
      "#ffffff";
    return {
      id: `page_${Date.now()}_${contextIndex}`,
      name: prdPageTemplate?.name || phase?.name || "活动页面",
      dimension: audience.name,
      tags: prdPageTemplate
        ? ["自定义模板", prdPageTemplate.name]
        : context.modules.map((module) => module.name),
      sourceContextId: context.id,
      sourcePageTemplateId: prdPageTemplate?.id || "",
      canvasBackground,
      navBarEnabled: prdPageTemplate
        ? Boolean(prdPageTemplate.navBarEnabled)
        : false,
      nodes,
    };
  });
    const lotteryPopupPage = ensureGuidedLotteryPopupNodes(pages);
    state.activity = {
    name: isPrdTablePackage ? prdTableBlueprint.activityName : demoPrdBlueprint.activityName,
    note: isPrdTablePackage
      ? prdPageTemplate
        ? `PRD 文本 → ${prdPageType} 页面模板`
        : "PRD 文本 → 页面模块"
      : "PRD mock → 活动包 → 人群页面",
  };
  const fallbackPages = createGuidedFallbackPages(getGuidedPageTheme(pages[0]));
  state.pages = [...pages, ...fallbackPages];
  state.activePageId = pages[0]?.id || fallbackPages[0].id;
    state.guidedVisiblePageIds = [
      ...new Set([
        ...(pages[0] ? [pages[0].id] : []),
        ...(lotteryPopupPage && lotteryPopupPage.id !== pages[0]?.id ? [lotteryPopupPage.id] : []),
        ...fallbackPages.map((page) => page.id),
      ]),
    ];
  state.guidedVisibleCompanionNodeIds = pages.flatMap((page) =>
    (page.nodes || [])
      .filter((node) => node.canvasPlacement === "page-side")
      .map((node) => node.id),
  );
  state.guidedCanvasInitialized = false;
  state.selectedDimension = pages[0]?.dimension || "个人用户";
  state.selectedId = null;
  state.demoSelectedNodeId = null;
  state.canvasZoom = 1;
  state.canvasPanX = 40;
  state.canvasPanY = 40;
  state.currentTemplateId = null;
}

function createGuidedFallbackPages(parentTheme = guidedPageThemePresets[0]) {
  const timestamp = Date.now();
  const theme = getGuidedThemePreset(parentTheme) || guidedPageThemePresets[0];
  const pages = [
    {
      id: `page_fallback_hot_${timestamp}`,
      name: "活动火爆",
      dimension: "兜底页面",
      tags: ["系统页面", "活动火爆"],
      canvasBackground: theme.background,
      colorThemeId: theme.id,
      navBarEnabled: false,
      isSystemFallback: true,
      fallbackBottomSpace: 358,
      fallbackPageHeight: 1602,
      nodes: [createAtomNode("无活动提示")],
    },
    {
      id: `page_fallback_case_${timestamp}`,
      name: "内容案例",
      dimension: "兜底页面",
      tags: ["系统页面", "内容案例"],
      canvasBackground: theme.background,
      colorThemeId: theme.id,
      navBarEnabled: false,
      isSystemFallback: true,
      fallbackBottomSpace: 154,
      fallbackPageHeight: 1859,
      nodes: [createMoleculeNode("用户教育案例-样式1")],
    },
  ];
  pages.forEach((page) => applyThemeBoundVariantsToNodes(page.nodes, theme.id));
  return pages;
}

  function isLotteryGridNode(node) {
    return [
      "LotteryGridInteractive",
      "LotteryGrid",
      "抽奖九宫格-报名前",
      "抽奖九宫格-报名后",
      "抽奖样式2",
      "抽奖公告九宫格",
    ].includes(node?.schemaId);
  }

function createLotteryAnnouncementMoleculeFromNode(sourceNode) {
  return sourceNode;
}

function replaceGuidedLotteryNodesWithInteractive(nodes = [], insideMolecule = false) {
  return nodes;
}

  function collectInteractiveLotteryGridNodes(nodes = [], result = []) {
    nodes.forEach((node) => {
      if (isLotteryGridNode(node)) result.push(node);
      collectInteractiveLotteryGridNodes(node?.children || [], result);
      (node?.guidedStates || []).forEach((entry) => {
        if (entry.node) collectInteractiveLotteryGridNodes([entry.node], result);
      });
    });
    return result;
  }

  function getLotteryPrizeText(lotteryNode, index) {
    return getLotteryPrize(lotteryNode, index).name;
  }

  function getLotteryPrize(lotteryNode, index) {
    const props = lotteryNode?.props || {};
    const nameValue = String(props[`prize${index}Name`] || "").trim();
    const parsed = parsePrizeValue(props[`prize${index}`]);
    const style2Fallbacks = [
      { name: "抖仔限量盲盒", sourceName: "DOU仔周边" },
      { name: "剪映VIP月卡", sourceName: "剪映VIP" },
      { name: "DOU+流量券", sourceName: "6元流量券" },
    ];
    const fallbackPrizeNames = lotteryNode?.schemaId === "抽奖九宫格-报名前"
      ? ["DOU仔周边", "6元流量券", "内容诊断积分", "DOU+官方推荐机会", "1314元心动券包"]
      : ["1314元心动券包", "6元流量券", "10元流量券", "DOU仔周边", "DOU仔周边", "5元流量券", "DOU+官方推荐机会", "内容诊断积分"];
    const fallbackName = fallbackPrizeNames[index - 1];
    const style2Fallback = lotteryNode?.schemaId === "抽奖样式2"
      ? style2Fallbacks[index - 1]
      : null;
    const fallback =
      mockPrizeLibrary.find((item) => item.name === (style2Fallback?.sourceName || fallbackName)) ||
      mockPrizeLibrary[index - 1] ||
      {};
    return {
      name: nameValue || parsed?.name || style2Fallback?.name || fallback.name || `奖品${index}`,
      image: parsed?.image || fallback.image || "",
      copy: parsed?.copy || props[`prize${index}Copy`] || fallback.copy || "满30元赠价值5元流量",
    };
  }

  function getLotteryPrizeCount(lotteryNode) {
    const schema = findAtomSchema(lotteryNode?.schemaId);
    const configuredCount = schema?.blueprint?.prizeProps?.length;
    const propPrizeIndexes = Object.entries(lotteryNode?.props || {})
      .filter(([, value]) => String(value || "").trim())
      .map(([key]) => key.match(/^prize(\d+)(?:Name|Text|Copy)?$/)?.[1])
      .filter(Boolean)
      .map(Number);
    const explicitCount = Number(lotteryNode?.props?.prizeCount) || 0;
    return Math.min(
      MAX_LOTTERY_PRIZE_COUNT,
      Math.max(
        1,
        explicitCount || configuredCount || 0,
        ...propPrizeIndexes,
      ),
    );
  }

  function splitLotteryPrizeText(prizeText) {
    const value = String(prizeText || "").trim();
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return { amountText: "", prizeText: value };
    return {
      amountText: match[1],
      prizeText: match[2] || value,
    };
  }

  function getLotteryPopupWinProps(lotteryNode) {
    const prizeCount = getLotteryPrizeCount(lotteryNode);
    const selectedPrizeIndex = clamp(
      Number(lotteryNode?.props?.selectedPrizeIndex || 1),
      1,
      prizeCount,
    );
    const prizeProps = {};
    for (let index = 1; index <= prizeCount; index += 1) {
      const prize = getLotteryPrize(lotteryNode, index);
      prizeProps[`prize${index}`] = serializePrizeOption(prize);
      prizeProps[`prize${index}Text`] = prize.name;
      prizeProps[`prize${index}Copy`] = prize.copy;
    }
    const selectedPrizeText = prizeProps[`prize${selectedPrizeIndex}Text`] || "元心动券包";
    const splitPrize = splitLotteryPrizeText(selectedPrizeText);
    const selectedPrizeCopy = prizeProps[`prize${selectedPrizeIndex}Copy`] || "满30元赠价值5元流量";
    return {
      titleText: "恭喜抽中",
      amountText: lotteryNode?.props?.resultAmountText || splitPrize.amountText,
      selectedPrizeIndex,
      prizeCount,
      prizeText: splitPrize.prizeText,
      prizeSubText: selectedPrizeCopy,
      ...prizeProps,
    };
  }

  function getLotteryPopupLoseProps(popupNode = {}) {
    return {
      ...defaultProps("弹窗-未中奖"),
      ...(popupNode.lotteryLoseProps || {}),
    };
  }

  function setLotteryPopupNodeShape(popupNode, schemaId, props = {}) {
    const schema = findAtomSchema(schemaId);
    const variants = normalizeVariants(schema);
    popupNode.schemaId = schema?.id || schemaId;
    popupNode.name = schema?.name || schemaId;
    popupNode.type = "atom";
    popupNode.activeVariantId = variants[0]?.id || null;
    popupNode.variants = variants;
    popupNode.props = defaultProps(schemaId, props);
    popupNode.children = [];
  }

  function setLotteryPopupResult(popupNode, result = "win") {
    if (!popupNode) return;
    if (result === "lose") {
      if (popupNode.schemaId === "弹窗-中奖") {
        popupNode.lotteryWinProps = { ...(popupNode.props || {}) };
      }
      setLotteryPopupNodeShape(popupNode, "弹窗-未中奖", getLotteryPopupLoseProps(popupNode));
      popupNode.activeLotteryPopupResult = "lose";
      popupNode.activeGuidedStateId = "lose";
      return;
    }
    const winProps = popupNode.lotteryWinProps || popupNode.props || {};
    setLotteryPopupNodeShape(popupNode, "弹窗-中奖", winProps);
    popupNode.activeLotteryPopupResult = "win";
    popupNode.activeGuidedStateId = "win";
  }

  function ensureLotteryPopupResultStates(popupNode) {
    if (!popupNode?.isLotteryResultPopup) return;
    const winNode = createAtomNode("弹窗-中奖", popupNode.lotteryWinProps || popupNode.props || {});
    const loseNode = createAtomNode("弹窗-未中奖", getLotteryPopupLoseProps(popupNode));
    popupNode.guidedStates = [
      { id: "win", name: "中奖", component: "弹窗-中奖", preserveProps: true, node: winNode },
      { id: "lose", name: "未中奖", component: "弹窗-未中奖", preserveProps: true, node: loseNode },
    ];
    popupNode.activeGuidedStateId = popupNode.activeLotteryPopupResult === "lose" ? "lose" : "win";
  }

  function syncGuidedLotteryPopupNode(popupNode, lotteryNode) {
    if (!popupNode || !lotteryNode) return;
    const winProps = getLotteryPopupWinProps(lotteryNode);
    const currentSelectedPrizeIndex =
      popupNode.lotteryWinProps?.selectedPrizeIndex ||
      popupNode.props?.selectedPrizeIndex ||
      popupNode.guidedStates?.find((entry) => entry.id === "win")?.node?.props?.selectedPrizeIndex;
    if (currentSelectedPrizeIndex) {
      winProps.selectedPrizeIndex = clamp(
        Number(currentSelectedPrizeIndex) || 1,
        1,
        winProps.prizeCount,
      );
      const selectedPrize = splitLotteryPrizeText(
        winProps[`prize${winProps.selectedPrizeIndex}Text`] || winProps.prizeText,
      );
      winProps.amountText = selectedPrize.amountText;
      winProps.prizeText = selectedPrize.prizeText;
      winProps.prizeSubText = winProps[`prize${winProps.selectedPrizeIndex}Copy`] || "满30元赠价值5元流量";
    }
    const currentWinProps = popupNode.schemaId === "弹窗-中奖"
      ? popupNode.props
      : popupNode.lotteryWinProps;
    popupNode.lotteryWinProps = { ...(currentWinProps || {}), ...winProps };
    if (popupNode.activeLotteryPopupResult === "lose" || popupNode.schemaId === "弹窗-未中奖") {
      setLotteryPopupResult(popupNode, "lose");
    } else {
      setLotteryPopupResult(popupNode, "win");
    }
    ensureLotteryPopupResultStates(popupNode);
  }

  function findSourceLotteryNodeForPopup(popupNode) {
    const sourceId = popupNode?.sourceLotteryNodeId;
    if (sourceId) {
      const found = findNode(state.nodes, sourceId) || findNode(activePage()?.nodes || [], sourceId);
      if (found?.node) return found.node;
    }
    return findLotteryGridNode(activePage()?.nodes || state.nodes || []);
  }

  function setPopupSelectedPrize(popupNode, prizeIndex) {
    const winProps = {
      ...((popupNode?.schemaId === "弹窗-中奖" ? popupNode.props : popupNode?.lotteryWinProps) || {}),
    };
    const prizeCount = Math.max(1, Number(winProps.prizeCount) || 1);
    const selectedPrizeIndex = clamp(Number(prizeIndex) || 1, 1, prizeCount);
    const selectedPrize = splitLotteryPrizeText(
      winProps[`prize${selectedPrizeIndex}Text`] || "",
    );
    const parsedPrize = parsePrizeValue(winProps[`prize${selectedPrizeIndex}`]);
    winProps.selectedPrizeIndex = selectedPrizeIndex;
    winProps.amountText = selectedPrize.amountText;
    winProps.prizeText = selectedPrize.prizeText;
    winProps.prizeSubText =
      winProps[`prize${selectedPrizeIndex}Copy`] ||
      parsedPrize?.copy ||
      "满30元赠价值5元流量";
    popupNode.lotteryWinProps = winProps;
    setLotteryPopupResult(popupNode, "win");
    ensureLotteryPopupResultStates(popupNode);
  }

  function syncLotteryPopupCurrentPrizeCopy(popupNode) {
    if (!popupNode?.isLotteryResultPopup) return;
    const winProps = popupNode.schemaId === "弹窗-中奖"
      ? popupNode.props || {}
      : popupNode.lotteryWinProps || {};
    const selectedPrizeIndex = clamp(
      Number(winProps.selectedPrizeIndex || popupNode.lotteryWinProps?.selectedPrizeIndex || 1),
      1,
      Math.max(1, Number(winProps.prizeCount || popupNode.lotteryWinProps?.prizeCount || 1)),
    );
    const prizeSubText = String(winProps.prizeSubText ?? "").trim();
    if (!prizeSubText) return;
    const copyKey = `prize${selectedPrizeIndex}Copy`;
    const prizeKey = `prize${selectedPrizeIndex}`;
    const nextWinProps = {
      ...(popupNode.lotteryWinProps || {}),
      ...(popupNode.schemaId === "弹窗-中奖" ? popupNode.props || {} : {}),
      [copyKey]: prizeSubText,
      prizeSubText,
    };
    if (nextWinProps[prizeKey]) {
      nextWinProps[prizeKey] = serializePrizeValueWithCopy(nextWinProps[prizeKey], prizeSubText);
    }
    popupNode.lotteryWinProps = nextWinProps;
    if (popupNode.schemaId === "弹窗-中奖") {
      popupNode.props = {
        ...(popupNode.props || {}),
        [copyKey]: prizeSubText,
        prizeSubText,
      };
      if (popupNode.props[prizeKey]) {
        popupNode.props[prizeKey] = nextWinProps[prizeKey];
      }
    }
    ensureLotteryPopupResultStates(popupNode);
  }

  function syncPopupPrizesToSourceLottery(popupNode) {
    const lotteryNode = findSourceLotteryNodeForPopup(popupNode);
    if (!popupNode?.props || !lotteryNode?.props) return;
    syncLotteryPopupCurrentPrizeCopy(popupNode);
    const winProps = popupNode.lotteryWinProps || popupNode.props || {};
    const prizeCount = Math.min(
      MAX_LOTTERY_PRIZE_COUNT,
      Math.max(1, Number(winProps.prizeCount) || 1),
    );
    lotteryNode.props.prizeCount = prizeCount;
    for (let index = 1; index <= prizeCount; index += 1) {
      lotteryNode.props[`prize${index}`] = winProps[`prize${index}`] || "";
      lotteryNode.props[`prize${index}Name`] = winProps[`prize${index}Text`] || "";
      lotteryNode.props[`prize${index}Copy`] = winProps[`prize${index}Copy`] || "";
    }
    Object.keys(lotteryNode.props).forEach((key) => {
      const match = key.match(/^prize(\d+)(Name|Copy)?$/);
      if (match && Number(match[1]) > prizeCount) delete lotteryNode.props[key];
    });
  }

  function createGuidedLotteryPopupNode(lotteryNode) {
    const winProps = getLotteryPopupWinProps(lotteryNode);
    const popupNode = createAtomNode("弹窗-中奖", winProps);
    popupNode.name = "弹窗-中奖";
    popupNode.canvasPlacement = "page-side";
    popupNode.sourceLotteryNodeId = lotteryNode?.id || null;
    popupNode.isLotteryResultPopup = true;
    popupNode.activeLotteryPopupResult = "win";
    popupNode.lotteryWinProps = { ...(popupNode.props || {}) };
    ensureLotteryPopupResultStates(popupNode);
    return popupNode;
  }

  function syncGuidedLotteryPopupsForPage(page) {
    const lotteryNode = findLotteryGridNode(page?.nodes || []);
    if (!lotteryNode) return;
    (page?.nodes || [])
      .filter((node) => node.isLotteryResultPopup)
      .forEach((popupNode) => syncGuidedLotteryPopupNode(popupNode, lotteryNode));
  }

  function refreshAfterGuidedNodePropChange() {
    const selected = getSelectedNodeInfo();
    if (selected?.node?.isLotteryResultPopup) {
      syncLotteryPopupCurrentPrizeCopy(selected.node);
      syncPopupPrizesToSourceLottery(selected.node);
    }
    syncGuidedLotteryPopupsForPage(activePage());
    if (state.view === "guided-preview") {
      renderGuidedPreview();
      return;
  }
    renderCanvas();
    renderStructureTree();
    renderPageSaveFloat();
    renderContextControls();
  }

  function ensureGuidedLotteryPopupNodes(pages = []) {
    let firstPopupPage = null;
    pages.forEach((page) => {
      page.nodes = (page.nodes || []).filter((node) => !node.isLotteryResultPopup);
      const lotteryNode = findLotteryGridNode(page.nodes);
      if (!lotteryNode) return;
      const popupNode = createGuidedLotteryPopupNode(lotteryNode);
      applyThemeBoundVariantsToNodes([popupNode], getGuidedPageTheme(page).id);
      page.nodes.push(popupNode);
      if (!firstPopupPage) firstPopupPage = page;
    });
    return firstPopupPage;
}

function findLotteryGridNode(nodes = []) {
  for (const node of nodes) {
    if (isLotteryGridNode(node)) return node;
    const nested = findLotteryGridNode(node.children || []);
    if (nested) return nested;
      for (const stateEntry of node.guidedStates || []) {
        const stateNested = findLotteryGridNode(stateEntry.node ? [stateEntry.node] : []);
        if (stateNested) return stateNested;
      }
  }
  return null;
}

function findLotteryModuleNode(nodes = []) {
  for (const node of nodes) {
    if (
      node.type === "molecule" &&
      findLotteryGridNode(node.children || [])
    ) {
      return node;
    }
    if (isLotteryGridNode(node)) return node;
    const nested = findLotteryModuleNode(node.children || []);
    if (nested) return nested;
  }
  return null;
}

function applyLotteryRowsToNode(node, rows) {
  const lotteryNode = isLotteryGridNode(node)
    ? node
    : findLotteryGridNode(node.children || []);
  if (!lotteryNode) return;
  let maxPrizeIndex = Number(lotteryNode.props?.prizeCount) || 0;
  rows.forEach((row) => {
    if (/^prize\d+(Name|Copy)?$/.test(row.propKey || "")) {
      lotteryNode.props[row.propKey] = row.value;
      const prizeIndex = Number(String(row.propKey).match(/^prize(\d+)/)?.[1] || 0);
      if (prizeIndex) maxPrizeIndex = Math.max(maxPrizeIndex, Math.min(MAX_LOTTERY_PRIZE_COUNT, prizeIndex));
    }
  });
  if (maxPrizeIndex) lotteryNode.props.prizeCount = Math.min(MAX_LOTTERY_PRIZE_COUNT, maxPrizeIndex);
}

function findConsumptionProgressNode(nodes = []) {
  for (const node of nodes) {
    if (node.schemaId === "消耗返进度条") return node;
    const nested = findConsumptionProgressNode(node.children || []);
    if (nested) return nested;
  }
  return null;
}

function findConsumptionProgressModuleNode(nodes = []) {
  for (const node of nodes) {
    if (
      node.schemaId === "消耗返进度条" ||
      findConsumptionProgressNode(node.children || [])
    ) {
      return node;
    }
  }
  return null;
}

function applyConsumptionProgressProps(node, props = {}) {
  const progressNode =
    node?.schemaId === "消耗返进度条"
      ? node
      : findConsumptionProgressNode(node?.children || []);
  if (!progressNode?.props) return;
  Object.entries(props).forEach(([key, value]) => {
    progressNode.props[key] = value;
  });
}

function bindConsumptionProgressVariants(nodes, config) {
  if (!config?.entries?.length || !config.dimensions?.length) return;
  const target = findConsumptionProgressModuleNode(nodes);
  if (!target) return;

  const variants = config.entries.map((entry, index) => {
    const variantNode = cloneNodeForLineage(target);
    applyConsumptionProgressProps(variantNode, entry.props);
    return {
      id: index === 0 ? "base" : entry.id,
      title: entry.title,
      dimensionId: entry.dimensionId,
      node: variantNode,
    };
  });
  const defaultVariant = variants[0];
  applyConsumptionProgressProps(target, config.entries[0].props);
  target.guidedLineageVariants = variants;
  target.activeLineageVariantId = defaultVariant.id;
  target.guidedLineageDefaultVersion = "v3";
  target.guidedLineageGraph = {
    dimensions: config.dimensions.map((dimension) => ({
      id: `progress-dimension-${dimension.id}`,
      title: dimension.title,
      x: 28,
      y: 28,
    })),
    nodes: variants.map((variant) => ({
      id: variant.id === "base" ? "node_base" : `node_${variant.id}`,
      variantId: variant.id,
      kind: "component",
      dimensionId: `progress-dimension-${variant.dimensionId}`,
      x: 260,
      y: 28,
    })),
    edges: [],
  };
}

function findTaskListModuleNode(nodes = []) {
  return null;
}

function createPrdTaskNode(task) {
  return null;
}

function bindPrdTaskListToTemplateNodes(nodes, config) {
  return null;
}

function findTemplateNodeBySchemaId(nodes = [], schemaIds = []) {
  const wanted = new Set(schemaIds);
  for (const node of nodes) {
    if (wanted.has(node.schemaId) || wanted.has(node.name)) return node;
    const nested = findTemplateNodeBySchemaId(node.children || [], schemaIds);
    if (nested) return nested;
  }
  return null;
}

function getStructuredPrdValue(rows, label) {
  const normalizedLabel = normalizePageTemplateLookupName(label);
  const row = normalizePrdTableRows(rows).find(
    (item) => normalizePageTemplateLookupName(item.key) === normalizedLabel,
  );
  return String(row?.value || "").trim();
}

const structuredModuleVersionPropMaps = {
  账户优惠券提示: {
    当前账户优惠券总金额: "amountText",
    金额: "amountText",
    按钮文案: "actionText",
    小按钮文案: "actionText",
    立即使用: "actionText",
  },
  抽奖公告九宫格: {
    抽奖模块标题: "title",
    剩余抽奖次数文案: "subtitle",
    用户中奖公告文案: "announcementText",
    奖品1名称: "prize1Name",
    奖品2名称: "prize2Name",
    奖品3名称: "prize3Name",
    奖品4名称: "prize4Name",
    奖品5名称: "prize5Name",
    奖品6名称: "prize6Name",
    奖品7名称: "prize7Name",
    奖品8名称: "prize8Name",
    抽奖按钮文案: "buttonText",
  },
  消耗返数据报名规则: {
    消耗返模块标题: "titleText",
    抽奖入口文案: "lotteryText",
    行动按钮文案: "buttonText",
    第1档奖励金额: "reward1AmountText",
    第2档奖励金额: "reward2AmountText",
    第3档奖励金额: "reward3AmountText",
    第1个进度节点文案: "milestone1Text",
    第2个进度节点文案: "milestone2Text",
    第3个进度节点文案: "milestone3Text",
    第4个进度节点文案: "milestone4Text",
    左侧数据名称: "leftLabel",
    左侧数据数值: "leftValue",
    左侧数据单位: "leftUnit",
    右侧数据名称: "rightLabel",
    右侧数据数值: "rightValue",
    规则标题: "rulesTitle",
    参与规则1: "ruleOne",
    参与规则2: "ruleTwo",
    参与规则3: "ruleThree",
    规则备注: "note",
  },
  BigDay优惠券报名: {
    报名模块标题: "titleText",
    优惠券金额: "couponAmount",
    优惠券单位: "couponUnit",
    优惠券有效期文案: "couponExpiry",
    优惠券品牌前缀: "couponPrefix",
    优惠券名称: "couponTitle",
    报名按钮文案: "actionText",
    活动日期文案: "dateText",
    报名门槛文案: "thresholdText",
    报名说明文案: "descriptionText",
  },
  投放案例: {
    行业分类: "categoryText",
    案例标题: "headlineText",
    视频日更数量: "videoFrequencyText",
    视频内容建议: "videoDescriptionText",
    投放建议: "placementDescriptionText",
    建议单笔投放金额: "placementAmountText",
    执行要点: "executionDescriptionText",
    日更最小数量: "updateMinText",
    日更最大数量: "updateMaxText",
    追投预算比例: "budgetPercentText",
  },
  置底按钮: {
    底部按钮文案: "buttonText",
  },
};

const structuredModuleVersionTargets = [
  { moduleName: "账户优惠券提示", schemaIds: ["账户优惠券提示"] },
  { moduleName: "抽奖公告九宫格", schemaIds: ["LotteryGridInteractive", "抽奖公告九宫格"] },
  { moduleName: "消耗返数据报名规则", schemaIds: ["消耗返数据报名规则"] },
  { moduleName: "BigDay优惠券报名", schemaIds: ["BigDay优惠券报名"] },
  { moduleName: "投放案例", schemaIds: ["投放案例"] },
  { moduleName: "置底按钮", schemaIds: ["StickyBottomButton", "置底按钮"] },
];

function isManualModuleVersionName(moduleName, versionName) {
  return (state.prdManualModuleVersions?.[moduleName] || []).some(
    (version) =>
      normalizePageTemplateLookupName(version.name) ===
      normalizePageTemplateLookupName(versionName),
  );
}

function getStructuredScopedVersionId(moduleName, versionName, groupIndex, prefix = "version") {
  if (isManualModuleVersionName(moduleName, versionName)) {
    return `${prefix}_manual_${groupIndex + 1}`;
  }
  return groupIndex === 0 ? "base" : `${prefix}_${groupIndex + 1}`;
}

function parseStructuredScopedRowKey(key, moduleName) {
  const parts = String(key || "").split("｜");
  if (parts.length < 3) return null;
  const [rowModuleName, second, third, ...rest] = parts;
  if (
    normalizePageTemplateLookupName(rowModuleName) !==
    normalizePageTemplateLookupName(moduleName)
  ) {
    return null;
  }
  if (parts.length >= 4) {
    return {
      moduleName: rowModuleName,
      dimensionTitle: second,
      versionName: third,
      label: rest.join("｜"),
      groupKey: `${second}｜${third}`,
    };
  }
  return {
    moduleName: rowModuleName,
    dimensionTitle: "",
    versionName: second,
    label: [third, ...rest].join("｜"),
    groupKey: second,
  };
}

function getStructuredScopedVersionGroups(rows, moduleName) {
  const propMap = structuredModuleVersionPropMaps[moduleName];
  if (!propMap) return [];
  const groups = new Map();
  const normalizedRows = normalizePrdTableRows(rows);
  const hasDimensionedRows = normalizedRows.some((row) =>
    Boolean(parseStructuredScopedRowKey(row.key, moduleName)?.dimensionTitle),
  );
  normalizedRows.forEach((row) => {
    const parsed = parseStructuredScopedRowKey(row.key, moduleName);
    if (!parsed) return;
    if (
      hasDimensionedRows &&
      !parsed.dimensionTitle &&
      !isManualModuleVersionName(moduleName, parsed.versionName)
    ) {
      return;
    }
    const propKey = propMap[parsed.label];
    if (!propKey) return;
    if (!groups.has(parsed.groupKey)) {
      const groupIndex = groups.size;
      groups.set(parsed.groupKey, {
        id: getStructuredScopedVersionId(moduleName, parsed.groupKey, groupIndex),
        title: parsed.versionName,
        dimensionTitle: parsed.dimensionTitle,
        props: {},
      });
    }
    const value = String(row.value || "").trim();
    if (value) groups.get(parsed.groupKey).props[propKey] = value;
  });
  return [...groups.values()].filter(
    (group) =>
      Object.keys(group.props).length ||
      isManualModuleVersionName(moduleName, group.title),
  );
}

function getStructuredBaseVersionGroup(rows, moduleName) {
  const propMap = structuredModuleVersionPropMaps[moduleName];
  if (!propMap) return null;
  const props = {};
  Object.entries(propMap).forEach(([label, propKey]) => {
    const value = getStructuredPrdValue(rows, label);
    if (value) props[propKey] = value;
  });
  return Object.keys(props).length
    ? getBaseBlueprintAudienceVersion({ props })
    : getBaseBlueprintAudienceVersion({ props: {} });
}

function ensureDefaultVersionGroupForManualVersions(groups, rows, moduleName) {
  const hasManualVersion = (state.prdManualModuleVersions?.[moduleName] || []).length > 0;
  if (!hasManualVersion || !groups.length) return groups;
  if (hasImportedModuleBlueprintVersions(moduleName)) return groups;
  if (groups.some((group) => group.id === "base" || group.title === "默认版本" || !group.title)) return groups;
  return [getStructuredBaseVersionGroup(rows, moduleName), ...groups];
}

function buildGuidedLineageGraphByDimensions(moduleName, variants = []) {
  const dimensions = [];
  const dimensionKeyToId = new Map();
  variants.forEach((variant) => {
    const dimensionTitle = variant.dimensionTitle || "默认维度";
    const dimensionKey = normalizePageTemplateLookupName(dimensionTitle) || "default";
    if (dimensionKeyToId.has(dimensionKey)) return;
    const dimensionId = `${moduleName}_dimension_${dimensions.length + 1}`;
    dimensionKeyToId.set(dimensionKey, dimensionId);
    dimensions.push({
      id: dimensionId,
      title: dimensionTitle,
      x: 28,
      y: 28 + dimensions.length * 180,
    });
  });
  return {
    dimensions,
    nodes: variants.map((variant, index) => {
      const dimensionTitle = variant.dimensionTitle || "默认维度";
      const dimensionKey = normalizePageTemplateLookupName(dimensionTitle) || "default";
      return {
        id: variant.id === "base" ? "node_base" : `node_${variant.id}`,
        variantId: variant.id,
        kind: "component",
        dimensionId: dimensionKeyToId.get(dimensionKey) || dimensions[0]?.id,
        x: 260,
        y: 28 + index * 180,
      };
    }),
    edges: [],
  };
}

function bindStructuredModuleVersionFields(nodes, rows = []) {
  structuredModuleVersionTargets.forEach(({ moduleName, schemaIds }) => {
    const groups = ensureDefaultVersionGroupForManualVersions(
      getStructuredScopedVersionGroups(rows, moduleName),
      rows,
      moduleName,
    );
    if (groups.length < 2) return;
    const target = findTemplateNodeBySchemaId(nodes, schemaIds);
    if (!target) return;
    const variants = groups.map((group) => {
      const variantNode = cloneNodeForLineage(target);
      assignStructuredProps(variantNode, group.props);
      return {
        id: group.id,
        title: group.title,
        dimensionTitle: group.dimensionTitle,
        node: variantNode,
      };
    });
    assignStructuredProps(target, groups[0].props);
    target.guidedLineageVariants = variants;
    target.activeLineageVariantId = variants[0].id;
    target.guidedLineageGraph = buildGuidedLineageGraphByDimensions(moduleName, variants);
  });
  bindStructuredTaskListVersionFields(nodes, rows);
}

function getStructuredTaskListVersionGroups(rows) {
  const groups = new Map();
  normalizePrdTableRows(rows).forEach((row) => {
    const parts = String(row.key || "").split("｜");
    if (parts.length < 3) return;
    const [rowModuleName, versionName, ...labelParts] = parts;
    const label = labelParts.join("｜");
    if (
      normalizePageTemplateLookupName(rowModuleName) !==
      normalizePageTemplateLookupName("任务列表模块")
    ) {
      return;
    }
    if (!groups.has(versionName)) {
      const groupIndex = groups.size;
      groups.set(versionName, {
        id: getStructuredScopedVersionId(
          "任务列表模块",
          versionName,
          groupIndex,
          "task_version",
        ),
        title: versionName,
        values: {},
      });
    }
    const value = String(row.value || "").trim();
    if (value) groups.get(versionName).values[label] = value;
  });
  return [...groups.values()].filter(
    (group) =>
      Object.keys(group.values).length ||
      isManualModuleVersionName("任务列表模块", group.title),
  );
}

function getStructuredBaseTaskListVersionGroup(rows) {
  const value = (label) => getStructuredPrdValue(rows, label);
  const taskDefaults = getTaskListFieldDefaultsFromPrd(rows);
  const values = {};
  const taskCount = getPrdTaskListCount(rows);
  Array.from({ length: taskCount }, (_, taskIndex) => taskIndex + 1).forEach((index) => {
    [
      `任务${index}标题`,
      `任务${index}奖励类型`,
      `任务${index}奖励数量`,
      `任务${index}每日次数`,
      `任务${index}按钮文案`,
      `任务${index}描述`,
    ].forEach((label) => {
      const nextValue = value(label) || taskDefaults[label] || "";
      if (nextValue) values[label] = nextValue;
    });
  });
  return getBaseBlueprintAudienceVersion({ values });
}

function createTaskListChildrenFromStructuredValues(values = {}) {
  const taskCount = Math.max(
    1,
    ...Object.keys(values).map((label) => {
      const match = label.match(/^任务(\d+)/);
      return match ? Number(match[1]) : 0;
    }),
  );
  return Array.from({ length: taskCount }, (_, taskIndex) => taskIndex + 1).map((index) =>
    createAtomNode("TaskModule", {
      title: values[`任务${index}标题`] || undefined,
      rewardLabel: values[`任务${index}奖励类型`] || undefined,
      rewardCount: values[`任务${index}奖励数量`] || undefined,
      frequency: values[`任务${index}每日次数`] || undefined,
      buttonText: values[`任务${index}按钮文案`] || undefined,
      description: values[`任务${index}描述`] || undefined,
    }),
  );
}

function bindStructuredTaskListVersionFields(nodes, rows = []) {
  let groups = getStructuredTaskListVersionGroups(rows);
  const hasManualVersion = (state.prdManualModuleVersions?.["任务列表模块"] || []).length > 0;
  const hasImportedVersions = hasImportedModuleBlueprintVersions("任务列表模块");
  if (hasManualVersion && !hasImportedVersions && groups.length && !groups.some((group) => group.id === "base")) {
    groups = [getStructuredBaseTaskListVersionGroup(rows), ...groups];
  }
  if (groups.length < 2) return;
  const target = findTaskListModuleNode(nodes);
  if (!target) return;
  const variants = groups.map((group) => {
    const variantNode = cloneNodeForLineage(target);
    variantNode.children = createTaskListChildrenFromStructuredValues(group.values);
    variantNode.allowedChildren = ["TaskModule"];
    variantNode.className = variantNode.className || "task-list-module";
    return {
      id: group.id,
      title: group.title,
      node: variantNode,
    };
  });
  target.children = createTaskListChildrenFromStructuredValues(groups[0].values);
  target.allowedChildren = ["TaskModule"];
  target.className = target.className || "task-list-module";
  target.guidedLineageVariants = variants;
  target.activeLineageVariantId = variants[0].id;
  target.guidedLineageGraph = buildGuidedLineageGraphByDimensions("任务列表模块", variants);
}

function assignStructuredProps(node, props) {
  if (!node) return;
  node.props = node.props || {};
  Object.entries(props).forEach(([key, value]) => {
    const nextValue = String(value || "").trim();
    if (nextValue) node.props[key] = nextValue;
  });
}

function parsePageTemplateVariableRowKey(key) {
  const parts = String(key || "").split("｜");
  if (parts[0] !== PAGE_TEMPLATE_VARIABLE_ROW_PREFIX || parts.length < 3) return null;
  const moduleIndex = Number(parts[1]) - 1;
  let compoundKey = parts.slice(2).join("｜");
  const pageKeyMatch = compoundKey.match(/^(\d+)\|(.+)$/);
  if (pageKeyMatch) {
    const embeddedModuleIndex = Number(pageKeyMatch[1]);
    if (
      Number.isFinite(embeddedModuleIndex) &&
      (embeddedModuleIndex === moduleIndex || embeddedModuleIndex === moduleIndex + 1)
    ) {
      compoundKey = pageKeyMatch[2];
    }
  }
  if (!Number.isFinite(moduleIndex) || !compoundKey) return null;
  return { moduleIndex, compoundKey };
}

function applyPageTemplateVariableValuesToNode(node, values) {
  if (!node || !values) return;
  if (node.type !== "molecule") {
    let maxPrizeIndex = 0;
    values.forEach((value, compoundKey) => {
      if (!node.props) return;
      if (compoundKey in node.props || isLotteryPrizePropKey(compoundKey) || compoundKey === "prizeCount") {
        node.props[compoundKey] = value;
        const prizeIndex = Number(String(compoundKey).match(/^prize(\d+)/)?.[1] || 0);
        if (prizeIndex) maxPrizeIndex = Math.max(maxPrizeIndex, Math.min(MAX_LOTTERY_PRIZE_COUNT, prizeIndex));
      }
    });
    if (maxPrizeIndex) {
      node.props.prizeCount = Math.min(
        MAX_LOTTERY_PRIZE_COUNT,
        Math.max(Number(node.props.prizeCount) || 0, maxPrizeIndex),
      );
    }
    return;
  }

  values.forEach((value, compoundKey) => {
    if (!compoundKey.includes(".") && node.props && compoundKey in node.props) {
      node.props[compoundKey] = value;
    }
  });
  syncDynamicMoleculeChildren(node);

  const prizeCountsByChild = new Map();
  values.forEach((value, compoundKey) => {
    if (!compoundKey.includes(".")) return;
    const [childIndex, propKey] = compoundKey.split(".");
    const child = node.children?.[Number(childIndex)];
    if (child?.props && (propKey in child.props || isLotteryPrizePropKey(propKey) || propKey === "prizeCount")) {
      child.props[propKey] = value;
      const prizeIndex = Number(String(propKey).match(/^prize(\d+)/)?.[1] || 0);
      if (prizeIndex) {
        prizeCountsByChild.set(
          childIndex,
          Math.max(prizeCountsByChild.get(childIndex) || 0, Math.min(MAX_LOTTERY_PRIZE_COUNT, prizeIndex)),
        );
      }
      (child.guidedStates || []).forEach((entry) => {
        if (entry.node?.props && (propKey in entry.node.props || isLotteryPrizePropKey(propKey) || propKey === "prizeCount")) {
          entry.node.props[propKey] = value;
        }
      });
    }
  });
  prizeCountsByChild.forEach((count, childIndex) => {
    const child = node.children?.[Number(childIndex)];
    if (!child?.props) return;
    child.props.prizeCount = Math.min(
      MAX_LOTTERY_PRIZE_COUNT,
      Math.max(Number(child.props.prizeCount) || 0, count),
    );
    (child.guidedStates || []).forEach((entry) => {
      if (entry.node?.props) entry.node.props.prizeCount = child.props.prizeCount;
    });
  });
}

function applyPageTemplateVariableRowsToNodes(nodes = [], rows = []) {
  const valuesByModule = new Map();
  normalizePrdTableRows(rows).forEach((row) => {
    const parsed = parsePageTemplateVariableRowKey(row.key);
    const value = String(row.value || "").trim();
    if (!parsed || !value) return;
    if (!valuesByModule.has(parsed.moduleIndex)) valuesByModule.set(parsed.moduleIndex, new Map());
    valuesByModule.get(parsed.moduleIndex).set(parsed.compoundKey, value);
  });

  valuesByModule.forEach((values, moduleIndex) => {
    const node = nodes[moduleIndex];
    applyPageTemplateVariableValuesToNode(node, values);
    (node?.guidedStates || []).forEach((entry) => {
      applyPageTemplateVariableValuesToNode(entry.node, values);
    });
  });
}

function applyPageTemplateVariableVersionRowsToNodes(nodes = [], rows = [], pageTemplateId = "") {
  if (!pageTemplateId) return;
  const valuesByModuleAndVersion = new Map();
  normalizePrdTableRows(rows).forEach((row) => {
    const parsed = parsePageTemplateVariableVersionRowKey(row.key);
    if (!parsed) return;
    if (!valuesByModuleAndVersion.has(parsed.moduleIndex)) {
      valuesByModuleAndVersion.set(parsed.moduleIndex, new Map());
    }
    const valuesByVersion = valuesByModuleAndVersion.get(parsed.moduleIndex);
    if (!valuesByVersion.has(parsed.versionName)) {
      valuesByVersion.set(parsed.versionName, new Map());
    }
    valuesByVersion.get(parsed.versionName).set(parsed.compoundKey, row.value ?? "");
  });

  nodes.forEach((node, moduleIndex) => {
    const versionModuleKey = getPageTemplateVersionModuleKey(pageTemplateId, moduleIndex);
    const manualVersions = getManualModuleBlueprintVersions(versionModuleKey);
    if (!manualVersions.length) return;
    const valuesByVersion = valuesByModuleAndVersion.get(moduleIndex) || new Map();
    const baseVariant = {
      id: "base",
      title: DEFAULT_BLUEPRINT_AUDIENCE_NAME,
      dimensionTitle: "蓝图版本",
      node: cloneNodeForLineage(node),
    };
    const importedVariants = manualVersions.map((version) => {
      const variantNode = cloneNodeForLineage(node);
      const values = valuesByVersion.get(version.name) || new Map();
      applyPageTemplateVariableValuesToNode(variantNode, values);
      (variantNode.guidedStates || []).forEach((entry) => {
        applyPageTemplateVariableValuesToNode(entry.node, values);
      });
      return {
        id: version.id,
        title: version.name,
        dimensionTitle: "蓝图版本",
        node: variantNode,
      };
    });
    const variants = hasImportedModuleBlueprintVersions(versionModuleKey)
      ? importedVariants
      : [
        baseVariant,
        ...importedVariants,
      ];
    if (!variants.length) return;
    node.guidedLineageVariants = variants;
    node.activeLineageVariantId = variants[0].id;
    node.guidedLineageGraph = buildGuidedLineageGraphByDimensions(node.name || node.schemaId || "模块", variants);
  });
}

function applyLotteryConsumptionStructuredFields(nodes, rows = []) {
  const value = (label) => getStructuredPrdValue(rows, label);

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["账户优惠券提示"]), {
    amountText: value("当前账户优惠券总金额"),
    actionText: value("按钮文案"),
  });

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["TaskTitle"]), {
    title: value("抽奖模块标题"),
    subtitle: value("剩余抽奖次数文案"),
  });
  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["Announcement"]), {
    text: value("用户中奖公告文案"),
  });
  assignStructuredProps(findTemplateNodeBySchemaId(nodes, [
    "LotteryGridInteractive",
    "抽奖九宫格-报名前",
    "抽奖九宫格-报名后",
    "抽奖样式2",
  ]), {
    prize1Name: value("奖品1名称"),
    prize2Name: value("奖品2名称"),
    prize3Name: value("奖品3名称"),
    prize4Name: value("奖品4名称"),
    prize5Name: value("奖品5名称"),
    prize6Name: value("奖品6名称"),
    prize7Name: value("奖品7名称"),
    prize8Name: value("奖品8名称"),
    buttonText: value("抽奖按钮文案"),
  });

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["消耗返数据报名规则"]), {
    titleText: value("消耗返模块标题"),
    lotteryText: value("抽奖入口文案"),
    buttonText: value("行动按钮文案"),
    reward1AmountText: value("第1档奖励金额"),
    reward2AmountText: value("第2档奖励金额"),
    reward3AmountText: value("第3档奖励金额"),
    milestone1Text: value("第1个进度节点文案"),
    milestone2Text: value("第2个进度节点文案"),
    milestone3Text: value("第3个进度节点文案"),
    milestone4Text: value("第4个进度节点文案"),
    leftLabel: value("左侧数据名称"),
    leftValue: value("左侧数据数值"),
    leftUnit: value("左侧数据单位"),
    rightLabel: value("右侧数据名称"),
    rightValue: value("右侧数据数值"),
    rulesTitle: value("规则标题"),
    ruleOne: value("参与规则1"),
    ruleTwo: value("参与规则2"),
    ruleThree: value("参与规则3"),
    note: value("规则备注"),
  });

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["BigDay优惠券报名"]), {
    titleText: value("报名模块标题"),
    couponAmount: value("优惠券金额"),
    couponUnit: value("优惠券单位"),
    couponExpiry: value("优惠券有效期文案"),
    couponPrefix: value("优惠券品牌前缀"),
    couponTitle: value("优惠券名称"),
    actionText: value("报名按钮文案"),
    dateText: value("活动日期文案"),
    thresholdText: value("报名门槛文案"),
    descriptionText: value("报名说明文案"),
  });

  const taskList = findTaskListModuleNode(nodes);
  const taskValues = getStructuredBaseTaskListVersionGroup(rows).values;
  if (taskList && Object.keys(taskValues).length) {
    taskList.children = createTaskListChildrenFromStructuredValues(taskValues);
  }

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["投放案例"]), {
    categoryText: value("行业分类"),
    headlineText: value("案例标题"),
    videoFrequencyText: value("视频日更数量"),
    videoDescriptionText: value("视频内容建议"),
    placementDescriptionText: value("投放建议"),
    placementAmountText: value("建议单笔投放金额"),
    executionDescriptionText: value("执行要点"),
    updateMinText: value("日更最小数量"),
    updateMaxText: value("日更最大数量"),
    budgetPercentText: value("追投预算比例"),
  });

  assignStructuredProps(findTemplateNodeBySchemaId(nodes, ["StickyBottomButton", "置底按钮"]), {
    buttonText: value("底部按钮文案"),
  });
}

function bindPrdModuleVariantsToTemplateNodes(
  nodes,
  modules = [],
  consumptionProgressConfig = null,
  taskListConfig = null,
  structuredRows = [],
  pageTemplateId = "",
) {
  const lotteryModule = modules.find(
    (module) =>
      (module.component === "LotteryGrid" ||
        module.component === "LotteryGridInteractive") &&
      module.variantGroups?.length >= 2,
  );
  if (lotteryModule) {
    const target = findLotteryModuleNode(nodes);
    if (target) {
      const variants = lotteryModule.variantGroups.map((group) => {
        const variantNode = cloneNodeForLineage(target);
        applyLotteryRowsToNode(variantNode, group.rows || []);
        return {
          id: group.id,
          title: group.name,
          node: variantNode,
        };
      });
      const personalVariant =
        variants.find((variant) => variant.id === "base") || variants[0];
      applyLotteryRowsToNode(
        target,
        lotteryModule.variantGroups.find((group) => group.id === personalVariant.id)?.rows || [],
      );
      target.guidedLineageVariants = variants;
      target.activeLineageVariantId = personalVariant.id;
      target.guidedLineageGraph = {
        dimensions: variants.map((variant, index) => ({
          id: `lottery_dimension_${index + 1}`,
          title: variant.title,
          x: 28,
          y: 28 + index * 180,
        })),
        nodes: variants.map((variant, index) => ({
          id: variant.id === "base" ? "node_base" : `node_${variant.id}`,
          variantId: variant.id,
          kind: "component",
          dimensionId: `lottery_dimension_${index + 1}`,
          x: 260,
          y: 28 + index * 180,
        })),
        edges: [],
      };
    }
  }
  bindPrdTaskListToTemplateNodes(nodes, taskListConfig);
  bindConsumptionProgressVariants(nodes, consumptionProgressConfig);
  applyLotteryConsumptionStructuredFields(nodes, structuredRows);
  bindStructuredModuleVersionFields(nodes, structuredRows);
  applyPageTemplateVariableRowsToNodes(nodes, structuredRows);
  applyPageTemplateVariableVersionRowsToNodes(nodes, structuredRows, pageTemplateId);
  const stateNodes = nodes.flatMap((node) => (node.guidedStates || []).map((entry) => entry.node).filter(Boolean));
  if (stateNodes.length) {
    applyLotteryConsumptionStructuredFields(stateNodes, structuredRows);
    bindStructuredModuleVersionFields(stateNodes, structuredRows);
  }
}

function findDemoMoleculeByName(name) {
  const normalizedName = String(name).replace(/\s+/g, "").toLowerCase();
  return moleculeSchemas.find((item) => {
    if (item.id === "MoleculeContainer") return false;
    const candidateName = String(item.name || "").replace(/\s+/g, "").toLowerCase();
    return candidateName === normalizedName || candidateName.includes(normalizedName);
  });
}

function createLotteryTaskNodes(module, molecule) {
  const value = (field) => module.rows.find((row) => row.field === field)?.value || "";
  const moduleGroupId = uid();
  const prizeProps = { buttonText: "抽" };
  for (let index = 1; index <= 8; index += 1) {
    const prizeValue = value(`奖池 ${index}`);
    if (prizeValue) prizeProps[`prize${index}`] = prizeValue;
  }

  const savedChildren = molecule?.children?.length
    ? molecule.children.map(([schemaId, overrides = {}]) => createAtomNode(schemaId, overrides))
    : [];
  const savedLottery = savedChildren.find((child) =>
    child.schemaId === "LotteryGridInteractive" || child.schemaId === "LotteryGrid",
  );
  const lotteryChild = savedLottery || createAtomNode("LotteryGridInteractive");
  lotteryChild.props = { ...lotteryChild.props, ...prizeProps };

  const savedTasks = savedChildren.filter((child) => child.schemaId === "TaskModule");
  const taskIndexes = module.rows
    .map((row) => row.field.match(/^任务 (\d+) 名称$/)?.[1])
    .filter(Boolean);
  const rowTaskNodes = taskIndexes.map((taskIndex) =>
    createAtomNode("TaskModule", {
      title: value(`任务 ${taskIndex} 名称`),
      description: value(`任务 ${taskIndex} 内容`),
      frequency: "可完成",
      buttonText: "去完成",
      rewardLabel: "抽奖",
      rewardCount: "+1",
    }),
  );
  const taskNodes = savedTasks.length
    ? savedTasks
    : rowTaskNodes.length
      ? rowTaskNodes
      : createDefaultGuidedTasks();
  taskNodes.forEach((taskNode, index) => {
    const taskIndex = String(index + 1);
    const title = value(`任务 ${taskIndex} 名称`);
    const description = value(`任务 ${taskIndex} 内容`);
    if (title) taskNode.props.title = title;
    if (description) taskNode.props.description = description;
    taskNode.moduleGroupId = moduleGroupId;
    taskNode.moduleGroupRole = "task";
  });

  return [
    {
      id: uid(),
      schemaId: molecule?.id || "demo_lottery",
      name: "九宫格抽奖",
      type: "molecule",
      moduleGroupId,
      moduleGroupRole: "lottery",
      children: [lotteryChild],
    },
    ...taskNodes,
  ];
}

function applyConsumptionReturnValues(node, module) {
  const title = module.rows.find((row) => row.field === "标题")?.value || "";
  const tiers = (module.rows.find((row) => row.field === "金额梯度")?.value || "")
    .split(/[-/、,\s]+/)
    .filter(Boolean);
  let tierIndex = 0;
  let titleApplied = false;

  node.children.forEach((child) => {
    if (!titleApplied) {
      const titleKey = ["title", "text", "titleText"].find((key) => key in child.props);
      if (titleKey) {
        child.props[titleKey] = title;
        titleApplied = true;
      }
    }
    Object.keys(child.props).forEach((key) => {
      if (/amount/i.test(key) && tierIndex < tiers.length) {
        child.props[key] = tiers[tierIndex];
        tierIndex += 1;
      }
    });
  });

  return node;
}

function applyMoleculeBlueprintValues(node, module) {
  module.rows.forEach((row) => {
    if (row.moleculePropKey && node.props && row.moleculePropKey in node.props) {
      node.props[row.moleculePropKey] = Number.isFinite(Number(row.value)) ? Number(row.value) : row.value;
    }
  });
  syncDynamicMoleculeChildren(node);
  module.rows.forEach((row) => {
    if (typeof row.childIndex !== "number" || !row.propKey) return;
    const child = node.children?.[row.childIndex];
    if (child?.props && (row.propKey in child.props || isLotteryPrizePropKey(row.propKey))) {
      child.props[row.propKey] = row.value;
    }
  });
  return node;
}

function getOneClickBoostProps(rows = []) {
  const value = (field) => rows.find((row) => row.field === field)?.value || "";
  return {
    titlePrefix: value("标题前段"),
    brandText: value("品牌文字"),
    titleSuffix: value("标题后段"),
    sectionTitle: value("建议标签"),
    videoTitle: value("视频标题"),
    userName: value("用户昵称"),
    suggestionText: value("诊断建议"),
    moreText: value("查看更多文案"),
    buttonText: value("按钮文案"),
  };
}

function createGuidedStateNodes(module) {
  return (module.states || []).map((stateConfig) => {
    const overrides = stateConfig.component === "OneClickBoost"
      ? getOneClickBoostProps(stateConfig.rows)
      : {};
    const node = createAtomNode(stateConfig.component, overrides);
    return {
      id: stateConfig.id,
      name: stateConfig.name,
      component: stateConfig.component,
      node,
    };
  });
}

function createPrimaryGuidedState(module, overrides) {
  const node = createAtomNode(module.component, overrides);
  return {
    id: "default",
    name: module.name,
    component: module.component,
    node,
  };
}

function createPrependedDemoNodes(module) {
  return (module.prependComponents || []).map((item) => {
    const rows = item.rows || [];
    const value = (field) => rows.find((row) => row.field === field)?.value || "";
    const overrides = item.component === "RedPacketCoupon" && rows.length
      ? {
          prefix: value("前缀"),
          title: value("标题"),
          accountInfo: value("账户信息"),
          totalLabel: value("总计标签"),
          amount: value("金额"),
          unit: value("单位"),
          buttonText: value("按钮文案"),
        }
      : {};
    const node = createAtomNode(item.component, overrides);
    node.name = item.name || node.name;
    node.sourceCompanionId = item.id;
    return node;
  });
}

function createDemoNodeFromModule(module, options = {}) {
  if (!options.skipSync) syncMoleculeBlueprintRows(module);
  if (!options.rows) ensureBlueprintVariantGroups(module);
  module = {
    ...module,
    rows: clone(options.rows || module.rows || []),
  };
  const value = (field) => module.rows.find((row) => row.field === field)?.value || "";
  const overrides = {};
  module.rows.forEach((row) => {
    if (row.propKey) overrides[row.propKey] = row.value;
  });

  if (module.component.startsWith("molecule:")) {
    const moleculeName = module.component.slice("molecule:".length);
    const molecule = findDemoMoleculeByName(moleculeName);
    if (
      moleculeName === "九宫格" &&
      (module.useLotteryTaskGroup || module.rows.some((row) => row.field === "奖池 1"))
    ) {
      return createLotteryTaskNodes(module, molecule);
    }
    if (molecule) {
      const node = createMoleculeNode(molecule.id);
      node.name = module.name;
      applyMoleculeBlueprintValues(node, module);
      const nextNode = /^消耗返/.test(moleculeName) && module.rows.some((row) => row.field === "金额梯度")
        ? applyConsumptionReturnValues(node, module)
        : node;
      return attachBlueprintLineageVariants(nextNode, module, options);
    }
    if (/^消耗返/.test(moleculeName) && module.rows.some((row) => row.field === "金额梯度")) {
      return attachBlueprintLineageVariants({
        id: uid(),
        schemaId: "demo_consumption_return",
        name: module.name,
        type: "molecule",
        children: [
          createAtomNode("TaskModule", {
            title: value("标题"),
            description: `金额梯度：${value("金额梯度")}`,
            buttonText: "去投放",
            rewardLabel: "返还",
            rewardCount: value("金额梯度"),
          }),
        ],
      }, module, options);
    }
    return attachBlueprintLineageVariants(
      createAtomNode(module.fallbackComponent || "LotteryGridInteractive"),
      module,
      options,
    );
  }

  if (module.component === "文本组件3") {
    overrides.text = value("文本") || value("内容") || module.rows[0]?.value || "";
  } else if (module.component === "RichText") {
    overrides.content = value("文本") || value("内容") || module.rows[0]?.value || "";
    overrides.fontSize = value("字号") || "body";
    overrides.color = "black";
  } else if (module.component === "DouPlusJunePromoAnimationV2") {
    overrides.titleText = value("logo标题") || value("顶部标题") || "DOU+";
    overrides.mainTextTop = value("主标题") || module.name;
    overrides.mainTextBottom = value("副标题") || value("核心利益点") || "";
    overrides.dateText = value("活动时间") || value("日期") || "";
  } else if (module.component === "BigDayCouponClassic") {
    overrides.amount = value("金额") || "800";
    overrides.unit = value("单位") || "元";
    overrides.expiry = value("有效期") || "";
    overrides.prefix = value("前缀") || "DOU+";
    overrides.title = value("标题") || module.name || "优惠券";
  } else if (module.slot === "hero") {
    overrides.titleText = value("主标题");
    overrides.mainTextTop =
      value("核心利益点") ||
      value("核心信息") ||
      value("召回文案") ||
      value("权益说明") ||
      value("预热利益点") ||
      value("召回利益点") ||
      value("返场权益");
    overrides.dateText = value("活动时间") || value("开始时间") || value("开放时间") || value("截止时间");
  } else if (module.component === "LotteryGridInteractive") {
    for (let index = 1; index <= 8; index += 1) {
      const prizeValue = value(`奖品${index}`) || value(`奖品 ${index}`) || value(`奖池 ${index}`);
      if (prizeValue) overrides[`prize${index}`] = prizeValue;
    }
    overrides.buttonText = value("抽奖按钮") || value("按钮文案") || "抽";
    overrides.resultTitle = value("中奖提示") || value("抽奖标题") || "恭喜抽中{prize}！";
    overrides.resultHintText = value("奖品梯度") || "快去填写地址吧~";
  } else if (module.component === "TaskModule") {
    overrides.title = value("任务标题") || value("冲刺目标");
    overrides.description = value("描述文字") || value("任务内容") || value("说明文案");
    overrides.frequency = value("每日次数") || value("任务次数") || "";
    overrides.rewardLabel = value("奖励标签") || "抽奖";
    overrides.rewardCount = value("奖励数量") || "+1";
    overrides.buttonText = value("按钮文案") || "去完成任务";
  } else if (module.component === "BigButton" || module.component === "SectionTitle" || module.component === "Announcement") {
    overrides.text = value("文本") || module.rows[0]?.value || module.name;
  } else if (module.component === "PromotionModule") {
    overrides.title = value("服务标题") || value("预约标题") || value("报告标题");
    overrides.description = value("服务权益") || value("预约权益") || value("报告内容");
    overrides.buttonText = value("按钮文案");
  } else if (module.component === "QualityVideoDiagnosis") {
    overrides.title = value("标题") || value("模块标题");
    overrides.description = value("提示文案") || value("副标题") || value("说明文案");
    overrides.buttonText = value("按钮文案");
  } else if (module.slot === "content") {
    overrides.src = contentModuleImageUrl;
    overrides.alt = value("模块标题") || value("内容标题") || value("说明标题") || "内容模块";
    overrides.title = value("模块标题") || value("内容标题") || value("说明标题");
    overrides.subtitle =
      value("案例介绍") ||
      value("内容说明") ||
      value("预告内容") ||
      value("说明正文") ||
      value("服务介绍");
  }

  const node = createAtomNode(module.component, overrides);
  const guidedStates = createGuidedStateNodes(module);
  if (guidedStates.length) {
    node.guidedStates = [createPrimaryGuidedState(module, overrides), ...guidedStates];
    node.activeGuidedStateId = "default";
  }
  const nextNode = attachBlueprintLineageVariants(node, module, options);
  if (!options.skipLineage && module.prependComponents?.length) {
    return [...createPrependedDemoNodes(module), nextNode];
  }
  return nextNode;
}

function attachBlueprintLineageVariants(node, module, options = {}) {
  if (options.skipLineage || !node || Array.isArray(node)) return node;
  const sourceModule = options.sourceModule || module;
  const groups = ensureBlueprintVariantGroups(sourceModule);
  if (!groups.length) return node;

  node.guidedLineageVariants = groups.map((group) => ({
    id: group.id,
    title: group.name,
    node: cloneNodeForLineage(
      createDemoNodeFromModule(sourceModule, {
        rows: group.rows,
        skipLineage: true,
        skipSync: true,
      }),
    ),
  }));
  node.activeLineageVariantId = groups[0].id;
  delete node.guidedLineageGraph;
  return node;
}

function renderGuidedPreview() {
  const center = $(".activity-center");
  if (!center) return;
  if (
    state.pages[0] &&
    !state.pages.some((page) => state.guidedVisiblePageIds.includes(page.id))
  ) {
    state.guidedVisiblePageIds = [state.pages[0].id];
    state.activePageId = state.pages[0].id;
  }
  const visiblePageIds = new Set(state.guidedVisiblePageIds);
  const visiblePages = state.pages.filter((page) => visiblePageIds.has(page.id));
  const selected = state.selectedId ? findNode(state.nodes, state.selectedId)?.node : null;
  const workspaceMode = state.guidedWorkspaceMode || "split";

  center.innerHTML = `
    <div class="guided-preview-shell guided-workspace is-${workspaceMode}">
      ${renderGuidedBlueprintPane(workspaceMode, visiblePageIds)}
      <section class="guided-canvas-pane">
        <button class="guided-theme-entry" data-guided-open-theme>
          <span aria-hidden="true">◐</span>
          页面配色
        </button>
        <button class="guided-add-entry" data-guided-open-add>
          <span aria-hidden="true">＋</span>
          增加组件
        </button>
        <button class="guided-export-entry guided-export-entry-floating" data-guided-open-export>
          <span>↓</span>
          导出切图
        </button>
        <main class="device-stage guided-device-stage">
          <div class="pages-row">
            <div
              class="canvas-world guided-canvas-world ${state.guidedCanvasInitialized ? "" : "is-initializing"}"
              style="transform:translate3d(${state.canvasPanX}px, ${state.canvasPanY}px, 0) scale(${state.canvasZoom});--guided-action-scale:${clamp(1 / Math.max(state.canvasZoom, 0.01), 0.75, 1.6)};--guided-title-scale:${getGuidedTitleScale()};"
            >
              ${
                visiblePages.length
                  ? renderGuidedPageTree(visiblePages)
                  : `<div class="guided-canvas-empty">从左侧选择要同时预览的页面</div>`
              }
            </div>
          </div>
        </main>
      </section>
      <div class="guided-operation-host" aria-live="polite">
        ${
          state.guidedPanelMode && (selected || state.guidedPanelMode === "page" || state.guidedPanelMode === "add")
            ? renderGuidedFloatingPanel(selected)
            : ""
        }
      </div>
    </div>
  `;
  $(".guided-export-entry")?.addEventListener("click", (event) => {
    event.stopPropagation();
    state.selectedId = null;
    state.guidedStateMenuNodeId = null;
    state.guidedPanelMode = null;
    state.view = "guided-export";
    render();
  });
  $(".guided-theme-entry")?.addEventListener("click", (event) => {
    event.stopPropagation();
    state.selectedId = null;
    state.guidedStateMenuNodeId = null;
    state.guidedPanelMode = "page";
    updateGuidedNodeSelection(null);
    updateGuidedPanel({ enter: true });
  });
  $(".guided-add-entry")?.addEventListener("click", (event) => {
    event.stopPropagation();
    state.selectedId = null;
    state.guidedStateMenuNodeId = null;
    state.guidedPanelMode = "add";
    state.guidedAddTargetContext = null;
    updateGuidedNodeSelection(null);
    updateGuidedPanel({ enter: true });
  });
  const stage = $(".guided-device-stage");
  bindCanvasStageInteractions(stage);
  try {
    window.renderReactMaterials?.();
  } finally {
    if (!state.guidedCanvasInitialized && workspaceMode !== "blueprint-full") {
      initializeGuidedCanvasView();
    } else {
      requestAnimationFrame(() => {
        invalidateStageRect();
        updateCanvasZoom();
      });
    }
  }
}

function getGuidedTitleScale() {
  return clamp(1 / Math.sqrt(Math.max(state.canvasZoom, 0.01)), 0.82, 2.35);
}

function renderGuidedPageTree(visiblePages) {
  const visibleCompanionIds = new Set(
    state.guidedVisibleCompanionNodeIds || [],
  );
  const hasSideCompanions = visiblePages.some((page) =>
    (page.nodes || []).some(
      (node) =>
        node.canvasPlacement === "page-side" &&
        visibleCompanionIds.has(node.id),
    ),
  );
  return `
    <div class="guided-page-tree ${hasSideCompanions ? "has-side-companions" : ""}" style="--guided-page-count:${visiblePages.length}">
      <div class="guided-activity-title-node">
        <strong>${escapeHtml(state.activity?.name || demoPrdBlueprint.activityName || "活动名称")}</strong>
      </div>
      <div class="guided-page-title-row ${visiblePages.length > 1 ? "has-branches" : ""}">
        ${visiblePages.map(renderGuidedPageTitleNode).join("")}
      </div>
      <div class="guided-page-preview-row">
        ${visiblePages.map(renderGuidedPagePreview).join("")}
      </div>
    </div>
  `;
}

function renderGuidedPageTitleNode(pageData) {
  const isActive = pageData.id === state.activePageId;
  const pageSelected = isActive && state.guidedPanelMode === "page" && !state.selectedId;
  return `
    <header
      class="guided-page-title-node ${pageData.isSystemFallback ? "is-system-fallback" : ""} ${isActive ? "active" : ""} ${pageSelected ? "has-selected-page" : ""}"
      data-guided-page-title="${pageData.id}"
    >
      <strong>${escapeHtml(pageData.dimension || "未分组")}</strong>
      <span>${escapeHtml(pageData.name || "活动页面")}</span>
    </header>
  `;
}

function renderGuidedPaneEdgeToggle(mode) {
  if (mode === "blueprint-full") return "";
  const isExpanded = mode === "blueprint-panel";
  return `
    <button
      class="guided-pane-edge-toggle ${isExpanded ? "is-expanded" : "is-compact"}"
      data-guided-workspace-mode="${isExpanded ? "split" : "blueprint-panel"}"
      aria-label="${isExpanded ? "收起到画布" : "展开人群表格"}"
    >
      ${isExpanded ? "←" : "→"}
    </button>
  `;
}

function enterGuidedPreviewWithTransition() {
  const button = document.querySelector("[data-demo-generate-activity]");

  button?.setAttribute("disabled", "true");
  buildDemoGeneratedActivity();
  state.prdDemoStep = "preview";
  state.view = "guided-preview";
  state.guidedWorkspaceMode = "split";
  state.blueprintReturningFromPreview = false;
  render();

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
  });
  button?.removeAttribute("disabled");
}

function returnToBlueprintWithTransition() {
  state.view = "prd-demo";
  state.prdDemoStep = "analysis";
  state.guidedWorkspaceMode = "split";
  state.blueprintReturningFromPreview = false;
  state.selectedId = null;
  state.guidedPanelMode = null;
  state.prdTemplateSelectedModuleIndex = null;
  state.prdTemplateAddModal = null;
  state.prdTemplateAddAfterIndex = null;
  render();
  window.scrollTo(0, 0);
}

function renderGuidedSidebarItems(visiblePageIds, options = {}) {
  const visibleCompanionIds = new Set(
    state.guidedVisibleCompanionNodeIds || [],
  );
  return state.pages
    .flatMap((page) => {
      const pageVisible = visiblePageIds.has(page.id);
      const pageItem = `
        <button
          class="${pageVisible ? "active" : ""}"
          data-demo-scenario="${page.id}"
          aria-pressed="${pageVisible}"
        >
          <i>${pageVisible ? "✓" : ""}</i>
          <span class="guided-page-card-copy">
            <strong>${escapeHtml(page.dimension)}</strong>
            <span>${escapeHtml(page.name)}</span>
          </span>
          ${options.showStatus ? `<em>${pageVisible ? "画布中" : "未展示"}</em>` : ""}
        </button>
      `;
      const companionItems = (page.nodes || [])
          .filter((node) => node.canvasPlacement === "page-side")
        .map((node) => {
          const companionVisible =
            pageVisible && visibleCompanionIds.has(node.id);
          return `
            <button
              class="is-companion ${companionVisible ? "active" : ""}"
              data-guided-companion-toggle="${escapeAttr(node.id)}"
              data-guided-companion-page="${escapeAttr(page.id)}"
              aria-pressed="${companionVisible}"
            >
              <i>${companionVisible ? "✓" : ""}</i>
              <span class="guided-page-card-copy">
                <strong>会场弹窗</strong>
                <span>${escapeHtml(node.name || "抽奖结果弹窗")}</span>
              </span>
              ${options.showStatus ? `<em>${companionVisible ? "画布中" : "未展示"}</em>` : ""}
            </button>
          `;
        });
      return [pageItem, ...companionItems];
    })
    .join("");
}

function renderGuidedPageSidebar(visiblePageIds) {
  return `
    <aside class="guided-page-sidebar" aria-label="页面多选">
      <button class="guided-sidebar-back" data-demo-back-analysis>
        <span>←</span>
        返回
      </button>
      <header class="guided-sidebar-header">
        <span>页面管理</span>
        <strong>${visiblePageIds.size} / ${state.pages.length} 个页面已展示</strong>
        <p>选择需要同时放入画布预览的页面，支持多选。</p>
      </header>
      <div class="guided-page-list">
        ${renderGuidedSidebarItems(visiblePageIds, { showStatus: true })}
      </div>
    </aside>
  `;
}

function renderGuidedBlueprintPane(mode, visiblePageIds) {
  if (mode === "blueprint-panel") {
    return renderGuidedBlueprintTablePane(visiblePageIds);
  }

  return `
    <aside class="guided-blueprint-pane guided-compact-nav" aria-label="页面切换">
      <button class="guided-sidebar-back" data-demo-back-analysis>
        <span>←</span>
        返回
      </button>
      <div class="guided-page-list">
        ${renderGuidedSidebarItems(visiblePageIds)}
      </div>
    </aside>
  `;
}

function renderGuidedBlueprintTablePane(visiblePageIds) {
  const { audienceGroups, slots } = getBlueprintOverviewConfig();
  const selectedAudienceId = audienceGroups.some(
    (group) => group.audience.id === state.selectedBlueprintAudienceId,
  )
    ? state.selectedBlueprintAudienceId
    : audienceGroups[0]?.audience.id;
  const activeGroupIndex = Math.max(
    0,
    audienceGroups.findIndex((group) => group.audience.id === selectedAudienceId),
  );
  const activeGroup = audienceGroups[activeGroupIndex];
  const contexts = audienceGroups.flatMap((group) => group.contexts);
  const activityInputOwners = new Map();

  contexts.forEach((context) => {
    context.modules.forEach((module) => {
      if (module.inputScope !== "activity") return;
      const key = `${module.slot}|${module.component}`;
      if (!activityInputOwners.has(key)) activityInputOwners.set(key, context.id);
    });
  });

  return `
    <aside class="guided-blueprint-pane guided-table-nav" aria-label="人群表格">
      <header class="guided-table-nav-head">
        <button class="guided-sidebar-back" data-demo-back-analysis>
          <span>←</span>
          返回
        </button>
      </header>
      <div class="guided-audience-tabs" aria-label="人群分类">
        ${audienceGroups
          .map(
            (group) => `
              <button
                class="${group.audience.id === selectedAudienceId ? "active" : ""}"
                data-blueprint-audience="${escapeAttr(group.audience.id)}"
              >
                ${escapeHtml(group.audience.name)}
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="guided-blueprint-scroll">
        <div
          class="blueprint-overview-list"
          style="--blueprint-audience-count:1;--blueprint-list-width:100%"
        >
          ${
            activeGroup
              ? renderBlueprintAudienceGroup(
                  activeGroup,
                  slots,
                  activeGroupIndex,
                  activityInputOwners,
                  {
                    visiblePageIds,
                    showPageToggle: true,
                  },
                )
              : ""
          }
        </div>
      </div>
    </aside>
  `;
}

function renderGuidedPagePreview(pageData) {
  const isActive = pageData.id === state.activePageId;
  const pageSelected = isActive && state.guidedPanelMode === "page" && !state.selectedId;
  const pageNodes = (pageData.nodes || []).filter(
    (node) => node.canvasPlacement !== "page-side",
  );
  const companionNodes = (pageData.nodes || []).filter(
    (node) =>
      node.canvasPlacement === "page-side" &&
      (state.guidedVisibleCompanionNodeIds || []).includes(node.id),
  );
  const pieces = [];
  if (!pageNodes.length && isActive && state.dropPageId === pageData.id && state.dropIndex === 0) {
    pieces.push('<div class="drop-marker guided-drop-marker"></div>');
  }
  pageNodes.forEach((node, index) => {
    if (isActive && state.dropPageId === pageData.id && state.dropIndex === index) {
      pieces.push('<div class="drop-marker guided-drop-marker"></div>');
    }
    pieces.push(renderGuidedNode(node));
  });
  if (isActive && state.dropPageId === pageData.id && state.dropIndex === pageNodes.length) {
    pieces.push('<div class="drop-marker guided-drop-marker"></div>');
  }
  const fallbackLayoutStyle = pageData.isSystemFallback
    ? `--guided-fallback-bottom-space:${Number(pageData.fallbackBottomSpace || 0)}px;min-height:${Number(pageData.fallbackPageHeight || 1334)}px;`
    : "";
  return `
    <section class="guided-page-shell ${companionNodes.length ? "has-side-companion" : ""} ${pageData.isSystemFallback ? "is-system-fallback" : ""} ${isActive ? "active" : ""} ${pageSelected ? "has-selected-page" : ""}" data-page-shell="${pageData.id}">
      <div class="phone guided-phone">
        <div
          class="page guided-theme-page ${pageData.isSystemFallback ? "guided-fallback-page" : ""}"
          data-page-id="${pageData.id}"
          data-page-theme="${escapeAttr(getGuidedPageTheme(pageData).id)}"
          style="${escapeAttr(`${getGuidedPageThemeStyle(pageData)}${fallbackLayoutStyle}`)}"
        >
          ${renderGuidedPageThemeHeader(pageData)}
          ${pieces.join("")}
          ${pageData.navBarEnabled ? renderPageNavBarOverlay() : ""}
        </div>
      </div>
      ${
        companionNodes.length
          ? `
            <aside
              class="guided-page-companion ${companionNodes.some((node) => node.isLotteryResultPopup) ? "is-left" : ""}"
              data-page-id="${pageData.id}"
              aria-label="会场弹窗静态组件"
            >
              <header>
                <span>会场弹窗</span>
                <strong>静态组件 · 可编辑导出</strong>
              </header>
              ${companionNodes.map((node) => renderGuidedNode(node)).join("")}
            </aside>
          `
          : ""
      }
    </section>
  `;
}

function renderGuidedFallbackExportPage(entry) {
  const page = state.pages.find((item) => item.id === entry.pageId);
  const nodes = page?.nodes?.length ? page.nodes : [];
  const background = page?.canvasBackground || "#FFE0E9";
  const bottomSpace = Number(page?.fallbackBottomSpace || 0);
  const pageHeight = Number(page?.fallbackPageHeight || entry.dimensions?.height || 1334);
  return `
    <div
      class="page guided-theme-page guided-fallback-page guided-export-fallback-page"
      style="height:${pageHeight}px;background:${escapeAttr(background)};--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")};--guided-fallback-bottom-space:${bottomSpace}px"
    >
      ${renderGuidedPageThemeHeader(page)}
      ${nodes.map((node) => renderComponent(node, { editable: false })).join("")}
    </div>
  `;
}

function renderPlacementCaseCarousel(node) {
  return `
    <div class="placement-case-carousel-shell">
      <div class="placement-case-carousel">
        <div class="placement-case-carousel-track">
          ${Array.from(
            { length: 4 },
            (_, index) => `
              <div class="placement-case-carousel-item" data-carousel-index="${index}">
                ${renderComponent(node)}
              </div>
            `,
          ).join("")}
        </div>
      </div>
      <input
        class="placement-case-scrollbar"
        type="range"
        min="0"
        max="1000"
        value="0"
        aria-label="横向查看投放案例"
        data-placement-case-scrollbar
      />
    </div>
  `;
}

function isGuidedHorizontalCarouselNode(node) {
  return (
    node?.schemaId === "节点指南" ||
    node?.schemaId === "用户教育案例-样式1"
  );
}

function slideGuidedHorizontalCarousel(nodeId) {
  const nodeEl = document.querySelector(`.guided-node[data-node-id="${CSS.escape(nodeId)}"]`);
  const carousel =
    nodeEl?.querySelector(".component.molecule.node-guide-module .molecule-child:nth-child(2)") ||
    nodeEl?.querySelector(
      ".component.molecule.user-education-case-style1-module .molecule-child:nth-child(2)",
    ) ||
    nodeEl?.querySelector(".placement-case-carousel");
  const scrollbar = nodeEl?.querySelector("[data-placement-case-scrollbar]");
  if (!carousel) return;

  const firstItem = carousel.querySelector(".placement-case-carousel-item");
  const track = carousel.querySelector(".placement-case-carousel-track");
  const gap = track ? (Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0) : 0;
  const step = firstItem
    ? firstItem.getBoundingClientRect().width + gap
    : Math.max(1, carousel.scrollWidth / 4);
  const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
  const shouldReset = carousel.scrollLeft + step >= maxScrollLeft - 2;
  const nextScrollLeft = shouldReset ? 0 : Math.min(maxScrollLeft, carousel.scrollLeft + step);

  carousel.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
  if (scrollbar) {
    scrollbar.value = maxScrollLeft ? String((nextScrollLeft / maxScrollLeft) * Number(scrollbar.max || 1000)) : "0";
  }
}

function renderGuidedNode(node) {
  const selected = state.selectedId === node.id ? "selected" : "";
  const kind = getModuleKind(node.schemaId);
  const isHero = kind === "hero";
  const isSideCompanion = node.canvasPlacement === "page-side";
  const isHorizontalCarousel = isGuidedHorizontalCarouselNode(node);
  const orderInfo = isSideCompanion ? null : getGuidedNodeOrderInfo(node.id);
  const canvasLayout = node.schemaId === "投放案例" ? "placement-case-canvas" : "";
  const content =
    node.schemaId === "投放案例"
      ? renderPlacementCaseCarousel(node)
      : renderComponent(node);
  const stateEntries = getGuidedStateEntries(node);
  const childStateGroups = getGuidedChildStateGroups(node);
  const hasStateOptions = hasGuidedStateOptions(node);
  const showStateMenu =
    state.guidedStateMenuNodeId === node.id &&
    hasStateOptions;
  return `
    <section
      class="node-wrap root guided-node ${canvasLayout} ${selected}"
      data-select="${node.id}"
      data-node-id="${node.id}"
      aria-label="${escapeAttr(node.name || moduleKindLabels[kind] || "模块")}"
      tabindex="0"
    >
      <div class="guided-node-kind">${escapeHtml(isSideCompanion ? "弹窗原子" : moduleKindLabels[kind] || "模块")}</div>
      ${
        orderInfo
          ? `
            <div class="guided-node-order-actions" aria-label="调整模块顺序">
              <button
                type="button"
                data-guided-order="up"
                data-guided-node="${escapeAttr(node.id)}"
                data-guided-page="${escapeAttr(orderInfo.page.id)}"
                ${orderInfo.canMoveUp ? "" : "disabled"}
                aria-label="上移模块"
              >↑</button>
              <button
                type="button"
                data-guided-order="down"
                data-guided-node="${escapeAttr(node.id)}"
                data-guided-page="${escapeAttr(orderInfo.page.id)}"
                ${orderInfo.canMoveDown ? "" : "disabled"}
                aria-label="下移模块"
              >↓</button>
            </div>
          `
          : ""
      }
      <div class="guided-node-actions">
        <button data-guided-action="global" data-guided-node="${node.id}" aria-label="${node.isLotteryResultPopup ? "查看变量" : "编辑全局信息"}">
          <span>◎</span><i>${node.isLotteryResultPopup ? "查看变量" : "查看模块变量"}</i>
        </button>
          ${
            node.isLotteryResultPopup
              ? ""
              : `
                <button class="is-danger" data-guided-action="delete" data-guided-node="${node.id}" aria-label="删除模块">
                  <span>×</span><i>删除模块</i>
                </button>
              `
          }
        ${
          isSideCompanion
            ? ""
            : isHero
            ? `
              <button data-guided-action="hero" data-guided-node="${node.id}" aria-label="修改头图">
                <span>AI</span><i>修改头图</i>
              </button>
            `
            : `
              <button data-guided-action="replace" data-guided-node="${node.id}" aria-label="更改模块">
                <span>↻</span><i>更改模块</i>
              </button>
              ${
                isHorizontalCarousel
                  ? `
                    <button data-guided-action="slide" data-guided-node="${node.id}" aria-label="横滑查看">
                      <span>↔</span><i>横滑查看</i>
                    </button>
                  `
                  : ""
              }
              ${
                hasStateOptions
                  ? `
                    <button data-guided-action="states" data-guided-node="${node.id}" aria-label="查看状态">
                      <span>◇</span><i>查看状态</i>
                    </button>
                  `
                  : ""
              }
              ${
                showStateMenu ? renderGuidedInlineStatePopover(node, stateEntries, childStateGroups) : ""
              }
            `
        }
      </div>
      <div class="guided-node-theme-content">${content}</div>
    </section>
  `;
}

function getGuidedInlineStateLabel(entry) {
  return entry.id === "default" ? "点击前" : entry.id === "clicked" || entry.id === "registered" ? "点击后" : entry.name;
}

function renderGuidedInlineStatePopover(node, stateEntries = [], childStateGroups = []) {
  if (childStateGroups.length) {
    return `
      <div class="guided-node-state-popover is-child-state-list">
        ${childStateGroups.map((group) => `
          <div class="guided-node-child-state-row">
            <span>${escapeHtml(group.label)}</span>
            <div>
              ${group.stateEntries.map((entry) => `
                <button
                  type="button"
                  class="${group.child.activeGuidedStateId === entry.id ? "active" : ""}"
                  data-guided-child-state-node="${escapeAttr(group.child.id)}"
                  data-guided-child-state="${escapeAttr(entry.id)}"
                >${escapeHtml(getGuidedInlineStateLabel(entry))}</button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }
  return `
    <div class="guided-node-state-popover">
      ${stateEntries
        .map(
          (entry) => `
            <button
              type="button"
              class="${node.activeGuidedStateId === entry.id ? "active" : ""}"
              data-guided-inline-state="${escapeAttr(entry.id)}"
              data-guided-node="${node.id}"
            >${escapeHtml(getGuidedInlineStateLabel(entry))}</button>
          `,
        )
        .join("")}
    </div>
  `;
}

function updateGuidedNodeSelection(nodeId) {
  state.selectedId = nodeId || null;
  let selectedPageShell = null;
  document.querySelectorAll(".guided-node").forEach((node) => {
    const isSelected = node.dataset.nodeId === nodeId;
    node.classList.toggle("selected", isSelected);
    if (isSelected) selectedPageShell = node.closest(".guided-page-shell");
  });
  document.querySelectorAll(".guided-page-shell").forEach((pageShell) => {
    pageShell.classList.toggle("has-selected-node", pageShell === selectedPageShell);
    if (nodeId) pageShell.classList.remove("has-selected-page");
  });
  document.querySelectorAll(".guided-page-title-node").forEach((titleNode) => {
    titleNode.classList.toggle("active", titleNode.dataset.guidedPageTitle === state.activePageId);
    if (nodeId) titleNode.classList.remove("has-selected-page");
  });
}

function updateGuidedPanel(options = {}) {
  const host = $(".guided-operation-host");
  if (!host) return;
  const selected = state.selectedId ? findNode(state.nodes, state.selectedId)?.node : null;
  const shouldRenderPagePanel = state.guidedPanelMode === "page" && activePage();
  const shouldRenderAddPanel = state.guidedPanelMode === "add";
  host.innerHTML = state.guidedPanelMode && (selected || shouldRenderPagePanel || shouldRenderAddPanel)
    ? renderGuidedFloatingPanel(selected, options)
    : "";
  window.renderReactMaterials?.();
  requestAnimationFrame(() => updateGuidedLineageTransform());
}

function closeGuidedPanelWithTransition(options = {}) {
  const panel = $(".guided-floating-panel");
  if (!panel || !state.guidedPanelMode) {
    state.guidedPanelMode = null;
    if (options.clearSelection) state.selectedId = null;
    updateGuidedPanel();
    return;
  }

  panel.classList.add("is-closing");
  window.setTimeout(() => {
    state.guidedPanelMode = null;
    if (options.clearSelection) state.selectedId = null;
    updateGuidedPanel();
  }, 240);
}

function getGuidedGlobalEntries(node) {
  const contexts = getBlueprintContexts();
  const sourceContext = contexts.find((item) => item.id === node.sourceContextId);
  const sourceModule = sourceContext?.modules.find((item) => item.id === node.sourceModuleId);
  if (!sourceModule) return [];

  if (sourceModule.inputScope === "activity") {
    return [{
      context: sourceContext,
      contextName: "活动统一内容",
      module: sourceModule,
    }];
  }

  return contexts
    .map((context) => ({
      context,
      contextName: getBlueprintContextName(context),
      module: context.modules.find((module) => module.slot === sourceModule.slot),
    }))
    .filter((entry) => entry.module);
}

function renderGuidedGlobalEditor(node) {
  if (node?.isLotteryResultPopup) {
    const winProps = node.lotteryWinProps || node.props || {};
    const isLoseActive = node.activeLotteryPopupResult === "lose" || node.schemaId === "弹窗-未中奖";
    const prizeCount = Math.max(1, Number(winProps.prizeCount || 1));
    const selectedPrizeIndex = clamp(
      Number(winProps.selectedPrizeIndex || 1),
      1,
      prizeCount,
    );
    const prizes = Array.from({ length: prizeCount }, (_, index) => {
      const prizeIndex = index + 1;
      const parsed = parsePrizeValue(winProps[`prize${prizeIndex}`]);
      return {
        index: prizeIndex,
        name:
          winProps[`prize${prizeIndex}Text`] ||
          parsed?.name ||
          `奖品${prizeIndex}`,
        image: parsed?.image || "",
      };
    });
    return `
      <div class="guided-popup-prize-list">
        ${prizes.map((prize) => `
          <div class="guided-popup-prize-row ${!isLoseActive && prize.index === selectedPrizeIndex ? "is-current" : ""}">
            <button
              type="button"
              class="guided-popup-prize-pick"
              data-guided-popup-prize-index="${prize.index}"
              data-guided-node="${escapeAttr(node.id)}"
              aria-pressed="${!isLoseActive && prize.index === selectedPrizeIndex}"
            >
              <span>${prize.index}</span>
              ${prize.image ? `<img src="${escapeAttr(prize.image)}" alt="" />` : '<i aria-hidden="true"></i>'}
              <strong>${escapeHtml(prize.name)}</strong>
              ${!isLoseActive && prize.index === selectedPrizeIndex ? "<em>当前展示</em>" : ""}
            </button>
          </div>
        `).join("")}
        <div class="guided-popup-prize-row ${isLoseActive ? "is-current" : ""}">
          <button
            type="button"
            class="guided-popup-prize-pick"
            data-guided-popup-result="lose"
            data-guided-node="${escapeAttr(node.id)}"
            aria-pressed="${isLoseActive}"
          >
            <span>未</span>
            <i aria-hidden="true"></i>
            <strong>未中奖</strong>
            ${isLoseActive ? "<em>当前展示</em>" : ""}
          </button>
        </div>
      </div>
    `;
  }
  return renderGuidedLineageEditor(node);
}

function cloneNodeForLineage(node) {
  const cloned = clone(node);
  delete cloned.guidedLineageVariants;
  delete cloned.guidedLineageDimensions;
  delete cloned.guidedLineageGraph;
  delete cloned.activeLineageVariantId;
  return cloned;
}

function getLineageTextFields(node, prefix = "") {
  if (node.type === "molecule") {
    return (node.children || []).flatMap((child, childIndex) =>
      getLineageTextFields(child, `${prefix}${childIndex}.`).map((field) => ({
        ...field,
        label: `${child.name} · ${field.label}`,
      })),
    );
  }

  const schema = findAtomSchema(node.schemaId);
  if (!schema) return [];
  return getPropEntries(schema)
    .filter(([key, field]) => isCopyPropField(key, field, node.props?.[key] ?? field.default))
    .map(([key, field]) => ({
      path: `${prefix}${key}`,
      label: field.label || key,
    }));
}

function getNodeValueByPath(node, path) {
  const parts = path.split(".");
  if (parts.length === 1) return node.props?.[parts[0]] ?? "";
  const [childIndex, ...rest] = parts;
  return getNodeValueByPath(node.children?.[Number(childIndex)] || {}, rest.join("."));
}

function setNodeValueByPath(node, path, value) {
  const parts = path.split(".");
  if (parts.length === 1) {
    if (!node.props) node.props = {};
    node.props[parts[0]] = value;
    return;
  }
  const [childIndex, ...rest] = parts;
  const child = node.children?.[Number(childIndex)];
  if (child) setNodeValueByPath(child, rest.join("."), value);
}

function ensureGuidedLineage(node) {
  if (!Array.isArray(node.guidedLineageVariants) || !node.guidedLineageVariants.length) {
    node.guidedLineageVariants = [
      {
        id: "base",
        title: DEFAULT_BLUEPRINT_AUDIENCE_NAME,
        node: cloneNodeForLineage(node),
      },
    ];
    node.activeLineageVariantId = "base";
  }
  return node.guidedLineageVariants;
}

function ensureGuidedLineageTree(node) {
  const variants = ensureGuidedLineage(node);
  const currentGraph = node.guidedLineageGraph;
  if (!currentGraph?.dimensions?.length) {
    const legacyNodes = currentGraph?.nodes || [];
    const legacyRoots = legacyNodes.filter((item) => item.kind === "root");
    const dimensions = (legacyRoots.length ? legacyRoots : [{ id: "dimension_1" }]).map(
      (root, index) => ({
        id: `dimension_${index + 1}`,
        title: `维度 ${index + 1}`,
        x: 28,
        y: 28,
        legacyRootId: root.id,
      }),
    );
    const graphNodes = legacyNodes.length
      ? legacyNodes.map((item) => {
          const dimensionIndex = Math.max(
            0,
            legacyRoots.findIndex(
              (root) => item.id === root.id || item.rootId === root.id,
            ),
          );
          return {
            id: item.id === "base" ? "node_base" : item.id,
            variantId: item.variantId,
            kind: "component",
            dimensionId: dimensions[dimensionIndex]?.id || dimensions[0].id,
            x: 260,
            y: 28,
          };
        })
      : variants.map((variant) => ({
          id: variant.id === "base" ? "node_base" : `node_${variant.id}`,
          variantId: variant.id,
          kind: "component",
          dimensionId: dimensions[0].id,
          x: 260,
          y: 28,
        }));
    node.guidedLineageGraph = { dimensions, nodes: graphNodes, edges: [] };
  }

  const graph = node.guidedLineageGraph;
  variants.forEach((variant) => {
    if (graph.nodes.some((item) => item.variantId === variant.id)) return;
    graph.nodes.push({
      id: `node_${variant.id}`,
      variantId: variant.id,
      kind: "component",
      dimensionId: graph.dimensions[0].id,
      x: 260,
      y: 28,
    });
  });
  layoutLineageGraph(node, node.guidedLineageGraph);
  return {
    base: variants[0],
    graph: node.guidedLineageGraph,
    dimensions: node.guidedLineageGraph.dimensions,
  };
}

function findLineageVariant(node, variantId) {
  return ensureGuidedLineage(node).find((variant) => variant.id === variantId);
}

function getLineageGraphNodeByVariant(node, variantId) {
  const { graph } = ensureGuidedLineageTree(node);
  return graph.nodes.find((item) => item.variantId === variantId);
}

function getLineageGraphSize(target, graph) {
  const cardWidth = 540;
  const componentRight = Math.max(...graph.nodes.map((item) => item.x + cardWidth), 0);
  const componentBottom = Math.max(
    ...graph.nodes.map((item) => item.y + getLineageGraphNodeHeight(target, item)),
    0,
  );
  const dimensionRight = Math.max(
    ...(graph.dimensions || []).map((item) => item.x + 196),
    0,
  );
  const dimensionBottom = Math.max(
    ...(graph.dimensions || []).map((item) => item.y + 92),
    0,
  );
  const width = Math.max(820, componentRight, dimensionRight) + 64;
  const height = Math.max(320, componentBottom, dimensionBottom) + 64;
  return {
    width,
    height,
    viewportHeight: Math.min(620, height),
  };
}

function getLineageGraphNodeHeight(target, graphNode) {
  const variant = findLineageVariant(target, graphNode.variantId);
  if (!variant) return 220;
  const metrics = getLineagePreviewMetrics(variant.node);
  return metrics.previewHeight + 58;
}

function getLineageRootNodes(graph) {
  return graph.dimensions || [];
}

function getLineageBranchNodes(graph, rootId) {
  return graph.nodes.filter((item) => item.dimensionId === rootId);
}

function layoutLineageGraph(target, graph) {
  let dimensionY = 28;
  getLineageRootNodes(graph).forEach((dimension) => {
    const componentNodes = getLineageBranchNodes(graph, dimension.id);
    let componentY = dimensionY;
    componentNodes.forEach((componentNode) => {
      componentNode.x = 260;
      componentNode.y = componentY;
      componentY += getLineageGraphNodeHeight(target, componentNode) + 18;
    });
    const firstVariant = findLineageVariant(target, componentNodes[0]?.variantId);
    const firstMetrics = firstVariant ? getLineagePreviewMetrics(firstVariant.node) : null;
    dimension.x = 28;
    dimension.y = firstMetrics
      ? dimensionY + 24 + firstMetrics.previewHeight / 2
      : dimensionY + 42;
    dimensionY += Math.max(120, componentY - dimensionY) + 64;
  });
  graph.edges = graph.nodes.map((item) => ({
      id: `edge_${item.dimensionId}_${item.id}`,
      from: item.dimensionId,
      to: item.id,
    }));
}

function getNextLineageRootTitle(target) {
  return `维度 ${getLineageRootNodes(target.guidedLineageGraph).length + 1}`;
}

function getLineageBranchTitle(target, rootNode) {
  const branchCount = getLineageBranchNodes(target.guidedLineageGraph, rootNode.id).length;
  return `文案版本 ${branchCount + 1}`;
}

function createLineageGraphComponent(target, dimensionId) {
  const { base, graph } = ensureGuidedLineageTree(target);
  const dimension = graph.dimensions.find((item) => item.id === dimensionId) || graph.dimensions[0];
  const sourceNode = getLineageBranchNodes(graph, dimension.id)[0];
  const sourceVariant = findLineageVariant(target, sourceNode?.variantId) || base;
  const id = `copy_${Date.now()}_${graph.nodes.length}`;
  const variant = {
    id,
    title: getLineageBranchTitle(target, dimension),
    node: cloneNodeForLineage(sourceVariant.node),
  };
  target.guidedLineageVariants.push(variant);
  graph.nodes.push({
    id: `node_${id}`,
    variantId: id,
    kind: "component",
    dimensionId: dimension.id,
    x: 0,
    y: 0,
  });
  layoutLineageGraph(target, graph);
  return variant;
}

function createLineageGraphDimension(target) {
  const { base, graph } = ensureGuidedLineageTree(target);
  const dimensionId = `dimension_${Date.now()}_${graph.dimensions.length}`;
  const variantId = `copy_${Date.now()}_${graph.nodes.length}`;
  const variant = {
    id: variantId,
    title: "默认文案",
    node: cloneNodeForLineage(base.node),
  };
  graph.dimensions.push({
    id: dimensionId,
    title: getNextLineageRootTitle(target),
    x: 0,
    y: 0,
  });
  graph.nodes.push({
    id: `node_${variantId}`,
    variantId,
    kind: "component",
    dimensionId,
    x: 0,
    y: 0,
  });
  target.guidedLineageVariants.push(variant);
  layoutLineageGraph(target, graph);
  return { dimensionId, variant };
}

function createLineageListVariant(target) {
  const variants = ensureGuidedLineage(target);
  const sourceVariant = variants[0];
  const id = `copy_${Date.now()}_${variants.length}`;
  const variant = {
    id,
    title: `文案版本 ${variants.length + 1}`,
    node: cloneNodeForLineage(sourceVariant.node),
  };
  target.guidedLineageVariants.push(variant);
  return variant;
}

function deleteLineageGraphNode(target, variantId) {
  if (variantId === "base") return false;
  const { graph } = ensureGuidedLineageTree(target);
  const graphNode = graph.nodes.find((item) => item.variantId === variantId);
  if (!graphNode) return false;
  const removeVariantIds = new Set([variantId]);
  target.guidedLineageGraph.nodes = graph.nodes.filter((item) => item.id !== graphNode.id);
  target.guidedLineageVariants = ensureGuidedLineage(target).filter(
    (variant) => !removeVariantIds.has(variant.id),
  );

  if (removeVariantIds.has(target.activeLineageVariantId)) {
    target.activeLineageVariantId = "base";
  }
  if (removeVariantIds.has(state.selectedLineageVariantId)) {
    state.selectedLineageVariantId =
      getLineageBranchNodes(target.guidedLineageGraph, graphNode.dimensionId)[0]?.variantId || "base";
  }
  layoutLineageGraph(target, target.guidedLineageGraph);
  return true;
}

function renderGuidedLineageEdges(graph, variants) {
  return graph.edges
    .map((edge) => {
      const from = graph.dimensions.find((item) => item.id === edge.from);
      const to = graph.nodes.find((item) => item.id === edge.to);
      if (!from || !to) return "";
      const toVariant = variants.find((variant) => variant.id === to.variantId);
      const toMetrics = getLineagePreviewMetrics(toVariant?.node || {});
      const fromX = from.x + 148;
      const fromY = from.y + 22;
      const toX = to.x;
      const toY = to.y + 46 + toMetrics.previewHeight / 2;
      const midX = fromX + Math.max(24, (toX - fromX) / 2);
      return `<path d="M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}" />`;
    })
    .join("");
}

function applyLineageVariantToNode(target, variant) {
  const source = cloneNodeForLineage(variant.node);
  const keep = {
    id: target.id,
    sourceContextId: target.sourceContextId,
    sourceModuleId: target.sourceModuleId,
    sourceSlot: target.sourceSlot,
    sourceInputScope: target.sourceInputScope,
    sourcePageTemplateId: target.sourcePageTemplateId,
    sourcePageTemplateNodeIndex: target.sourcePageTemplateNodeIndex,
    moduleGroupId: target.moduleGroupId,
    moduleGroupRole: target.moduleGroupRole,
    canvasPlacement: target.canvasPlacement,
    sourceLotteryNodeId: target.sourceLotteryNodeId,
    isLotteryResultPopup: target.isLotteryResultPopup,
    activeGuidedStateId: target.activeGuidedStateId,
    guidedStates: target.guidedStates,
    guidedLineageVariants: target.guidedLineageVariants,
    guidedLineageDimensions: target.guidedLineageDimensions,
    guidedLineageGraph: target.guidedLineageGraph,
  };
  Object.assign(target, source, keep, {
    activeLineageVariantId: variant.id,
  });
}

function renderGuidedLineageEditor(node) {
  const variants = ensureGuidedLineage(node);
  const base = variants[0];
  if (!variants.some((variant) => variant.id === state.selectedLineageVariantId)) {
    state.selectedLineageVariantId = base.id;
  }
  const fields = getLineageTextFields(base.node);
  if (!fields.length) {
    return `<div class="guided-panel-empty">当前组件没有可编辑的文案变量。</div>`;
  }
  const version = "v3";
  state.guidedLineageVersion = version;

  return `
    <div class="guided-lineage-version-switch" aria-label="模块变量版本切换">
      <button class="active" data-guided-lineage-version="v3">版本 3</button>
    </div>
    ${renderGuidedLineageEditorV3(node)}
  `;
}

function renderGuidedLineageEditorV1(node) {
  const { base, graph } = ensureGuidedLineageTree(node);
  const variants = ensureGuidedLineage(node);
  if (!variants.some((variant) => variant.id === state.selectedLineageVariantId)) {
    state.selectedLineageVariantId = base.id;
  }
  const graphSize = getLineageGraphSize(node, graph);
  const zoom = state.guidedLineageZoom || 1;
  const fields = getLineageTextFields(base.node);
  if (!fields.length) {
    return `<div class="guided-panel-empty">当前组件没有可编辑的文案变量。</div>`;
  }

  return `
    <p>按维度管理文案版本，拖动画布查看。</p>
    <div
      class="guided-lineage-map"
      data-guided-lineage-map
      style="--lineage-map-height:${graphSize.viewportHeight}px;"
    >
        <div
          class="guided-lineage-canvas"
          style="width:${graphSize.width}px;height:${graphSize.height}px;transform:translate3d(${state.guidedLineagePanX}px, ${state.guidedLineagePanY}px, 0) scale(${zoom});"
        >
          <svg
            class="guided-lineage-edges"
            width="${graphSize.width}"
            height="${graphSize.height}"
            viewBox="0 0 ${graphSize.width} ${graphSize.height}"
            aria-hidden="true"
          >
            ${renderGuidedLineageEdges(graph, variants)}
          </svg>
          ${graph.dimensions
            .map((dimension) => renderGuidedLineageDimension(dimension))
            .join("")}
          ${graph.nodes
            .map((graphNode) => {
              const variant = findLineageVariant(node, graphNode.variantId) || base;
              return renderGuidedLineageCard(node, variant, base, graphNode);
            })
            .join("")}
        </div>
    </div>
  `;
}

function renderGuidedLineageDimension(dimension) {
  return `
    <section
      class="guided-lineage-dimension"
      style="left:${dimension.x}px;top:${dimension.y}px;"
    >
      <input
        value="${escapeAttr(dimension.title)}"
        data-guided-lineage-dimension-title="${escapeAttr(dimension.id)}"
        aria-label="维度名称"
      />
      <button
        class="guided-lineage-dimension-side-add"
        data-guided-lineage-add-component="${escapeAttr(dimension.id)}"
        aria-label="在当前维度增加组件"
      >+</button>
      <button
        class="guided-lineage-dimension-down-add"
        data-guided-lineage-add-dimension="${escapeAttr(dimension.id)}"
        aria-label="增加新维度"
      >+</button>
    </section>
  `;
}

function renderGuidedLineageEditorV2(node, variants, base) {
  return `
    <p>文案版本列表，直接编辑组件内容。</p>
    <div class="guided-lineage-v2-list">
      ${variants
        .map((variant, index) => renderGuidedLineageListCard(node, variant, base, index))
        .join("")}
      <button class="guided-lineage-v2-add" data-guided-lineage-add-list>
        <span>+</span>
        <strong>增加一个文案版本</strong>
      </button>
    </div>
  `;
}

function renderGuidedLineageEditorV3(node) {
  const { base, graph } = ensureGuidedLineageTree(node);
  const variants = ensureGuidedLineage(node);
  const dimensions = getLineageRootNodes(graph);
  const fields = getLineageTextFields(base.node);
  if (!fields.length) {
    return `<div class="guided-panel-empty">当前组件没有可编辑的文案变量。</div>`;
  }

  return `
    <p>模块图总览，大维度独立成组，组内按表格铺开所有文案版本。</p>
    <div class="guided-lineage-v3-map" data-guided-lineage-map>
      <div
        class="guided-lineage-canvas guided-lineage-v3-canvas"
        style="transform:translate3d(${state.guidedLineagePanX}px, ${state.guidedLineagePanY}px, 0) scale(${state.guidedLineageZoom || 1});"
      >
        ${dimensions
          .map((dimension) => renderGuidedLineageV3Dimension(node, dimension, base, variants))
          .join("")}
      </div>
    </div>
  `;
}

function renderGuidedLineageV3Dimension(node, dimension, base, variants) {
  const branchNodes = getLineageBranchNodes(node.guidedLineageGraph, dimension.id);
  return `
    <section class="guided-lineage-v3-dimension">
      <header>
        <input
          value="${escapeAttr(dimension.title)}"
          data-guided-lineage-dimension-title="${escapeAttr(dimension.id)}"
          aria-label="大维度名称"
        />
        <span>${branchNodes.length} 个版本</span>
      </header>
      <div class="guided-lineage-v3-grid">
        ${branchNodes
          .map((graphNode) => {
            const variant = findLineageVariant(node, graphNode.variantId) || base;
            return renderGuidedLineageV3Card(node, variant, base);
          })
          .join("")}
        <button class="guided-lineage-v3-add" data-guided-lineage-add-component="${escapeAttr(dimension.id)}">
          <span>+</span>
          <strong>增加版本</strong>
        </button>
      </div>
    </section>
  `;
}

function renderGuidedLineageV3Card(node, variant, base) {
  const metrics = getLineagePreviewMetrics(variant.node, 0.2);
  const previewHeight = metrics.previewHeight + 40;
  const isSelected = state.selectedLineageVariantId === variant.id;
  const isActive = (node.activeLineageVariantId || base.id) === variant.id;
  return `
    <section
      class="guided-lineage-v3-card ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}"
      data-guided-lineage-card="${escapeAttr(variant.id)}"
      style="--lineage-preview-height:${previewHeight}px;"
    >
      <header>
        <div>
          <input
            value="${escapeAttr(variant.title)}"
            data-guided-lineage-title="${escapeAttr(variant.id)}"
            aria-label="变体标题"
          />
        </div>
        <button data-guided-lineage-apply="${escapeAttr(variant.id)}">
          ${isActive ? "当前页面" : "应用"}
        </button>
      </header>
      <div class="guided-lineage-preview">
        <div class="guided-lineage-preview-inner">
          ${renderComponent(variant.node, {
            editableMode: "lineage",
            variantId: variant.id,
            lineageInitialNode: base.node,
          })}
        </div>
      </div>
    </section>
  `;
}

function updateGuidedLineageTransform() {
  const canvas = document.querySelector(".guided-lineage-canvas");
  const map = canvas?.closest("[data-guided-lineage-map]");
  if (!canvas || !map) return;
  const zoom = state.guidedLineageZoom || 1;
  const scaledWidth = canvas.offsetWidth * zoom;
  const scaledHeight = canvas.offsetHeight * zoom;
  const bufferX = Math.min(140, map.clientWidth * 0.18);
  const bufferY = Math.min(120, map.clientHeight * 0.18);
  const contentFitX = map.clientWidth - scaledWidth;
  const contentFitY = map.clientHeight - scaledHeight;
  const minPanX = Math.min(0, contentFitX) - bufferX;
  const maxPanX = Math.max(0, contentFitX) + bufferX;
  const minPanY = Math.min(0, contentFitY) - bufferY;
  const maxPanY = Math.max(0, contentFitY) + bufferY;
  state.guidedLineagePanX = clamp(state.guidedLineagePanX, minPanX, maxPanX);
  state.guidedLineagePanY = clamp(state.guidedLineagePanY, minPanY, maxPanY);
  canvas.style.transform = `translate3d(${state.guidedLineagePanX}px, ${state.guidedLineagePanY}px, 0) scale(${zoom})`;
}

function getLineagePreviewMetrics(node, scale = 0.72) {
  let height = 320;
  if (node.type === "molecule") {
    height = (node.children || []).reduce((sum, child) => {
      const schema = findAtomSchema(child.schemaId);
      return sum + Number(schema?.dimensions?.height || 160);
    }, 24);
  } else {
    const schema = findAtomSchema(node.schemaId);
    height = Number(schema?.dimensions?.height || 320);
  }
  const previewHeight = Math.max(120, Math.ceil(height * scale) + 8);
  return {
    previewHeight,
    sideAddTop: Math.max(62, Math.ceil(32 + previewHeight / 2)),
  };
}

function renderGuidedLineageListCard(node, variant, base, index) {
  const metrics = getLineagePreviewMetrics(variant.node, 0.46);
  const isSelected = state.selectedLineageVariantId === variant.id;
  const isActive = (node.activeLineageVariantId || base.id) === variant.id;
  return `
    <section
      class="guided-lineage-v2-card ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}"
      data-guided-lineage-card="${escapeAttr(variant.id)}"
      style="--lineage-preview-height:${metrics.previewHeight}px;"
    >
      <header>
        <div>
          <span>版本 ${index + 1}</span>
          <input
            value="${escapeAttr(variant.title)}"
            data-guided-lineage-title="${escapeAttr(variant.id)}"
            aria-label="变体标题"
          />
        </div>
        <button data-guided-lineage-apply="${escapeAttr(variant.id)}">
          ${isActive ? "当前页面" : "应用至画布"}
        </button>
      </header>
      <div class="guided-lineage-preview">
        <div class="guided-lineage-preview-inner">
          ${renderComponent(variant.node, {
            editableMode: "lineage",
            variantId: variant.id,
            lineageInitialNode: base.node,
          })}
        </div>
      </div>
    </section>
  `;
}

function renderGuidedLineageCard(node, variant, base, graphNode) {
  const metrics = getLineagePreviewMetrics(variant.node);
  const isBase = variant.id === base.id;
  const isSelected = state.selectedLineageVariantId === variant.id;
  return `
    <section
      class="guided-lineage-card ${isBase ? "is-root" : ""} ${isSelected ? "selected" : ""} ${node.activeLineageVariantId === variant.id ? "active" : ""}"
      data-guided-lineage-card="${escapeAttr(variant.id)}"
      style="left:${graphNode.x}px;top:${graphNode.y}px;--lineage-preview-height:${metrics.previewHeight}px;--lineage-side-add-top:${metrics.sideAddTop}px;"
    >
      <header>
        ${
          isBase
            ? `<strong>${escapeHtml(variant.title)}</strong>`
            : `<input
                value="${escapeAttr(variant.title)}"
                data-guided-lineage-title="${escapeAttr(variant.id)}"
                aria-label="变体标题"
              />`
        }
        <button data-guided-lineage-apply="${escapeAttr(variant.id)}">
          ${node.activeLineageVariantId === variant.id ? "当前页面" : "预览到页面"}
        </button>
        ${
          isBase
            ? ""
            : `<button
                class="guided-lineage-delete"
                data-guided-lineage-delete="${escapeAttr(variant.id)}"
                aria-label="删除节点"
              >删除</button>`
        }
      </header>
      <div class="guided-lineage-preview">
        <div class="guided-lineage-preview-inner">
          ${renderComponent(variant.node, {
            editableMode: "lineage",
            variantId: variant.id,
            lineageInitialNode: base.node,
          })}
        </div>
      </div>
    </section>
  `;
}

function getGuidedMoleculeOptions() {
  const saved = moleculeSchemas.filter((item) => item.id !== "MoleculeContainer");
  return saved.map((item) => ({ id: item.id, name: item.name, schema: item }));
}

function getGuidedContentOptions() {
  return [
    { id: "content:1", name: "内容模块", imageUrl: contentModuleImageUrl },
    { id: "content:2", name: "内容模块 2", imageUrl: contentModuleImage2Url },
  ];
}

function createDefaultGuidedTasks() {
  return [];
}

function createGuidedModuleReplacement(optionId, found) {
  const sourceMeta = {
    sourceContextId: found.node.sourceContextId,
    sourceModuleId: found.node.sourceModuleId,
    sourceSlot: found.node.sourceSlot,
    sourceInputScope: found.node.sourceInputScope,
  };
  if (optionId.startsWith("content:")) {
    const imageUrl = optionId === "content:2"
      ? contentModuleImage2Url
      : contentModuleImageUrl;
    const node = createAtomNode("ContentModuleImage", {
      ...found.node.props,
      src: imageUrl,
      alt: optionId === "content:2" ? "内容模块 2" : "内容模块",
    });
    node.id = found.node.id;
    node.name = optionId === "content:2" ? "内容模块 2" : "内容模块";
    Object.assign(node, sourceMeta);
    return [node];
  }

  const optionName = moleculeSchemas.find((item) => item.id === optionId)?.name || "";
  let node;
  node = createMoleculeNode(optionId);
  if (!node) return [];

  const oldGroupNodes = found.node.moduleGroupId
    ? state.nodes.filter((item) => item.moduleGroupId === found.node.moduleGroupId)
    : [];
  const oldTasks = oldGroupNodes.filter((item) => item.moduleGroupRole === "task");
  const isLottery = optionName.includes("九宫格");

  if (!isLottery) {
    if (found.node.moduleGroupId) {
      node.moduleGroupId = found.node.moduleGroupId;
      node.moduleGroupRole = "play";
    }
    Object.assign(node, sourceMeta);
    return [node];
  }

  const groupId = found.node.moduleGroupId || uid();
  const embeddedTasks = (node.children || []).filter((child) => child.schemaId === "TaskModule");
  node.children = (node.children || []).filter((child) => child.schemaId !== "TaskModule");
  node.moduleGroupId = groupId;
  node.moduleGroupRole = "lottery";
  node.name = "九宫格抽奖";

  const tasks = oldTasks.length
    ? oldTasks
    : embeddedTasks.length
      ? embeddedTasks
      : createDefaultGuidedTasks();
  tasks.forEach((task) => {
    task.moduleGroupId = groupId;
    task.moduleGroupRole = "task";
    Object.assign(task, sourceMeta);
  });
  Object.assign(node, sourceMeta);
  return [node, ...tasks];
}

function getGuidedVariantEntries(node) {
  const nodes = node.type === "molecule" ? node.children || [] : [node];
  return nodes.flatMap((child) =>
    (child.variants || []).map((variant) => ({
      node: child,
      variant,
    })),
  );
}

function getGuidedStateEntries(node) {
  return node.guidedStates || [];
}

function hasGuidedStateOptions(node) {
  return getGuidedStateEntries(node).length > 1 || getGuidedChildStateGroups(node).length > 0;
}

function getGuidedChildStateGroups(node) {
  if (node?.type !== "molecule") return [];
  let statefulIndex = 0;
  return (node.children || [])
    .map((child, childIndex) => {
      const stateEntries = getGuidedStateEntries(child);
      if (stateEntries.length < 2) return null;
      statefulIndex += 1;
      return {
        child,
        childIndex,
        label: node.schemaId === "任务列表"
          ? `任务 ${statefulIndex}`
          : `子组件 ${childIndex + 1} · ${child.name || child.schemaId}`,
        stateEntries,
      };
    })
    .filter(Boolean);
}

function applyGuidedBusinessState(node, stateId) {
  const stateEntry = node?.guidedStates?.find((item) => item.id === stateId);
  if (!node || !stateEntry) return false;
  const stateNode = stateEntry.node;
  node.schemaId = stateNode.schemaId;
  node.name = stateEntry.name;
  node.type = stateNode.type;
  node.allowedChildren = clone(stateNode.allowedChildren || null);
  node.className = stateNode.className || "";
  const nextProps = clone(stateNode.props);
  if (stateEntry.preserveProps) {
    const lockedPropKeys = new Set(stateEntry.lockedPropKeys || []);
    Object.entries(node.props || {}).forEach(([key, value]) => {
      if (!lockedPropKeys.has(key) && key in nextProps) nextProps[key] = value;
    });
  }
  node.props = nextProps;
  node.children = clone(stateNode.children || []);
  node.variants = clone(stateNode.variants || []);
  node.activeVariantId = stateNode.activeVariantId || null;
  node.activeGuidedStateId = stateEntry.id;
  return true;
}

function renderGuidedMoleculePreview(item) {
  if (item.imageUrl) {
    return `<img class="guided-content-option-image" src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.name)}" />`;
  }
  const node = createMoleculeNode(item.id);
  if (node) {
    node.id = `prd_add_preview_${item.id}`;
    return renderComponent(node, { editable: false });
  }
  if (item.schema) return renderMoleculePreview(item.schema);
  return "";
}

function getGuidedPageTheme(page) {
  return (
    guidedPageThemePresets.find((theme) => theme.id === page?.colorThemeId) ||
    guidedPageThemePresets.find(
      (theme) => theme.background.toLowerCase() === String(page?.canvasBackground || "").toLowerCase(),
    ) ||
    guidedPageThemePresets[0]
  );
}

function getGuidedPageThemeStyle(page) {
  const theme = getGuidedPageTheme(page);
  return `background:${theme.background};--guided-page-theme-filter:${theme.filter};`;
}

function applyThemeBoundVariantsToNodes(nodes = [], themeId, visited = new WeakSet()) {
  nodes.forEach((node) => {
    if (!node || visited.has(node)) return;
    visited.add(node);
    if (node.type === "atom") {
      const schema = findAtomSchema(node.schemaId);
      const boundVariant = getSchemaThemeVariant(schema, themeId);
      if (boundVariant) {
        node.activeVariantId = boundVariant.id;
        const themeProps = Object.fromEntries(getThemeLinkedVariantProps(schema, boundVariant));
        node.props = { ...defaultProps(node.schemaId), ...(node.props || {}), ...themeProps };
      }
      if (node.isLotteryResultPopup && node.lotteryWinProps) {
        const winSchema = findAtomSchema("弹窗-中奖");
        const winVariant = getSchemaThemeVariant(winSchema, themeId);
        if (winVariant) {
          const winThemeProps = Object.fromEntries(getThemeLinkedVariantProps(winSchema, winVariant));
          node.lotteryWinProps = { ...(node.lotteryWinProps || {}), ...winThemeProps };
        }
      }
    }
    if (node.children?.length) applyThemeBoundVariantsToNodes(node.children, themeId, visited);
    (node.guidedStates || []).forEach((entry) => {
      if (entry.node) applyThemeBoundVariantsToNodes([entry.node], themeId, visited);
    });
    (node.guidedLineageVariants || []).forEach((variant) => {
      if (variant.node) applyThemeBoundVariantsToNodes([variant.node], themeId, visited);
    });
  });
}

function applyGuidedPageTheme(themeId) {
  const page = activePage();
  const theme = guidedPageThemePresets.find((item) => item.id === themeId);
  if (!page || !theme) return;
  state.pages.forEach((item) => {
    item.colorThemeId = theme.id;
    item.canvasBackground = theme.background;
    applyThemeBoundVariantsToNodes(item.nodes, theme.id);
  });
  if (state.view === "guided-preview") {
    renderGuidedPreview();
    return;
  }
  const pageEl = document.querySelector(`.guided-device-stage [data-page-id="${page.id}"]`);
  if (pageEl) {
    pageEl.style.background = theme.background;
    pageEl.style.setProperty("--guided-page-theme-filter", theme.filter);
    pageEl.dataset.pageTheme = theme.id;
  }
  const panel = document.querySelector(".guided-page-editor");
  if (!panel) return;
  const dot = panel.querySelector(".guided-page-color-dot");
  if (dot) dot.style.background = `linear-gradient(135deg, ${theme.primary} 0 50%, ${theme.secondary} 50% 100%)`;
  const label = panel.querySelector(".guided-page-color-picker strong");
  if (label) label.textContent = theme.name;
  const value = panel.querySelector(".guided-page-color-picker code");
  if (value) value.textContent = theme.background;
  panel.querySelectorAll("[data-guided-page-theme]").forEach((button) => {
    button.classList.toggle("active", button.dataset.guidedPageTheme === theme.id);
  });
}

function renderGuidedPageEditor(page) {
  const theme = getGuidedPageTheme(page);
  return `
    <div class="guided-page-editor">
      <section class="guided-page-editor-section">
        <span>全局色系</span>
        <div class="guided-page-color-picker">
          <i
            class="guided-page-color-dot"
            style="background:linear-gradient(135deg, ${escapeAttr(theme.primary)} 0 50%, ${escapeAttr(theme.secondary)} 50% 100%)"
          ></i>
          <div>
            <strong>${escapeHtml(theme.name)}</strong>
            <code>${escapeHtml(theme.background)}</code>
            <em>同步切换组件与页面背景色</em>
          </div>
        </div>
        <div class="guided-page-color-swatches">
          ${["日常色系", "节点色系"]
            .map((category) => {
              const items = guidedPageThemePresets.filter((item) => getGuidedThemeCategory(item) === category);
              if (!items.length) return "";
              return `
                <div class="guided-page-color-group">
                  <strong>${escapeHtml(category)}</strong>
                  <div>
                    ${items.map((item) => renderGuidedThemeButton(item, theme.id)).join("")}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;
}

function renderGuidedFloatingPanel(node, options = {}) {
  const mode = state.guidedPanelMode;
  const title =
    mode === "replace"
      ? "更改模块"
      : mode === "states"
        ? "查看状态"
        : mode === "global"
          ? node?.isLotteryResultPopup
            ? "查看变量"
            : "查看模块变量"
          : mode === "page"
            ? "页面设置"
            : mode === "add"
              ? "增加组件"
              : "AI 修改头图";
  let body = "";

  if (mode === "page") {
    body = renderGuidedPageEditor(activePage());
  } else if (mode === "global") {
    body = renderGuidedGlobalEditor(node);
  } else if (mode === "add") {
    const options = getGuidedMoleculeOptions();
    body = `
      <p>拖拽分子组件到页面模块之间；直接点击会追加到当前页面末尾。</p>
      <div class="guided-molecule-options">
        ${options
          .map(
            (item) => `
              <div
                class="guided-molecule-card"
                role="button"
                tabindex="0"
                data-guided-add-molecule="${escapeAttr(item.id)}"
                aria-label="增加${escapeAttr(item.name)}"
              >
                <div class="guided-molecule-preview ${item.imageUrl ? "is-content" : ""}">
                  <div class="guided-molecule-preview-inner ${item.imageUrl ? "is-content" : ""}">
                    ${renderGuidedMoleculePreview(item)}
                  </div>
                </div>
                <div class="guided-molecule-card-meta">
                  <span>预存分子</span>
                  <strong>${escapeHtml(item.name)}</strong>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  } else if (mode === "replace") {
    const options = getGuidedMoleculeOptions();
    body = `
      <p>选择一个预存分子模块，替换后保留当前页面位置。</p>
      <div class="guided-molecule-options">
        ${options
          .map(
            (item) => `
              <div
                class="guided-molecule-card"
                role="button"
                tabindex="0"
                data-guided-replace-molecule="${escapeAttr(item.id)}"
                aria-label="替换为${escapeAttr(item.name)}"
              >
                <div class="guided-molecule-preview ${item.imageUrl ? "is-content" : ""}">
                  <div class="guided-molecule-preview-inner ${item.imageUrl ? "is-content" : ""}">
                    ${renderGuidedMoleculePreview(item)}
                  </div>
                </div>
                <div class="guided-molecule-card-meta">
                  <span>预存分子</span>
                  <strong>${escapeHtml(item.name)}</strong>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  } else if (mode === "states") {
    const stateEntries = getGuidedStateEntries(node);
    const childStateGroups = getGuidedChildStateGroups(node);
    const variantEntries = getGuidedVariantEntries(node);
    body = stateEntries.length || childStateGroups.length || variantEntries.length
      ? `
        <p>这里展示组件包含的全部状态，可逐个切换并立即同步预览。</p>
        ${
          stateEntries.length
            ? `
              <div class="guided-business-states">
                ${stateEntries
                  .map(
                    (entry) => `
                      <button
                        class="guided-business-state-card ${node.activeGuidedStateId === entry.id ? "active" : ""}"
                        data-guided-business-state="${escapeAttr(entry.id)}"
                        aria-label="切换为${escapeAttr(entry.name)}"
                      >
                        <header>
                          <span>${escapeHtml(entry.name)}</span>
                          <code>${escapeHtml(entry.component)}</code>
                        </header>
                        <div class="guided-business-state-preview">
                          <div class="guided-business-state-preview-inner">
                            ${renderComponent(entry.node, { editable: false })}
                          </div>
                        </div>
                      </button>
                    `,
                  )
                  .join("")}
              </div>
            `
            : ""
        }
        ${
          childStateGroups.length
            ? `
              <div class="guided-child-state-groups">
                ${childStateGroups.map((group) => `
                  <section class="guided-child-state-group">
                    <header>
                      <strong>${escapeHtml(group.label)}</strong>
                      <span>${escapeHtml(group.child.name || group.child.schemaId)}</span>
                    </header>
                    <div class="guided-child-state-options">
                      ${group.stateEntries.map((entry) => `
                        <button
                          type="button"
                          class="${group.child.activeGuidedStateId === entry.id ? "active" : ""}"
                          data-guided-child-state-node="${escapeAttr(group.child.id)}"
                          data-guided-child-state="${escapeAttr(entry.id)}"
                        >
                          <strong>${escapeHtml(entry.name)}</strong>
                          <span>${escapeHtml(entry.component)}</span>
                        </button>
                      `).join("")}
                    </div>
                  </section>
                `).join("")}
              </div>
            `
            : ""
        }
        <div class="guided-state-options">
          ${variantEntries
            .map(
              ({ node: variantNode, variant }) => `
                <button
                  class="${variantNode.activeVariantId === variant.id ? "active" : ""}"
                  data-guided-variant-node="${variantNode.id}"
                  data-guided-variant="${variant.id}"
                >
                  <strong>${escapeHtml(variant.name)}</strong>
                  <span>${escapeHtml(variantNode.name)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      `
      : `<div class="guided-panel-empty">当前组件只有默认状态，暂无其他变体。</div>`;
  } else {
    body = `
      <p>描述希望调整的头图内容，点击按钮后模拟 AI 重新生成并替换。</p>
      <textarea class="guided-ai-prompt" rows="4" placeholder="例如：突出端午氛围，主利益点更醒目"></textarea>
      <button class="guided-ai-submit" data-guided-ai-apply>生成并替换头图</button>
    `;
  }

  const lineageVersion = mode === "global" ? "v3" : state.guidedLineageVersion || "v3";
  const lineageVersionClass =
    mode === "global" && lineageVersion === "v3"
      ? "is-lineage-v3"
      : "";
  const panelModeClass =
    mode === "replace"
      ? "is-replace"
      : mode === "add"
        ? "is-add"
      : mode === "page"
        ? "is-page"
        : mode === "global" && node?.isLotteryResultPopup
          ? "is-popup-variables"
        : "";
  const headerLabel =
    mode === "page"
      ? activePage().dimension || activePage().name
      : mode === "add"
        ? activePage()?.name || "当前页面"
        : node?.name || "";

  return `
      <aside
        class="guided-floating-panel guided-operation-panel ${panelModeClass} ${options.enter ? "is-entering" : ""} ${mode === "global" && !node?.isLotteryResultPopup ? `is-global is-lineage ${lineageVersionClass}` : ""}"
        role="dialog"
        aria-label="${escapeAttr(title)}"
      >
      <header>
        <div>
          <span>${escapeHtml(headerLabel)}</span>
          <h2>${title}</h2>
        </div>
        <button data-guided-close-panel aria-label="关闭">×</button>
      </header>
      <div class="guided-floating-panel-body">
        ${body}
      </div>
    </aside>
  `;
}

function getModuleKind(schemaId) {
  const molecule = moleculeSchemas.find((item) => item.id === schemaId);
  if (molecule && /九宫格|消耗返1/.test(molecule.name || "")) return "play";
  return moduleKindMap[schemaId] || "reward";
}

const animationPreviewItems = [];

function renderAnimationPreviewLibrary() {
  const center = $(".activity-center");
  if (!center) return;

  center.innerHTML = `
    <div class="activity-hero motion-lib-hero">
      <button class="back-btn" data-back-home>← 返回活动中心</button>
      <span class="motion-lib-kicker">Local Motion Assets</span>
      <h1>动效预览库</h1>
      <p>预览项目里的本地动效组件，用于校对素材、层级、尺寸和循环节奏。</p>
      <div class="motion-lib-summary">
        <span>共 ${animationPreviewItems.length} 个动效</span>
        <span>·</span>
        <span>全部来自本地 动效/ 目录</span>
        <span>·</span>
        <span>实时播放 CSS 动效</span>
      </div>
    </div>

    <section class="motion-preview-section">
      <div class="motion-preview-grid">
        ${animationPreviewItems.map((item) => renderAnimationPreviewCard(item)).join("")}
      </div>
    </section>
  `;
}

function renderAnimationPreviewCard(item) {
  const width = Number(item.dimensions?.width || 750);
  const height = Number(item.dimensions?.height || 559);
  const props = defaultProps(item.component);

  return `
    <article class="motion-preview-card" data-motion-preview="${escapeAttr(item.id)}">
      <div class="motion-preview-stage">
        <div class="react-component-fit motion-preview-fit" style="--component-width:${width}px;--component-height:${height}px">
          <div
            class="react-component-host"
            style="width:${width}px;height:${height}px"
            data-react-component="${escapeAttr(item.component)}"
            data-props="${escapeAttr(JSON.stringify(props))}"
          ></div>
        </div>
      </div>
      <div class="motion-preview-info">
        <div>
          <span class="motion-preview-version">${escapeHtml(item.version)}</span>
          <h2>${escapeHtml(item.name)}</h2>
          <p>${escapeHtml(item.description)}</p>
        </div>
        <dl>
          <div>
            <dt>尺寸</dt>
            <dd>${width} x ${height}</dd>
          </div>
          <div>
            <dt>路径</dt>
            <dd>${escapeHtml(item.source)}</dd>
          </div>
        </dl>
      </div>
    </article>
  `;
}

function mountPreviewDetailReactMaterials() {
  window.renderReactMaterials?.();
  requestAnimationFrame(() => {
    window.renderReactMaterials?.();
  });
}

function renderPageTemplatePreview(template) {
  const blocks = template.preview || [];
  return `
    <div class="pt-preview">
      <div class="pt-preview-inner">
        ${blocks
          .map((block) => {
            const style = [
              `height: ${block.height}px`,
              `background: ${block.gradient}`,
              block.marginTop ? `margin-top: ${block.marginTop}px` : "",
              block.radius ? `border-radius: ${block.radius}px` : "",
              block.width ? `width: ${block.width}px` : "",
              block.border ? `border: 1.5px solid ${block.border}` : "",
            ]
              .filter(Boolean)
              .join("; ");
            return `<div class="pt-preview-block" style="${style}"></div>`;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderPageTemplateModal() {
  const dim = state.pageTemplateModalDimension || state.selectedDimension || activePage()?.dimension || "";
  const dimensions = [...new Set(state.pages.map((p) => p.dimension))];
  const currentDimIndex = dimensions.indexOf(dim);

  return `
    <div class="create-modal-overlay" data-page-template-overlay>
      <div class="create-modal create-modal-large">
        <div class="create-modal-head">
          <h3>新增页面</h3>
          <button class="create-modal-close" data-close-page-template-modal>×</button>
        </div>

        <div class="create-step-label">
          <h4>页面结构配置</h4>
          <p>设置页面名称和所属维度</p>
        </div>

        <div class="structure-tree-config">
          ${dimensions
            .map(
              (d, dimIndex) => `
                <div class="structure-dimension-config">
                  <div class="structure-dimension-header">
                    <strong>${escapeHtml(d)}</strong>
                    <span>${state.pages.filter((p) => p.dimension === d).length} 个页面</span>
                  </div>
                  <div class="structure-page-list">
                    ${state.pages
                      .filter((p) => p.dimension === d)
                      .map((page) => `
                        <div class="structure-page-item">
                          <span>${escapeHtml(page.name)}</span>
                        </div>
                      `).join("")}
                  </div>
                  <button class="add-page-btn" data-add-page-to-dimension="${d}">+ 添加页面到「${escapeHtml(d)}」</button>
                </div>
              `,
            )
            .join("")}
        </div>

        <button class="add-dimension-btn" data-add-dimension-page-modal>+ 添加新维度</button>

        <div class="create-modal-footer">
          <button class="next-btn" data-add-blank-page>添加空白页</button>
        </div>
      </div>
    </div>
  `;
}

function renderCreateModal() {
  const { name, dimensions, pages } = state.createDraft;

  return `
    <div class="create-modal-overlay" data-create-modal-overlay>
      <div class="create-modal create-modal-large">
        <div class="create-modal-head">
          <h3>新建活动</h3>
          <button class="create-modal-close" data-close-create-modal>×</button>
        </div>

        <div class="create-step-label">
          <h4>活动结构配置</h4>
          <p>设置活动名称、维度和页面结构</p>
        </div>

        <div class="create-form-group">
          <label>活动名称</label>
          <input type="text" data-create-name value="${escapeAttr(name)}" placeholder="请输入活动名称" />
        </div>

        <div class="structure-tree-config">
          ${dimensions
            .map(
              (dim, dimIndex) => `
                <div class="structure-dimension-config">
                  <div class="structure-dimension-header">
                    <input type="text" data-dimension-name="${dimIndex}" value="${escapeAttr(dim)}" placeholder="维度名称" />
                    ${dimensions.length > 1 ? `<button class="dimension-delete" data-delete-dimension="${dimIndex}" title="删除">×</button>` : ""}
                  </div>
                  <div class="structure-page-list">
                    ${(pages[dim] || []).map((page, pageIndex) => `
                      <div class="structure-page-item">
                        <input type="text" data-page-name="${dimIndex}:${pageIndex}" value="${escapeAttr(page.name)}" placeholder="页面名称" />
                        <button class="page-template-btn" data-select-page-template="${dimIndex}:${pageIndex}" title="选择模板">
                          ${page.templateId ? '<span class="template-tag">已选</span>' : '<span class="template-icon">T</span>'}
                        </button>
                        <button class="page-delete" data-delete-page="${dimIndex}:${pageIndex}" title="删除">×</button>
                      </div>
                    `).join("")}
                    ${(pages[dim] || []).length === 0 ? '<div class="structure-empty-page">暂无页面，点击下方按钮添加</div>' : ""}
                  </div>
                  <button class="add-page-btn" data-add-draft-page="${dimIndex}">+ 添加页面</button>
                </div>
              `,
            )
            .join("")}
        </div>

        <button class="add-dimension-btn" data-add-dimension>+ 添加维度</button>

        <div class="create-modal-footer">
          <button class="next-btn" data-create-next>创建并进入画布</button>
        </div>
      </div>
      ${state.draftTemplateModalOpen ? renderDraftTemplateModal() : ""}
    </div>
  `;
}

function renderDraftTemplateModal() {
  const builtInTemplates = pageTemplates.map(t => ({
    ...t,
    isCustom: false,
    canvasBackground: t.canvasBackground || t.background || "#ffffff",
  }));
  const allTemplates = [...builtInTemplates, ...customPageTemplates];
  
  if (!allTemplates.length) {
    return `
      <div class="draft-template-modal" data-draft-template-modal>
        <div class="draft-template-content">
          <div class="draft-template-header">
            <h4>选择页面模板</h4>
            <button class="draft-template-close" data-close-draft-template-modal>×</button>
          </div>
          <div class="draft-template-body">
            <p style="text-align: center; color: #999;">暂无可用模板</p>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="draft-template-modal" data-draft-template-modal>
      <div class="draft-template-content">
        <div class="draft-template-header">
          <h4>选择页面模板</h4>
          <button class="draft-template-close" data-close-draft-template-modal>×</button>
        </div>
        <div class="draft-template-body">
          <div class="draft-template-grid">
            ${allTemplates.map((template) => {
              const isCustom = template.isCustom;
              return `
                <button class="draft-template-card ${isCustom ? "custom" : ""}" data-select-draft-template="${template.id}">
                  <div class="draft-template-preview" style="background:${template.canvasBackground || template.background || "#ffffff"}">
                    ${isCustom ? renderCustomTemplatePreview(template) : template.nodes.map((entry) => renderTemplatePreviewNode(entry)).join("")}
                  </div>
                  <div class="draft-template-name">${escapeHtml(template.name)}</div>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStructureTree() {
  const tree = $(".structure-tree");
  if (!tree) return;
  const totalNodes = state.pages.reduce((total, page) => total + page.nodes.length, 0);
  tree.innerHTML = `
    <div class="structure-activity">
      <div>
        <strong contenteditable="true" spellcheck="false" data-edit-activity-name>${escapeHtml(state.activity.name)}</strong>
        <span>${state.pages.length} 个页面 · ${totalNodes} 个模块</span>
      </div>
    </div>
    <div class="structure-list">
      ${groupPagesByDimension().map((group) => renderStructureDimension(group)).join("")}
    </div>
  `;
}

function renderStructureDimension(group) {
  return `
    <section class="structure-dimension">
      <div class="structure-dimension-head">
        <strong>${escapeHtml(group.dimension)}</strong>
        <span>${group.pages.length} 页</span>
      </div>
      ${group.pages.map((page) => renderStructurePage(page, state.pages.indexOf(page))).join("")}
    </section>
  `;
}

function renderStructurePage(page, index) {
  const active = page.id === state.activePageId ? "active" : "";
  const nodes = page.nodes.length
    ? page.nodes.map((node) => renderStructureNode(node, 0)).join("")
    : `<div class="structure-empty">暂无模块</div>`;

  return `
    <section class="structure-page ${active}" data-structure-page="${page.id}">
      <div class="structure-page-header">
        <button class="structure-page-head" data-structure-page="${page.id}">
          <span class="page-icon"></span>
          <strong>${escapeHtml(page.name)}</strong>
          <span class="page-count">${page.nodes.length}</span>
        </button>
        <button class="structure-page-save-template" data-save-page-template="${page.id}" title="保存为模板">
          <span class="template-icon">+</span>
        </button>
      </div>
      <div class="structure-nodes">${nodes}</div>
    </section>
  `;
}

function renderStructureNode(node, depth) {
  const selected = node.id === state.selectedId ? "selected" : "";
  const typeLabel = node.type === "molecule" ? "分子" : "原子";
  const children = node.children?.length
    ? `<div class="structure-children">${node.children.map((child) => renderStructureNode(child, depth + 1)).join("")}</div>`
    : "";

  return `
    <button class="structure-node ${selected}" data-structure-node="${node.id}">
      <span class="node-type">${typeLabel}</span>
      <strong>${escapeHtml(node.name)}</strong>
    </button>
    ${children}
  `;
}

function renderAtomPreview(schemaId, overrides = {}) {
  const schema = findAtomSchema(schemaId);
  const node = {
    id: `preview_${schemaId}`,
    schemaId,
    type: "atom",
    props: defaultProps(schemaId, overrides),
  };
  return renderComponent(node, { editable: false });
}

function renderMoleculePreview(schema) {
  const children = getMoleculeChildEntries(schema, getMoleculeDefaultProps(schema));
  const moleculeClass = schema.className ? ` ${schema.className}` : "";
  const previewStyle =
    String(schema.className || "").split(/\s+/).includes("task-list-module")
      ? "background:transparent;border-radius:0;padding:0;min-height:100px;overflow:visible;"
      : "background:rgba(255,255,255,1);border-radius:12px;padding:12px;min-height:100px;";
  if (!children.length) {
    return `
      <div class="component molecule preview-molecule molecule-container${moleculeClass}"
           style="${previewStyle}">
        <div class="molecule-empty-hint" style="font-size:12px;">分子容器</div>
      </div>
    `;
  }
  return `
    <div class="component molecule preview-molecule molecule-container${moleculeClass}"
         style="${previewStyle}">
      ${children.map(([schemaId, overrides]) => renderAtomPreview(schemaId, overrides)).join("")}
    </div>
  `;
}

function renderLineageTextDiff(value, initialValue) {
  const currentChars = Array.from(String(value ?? ""));
  const initialChars = Array.from(String(initialValue ?? ""));
  if (!currentChars.length) return "";
  if (currentChars.join("") === initialChars.join("")) {
    return escapeHtml(currentChars.join(""));
  }

  const rows = initialChars.length + 1;
  const cols = currentChars.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
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

function getTextOffsetWithin(element) {
  const selection = window.getSelection?.();
  if (!selection || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (!element.contains(range.startContainer)) return null;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let node = walker.nextNode();
  while (node) {
    if (node === range.startContainer) {
      return offset + range.startOffset;
    }
    offset += node.textContent.length;
    node = walker.nextNode();
  }
  return offset;
}

function restoreTextOffsetWithin(element, offset) {
  if (offset == null) return;
  const selection = window.getSelection?.();
  if (!selection) return;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let remaining = offset;
  let node = walker.nextNode();
  while (node) {
    const length = node.textContent.length;
    if (remaining <= length) {
      const range = document.createRange();
      range.setStart(node, remaining);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      return;
    }
    remaining -= length;
    node = walker.nextNode();
  }
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function applyLineageInlineDiff(element, value) {
  const caretOffset = getTextOffsetWithin(element);
  const initial = element.dataset.initialValue || "";
  element.classList.toggle("lineage-text-changed", value !== initial);
  const prefix = element.dataset.lineageValuePrefix || "";
  const suffix = element.dataset.lineageValueSuffix || "";
  element.innerHTML = `${escapeHtml(prefix)}${renderLineageTextDiff(value, initial)}${escapeHtml(suffix)}`;
  restoreTextOffsetWithin(element, caretOffset);
}

function getLineageInlineValue(element) {
  let value = element.textContent || "";
  const prefix = element.dataset.lineageValuePrefix || "";
  const suffix = element.dataset.lineageValueSuffix || "";
  if (prefix && value.startsWith(prefix)) value = value.slice(prefix.length);
  if (suffix && value.endsWith(suffix)) value = value.slice(0, -suffix.length);
  return value;
}

function renderEditable(value, prop, tag = "span", options = {}) {
  let attr = "";
  let content = escapeHtml(value);
  if (options.mode === "canvas") {
    attr = `contenteditable="true" spellcheck="false" data-edit-prop="${prop}"`;
  } else if (options.mode === "variant") {
    attr = `contenteditable="true" spellcheck="false" data-variant-id="${options.variantId}" data-variant-prop="${prop}"`;
  } else if (options.mode === "lineage") {
    const path = `${options.lineagePrefix || ""}${prop}`;
    const initial = getNodeValueByPath(options.lineageInitialRoot || options.lineageInitialNode || {}, path);
    const changed = String(value ?? "") !== String(initial ?? "") ? " lineage-text-changed" : "";
    attr = `contenteditable="true" spellcheck="false" class="${changed.trim()}" data-guided-lineage-inline="${escapeAttr(`${options.variantId}|${path}`)}" data-initial-value="${escapeAttr(initial)}"`;
    content = renderLineageTextDiff(value, initial);
  }
  return `<${tag} ${attr}>${content}</${tag}>`;
}

function renderMoleculeComponent(node, options = {}) {
  const children = node.children || [];
  const isDropTarget = state.dropMoleculeId === node.id;
  const minHeight = children.length === 0 ? "200px" : "auto";
  const moleculeClass = node.className ? ` ${node.className}` : "";

  const pieces = [];
  if (!children.length) {
    if (isDropTarget && state.dropChildIndex === 0) {
      pieces.push('<div class="molecule-drop-marker"></div>');
    }
    pieces.push('<div class="molecule-empty-hint">拖入原子组件到此处</div>');
  } else {
    children.forEach((child, index) => {
      if (isDropTarget && state.dropChildIndex === index) {
        pieces.push('<div class="molecule-drop-marker"></div>');
      }
      const childOptions =
        options.editableMode === "lineage"
          ? {
              ...options,
              lineagePrefix: `${options.lineagePrefix || ""}${index}.`,
              lineageInitialRoot: options.lineageInitialRoot || options.lineageInitialNode,
              lineageInitialNode: options.lineageInitialNode?.children?.[index],
            }
          : options;
      pieces.push(renderMoleculeChildNode(child, index, node.id, childOptions));
    });
    if (isDropTarget && state.dropChildIndex === children.length) {
      pieces.push('<div class="molecule-drop-marker"></div>');
    }
  }

  return `
    <div class="component molecule molecule-container${moleculeClass}${isDropTarget ? " molecule-drop-target" : ""}"
         data-molecule-id="${node.id}"
         style="min-height:${minHeight};">
      ${pieces.join("")}
    </div>
  `;
}

function renderMoleculeChildNode(child, index, parentId, options = {}) {
  const selected = state.selectedId === child.id ? "selected" : "";
  const canvasAlignment = child.schemaId === "SectionTitle" ? "section-title-canvas-left" : "";
  return `
    <div class="node-wrap nested molecule-child ${canvasAlignment} ${selected}"
         data-select="${child.id}" 
         data-node-id="${child.id}"
         data-parent-id="${parentId}"
         data-child-index="${index}">
      ${selected ? `<div class="node-label">${child.name}</div>` : ""}
      ${renderComponent(child, options)}
    </div>
  `;
}

function renderStickyBottomButtonFallback(props = {}, editOptions = {}) {
  const text = props.text || "立即投放上热门";
  return `
    <section class="component sticky-bottom-button-fallback">
      <div class="sticky-bottom-button-fallback__fade"></div>
      <div class="sticky-bottom-button-fallback__bar">
        <div class="sticky-bottom-button-fallback__button">
          ${renderEditable(text, "text", "span", editOptions)}
        </div>
      </div>
    </section>
  `;
}

function renderComponent(node, options = {}) {
  const editOptions =
    options.editable === false
      ? {}
      : {
          mode: options.editableMode || "canvas",
          variantId: options.variantId,
          lineagePrefix: options.lineagePrefix || "",
          lineageInitialNode: options.lineageInitialNode,
          lineageInitialRoot: options.lineageInitialRoot,
        };
  if (node.type === "molecule") {
    return renderMoleculeComponent(node, options);
  }

  const schema = findAtomSchema(node.schemaId);
  const p = schema ? defaultProps(node.schemaId, node.props || {}) : (node.props || {});
  if (schema?.id === "StickyBottomButton" || node.schemaId === "StickyBottomButton") {
    return renderStickyBottomButtonFallback(p, editOptions);
  }
  if (schema?.reactComponent) {
    return renderReactComponent(schema, p, editOptions);
  }
  if (node.schemaId === "ContentModuleImage") {
    return `
      <section class="component content-module-image">
        <img src="${escapeAttr(p.src || contentModuleImageUrl)}" alt="${escapeAttr(p.alt || "内容模块")}" />
      </section>
    `;
  }
  if (node.schemaId === "coverImage") {
    return `
      <section class="component cover-image" style="background:${p.background};color:${p.textColor}">
        <div class="cover-copy">
          ${renderEditable(p.eyebrow, "eyebrow", "span", editOptions)}
          ${renderEditable(p.title, "title", "h2", editOptions)}
          ${renderEditable(p.subtitle, "subtitle", "p", editOptions)}
        </div>
        <div class="cover-visual" aria-hidden="true">
          <div class="cover-ticket"></div>
          <div class="cover-coin"></div>
        </div>
      </section>
    `;
  }
  if (node.schemaId === "heroBanner") {
    return `
      <section class="component banner" style="background:${p.background};color:${p.textColor}">
        ${renderEditable(p.title, "title", "h2", editOptions)}
        ${renderEditable(p.subtitle, "subtitle", "p", editOptions)}
      </section>
    `;
  }
  if (node.schemaId === "textBlock") {
    return `
      <section class="component text-block" style="background:${p.background}">
        ${renderEditable(p.title, "title", "h3", editOptions).replace("<h3", `<h3 style="color:${p.titleColor}"`)}
        ${renderEditable(p.body, "body", "p", editOptions).replace("<p", `<p style="color:${p.bodyColor}"`)}
      </section>
    `;
  }
  if (node.schemaId === "priceCard") {
    return `
      <section class="component price-card" style="background:${p.background}">
        ${renderEditable(p.price, "price", "div", editOptions).replace("<div", `<div class="price" style="color:${p.priceColor}"`)}
        ${renderEditable(p.caption, "caption", "div", editOptions).replace("<div", '<div class="caption"')}
      </section>
    `;
  }
  return `
    <section class="component cta" style="background:${p.background};color:${p.textColor}">
      ${renderEditable(p.text, "text", "span", editOptions)}
      ${renderEditable(p.hint, "hint", "em", editOptions)}
    </section>
  `;
}

function renderReactComponent(schema, props, editOptions) {
  const mode = editOptions.mode || "";
  const variantId = editOptions.variantId || "";
  const width = Number(schema.dimensions?.width || 700);
  const height = Number(schema.dimensions?.height || 300);
  const isAutoHeight = schema.heightMode === "auto";
  const shouldShrinkWrapAutoHeight = [
    "正文-活动规则样式3",
    "正文-用户教育",
  ].includes(schema.id);
  const fitSizeStyle = isAutoHeight
    ? `--component-width:${width}px;--component-height:${height}px;${shouldShrinkWrapAutoHeight ? "min-height:0;" : `min-height:${height}px;`}height:auto;`
    : `--component-width:${width}px;--component-height:${height}px`;
  const hostSizeStyle = isAutoHeight
    ? `width:${width}px;${shouldShrinkWrapAutoHeight ? "min-height:0;" : `min-height:${height}px;`}height:auto;`
    : `width:${width}px;height:${height}px`;
  const lineagePrefix = editOptions.lineagePrefix || "";
  const lineageInitialProps =
    mode === "lineage"
      ? JSON.stringify(editOptions.lineageInitialNode?.props || {})
      : "";

  return `
    <div class="react-component-fit" style="${fitSizeStyle}">
      <div
        class="react-component-host"
        style="${hostSizeStyle}"
        data-react-component="${escapeAttr(schema.reactComponent)}"
        data-props="${escapeAttr(JSON.stringify(props))}"
        data-edit-mode="${escapeAttr(mode)}"
        data-variant-id="${escapeAttr(variantId)}"
        data-lineage-prefix="${escapeAttr(lineagePrefix)}"
        data-lineage-initial-props="${escapeAttr(lineageInitialProps)}"
      ></div>
    </div>
  `;
}

function renderNode(node, nested = false) {
  const selected = state.selectedId === node.id ? "selected" : "";
  const canvasLayout =
    node.schemaId === "SectionTitle"
      ? "section-title-canvas-left"
      : node.schemaId === "投放案例"
        ? "placement-case-canvas"
        : "";
  const content =
    node.schemaId === "投放案例"
      ? renderPlacementCaseCarousel(node)
      : renderComponent(node);
  return `
    <div class="node-wrap ${nested ? "nested" : "root"} ${canvasLayout} ${selected}" data-select="${node.id}" data-node-id="${node.id}">
      ${!nested ? '<div class="drag-grip" title="拖拽排序">⋮⋮</div>' : ""}
      ${selected ? `<div class="node-label">${node.name}</div>` : ""}
      ${content}
    </div>
  `;
}

function renderCanvas() {
  const row = $(".pages-row");
  row.innerHTML = `<div class="canvas-world"><div class="canvas-world-label">活动画布 · ${escapeHtml(state.activity.name)}</div>${groupPagesByDimension()
    .map(
      (group) => `
        <div class="dimension-group ${state.selectedDimension === group.dimension ? "selected" : ""}" data-dimension-group="${escapeAttr(group.dimension)}" data-select-dimension="${escapeAttr(group.dimension)}">
          <div class="dimension-group-title">
            <div class="dimension-lane-name">
              <strong contenteditable="true" spellcheck="false" data-edit-dimension="${escapeAttr(group.dimension)}">${escapeHtml(group.dimension)}</strong>
            </div>
          </div>
          <div class="dimension-page-titles">
            ${group.pages.map((pageData) => renderPageTitle(pageData)).join("")}
          </div>
          <section class="dimension-lane ${state.selectedDimension === group.dimension ? "selected" : ""}" data-dimension="${escapeAttr(group.dimension)}">
            <div class="dimension-lane-toolbar">
              <button class="dimension-lane-add" data-add-page-dimension="${escapeAttr(group.dimension)}">新增页面</button>
            </div>
            <div class="dimension-pages">
              ${group.pages.map((pageData) => renderPageCanvas(pageData)).join("")}
            </div>
          </section>
        </div>
      `,
    )
    .join("")}</div></div>`;
  syncMeasuredComponentFrames();
  document.fonts?.ready.then(syncMeasuredComponentFrames);
  window.renderReactMaterials?.();
}

function groupPagesByDimension() {
  const groups = [];
  state.pages.forEach((page) => {
    const dimension = page.dimension || "未分组";
    let group = groups.find((item) => item.dimension === dimension);
    if (!group) {
      group = { dimension, pages: [] };
      groups.push(group);
    }
    group.pages.push(page);
  });
  return groups;
}

function renderPageTitle(pageData) {
  return `
    <div class="page-title" data-page-title="${pageData.id}">
      <div>
        <strong contenteditable="true" spellcheck="false" data-edit-page-name="${pageData.id}">${escapeHtml(pageData.name)}</strong>
        <div class="page-condition-tags editable-tags" contenteditable="true" spellcheck="false" data-edit-page-tags="${pageData.id}">${escapeHtml((pageData.tags || []).join(" / "))}</div>
      </div>
      <div class="page-title-actions">
        <button class="page-nav-toggle ${pageData.navBarEnabled ? "active" : ""}" data-toggle-page-navbar="${pageData.id}" aria-pressed="${pageData.navBarEnabled ? "true" : "false"}">
          ${pageData.navBarEnabled ? "隐藏导航栏" : "显示导航栏"}
        </button>
        <button class="delete-page-button" data-delete-page="${pageData.id}" ${state.pages.length <= 1 ? "disabled" : ""} aria-label="删除${escapeAttr(pageData.name)}">×</button>
      </div>
    </div>
  `;
}

function renderPageCanvas(pageData) {
  const pieces = [];
  const isActive = pageData.id === state.activePageId;
  if (!pageData.nodes.length) {
    if (isActive && state.dropPageId === pageData.id && state.dropIndex === 0) pieces.push('<div class="drop-marker"></div>');
    pieces.push(`<div class="empty-canvas">把左侧物料拖进页面<br />松手后加入${pageData.name}</div>`);
  }
  pageData.nodes.forEach((node, index) => {
    if (isActive && state.dropPageId === pageData.id && state.dropIndex === index) pieces.push('<div class="drop-marker"></div>');
    pieces.push(renderNode(node));
  });
  if (isActive && state.dropPageId === pageData.id && state.dropIndex === pageData.nodes.length) pieces.push('<div class="drop-marker"></div>');

  return `
    <section class="page-shell ${isActive ? "active" : ""}" data-page-shell="${pageData.id}">
      <div class="phone">
        <div class="page" data-page-id="${pageData.id}" style="background:${pageData.canvasBackground}">
          ${pieces.join("")}
          ${pageData.navBarEnabled ? renderPageNavBarOverlay() : ""}
        </div>
      </div>
    </section>
  `;
}

function renderPageNavBarOverlay() {
  return `
    <div class="page-navbar-overlay" aria-hidden="true">
      <img src="${navigationBarSvgUrl}" alt="" />
    </div>
  `;
}

function syncMeasuredComponentFrames() {}

function syncPreviewComponentFrames() {}

function renderPageSaveFloat() {
  const floatBtn = $(".page-save-float");
  if (!floatBtn) return;

  if (!state.activePageId) {
    floatBtn.classList.remove("open");
    return;
  }

  const pageEl = document.querySelector(`[data-page-id="${state.activePageId}"]`);
  if (!pageEl) {
    floatBtn.classList.remove("open");
    return;
  }

  floatBtn.classList.add("open");
  floatBtn.innerHTML = `
    <span class="float-icon">+</span>
    <span class="float-text">保存为模板</span>
  `;
  floatBtn.dataset.savePageFloat = state.activePageId;

  const rect = pageEl.getBoundingClientRect();
  const gap = 12;
  const floatLeft = Math.min(window.innerWidth - 150, rect.right + gap);
  const floatTop = Math.max(60, Math.min(rect.top, window.innerHeight - 48));
  floatBtn.style.left = `${floatLeft}px`;
  floatBtn.style.top = `${floatTop}px`;
}

function renderContextControls() {
  const toolbar = $(".quick-toolbar");
  const variantsPanel = $(".variant-inspector");
  const richtextPanel = $(".richtext-editor");
  const found = findNode(state.nodes, state.selectedId);
  if (!found) {
    toolbar.classList.remove("open");
    variantsPanel.classList.remove("open");
    richtextPanel.classList.remove("open");
    return;
  }

  const node = found.node;
  let toolbarHtml = "";
  if (node.type === "molecule" && node.children?.length > 0) {
    toolbarHtml += `
      <button class="tool-button" data-toggle-props aria-label="变量">
        <span class="variant-icon">P</span>
        <span class="tool-tip">编辑分子变量</span>
      </button>
      <button class="tool-button" data-save-molecule aria-label="保存为分子">
        <span style="font-size:14px;font-weight:700;">+M</span>
        <span class="tool-tip">保存为分子模板</span>
      </button>
    `;
  }
  if (node.type === "atom") {
    const componentColor = getComponentColor(node);
    toolbarHtml += `
      <button class="tool-button color-button" data-toggle-colors aria-label="颜色">
        <span class="color-dot" style="background:${componentColor}"></span>
        <input class="native-color-input" type="color" data-component-color-picker value="${componentColor}" />
        <span class="tool-tip">颜色</span>
      </button>
      <button class="tool-button" data-toggle-variants aria-label="变体">
        <span class="variant-icon">V</span>
        <span class="tool-tip">变体</span>
      </button>
      <button class="tool-button" data-toggle-props aria-label="变量">
        <span class="variant-icon">P</span>
        <span class="tool-tip">编辑变量</span>
      </button>
      <div class="color-popover ${state.colorPanelOpen ? "open" : ""}">
        ${colorChoices
          .map((color) => `<button class="color-swatch" data-apply-color="${color}" style="background:${color}" aria-label="${color}"></button>`)
          .join("")}
      </div>
    `;
  }

  toolbar.innerHTML = toolbarHtml;
  if (toolbarHtml) {
    toolbar.classList.add("open");
  } else {
    toolbar.classList.remove("open");
  }

  if (state.variantPanelOpen && node.type === "atom") renderVariantInspector(found);
  else variantsPanel.classList.remove("open");

  if (state.propsPanelOpen && (node.type === "atom" || node.type === "molecule")) renderPropsInspector(found);
  else richtextPanel.classList.remove("open");

  positionContextControls();
}

function renderPropsInspector(found) {
  const panel = $(".richtext-editor");
  const { node } = found;
  if (node.type === "molecule") {
    renderMoleculePropsInspector(panel, node);
    return;
  }

  const schema = findAtomSchema(node.schemaId);
  const props = (schema?.props || []).filter((item) => !item.isCssVar);

  if (!props.length) {
    panel.innerHTML = `
      <div class="inspector-head">
        <div>
          <strong>变量</strong>
          <span>${escapeHtml(node.name)}</span>
        </div>
      </div>
      <p class="inspector-note">这个组件暂时没有可编辑变量。</p>
    `;
    panel.classList.add("open");
    return;
  }

  panel.innerHTML = `
    <div class="inspector-head">
      <div>
        <strong>变量</strong>
        <span>${escapeHtml(node.name)} · ${props.length} 项</span>
      </div>
    </div>
    <div class="node-prop-list">
      ${props.map((field) => renderNodePropControl(node, field)).join("")}
    </div>
  `;
  panel.classList.add("open");
}

function renderMoleculePropsInspector(panel, node) {
  const moleculeSchema = moleculeSchemas.find((item) => item.id === node.schemaId);
  const moleculeProps = (moleculeSchema?.props || []).filter((item) => !item.isCssVar);
  const children = node.children || [];
  const editableChildren = children
    .map((child, index) => {
      const schema = findAtomSchema(child.schemaId);
      const props = (schema?.props || []).filter((item) => !item.isCssVar);
      return { child, index, props };
    })
    .filter((item) => item.props.length);

  if (!moleculeProps.length && !editableChildren.length) {
    panel.innerHTML = `
      <div class="inspector-head">
        <div>
          <strong>分子变量</strong>
          <span>${escapeHtml(node.name)}</span>
        </div>
      </div>
      <p class="inspector-note">这个分子内部暂时没有可编辑变量。</p>
    `;
    panel.classList.add("open");
    return;
  }

  const total = moleculeProps.length + editableChildren.reduce((sum, item) => sum + item.props.length, 0);
  panel.innerHTML = `
    <div class="inspector-head">
      <div>
        <strong>分子变量</strong>
        <span>${escapeHtml(node.name)} · ${total} 项</span>
      </div>
    </div>
    <div class="node-prop-list molecule-prop-list">
      ${moleculeProps.length ? `
        <section class="molecule-prop-group">
          <header>${escapeHtml(node.name || node.schemaId)}</header>
          ${moleculeProps.map((field) => renderNodePropControl(node, field)).join("")}
        </section>
      ` : ""}
      ${editableChildren
        .map(
          ({ child, index, props }) => `
            <section class="molecule-prop-group">
              <header>${escapeHtml(index + 1)}. ${escapeHtml(child.name || child.schemaId)}</header>
              ${props.map((field) => renderNodePropControl(child, field, { childIndex: index })).join("")}
            </section>
          `,
        )
        .join("")}
    </div>
  `;
  panel.classList.add("open");
}

function renderNodePropControl(node, field, options = {}) {
  const key = field.key || field.name;
  const value = node.props?.[key] ?? field.default ?? "";
  const type = field.type || "string";
  const id = `${node.id}_${key}`;
  const childIndexAttr = Number.isInteger(options.childIndex)
    ? ` data-node-prop-child-index="${options.childIndex}"`
    : "";
  let control = "";

  if (type === "boolean") {
    control = `
      <label class="node-prop-switch">
        <input type="checkbox" data-node-prop-input="${escapeAttr(key)}"${childIndexAttr} ${value ? "checked" : ""} />
        <span>${value ? "开启" : "关闭"}</span>
      </label>
    `;
  } else if (type === "color") {
    control = `<input id="${escapeAttr(id)}" type="color" data-node-prop-input="${escapeAttr(key)}"${childIndexAttr} value="${String(value).startsWith("#") ? escapeAttr(String(value)) : "#ffffff"}" />`;
  } else if (type === "number") {
    control = `<input id="${escapeAttr(id)}" type="number" data-node-prop-input="${escapeAttr(key)}"${childIndexAttr} value="${escapeAttr(String(value))}" />`;
  } else if (isPrizePropField(field)) {
    control = renderPrizeLibrarySelect(
      value,
      `data-node-prop-input="${escapeAttr(key)}"${childIndexAttr}`,
      `${node.name} ${field.label || key}`,
      `data-node-prize-name-input="${escapeAttr(key)}"${childIndexAttr}`,
      `data-node-prize-copy-input="${escapeAttr(key)}"${childIndexAttr}`,
    );
  } else {
    control = `<textarea id="${escapeAttr(id)}" data-node-prop-input="${escapeAttr(key)}"${childIndexAttr} rows="${String(value).length > 48 ? 3 : 1}">${escapeHtml(String(value))}</textarea>`;
  }

  return `
    <div class="node-prop-item">
      <label for="${escapeAttr(id)}">${escapeHtml(field.label || key)}</label>
      <code>${escapeHtml(key)}</code>
      ${field.description ? `<p>${escapeHtml(field.description)}</p>` : ""}
      ${control}
    </div>
  `;
}

function renderVariantInspector(found) {
  const variantsPanel = $(".variant-inspector");
  const { node, parent } = found;

  if (node.type === "molecule") {
    variantsPanel.innerHTML = `
      <div class="inspector-head">
        <div>
          <strong>变体</strong>
          <span>分子本身没有变体</span>
        </div>
      </div>
      <p class="inspector-note">请点选分子内部的原子组件，查看并编辑它的变体。</p>
    `;
    variantsPanel.classList.add("open");
    return;
  }

  const variants = node.variants || [];
  const cards = variants.length
    ? variants.map((variant) => renderVariantCard(node, variant)).join("")
    : `<p class="inspector-note">这个组件暂时没有配置变体。</p>`;

  variantsPanel.innerHTML = `
    <div class="inspector-head">
      <div>
        <strong>变体</strong>
        <span>${parent ? "分子内原子" : "当前原子"} · ${variants.length} 个</span>
      </div>
    </div>
    <div class="variant-list">${cards}</div>
  `;
  variantsPanel.classList.add("open");
}

function renderVariantCard(node, variant) {
  const active = node.activeVariantId === variant.id ? "active" : "";
  const previewNode = {
    ...node,
    props: { ...node.props, ...variant.props },
  };

  return `
    <section class="variant-card ${active}" data-apply-variant="${variant.id}">
      <div class="variant-card-head">
        <strong>${escapeHtml(variant.name)}</strong>
        <small>${active ? "当前使用" : "点击使用"}</small>
      </div>
      <div class="variant-preview">
        ${renderVariantPreview(previewNode, variant)}
      </div>
    </section>
  `;
}

function renderVariantPreview(node, variant) {
  return renderComponent(node, { editableMode: "variant", variantId: variant.id });
}

let positionContextControlsRaf = null;
function positionContextControls() {
  if (positionContextControlsRaf) cancelAnimationFrame(positionContextControlsRaf);
  positionContextControlsRaf = requestAnimationFrame(() => {
    positionContextControlsRaf = null;
  const toolbar = $(".quick-toolbar");
  const variantsPanel = $(".variant-inspector");
  const richtextPanel = $(".richtext-editor");
  const target = document.querySelector(`[data-node-id="${state.selectedId}"]`);
  if (!target || !toolbar.classList.contains("open")) return;

  const rect = target.getBoundingClientRect();
  const gap = 10;
  const toolbarLeft = Math.min(window.innerWidth - 96, rect.right + gap);
  const toolbarTop = Math.max(60, Math.min(rect.top, window.innerHeight - toolbar.offsetHeight - 16));
  toolbar.style.left = `${toolbarLeft}px`;
  toolbar.style.top = `${toolbarTop}px`;

  if (variantsPanel.classList.contains("open")) {
    variantsPanel.style.left = `${Math.min(window.innerWidth - 340, toolbarLeft + 58)}px`;
    variantsPanel.style.top = `${toolbarTop}px`;
  }

  if (richtextPanel.classList.contains("open")) {
    richtextPanel.style.left = `${Math.min(window.innerWidth - 360, toolbarLeft + 58)}px`;
    richtextPanel.style.top = `${toolbarTop}px`;
  }
  });
}

function getDropIndex(event, pageId = state.activePageId) {
  const activeShell = document.querySelector(`[data-page-shell="${pageId}"]`);
  const roots = [...(activeShell || document).querySelectorAll(".node-wrap.root")];
  if (!roots.length) return 0;
  for (let index = 0; index < roots.length; index += 1) {
    const rect = roots[index].getBoundingClientRect();
    if (event.clientY < rect.top + rect.height / 2) return index;
  }
  return roots.length;
}

function moleculeFromPoint(event) {
  const el = document.elementsFromPoint(event.clientX, event.clientY).find((element) => element.matches?.("[data-molecule-id]"));
  return el?.dataset.moleculeId || null;
}

function getMoleculeDropIndex(event, moleculeId) {
  const moleculeEl = document.querySelector(`[data-molecule-id="${moleculeId}"]`);
  if (!moleculeEl) return null;
  const children = [...moleculeEl.querySelectorAll(":scope > .molecule-child")];
  if (!children.length) return 0;
  for (let index = 0; index < children.length; index += 1) {
    const rect = children[index].getBoundingClientRect();
    if (event.clientY < rect.top + rect.height / 2) return index;
  }
  return children.length;
}

function pageFromPoint(event) {
  return document.elementsFromPoint(event.clientX, event.clientY).find((element) => element.matches?.("[data-page-id]"));
}

function exportPage() {
  return {
    version: "0.1.0",
    activity: clone(state.activity),
    viewport: { width: 750 },
    activePageId: state.activePageId,
    pages: state.pages.map((page) => ({
      id: page.id,
      name: page.name,
      tags: clone(page.tags || []),
      dimension: page.dimension || "未分组",
      canvas: { background: page.canvasBackground },
      navBarEnabled: Boolean(page.navBarEnabled),
      nodes: clone(page.nodes),
    })),
  };
}

const guidedCutExportRules = {
  账户优惠券提示: {
    exportPropOverrides: {
      hideExportMetaNumbers: true,
    },
  },
  "抽奖+消耗返3-3个券": {
    exportPropOverrides: {
      hideProgressGraphic: true,
    },
  },
  "消耗返样式4个券": {
    exportPropOverrides: {
      hideProgressGraphic: true,
    },
  },
  "横排按钮数据条": {
    exportPropOverrides: {
      hideNumbers: true,
    },
  },
  "提示": {
    exportPropOverrides: {
      contentText: "",
      text: "",
      description: "",
    },
  },
  "标题+抽奖次数": {
    exportPropOverrides: {
      drawCountText: "",
    },
  },
};

function getGuidedCutExportRule(node) {
  return guidedCutExportRules[node?.schemaId] || guidedCutExportRules[node?.name] || {
  };
}

function getCutExportProps(schemaId, props = {}) {
  const rule = getGuidedCutExportRule({ schemaId, name: schemaId });
  return {
    ...props,
    ...(rule.exportPropOverrides || {}),
  };
}

function getExportNodeTitle(node) {
  const schemaId = node?.schemaId || node?.name || "";
  return getGlobalComponentDisplayName(schemaId, node?.name || schemaId || "模块");
}

function getExportEntryNode(entry) {
  const node = cloneNodeForLineage(entry?.node || entry?.sourceNode || {});
  if (entry?.pageTheme?.id) applyThemeBoundVariantsToNodes([node], entry.pageTheme.id);
  return applyCutExportRulesToNode(node);
}

function isTaskBarStyle1ExportNode(node) {
  const schemaId = node?.schemaId || node?.name || "";
  return [
    "任务条-样式1",
    "任务条-样式1-点击后",
    "TaskModule",
  ].includes(schemaId);
}

function isStickyBottomButtonExportNode(node) {
  const schemaId = node?.schemaId || node?.name || "";
  return [
    "置底按钮",
    "StickyBottomButton",
  ].includes(schemaId);
}

function getGuidedCutExportBottomSpace(entry) {
  if (
    entry?.exportKind === "fallback-page" ||
    entry?.exportKind === "case-showcase-shell" ||
    entry?.exportKind === "case-showcase-card" ||
    entry?.exportKind === "lottery-popup" ||
    entry?.exportKind === "task-list-title" ||
    entry?.exportKind === "node-guide-title" ||
    entry?.exportKind === "node-guide-card"
  ) {
    return 0;
  }
  const node = entry?.node || entry?.sourceNode || {};
  if (node?.type === "atom" && isStickyBottomButtonExportNode(node)) return 0;
  return node?.type === "atom" && isTaskBarStyle1ExportNode(node)
    ? GUIDED_TASK_BAR_EXPORT_BOTTOM_SPACE
    : GUIDED_CUT_EXPORT_BOTTOM_SPACE;
}

function sanitizeExportFilename(value) {
  return String(value || "module")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 80);
}

function getExportFilenameSegments(value) {
  const omittedLabels = new Set([
    "默认维度",
    "维度1",
    "默认版本",
    "默认状态",
    "系统状态",
  ]);
  return String(value || "")
    .split(/\s*·\s*/)
    .map((item) => item.trim())
    .filter((item) => item && !omittedLabels.has(item.replace(/\s+/g, "")));
}

function makeGuidedExportFilename(moduleTitle, nodeIndex, dimensionTitle, variantTitle) {
  const segments = [
    ...getExportFilenameSegments(moduleTitle),
    ...getExportFilenameSegments(dimensionTitle),
    ...getExportFilenameSegments(variantTitle),
  ];
  const uniqueSegments = segments.filter(
    (segment, index) =>
      segments.findIndex(
        (candidate) =>
          normalizePageTemplateLookupName(candidate) ===
          normalizePageTemplateLookupName(segment),
      ) === index,
  );
  const sequence = String(nodeIndex + 1).padStart(2, "0");
  return `${sanitizeExportFilename(`${sequence}_${uniqueSegments.join("_") || "切图"}`)}.png`;
}

function getExportEntryDimensions(entry) {
  const bottomSpace = getGuidedCutExportBottomSpace(entry);
  if (entry?.dimensions) {
    return {
      width: Number(entry.dimensions.width || GUIDED_CUT_EXPORT_WIDTH),
      height: Number(entry.dimensions.height || 300) + bottomSpace,
    };
  }
  const node = entry?.node || entry?.sourceNode || {};
  const dimensions = getNodeEstimatedExportDimensions(node);
  return {
    ...dimensions,
    width: GUIDED_CUT_EXPORT_WIDTH,
    height: Number(dimensions.height || 300) + bottomSpace,
  };
}

function getMoleculeChildExportMargin(node, index, childCount) {
  if (index >= childCount - 1) return 0;
  const classNames = String(node?.className || "").split(/\s+/);
  if (classNames.includes("task-list-module")) return 16;
  if (classNames.includes("bigday-coupon-style1")) return [32, 24, 16][index] ?? 0;
  if (classNames.includes("bigday-coupon-style2")) return [24, 24][index] ?? 0;
  if (
    classNames.includes("consumption-return-style1-3col") ||
    classNames.includes("lottery-consumption-return-3col") ||
    classNames.includes("lottery-consumption-return-4col")
  ) {
    return [40, 32, 32, 40][index] ?? 0;
  }
  if (classNames.includes("lottery-unregistered-module")) return [24, 24, 24][index] ?? 0;
  if (classNames.includes("lottery-registered-module")) return [24, 24][index] ?? 0;
  if (classNames.includes("traffic-submission-module")) return [32, 32, 32][index] ?? 0;
  if (classNames.includes("traffic-submission-style3-module")) return [32, 32, 32][index] ?? 0;
  if (classNames.includes("content-diagnosis-clicked-module")) return [32, 24, 24][index] ?? 0;
  if (classNames.includes("content-diagnosis-quality-video-module")) return [32, 32][index] ?? 0;
  if (classNames.includes("user-education-case-style1-module")) return [32][index] ?? 0;
  if (classNames.includes("user-education-case-style2-module")) return [32, 32][index] ?? 0;
  if (classNames.includes("user-education-guide-module")) return [32, 32][index] ?? 0;
  if (classNames.includes("ai-smart-invest-module")) return [32, 32][index] ?? 0;
  if (classNames.includes("core-benefit-coupon-style2-module")) return [32, 32][index] ?? 0;
  if (classNames.includes("placement-lottery-module")) return [32, 16, 32][index] ?? 0;
  return 24;
}

function getNodeEstimatedExportDimensions(node) {
  if (node?.type === "molecule") {
    const children = node.children || [];
    const childDimensions = children.map(getNodeEstimatedExportDimensions);
    const classNames = String(node.className || "").split(/\s+/);
    const paddingY = classNames.includes("task-list-module") ? 0 : 96;
    if (classNames.includes("user-education-case-style1-module")) {
      return {
        width: 702,
        height: Math.max(
          120,
          paddingY +
            childDimensions.reduce(
              (sum, dimension, index) =>
                sum +
                Number(dimension.height || 0) +
                getMoleculeChildExportMargin(node, index, children.length),
              0,
            ),
        ),
      };
    }
    const width = Math.max(
      702,
      ...childDimensions.map((dimension) => Number(dimension.width || 0)),
    );
    const height = Math.max(
      120,
      paddingY +
        childDimensions.reduce(
          (sum, dimension, index) =>
            sum +
            Number(dimension.height || 0) +
            getMoleculeChildExportMargin(node, index, children.length),
          0,
        ),
    );
    return { width, height };
  }
  const schema = findAtomSchema(node.schemaId || node.name);
  return {
    width: Number(schema?.dimensions?.width || 750),
    height: Number(schema?.dimensions?.height || 300),
  };
}

function isTaskListExportNode(node) {
  return (
    node?.schemaId === "任务列表" ||
    node?.name === "任务列表" ||
    String(node?.className || "").split(/\s+/).includes("task-list-module")
  );
}

function isUserEducationCaseShowcaseExportNode(node) {
  return (
    node?.schemaId === "用户教育案例-样式1" ||
    node?.name === "用户教育案例-样式1" ||
    String(node?.className || "").split(/\s+/).includes("user-education-case-style1-module")
  );
}

function isNodeGuideExportNode(node) {
  return (
    node?.schemaId === "节点指南" ||
    node?.name === "节点指南" ||
    String(node?.className || "").split(/\s+/).includes("node-guide-module")
  );
}

function isLotteryPopupExportNode(node) {
  return (
    node?.isLotteryResultPopup ||
    node?.schemaId === "弹窗-中奖" ||
    node?.name === "弹窗-中奖"
  );
}

function createStatefulExportNode(node, stateEntry) {
  const exportNode = cloneNodeForLineage(node);
  if (stateEntry?.id) applyGuidedBusinessState(exportNode, stateEntry.id);
  return exportNode;
}

function applyCurrentGuidedThemeToNode(node) {
  const page = activePage();
  const theme = getGuidedPageTheme(page);
  if (node && theme?.id) applyThemeBoundVariantsToNodes([node], theme.id);
}

function getExportStateEntries(node) {
  const entries = getGuidedStateEntries(node);
  return entries.length ? entries : [{ id: "default", name: "默认状态", node }];
}

function makeGuidedCutExportEntry({
  page,
  node,
  nodeIndex,
  exportNode,
  dimensionTitle,
  variantTitle,
  idParts = [],
  fileParts = [],
  exportKind = "",
  dimensions,
}) {
  const moduleTitle = getExportNodeTitle(node);
  const moduleFolderTitle = `${String(nodeIndex + 1).padStart(2, "0")}_${moduleTitle}`;
  const fileName = makeGuidedExportFilename(
    moduleTitle,
    nodeIndex,
    dimensionTitle,
    variantTitle,
  );
  return {
    id: [page.id, node.id, ...idParts].map(sanitizeExportFilename).join("__"),
    pageId: page.id,
    pageName: page.name || `页面 ${state.pages.indexOf(page) + 1}`,
    pageTheme: getGuidedPageTheme(page),
    nodeId: node.id,
    moduleTitle,
    moduleFolderTitle,
    dimensionTitle,
    variantTitle,
    sourceNode: node,
    node: exportNode,
    exportKind,
    dimensions,
    fileName,
    filePath: [
      sanitizeExportFilename(page.name || page.id || "页面"),
      fileName,
    ].join("/"),
  };
}

function getGuidedNodeLineageExportVariants(node) {
  const { base, graph } = ensureGuidedLineageTree(node);
  return (graph.nodes || []).map((graphNode, variantIndex) => {
    const variant = findLineageVariant(node, graphNode.variantId) || base;
    return {
      graphNode,
      variant,
      variantIndex,
      dimensionTitle: getExportDimensionTitle(graph, graphNode),
      variantTitle: variant.title || `版本 ${variantIndex + 1}`,
    };
  });
}

function getTaskListGuidedCutExportEntries(page, node, nodeIndex) {
  return getGuidedNodeLineageExportVariants(node).flatMap(
    ({ graphNode, variant, dimensionTitle, variantTitle }) => {
      const titleNode = variant.node?.children?.[0];
      const titleEntry = titleNode ? makeGuidedCutExportEntry({
        page,
        node,
        nodeIndex,
        exportNode: cloneNodeForLineage(titleNode),
        dimensionTitle,
        variantTitle: `${variantTitle} · 模块标题`,
        idParts: [
          graphNode.dimensionId || "dimension",
          variant.id || "variant",
          "task-list-title",
        ],
        fileParts: [variantTitle],
        exportKind: "task-list-title",
        dimensions: {
          width: GUIDED_CUT_EXPORT_WIDTH,
          height: 50.09,
        },
      }) : null;
      const taskGroups = getGuidedChildStateGroups(variant.node);
      const taskEntries = taskGroups.flatMap((group, groupIndex) =>
        getExportStateEntries(group.child).map((stateEntry) => {
          const stateTitle = getGuidedInlineStateLabel(stateEntry);
          const exportNode = stateEntry?.node
            ? createStatefulExportNode(group.child, stateEntry)
            : cloneNodeForLineage(group.child);
          const taskTitle = group.label || `任务 ${groupIndex + 1}`;
          return makeGuidedCutExportEntry({
            page,
            node: {
              ...group.child,
              id: `${node.id}_${variant.id}_${group.child.id}`,
              name: `${getExportNodeTitle(node)} · ${taskTitle}`,
            },
            nodeIndex,
            exportNode,
            dimensionTitle,
            variantTitle: `${variantTitle} · ${taskTitle} · ${stateTitle}`,
            idParts: [
              graphNode.dimensionId || "dimension",
              variant.id || "variant",
              `task-${group.childIndex + 1}`,
              stateEntry.id || "default",
            ],
            fileParts: [taskTitle, variantTitle],
          });
        }),
      );
      return titleEntry ? [titleEntry, ...taskEntries] : taskEntries;
    },
  );
}

function getCaseShowcaseGuidedCutExportEntries(page, node, nodeIndex) {
  const cardSpecs = [
    { title: "随拍", offsetX: 0, contentWidth: 347, width: 389, height: 1026 },
    { title: "旅行", offsetX: 387, contentWidth: 347, width: 389, height: 1027 },
    { title: "科普", offsetX: 774, contentWidth: 347, width: 347, height: 1023 },
  ];

  return getGuidedNodeLineageExportVariants(node).flatMap(
    ({ graphNode, variant, dimensionTitle, variantTitle, variantIndex }) => {
      const moleculeNode = cloneNodeForLineage(variant.node);
      const titleNode = moleculeNode.children?.[0];
      const casesNode = moleculeNode.children?.[1];
      if (!titleNode || !casesNode) {
        return getStatefulGuidedCutExportEntries(page, node, nodeIndex);
      }

      const shellNode = {
        ...moleculeNode,
        children: [titleNode],
      };
      const shellHeight = getNodeEstimatedExportDimensions(moleculeNode).height;
      const shellEntry = makeGuidedCutExportEntry({
        page,
        node,
        nodeIndex,
        exportNode: shellNode,
        dimensionTitle,
        variantTitle: `${variantTitle} · 标题底板`,
        idParts: [
          graphNode.dimensionId || "dimension",
          variant.id || variantIndex,
          "case-showcase-shell",
        ],
        fileParts: [variantTitle],
        exportKind: "case-showcase-shell",
        dimensions: {
          width: GUIDED_CUT_EXPORT_WIDTH,
          height: shellHeight,
        },
      });

      const cardEntries = cardSpecs.map((card, cardIndex) => ({
        ...makeGuidedCutExportEntry({
          page,
          node,
          nodeIndex,
          exportNode: cloneNodeForLineage(casesNode),
          dimensionTitle,
          variantTitle: `${variantTitle} · ${card.title}`,
          idParts: [
            graphNode.dimensionId || "dimension",
            variant.id || variantIndex,
            `case-showcase-card-${cardIndex + 1}`,
          ],
          fileParts: [variantTitle],
          exportKind: "case-showcase-card",
          dimensions: {
            width: card.width,
            height: card.height,
          },
        }),
        caseCardIndex: cardIndex,
        caseCardOffsetX: card.offsetX,
        caseCardContentWidth: card.contentWidth,
      }));

      return [shellEntry, ...cardEntries];
    },
  );
}

function getNodeGuideGuidedCutExportEntries(page, node, nodeIndex) {
  const cardSpecs = [
    { prop: "card1IndustryTitle", title: "服装配饰行业", offsetX: 0, offsetY: 0 },
    { prop: "card2IndustryTitle", title: "文体娱乐行业", offsetX: 680, offsetY: 5.4 },
    { prop: "card3IndustryTitle", title: "餐饮服务行业", offsetX: 1356.5, offsetY: 0 },
    { prop: "card4IndustryTitle", title: "传媒资讯行业", offsetX: 2040, offsetY: 0 },
  ];

  return getGuidedNodeLineageExportVariants(node).flatMap(
    ({ graphNode, variant, dimensionTitle, variantTitle, variantIndex }) => {
      const moleculeNode = cloneNodeForLineage(variant.node);
      const titleNode = moleculeNode.children?.[0];
      const guideNode = moleculeNode.children?.[1];
      if (!titleNode || !guideNode) {
        return getStatefulGuidedCutExportEntries(page, node, nodeIndex);
      }

      const titleEntry = makeGuidedCutExportEntry({
        page,
        node,
        nodeIndex,
        exportNode: {
          ...moleculeNode,
          children: [titleNode],
        },
        dimensionTitle,
        variantTitle: `${variantTitle} · 模块标题`,
        idParts: [
          graphNode.dimensionId || "dimension",
          variant.id || variantIndex,
          "node-guide-title",
        ],
        fileParts: [variantTitle],
        exportKind: "node-guide-title",
        dimensions: {
          width: GUIDED_CUT_EXPORT_WIDTH,
          height: 50.09,
        },
      });

      const cardEntries = cardSpecs.map((card, cardIndex) => {
        const cardTitle = String(guideNode.props?.[card.prop] || card.title)
          .replace(/[「」]/g, "")
          .trim();
        return {
          ...makeGuidedCutExportEntry({
            page,
            node,
            nodeIndex,
            exportNode: cloneNodeForLineage(guideNode),
            dimensionTitle,
            variantTitle: `${variantTitle} · ${cardTitle}`,
            idParts: [
              graphNode.dimensionId || "dimension",
              variant.id || variantIndex,
              `node-guide-card-${cardIndex + 1}`,
            ],
            fileParts: [variantTitle],
            exportKind: "node-guide-card",
            dimensions: {
              width: 640,
              height: 637.81,
            },
          }),
          nodeGuideCardOffsetX: card.offsetX,
          nodeGuideCardOffsetY: card.offsetY,
        };
      });

      return [titleEntry, ...cardEntries];
    },
  );
}

function getLotteryPopupGuidedCutExportEntries(page, node, nodeIndex) {
  syncLotteryPopupCurrentPrizeCopy(node);
  const winProps = node.lotteryWinProps || node.props || {};
  const prizeCount = Math.max(1, Number(winProps.prizeCount || 1));
  const winnerEntries = Array.from({ length: prizeCount }, (_, arrayIndex) => {
    const prizeIndex = arrayIndex + 1;
    const parsedPrize = parsePrizeValue(winProps[`prize${prizeIndex}`]);
    const prizeName = String(
      winProps[`prize${prizeIndex}Text`] ||
      parsedPrize?.name ||
      `奖品${prizeIndex}`,
    ).trim();
    const splitPrize = splitLotteryPrizeText(prizeName);
    const exportNode = cloneNodeForLineage(node);
    setLotteryPopupNodeShape(exportNode, "弹窗-中奖", {
      ...winProps,
      selectedPrizeIndex: prizeIndex,
      amountText: splitPrize.amountText,
      prizeText: splitPrize.prizeText,
      prizeSubText:
        (Number(winProps.selectedPrizeIndex) === prizeIndex ? winProps.prizeSubText : "") ||
        winProps[`prize${prizeIndex}Copy`] ||
        parsedPrize?.copy ||
        "满30元赠价值5元流量",
    });
    exportNode.isLotteryResultPopup = true;
    exportNode.activeLotteryPopupResult = "win";
    exportNode.lotteryWinProps = { ...(exportNode.props || {}) };
    return makeGuidedCutExportEntry({
      page,
      node,
      nodeIndex,
      exportNode,
      dimensionTitle: "抽奖结果",
      variantTitle: `中奖${prizeIndex} · ${prizeName}`,
      idParts: ["popup-win", prizeIndex],
      fileParts: ["中奖"],
      exportKind: "lottery-popup",
      dimensions: getNodeEstimatedExportDimensions(exportNode),
    });
  });

  const loseNode = createAtomNode("弹窗-未中奖");
  loseNode.id = `${node.id}_lose`;
  applyThemeBoundVariantsToNodes([loseNode], getGuidedPageTheme(page).id);
  const loseEntry = makeGuidedCutExportEntry({
    page,
    node: loseNode,
    nodeIndex,
    exportNode: loseNode,
    dimensionTitle: "抽奖结果",
    variantTitle: "未中奖",
    idParts: ["popup-lose"],
    fileParts: ["未中奖"],
    exportKind: "lottery-popup",
    dimensions: getNodeEstimatedExportDimensions(loseNode),
  });

  return [...winnerEntries, loseEntry];
}

function getStatefulGuidedCutExportEntries(page, node, nodeIndex) {
  return getGuidedNodeLineageExportVariants(node).flatMap(
    ({ graphNode, variant, dimensionTitle, variantTitle, variantIndex }) => {
      const stateEntries = getExportStateEntries(variant.node);
      const hasExplicitState = getGuidedStateEntries(variant.node).length > 0;
      return stateEntries.map((stateEntry) => {
        const stateTitle = hasExplicitState ? getGuidedInlineStateLabel(stateEntry) : "";
        const exportNode = hasExplicitState
          ? createStatefulExportNode(variant.node, stateEntry)
          : cloneNodeForLineage(variant.node);
        return makeGuidedCutExportEntry({
          page,
          node,
          nodeIndex,
          exportNode,
          dimensionTitle,
          variantTitle: stateTitle ? `${variantTitle} · ${stateTitle}` : variantTitle,
          idParts: [
            graphNode.dimensionId || "dimension",
            variant.id || variantIndex,
            stateEntry.id || "default",
          ],
        });
      });
    },
  );
}

function downloadDataUrl(filename, dataUrl) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  downloadDataUrl(filename, url);
  window.setTimeout(() => URL.revokeObjectURL(url), 10000);
}

function findGuidedExportElement(entryId) {
  return [...document.querySelectorAll("[data-export-cut-id]")]
    .find((element) => element.dataset.exportCutId === entryId);
}

let guidedExportFontCssPromise = null;

function getGuidedExportFontCss(element) {
  if (!guidedExportFontCssPromise) {
    guidedExportFontCssPromise = getFontEmbedCSS(element).catch((error) => {
      guidedExportFontCssPromise = null;
      console.warn("[guided-export] font embedding skipped", error);
      return "";
    });
  }
  return guidedExportFontCssPromise;
}

async function exportElementToPngBlob(element, options = {}) {
  const width = Number(options.width || GUIDED_CUT_EXPORT_WIDTH);
  const height = Number(
    options.height || Math.ceil(element.scrollHeight || element.offsetHeight),
  );
  if (!width || !height) throw new Error("empty export component");

  const fontEmbedCSS = await getGuidedExportFontCss(element);
  const blob = await exportNodeToBlob(element, {
    width,
    height,
    pixelRatio: options.pixelRatio || 1,
    cacheBust: false,
    fontEmbedCSS,
    backgroundColor: "transparent",
    style: {
      width: `${width}px`,
      minHeight: `${height}px`,
      overflow: "visible",
      transform: "none",
      transformOrigin: "top left",
      "--react-component-scale": "1",
    },
  });
  if (!blob) throw new Error("failed to create png blob");
  return blob;
}

function getExportDimensionTitle(graph, graphNode) {
  const dimension = graph?.dimensions?.find((item) => item.id === graphNode?.dimensionId);
  const title = dimension?.title || "默认维度";
  return title === "维度 1" ? "默认维度" : title;
}

function getGuidedCutExportEntries() {
  return state.pages.flatMap((page) => {
    if (page.isSystemFallback) {
      const moduleTitle = "兜底页整页";
      const moduleFolderTitle = `01_${moduleTitle}`;
      const dimensionTitle = "系统状态";
      const variantTitle = page.name || "页面加载失败";
      const fileName = makeGuidedExportFilename(
        moduleTitle,
        0,
        dimensionTitle,
        variantTitle,
      );
      return [{
        id: [page.id, "fallback-page", "system", "default"]
          .map(sanitizeExportFilename)
          .join("__"),
        pageId: page.id,
        pageName: page.name || "兜底页面",
        pageTheme: getGuidedPageTheme(page),
        moduleTitle,
        moduleFolderTitle,
        dimensionTitle,
        variantTitle,
        exportKind: "fallback-page",
        fileName,
        dimensions: {
          width: 750,
          height: Number(page.fallbackPageHeight || 1334),
        },
        filePath: [
          sanitizeExportFilename(page.name || page.id || "兜底页面"),
          fileName,
        ].join("/"),
      }];
    }

    return (page.nodes || []).flatMap((node, nodeIndex) => {
      if (isLotteryPopupExportNode(node)) {
        return getLotteryPopupGuidedCutExportEntries(page, node, nodeIndex);
      }
      if (isTaskListExportNode(node)) {
        return getTaskListGuidedCutExportEntries(page, node, nodeIndex);
      }
      if (isUserEducationCaseShowcaseExportNode(node)) {
        return getCaseShowcaseGuidedCutExportEntries(page, node, nodeIndex);
      }
      if (isNodeGuideExportNode(node)) {
        return getNodeGuideGuidedCutExportEntries(page, node, nodeIndex);
      }
      return getStatefulGuidedCutExportEntries(page, node, nodeIndex);
    });
  });
}

function renderCaseShowcaseExportContent(entry) {
  const node = getExportEntryNode(entry);
  if (entry.exportKind === "case-showcase-shell") {
    return `
      <div
        class="guided-export-themed-content guided-export-case-showcase-shell"
        style="--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")};--case-showcase-shell-height:${Number(entry.dimensions?.height || 1205)}px;"
      >
        ${renderComponent(node, { editable: false })}
      </div>
    `;
  }
  return `
    <div
      class="guided-export-themed-content guided-export-case-showcase-card"
      data-case-card-index="${Number(entry.caseCardIndex || 0)}"
      style="width:${Number(entry.dimensions?.width || 347)}px;height:${Number(entry.dimensions?.height || 1027)}px;--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")};"
    >
      <div
        class="guided-export-case-showcase-content"
        style="width:${Number(entry.caseCardContentWidth || entry.dimensions?.width || 347)}px;height:${Number(entry.dimensions?.height || 1027)}px;"
      >
        <div
          class="guided-export-case-showcase-track"
          style="transform:translateX(-${Number(entry.caseCardOffsetX || 0)}px);"
        >
          ${renderComponent(node, { editable: false })}
        </div>
      </div>
    </div>
  `;
}

function renderNodeGuideExportContent(entry) {
  const node = getExportEntryNode(entry);
  if (entry.exportKind === "node-guide-title") {
    return `
      <div
        class="guided-export-themed-content guided-export-node-guide-title"
        style="--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")};"
      >
        ${renderComponent(node, { editable: false })}
      </div>
    `;
  }
  return `
    <div
      class="guided-export-themed-content guided-export-node-guide-card"
      style="width:${Number(entry.dimensions?.width || 640)}px;height:${Number(entry.dimensions?.height || 637.81)}px;--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")};"
    >
      <div
        class="guided-export-node-guide-track"
        style="transform:translate(${-Number(entry.nodeGuideCardOffsetX || 0)}px, -${Number(entry.nodeGuideCardOffsetY || 0)}px);"
      >
        ${renderComponent(node, { editable: false })}
      </div>
    </div>
  `;
}

function renderGuidedExportPreview(entry) {
  const { width, height } = getExportEntryDimensions(entry);
  const bottomSpace = getGuidedCutExportBottomSpace(entry);
  const previewScale = width > 720 ? 0.44 : 0.46;
  const previewWidth = Math.ceil(width * previewScale);
  const previewHeight = Math.ceil(height * previewScale);
  const content = entry.exportKind === "fallback-page"
    ? renderGuidedFallbackExportPage(entry)
    : entry.exportKind === "case-showcase-shell" || entry.exportKind === "case-showcase-card"
      ? renderCaseShowcaseExportContent(entry)
      : entry.exportKind === "node-guide-title" || entry.exportKind === "node-guide-card"
        ? renderNodeGuideExportContent(entry)
      : `
      <div
        class="guided-export-themed-content"
        style="--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")}"
      >
        ${renderComponent(getExportEntryNode(entry), { editable: false })}
      </div>
    `;
  return `
    <div
      class="guided-export-cut-frame"
      style="width:${previewWidth}px;height:${previewHeight}px;"
    >
      <div
        class="guided-export-cut-preview"
        data-export-cut-id="${escapeAttr(entry.id)}"
        style="width:${width}px;height:${height}px;padding-bottom:${bottomSpace}px;box-sizing:border-box;--export-preview-scale:${previewScale};"
      >
        ${content}
      </div>
    </div>
  `;
}

function renderGuidedExportCard(entry) {
  const { width } = getExportEntryDimensions(entry);
  const previewScale = width > 720 ? 0.44 : 0.46;
  const cardWidth = Math.ceil(width * previewScale);
  return `
    <article class="guided-export-card" style="width:${cardWidth}px;">
      <header>
        <div>
          <span>版本</span>
          <strong>${escapeHtml(entry.variantTitle)}</strong>
        </div>
        <button data-guided-export-single="${escapeAttr(entry.id)}">下载 PNG</button>
      </header>
      ${renderGuidedExportPreview(entry)}
    </article>
  `;
}

function renderGuidedExportDimensionGroup(dimensionTitle, entries) {
  return `
    <section class="guided-export-dimension">
      <header>
        <strong>${escapeHtml(dimensionTitle)}</strong>
        <span>${entries.length} 个版本</span>
      </header>
      <div class="guided-export-card-grid">
        ${entries.map(renderGuidedExportCard).join("")}
      </div>
    </section>
  `;
}

function renderGuidedExportModuleGroup(moduleTitle, entries) {
  const dimensionGroups = new Map();
  entries.forEach((entry) => {
    if (!dimensionGroups.has(entry.dimensionTitle)) {
      dimensionGroups.set(entry.dimensionTitle, []);
    }
    dimensionGroups.get(entry.dimensionTitle).push(entry);
  });
  return `
    <section class="guided-export-module">
      <header>
        <div>
          <span>模块</span>
          <strong>${escapeHtml(moduleTitle)}</strong>
        </div>
        <em>${entries.length} 张</em>
      </header>
      <div class="guided-export-dimension-list">
        ${[...dimensionGroups.entries()]
          .map(([dimensionTitle, dimensionEntries]) =>
            renderGuidedExportDimensionGroup(dimensionTitle, dimensionEntries),
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderGuidedExportPageGroup(page, entries) {
  const moduleGroups = new Map();
  entries.forEach((entry) => {
    if (!moduleGroups.has(entry.moduleTitle)) {
      moduleGroups.set(entry.moduleTitle, []);
    }
    moduleGroups.get(entry.moduleTitle).push(entry);
  });
  return `
    <section class="guided-export-page-group">
      <header class="guided-export-page-head">
        <div>
          <span>${escapeHtml(page.dimension || "未分组")}</span>
          <strong>${escapeHtml(page.name || "活动页面")}</strong>
        </div>
        <em>${entries.length} 张切图</em>
      </header>
      <div class="guided-export-module-list">
        ${[...moduleGroups.entries()]
          .map(([moduleTitle, moduleEntries]) =>
            renderGuidedExportModuleGroup(moduleTitle, moduleEntries),
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderGuidedExportPage() {
  const center = $(".activity-center");
  if (!center) return;
  const entries = getGuidedCutExportEntries();
  const pageGroups = state.pages
    .map((page) => ({
      page,
      entries: entries.filter((entry) => entry.pageId === page.id),
    }))
    .filter((group) => group.entries.length);
  center.innerHTML = `
    <section class="guided-export-page">
      <header class="guided-export-topbar">
        <div class="guided-export-topbar-inner">
          <button class="guided-export-back" data-guided-back-preview aria-label="返回预览">
            <span>←</span>
            返回预览
          </button>
          <div class="guided-export-title">
            <span>导出切图</span>
            <strong>${escapeHtml(state.activity?.name || demoPrdBlueprint.activityName || "活动")}</strong>
            <em>${pageGroups.length} 个页面 · ${entries.length} 张切图</em>
          </div>
          <button class="guided-export-batch" data-guided-export-batch ${entries.length ? "" : "disabled"}>
            批量下载 ZIP
          </button>
        </div>
      </header>
      <main class="guided-export-content">
        ${
          entries.length
            ? pageGroups
                .map(({ page, entries: pageEntries }) =>
                  renderGuidedExportPageGroup(page, pageEntries),
                )
                .join("")
            : `<div class="guided-export-empty">当前没有可导出的切图。</div>`
        }
      </main>
    </section>
  `;
  window.renderReactMaterials?.();
}

function getExportEntryById(entryId) {
  return getGuidedCutExportEntries().find((entry) => entry.id === entryId);
}

async function waitForExportPreviewReady() {
  await waitForNextFrame();
  await waitForNextFrame();
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch (error) {
      console.warn("[guided-export] font readiness skipped", error);
    }
  }
}

async function captureGuidedExportEntry(entry, options = {}) {
  const element = findGuidedExportElement(entry.id);
  if (!element) throw new Error("找不到导出组件");
  const fixedDimensions =
    entry.exportKind === "case-showcase-shell" ||
    entry.exportKind === "case-showcase-card" ||
    entry.exportKind === "lottery-popup" ||
    entry.exportKind === "task-list-title" ||
    entry.exportKind === "node-guide-title" ||
    entry.exportKind === "node-guide-card"
      ? getExportEntryDimensions(entry)
      : {};
  return exportElementToPngBlob(element, { ...options, ...fixedDimensions });
}

async function downloadGuidedExportEntry(entryId) {
  const entry = getExportEntryById(entryId);
  if (!entry) return;
  await waitForExportPreviewReady();
  try {
    const blob = await captureGuidedExportEntry(entry);
    downloadBlob(entry.fileName || `${sanitizeExportFilename(entry.variantTitle)}.png`, blob);
  } catch (error) {
    console.error("[guided-export] single export failed", entry, error);
    window.alert(`单张导出失败：${error?.message || "未知错误"}`);
  }
}

function makeCrc32Table() {
  return Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    return value >>> 0;
  });
}

const crc32Table = makeCrc32Table();

function crc32(bytes) {
  let crc = 0xffffffff;
  bytes.forEach((byte) => {
    crc = crc32Table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  });
  return (crc ^ 0xffffffff) >>> 0;
}

function uint16(value) {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
}

function uint32(value) {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value >>> 0, true);
  return bytes;
}

async function blobToBytes(blob) {
  return new Uint8Array(await blob.arrayBuffer());
}

function createZipBlob(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.path);
    const data = file.bytes;
    const crc = crc32(data);
    const localHeader = [
      uint32(0x04034b50),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(crc),
      uint32(data.length),
      uint32(data.length),
      uint16(nameBytes.length),
      uint16(0),
      nameBytes,
    ];
    const localSize = localHeader.reduce((sum, part) => sum + part.length, 0) + data.length;
    localParts.push(...localHeader, data);
    centralParts.push(
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0x0800),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(crc),
      uint32(data.length),
      uint32(data.length),
      uint16(nameBytes.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      nameBytes,
    );
    offset += localSize;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const endRecord = [
    uint32(0x06054b50),
    uint16(0),
    uint16(0),
    uint16(files.length),
    uint16(files.length),
    uint32(centralSize),
    uint32(offset),
    uint16(0),
  ];
  return new Blob([...localParts, ...centralParts, ...endRecord], { type: "application/zip" });
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await worker(items[currentIndex], currentIndex);
    }
  });
  await Promise.all(workers);
  return results;
}

async function downloadGuidedExportBatch() {
  const entries = getGuidedCutExportEntries();
  if (!entries.length) return;
  await waitForExportPreviewReady();
  const button = document.querySelector("[data-guided-export-batch]");
  button?.setAttribute("disabled", "true");
  if (button) button.textContent = `正在生成 0/${entries.length}`;
  try {
    const files = [];
    const failed = [];
    let completed = 0;
    await mapLimit(entries, 2, async (entry) => {
      try {
        const blob = await captureGuidedExportEntry(entry);
        const file = {
          path: entry.filePath,
          bytes: await blobToBytes(blob),
        };
        files.push(file);
      } catch (error) {
        console.error("[guided-export] batch item failed", entry, error);
        failed.push({ entry, error });
      } finally {
        completed += 1;
        if (button) button.textContent = `正在生成 ${completed}/${entries.length}`;
      }
    });
    if (!files.length) {
      const reason = failed[0]?.error?.message || "没有成功生成的切图";
      window.alert(`批量导出失败：${reason}`);
      return;
    }
    files.sort((a, b) => a.path.localeCompare(b.path, "zh-Hans-CN"));
    if (button) button.textContent = "正在打包 ZIP";
    const zipBlob = createZipBlob(files);
    downloadBlob(`${sanitizeExportFilename(state.activity?.name || "活动切图")}.zip`, zipBlob);
    if (failed.length) {
      window.alert(`已导出 ${files.length} 张，${failed.length} 张失败。`);
    }
  } catch (error) {
    console.error("[guided-export] batch export failed", error);
    window.alert(`批量导出失败：${error?.message || "未知错误"}`);
  } finally {
    button?.removeAttribute("disabled");
    if (button) button.textContent = "批量下载 ZIP";
  }
}

function showCode(title, code) {
  $(".code-head strong").textContent = title;
  $(".code-box pre").textContent = code;
  $(".code-modal").classList.add("open");
}

function render() {
  document.body.dataset.view = state.view;
  const appShell = $(".app-shell");
  if (appShell) appShell.dataset.view = state.view;

  if (state.view === "prd-demo") {
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    renderPrdDemoFlow();
    window.renderReactMaterials?.();
    return;
  }

  if (state.view === "guided-preview") {
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    renderGuidedPreview();
    return;
  }

  if (state.view === "guided-export") {
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    renderGuidedExportPage();
    return;
  }

  if (state.view === "animation-preview-library") {
    renderAnimationPreviewLibrary();
    window.renderReactMaterials?.();
    return;
  }

  if (state.view === "admin-component-verifier") {
    renderAdminComponentVerifier();
    $(".code-modal")?.classList.remove("open");
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    return;
  }

  if (state.view === "admin") {
    renderAdminDashboard();
    $(".code-modal")?.classList.remove("open");
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    return;
  }

  renderActivityCenter();
  if (state.view !== "workbench") {
    $(".code-modal")?.classList.remove("open");
    $(".quick-toolbar")?.classList.remove("open");
    $(".variant-inspector")?.classList.remove("open");
    $(".richtext-editor")?.classList.remove("open");
    return;
  }

  document.querySelectorAll("[data-library]").forEach((button) => {
    button.classList.toggle("active", button.dataset.library === state.activeLibrary);
  });

  document.querySelectorAll("[data-panel-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.panelTab === state.activePanelTab);
  });
  const materialsPanel = document.querySelector('[data-panel-content="materials"]');
  const structurePanel = document.querySelector('[data-panel-content="structure"]');
  if (materialsPanel) materialsPanel.style.display = state.activePanelTab === "materials" ? "" : "none";
  if (structurePanel) structurePanel.style.display = state.activePanelTab === "structure" ? "" : "none";
  const materialTabs = $(".tabs");
  if (materialTabs) materialTabs.classList.toggle("hidden", state.activeLibrary !== "materials");
  const panelTitle = $(".library-panel .panel-title");
  if (panelTitle) panelTitle.textContent = state.activeLibrary === "materials" ? "物料库" : "模板库";
  const panelSubtitle = $(".library-panel .panel-subtitle");
  if (panelSubtitle) {
    panelSubtitle.textContent =
      state.activeLibrary === "materials" ? "拖拽物料到画布。" : "点击模板新增页面。";
  }
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === state.activeTab);
  });
  renderStructureTree();
  renderMaterialList();
  syncPreviewComponentFrames();
  document.fonts?.ready.then(syncPreviewComponentFrames);
  renderCanvas();
  renderContextControls();
  renderPageSaveFloat();
  $(".canvas-toolbar .meta").textContent = `${activePage().name} · ${state.pages.length} 页 · ${state.nodes.length} 个组件 · ${Math.round(state.canvasZoom * 100)}%`;
  renderCanvasColorControl();
  updateCanvasZoom();
  window.renderReactMaterials?.();
  renderPageTemplateModalContainer();
}

function renderPageTemplateModalContainer() {
  const container = $(".page-template-modal-container");
  if (!container) return;
  container.innerHTML = state.pageTemplateModalOpen ? renderPageTemplateModal() : "";
}

function fitAllPagesToView() {
  const stage = getActiveCanvasStage();
  const world = getActiveCanvasWorld();
  if (!stage || !world) return;

  const groups = groupPagesByDimension();
  if (groups.length === 0) return;

  const contentWidth = Math.max(world.scrollWidth, world.offsetWidth, 750);
  const contentHeight = Math.max(world.scrollHeight, world.offsetHeight, 1334);

  const stageRect = stage.getBoundingClientRect();
  const stageWidth = stageRect.width;
  const stageHeight = stageRect.height;

  const margin = 40;
  const availableWidth = stageWidth - margin * 2;
  const availableHeight = stageHeight - margin * 2;

  const zoomX = availableWidth / contentWidth;
  const zoomY = availableHeight / contentHeight;
  const zoom = Math.min(zoomX, zoomY, 1);

  state.canvasZoom = clamp(zoom, 0.1, 2);
  state.canvasPanX = (stageWidth - contentWidth * state.canvasZoom) / 2;
  state.canvasPanY = (stageHeight - contentHeight * state.canvasZoom) / 2;

  updateCanvasZoom();
}

function waitForNextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function waitForGuidedPageAssets(pageShell, timeout = 1500) {
  const images = [...(pageShell?.querySelectorAll("img") || [])];
  const imageTasks = images.map((image) => {
    if (image.complete) {
      return typeof image.decode === "function"
        ? image.decode().catch(() => {})
        : Promise.resolve();
    }
    return new Promise((resolve) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", resolve, { once: true });
    });
  });
  const fontTask = document.fonts?.ready || Promise.resolve();
  const timeoutTask = new Promise((resolve) => window.setTimeout(resolve, timeout));
  return Promise.race([
    Promise.allSettled([fontTask, ...imageTasks]),
    timeoutTask,
  ]);
}

function measureGuidedPage(pageShell = $(".guided-page-shell")) {
  const pageContent = pageShell?.querySelector(".page");
  const pagePhone = pageShell?.querySelector(".guided-phone");
  const pageTree = pageShell?.closest(".guided-page-tree");
  const lastNode = pageContent?.querySelector(".guided-node:last-of-type");
  const contentBottom = lastNode
    ? lastNode.offsetTop + lastNode.offsetHeight + 32
    : 0;
  const width = Math.max(
    pageTree?.scrollWidth || 0,
    pageTree?.offsetWidth || 0,
    pageShell?.offsetWidth || 0,
    pageContent?.scrollWidth || 0,
    pagePhone?.scrollWidth || 0,
    750,
  );
  const height = Math.max(
    pageTree?.scrollHeight || 0,
    pageTree?.offsetHeight || 0,
    pageContent?.scrollHeight || 0,
    pageContent?.offsetHeight || 0,
    pagePhone?.scrollHeight || 0,
    contentBottom,
    1334,
  );
  return { width, height };
}

async function initializeGuidedCanvasView() {
  const token = ++guidedCanvasFitToken;
  const pageShell = $(".guided-page-shell");
  await waitForGuidedPageAssets(pageShell);

  let previousSignature = "";
  let stableFrames = 0;
  const deadline = performance.now() + 900;
  while (stableFrames < 3 && performance.now() < deadline) {
    await waitForNextFrame();
    if (
      token !== guidedCanvasFitToken ||
      state.view !== "guided-preview" ||
      state.guidedCanvasInitialized
    ) {
      return;
    }
    const measurement = measureGuidedPage(pageShell);
    const signature = `${Math.round(measurement.width)}x${Math.round(measurement.height)}`;
    stableFrames = signature === previousSignature ? stableFrames + 1 : 0;
    previousSignature = signature;
  }

  if (token !== guidedCanvasFitToken || state.view !== "guided-preview") return;
  state.guidedCanvasInitialized = true;
  invalidateStageRect();
  fitGuidedPageToView();
}

function fitGuidedPageToView() {
  const stage = $(".guided-device-stage");
  if (!stage) return;

  if (!state.guidedVisiblePageIds.length) {
    state.canvasZoom = 1;
    state.canvasPanX = 80;
    state.canvasPanY = 100;
    invalidateStageRect();
    updateCanvasZoom();
    return;
  }

  const pageMeasurement = measureGuidedPage();
  const pageWidth = pageMeasurement.width;
  const pageHeight = pageMeasurement.height;
  const horizontalInset = 40;
  const verticalInset = 32;
  const availableWidth = Math.max(320, stage.clientWidth - horizontalInset * 2);
  const availableHeight = Math.max(320, stage.clientHeight - verticalInset * 2);
  const zoom = Math.min(
    availableWidth / pageWidth,
    availableHeight / pageHeight,
    0.8,
  );

  state.canvasZoom = clamp(zoom, 0.12, 0.8);
  state.canvasPanX =
    horizontalInset + (availableWidth - pageWidth * state.canvasZoom) / 2;
  state.canvasPanY =
    verticalInset + (availableHeight - pageHeight * state.canvasZoom) / 2;
  invalidateStageRect();
  updateCanvasZoom();
}

function getActiveCanvasStage() {
  return state.view === "guided-preview"
    ? $(".guided-device-stage")
    : $(".workspace .device-stage");
}

function getActiveCanvasWorld() {
  return state.view === "guided-preview"
    ? $(".guided-canvas-world")
    : $(".workspace .canvas-world");
}

function updateCanvasZoom() {
  const world = getActiveCanvasWorld();
  if (world) {
    world.style.transform = `translate3d(${state.canvasPanX}px, ${state.canvasPanY}px, 0) scale(${state.canvasZoom})`;
    world.style.setProperty(
      "--guided-action-scale",
      String(clamp(1 / Math.max(state.canvasZoom, 0.01), 0.75, 1.6)),
    );
    world.style.setProperty(
      "--guided-title-scale",
      String(getGuidedTitleScale()),
    );
    if (state.view === "guided-preview" && state.guidedCanvasInitialized) {
      world.classList.remove("is-initializing");
    }
    if (!window.__isZooming) {
      world.classList.remove("is-zooming");
    } else {
      world.classList.add("is-zooming");
    }
  }
  if (!window.__isZooming) {
    const meta = $(".canvas-toolbar .meta");
    if (meta) meta.textContent = `${activePage().name} · ${state.pages.length} 页 · ${state.nodes.length} 个组件 · ${Math.round(state.canvasZoom * 100)}%`;
    positionContextControls();
  }
}

let cachedStageRect = null;
let stageRectTimer = null;

function getStageRect() {
  if (!cachedStageRect) {
    const stage = getActiveCanvasStage();
    if (stage) cachedStageRect = stage.getBoundingClientRect();
  }
  return cachedStageRect;
}

function invalidateStageRect() {
  cachedStageRect = null;
}

function zoomCanvas(event) {
  const rect = getStageRect();
  if (!rect) return;
  const oldZoom = state.canvasZoom;
  const nextZoom = clamp(oldZoom * Math.exp(-event.deltaY * 0.004), 0.1, 2);
  if (Math.abs(nextZoom - oldZoom) < 0.001) return;

  const anchorX = event.clientX - rect.left;
  const anchorY = event.clientY - rect.top;
  const contentX = (anchorX - state.canvasPanX) / oldZoom;
  const contentY = (anchorY - state.canvasPanY) / oldZoom;

  state.canvasZoom = nextZoom;
  state.canvasPanX = anchorX - contentX * nextZoom;
  state.canvasPanY = anchorY - contentY * nextZoom;
  updateCanvasZoom();
}

function renderCanvasColorControl() {
  const control = $(".canvas-color-control");
  if (!control) return;
  control.innerHTML = `
    <button class="canvas-color-button" data-toggle-canvas-colors aria-label="画布颜色">
      <span class="color-dot" style="background:${state.canvasBackground}"></span>
      <input class="native-color-input" type="color" data-canvas-color-picker value="${state.canvasBackground}" />
      <span>画布颜色</span>
    </button>
    <div class="canvas-color-popover ${state.canvasColorPanelOpen ? "open" : ""}">
      ${canvasColorChoices
        .map((color) => `<button class="color-swatch" data-apply-canvas-color="${color}" style="background:${color}" aria-label="${color}"></button>`)
        .join("")}
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function bindEvents() {
  document.addEventListener(
    "click",
    (event) => {
      if (
        state.view !== "guided-preview" ||
        event.target.closest("[data-guided-action], [data-guided-order]")
      ) {
        return;
      }
      const guidedNode = event.target.closest(".guided-node[data-select]");
      if (!guidedNode) return;
      const pageId = guidedNode.closest("[data-page-id]")?.dataset.pageId;
      if (pageId && pageId !== state.activePageId) setActivePage(pageId);
      updateGuidedNodeSelection(guidedNode.dataset.select);
      closeGuidedPanelWithTransition();
    },
    true,
  );

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-placement-case-scrollbar]")) return;

    if (event.target.closest("[data-demo-open-file-modal]")) {
      state.prdTextError = "";
      state.prdBlueprintPasteError = "";
      if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
        state.selectedDemoPackageId = demoActivityPackage.id;
      }
      state.prdFileModalOpen = true;
      render();
      return;
    }

    if (event.target.closest("[data-prd-blueprint-table-submit]")) {
      const modal = event.target.closest("[data-demo-file-modal]");
      const pastedVersions = normalizePrdBlueprintPasteVersions(
        getPrdBlueprintPasteVersionsFromModal(modal),
        0,
      );
      const pastedRows = getPrdBlueprintPasteRowsFromModal(modal);
      const filledRows = getFilledPrdBlueprintPasteRows(pastedRows);
      if (!filledRows.length) {
        state.prdBlueprintPasteVersions = pastedVersions;
        state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(pastedRows, 12, pastedVersions.length);
        state.prdBlueprintPasteError = "请先粘贴蓝图表格";
        render();
        requestAnimationFrame(() => {
          document.querySelector("[data-prd-blueprint-cell]")?.focus();
        });
        return;
      }
      const { rows, manualVersions } = convertBlueprintPasteRowsToPrdRows(filledRows, pastedVersions);
      state.prdBlueprintPasteVersions = pastedVersions;
      state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(filledRows, 12, pastedVersions.length);
      state.prdManualModuleVersions = manualVersions;
      state.prdTableRows = rows;
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      state.selectedDemoPackageId = PRD_TABLE_PACKAGE_ID;
      state.prdBlueprintPasteError = "";
      state.prdTextError = "";
      startPrdParsing();
      return;
    }

    if (event.target.closest("[data-prd-text-submit]")) {
      const textInput = event.target
        .closest("[data-demo-file-modal]")
        ?.querySelector("[data-prd-text-input]");
      state.prdTextInput = textInput?.value || state.prdTextInput;
      const rows = parsePrdPlainTextRows(state.prdTextInput);
      if (!state.prdTextInput.trim() || !rows.length) {
        state.prdTextError = "请先粘贴 PRD 文本";
        render();
        requestAnimationFrame(() => {
          document.querySelector("[data-prd-text-input]")?.focus();
        });
        return;
      }
      state.prdTableRows = normalizePrdTableRows(rows);
      state.prdManualModuleVersions = {};
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      state.selectedDemoPackageId = PRD_TABLE_PACKAGE_ID;
      state.prdTextError = "";
      startPrdParsing();
      return;
    }

    if (event.target.closest("[data-prd-feishu-submit]")) {
      const urlInput = event.target
        .closest("[data-demo-file-modal]")
        ?.querySelector("[data-prd-feishu-input]");
      const url = urlInput?.value || state.prdFeishuUrl || "";
      state.prdFeishuUrl = url;
      if (!url.trim()) {
        state.prdFeishuError = "请输入飞书文档链接";
        render();
        requestAnimationFrame(() => {
          document.querySelector("[data-prd-feishu-input]")?.focus();
        });
        return;
      }
      state.prdFeishuError = "正在获取文档内容...";
      render();
      fetch("/api/fetch-feishu-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
        .then(async (res) => {
          const text = await res.text();
          let json;
          try {
            json = text ? JSON.parse(text) : null;
          } catch {
            throw new Error(`接口返回不是有效 JSON（HTTP ${res.status}）`);
          }
          if (!res.ok) {
            throw new Error(json?.error || `接口请求失败（HTTP ${res.status}）`);
          }
          return json;
        })
        .then((json) => {
          if (
            json.success &&
            json.data &&
            (json.data.content || json.data.tables?.length)
          ) {
            state.prdTextInput = json.data.content || "";
            const documentTables = Array.isArray(json.data.tables)
              ? json.data.tables
              : [];
            if (documentTables.length) {
              const templateName =
                detectPrdDocumentTemplateName(json.data.content) ||
                state.prdBlueprintPasteTemplateName;
              const adapted = adaptPrdDocumentClipboardTables(
                documentTables,
                templateName,
                [],
                false,
              );
              if (!adapted || adapted.error) {
                state.prdFeishuError =
                  adapted?.error ||
                  "未识别到固定格式表格，请确认文档标题和表格结构完整";
                render();
                return;
              }
              const templateRows = createPrdBlueprintPasteTemplateRows(
                adapted.templateName,
                adapted.versions,
              );
              const mergedRows = mergeAdaptedPrdDocumentRows(
                templateRows,
                adapted,
              );
              const filledRows = getFilledPrdBlueprintPasteRows(mergedRows);
              const { rows, manualVersions } =
                convertBlueprintPasteRowsToPrdRows(
                  filledRows,
                  adapted.versions,
                );
              state.prdBlueprintPasteTemplateName = adapted.templateName;
              state.prdBlueprintPasteVersions = adapted.versions;
              state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(
                mergedRows,
                0,
                adapted.versions.length,
              );
              state.prdTableRows = rows;
              state.prdManualModuleVersions = manualVersions;
              if (adapted.guideStateId) {
                state.pageTemplateBlueprintStates[
                  "page-guide-no-incentive|1"
                ] = adapted.guideStateId;
              }
              state.prdTableBlueprint = null;
              state.prdTableBlueprintSignature = "";
              state.selectedDemoPackageId = PRD_TABLE_PACKAGE_ID;
              state.prdFeishuError = "";
              state.prdFileModalOpen = false;
              startPrdParsing();
              return;
            }
            const rows = parsePrdPlainTextRows(state.prdTextInput);
            if (!rows.length) {
              state.prdFeishuError =
                "未读取到可解析的飞书表格，请检查文档结构";
              render();
              return;
            }
            state.prdTableRows = normalizePrdTableRows(rows);
            state.prdManualModuleVersions = {};
            state.prdTableBlueprint = null;
            state.prdTableBlueprintSignature = "";
            state.selectedDemoPackageId = PRD_TABLE_PACKAGE_ID;
            state.prdFeishuError = "";
            state.prdFileModalOpen = false;
            startPrdParsing();
          } else {
            state.prdFeishuError = json.error || "获取文档失败";
            render();
          }
        })
        .catch((e) => {
          state.prdFeishuError = e.message || "获取文档失败";
          render();
        });
      return;
    }

    if (
      event.target.closest("[data-demo-close-file-modal]") ||
      event.target.matches("[data-demo-file-modal]")
    ) {
      state.prdFileModalOpen = false;
      render();
      return;
    }

    if (event.target.closest("[data-demo-parse-prd]")) {
      startPrdParsing();
      return;
    }

    const taskCountControl = event.target.closest("[data-prd-task-count-delta]");
    if (taskCountControl) {
      const rowIndexes = String(taskCountControl.dataset.prdTaskCountRows || "")
        .split(",")
        .map(Number)
        .filter(Number.isInteger);
      const currentRow = state.prdTableRows[rowIndexes[0]];
      const nextCount = Math.max(
        1,
        Math.round(Number(currentRow?.value || 3)) +
          Number(taskCountControl.dataset.prdTaskCountDelta || 0),
      );
      rowIndexes.forEach((rowIndex) => {
        if (state.prdTableRows[rowIndex]) {
          state.prdTableRows[rowIndex].value = String(nextCount);
        }
      });
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      render();
      return;
    }

    const paragraphCountControl = event.target.closest("[data-prd-paragraph-count-delta]");
    if (paragraphCountControl) {
      const rowIndexes = String(paragraphCountControl.dataset.prdParagraphCountRows || "")
        .split(",")
        .map(Number)
        .filter(Number.isInteger);
      const currentRow = state.prdTableRows[rowIndexes[0]];
      const nextCount = clamp(
        Number(currentRow?.value || 4) +
          Number(paragraphCountControl.dataset.prdParagraphCountDelta || 0),
        1,
        4,
      );
      rowIndexes.forEach((rowIndex) => {
        if (state.prdTableRows[rowIndex]) {
          state.prdTableRows[rowIndex].value = String(nextCount);
        }
      });
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      render();
      return;
    }

    const prizeAddControl = event.target.closest("[data-prd-prize-add]");
    if (prizeAddControl) {
      let versionNames = [];
      try {
        versionNames = JSON.parse(prizeAddControl.dataset.prdPrizeVersionNames || "[]");
      } catch {
        versionNames = [];
      }
      addPageTemplateBlueprintPrize(
        Number(prizeAddControl.dataset.prdPrizeModuleIndex),
        Number(prizeAddControl.dataset.prdPrizeChildIndex),
        Array.isArray(versionNames) ? versionNames : [],
      );
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      render();
      return;
    }

    const prizeDeleteControl = event.target.closest("[data-prd-prize-delete]");
    if (prizeDeleteControl) {
      let versionNames = [];
      try {
        versionNames = JSON.parse(prizeDeleteControl.dataset.prdPrizeVersionNames || "[]");
      } catch {
        versionNames = [];
      }
      deletePageTemplateBlueprintPrize(
        Number(prizeDeleteControl.dataset.prdPrizeModuleIndex),
        Number(prizeDeleteControl.dataset.prdPrizeChildIndex),
        Number(prizeDeleteControl.dataset.prdPrizeIndex),
        Array.isArray(versionNames) ? versionNames : [],
      );
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      render();
      return;
    }

    const taskNewTagToggle = event.target.closest("[data-prd-task-new-tag-rows]");
    if (taskNewTagToggle) {
      const nextChecked = taskNewTagToggle.getAttribute("aria-pressed") !== "true";
      String(taskNewTagToggle.dataset.prdTaskNewTagRows || "")
        .split(",")
        .map(Number)
        .filter(Number.isInteger)
        .forEach((rowIndex) => {
          if (state.prdTableRows[rowIndex]) {
            state.prdTableRows[rowIndex].value = nextChecked ? "true" : "";
          }
        });
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      render();
      return;
    }

    const addModuleVersion = event.target.closest("[data-prd-add-module-version]");
    if (addModuleVersion) {
      addManualModuleBlueprintVersion(addModuleVersion.dataset.prdAddModuleVersion);
      render();
      return;
    }

    const deleteModuleVersion = event.target.closest("[data-prd-delete-module-version]");
    if (deleteModuleVersion) {
      const moduleKey = deleteModuleVersion.dataset.prdVersionModuleKey;
      const versionId = deleteModuleVersion.dataset.prdDeleteModuleVersion;
      if (deleteManualModuleBlueprintVersion(moduleKey, versionId)) render();
      return;
    }

    const deleteTemplateModule = event.target.closest("[data-prd-delete-template-module]");
    if (deleteTemplateModule) {
      const [templateId, moduleIndex] = deleteTemplateModule.dataset.prdDeleteTemplateModule.split("|");
      if (deleteMoleculeFromPrdPageTemplate(templateId, Number(moduleIndex))) render();
      return;
    }

    const moveTemplateModule = event.target.closest("[data-prd-move-template-module]");
    if (moveTemplateModule) {
      const [templateId, moduleIndex, direction] = moveTemplateModule.dataset.prdMoveTemplateModule.split("|");
      if (moveMoleculeInPrdPageTemplate(templateId, Number(moduleIndex), direction)) render();
      return;
    }

    const prdTemplateEntryState = event.target.closest(
      "[data-prd-template-entry-state]",
    );
    if (prdTemplateEntryState) {
      const [templateId, moduleIndex, stateId] =
        prdTemplateEntryState.dataset.prdTemplateEntryState.split("|");
      setPageTemplateEntryCardState(templateId, Number(moduleIndex), stateId);
      render();
      return;
    }

    const prdTemplateState = event.target.closest("[data-prd-template-state]");
    if (prdTemplateState) {
      const [templateId, moduleIndex, stateId] = prdTemplateState.dataset.prdTemplateState.split("|");
      setPageTemplateBlueprintBusinessState(templateId, Number(moduleIndex), stateId);
      render();
      return;
    }

    const prdTemplateChildState = event.target.closest("[data-prd-template-child-state]");
    if (prdTemplateChildState) {
      const [templateId, moduleIndex, childIndex, stateId] =
        prdTemplateChildState.dataset.prdTemplateChildState.split("|");
      setPageTemplateChildState(
        templateId,
        Number(moduleIndex),
        Number(childIndex),
        stateId,
      );
      render();
      return;
    }

    const prdTemplateModuleRow = event.target.closest("[data-prd-template-module-row]");
    if (
      prdTemplateModuleRow &&
      !event.target.closest("button, input, textarea, select, a")
    ) {
      const [templateId, moduleIndex] = prdTemplateModuleRow.dataset.prdTemplateModuleRow.split("|");
      state.prdTemplateSelectedModuleIndex = Number(moduleIndex);
      state.prdTemplateAddModal = null;
      state.prdTemplateAddAfterIndex = null;
      render();
      return;
    }

    if (
      state.view === "prd-demo" &&
      state.prdDemoStep === "analysis" &&
      state.prdTemplateSelectedModuleIndex !== null &&
      event.target.closest(".blueprint-overview, .prd-variable-table") &&
      !event.target.closest("[data-prd-template-module-row], [data-prd-add-modal], button, input, textarea, select, a")
    ) {
      state.prdTemplateSelectedModuleIndex = null;
      state.prdTemplateAddModal = null;
      state.prdTemplateAddAfterIndex = null;
      render();
      return;
    }

    const prdOpenAddComponent = event.target.closest("[data-prd-open-add-component]");
    if (prdOpenAddComponent) {
      const [templateId, insertIndex, direction = "after"] =
        prdOpenAddComponent.dataset.prdOpenAddComponent.split("|");
      state.prdTemplateAddAfterIndex = Number(insertIndex);
      state.prdTemplateAddModal = {
        templateId,
        insertIndex: Number(insertIndex),
        direction,
      };
      render();
      return;
    }

    if (
      event.target.closest("[data-prd-close-add-component]") ||
      event.target.matches("[data-prd-add-modal]")
    ) {
      state.prdTemplateAddAfterIndex = null;
      state.prdTemplateAddModal = null;
      render();
      return;
    }

    const prdTemplateInsertMolecule = event.target.closest("[data-prd-template-insert-molecule]");
    if (prdTemplateInsertMolecule) {
      const templateId = prdTemplateInsertMolecule.dataset.prdTemplateId;
      const insertIndex = Number(prdTemplateInsertMolecule.dataset.prdTemplateInsertIndex);
      const moleculeId = prdTemplateInsertMolecule.dataset.prdTemplateInsertMolecule;
      if (insertMoleculeIntoPrdPageTemplate(templateId, insertIndex, moleculeId)) {
        render();
      }
      return;
    }

    const blueprintAudience = event.target.closest("[data-blueprint-audience]");
    if (blueprintAudience) {
      state.selectedBlueprintAudienceId = blueprintAudience.dataset.blueprintAudience;
      render();
      return;
    }

    const blueprintScene = event.target.closest("[data-blueprint-scene]");
    if (blueprintScene?.dataset.blueprintScene) {
      state.selectedBlueprintSceneId = blueprintScene.dataset.blueprintScene;
      render();
      return;
    }

    if (event.target.closest("[data-demo-generate-activity]")) {
      enterGuidedPreviewWithTransition();
      return;
    }

    if (event.target.closest("[data-demo-back-analysis]")) {
      returnToBlueprintWithTransition();
      return;
    }

    if (event.target.closest("[data-demo-sync-preview]")) {
      state.guidedWorkspaceMode = "split";
      buildDemoGeneratedActivity();
      state.prdDemoStep = "preview";
      state.view = "guided-preview";
      render();
      return;
    }

    if (event.target.closest("[data-guided-open-export]")) {
      state.selectedId = null;
      state.guidedStateMenuNodeId = null;
      state.guidedPanelMode = null;
      state.view = "guided-export";
      render();
      return;
    }

    if (event.target.closest("[data-guided-open-theme]")) {
      state.selectedId = null;
      state.guidedStateMenuNodeId = null;
      state.guidedPanelMode = "page";
      updateGuidedNodeSelection(null);
      updateGuidedPanel({ enter: true });
      return;
    }

    if (event.target.closest("[data-guided-back-preview]")) {
      state.view = "guided-preview";
      render();
      return;
    }

    const guidedExportSingle = event.target.closest("[data-guided-export-single]");
    if (guidedExportSingle) {
      downloadGuidedExportEntry(guidedExportSingle.dataset.guidedExportSingle);
      return;
    }

    if (event.target.closest("[data-guided-export-batch]")) {
      downloadGuidedExportBatch();
      return;
    }

    const guidedWorkspaceMode = event.target.closest("[data-guided-workspace-mode]");
    if (guidedWorkspaceMode) {
      state.guidedWorkspaceMode = guidedWorkspaceMode.dataset.guidedWorkspaceMode;
      state.selectedId = null;
      state.guidedPanelMode = null;
      render();
      requestAnimationFrame(() => {
        invalidateStageRect();
        updateCanvasZoom();
      });
      return;
    }

    const guidedContextPages = event.target.closest("[data-guided-context-pages]");
    if (guidedContextPages) {
      const pageIds = guidedContextPages.dataset.guidedContextPages
        .split(",")
        .filter(Boolean);
      const visibleSet = new Set(state.guidedVisiblePageIds);
      const shouldShow = pageIds.some((pageId) => !visibleSet.has(pageId));
      pageIds.forEach((pageId) => {
        if (shouldShow) visibleSet.add(pageId);
        else visibleSet.delete(pageId);
      });
      state.guidedVisiblePageIds = state.pages
        .map((page) => page.id)
        .filter((pageId) => visibleSet.has(pageId));
      if (!state.guidedVisiblePageIds.includes(state.activePageId)) {
        state.activePageId = state.guidedVisiblePageIds[0] || state.pages[0]?.id || state.activePageId;
      }
      state.selectedId = null;
      state.guidedPanelMode = null;
      render();
      return;
    }

    const blueprintAddGroup = event.target.closest("[data-blueprint-add-group]");
    if (blueprintAddGroup) {
      const [contextId, moduleId] = blueprintAddGroup.dataset.blueprintAddGroup.split("|");
      const { module } = findBlueprintModule(contextId, moduleId);
      if (module) {
        createBlueprintVariantGroup(module);
        render();
      }
      return;
    }

    const blueprintModuleMove = event.target.closest("[data-blueprint-module-move]");
    if (blueprintModuleMove) {
      const [contextId, moduleId, direction] =
        blueprintModuleMove.dataset.blueprintModuleMove.split("|");
      if (moveBlueprintModule(contextId, moduleId, direction)) render();
      return;
    }

    const blueprintDeleteGroup = event.target.closest("[data-blueprint-delete-group]");
    if (blueprintDeleteGroup) {
      const [contextId, moduleId, groupId] =
        blueprintDeleteGroup.dataset.blueprintDeleteGroup.split("|");
      const { module } = findBlueprintModule(contextId, moduleId);
      if (module && deleteBlueprintVariantGroup(module, groupId)) render();
      return;
    }

    if (event.target.closest("[data-demo-open-workbench]")) {
      state.view = "workbench";
      render();
      requestAnimationFrame(() => fitAllPagesToView());
      return;
    }

    const guidedOrder = event.target.closest("[data-guided-order]");
    if (guidedOrder && state.view === "guided-preview") {
      const pageId = guidedOrder.dataset.guidedPage;
      const nodeId = guidedOrder.dataset.guidedNode;
      if (moveGuidedPageNodeByDirection(pageId, nodeId, guidedOrder.dataset.guidedOrder)) {
        render();
        requestAnimationFrame(() => {
          invalidateStageRect();
          updateCanvasZoom();
        });
      }
      return;
    }

    const guidedCompanionToggle = event.target.closest(
      "[data-guided-companion-toggle]",
    );
    if (guidedCompanionToggle) {
      const nodeId = guidedCompanionToggle.dataset.guidedCompanionToggle;
      const pageId = guidedCompanionToggle.dataset.guidedCompanionPage;
      const visibleCompanionIds = new Set(
        state.guidedVisibleCompanionNodeIds || [],
      );
      const pageVisible = state.guidedVisiblePageIds.includes(pageId);
      const companionVisible = pageVisible && visibleCompanionIds.has(nodeId);

      if (companionVisible) {
        visibleCompanionIds.delete(nodeId);
        if (state.selectedId === nodeId) {
          state.selectedId = null;
          state.guidedPanelMode = null;
        }
      } else {
        visibleCompanionIds.add(nodeId);
        if (!pageVisible) {
          state.guidedVisiblePageIds = state.pages
            .filter(
              (page) =>
                page.id === pageId ||
                state.guidedVisiblePageIds.includes(page.id),
            )
            .map((page) => page.id);
        }
      }

      state.guidedVisibleCompanionNodeIds = Array.from(visibleCompanionIds);
      state.guidedCanvasInitialized = false;
      render();
      return;
    }

    const demoScenario = event.target.closest("[data-demo-scenario]");
    if (demoScenario) {
      const pageId = demoScenario.dataset.demoScenario;
      const targetPage = state.pages.find((page) => page.id === pageId);
      if (targetPage?.isSystemFallback) {
        setActivePage(pageId);
        state.selectedId = null;
        state.guidedPanelMode = null;
        render();
        return;
      }
      const visibleIds = new Set(state.guidedVisiblePageIds);
      if (visibleIds.has(pageId)) {
        visibleIds.delete(pageId);
      } else {
        visibleIds.add(pageId);
      }
      state.guidedVisiblePageIds = state.pages
        .filter((page) => visibleIds.has(page.id))
        .map((page) => page.id);
      if (visibleIds.has(pageId)) {
        setActivePage(pageId);
      } else if (state.activePageId === pageId && state.guidedVisiblePageIds.length) {
        setActivePage(state.guidedVisiblePageIds[0]);
      }
      state.selectedId = null;
      state.guidedPanelMode = null;
      render();
      return;
    }

    const guidedAction = event.target.closest("[data-guided-action]");
    if (guidedAction && state.view === "guided-preview") {
      const pageId = guidedAction.closest("[data-page-id]")?.dataset.pageId;
      if (pageId && pageId !== state.activePageId) setActivePage(pageId);
      updateGuidedNodeSelection(guidedAction.dataset.guidedNode);
      if (guidedAction.dataset.guidedAction === "delete") {
        if (deleteGuidedPageNode(pageId, guidedAction.dataset.guidedNode)) {
          state.guidedCanvasInitialized = false;
          render();
        }
        return;
      }
      if (guidedAction.dataset.guidedAction === "states") {
        const nodeId = guidedAction.dataset.guidedNode;
        state.guidedStateMenuNodeId =
          state.guidedStateMenuNodeId === nodeId ? null : nodeId;
        state.guidedPanelMode = null;
        render();
        return;
      }
      if (guidedAction.dataset.guidedAction === "slide") {
        state.guidedStateMenuNodeId = null;
        state.guidedPanelMode = null;
        slideGuidedHorizontalCarousel(guidedAction.dataset.guidedNode);
        return;
      }
      state.guidedStateMenuNodeId = null;
      state.guidedPanelMode = guidedAction.dataset.guidedAction;
      if (state.guidedPanelMode === "global") {
        state.guidedLineageVersion = "v3";
      }
      updateGuidedPanel({ enter: true });
      return;
    }

    const guidedPageSurface = event.target.closest(
      ".guided-page-title-node, .guided-page-shell, .guided-phone, .guided-device-stage [data-page-id]",
    );
    if (
      guidedPageSurface &&
      state.view === "guided-preview" &&
      !event.target.closest(".guided-node, .guided-floating-panel, .guided-node-actions, button")
    ) {
      const pageId =
        guidedPageSurface.dataset.guidedPageTitle ||
        guidedPageSurface.dataset.pageId ||
        guidedPageSurface.querySelector?.("[data-page-id]")?.dataset.pageId ||
        guidedPageSurface.closest?.("[data-page-id]")?.dataset.pageId;
      if (pageId && pageId !== state.activePageId) setActivePage(pageId);
      state.selectedId = null;
      state.guidedStateMenuNodeId = null;
      state.guidedPanelMode = "page";
      updateGuidedNodeSelection(null);
      document.querySelectorAll(".guided-page-shell").forEach((pageShell) => {
        pageShell.classList.toggle(
          "has-selected-page",
          pageShell.querySelector(`[data-page-id="${state.activePageId}"]`),
        );
      });
      document.querySelectorAll(".guided-page-title-node").forEach((titleNode) => {
        titleNode.classList.toggle("active", titleNode.dataset.guidedPageTitle === state.activePageId);
        titleNode.classList.toggle(
          "has-selected-page",
          titleNode.dataset.guidedPageTitle === state.activePageId,
        );
      });
      updateGuidedPanel({ enter: true });
      return;
    }

    if (event.target.closest("[data-guided-close-panel]")) {
      closeGuidedPanelWithTransition();
      return;
    }

    const popupResultOption = event.target.closest("[data-guided-popup-result]");
    if (popupResultOption) {
      const found = findNode(
        state.nodes,
        popupResultOption.dataset.guidedNode || state.selectedId,
      );
      if (!found?.node?.isLotteryResultPopup) return;
      setLotteryPopupResult(found.node, popupResultOption.dataset.guidedPopupResult || "win");
      ensureLotteryPopupResultStates(found.node);
      render();
      return;
    }

    const popupPrizeOption = event.target.closest("[data-guided-popup-prize-index]");
    if (popupPrizeOption) {
      const found = findNode(
        state.nodes,
        popupPrizeOption.dataset.guidedNode || state.selectedId,
      );
      if (!found?.node?.isLotteryResultPopup) return;
      setPopupSelectedPrize(found.node, popupPrizeOption.dataset.guidedPopupPrizeIndex || 1);
      render();
      return;
    }

    const lineageVersion = event.target.closest("[data-guided-lineage-version]");
    if (lineageVersion) {
      state.guidedLineageVersion = lineageVersion.dataset.guidedLineageVersion;
      updateGuidedPanel();
      return;
    }

    const lineageCard = event.target.closest("[data-guided-lineage-card]");
    if (
      lineageCard &&
      !event.target.closest("button, input, textarea, select, [contenteditable='true']")
    ) {
      state.selectedLineageVariantId = lineageCard.dataset.guidedLineageCard;
      updateGuidedPanel();
      return;
    }

    const lineageDelete = event.target.closest("[data-guided-lineage-delete]");
    if (lineageDelete) {
      const found = getSelectedNodeInfo();
      if (!found?.node) return;
      deleteLineageGraphNode(found.node, lineageDelete.dataset.guidedLineageDelete);
      updateGuidedPanel();
      return;
    }

    const lineageListAdd = event.target.closest("[data-guided-lineage-add-list]");
    if (lineageListAdd) {
      const found = getSelectedNodeInfo();
      if (!found?.node) return;
      const variant = createLineageListVariant(found.node);
      state.selectedLineageVariantId = variant.id;
      updateGuidedPanel();
      return;
    }

    const lineageComponentAdd = event.target.closest("[data-guided-lineage-add-component]");
    if (lineageComponentAdd) {
      const found = getSelectedNodeInfo();
      if (!found?.node) return;
      const variant = createLineageGraphComponent(
        found.node,
        lineageComponentAdd.dataset.guidedLineageAddComponent,
      );
      state.selectedLineageVariantId = variant.id;
      updateGuidedPanel();
      return;
    }

    const lineageDimensionAdd = event.target.closest("[data-guided-lineage-add-dimension]");
    if (lineageDimensionAdd) {
      const found = getSelectedNodeInfo();
      if (!found?.node) return;
      const { variant } = createLineageGraphDimension(found.node);
      state.selectedLineageVariantId = variant.id;
      updateGuidedPanel();
      return;
    }

    const lineageApply = event.target.closest("[data-guided-lineage-apply]");
    if (lineageApply) {
      const found = getSelectedNodeInfo();
      if (!found?.node) return;
      const variant = findLineageVariant(found.node, lineageApply.dataset.guidedLineageApply);
      if (!variant) return;
      applyLineageVariantToNode(found.node, variant);
        syncGuidedLotteryPopupsForPage(activePage());
      render();
      return;
    }

    const guidedMolecule = event.target.closest("[data-guided-replace-molecule]");
    if (guidedMolecule) {
      const found = getSelectedNodeInfo();
      if (!found) return;
      const optionId = guidedMolecule.dataset.guidedReplaceMolecule;
      const groupId = found.node.moduleGroupId;
      const indexes = state.nodes
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => groupId ? item.moduleGroupId === groupId : item.id === found.node.id)
        .map(({ index }) => index);
      const insertIndex = Math.min(...indexes);
      const replacementNodes = createGuidedModuleReplacement(optionId, found);
      if (!replacementNodes.length) return;
      replacementNodes[0].id = found.node.id;
      [...indexes].sort((a, b) => b - a).forEach((index) => state.nodes.splice(index, 1));
      state.nodes.splice(insertIndex, 0, ...replacementNodes);
      state.selectedId = replacementNodes[0].id;
      state.guidedPanelMode = null;
      state.guidedStateMenuNodeId = null;
      render();
      return;
    }

    const guidedAddMolecule = event.target.closest("[data-guided-add-molecule]");
    if (guidedAddMolecule && state.view === "guided-preview") {
      if (state.suppressClick) return;
      const page = getGuidedEditablePageFallback();
      const pageNodes = (page?.nodes || []).filter(
        (node) => node.canvasPlacement !== "page-side",
      );
      const inserted = insertGuidedMoleculeAt(
        page?.id,
        pageNodes.length,
        guidedAddMolecule.dataset.guidedAddMolecule,
      );
      if (inserted) {
        state.guidedPanelMode = null;
        render();
      }
      return;
    }

    const guidedPageTheme = event.target.closest("[data-guided-page-theme]");
    if (guidedPageTheme) {
      applyGuidedPageTheme(guidedPageTheme.dataset.guidedPageTheme);
      return;
    }

    const guidedVariant = event.target.closest("[data-guided-variant]");
    if (guidedVariant) {
      const variantNode = findNode(state.nodes, guidedVariant.dataset.guidedVariantNode)?.node;
      const variant = variantNode?.variants?.find(
        (item) => item.id === guidedVariant.dataset.guidedVariant,
      );
      if (variantNode && variant) {
        variantNode.activeVariantId = variant.id;
        variantNode.props = { ...variantNode.props, ...variant.props };
        render();
      }
      return;
    }

    const guidedInlineState = event.target.closest("[data-guided-inline-state]");
    if (guidedInlineState) {
      const found = findNode(state.nodes, guidedInlineState.dataset.guidedNode || state.selectedId);
      if (found?.node?.isLotteryResultPopup) {
        setLotteryPopupResult(found.node, guidedInlineState.dataset.guidedInlineState || "win");
        ensureLotteryPopupResultStates(found.node);
        state.selectedId = found.node.id;
        state.guidedStateMenuNodeId = found.node.id;
        state.guidedPanelMode = null;
        render();
      } else if (found?.node && applyGuidedBusinessState(found.node, guidedInlineState.dataset.guidedInlineState)) {
        applyCurrentGuidedThemeToNode(found.node);
        persistPageTemplateBusinessState(found.node);
        state.selectedId = found.node.id;
        state.guidedStateMenuNodeId = found.node.id;
        state.guidedPanelMode = null;
        render();
      }
      return;
    }

    const guidedBusinessState = event.target.closest("[data-guided-business-state]");
    if (guidedBusinessState) {
      const found = getSelectedNodeInfo();
      if (found?.node?.isLotteryResultPopup) {
        setLotteryPopupResult(found.node, guidedBusinessState.dataset.guidedBusinessState || "win");
        ensureLotteryPopupResultStates(found.node);
        render();
      } else if (found?.node && applyGuidedBusinessState(found.node, guidedBusinessState.dataset.guidedBusinessState)) {
        applyCurrentGuidedThemeToNode(found.node);
        persistPageTemplateBusinessState(found.node);
        render();
      }
      return;
    }

    const guidedChildState = event.target.closest("[data-guided-child-state]");
    if (guidedChildState) {
      const found = findNode(state.nodes, guidedChildState.dataset.guidedChildStateNode);
      if (!found?.node) return;
      const stateId = guidedChildState.dataset.guidedChildState;
      const parent = found.parent;
      const childIndex = parent?.children?.findIndex((child) => child.id === found.node.id) ?? -1;
      if (
        parent?.sourcePageTemplateId &&
        parent.sourcePageTemplateNodeIndex !== undefined &&
        childIndex >= 0
      ) {
        setPageTemplateChildState(
          parent.sourcePageTemplateId,
          Number(parent.sourcePageTemplateNodeIndex),
          childIndex,
          stateId,
        );
        applyCurrentGuidedThemeToNode(parent);
      } else {
        applyGuidedBusinessState(found.node, stateId);
        applyCurrentGuidedThemeToNode(found.node);
      }
      render();
      return;
    }

    if (event.target.closest("[data-guided-ai-apply]")) {
      const found = getSelectedNodeInfo();
      const prompt = document.querySelector(".guided-ai-prompt")?.value.trim();
      if (found?.node.type === "atom") {
        if ("mainTextTop" in found.node.props && prompt) found.node.props.mainTextTop = prompt;
        if ("titleText" in found.node.props && prompt) found.node.props.titleText = prompt;
      }
      state.guidedPanelMode = null;
      render();
      return;
    }

    const guidedNode = event.target.closest(".guided-node[data-select]");
    if (guidedNode && state.view === "guided-preview") {
      if (state.guidedStateMenuNodeId) {
        state.guidedStateMenuNodeId = null;
        state.guidedPanelMode = null;
        state.selectedId = guidedNode.dataset.select;
        render();
        return;
      }
      updateGuidedNodeSelection(guidedNode.dataset.select);
      closeGuidedPanelWithTransition();
      return;
    }

    if (
      state.view === "guided-preview" &&
      event.target.closest(".guided-device-stage") &&
      !event.target.closest(".guided-node")
    ) {
      updateGuidedNodeSelection(null);
      closeGuidedPanelWithTransition({ clearSelection: true });
      state.guidedStateMenuNodeId = null;
      return;
    }

    const demoReplacement = event.target.closest("[data-demo-replace-module]");
    if (demoReplacement) {
      const found = getSelectedNodeInfo();
      if (found) {
        const oldNode = found.node;
        const newNode = createAtomNode(demoReplacement.dataset.demoReplaceModule);
        newNode.id = oldNode.id;
        const oldKeys = new Set(Object.keys(oldNode.props || {}));
        Object.keys(newNode.props || {}).forEach((key) => {
          if (oldKeys.has(key)) newNode.props[key] = oldNode.props[key];
        });
        if (found.parent) {
          const index = found.parent.children.findIndex((node) => node.id === oldNode.id);
          if (index >= 0) found.parent.children.splice(index, 1, newNode);
        } else {
          const index = state.nodes.findIndex((node) => node.id === oldNode.id);
          if (index >= 0) state.nodes.splice(index, 1, newNode);
        }
        state.selectedId = newNode.id;
        render();
      }
      return;
    }

    if (event.target.closest("[data-open-admin-dashboard]")) {
      state.view = "admin";
      state.createModalOpen = false;
      state.draftTemplateModalOpen = false;
      state.draftTemplateModalTarget = null;
      state.libraryReturnView = null;
      render();
      return;
    }

    if (event.target.closest("[data-open-admin-component-verifier]")) {
      state.view = "admin-component-verifier";
      render();
      return;
    }

    if (event.target.closest("[data-back-admin]")) {
      state.view = "admin";
      render();
      return;
    }

    const adminPreviewVariant = event.target.closest("[data-admin-preview-variant]");
    if (adminPreviewVariant) {
      const schema = getAdminVerifierSchema();
      const variantId = adminPreviewVariant.dataset.adminPreviewVariant;
      state.adminComponentVerifier.variantId = variantId;
      state.adminComponentVerifier.parentThemeId = getVariantThemeId(schema, variantId);
      render();
      return;
    }

    const adminPreviewState = event.target.closest("[data-admin-preview-state]");
    if (adminPreviewState) {
      const schema = findAtomSchema(adminPreviewState.dataset.adminPreviewState);
      if (!schema) return;
      const variants = normalizeVariants(schema);
      const variantId = variants[0]?.id || null;
      state.adminComponentVerifier = {
        type: "atom",
        schemaId: schema.id,
        parentThemeId: getVariantThemeId(schema, variantId),
        variantId,
        blueprint: { ...(state.adminComponentVerifier?.blueprint || {}) },
      };
      render();
      return;
    }

    const adminMoleculeChildState = event.target.closest("[data-admin-molecule-child-state]");
    if (adminMoleculeChildState) {
      const [childIndex, stateId] = adminMoleculeChildState.dataset.adminMoleculeChildState.split("|");
      state.adminComponentVerifier.childStates = {
        ...(state.adminComponentVerifier.childStates || {}),
        [childIndex]: stateId,
      };
      render();
      return;
    }

    const adminPreviewMoleculeTheme = event.target.closest("[data-admin-preview-molecule-theme]");
    if (adminPreviewMoleculeTheme) {
      const molecule = getAdminVerifierMolecule();
      applyMoleculeThemeToVerifier(
        molecule,
        state.adminComponentVerifier,
        adminPreviewMoleculeTheme.dataset.adminPreviewMoleculeTheme,
      );
      render();
      return;
    }

    const adminPreviewPageTheme = event.target.closest("[data-admin-preview-page-theme]");
    if (adminPreviewPageTheme) {
      state.adminComponentVerifier.parentThemeId = adminPreviewPageTheme.dataset.adminPreviewPageTheme;
      render();
      return;
    }

    if (event.target.closest("[data-admin-export-cut]")) {
      const target = document.querySelector("[data-admin-export-cut-capture]");
      if (target) {
        const selected =
          getAdminVerifierType() === "page"
            ? getAdminVerifierPageTemplate()
            : getAdminVerifierType() === "molecule"
              ? getAdminVerifierMolecule()
              : getAdminVerifierSchema();
        const fileName = `${selected?.name || selected?.id || "组件切图"}.png`;
        exportElementToPngBlob(target, { pixelRatio: 2 })
            .then((blob) => downloadBlob(fileName, blob))
          .catch((error) => {
            console.error("[admin-export] cut export failed", error);
            window.alert(`导出失败：${error?.message || "未知错误"}`);
          });
      }
      return;
    }

    const editMoleculeTemplate = event.target.closest("[data-admin-edit-molecule]");
    if (editMoleculeTemplate) {
      openMoleculeTemplateEditor(editMoleculeTemplate.dataset.adminEditMolecule);
      return;
    }

    const openAnimationPreviewLib = event.target.closest("[data-open-animation-preview-library]");
    if (openAnimationPreviewLib) {
      state.libraryReturnView = state.view === "admin" ? "admin" : null;
      state.view = "animation-preview-library";
      render();
      return;
    }

    const backHome = event.target.closest("[data-back-home]");
    if (backHome) {
      if (prdParseTimer) clearTimeout(prdParseTimer);
      state.view =
        state.view === "animation-preview-library" && state.libraryReturnView === "admin"
          ? "admin"
          : "home";
      state.libraryReturnView = null;
      state.selectedId = null;
      render();
      return;
    }

    if (event.target.closest("[data-open-create-modal]")) {
      state.createModalOpen = false;
      state.draftTemplateModalOpen = false;
      state.draftTemplateModalTarget = null;
      state.createDraft = { name: "新活动", dimensions: ["个人用户"], pages: {} };
      createActivityFromDraft();
      return;
    }

    if (event.target.closest("[data-close-create-modal]") || event.target.closest("[data-create-modal-overlay]")) {
      if (event.target.closest(".create-modal") && !event.target.closest("[data-close-create-modal]") && !event.target.matches("[data-create-modal-overlay]")) {
        // clicked inside modal, don't close
      } else if (event.target.closest("[data-draft-template-modal]")) {
        // clicked inside template modal, don't close
      } else {
        state.createModalOpen = false;
        state.draftTemplateModalOpen = false;
        state.draftTemplateModalTarget = null;
        renderEntrySurface();
        return;
      }
    }

    const createName = event.target.closest("[data-create-name]");
    if (createName) {
      state.createDraft.name = createName.value;
      return;
    }

    const dimensionName = event.target.closest("[data-dimension-name]");
    if (dimensionName) {
      const index = parseInt(dimensionName.dataset.dimensionName, 10);
      state.createDraft.dimensions[index] = dimensionName.value;
      return;
    }

    if (event.target.closest("[data-add-dimension]")) {
      state.createDraft.dimensions.push(`维度 ${state.createDraft.dimensions.length + 1}`);
      renderEntrySurface();
      return;
    }

    const deleteDimension = event.target.closest("[data-delete-dimension]");
    if (deleteDimension) {
      const index = parseInt(deleteDimension.dataset.deleteDimension, 10);
      state.createDraft.dimensions.splice(index, 1);
      renderEntrySurface();
      return;
    }

    const addDraftPageBtn = event.target.closest("[data-add-draft-page]");
    if (addDraftPageBtn) {
      const dimIndex = parseInt(addDraftPageBtn.dataset.addDraftPage, 10);
      const dimName = state.createDraft.dimensions[dimIndex];
      if (!state.createDraft.pages[dimName]) {
        state.createDraft.pages[dimName] = [];
      }
      state.createDraft.pages[dimName].push({
        name: `页面 ${state.createDraft.pages[dimName].length + 1}`,
        templateId: null,
      });
      renderEntrySurface();
      return;
    }

    const selectPageTemplate = event.target.closest("[data-select-page-template]");
    if (selectPageTemplate) {
      event.stopPropagation();
      state.draftTemplateModalTarget = selectPageTemplate.dataset.selectPageTemplate;
      state.draftTemplateModalOpen = true;
      renderEntrySurface();
      return;
    }

    if (event.target.closest("[data-close-draft-template-modal]")) {
      state.draftTemplateModalOpen = false;
      state.draftTemplateModalTarget = null;
      renderEntrySurface();
      return;
    }

    const selectDraftTemplate = event.target.closest("[data-select-draft-template]");
    if (selectDraftTemplate) {
      if (state.draftTemplateModalTarget) {
        const [dimIndexStr, pageIndexStr] = state.draftTemplateModalTarget.split(":");
        const dimIndex = parseInt(dimIndexStr, 10);
        const pageIndex = parseInt(pageIndexStr, 10);
        const dimName = state.createDraft.dimensions[dimIndex];
        if (state.createDraft.pages[dimName] && state.createDraft.pages[dimName][pageIndex]) {
          state.createDraft.pages[dimName][pageIndex].templateId = selectDraftTemplate.dataset.selectDraftTemplate;
        }
      }
      state.draftTemplateModalOpen = false;
      state.draftTemplateModalTarget = null;
      renderEntrySurface();
      return;
    }

    const deletePageBtn = event.target.closest("[data-delete-page]");
    if (deletePageBtn && deletePageBtn.dataset.deletePage.includes(":")) {
      const [dimIndexStr, pageIndexStr] = deletePageBtn.dataset.deletePage.split(":");
      const dimIndex = parseInt(dimIndexStr, 10);
      const pageIndex = parseInt(pageIndexStr, 10);
      const dimName = state.createDraft.dimensions[dimIndex];
      if (state.createDraft.pages[dimName]) {
        state.createDraft.pages[dimName].splice(pageIndex, 1);
      }
      renderEntrySurface();
      return;
    }

    const pageNameInput = event.target.closest("[data-page-name]");
    if (pageNameInput) {
      const [dimIndexStr, pageIndexStr] = pageNameInput.dataset.pageName.split(":");
      const dimIndex = parseInt(dimIndexStr, 10);
      const pageIndex = parseInt(pageIndexStr, 10);
      const dimName = state.createDraft.dimensions[dimIndex];
      if (state.createDraft.pages[dimName] && state.createDraft.pages[dimName][pageIndex]) {
        state.createDraft.pages[dimName][pageIndex].name = pageNameInput.value;
      }
      return;
    }

    if (event.target.closest("[data-create-next]")) {
      const { dimensions } = state.createDraft;
      if (!state.createDraft.name.trim()) {
        alert("请输入活动名称");
        return;
      }
      if (!dimensions.length || dimensions.every((d) => !d.trim())) {
        alert("请至少添加一个维度");
        return;
      }
      createActivityFromDraft();
      return;
    }

    if (event.target.closest("[data-back-home]")) {
      if (prdParseTimer) clearTimeout(prdParseTimer);
      state.view = "home";
      state.selectedId = null;
      state.colorPanelOpen = false;
      state.variantPanelOpen = false;
      render();
      return;
    }

    if (event.target.closest("[data-save]")) {
      saveActivityToStorage();
      const btn = event.target.closest("[data-save]");
      const originalText = btn.textContent;
      btn.textContent = "已保存";
      btn.classList.add("saved");
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove("saved");
      }, 1500);
      return;
    }

    const panelTab = event.target.closest("[data-panel-tab]");
    if (panelTab) {
      state.activePanelTab = panelTab.dataset.panelTab;
      render();
      return;
    }

    const library = event.target.closest("[data-library]");
    if (library) {
      state.activeLibrary = library.dataset.library;
      render();
      return;
    }

    const template = event.target.closest("[data-template-id]");
    if (template) {
      addTemplatePage(template.dataset.templateId);
      return;
    }

    const customTemplate = event.target.closest("[data-custom-template-id]");
    if (customTemplate) {
      addPageFromCustomTemplate(customTemplate.dataset.customTemplateId);
      return;
    }

    const deleteCustomTemplate = event.target.closest("[data-delete-custom-template]");
    if (deleteCustomTemplate) {
      const templateId = deleteCustomTemplate.dataset.deleteCustomTemplate;
      const index = customPageTemplates.findIndex((t) => t.id === templateId);
      if (index !== -1) {
        customPageTemplates.splice(index, 1);
        saveCustomPageTemplatesToStorage();
        renderMaterialList();
      }
      return;
    }

    const savePageTemplate = event.target.closest("[data-save-page-template]");
    if (savePageTemplate) {
      const pageId = savePageTemplate.dataset.savePageTemplate;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        savePageAsTemplate(page, page.name);
        renderMaterialList();
      }
      return;
    }

    const savePageFloat = event.target.closest("[data-save-page-float]");
    if (savePageFloat) {
      const pageId = savePageFloat.dataset.savePageFloat;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        savePageAsTemplate(page, page.name);
        renderMaterialList();
      }
      return;
    }

    const structureNode = event.target.closest("[data-structure-node]");
    if (structureNode) {
      const foundPage = state.pages.find((page) => findNode(page.nodes, structureNode.dataset.structureNode));
      if (foundPage) state.activePageId = foundPage.id;
      state.selectedId = structureNode.dataset.structureNode;
      state.colorPanelOpen = false;
      state.variantPanelOpen = false;
      render();
      return;
    }

    const structurePage = event.target.closest("[data-structure-page]");
    if (structurePage && !event.target.closest("[data-structure-node]")) {
      setActivePage(structurePage.dataset.structurePage);
      render();
      return;
    }

    if (event.target.closest("[data-add-page]")) {
      openPageTemplateModal();
      return;
    }

    const addPageToDimension = event.target.closest("[data-add-page-dimension]");
    if (addPageToDimension) {
      openPageTemplateModal(addPageToDimension.dataset.addPageDimension);
      return;
    }

    if (event.target.closest("[data-close-page-template-modal]")) {
      closePageTemplateModal();
      return;
    }

    if (event.target.matches("[data-page-template-overlay]")) {
      closePageTemplateModal();
      return;
    }

    const addPageToDimensionBtn = event.target.closest("[data-add-page-to-dimension]");
    if (addPageToDimensionBtn) {
      const dim = addPageToDimensionBtn.dataset.addPageToDimension;
      addPage(dim);
      closePageTemplateModal();
      return;
    }

    const addBlankPageBtn = event.target.closest("[data-add-blank-page]");
    if (addBlankPageBtn) {
      const dim = state.pageTemplateModalDimension || state.selectedDimension || activePage()?.dimension || "自定义维度";
      addPage(dim);
      closePageTemplateModal();
      return;
    }

    const addDimensionPageModalBtn = event.target.closest("[data-add-dimension-page-modal]");
    if (addDimensionPageModalBtn) {
      const newDimName = prompt("请输入新维度名称：", `维度 ${state.pages.length + 1}`);
      if (newDimName && newDimName.trim()) {
        const newDim = newDimName.trim();
        addPage(newDim);
        closePageTemplateModal();
      }
      return;
    }

    const addPageTemplate = event.target.closest("[data-add-page-template]");
    if (addPageTemplate) {
      addPageFromPageTemplate(addPageTemplate.dataset.addPageTemplate, state.pageTemplateModalDimension);
      return;
    }

    const deletePageButton = event.target.closest("[data-delete-page]");
    if (deletePageButton && !deletePageButton.disabled) {
      deletePage(deletePageButton.dataset.deletePage);
      return;
    }

    const togglePageNavBar = event.target.closest("[data-toggle-page-navbar]");
    if (togglePageNavBar) {
      const page = state.pages.find((item) => item.id === togglePageNavBar.dataset.togglePageNavbar);
      if (page) {
        page.navBarEnabled = !page.navBarEnabled;
        state.activePageId = page.id;
        state.selectedDimension = page.dimension || "未分组";
        render();
      }
      return;
    }

    const pageTitle = event.target.closest("[data-page-title]");
    if (pageTitle) {
      setActivePage(pageTitle.dataset.pageTitle);
      if (!event.target.closest("[contenteditable='true'], button")) render();
      return;
    }

    const deleteMolecule = event.target.closest("[data-delete-molecule]");
    if (deleteMolecule) {
      event.preventDefault();
      event.stopPropagation();
      const moleculeId = deleteMolecule.dataset.deleteMolecule;
      const molecule = moleculeSchemas.find((item) => item.id === moleculeId);
      if (molecule && confirm(`确定要删除分子模板「${molecule.name}」吗？`)) {
        deleteMoleculeTemplate(moleculeId);
        render();
      }
      return;
    }

    const tab = event.target.closest("[data-tab]");
    if (tab) {
      state.activeTab = tab.dataset.tab;
      render();
      return;
    }

    if (event.target.closest("[data-toggle-canvas-colors]")) {
      if (event.target.closest("[data-canvas-color-picker]")) return;
      state.canvasColorPanelOpen = !state.canvasColorPanelOpen;
      renderCanvasColorControl();
      return;
    }

    const canvasColor = event.target.closest("[data-apply-canvas-color]");
    if (canvasColor) {
      state.canvasBackground = canvasColor.dataset.applyCanvasColor;
      state.canvasColorPanelOpen = false;
      render();
      return;
    }

    const select = event.target.closest("[data-select]");
    if (select) {
      if (event.target.closest(".guided-lineage-v3-card")) {
        if (event.target.closest("[contenteditable='true'], input, textarea, select")) {
          return;
        }
        const lineageCard = event.target.closest("[data-guided-lineage-card]");
        if (lineageCard) state.selectedLineageVariantId = lineageCard.dataset.guidedLineageCard;
        updateGuidedPanel();
        return;
      }
      const page = select.closest("[data-page-id]");
      if (page) setActivePage(page.dataset.pageId);
      const nextId = select.dataset.select;
      if (state.selectedId !== nextId) {
        state.colorPanelOpen = false;
        state.variantPanelOpen = false;
        state.propsPanelOpen = false;
      }
      state.selectedId = nextId;
      if (event.target.closest("[data-edit-prop]")) {
        document.querySelectorAll(".node-wrap.selected").forEach((node) => node.classList.remove("selected"));
        select.classList.add("selected");
        renderContextControls();
        return;
      }
      render();
      $(".canvas-wrap").focus();
      return;
    }

    if (event.target.closest("[data-toggle-colors]")) {
      if (event.target.closest("[data-component-color-picker]")) return;
      const found = getSelectedNodeInfo();
      if (found) state.selectedId = found.node.id;
      state.colorPanelOpen = !state.colorPanelOpen;
      state.variantPanelOpen = false;
      state.propsPanelOpen = false;
      renderContextControls();
      return;
    }

    if (event.target.closest("[data-toggle-props]")) {
      const found = getSelectedNodeInfo();
      if (found) state.selectedId = found.node.id;
      state.propsPanelOpen = !state.propsPanelOpen;
      state.variantPanelOpen = false;
      state.colorPanelOpen = false;
      renderContextControls();
      return;
    }

    const colorButton = event.target.closest("[data-apply-color]");
    if (colorButton) {
      const found = getSelectedNodeInfo();
      if (found) {
        state.selectedId = found.node.id;
        applyComponentColor(found.node, colorButton.dataset.applyColor);
        const activeVariant = found.node.variants?.find((item) => item.id === found.node.activeVariantId);
        if (activeVariant) {
          ["background", "textColor", "titleColor", "bodyColor", "priceColor"].forEach((key) => {
            if (key in found.node.props) activeVariant.props[key] = found.node.props[key];
          });
        }
      }
      state.colorPanelOpen = false;
      render();
      return;
    }

    if (event.target.closest("[data-save-molecule]")) {
      const found = getSelectedNodeInfo();
      if (found && found.node.type === "molecule") {
        showSaveMoleculeDialog(found.node.id);
      }
      return;
    }

    if (event.target.closest("[data-toggle-variants]")) {
      const found = getSelectedNodeInfo();
      if (found) state.selectedId = found.node.id;
      state.variantPanelOpen = !state.variantPanelOpen;
      state.colorPanelOpen = false;
      state.richtextEditorOpen = false;
      renderContextControls();
      return;
    }

    if (event.target.closest("[data-toggle-richtext]")) {
      const found = getSelectedNodeInfo();
      if (found) state.selectedId = found.node.id;
      state.richtextEditorOpen = !state.richtextEditorOpen;
      state.colorPanelOpen = false;
      state.variantPanelOpen = false;
      renderContextControls();
      return;
    }

    const applyVariant = event.target.closest("[data-apply-variant]");
    if (applyVariant && !event.target.closest("[data-variant-prop]")) {
      const found = getSelectedNodeInfo();
      const variant = found?.node.variants?.find((item) => item.id === applyVariant.dataset.applyVariant);
      if (found && variant) {
        found.node.activeVariantId = variant.id;
        found.node.props = { ...found.node.props, ...variant.props };
        render();
      }
      return;
    }

    const richtextType = event.target.closest("[data-richtext-type]");
    if (richtextType) {
      const found = getSelectedNodeInfo();
      if (found && found.node.schemaId === "RichText") {
        const index = parseInt(richtextType.dataset.richtextType, 10);
        const paragraphs = getRichTextParagraphs(found.node);
        if (paragraphs[index]) {
          paragraphs[index].type = paragraphs[index].type === "title" ? "body" : "title";
          if (paragraphs[index].type === "body") paragraphs[index].icon = false;
          setRichTextParagraphs(found.node, paragraphs);
          renderContextControls();
          render();
        }
      }
      return;
    }

    const richtextColor = event.target.closest("[data-richtext-color]");
    if (richtextColor) {
      const found = getSelectedNodeInfo();
      if (found && found.node.schemaId === "RichText") {
        const [indexStr, colorKey] = richtextColor.dataset.richtextColor.split(":");
        const index = parseInt(indexStr, 10);
        const paragraphs = getRichTextParagraphs(found.node);
        if (paragraphs[index]) {
          paragraphs[index].color = colorKey;
          setRichTextParagraphs(found.node, paragraphs);
          renderContextControls();
          render();
        }
      }
      return;
    }

    const richtextBullet = event.target.closest("[data-richtext-bullet]");
    if (richtextBullet) {
      const found = getSelectedNodeInfo();
      if (found && found.node.schemaId === "RichText") {
        const index = parseInt(richtextBullet.dataset.richtextBullet, 10);
        const paragraphs = getRichTextParagraphs(found.node);
        if (paragraphs[index]) {
          paragraphs[index].bullet = !paragraphs[index].bullet;
          setRichTextParagraphs(found.node, paragraphs);
          renderContextControls();
          render();
        }
      }
      return;
    }

    const richtextIcon = event.target.closest("[data-richtext-icon]");
    if (richtextIcon) {
      const found = getSelectedNodeInfo();
      if (found && found.node.schemaId === "RichText") {
        const index = parseInt(richtextIcon.dataset.richtextIcon, 10);
        const paragraphs = getRichTextParagraphs(found.node);
        if (paragraphs[index]) {
          paragraphs[index].icon = !paragraphs[index].icon;
          setRichTextParagraphs(found.node, paragraphs);
          renderContextControls();
          render();
        }
      }
      return;
    }

    if (event.target.closest("[data-export-json]")) {
      showCode("页面 JSON", JSON.stringify(exportPage(), null, 2));
      return;
    }

    if (event.target.closest("[data-export-html]")) {
      const html = state.pages
        .map((page) => {
          const pageEl = document.querySelector(`[data-page-id="${page.id}"]`);
          return `<!-- ${page.name} -->\n${pageEl?.innerHTML.trim() || ""}`;
        })
        .join("\n\n");
      showCode("静态 HTML", html);
      return;
    }

    if (event.target.closest("[data-clear]")) {
      activePage().nodes = [];
      state.selectedId = null;
      render();
      return;
    }

    if (event.target.closest("[data-close-modal]") || event.target.classList.contains("code-modal")) {
      $(".code-modal").classList.remove("open");
      return;
    }

    const pageShell = event.target.closest("[data-page-shell]");
    if (pageShell) setActivePage(pageShell.dataset.pageShell);

    const dimensionLane = event.target.closest("[data-select-dimension]");
    if (dimensionLane && !event.target.closest("[contenteditable='true'], button, [data-page-shell]")) {
      state.selectedDimension = dimensionLane.dataset.selectDimension;
      state.selectedId = null;
      state.colorPanelOpen = false;
      state.variantPanelOpen = false;
      render();
      return;
    }

    if (
      !event.target.closest(".quick-toolbar, .variant-inspector, .richtext-editor") &&
      event.target.closest(".device-stage, .pages-row, .canvas-world, .dimension-lane, .page, .phone, .empty-canvas")
    ) {
      state.selectedId = null;
      if (event.target.closest(".device-stage") && !event.target.closest(".canvas-world, .dimension-lane, .page, .phone, .empty-canvas")) {
        state.activePageId = null;
        state.selectedDimension = null;
      }
      state.colorPanelOpen = false;
      state.variantPanelOpen = false;
      state.canvasColorPanelOpen = false;
      render();
    }
  });

  document.addEventListener(
    "wheel",
    (event) => {
      const lineageMap = event.target.closest("[data-guided-lineage-map]");
      if (!lineageMap) return;
      event.preventDefault();
      if (!event.ctrlKey) {
        state.guidedLineagePanX -= event.deltaX;
        state.guidedLineagePanY -= event.deltaY;
        updateGuidedLineageTransform();
        return;
      }
      const oldZoom = state.guidedLineageZoom || 1;
      const nextZoom = clamp(oldZoom * Math.exp(-event.deltaY * 0.004), 0.35, 3);
      if (Math.abs(nextZoom - oldZoom) < 0.001) return;
      const rect = lineageMap.getBoundingClientRect();
      const anchorX = event.clientX - rect.left;
      const anchorY = event.clientY - rect.top;
      const contentX = (anchorX - state.guidedLineagePanX) / oldZoom;
      const contentY = (anchorY - state.guidedLineagePanY) / oldZoom;
      state.guidedLineageZoom = nextZoom;
      state.guidedLineagePanX = anchorX - contentX * nextZoom;
      state.guidedLineagePanY = anchorY - contentY * nextZoom;
      updateGuidedLineageTransform();
    },
    { passive: false },
  );

  document.addEventListener("paste", (event) => {
    const blueprintCell = event.target.closest("[data-prd-blueprint-cell]");
    const returnStrategyTarget = event.target.closest(
      "[data-prd-return-strategy-paste-target]",
    );
    if (!blueprintCell && !returnStrategyTarget) return;
    const pasteTarget = blueprintCell || returnStrategyTarget;
    const modal = pasteTarget.closest("[data-demo-file-modal]");
    const moduleTable = pasteTarget.closest("[data-prd-blueprint-module-table]");
    const targetModuleName = moduleTable?.dataset.prdBlueprintModuleTable || "";
    const currentRows = getPrdBlueprintPasteRowsFromModal(modal);
    const currentVersions = getPrdBlueprintPasteVersionsFromModal(modal);
    const templateName =
      modal?.querySelector("[data-prd-blueprint-template-select]")?.value ||
      state.prdBlueprintPasteTemplateName;
    const clipboardTables = parsePrdBlueprintClipboardTables(event.clipboardData);
    const adapted = adaptPrdDocumentClipboardTables(
      clipboardTables,
      templateName,
      currentVersions,
      getFilledPrdBlueprintPasteRows(currentRows).length > 0,
    );
    if (adapted?.error) {
      event.preventDefault();
      state.prdBlueprintPasteError = adapted.error;
      render();
      return;
    }
    const rows = adapted?.rows || clipboardTables.flat();
    if (!rows.length) return;
    event.preventDefault();
    const merged = adapted
      ? {
          rows: mergeAdaptedPrdDocumentRows(
            currentRows,
            adapted,
            targetModuleName,
          ),
          versions: adapted.versions,
        }
      : mergePrdBlueprintPasteRows(
          currentRows,
          currentVersions,
          rows,
          Number(blueprintCell?.dataset.prdBlueprintRowIndex || 0),
          Number(blueprintCell?.dataset.prdBlueprintCellIndex || 0),
        );
    state.prdBlueprintPasteTemplateName = adapted?.templateName || templateName || "";
    state.prdBlueprintPasteVersions = adapted?.versions || merged.versions;
    state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(
      merged.rows,
      0,
      state.prdBlueprintPasteVersions.length,
    );
    if (adapted?.guideStateId) {
      state.pageTemplateBlueprintStates["page-guide-no-incentive|1"] =
        adapted.guideStateId;
    }
    state.prdBlueprintPasteError = "";
    render();
  });

  document.addEventListener("input", (event) => {
    const placementCaseScrollbar = event.target.closest("[data-placement-case-scrollbar]");
    if (placementCaseScrollbar) {
      const carousel = placementCaseScrollbar
        .closest(".placement-case-carousel-shell")
        ?.querySelector(".placement-case-carousel");
      if (carousel) {
        const maxScrollLeft = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
        const nextScrollLeft =
          (Number(placementCaseScrollbar.value) / Number(placementCaseScrollbar.max)) *
          maxScrollLeft;
        if (carousel._placementCaseScrollFrame) {
          cancelAnimationFrame(carousel._placementCaseScrollFrame);
        }
        carousel._placementCaseScrollFrame = requestAnimationFrame(() => {
          carousel.scrollLeft = nextScrollLeft;
          carousel._placementCaseScrollFrame = null;
        });
      }
      return;
    }

    const prdBlueprintCell = event.target.closest("[data-prd-blueprint-cell]");
    if (prdBlueprintCell) {
      const modal = prdBlueprintCell.closest("[data-demo-file-modal]");
      const versions = normalizePrdBlueprintPasteVersions(getPrdBlueprintPasteVersionsFromModal(modal));
      state.prdBlueprintPasteVersions = versions;
      state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(getPrdBlueprintPasteRowsFromModal(modal), 12, versions.length);
      state.prdBlueprintPasteError = "";
      return;
    }

    const prdBlueprintVersionCell = event.target.closest("[data-prd-blueprint-version-cell]");
    if (prdBlueprintVersionCell) {
      const modal = prdBlueprintVersionCell.closest("[data-demo-file-modal]");
      const versions = normalizePrdBlueprintPasteVersions(getPrdBlueprintPasteVersionsFromModal(modal));
      state.prdBlueprintPasteVersions = versions;
      state.prdBlueprintPasteRows = normalizePrdBlueprintPasteRows(getPrdBlueprintPasteRowsFromModal(modal), 12, versions.length);
      state.prdBlueprintPasteError = "";
      return;
    }

    const prdTextInput = event.target.closest("[data-prd-text-input]");
    if (prdTextInput) {
      state.prdTextInput = prdTextInput.value;
      state.prdTextError = "";
      const status = prdTextInput
        .closest(".prd-text-import")
        ?.querySelector(".prd-text-import-actions span");
      if (status) {
        status.classList.remove("error");
        status.textContent = "粘贴后将转换为可编辑的 PRD 信息表";
      }
      return;
    }

    const prdVersionNameInput = event.target.closest("[data-prd-version-name]");
    if (prdVersionNameInput) {
      renameManualModuleBlueprintVersion(
        prdVersionNameInput.dataset.prdVersionModuleKey,
        prdVersionNameInput.dataset.prdVersionId,
        prdVersionNameInput.value,
      );
      return;
    }

    const adminBlueprintInput = event.target.closest("[data-admin-blueprint-prop]");
    if (adminBlueprintInput) {
      const key = adminBlueprintInput.dataset.adminBlueprintProp;
      state.adminComponentVerifier.blueprint[key] = adminBlueprintInput.value;
      refreshAdminVerifierPreview();
      return;
    }

    const adminMoleculeBlueprintInput = event.target.closest("[data-admin-molecule-blueprint-prop]");
    if (adminMoleculeBlueprintInput) {
      const key = adminMoleculeBlueprintInput.dataset.adminMoleculeBlueprintProp;
      const molecule = getAdminVerifierMolecule();
      const verifierField = getMoleculeVerifierFields(molecule, state.adminComponentVerifier).find((item) =>
        (item.compoundKey || getMoleculeBlueprintKey(item.childIndex, item.key)) === key,
      );
      state.adminComponentVerifier.blueprint[key] =
        verifierField?.field?.type === "number"
          ? Number(adminMoleculeBlueprintInput.value)
          : adminMoleculeBlueprintInput.value;
      if (verifierField?.scope === "molecule" && verifierField?.field?.type === "number") {
        render();
        return;
      }
      refreshAdminVerifierPreview();
      return;
    }

    const adminPageBlueprintInput = event.target.closest("[data-admin-page-blueprint-prop]");
    if (adminPageBlueprintInput) {
      const key = adminPageBlueprintInput.dataset.adminPageBlueprintProp;
      const pageTemplate = getAdminVerifierPageTemplate();
      const verifierField = getPageTemplateVerifierFields(pageTemplate, state.adminComponentVerifier).find((item) =>
        item.compoundKey === key,
      );
      state.adminComponentVerifier.blueprint[key] =
        verifierField?.field?.type === "number"
          ? Number(adminPageBlueprintInput.value)
          : adminPageBlueprintInput.value;
      if (verifierField?.scope === "molecule" && verifierField?.field?.type === "number") {
        render();
        return;
      }
      refreshAdminVerifierPreview();
      return;
    }

    const lineageTitle = event.target.closest("[data-guided-lineage-title]");
    if (lineageTitle) {
      const found = getSelectedNodeInfo();
      const variant = found?.node ? findLineageVariant(found.node, lineageTitle.dataset.guidedLineageTitle) : null;
      if (variant) variant.title = lineageTitle.value;
      return;
    }

    const lineageDimensionTitle = event.target.closest("[data-guided-lineage-dimension-title]");
    if (lineageDimensionTitle) {
      const found = getSelectedNodeInfo();
      const { dimensions } = found?.node ? ensureGuidedLineageTree(found.node) : { dimensions: [] };
      const dimension = dimensions.find(
        (item) => item.id === lineageDimensionTitle.dataset.guidedLineageDimensionTitle,
      );
      if (dimension) dimension.title = lineageDimensionTitle.value || "未命名维度";
      return;
    }

    const lineageValue = event.target.closest("[data-guided-lineage-value]");
    if (lineageValue) {
      const found = getSelectedNodeInfo();
      const [variantId, path] = lineageValue.dataset.guidedLineageValue.split("|");
      const variant = found?.node ? findLineageVariant(found.node, variantId) : null;
      if (variant) {
        setNodeValueByPath(variant.node, path, lineageValue.value);
        syncGuidedInlineEditToSource(found, variantId, path, lineageValue.value);
        lineageValue.closest("[data-lineage-field]")?.classList.toggle(
          "changed",
          lineageValue.value !== lineageValue.dataset.initialValue,
        );
      }
      return;
    }

    const lineageInline = event.target.closest("[data-guided-lineage-inline]");
    if (lineageInline) {
      const found = getSelectedNodeInfo();
      const [variantId, path] = lineageInline.dataset.guidedLineageInline.split("|");
      const variant = found?.node ? findLineageVariant(found.node, variantId) : null;
      if (variant) {
        const value = getLineageInlineValue(lineageInline);
        setNodeValueByPath(variant.node, path, value);
        syncGuidedInlineEditToSource(found, variantId, path, value);
        if (!event.isComposing) applyLineageInlineDiff(lineageInline, value);
      }
      return;
    }

    const globalInput = event.target.closest("[data-guided-global-value]");
    if (globalInput) {
      const [contextId, moduleId, rowIndex] =
        globalInput.dataset.guidedGlobalValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const row = module?.rows[Number(rowIndex)];
      if (row) {
        row.value = globalInput.value;
        if (module.inputScope === "activity") {
          contexts.forEach((candidateContext) => {
            const sharedModule = candidateContext.modules.find(
              (candidateModule) =>
                candidateModule.inputScope === "activity" &&
                candidateModule.slot === module.slot,
            );
            if (sharedModule?.rows[Number(rowIndex)]) {
              sharedModule.rows[Number(rowIndex)].value = globalInput.value;
            }
          });
        }
      }
      return;
    }

    const blueprintPrdField = event.target.closest("[data-blueprint-prd-field]");
    if (blueprintPrdField) {
      const key = blueprintPrdField.dataset.blueprintPrdField;
      if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
        getPrdTableBlueprint()[key] = blueprintPrdField.value;
      } else {
        demoPrdBlueprint[key] = blueprintPrdField.value;
      }
      return;
    }

    const prdTemplateVariableInput = event.target.closest("[data-prd-template-variable-row]");
    if (prdTemplateVariableInput) {
      const rowKey = prdTemplateVariableInput.dataset.prdTemplateVariableRow;
      let rowIndex = findPrdTableRowIndexByKey(rowKey);
      if (rowIndex < 0) {
        state.prdTableRows.push({ key: rowKey, value: "" });
        rowIndex = state.prdTableRows.length - 1;
      }
      state.prdTableRows[rowIndex].value = prdTemplateVariableInput.type === "checkbox"
        ? (prdTemplateVariableInput.checked ? "true" : "")
        : prdTemplateVariableInput.value;
      state.prdTableBlueprint = null;
      state.prdTableBlueprintSignature = "";
      const variableKey = prdTemplateVariableInput.dataset.prdTemplateVariableKey || "";
      const variableLabel = prdTemplateVariableInput.dataset.prdTemplateVariableLabel || "";
      if (
        variableKey === "taskCount" ||
        normalizePageTemplateLookupName(variableLabel) === normalizePageTemplateLookupName("任务数量")
      ) {
        render();
        requestAnimationFrame(() => {
          const nextInput = document.querySelector(
            `[data-prd-template-variable-row="${CSS.escape(rowKey)}"]`,
          );
          nextInput?.focus();
        });
      }
      return;
    }

    const prdTableRowInput = event.target.closest("[data-prd-table-row]");
    if (prdTableRowInput) {
      const rowIndex = Number(prdTableRowInput.dataset.prdTableRow);
      if (state.prdTableRows[rowIndex]) {
        state.prdTableRows[rowIndex].value = prdTableRowInput.type === "checkbox"
          ? (prdTableRowInput.checked ? "true" : "")
          : prdTableRowInput.value;
        state.prdTableBlueprint = null;
        state.prdTableBlueprintSignature = "";
      }
      return;
    }

    const blueprintAudienceField = event.target.closest("[data-blueprint-audience-field]");
    if (blueprintAudienceField) {
      const [audienceId, key] = blueprintAudienceField.dataset.blueprintAudienceField.split("|");
      const audience = getBlueprintAudiences().find((item) => item.id === audienceId);
      if (audience) audience[key] = blueprintAudienceField.value;
      return;
    }

    const blueprintModuleField = event.target.closest("[data-blueprint-module-field]");
    if (blueprintModuleField) {
      const [contextId, moduleId, key] = blueprintModuleField.dataset.blueprintModuleField.split("|");
      const { module } = findBlueprintModule(contextId, moduleId);
      if (module) module[key] = blueprintModuleField.value;
      return;
    }

    const blueprintGroupName = event.target.closest("[data-blueprint-group-name]");
    if (blueprintGroupName) {
      const [contextId, moduleId, groupId] =
        blueprintGroupName.dataset.blueprintGroupName.split("|");
      const { module } = findBlueprintModule(contextId, moduleId);
      const group = module ? ensureBlueprintVariantGroups(module).find((item) => item.id === groupId) : null;
      if (group) group.name = blueprintGroupName.value.trim() || "未命名分组";
      return;
    }

    const blueprintVariantInput = event.target.closest("[data-blueprint-variant-value]");
    if (blueprintVariantInput) {
      const textareaRows = getBlueprintTextareaRows(blueprintVariantInput.value);
      blueprintVariantInput.rows = textareaRows;
      blueprintVariantInput
        .closest(".blueprint-variant-value-cell")
        ?.classList.toggle("is-multiline", textareaRows > 1);
      const [contextId, moduleId, groupId, rowIndex] =
        blueprintVariantInput.dataset.blueprintVariantValue.split("|");
      const { module } = findBlueprintModule(contextId, moduleId);
      const groups = module ? ensureBlueprintVariantGroups(module) : [];
      const group = groups.find((item) => item.id === groupId);
      const row = group?.rows[Number(rowIndex)];
      if (row) {
        row.value = blueprintVariantInput.value;
        if (row.moleculePropKey) {
          const syncedRows = getMoleculePropRows({ ...module, rows: group.rows });
          if (syncedRows?.length) group.rows = syncedRows;
          if (groups[0]?.id === groupId) module.rows = clone(group.rows);
          render();
          return;
        }
        if (groups[0]?.id === groupId) module.rows = clone(group.rows);
      }
      return;
    }

    const blueprintInput = event.target.closest("[data-blueprint-value]");
    if (blueprintInput) {
      const textareaRows = getBlueprintTextareaRows(blueprintInput.value);
      blueprintInput.rows = textareaRows;
      blueprintInput
        .closest(".blueprint-compact-field")
        ?.classList.toggle("is-multiline", textareaRows > 1);
      const [contextId, moduleId, rowIndex] = blueprintInput.dataset.blueprintValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const row = module?.rows[Number(rowIndex)];
      if (row) {
        row.value = blueprintInput.value;
        if (row.moleculePropKey) {
          syncMoleculeBlueprintRows(module);
          render();
          return;
        }
        if (module.inputScope === "activity") {
          contexts.forEach((candidateContext) => {
            const sharedModule = candidateContext.modules.find(
              (candidateModule) =>
                candidateModule.inputScope === "activity" &&
                candidateModule.slot === module.slot,
            );
            if (sharedModule?.rows[Number(rowIndex)]) {
              sharedModule.rows[Number(rowIndex)].value = blueprintInput.value;
            }
          });
        }
      }
      return;
    }

    const blueprintStateInput = event.target.closest("[data-blueprint-state-value]");
    if (blueprintStateInput) {
      const textareaRows = getBlueprintTextareaRows(blueprintStateInput.value);
      blueprintStateInput.rows = textareaRows;
      blueprintStateInput
        .closest(".blueprint-compact-field")
        ?.classList.toggle("is-multiline", textareaRows > 1);
      const [contextId, moduleId, stateId, rowIndex] =
        blueprintStateInput.dataset.blueprintStateValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const stateConfig = module?.states?.find((item) => item.id === stateId);
      const row = stateConfig?.rows[Number(rowIndex)];
      if (row) row.value = blueprintStateInput.value;
      return;
    }

    const demoPropInput = event.target.closest("[data-demo-prop-input]");
    if (demoPropInput && state.view === "guided-preview") {
      const found = getSelectedNodeInfo();
      if (found) {
        const propKey = demoPropInput.dataset.demoPropInput;
        found.node.props[propKey] = demoPropInput.value;
        syncGuidedInlineEditToSource(
          found,
          found.parent?.activeLineageVariantId || found.node.activeLineageVariantId || "base",
          propKey,
          demoPropInput.value,
        );
        const previewHost = document.querySelector(`[data-node-id="${found.node.id}"]`);
        if (previewHost) {
          previewHost.innerHTML = `
            <div class="guided-node-kind">${escapeHtml(moduleKindLabels[getModuleKind(found.node.schemaId)] || "模块")}</div>
            ${renderComponent(found.node)}
          `;
          window.renderReactMaterials?.();
        }
      }
      return;
    }

    const createName = event.target.closest("[data-create-activity-name]");
    if (createName) {
      state.createDraft.name = createName.value;
      return;
    }

    if (event.target.closest("[data-edit-activity-name]")) {
      state.activity.name = event.target.textContent.trim() || "未命名活动";
      return;
    }

    const pageName = event.target.closest("[data-edit-page-name]");
    if (pageName) {
      const page = state.pages.find((item) => item.id === pageName.dataset.editPageName);
      if (page) page.name = pageName.textContent.trim() || "未命名页面";
      updateCanvasZoom();
      renderStructureTree();
      return;
    }

    const pageDimension = event.target.closest("[data-edit-page-dimension]");
    if (pageDimension) {
      const page = state.pages.find((item) => item.id === pageDimension.dataset.editPageDimension);
      if (page) page.dimension = pageDimension.textContent.trim() || "未分组";
      renderStructureTree();
      return;
    }

    const dimensionName = event.target.closest("[data-edit-dimension]");
    if (dimensionName) {
      const oldName = dimensionName.dataset.editDimension;
      const nextName = dimensionName.textContent.trim() || "未分组";
      state.pages.forEach((page) => {
        if ((page.dimension || "未分组") === oldName) page.dimension = nextName;
      });
      dimensionName.dataset.editDimension = nextName;
      state.selectedDimension = nextName;
      renderStructureTree();
      return;
    }

    const pageTags = event.target.closest("[data-edit-page-tags]");
    if (pageTags) {
      const page = state.pages.find((item) => item.id === pageTags.dataset.editPageTags);
      if (page) {
        page.tags = pageTags.textContent
          .split(/[、,，/]+/)
          .map((tag) => tag.trim())
          .filter(Boolean);
      }
      renderStructureTree();
      return;
    }

    const canvasPicker = event.target.closest("[data-canvas-color-picker]");
    if (canvasPicker) {
      state.canvasBackground = canvasPicker.value;
      state.canvasColorPanelOpen = false;
      render();
      return;
    }

    const componentPicker = event.target.closest("[data-component-color-picker]");
    if (componentPicker) {
      const found = getSelectedNodeInfo();
      if (found) {
        state.selectedId = found.node.id;
        applyComponentColor(found.node, componentPicker.value);
        const activeVariant = found.node.variants?.find((item) => item.id === found.node.activeVariantId);
        if (activeVariant) {
          ["background", "textColor", "titleColor", "bodyColor", "priceColor"].forEach((key) => {
            if (key in found.node.props) activeVariant.props[key] = found.node.props[key];
          });
        }
        state.colorPanelOpen = false;
        render();
      }
      return;
    }

    const prop = event.target.closest("[data-edit-prop]");
    const variantProp = event.target.closest("[data-variant-prop]");
    const editingNodeId = prop?.closest("[data-node-id]")?.dataset.nodeId;
    const found = findNode(state.nodes, editingNodeId || state.selectedId);
    if (!found) return;

    if (prop) {
      const value = prop.textContent;
      const propKey = prop.dataset.editProp;
      found.node.props[propKey] = value;
      const activeVariant = found.node.variants?.find((item) => item.id === found.node.activeVariantId);
      if (activeVariant && propKey in activeVariant.props) {
        activeVariant.props[propKey] = value;
        const variantField = document.querySelector(`[data-variant-id="${activeVariant.id}"][data-variant-prop="${propKey}"]`);
        if (variantField) variantField.textContent = value;
      }
      syncGuidedInlineEditToSource(
        found,
        found.parent?.activeLineageVariantId || found.node.activeLineageVariantId || "base",
        propKey,
        value,
      );
      if (state.view === "guided-preview" && found.node?.isLotteryResultPopup) {
        syncLotteryPopupCurrentPrizeCopy(found.node);
        syncPopupPrizesToSourceLottery(found.node);
      }
      syncMeasuredComponentFrames();
      positionContextControls();
      return;
    }

    if (variantProp) {
      const variant = found.node.variants?.find((item) => item.id === variantProp.dataset.variantId);
      if (!variant) return;
      const value = variantProp.textContent;
      variant.props[variantProp.dataset.variantProp] = value;
      if (found.node.activeVariantId === variant.id) {
        found.node.props[variantProp.dataset.variantProp] = value;
        const canvasField = document.querySelector(`[data-node-id="${found.node.id}"] [data-edit-prop="${variantProp.dataset.variantProp}"]`);
        if (canvasField) canvasField.textContent = value;
      }
      syncGuidedInlineEditToSource(found, variant.id, variantProp.dataset.variantProp, value);
      positionContextControls();
    }
  });

  document.addEventListener("focusout", (event) => {
    if (event.target.closest("[data-edit-page-dimension], [data-edit-dimension]")) render();
  });

  document.addEventListener("input", (event) => {
    const nodePrizeNameInput = event.target.closest("[data-node-prize-name-input]");
    if (nodePrizeNameInput) {
      const found = getSelectedNodeInfo();
      const key = nodePrizeNameInput.dataset.nodePrizeNameInput;
      if (!found || !key) return;
      const childIndex = nodePrizeNameInput.dataset.nodePropChildIndex;
      const targetNode = childIndex === undefined
        ? found.node
        : found.node.children?.[Number(childIndex)];
      if (!targetNode?.props) return;
      const value = serializePrizeValueWithName(targetNode.props[key], nodePrizeNameInput.value);
      targetNode.props[key] = value;
      const activeVariant = targetNode.variants?.find((item) => item.id === targetNode.activeVariantId);
      if (activeVariant && key in activeVariant.props) activeVariant.props[key] = value;
      syncGuidedInlineEditToSource(
        childIndex === undefined ? found : { node: targetNode, parent: found.node },
        targetNode.activeLineageVariantId || found.node.activeLineageVariantId || "base",
        key,
        value,
      );
      refreshAfterGuidedNodePropChange();
      return;
    }

    const nodePrizeCopyInput = event.target.closest("[data-node-prize-copy-input]");
    if (nodePrizeCopyInput) {
      const found = getSelectedNodeInfo();
      const key = nodePrizeCopyInput.dataset.nodePrizeCopyInput;
      if (!found || !key) return;
      const childIndex = nodePrizeCopyInput.dataset.nodePropChildIndex;
      const targetNode = childIndex === undefined
        ? found.node
        : found.node.children?.[Number(childIndex)];
      if (!targetNode?.props) return;
      const value = serializePrizeValueWithCopy(targetNode.props[key], nodePrizeCopyInput.value);
      targetNode.props[key] = value;
      const activeVariant = targetNode.variants?.find((item) => item.id === targetNode.activeVariantId);
      if (activeVariant && key in activeVariant.props) activeVariant.props[key] = value;
      syncGuidedInlineEditToSource(
        childIndex === undefined ? found : { node: targetNode, parent: found.node },
        targetNode.activeLineageVariantId || found.node.activeLineageVariantId || "base",
        key,
        value,
      );
      refreshAfterGuidedNodePropChange();
      return;
    }

    const adminPrizeNameInput = event.target.closest("[data-admin-prize-name-prop]");
    if (adminPrizeNameInput) {
      const key = adminPrizeNameInput.dataset.adminPrizeNameProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithName(
        state.adminComponentVerifier.blueprint[key],
        adminPrizeNameInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const adminPrizeCopyInput = event.target.closest("[data-admin-prize-copy-prop]");
    if (adminPrizeCopyInput) {
      const key = adminPrizeCopyInput.dataset.adminPrizeCopyProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithCopy(
        state.adminComponentVerifier.blueprint[key],
        adminPrizeCopyInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const adminMoleculePrizeNameInput = event.target.closest("[data-admin-molecule-prize-name-prop]");
    if (adminMoleculePrizeNameInput) {
      const key = adminMoleculePrizeNameInput.dataset.adminMoleculePrizeNameProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithName(
        state.adminComponentVerifier.blueprint[key],
        adminMoleculePrizeNameInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const adminMoleculePrizeCopyInput = event.target.closest("[data-admin-molecule-prize-copy-prop]");
    if (adminMoleculePrizeCopyInput) {
      const key = adminMoleculePrizeCopyInput.dataset.adminMoleculePrizeCopyProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithCopy(
        state.adminComponentVerifier.blueprint[key],
        adminMoleculePrizeCopyInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const adminPagePrizeNameInput = event.target.closest("[data-admin-page-prize-name-prop]");
    if (adminPagePrizeNameInput) {
      const key = adminPagePrizeNameInput.dataset.adminPagePrizeNameProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithName(
        state.adminComponentVerifier.blueprint[key],
        adminPagePrizeNameInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const adminPagePrizeCopyInput = event.target.closest("[data-admin-page-prize-copy-prop]");
    if (adminPagePrizeCopyInput) {
      const key = adminPagePrizeCopyInput.dataset.adminPagePrizeCopyProp;
      if (!key) return;
      state.adminComponentVerifier.blueprint[key] = serializePrizeValueWithCopy(
        state.adminComponentVerifier.blueprint[key],
        adminPagePrizeCopyInput.value,
      );
      refreshAdminVerifierPreview();
      return;
    }

    const blueprintPrizeNameInput = event.target.closest("[data-blueprint-prize-name-value]");
    if (blueprintPrizeNameInput) {
      const [contextId, moduleId, rowIndex] = blueprintPrizeNameInput.dataset.blueprintPrizeNameValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const row = module?.rows[Number(rowIndex)];
      if (row) {
        const value = serializePrizeValueWithName(row.value, blueprintPrizeNameInput.value);
        row.value = value;
        if (module.inputScope === "activity") {
          contexts.forEach((candidateContext) => {
            const sharedModule = candidateContext.modules.find(
              (candidateModule) =>
                candidateModule.inputScope === "activity" &&
                candidateModule.slot === module.slot,
            );
            if (sharedModule?.rows[Number(rowIndex)]) {
              sharedModule.rows[Number(rowIndex)].value = value;
            }
          });
        }
      }
      return;
    }

    const blueprintPrizeCopyInput = event.target.closest("[data-blueprint-prize-copy-value]");
    if (blueprintPrizeCopyInput) {
      const [contextId, moduleId, rowIndex] = blueprintPrizeCopyInput.dataset.blueprintPrizeCopyValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const row = module?.rows[Number(rowIndex)];
      if (row) {
        const value = serializePrizeValueWithCopy(row.value, blueprintPrizeCopyInput.value);
        row.value = value;
        if (module.inputScope === "activity") {
          contexts.forEach((candidateContext) => {
            const sharedModule = candidateContext.modules.find(
              (candidateModule) =>
                candidateModule.inputScope === "activity" &&
                candidateModule.slot === module.slot,
            );
            if (sharedModule?.rows[Number(rowIndex)]) {
              sharedModule.rows[Number(rowIndex)].value = value;
            }
          });
        }
      }
      return;
    }

    const input = event.target.closest("[data-node-prop-input]");
    if (!input) return;
    const found = getSelectedNodeInfo();
    if (!found) return;

    const childIndex = input.dataset.nodePropChildIndex;
    const targetNode = childIndex === undefined
      ? found.node
      : found.node.children?.[Number(childIndex)];
    if (!targetNode?.props) return;

    const schema = targetNode.type === "molecule"
      ? moleculeSchemas.find((item) => item.id === targetNode.schemaId)
      : findAtomSchema(targetNode.schemaId);
    const field = (schema?.props || []).find((item) => (item.key || item.name) === input.dataset.nodePropInput);
    if (!field) return;

    let value;
    if (field.type === "boolean") {
      value = input.checked;
      const label = input.closest(".node-prop-switch")?.querySelector("span");
      if (label) label.textContent = value ? "开启" : "关闭";
    } else if (field.type === "number") {
      value = Number(input.value);
    } else {
      value = input.value;
    }

    targetNode.props[input.dataset.nodePropInput] = value;
    const activeVariant = targetNode.variants?.find((item) => item.id === targetNode.activeVariantId);
    if (activeVariant && input.dataset.nodePropInput in activeVariant.props) {
      activeVariant.props[input.dataset.nodePropInput] = value;
    }
    syncGuidedInlineEditToSource(
      childIndex === undefined ? found : { node: targetNode, parent: found.node },
      targetNode.activeLineageVariantId || found.node.activeLineageVariantId || "base",
      input.dataset.nodePropInput,
      value,
    );
    if (targetNode.type === "molecule") {
      syncDynamicMoleculeChildren(targetNode);
      applyThemeBoundVariantsToNodes([targetNode], getGuidedPageTheme(activePage()).id);
    }
    refreshAfterGuidedNodePropChange();
  });

  document.addEventListener("change", (event) => {
    const blueprintTemplateSelect = event.target.closest(
      "[data-prd-blueprint-template-select]",
    );
    if (blueprintTemplateSelect) {
      state.prdBlueprintPasteTemplateName = blueprintTemplateSelect.value;
      state.prdBlueprintPasteVersions = blueprintTemplateSelect.value
        ? ["人群1", "人群2", "人群3"]
        : normalizePrdBlueprintPasteVersions([]);
      state.prdBlueprintPasteRows = blueprintTemplateSelect.value
        ? createPrdBlueprintPasteTemplateRows(
            blueprintTemplateSelect.value,
            state.prdBlueprintPasteVersions,
          )
        : normalizePrdBlueprintPasteRows([]);
      state.prdBlueprintPasteError = "";
      render();
      return;
    }

    const adminVerifierType = event.target.closest("[data-admin-verifier-type]");
    if (adminVerifierType) {
      if (adminVerifierType.value === "molecule") {
        const molecule = moleculeSchemas.find((item) => item.id !== "MoleculeContainer");
        state.adminComponentVerifier = {
          type: "molecule",
          schemaId: molecule?.id || "",
          blueprint: {},
          childStates: {},
        };
      } else if (adminVerifierType.value === "page") {
        const pageTemplate = [...pageTemplates, ...customPageTemplates].find((item) => item.id !== "blank-page");
        state.adminComponentVerifier = {
          type: "page",
          schemaId: pageTemplate?.id || "",
          blueprint: {},
        };
      } else {
        const schema = atomSchemas[0];
        const variants = normalizeVariants(schema);
        const variantId = variants[0]?.id || null;
        state.adminComponentVerifier = {
          type: "atom",
          schemaId: schema.id,
          parentThemeId: getVariantThemeId(schema, variantId),
          variantId,
          blueprint: {},
        };
      }
      render();
      return;
    }

    const adminComponentSelect = event.target.closest("[data-admin-select-component]");
    if (adminComponentSelect) {
      if (getAdminVerifierType() === "page") {
        const pageTemplate = [...pageTemplates, ...customPageTemplates].find((item) => item.id === adminComponentSelect.value);
        if (!pageTemplate) return;
        state.adminComponentVerifier = {
          type: "page",
          schemaId: pageTemplate.id,
          blueprint: {},
        };
        render();
        return;
      }

      if (getAdminVerifierType() === "molecule") {
        const molecule = moleculeSchemas.find((item) => item.id === adminComponentSelect.value);
        if (!molecule) return;
        state.adminComponentVerifier = {
          type: "molecule",
          schemaId: molecule.id,
          blueprint: {},
          childStates: {},
        };
        render();
        return;
      }

      const schema = findAtomSchema(adminComponentSelect.value);
      if (!schema) return;
      const variants = normalizeVariants(schema);
      const variantId = variants[0]?.id || null;
      state.adminComponentVerifier = {
        type: "atom",
        schemaId: schema.id,
        parentThemeId: getVariantThemeId(schema, variantId),
        variantId,
        blueprint: {},
      };
      render();
      return;
    }

    const prdPrizeTableSelect = event.target.closest("[data-prd-prize-table-row]");
    if (prdPrizeTableSelect) {
      const rowIndex = Number(prdPrizeTableSelect.dataset.prdPrizeTableRow);
      if (state.prdTableRows[rowIndex]) {
        state.prdTableRows[rowIndex].value = prdPrizeTableSelect.value;
        state.prdTableBlueprint = null;
        state.prdTableBlueprintSignature = "";
        render();
      }
      return;
    }

    const adminPagePrizeSelect = event.target.closest("select[data-admin-page-blueprint-prop]");
    if (adminPagePrizeSelect) {
      const key = adminPagePrizeSelect.dataset.adminPageBlueprintProp;
      state.adminComponentVerifier.blueprint[key] = adminPagePrizeSelect.value;
      syncPrizeLibraryControl(adminPagePrizeSelect);
      refreshAdminVerifierPreview();
      return;
    }

    const adminMoleculePrizeSelect = event.target.closest("[data-admin-molecule-blueprint-prop]");
    if (adminMoleculePrizeSelect) {
      const key = adminMoleculePrizeSelect.dataset.adminMoleculeBlueprintProp;
      state.adminComponentVerifier.blueprint[key] = adminMoleculePrizeSelect.value;
      syncPrizeLibraryControl(adminMoleculePrizeSelect);
      refreshAdminVerifierPreview();
      return;
    }

    const adminPrizeSelect = event.target.closest("[data-admin-prize-prop]");
    if (adminPrizeSelect) {
      const key = adminPrizeSelect.dataset.adminPrizeProp;
      state.adminComponentVerifier.blueprint[key] = adminPrizeSelect.value;
      syncPrizeLibraryControl(adminPrizeSelect);
      refreshAdminVerifierPreview();
      return;
    }

    const blueprintPrizeSelect = event.target.closest("[data-blueprint-prize-value]");
    if (blueprintPrizeSelect) {
      const [contextId, moduleId, rowIndex] = blueprintPrizeSelect.dataset.blueprintPrizeValue.split("|");
      const contexts = getBlueprintContexts();
      const context = contexts.find((item) => item.id === contextId);
      const module = context?.modules.find((item) => item.id === moduleId);
      const row = module?.rows[Number(rowIndex)];
      if (row) {
        row.value = blueprintPrizeSelect.value;
        syncPrizeLibraryControl(blueprintPrizeSelect);
        if (module.inputScope === "activity") {
          contexts.forEach((candidateContext) => {
            const sharedModule = candidateContext.modules.find(
              (candidateModule) =>
                candidateModule.inputScope === "activity" &&
                candidateModule.slot === module.slot,
            );
            if (sharedModule?.rows[Number(rowIndex)]) {
              sharedModule.rows[Number(rowIndex)].value = blueprintPrizeSelect.value;
            }
          });
        }
      }
      return;
    }

    const demoPackage = event.target.closest("[data-demo-package]");
    if (demoPackage) {
      state.selectedDemoPackageId = demoPackage.dataset.demoPackage;
      render();
      return;
    }

    const nodePropInput = event.target.closest("[data-node-prop-input]");
    if (nodePropInput) {
      const found = getSelectedNodeInfo();
      const childIndex = nodePropInput.dataset.nodePropChildIndex;
      const targetNode = childIndex === undefined
        ? found?.node
        : found?.node.children?.[Number(childIndex)];
      const schema = targetNode ? findAtomSchema(targetNode.schemaId) : null;
      const field = (schema?.props || []).find((item) => (item.key || item.name) === nodePropInput.dataset.nodePropInput);
      if (isPrizePropField(field)) syncPrizeLibraryControl(nodePropInput);
      nodePropInput.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    const pageType = event.target.closest("[data-page-type]");
    if (!pageType) return;
    const value = pageType.dataset.pageType;
    if (pageType.checked) {
      if (!state.createDraft.pageTypes.includes(value)) state.createDraft.pageTypes.push(value);
    } else {
      state.createDraft.pageTypes = state.createDraft.pageTypes.filter((item) => item !== value);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !event.repeat && !event.target.closest("input, textarea, select, [contenteditable='true']")) {
      state.spaceDown = true;
      event.preventDefault();
      return;
    }
    const editingField = event.target.closest("input, textarea, select, [contenteditable='true']");
    if (state.view !== "workbench") return;
    if (!["Delete", "Del", "Backspace"].includes(event.key) || editingField || !state.selectedId) return;

    event.preventDefault();
    event.stopPropagation();
    removeNode(state.selectedId);
    state.selectedId = null;
    render();
  }, true);

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") state.spaceDown = false;
  });

  document.addEventListener("mousedown", startPointerDrag);
  document.addEventListener("mousemove", movePointerDrag);
  document.addEventListener("mouseup", endPointerDrag);
  window.addEventListener("resize", () => {
    invalidateStageRect();
    positionContextControls();
  });
  bindCanvasStageInteractions($(".workspace .device-stage"));
}

function bindCanvasStageInteractions(stage) {
  if (!stage || stage.dataset.canvasInteractionsBound === "true") return;
  stage.dataset.canvasInteractionsBound = "true";
  stage.addEventListener("scroll", positionContextControls);
  let zoomRafId = null;
  let pendingWheel = null;
  let zoomEndTimer = null;
  let zoomFinishRafId = null;

  stage.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      pendingWheel = {
        deltaX: event.deltaX,
        deltaY: event.deltaY,
        ctrlKey: event.ctrlKey,
        clientX: event.clientX,
        clientY: event.clientY,
      };
      if (!window.__isZooming) {
        getStageRect();
        window.__isZooming = true;
      }
      if (zoomEndTimer) clearTimeout(zoomEndTimer);
      zoomEndTimer = setTimeout(() => {
        window.__isZooming = false;
        if (zoomFinishRafId) cancelAnimationFrame(zoomFinishRafId);
        zoomFinishRafId = requestAnimationFrame(() => {
          zoomFinishRafId = null;
          updateCanvasZoom();
          invalidateStageRect();
        });
      }, 150);
      if (zoomRafId) return;
      zoomRafId = requestAnimationFrame(() => {
        zoomRafId = null;
        if (!pendingWheel) return;
        const w = pendingWheel;
        pendingWheel = null;
        if (w.ctrlKey) {
          zoomCanvas({
            deltaY: w.deltaY,
            clientX: w.clientX,
            clientY: w.clientY,
          });
        } else {
          state.canvasPanX -= w.deltaX;
          state.canvasPanY -= w.deltaY;
          updateCanvasZoom();
        }
      });
    },
    { passive: false },
  );
}

function startPointerDrag(event) {
  const lineageMap = event.target.closest("[data-guided-lineage-map]");
  const lineageBlocked = event.target.closest("button, input, textarea, select, [contenteditable='true']");
  if (lineageMap && event.button === 0 && !lineageBlocked) {
    state.guidedLineagePanDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originX: state.guidedLineagePanX,
      originY: state.guidedLineagePanY,
    };
    event.preventDefault();
    return;
  }

  const stage = event.target.closest(".device-stage");
  const material = event.target.closest("[data-material-id]");
  const guidedAddMolecule = state.view === "guided-preview"
    ? event.target.closest("[data-guided-add-molecule]")
    : null;
  const rootNode =
    state.view === "guided-preview"
      ? null
      : event.target.closest(".node-wrap.root");
  const moleculeChild =
    state.view === "guided-preview"
      ? null
      : event.target.closest(".molecule-child");
  const editingField = event.target.closest("input, textarea, select, [contenteditable='true']");
  const blocked =
    event.target.closest(
      ".quick-toolbar, .variant-inspector, .richtext-editor, .topbar, [data-delete-molecule], .placement-case-carousel",
    ) || (editingField && !guidedAddMolecule);
  const guidedBlankCanvas =
    stage?.classList.contains("guided-device-stage") &&
    !event.target.closest(
      ".guided-node, .guided-floating-panel, .guided-bottom-nav, .guided-page-title-node, .guided-page-shell, .guided-phone, .guided-device-stage [data-page-id], button",
    );
  if (
    stage &&
    !blocked &&
    (event.button === 1 ||
      (event.button === 0 && (state.spaceDown || guidedBlankCanvas)))
  ) {
    state.canvasPanDrag = {
      startX: event.clientX,
      startY: event.clientY,
      originX: state.canvasPanX,
      originY: state.canvasPanY,
    };
    event.preventDefault();
    return;
  }
  if (event.button !== 0 || blocked || (!material && !rootNode && !moleculeChild && !guidedAddMolecule)) return;

  const sourcePage = (rootNode || moleculeChild)?.closest("[data-page-id]");
  if (sourcePage) setActivePage(sourcePage.dataset.pageId);

  const targetNode = rootNode || moleculeChild;
  const nodeId = targetNode?.dataset.nodeId;
  const nodeLabel = targetNode?.querySelector(".node-label")?.textContent;
  const guidedMoleculeName =
    guidedAddMolecule?.querySelector("strong")?.textContent ||
    moleculeSchemas.find((item) => item.id === guidedAddMolecule?.dataset.guidedAddMolecule)?.name;

  state.pointerDrag = {
    kind: guidedAddMolecule ? "guided-molecule" : material ? "material" : "node",
    schemaId: guidedAddMolecule?.dataset.guidedAddMolecule || material?.dataset.materialId,
    type: guidedAddMolecule ? "molecule" : material?.dataset.type,
    nodeId: nodeId,
    sourcePageId: sourcePage?.dataset.pageId,
    label: guidedAddMolecule ? guidedMoleculeName : material ? material.querySelector("strong")?.textContent : nodeLabel || "组件",
    startX: event.clientX,
    startY: event.clientY,
    active: false,
    ghost: null,
  };
}

function movePointerDrag(event) {
  if (state.guidedLineagePanDrag) {
    state.guidedLineagePanX = state.guidedLineagePanDrag.originX + event.clientX - state.guidedLineagePanDrag.startX;
    state.guidedLineagePanY = state.guidedLineagePanDrag.originY + event.clientY - state.guidedLineagePanDrag.startY;
    updateGuidedLineageTransform();
    event.preventDefault();
    return;
  }

  if (state.canvasPanDrag) {
    state.canvasPanX = state.canvasPanDrag.originX + event.clientX - state.canvasPanDrag.startX;
    state.canvasPanY = state.canvasPanDrag.originY + event.clientY - state.canvasPanDrag.startY;
    updateCanvasZoom();
    event.preventDefault();
    return;
  }
  const drag = state.pointerDrag;
  if (!drag) return;

  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.active && distance < 6) return;

  if (!drag.active) {
    drag.active = true;
    state.suppressClick = true;
    drag.ghost = document.createElement("div");
    drag.ghost.className = "drag-ghost";
    drag.ghost.textContent = drag.kind === "node" ? `移动 ${drag.label}` : `添加 ${drag.label}`;
    document.body.appendChild(drag.ghost);
  }

  event.preventDefault();
  drag.ghost.style.left = `${event.clientX + 12}px`;
  drag.ghost.style.top = `${event.clientY + 12}px`;

  const page = pageFromPoint(event);
  const nextPageId = page?.dataset.pageId || null;
  let nextMoleculeId = null;
  let nextChildIndex = null;

  if (nextPageId && drag.kind !== "guided-molecule") {
    const moleculeId = moleculeFromPoint(event);
    if (moleculeId) {
      const moleculeInfo = findNode(state.nodes, moleculeId);
      if (moleculeInfo) {
        nextMoleculeId = moleculeId;
        nextChildIndex = getMoleculeDropIndex(event, moleculeId);
      }
    }
  }

  const nextIndex = nextPageId && !nextMoleculeId ? getDropIndex(event, nextPageId) : null;

  if (
    state.dropIndex !== nextIndex ||
    state.dropPageId !== nextPageId ||
    state.dropMoleculeId !== nextMoleculeId ||
    state.dropChildIndex !== nextChildIndex
  ) {
    state.dropIndex = nextIndex;
    state.dropPageId = nextPageId;
    state.dropMoleculeId = nextMoleculeId;
    state.dropChildIndex = nextChildIndex;
    if (nextPageId) state.activePageId = nextPageId;
    if (state.view === "guided-preview") renderGuidedPreview();
    else renderCanvas();
    updateCanvasZoom();
  }
}

function endPointerDrag(event) {
  if (state.guidedLineagePanDrag) {
    state.guidedLineagePanDrag = null;
    event.preventDefault();
    return;
  }

  if (state.canvasPanDrag) {
    state.canvasPanDrag = null;
    event.preventDefault();
    return;
  }
  const drag = state.pointerDrag;
  if (!drag) return;

  if (drag.ghost) drag.ghost.remove();

  if (drag.active) {
    if (state.dropPageId) state.activePageId = state.dropPageId;

    if (state.dropMoleculeId && state.dropChildIndex !== null) {
      if (drag.kind === "material" && drag.type === "atom") {
        addAtomToMolecule(drag.schemaId, state.dropMoleculeId, state.dropChildIndex);
      } else if (drag.kind === "node") {
        moveNodeToMolecule(drag.nodeId, state.dropMoleculeId, state.dropChildIndex);
      }
    } else if (state.dropIndex !== null) {
      if (drag.kind === "guided-molecule") {
        const inserted = insertGuidedMoleculeAt(
          state.dropPageId || state.activePageId,
          state.dropIndex,
          drag.schemaId,
        );
        if (inserted) {
          state.guidedPanelMode = null;
        }
      } else if (drag.kind === "material") {
        addMaterial(drag.schemaId, drag.type, state.dropIndex);
      } else {
        moveRootNode(drag.nodeId, state.dropIndex, drag.sourcePageId, state.activePageId);
        state.selectedId = drag.nodeId;
        state.colorPanelOpen = false;
        state.variantPanelOpen = false;
      }
    }
  }

  state.pointerDrag = null;
  state.dropIndex = null;
  state.dropPageId = null;
  state.dropMoleculeId = null;
  state.dropChildIndex = null;
  if (drag.active) render();
  if (!drag.active) return;
  window.setTimeout(() => {
    state.suppressClick = false;
  }, 0);
  event.preventDefault();
}

function mount() {
  $("#app").innerHTML = `
    <main class="app-shell">
      <header class="topbar">
        <div class="brand">
          <strong>H5 Visual Builder</strong>
          <span>活动 / 页面 / 分子 / 原子</span>
        </div>
        <div class="top-actions">
          <button data-back-home>活动中心</button>
          <button data-save class="save-btn">保存</button>
        </div>
      </header>
      <section class="activity-center"></section>
      <section class="workspace">
        <aside class="panel">
          <div class="panel-tabs">
            <button class="panel-tab active" data-panel-tab="materials">物料库</button>
            <button class="panel-tab" data-panel-tab="structure">结构树</button>
          </div>
          <section class="library-panel" data-panel-content="materials">
            <div class="panel-head compact">
              <div class="panel-title">物料库</div>
              <div class="panel-subtitle">拖拽物料到画布。</div>
            </div>
            <div class="library-switch">
              <button class="library-tab active" data-library="materials">物料库</button>
              <button class="library-tab" data-library="templates">模板库</button>
            </div>
            <div class="tabs">
              <button class="tab active" data-tab="atom">原子组件</button>
              <button class="tab" data-tab="molecule">分子组件</button>
            </div>
            <div class="material-list"></div>
          </section>
          <section class="structure-panel" data-panel-content="structure" style="display:none;">
            <div class="structure-tree"></div>
          </section>
        </aside>
        <section class="canvas-wrap" tabindex="-1">
          <div class="canvas-toolbar">
            <strong>H5 画布</strong>
            <div class="canvas-toolbar-actions">
              <button class="add-page-button" data-add-page>新增页面</button>
              <div class="canvas-color-control"></div>
              <span class="meta"></span>
            </div>
          </div>
          <div class="device-stage">
            <div class="pages-row"></div>
          </div>
        </section>
      </section>
      <div class="quick-toolbar"></div>
      <div class="page-save-float"></div>
      <aside class="variant-inspector"></aside>
      <aside class="richtext-editor"></aside>
      <div class="page-template-modal-container"></div>
      <div class="code-modal">
        <div class="code-box">
          <div class="code-head">
            <strong>导出</strong>
            <button data-close-modal>关闭</button>
          </div>
          <pre></pre>
        </div>
      </div>
    </main>
  `;
  bindEvents();
  render();
}

mount();

export {};
