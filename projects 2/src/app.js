import { getFontEmbedCSS, toBlob as exportNodeToBlob } from "html-to-image";

const _schemaModules = import.meta.glob('../*/schema.json', { eager: true, as: 'json' });
const _cssVarModules = import.meta.glob('../*/index.module.scss', { eager: true, query: '?raw', import: 'default' });
const navigationBarSvgUrl = new URL("../导航栏/顶栏.svg", import.meta.url).href;
const contentModuleImageUrl = new URL("../内容模块.png", import.meta.url).href;
const contentModuleImage2Url = new URL("../内容模块2.png", import.meta.url).href;
const mockPrizeLibrary = [
  {
    id: "traffic_coupon_5",
    name: "5元流量券",
    image: new URL("../九宫格-奖品库/5元流量券.png", import.meta.url).href,
  },
  {
    id: "traffic_coupon_6",
    name: "6元流量券",
    image: new URL("../九宫格-奖品库/6元流量券.png", import.meta.url).href,
  },
  {
    id: "traffic_coupon_10",
    name: "10元流量券",
    image: new URL("../九宫格-奖品库/10元流量券.png", import.meta.url).href,
  },
  {
    id: "official_recommendation",
    name: "DOU+官方推荐机会",
    image: new URL("../九宫格-奖品库/dou+官方推荐机会.png", import.meta.url).href,
  },
  {
    id: "douzi_merch",
    name: "DOU仔周边",
    image: new URL("../九宫格-奖品库/dou仔周边.png", import.meta.url).href,
  },
  {
    id: "douzi_family_pack",
    name: "DOU仔周边全家福",
    image: new URL("../九宫格-奖品库/dou仔周边全家福.png", import.meta.url).href,
  },
  {
    id: "douzi_canvas_bag",
    name: "DOU仔周边帆布包",
    image: new URL("../九宫格-奖品库/dou仔周边帆布包.png", import.meta.url).href,
  },
  {
    id: "douzi_keychain",
    name: "DOU仔挂件",
    image: new URL("../九宫格-奖品库/dou仔挂件.png", import.meta.url).href,
  },
  {
    id: "douzi_doll",
    name: "DOU仔玩偶",
    image: new URL("../九宫格-奖品库/dou仔玩偶.png", import.meta.url).href,
  },
  {
    id: "coupon_pack",
    name: "券包",
    image: new URL("../九宫格-奖品库/券包.png", import.meta.url).href,
  },
  {
    id: "jianying_vip",
    name: "剪映VIP",
    image: new URL("../九宫格-奖品库/剪映vip.png", import.meta.url).href,
  },
  {
    id: "traffic_support",
    name: "流量扶持",
    image: new URL("../九宫格-奖品库/流量扶持.png", import.meta.url).href,
  },
  {
    id: "points",
    name: "积分",
    image: new URL("../九宫格-奖品库/积分.png", import.meta.url).href,
  },
];

function _normalizeDynamicSchema(path, rawSchema) {
  const dirName = path.split('/').slice(-2)[0];
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
    id: rawSchema.id || dirName,
    name: rawSchema.title || rawSchema.name || dirName,
    type: 'atom',
    description: rawSchema.description || '',
    reactComponent: rawSchema.reactComponent || dirName,
    dimensions: rawSchema.dimensions || null,
    props,
    category: rawSchema.category || '未分类',
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

const BUILT_IN_MOLECULE_SCHEMAS = [
  {
    id: "核心权益模块-bigday发券-样式1",
    name: "核心权益模块-bigday发券-样式1",
    type: "molecule",
    description: "由标题、Bigday 发券样式 3、补充说明组成。",
    children: [
      ["模块标题-正常", {}],
      ["发券-样式3", {}],
      ["说明文-补充说明", {}],
    ],
  },
  {
    id: "核心权益模块-bigday发券-样式2",
    name: "核心权益模块-bigday发券-样式2",
    type: "molecule",
    description: "由标题、通知、Bigday 发券样式 4 组成。",
    children: [
      ["模块标题-正常", {}],
      ["通知", {}],
      ["发券-样式4", {}],
    ],
  },
  {
    id: "核心玩法模块-消返-1-3列",
    name: "核心玩法模块-消返-1-3列",
    type: "molecule",
    description: "由标题、3 列抽奖消返、数据条、活动规则样式 1 组成。",
    children: [
      ["模块标题-正常", {}],
      ["抽奖+消耗返3-3个券", {}],
      ["横排按钮数据条", {}],
      ["正文-活动规则样式1", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖消返-3列",
    name: "核心玩法模块-抽奖消返-3列",
    type: "molecule",
    description: "由标题、3 列抽奖消返、数据条、活动规则样式 3 组成。",
    children: [
      ["模块标题-正常", {}],
      ["抽奖+消耗返3-3个券", {}],
      ["横排按钮数据条", {}],
      ["正文-活动规则样式3", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖消返-4列",
    name: "核心玩法模块-抽奖消返-4列",
    type: "molecule",
    description: "由标题、4 列消耗返、数据条、活动规则样式 3 组成。",
    children: [
      ["模块标题-正常", {}],
      ["消耗返样式4个券", {}],
      ["横排按钮数据条", {}],
      ["正文-活动规则样式3", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖-未报名",
    name: "核心玩法模块-抽奖-未报名",
    type: "molecule",
    description: "由标题、通知、九宫格抽奖报名前组成。",
    children: [
      ["模块标题-正常", {}],
      ["通知", {}],
      ["抽奖九宫格-报名前", {}],
    ],
  },
  {
    id: "核心玩法模块-抽奖-已报名",
    name: "核心玩法模块-抽奖-已报名",
    type: "molecule",
    description: "由标题、通知、九宫格抽奖报名后组成。",
    children: [
      ["模块标题-正常", {}],
      ["通知", {}],
      ["抽奖九宫格-报名后", {}],
    ],
  },
  {
    id: "投稿赢流量-样式2",
    name: "投稿赢流量-样式2",
    type: "molecule",
    description: "由标题和活动规则样式 2 组成。",
    children: [
      ["模块标题-正常", {}],
      ["正文-活动规则样式2", {}],
    ],
  },
];

const BUILT_IN_MOLECULE_IDS = BUILT_IN_MOLECULE_SCHEMAS.map((item) => item.id);
const moleculeSchemas = [...BUILT_IN_MOLECULE_SCHEMAS];

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
const LEGACY_PRD_PAGE_TEMPLATE_NAME = "页面1";
const CONSUMPTION_RETURN_PAGE_TEMPLATE_NAME = "抽奖+消耗返";
const COUPON_PAGE_TEMPLATE_NAME = "发券";
const PRD_PAGE_TEMPLATE_ALIASES = {
  发券: ["发券", "页面1"],
  抽奖: ["抽奖"],
  无激励单纯攻略: ["无激励单纯攻略"],
};
const customPageTemplates = [];

function normalizePageTemplateLookupName(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/＋/g, "+")
    .replace(/消耗返回/g, "消耗返")
    .toLowerCase();
}

function getCustomPageTemplateTimestamp(template) {
  const match = String(template?.id || "").match(/custom_page_(\d+)/);
  return Number(match?.[1] || 0);
}

function repairCustomPageTemplateNames(templates) {
  let repaired = false;
  const consumptionReturnTemplates = templates.filter(
    (item) =>
      normalizePageTemplateLookupName(item?.name) ===
      normalizePageTemplateLookupName(CONSUMPTION_RETURN_PAGE_TEMPLATE_NAME),
  );
  if (consumptionReturnTemplates.length > 1) {
    const latest = [...consumptionReturnTemplates].sort(
      (a, b) => getCustomPageTemplateTimestamp(b) - getCustomPageTemplateTimestamp(a),
    )[0];
    if (latest) {
      latest.name = COUPON_PAGE_TEMPLATE_NAME;
      repaired = true;
    }
  }

  templates.forEach((item) => {
    if (
      normalizePageTemplateLookupName(item?.name) ===
      normalizePageTemplateLookupName(LEGACY_PRD_PAGE_TEMPLATE_NAME)
    ) {
      item.name = COUPON_PAGE_TEMPLATE_NAME;
      repaired = true;
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
    ([key]) => normalizePageTemplateLookupName(key) === normalizedType,
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
        nodes: (template.nodes || []).map(createTemplateNode).filter(Boolean),
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
    { title: "活动信息", fields: ["页面类型", "活动名称", "活动时间", { label: "活动目标", size: "wide" }] },
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
];

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
  if (labeled.length) return labeled.slice(0, 8);
  return [...source.matchAll(/(?:满\s*\d+\s*(?:送|赠)\s*\d+|送满\s*\d+\s*赠\s*\d+|\d+\s*元|DOU仔[^，,；;\n\s]+)/g)]
    .map((match) => match[0].trim())
    .filter(Boolean)
    .slice(0, 8);
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
    variantGroups: [{ id: "base", name: "默认文案", rows: clone(baseRows) }],
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
      .filter(Boolean)
      .slice(0, 8);
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
      row.value = prize;
      row.propKey = propKey;
    } else {
      nextRows.push({
        field: `奖品${index + 1}`,
        propKey,
        value: prize,
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
    /(?:页面|活动|模板)?类型\s*[:：]/.test(String(row?.key || "")) ||
    /^(?:页面|活动|模板)?类型\s*[:：]/.test(value)
  );
}

function normalizePrdPageTypeValue(value) {
  return String(value || "")
    .split(/[\n\r,，;；]/)[0]
    .trim()
    .replace(/^["'“‘]|["'”’]$/g, "");
}

function getPrdPageTemplateType(rows = []) {
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
    name: "活力粉",
    background: "#FFE0E9",
    primary: "#FF1372",
    secondary: "#FF8DB8",
    filter: "none",
  },
  {
    id: "coral",
    name: "珊瑚红",
    background: "#FFF0F0",
    primary: "#F04438",
    secondary: "#FF9B8F",
    filter: "hue-rotate(-18deg) saturate(0.94)",
  },
  {
    id: "apricot",
    name: "暖杏橙",
    background: "#FFF4E8",
    primary: "#F79009",
    secondary: "#FDBA74",
    filter: "hue-rotate(-48deg) saturate(0.88)",
  },
  {
    id: "mint",
    name: "清新绿",
    background: "#ECFDF3",
    primary: "#12B76A",
    secondary: "#6CE9A6",
    filter: "hue-rotate(92deg) saturate(0.72)",
  },
  {
    id: "sky",
    name: "晴空蓝",
    background: "#EFF6FF",
    primary: "#2E90FA",
    secondary: "#84CAFF",
    filter: "hue-rotate(178deg) saturate(0.7)",
  },
  {
    id: "violet",
    name: "柔雾紫",
    background: "#F5F3FF",
    primary: "#7F56D9",
    secondary: "#BDB4FE",
    filter: "hue-rotate(235deg) saturate(0.72)",
  },
  {
    id: "rose",
    name: "浅玫瑰",
    background: "#FFEAF2",
    primary: "#E31B54",
    secondary: "#FDA4AF",
    filter: "hue-rotate(10deg) saturate(0.9)",
  },
  {
    id: "neutral",
    name: "简洁白",
    background: "#F8FAFC",
    primary: "#344054",
    secondary: "#98A2B3",
    filter: "saturate(0.12)",
  },
  {
    id: "night",
    name: "深夜黑",
    background: "#111827",
    primary: "#475467",
    secondary: "#98A2B3",
    filter: "hue-rotate(178deg) saturate(0.34) brightness(0.9)",
  },
];
const canvasColorChoices = guidedPageThemePresets.map((theme) => theme.background);

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

function createAtomNode(schemaId, overrides = {}) {
  const schema = findAtomSchema(schemaId);
  const variants = normalizeVariants(schema);
  return {
    id: uid(),
    schemaId: schema?.id || schemaId,
    name: schema?.name || schemaId,
    type: "atom",
    activeVariantId: variants[0]?.id || null,
    variants,
    props: defaultProps(schemaId, overrides),
  };
}

function createMoleculeNode(moleculeId) {
  const schema = moleculeSchemas.find((item) => item.id === moleculeId);
  if (!schema) return null;
  return {
    id: uid(),
    schemaId: moleculeId,
    name: schema.name,
    type: "molecule",
    allowedChildren: schema.allowedChildren || null,
    className: schema.className || "",
    children: (schema.children || []).map(([schemaId, overrides]) => createAtomNode(schemaId, overrides)),
  };
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

function createTemplatePage(template, overrides = {}) {
  return {
    id: `page_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: overrides.name || template.name,
    dimension: overrides.dimension || "页面维度",
    tags: overrides.tags || [template.audience, template.goal],
    nodes: template.nodes.map(createTemplateNode),
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
            nodes = JSON.parse(JSON.stringify(template.nodes || []));
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
    nodes: (template.nodes || []).map(createTemplateNode),
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
      ? [...atomSchemas]
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
        const badge = "";
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
              <em>选择文件，或粘贴 PRD 文本</em>
            </button>
            <div class="prd-tool-footer">
              <span>DOCX</span>
              <span>PDF</span>
              <span>文本粘贴</span>
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
  return JSON.stringify({
    name: prize.name,
    image: prize.image,
  });
}

function serializePrizeValueWithName(value, name) {
  const parsed = parsePrizeValue(value);
  const trimmedName = String(name ?? "").trim();
  if (!parsed) return "";
  return JSON.stringify({
    name: trimmedName || parsed.name || "",
    image: parsed.image || "",
  });
}

function parsePrizeValue(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return {
        name: parsed.name || parsed.title || parsed.label || "",
        image: parsed.image || parsed.imageUrl || parsed.url || parsed.src || "",
      };
    }
  } catch {
    return { name: raw, image: "" };
  }
  return { name: raw, image: "" };
}

function renderPrizeLibrarySelect(value, dataAttr, ariaLabel, nameDataAttr = "") {
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
      ` : ""}
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
  if (!input && selectedPrize) {
    const childIndexAttr = select.dataset.nodePropChildIndex !== undefined
      ? ` data-node-prop-child-index="${escapeAttr(select.dataset.nodePropChildIndex)}"`
      : "";
    const nameAttr = select.dataset.adminPrizeProp
      ? `data-admin-prize-name-prop="${escapeAttr(select.dataset.adminPrizeProp)}"`
      : select.dataset.blueprintPrizeValue
        ? `data-blueprint-prize-name-value="${escapeAttr(select.dataset.blueprintPrizeValue)}"`
        : select.dataset.nodePropInput
          ? `data-node-prize-name-input="${escapeAttr(select.dataset.nodePropInput)}"${childIndexAttr}`
          : "";
    if (nameAttr) {
      select.insertAdjacentHTML(
        "afterend",
        `<input class="prize-library-name-input" type="text" ${nameAttr} aria-label="奖品名称" />`,
      );
      input = control.querySelector(".prize-library-name-input");
    }
  }
  if (input && selectedPrize) input.value = selectedPrize.name || "";
  if (input && !selectedPrize) input.remove();
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

function getAdminVerifierProps(schema, verifier) {
  const variant = getAdminVerifierVariant(schema, verifier);
  return {
    ...getSchemaDefaultValues(schema),
    ...(variant?.props || {}),
    ...(verifier.blueprint || {}),
  };
}

function getMoleculeBlueprintFieldCount(molecule) {
  return (molecule.children || []).reduce((sum, [schemaId, overrides = {}]) => {
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

  const schema = getAdminVerifierSchema();
  if (!schema) {
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

  const verifier = ensureAdminVerifierState(schema);
  const props = getAdminVerifierProps(schema, verifier);
  const textPropKeys = Array.isArray(schema.blueprint?.textProps) ? schema.blueprint.textProps : [];
  const textProps = getPropEntries(schema).filter(([key]) => textPropKeys.includes(key));
  const blueprintVariableLabel = textProps.some(([, field]) => isPrizePropField(field))
    ? `${textProps.length} 个蓝图变量`
    : `${textProps.length} 个文字变量`;
  const colorProps = getPropEntries(schema).filter(([, field]) => field.type === "color");
    const fontEntries = getSchemaFontEntries(schema);
    const missingFontCount = fontEntries.filter((font) => font.source?.status && font.source.status !== "exact").length;
  const variants = normalizeVariants(schema);
  const theme = guidedPageThemePresets.find((item) => item.id === verifier.parentThemeId) || guidedPageThemePresets[0];
  const width = Number(schema.dimensions?.width || 702);
  const height = Number(schema.dimensions?.height || 160);
  const isAutoHeight = schema.heightMode === "auto";
  const preview = renderAtomPreview(schema.id, props);
    const exportPreview = renderAtomPreview(schema.id, getCutExportProps(schema.id, props));

  center.innerHTML = `
    <section class="admin-shell admin-verifier-shell">
      <nav class="admin-nav">
        <button class="admin-back" data-back-admin>← 返回后台</button>
        <span>组件验收</span>
      </nav>

      <header class="admin-hero admin-verifier-head">
        <span>COMPONENT QA</span>
        <div class="admin-verifier-title-row">
          <h1>${escapeHtml(schema.name)}</h1>
          <label class="admin-verifier-component-select">
            <span>验收组件</span>
            <select data-admin-select-component>
              ${atomSchemas.map((item) => `
                <option value="${escapeAttr(item.id)}" ${item.id === schema.id ? "selected" : ""}>
                  ${escapeHtml(item.name || item.id)}
                </option>
              `).join("")}
            </select>
          </label>
        </div>
        <p>固定检查蓝图输入、组件文案、父级色系联动和最终导出切图。</p>
      </header>

      <section class="admin-verifier-grid">
        <aside class="admin-verifier-panel">
          <section class="admin-verifier-block">
            <header>
              <strong>蓝图同步</strong>
              <span>${blueprintVariableLabel}</span>
            </header>
            <div class="admin-verifier-fields">
              ${textProps.map(([key, field]) => {
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
              }).join("")}
            </div>
          </section>

          <section class="admin-verifier-block">
            <header>
              <strong>父级色系</strong>
              <span>${escapeHtml(theme.name)}</span>
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
          </section>

          <section class="admin-verifier-block">
            <header>
              <strong>颜色变量</strong>
              <span>${colorProps.length} 个</span>
            </header>
            <div class="admin-verifier-color-list">
              ${colorProps.map(([key, field]) => `
                <div>
                  <i style="background:${escapeAttr(props[key] || field.default || "#ffffff")}"></i>
                  <span>${escapeHtml(field.label || key)}</span>
                  <code>${escapeHtml(props[key] || field.default || "")}</code>
                </div>
              `).join("")}
            </div>
          </section>

            <section class="admin-verifier-block">
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
            </section>
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
                <span>${isAutoHeight ? `${width}px 宽，自适应高度` : `${width} x ${height}px`}，透明背景</span>
              </div>
              <button type="button" data-admin-export-cut>下载 PNG</button>
            </header>
            <div class="admin-export-canvas">
              <div
                class="admin-export-capture"
                data-admin-export-cut-capture
                style="width:${width}px;${isAutoHeight ? `min-height:${height}px` : `height:${height}px`}"
                >${exportPreview}</div>
            </div>
          </section>
        </main>
      </section>
      ${renderAdminMoleculeVerifierSection()}
    </section>
  `;

  mountPreviewDetailReactMaterials();
}

function refreshAdminVerifierPreview() {
  const schema = getAdminVerifierSchema();
  if (!schema) return;
  const verifier = ensureAdminVerifierState(schema);
  const liveProps = getAdminVerifierProps(schema, verifier);
  const exportProps = getCutExportProps(schema.id, liveProps);
  const liveTarget = document.querySelector(".admin-verifier-component");
  const exportTarget = document.querySelector("[data-admin-export-cut-capture]");
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

function renderPrdFileModal() {
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
            placeholder="例如：&#10;类型：抽奖+消耗返&#10;活动名称：夏日消耗返活动&#10;活动目标：提升报名与现金消耗"
            data-prd-text-input
          >${escapeHtml(state.prdTextInput)}</textarea>
          <div class="prd-text-import-actions">
            <span class="${state.prdTextError ? "error" : ""}">
              ${escapeHtml(state.prdTextError || "粘贴后将转换为可编辑的 PRD 信息表")}
            </span>
            <button type="button" data-prd-text-submit>使用文本 PRD</button>
          </div>
        </div>
        <div class="prd-file-divider"><span>或输入飞书文档链接</span></div>
        <div class="prd-feishu-import">
          <div class="prd-text-import-head">
            <div>
              <strong>飞书文档链接</strong>
              <span>目前仅支持公开文档，非公开文档后续支持</span>
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
              ${escapeHtml(state.prdFeishuError || "请使用已公开分享的飞书文档链接")}
            </span>
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
  state.prdDemoStep = "parsing";
  if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
    state.selectedBlueprintAudienceId =
      getPrdTableBlueprint().audiences[0]?.id || "prd-table-page";
  } else if (state.selectedDemoPackageId === demoTimeActivityPackage.id) {
    state.selectedBlueprintSceneId = demoTimeActivityPackage.scenes[0].id;
  } else {
    state.selectedBlueprintAudienceId = demoActivityPackage.audiences[0].id;
  }
  render();
  prdParseTimer = window.setTimeout(() => {
    if (state.view !== "prd-demo" || state.prdDemoStep !== "parsing") return;
    state.prdDemoStep = "analysis";
    render();
  }, 1500);
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
  const hasModuleBoundForm =
    pageTemplate && getPageTemplateBlueprintFormModules(moduleItems).length > 1;

  return `
    <section class="blueprint-confirm blueprint-overview${returningClass}">
      <header class="blueprint-minimal-head">
        <div>
          <span>PRD 解析结果</span>
          <h1>确认活动策略</h1>
          <p>${hasModuleBoundForm ? "按页面模板模块列出需要填写的文字变量，用户补齐后再进入预览。" : `左侧是「${escapeHtml(pageType || "未识别类型")}」命中的页面模板模块；右侧是 PRD 输入表格里的具体信息，有值展示、没值留空。`}</p>
        </div>
        <button class="blueprint-side-generate" data-demo-generate-activity>
          <span>确认并预览</span>
          <b>→</b>
        </button>
      </header>

      ${hasModuleBoundForm ? `
        ${renderPageBlueprintBasicInfo({ templateName: pageTemplate.name })}
        ${renderModuleBoundBlueprintTable({
          templateName: pageTemplate.name,
          moduleItems,
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

function renderPageBlueprintBasicInfo({ templateName }) {
  const form = hydrateModuleBoundBlueprintForm(pageBlueprintFormConfig, { templateName });
  const fields = form.versions?.[0]?.sections?.[0]?.fields || [];
  return `
    <section class="prd-basic-info-panel">
      <header>
        <div>
          <span>活动基础信息</span>
          <strong>先确认页面类型与活动信息</strong>
        </div>
        <em>独立于页面模块，不参与模块编排</em>
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
  if (moduleConfig.moduleName !== "任务列表模块") return moduleConfig.sections;
  const taskCount = getPrdTaskListCount(state.prdTableRows);
  return Array.from({ length: taskCount }, (_, index) => {
    const taskNumber = index + 1;
    return {
      title: `任务${taskNumber}`,
      className: "is-task-card",
      fields: [
        `任务${taskNumber}标题`,
        `任务${taskNumber}奖励类型`,
        `任务${taskNumber}奖励数量`,
        `任务${taskNumber}每日次数`,
        `任务${taskNumber}按钮文案`,
        { label: `任务${taskNumber}描述`, size: "wide" },
      ],
    };
  });
}

function hydrateModuleBoundBlueprintSections({ moduleConfig, templateName, version }) {
  return moduleConfig.sections.map((section) => ({
    ...section,
    fields: section.fields.map((field) => {
      const normalizedField =
        typeof field === "string" ? { label: field } : field;
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
          versionName: version.name,
          dimensionTitle: version.dimensionTitle,
          defaultValue,
        }),
      };
    }),
  }));
}

function getModuleBoundBlueprintVersions(moduleConfig) {
  const manualVersions = getManualModuleBlueprintVersions(moduleConfig.moduleName);
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

  return appendManualVersions([{ id: "base", name: "默认版本", defaults: {} }]);
}

function getManualModuleBlueprintVersions(moduleName) {
  return (state.prdManualModuleVersions?.[moduleName] || []).map((version, index) => ({
    id: version.id || `manual_${index + 1}`,
    name: version.name || `自定义版本 ${index + 1}`,
    defaults: {},
    isManual: true,
  }));
}

function addManualModuleBlueprintVersion(moduleName) {
  if (!moduleName || moduleName === "页面基础信息") return;
  if (!state.prdManualModuleVersions) state.prdManualModuleVersions = {};
  const versions = state.prdManualModuleVersions[moduleName] || [];
  const nextIndex = versions.length + 1;
  versions.push({
    id: `manual_${Date.now()}_${nextIndex}`,
    name: `自定义版本 ${nextIndex}`,
  });
  state.prdManualModuleVersions[moduleName] = versions;
  state.prdTableBlueprint = null;
  state.prdTableBlueprintSignature = "";
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
  if (moduleConfig.moduleName === "任务列表模块") {
    const taskDefaults = getTaskListFieldDefaultsFromPrd(state.prdTableRows);
    if (Object.prototype.hasOwnProperty.call(taskDefaults, label)) {
      return taskDefaults[label] || "";
    }
  }
  return "";
}

function renderModuleBoundBlueprintGroup(group, index = 0) {
  const hasMultipleVersions = (group.versions || []).length > 1;
  return `
    <section class="prd-variable-module-row ${hasMultipleVersions ? "has-versions" : ""}">
      <article class="prd-variable-module-name">
        <div class="prd-variable-module-kicker">
          <i>${String(index + 1).padStart(2, "0")}</i>
          <span>页面模块</span>
        </div>
        <strong>${escapeHtml(group.moduleName)}</strong>
        <div class="prd-variable-module-meta">
          ${hasMultipleVersions ? `<b>${group.versions.length} 个版本</b>` : `<b>默认版本</b>`}
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
  return `
    <section
      class="prd-variable-version-matrix"
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
        <span>字段</span>
        ${versions.map((version) => `
          <strong>
            ${escapeHtml(version.name)}
            ${version.dimensionTitle ? `<em>${escapeHtml(version.dimensionTitle)}</em>` : ""}
          </strong>
        `).join("")}
      </div>
      ${baseSections.map((section, sectionIndex) =>
        renderModuleBoundBlueprintMatrixSection(section, sectionIndex, versions),
      ).join("")}
    </section>
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

function renderModuleBoundBlueprintMatrixSection(section, sectionIndex, versions) {
  const className = section.className ? ` ${section.className}` : "";
  return `
    <section class="prd-variable-matrix-section${className}">
      <strong>${escapeHtml(section.title)}</strong>
      <div class="prd-variable-matrix-rows">
        ${(section.fields || []).map((field, fieldIndex) =>
          renderModuleBoundBlueprintMatrixRow(field, {
            sectionIndex,
            fieldIndex,
            versions,
          }),
        ).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintMatrixRow(baseField, { sectionIndex, fieldIndex, versions }) {
  return `
    <div class="prd-variable-matrix-row">
      <span>${escapeHtml(baseField.label)}</span>
      ${versions.map((version) => {
        const field = version.sections?.[sectionIndex]?.fields?.[fieldIndex] || baseField;
        return renderModuleBoundBlueprintMatrixCell(field);
      }).join("")}
    </div>
  `;
}

function renderModuleBoundBlueprintMatrixCell(field) {
  const row = state.prdTableRows[field.rowIndex] || { value: "" };
  return `
    <textarea
      rows="${Math.min(2, getBlueprintTextareaRows(row.value))}"
      aria-label="${escapeAttr(field.label)}"
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
  return `
    <section class="prd-variable-section${className}">
      <strong>${escapeHtml(section.title)}</strong>
      <div class="prd-variable-field-grid">
        ${section.fields.map(renderModuleBoundBlueprintField).join("")}
      </div>
    </section>
  `;
}

function renderModuleBoundBlueprintField(field) {
  const row = state.prdTableRows[field.rowIndex] || { value: "" };
  const sizeClass = field.size ? ` is-${field.size}` : "";
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
        name: node.name || schema?.name || node.schemaId || `模块 ${index + 1}`,
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
  return schema?.name || normalized;
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
        name: "默认文案",
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
  if (!molecule?.children?.length) return null;

  return molecule.children.flatMap(([schemaId, overrides = {}], childIndex) => {
    const schema = findAtomSchema(schemaId);
    const childName = schema?.name || schemaId;
    const propEntries = schema
      ? getPropEntries(schema)
      : Object.keys(overrides).map((key) => [key, { key, label: key, type: "string", default: "" }]);

    return propEntries
      .filter(([key, field]) => {
        const value = overrides[key] ?? field.default;
        return isCopyPropField(key, field, value);
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
      ? clone(prdPageTemplate.nodes || [])
      : generatedNodes;
    replaceGuidedLotteryNodesWithInteractive(nodes);
    if (prdPageTemplate) {
      bindPrdModuleVariantsToTemplateNodes(
        nodes,
        context.modules,
        prdTableBlueprint?.consumptionProgressConfig,
        prdTableBlueprint?.taskListConfig,
        state.prdTableRows,
      );
    }
    ensureGuidedLotteryPopupNodes(nodes);
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
      canvasBackground,
      navBarEnabled: prdPageTemplate
        ? Boolean(prdPageTemplate.navBarEnabled)
        : false,
      nodes,
    };
  });
  state.activity = {
    name: isPrdTablePackage ? prdTableBlueprint.activityName : demoPrdBlueprint.activityName,
    note: isPrdTablePackage
      ? prdPageTemplate
        ? `PRD 文本 → ${prdPageType} 页面模板`
        : "PRD 文本 → 页面模块"
      : "PRD mock → 活动包 → 人群页面",
  };
  const fallbackPage = createGuidedFallbackPage();
  state.pages = [...pages, fallbackPage];
  state.activePageId = pages[0]?.id || fallbackPage.id;
  state.guidedVisiblePageIds = [
    ...(pages[0] ? [pages[0].id] : []),
    fallbackPage.id,
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

function createGuidedFallbackPage() {
  return {
    id: `page_fallback_${Date.now()}`,
    name: "兜底页面",
    dimension: "兜底页面",
    tags: ["系统页面", "兜底状态"],
    canvasBackground: "#FFE0E9",
    colorThemeId: "pink",
    navBarEnabled: false,
    isSystemFallback: true,
    nodes: [],
  };
}

function isLotteryGridNode(node) {
  return false;
}

function createLotteryAnnouncementMoleculeFromNode(sourceNode) {
  return sourceNode;
}

function replaceGuidedLotteryNodesWithInteractive(nodes = [], insideMolecule = false) {
  return nodes;
}

function collectInteractiveLotteryGridNodes(nodes = [], result = []) {
  nodes.forEach((node) => {
    if (node?.schemaId === "LotteryGridInteractive") result.push(node);
    collectInteractiveLotteryGridNodes(node?.children || [], result);
  });
  return result;
}

function createGuidedLotteryPopupNode(lotteryNode) {
  const prizeName = lotteryNode?.props?.prize1 || "抖仔盲盒";
  const resultTitle = lotteryNode?.props?.resultTitle || "恭喜抽中{prize}！";
  const popupNode = createAtomNode("抽奖弹窗", {
    hintText: lotteryNode?.props?.resultHintText || "快去填写地址吧~",
    titleText: resultTitle.replace(/\{prize\}/g, prizeName),
    buttonText: lotteryNode?.props?.resultButtonText || "填写地址",
    badgeText: lotteryNode?.props?.resultBadgeText || "？",
  });
  popupNode.name = "抽奖结果弹窗";
  popupNode.canvasPlacement = "page-side";
  popupNode.sourceLotteryNodeId = lotteryNode?.id || null;
  return popupNode;
}

function ensureGuidedLotteryPopupNodes(nodes = []) {
  const existingSourceIds = new Set(
    nodes
      .filter((node) => node.canvasPlacement === "page-side")
      .map((node) => node.sourceLotteryNodeId)
      .filter(Boolean),
  );
  collectInteractiveLotteryGridNodes(nodes).forEach((lotteryNode) => {
    if (existingSourceIds.has(lotteryNode.id)) return;
    nodes.push(createGuidedLotteryPopupNode(lotteryNode));
  });
}

function findLotteryGridNode(nodes = []) {
  for (const node of nodes) {
    if (isLotteryGridNode(node)) return node;
    const nested = findLotteryGridNode(node.children || []);
    if (nested) return nested;
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
  rows.forEach((row) => {
    if (/^prize[1-8](Name)?$/.test(row.propKey || "")) {
      lotteryNode.props[row.propKey] = row.value;
    }
  });
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
    底部按钮文案: "text",
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
    ? { id: "base", title: "默认版本", props }
    : { id: "base", title: "默认版本", props: {} };
}

function ensureDefaultVersionGroupForManualVersions(groups, rows, moduleName) {
  const hasManualVersion = (state.prdManualModuleVersions?.[moduleName] || []).length > 0;
  if (!hasManualVersion || !groups.length) return groups;
  if (groups.some((group) => group.id === "base" || group.title === "默认版本")) return groups;
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
  return { id: "base", title: "默认版本", values };
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
  if (hasManualVersion && groups.length && !groups.some((group) => group.id === "base")) {
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
    text: value("底部按钮文案"),
  });
}

function bindPrdModuleVariantsToTemplateNodes(
  nodes,
  modules = [],
  consumptionProgressConfig = null,
  taskListConfig = null,
  structuredRows = [],
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
    if (typeof row.childIndex !== "number" || !row.propKey) return;
    const child = node.children?.[row.childIndex];
    if (child?.props && row.propKey in child.props) {
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
          state.guidedPanelMode && (selected || state.guidedPanelMode === "page")
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
  return `
    <section class="guided-page-shell ${companionNodes.length ? "has-side-companion" : ""} ${pageData.isSystemFallback ? "is-system-fallback" : ""} ${isActive ? "active" : ""} ${pageSelected ? "has-selected-page" : ""}">
      <div class="phone guided-phone">
        <div
          class="page guided-theme-page ${pageData.isSystemFallback ? "guided-fallback-page" : ""}"
          data-page-id="${pageData.id}"
          data-page-theme="${escapeAttr(getGuidedPageTheme(pageData).id)}"
          style="${escapeAttr(getGuidedPageThemeStyle(pageData))}"
        >
          ${pageNodes.map((node) => renderGuidedNode(node)).join("")}
          ${pageData.navBarEnabled ? renderPageNavBarOverlay() : ""}
        </div>
      </div>
      ${
        companionNodes.length
          ? `
            <aside
              class="guided-page-companion"
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
  return `
    <div
      class="page guided-theme-page guided-fallback-page guided-export-fallback-page"
      style="background:${escapeAttr(background)};--guided-page-theme-filter:${escapeAttr(entry.pageTheme?.filter || "none")}"
    >
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

function renderGuidedNode(node) {
  const selected = state.selectedId === node.id ? "selected" : "";
  const kind = getModuleKind(node.schemaId);
  const isHero = kind === "hero";
  const isSideCompanion = node.canvasPlacement === "page-side";
  const canvasLayout = node.schemaId === "投放案例" ? "placement-case-canvas" : "";
  const content =
    node.schemaId === "投放案例"
      ? renderPlacementCaseCarousel(node)
      : renderComponent(node);
  const stateEntries = getGuidedStateEntries(node);
  const showStateMenu = state.guidedStateMenuNodeId === node.id && stateEntries.length;
  return `
    <section
      class="node-wrap root guided-node ${canvasLayout} ${selected}"
      data-select="${node.id}"
      data-node-id="${node.id}"
      aria-label="${escapeAttr(node.name || moduleKindLabels[kind] || "模块")}"
      tabindex="0"
    >
      <div class="guided-node-kind">${escapeHtml(isSideCompanion ? "弹窗原子" : moduleKindLabels[kind] || "模块")}</div>
      <div class="guided-node-actions">
        <button data-guided-action="global" data-guided-node="${node.id}" aria-label="编辑全局信息">
          <span>◎</span><i>查看模块变量</i>
        </button>
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
              <button data-guided-action="states" data-guided-node="${node.id}" aria-label="查看状态">
                <span>◇</span><i>查看状态</i>
              </button>
              ${
                showStateMenu
                  ? `
                    <div class="guided-node-state-popover">
                      ${stateEntries
                        .map(
                          (entry) => `
                            <button
                              class="${node.activeGuidedStateId === entry.id ? "active" : ""}"
                              data-guided-inline-state="${escapeAttr(entry.id)}"
                              data-guided-node="${node.id}"
                            >
                              ${entry.id === "default" ? "点击前" : "点击后"}
                            </button>
                          `,
                        )
                        .join("")}
                    </div>
                  `
                  : ""
              }
            `
        }
      </div>
      <div class="guided-node-theme-content">${content}</div>
    </section>
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
  host.innerHTML = state.guidedPanelMode && (selected || shouldRenderPagePanel)
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
        title: "默认文案",
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
    moduleGroupId: target.moduleGroupId,
    moduleGroupRole: target.moduleGroupRole,
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
  const fallbackNames = ["九宫格", "消耗返1"];
  return [
    ...saved.map((item) => ({ id: item.id, name: item.name, schema: item })),
    ...fallbackNames
      .filter((name) => !saved.some((item) => String(item.name).includes(name)))
      .map((name) => ({ id: `fallback:${name}`, name, schema: null })),
  ];
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

  const isFallback = optionId.startsWith("fallback:");
  const optionName = isFallback
    ? optionId.slice("fallback:".length)
    : moleculeSchemas.find((item) => item.id === optionId)?.name || "";
  let node;
  if (isFallback) {
    const childSchemaId = optionName === "九宫格" ? "LotteryGridInteractive" : "TaskModule";
    node = {
      id: uid(),
      schemaId: `demo_${optionName}`,
      name: optionName,
      type: "molecule",
      children: [createAtomNode(childSchemaId)],
    };
  } else {
    node = createMoleculeNode(optionId);
  }

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

function applyGuidedBusinessState(node, stateId) {
  const stateEntry = node?.guidedStates?.find((item) => item.id === stateId);
  if (!node || !stateEntry) return false;
  const stateNode = stateEntry.node;
  node.schemaId = stateNode.schemaId;
  node.name = stateEntry.name;
  node.type = stateNode.type;
  node.props = clone(stateNode.props);
  node.variants = clone(stateNode.variants || []);
  node.activeVariantId = stateNode.activeVariantId || null;
  node.activeGuidedStateId = stateEntry.id;
  return true;
}

function renderGuidedMoleculePreview(item) {
  if (item.imageUrl) {
    return `<img class="guided-content-option-image" src="${escapeAttr(item.imageUrl)}" alt="${escapeAttr(item.name)}" />`;
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

function applyThemeBoundVariantsToNodes(nodes = [], themeId) {
  nodes.forEach((node) => {
    if (node.type === "atom") {
      const schema = findAtomSchema(node.schemaId);
      const boundVariant = normalizeVariants(schema).find((variant) => {
        const rawVariant = (schema?.variants || []).find(
          (item) => (item.id || item.key) === variant.id,
        );
        return rawVariant?.themeBinding?.parentThemeId === themeId;
      });
      if (boundVariant) {
        node.activeVariantId = boundVariant.id;
        node.props = { ...defaultProps(node.schemaId), ...(node.props || {}), ...boundVariant.props };
      }
    }
    if (node.children?.length) applyThemeBoundVariantsToNodes(node.children, themeId);
  });
}

function applyGuidedPageTheme(themeId) {
  const page = activePage();
  const theme = guidedPageThemePresets.find((item) => item.id === themeId);
  if (!page || !theme) return;
  page.colorThemeId = theme.id;
  page.canvasBackground = theme.background;
  applyThemeBoundVariantsToNodes(page.nodes, theme.id);
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
          ${guidedPageThemePresets
            .map(
              (item) => `
                <button
                  class="${item.id === theme.id ? "active" : ""}"
                  style="background:linear-gradient(135deg, ${escapeAttr(item.primary)} 0 50%, ${escapeAttr(item.secondary)} 50% 100%)"
                  data-guided-page-theme="${escapeAttr(item.id)}"
                  aria-label="使用${escapeAttr(item.name)}色系"
                  title="${escapeAttr(item.name)}"
                ></button>
              `,
            )
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
          ? "查看模块变量"
          : mode === "page"
            ? "页面设置"
            : "AI 修改头图";
  let body = "";

  if (mode === "page") {
    body = renderGuidedPageEditor(activePage());
  } else if (mode === "global") {
    body = renderGuidedGlobalEditor(node);
  } else if (mode === "replace") {
    const isContentModule = node.schemaId === "ContentModuleImage";
    const options = isContentModule
      ? getGuidedContentOptions()
      : getGuidedMoleculeOptions();
    body = `
      <p>${isContentModule ? "选择一个内容模块，替换后保留当前页面位置。" : "仅展示已保存的分子组件，替换后保留当前页面位置。"}</p>
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
                  <span>${item.imageUrl ? "内容模块" : item.schema ? "已保存分子" : "示意分子"}</span>
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
    const variantEntries = getGuidedVariantEntries(node);
    body = stateEntries.length || variantEntries.length
      ? `
        <p>这里展示组件包含的全部状态。点击后状态会以弹窗内容形式呈现。</p>
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
      : mode === "page"
        ? "is-page"
        : "";

  return `
      <aside
        class="guided-floating-panel guided-operation-panel ${panelModeClass} ${options.enter ? "is-entering" : ""} ${mode === "global" ? `is-global is-lineage ${lineageVersionClass}` : ""}"
        role="dialog"
        aria-label="${escapeAttr(title)}"
      >
      <header>
        <div>
          <span>${escapeHtml(mode === "page" ? activePage().dimension || activePage().name : node.name)}</span>
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
  const children = schema.children || [];
  const moleculeClass = schema.className ? ` ${schema.className}` : "";
  const previewStyle =
    schema.className === "task-list-module"
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
  if (schema?.id === "StickyBottomButton" || node.schemaId === "StickyBottomButton" || node.schemaId === "置底按钮" || node.name === "置底按钮") {
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
  const fitSizeStyle = isAutoHeight
    ? `--component-width:${width}px;--component-height:${height}px;min-height:${height}px;height:auto;`
    : `--component-width:${width}px;--component-height:${height}px`;
  const hostSizeStyle = isAutoHeight
    ? `width:${width}px;min-height:${height}px;height:auto;`
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
  const children = node.children || [];
  const editableChildren = children
    .map((child, index) => {
      const schema = findAtomSchema(child.schemaId);
      const props = (schema?.props || []).filter((item) => !item.isCssVar);
      return { child, index, props };
    })
    .filter((item) => item.props.length);

  if (!editableChildren.length) {
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

  const total = editableChildren.reduce((sum, item) => sum + item.props.length, 0);
  panel.innerHTML = `
    <div class="inspector-head">
      <div>
        <strong>分子变量</strong>
        <span>${escapeHtml(node.name)} · ${total} 项</span>
      </div>
    </div>
    <div class="node-prop-list molecule-prop-list">
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
  return node?.schemaId || node?.name || "模块";
}

function getExportEntryNode(entry) {
  const rule = getGuidedCutExportRule(entry?.sourceNode || entry?.node);
  const node = cloneNodeForLineage(entry?.node || entry?.sourceNode || {});
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

function sanitizeExportFilename(value) {
  return String(value || "module")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, "_")
    .slice(0, 80);
}

function getExportEntryDimensions(entry) {
  if (entry?.dimensions) {
    return {
      width: Number(entry.dimensions.width || 750),
      height: Number(entry.dimensions.height || 300),
    };
  }
  const node = entry?.node || entry?.sourceNode || {};
  const schema = findAtomSchema(node.schemaId || node.name);
  return {
    width: Number(schema?.dimensions?.width || 750),
    height: Number(schema?.dimensions?.height || 300),
  };
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
  const width = Math.ceil(element.scrollWidth || element.offsetWidth);
  const height = Math.ceil(element.scrollHeight || element.offsetHeight);
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
        dimensions: { width: 750, height: 1334 },
        filePath: [
          sanitizeExportFilename(page.name || page.id || "兜底页面"),
          sanitizeExportFilename(moduleFolderTitle),
          sanitizeExportFilename(dimensionTitle),
          `${sanitizeExportFilename(variantTitle)}.png`,
        ].join("/"),
      }];
    }

    return (page.nodes || []).flatMap((node, nodeIndex) => {
      const { base, graph } = ensureGuidedLineageTree(node);
      return (graph.nodes || []).map((graphNode, variantIndex) => {
        const variant = findLineageVariant(node, graphNode.variantId) || base;
        const dimensionTitle = getExportDimensionTitle(graph, graphNode);
        const moduleTitle = getExportNodeTitle(node);
        const moduleFolderTitle = `${String(nodeIndex + 1).padStart(2, "0")}_${moduleTitle}`;
        const variantTitle = variant.title || `版本 ${variantIndex + 1}`;
        return {
          id: [
            page.id,
            node.id,
            graphNode.dimensionId || "dimension",
            variant.id || variantIndex,
          ].map(sanitizeExportFilename).join("__"),
          pageId: page.id,
          pageName: page.name || `页面 ${state.pages.indexOf(page) + 1}`,
          pageTheme: getGuidedPageTheme(page),
          nodeId: node.id,
          moduleTitle,
          moduleFolderTitle,
          dimensionTitle,
          variantTitle,
          sourceNode: node,
          node: variant.node,
          filePath: [
            sanitizeExportFilename(page.name || page.id || "页面"),
            sanitizeExportFilename(moduleFolderTitle),
            sanitizeExportFilename(dimensionTitle),
            `${sanitizeExportFilename(variantTitle)}.png`,
          ].join("/"),
        };
      });
    });
  });
}

function renderGuidedExportPreview(entry) {
  const { width, height } = getExportEntryDimensions(entry);
  const previewScale = width > 720 ? 0.44 : 0.46;
  const previewWidth = Math.ceil(width * previewScale);
  const previewHeight = Math.ceil(height * previewScale);
  const content = entry.exportKind === "fallback-page"
    ? renderGuidedFallbackExportPage(entry)
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
        style="width:${width}px;min-height:${height}px;--export-preview-scale:${previewScale};"
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
  return exportElementToPngBlob(element, options);
}

async function downloadGuidedExportEntry(entryId) {
  const entry = getExportEntryById(entryId);
  if (!entry) return;
  await waitForExportPreviewReady();
  try {
    const blob = await captureGuidedExportEntry(entry);
    downloadBlob(`${sanitizeExportFilename(entry.variantTitle)}.png`, blob);
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
        event.target.closest("[data-guided-action]")
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
      if (state.selectedDemoPackageId === PRD_TABLE_PACKAGE_ID) {
        state.selectedDemoPackageId = demoActivityPackage.id;
      }
      state.prdFileModalOpen = true;
      render();
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
          if (json.success && json.data && json.data.content) {
            state.prdTextInput = json.data.content;
            const rows = parsePrdPlainTextRows(state.prdTextInput);
            if (!rows.length) {
              state.prdFeishuError = "文档内容无法解析，请检查文档格式";
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
          state.prdFeishuError = "网络错误: " + e.message;
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

    const addModuleVersion = event.target.closest("[data-prd-add-module-version]");
    if (addModuleVersion) {
      addManualModuleBlueprintVersion(addModuleVersion.dataset.prdAddModuleVersion);
      render();
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
      const guidedActionNode = findNode(
        state.nodes,
        guidedAction.dataset.guidedNode,
      )?.node;
      if (guidedAction.dataset.guidedAction === "states") {
        state.guidedPanelMode = null;
        const nextStateMenuNodeId =
          state.guidedStateMenuNodeId === guidedAction.dataset.guidedNode
            ? null
            : guidedAction.dataset.guidedNode;
        state.guidedStateMenuNodeId = nextStateMenuNodeId;
        render();
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
      replacementNodes[0].id = found.node.id;
      [...indexes].sort((a, b) => b - a).forEach((index) => state.nodes.splice(index, 1));
      state.nodes.splice(insertIndex, 0, ...replacementNodes);
      state.selectedId = replacementNodes[0].id;
      state.guidedPanelMode = null;
      state.guidedStateMenuNodeId = null;
      render();
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
      if (found?.node && applyGuidedBusinessState(found.node, guidedInlineState.dataset.guidedInlineState)) {
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
      if (found?.node && applyGuidedBusinessState(found.node, guidedBusinessState.dataset.guidedBusinessState)) {
        render();
      }
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

    if (event.target.closest("[data-admin-export-cut]")) {
      const target = document.querySelector("[data-admin-export-cut-capture]");
      if (target) {
          const schema = getAdminVerifierSchema();
          const fileName = `${schema?.name || schema?.id || "组件切图"}.png`;
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

    const adminBlueprintInput = event.target.closest("[data-admin-blueprint-prop]");
    if (adminBlueprintInput) {
      const key = adminBlueprintInput.dataset.adminBlueprintProp;
      state.adminComponentVerifier.blueprint[key] = adminBlueprintInput.value;
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

    const prdTableRowInput = event.target.closest("[data-prd-table-row]");
    if (prdTableRowInput) {
      const rowIndex = Number(prdTableRowInput.dataset.prdTableRow);
      if (state.prdTableRows[rowIndex]) {
        state.prdTableRows[rowIndex].value = prdTableRowInput.value;
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
        found.node.props[demoPropInput.dataset.demoPropInput] = demoPropInput.value;
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
      found.node.props[prop.dataset.editProp] = value;
      const activeVariant = found.node.variants?.find((item) => item.id === found.node.activeVariantId);
      if (activeVariant && prop.dataset.editProp in activeVariant.props) {
        activeVariant.props[prop.dataset.editProp] = value;
        const variantField = document.querySelector(`[data-variant-id="${activeVariant.id}"][data-variant-prop="${prop.dataset.editProp}"]`);
        if (variantField) variantField.textContent = value;
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
      renderCanvas();
      renderStructureTree();
      renderPageSaveFloat();
      renderContextControls();
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

    const input = event.target.closest("[data-node-prop-input]");
    if (!input) return;
    const found = getSelectedNodeInfo();
    if (!found) return;

    const childIndex = input.dataset.nodePropChildIndex;
    const targetNode = childIndex === undefined
      ? found.node
      : found.node.children?.[Number(childIndex)];
    if (!targetNode?.props) return;

    const schema = findAtomSchema(targetNode.schemaId);
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
    renderCanvas();
    renderStructureTree();
    renderPageSaveFloat();
    renderContextControls();
  });

  document.addEventListener("change", (event) => {
    const adminComponentSelect = event.target.closest("[data-admin-select-component]");
    if (adminComponentSelect) {
      const schema = findAtomSchema(adminComponentSelect.value);
      if (!schema) return;
      const variants = normalizeVariants(schema);
      const variantId = variants[0]?.id || null;
      state.adminComponentVerifier = {
        schemaId: schema.id,
        parentThemeId: getVariantThemeId(schema, variantId),
        variantId,
        blueprint: {},
      };
      render();
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
    ) || editingField;
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
  if (event.button !== 0 || blocked || (!material && !rootNode && !moleculeChild)) return;

  const sourcePage = (rootNode || moleculeChild)?.closest("[data-page-id]");
  if (sourcePage) setActivePage(sourcePage.dataset.pageId);

  const targetNode = rootNode || moleculeChild;
  const nodeId = targetNode?.dataset.nodeId;
  const nodeLabel = targetNode?.querySelector(".node-label")?.textContent;

  state.pointerDrag = {
    kind: material ? "material" : "node",
    schemaId: material?.dataset.materialId,
    type: material?.dataset.type,
    nodeId: nodeId,
    sourcePageId: sourcePage?.dataset.pageId,
    label: material ? material.querySelector("strong")?.textContent : nodeLabel || "组件",
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
    drag.ghost.textContent = drag.kind === "material" ? `添加 ${drag.label}` : `移动 ${drag.label}`;
    document.body.appendChild(drag.ghost);
  }

  event.preventDefault();
  drag.ghost.style.left = `${event.clientX + 12}px`;
  drag.ghost.style.top = `${event.clientY + 12}px`;

  const page = pageFromPoint(event);
  const nextPageId = page?.dataset.pageId || null;
  let nextMoleculeId = null;
  let nextChildIndex = null;

  if (nextPageId) {
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
    renderCanvas();
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
      if (drag.kind === "material") {
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
