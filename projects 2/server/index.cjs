const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");
const session = require("express-session");
const { SupabaseSessionStore } = require("./supabase-session-store.cjs");
const { createHistoryRouter } = require("./history-routes.cjs");
const { createCollaborationRouter } = require("./collaboration-routes.cjs");
const { createAdminAccessRouter } = require("./admin-access.cjs");

try {
  process.loadEnvFile?.(path.join(__dirname, "..", ".env.local"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const app = express();
app.use(express.json({ limit: "10mb" }));
const execFileAsync = promisify(execFile);

const PORT = process.env.DEPLOY_RUN_PORT || process.env.PORT || 5050;
const HOST = "0.0.0.0";

const distDir = path.join(__dirname, "..", "dist");
const projectRoot = path.join(__dirname, "..");

// Session 配置（登录态存 Supabase，跨 FaaS 实例重启不丢失）
app.use(
  session({
    secret: process.env.SESSION_SECRET || "h5-builder-secret-key-change-in-production",
    store: new SupabaseSessionStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 天
    },
  })
);

// 白名单配置
const ALLOWED_EMPLOYEE_IDS = new Set([
  "6729972",
  "8202619",
]);

// 飞书 OAuth 配置
const FEISHU_APP_ID = process.env.FEISHU_APP_ID || process.env.LARK_APP_ID;
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || process.env.LARK_APP_SECRET;
const FEISHU_OPEN_API_BASE = process.env.FEISHU_OPEN_API_BASE || "https://open.feishu.cn";
const DEPLOY_BASE_URL = process.env.DEPLOY_BASE_URL || "https://doujiadacu.coze.bytedance.net";

// API routes
const apiRouter = express.Router();

// 认证中间件：检查用户是否已登录且在白名单中
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ success: false, error: "未登录" });
  }
  if (!ALLOWED_EMPLOYEE_IDS.has(req.session.user.employeeId)) {
    return res.status(403).json({ success: false, error: "无访问权限" });
  }
  next();
}

// 飞书 OAuth 登录：重定向到飞书授权页
apiRouter.get("/auth/login", (req, res) => {
  if (!FEISHU_APP_ID) {
    return res.status(500).json({ success: false, error: "未配置飞书应用" });
  }
  const redirectUri = `${DEPLOY_BASE_URL}/api/auth/callback`;
  const authUrl = `${FEISHU_OPEN_API_BASE}/open-apis/authen/v1/authorize?app_id=${FEISHU_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${req.query.state || ""}`;
  res.redirect(authUrl);
});

// 飞书 OAuth 回调：处理授权码，换取用户信息
apiRouter.get("/auth/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    if (!code) {
      return res.status(400).json({ success: false, error: "缺少授权码" });
    }

    console.log("OAuth 回调收到 code:", code);

    // 用 code 换取 user_access_token（10s 超时，避免挂起）
    let tokenResponse;
    try {
      tokenResponse = await fetch(`${FEISHU_OPEN_API_BASE}/open-apis/authen/v1/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          app_id: FEISHU_APP_ID,
          app_secret: FEISHU_APP_SECRET,
        }),
        signal: AbortSignal.timeout(10000),
      });
      console.log("access_token 请求返回 HTTP", tokenResponse.status);
    } catch (err) {
      const reason =
        err?.name === "TimeoutError" || err?.name === "AbortError"
          ? "请求超时（10s）"
          : `网络错误: ${err?.message || err}`;
      console.error("换取 access_token 失败:", reason);
      return res.status(502).json({ success: false, error: `换取 access_token 失败：${reason}` });
    }

    const tokenData = await tokenResponse.json();
    console.log("获取 access_token 响应:", JSON.stringify(tokenData, null, 2));
    
    if (tokenData.code !== 0) {
      console.error("获取 access_token 失败:", tokenData);
      return res.status(400).json({ 
        success: false, 
        error: `登录失败：${tokenData.msg || tokenData.error || "未知错误"}`,
        detail: tokenData 
      });
    }

    const accessToken = tokenData.data.access_token;

    // 用 access_token 获取用户信息（10s 超时，避免挂起）
    let userResponse;
    try {
      userResponse = await fetch(`${FEISHU_OPEN_API_BASE}/open-apis/authen/v1/user_info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(10000),
      });
      console.log("user_info 请求返回 HTTP", userResponse.status);
    } catch (err) {
      const reason =
        err?.name === "TimeoutError" || err?.name === "AbortError"
          ? "请求超时（10s）"
          : `网络错误: ${err?.message || err}`;
      console.error("获取用户信息失败:", reason);
      return res.status(502).json({ success: false, error: `获取用户信息失败：${reason}` });
    }

    const userData = await userResponse.json();
    if (userData.code !== 0) {
      console.error("获取用户信息失败:", userData);
      return res.status(400).json({ success: false, error: "获取用户信息失败" });
    }

    const userInfo = userData.data;
    req.session.user = {
      employeeId: userInfo.employee_no || userInfo.user_id,
      userId: userInfo.user_id,
      unionId: userInfo.union_id,
      openId: userInfo.open_id,
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar_url,
    };

    console.log("飞书用户信息获取成功:", req.session.user.name, req.session.user.employeeId);

    // 重定向回首页
    res.redirect(state || "/");
  } catch (error) {
    console.error("OAuth 回调错误:", error);
    res.status(500).json({ success: false, error: "登录失败" });
  }
});

// 获取当前登录用户信息
apiRouter.get("/auth/me", (req, res) => {
  if (!req.session.user) {
    return res.json({ success: true, data: null });
  }
  res.json({ success: true, data: req.session.user });
});

apiRouter.post("/auth/dev-login", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ success: false, error: "Not found" });
  }
  req.session.user = {
    employeeId: "6729972",
    userId: "local-user",
    unionId: "local-user",
    openId: "local-user",
    name: "本地用户",
    email: "",
    avatar: "",
  };
  res.json({ success: true, data: req.session.user });
});

// 登出
apiRouter.post("/auth/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

function resolveSessionUser(req) {
  const user = req.session?.user;
  if (!user) return null;
  return {
    id: String(
      user.employeeId || user.userId || user.unionId || user.openId || "",
    ).trim(),
    name: user.name || "",
    avatarUrl: user.avatar || user.avatarUrl || "",
  };
}

const ignoredComponentDirs = new Set([
  ".git",
  ".vite-cache",
  "dist",
  "node_modules",
  "server",
  "src",
  "scripts",
  "fonts",
  "icon库",
  "导航栏",
]);

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function listComponentManifests() {
  const entries = await fs.readdir(projectRoot, { withFileTypes: true });
  const components = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || ignoredComponentDirs.has(entry.name)) continue;
    const componentDir = path.join(projectRoot, entry.name);
    const schemaPath = path.join(componentDir, "schema.json");
    if (!(await pathExists(schemaPath))) continue;

    const schema = await readJsonFile(schemaPath);
    const assetDir = path.join(componentDir, "assets");
    const assets = (await pathExists(assetDir))
      ? (await fs.readdir(assetDir, { withFileTypes: true }))
          .filter((asset) => asset.isFile())
          .map((asset) => `assets/${asset.name}`)
      : [];

    components.push({
      id: schema.id || entry.name,
      name: schema.name || schema.title || entry.name,
      directoryName: entry.name,
      type: schema.type || "atom",
      category: schema.category || "未分类",
      description: schema.description || "",
      reactComponent: schema.reactComponent || entry.name,
      dimensions: schema.dimensions || null,
      props: schema.props || [],
      variants: schema.variants || [],
      blueprint: schema.blueprint || null,
      files: {
        schema: "schema.json",
        component: (await pathExists(path.join(componentDir, "index.tsx"))) ? "index.tsx" : null,
        style: (await pathExists(path.join(componentDir, "index.module.scss"))) ? "index.module.scss" : null,
        assets,
      },
    });
  }

  return components.sort((a, b) => String(a.name).localeCompare(String(b.name), "zh-CN"));
}

const FEISHU_DOCUMENT_HOSTS = [
  "feishu.cn",
  "larksuite.com",
  "larkoffice.com",
  "doubao.com",
];
const FEISHU_TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000;
let cachedFeishuTenantToken = null;

apiRouter.get("/components", async (req, res) => {
  try {
    const components = await listComponentManifests();
    res.json({
      success: true,
      data: {
        count: components.length,
        components,
      },
    });
  } catch (error) {
    console.error("GET /api/components error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

apiRouter.get("/components/:id", async (req, res) => {
  try {
    const components = await listComponentManifests();
    const normalizedId = String(req.params.id || "").replace(/\s+/g, "").toLowerCase();
    const component = components.find((item) =>
      [item.id, item.name, item.reactComponent].some(
        (value) => String(value || "").replace(/\s+/g, "").toLowerCase() === normalizedId,
      ),
    );
    if (!component) {
      return res.status(404).json({ success: false, error: "Component not found" });
    }

    const componentDir = path.join(projectRoot, component.directoryName || component.id);
    const sourcePath = path.join(componentDir, "index.tsx");
    const stylePath = path.join(componentDir, "index.module.scss");

    res.json({
      success: true,
      data: {
        ...component,
        source: (await pathExists(sourcePath)) ? await fs.readFile(sourcePath, "utf8") : "",
        style: (await pathExists(stylePath)) ? await fs.readFile(stylePath, "utf8") : "",
      },
    });
  } catch (error) {
    console.error("GET /api/components/:id error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

function parseFeishuDocumentUrl(rawUrl, depth = 0) {
  if (typeof rawUrl !== "string" || depth > 2) return null;

  const extractedUrl =
    rawUrl.trim().match(/https?:\/\/[^\s<>"']+/i)?.[0] || rawUrl.trim();
  const cleanedUrl = extractedUrl
    .replace(/[)\]】,，。；;]+$/g, "")
    .trim();
  if (!cleanedUrl) return null;

  let parsed;
  try {
    parsed = new URL(
      /^https?:\/\//i.test(cleanedUrl)
        ? cleanedUrl
        : `https://${cleanedUrl}`,
    );
  } catch {
    return null;
  }

  const hostname = parsed.hostname.toLowerCase();
  const isFeishuHost = FEISHU_DOCUMENT_HOSTS.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );
  if (!isFeishuHost) return null;

  const match = parsed.pathname.match(
    /^\/(docx|doc|docs|wiki)\/([a-zA-Z0-9_-]+)/i,
  );
  if (match) {
    return {
      url: parsed.toString(),
      type: match[1].toLowerCase(),
      token: match[2],
    };
  }

  const nestedUrl = ["url", "target_url", "redirect_url"]
    .map((key) => parsed.searchParams.get(key))
    .find(Boolean);
  return nestedUrl
    ? parseFeishuDocumentUrl(nestedUrl, depth + 1)
    : null;
}

function getFeishuUserAccessToken() {
  return (
    process.env.FEISHU_USER_ACCESS_TOKEN ||
    process.env.LARK_USER_ACCESS_TOKEN ||
    ""
  ).trim();
}

function getFeishuAppCredentials() {
  const appId = (
    process.env.FEISHU_APP_ID ||
    process.env.LARK_APP_ID ||
    ""
  ).trim();
  const appSecret = (
    process.env.FEISHU_APP_SECRET ||
    process.env.LARK_APP_SECRET ||
    ""
  ).trim();

  if ((appId && !appSecret) || (!appId && appSecret)) {
    throw new Error(
      "飞书应用配置不完整，请同时配置 FEISHU_APP_ID 和 FEISHU_APP_SECRET",
    );
  }
  return appId && appSecret ? { appId, appSecret } : null;
}

async function getFeishuTenantAccessToken(forceRefresh = false) {
  const credentials = getFeishuAppCredentials();
  if (!credentials) return "";

  if (
    !forceRefresh &&
    cachedFeishuTenantToken &&
    cachedFeishuTenantToken.expiresAt > Date.now()
  ) {
    return cachedFeishuTenantToken.value;
  }

  const apiBase =
    process.env.FEISHU_OPEN_API_BASE || "https://open.feishu.cn";
  const response = await fetch(
    `${apiBase}/open-apis/auth/v3/tenant_access_token/internal/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        app_id: credentials.appId,
        app_secret: credentials.appSecret,
      }),
    },
  );
  const result = await response.json().catch(() => null);
  if (
    !response.ok ||
    !result ||
    result.code !== 0 ||
    !result.tenant_access_token
  ) {
    throw new Error(
      `飞书应用鉴权失败：${
        result?.msg ||
        result?.message ||
        `${response.status} ${response.statusText}`
      }`,
    );
  }

  const expiresInMs = Math.max(Number(result.expire) || 7200, 60) * 1000;
  cachedFeishuTenantToken = {
    value: result.tenant_access_token,
    expiresAt:
      Date.now() +
      Math.max(expiresInMs - FEISHU_TOKEN_REFRESH_BUFFER_MS, 60 * 1000),
  };
  return cachedFeishuTenantToken.value;
}

async function getFeishuAccessToken() {
  const tenantToken = await getFeishuTenantAccessToken();
  if (tenantToken) return tenantToken;
  return getFeishuUserAccessToken();
}

function createCliEnv() {
  return process.env;
}

function extractEmbeddedSheetReferences(content = "") {
  return [...String(content).matchAll(/<sheet\b([^>]*)>/gi)]
    .map((match) => {
      const attributes = {};
      for (const attribute of match[1].matchAll(/([\w-]+)="([^"]*)"/g)) {
        attributes[attribute[1]] = attribute[2];
      }
      return {
        spreadsheetToken: attributes.token || "",
        sheetId: attributes["sheet-id"] || "",
      };
    })
    .filter((reference) => reference.spreadsheetToken && reference.sheetId);
}

async function fetchEmbeddedSheetTablesWithCli(content) {
  const references = extractEmbeddedSheetReferences(content);
  const tables = [];

  for (const reference of references) {
    const { stdout } = await execFileAsync(
      "lark-cli",
      [
        "sheets",
        "+table-get",
        "--spreadsheet-token",
        reference.spreadsheetToken,
        "--sheet-id",
        reference.sheetId,
        "--no-header",
        "--format",
        "json",
        "--as",
        "user",
      ],
      {
        env: createCliEnv(),
        timeout: 30000,
        maxBuffer: 1024 * 1024 * 10,
      },
    );
    const result = JSON.parse(stdout);
    const sheet = result?.data?.sheets?.[0];
    if (!Array.isArray(sheet?.data)) continue;
    tables.push(
      sheet.data.map((row) =>
        row.map((cell) => (cell == null ? "" : String(cell))),
      ),
    );
  }

  return tables;
}

async function fetchFeishuOpenApi(pathname, accessToken) {
  const apiBase =
    process.env.FEISHU_OPEN_API_BASE || "https://open.feishu.cn";
  const response = await fetch(`${apiBase}${pathname}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result || result.code !== 0) {
    const message =
      result?.msg ||
      result?.message ||
      `${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  return result.data || {};
}

function getFeishuBlockText(block) {
  const textPayload = [
    "page",
    "text",
    "heading1",
    "heading2",
    "heading3",
    "heading4",
    "heading5",
    "heading6",
    "heading7",
    "heading8",
    "heading9",
    "bullet",
    "ordered",
    "code",
    "quote",
    "todo",
  ]
    .map((key) => block?.[key])
    .find((value) => Array.isArray(value?.elements));
  if (!textPayload) return "";
  return textPayload.elements
    .map((element) => {
      if (typeof element?.text_run?.content === "string") {
        return element.text_run.content;
      }
      if (typeof element?.equation?.content === "string") {
        return element.equation.content;
      }
      return "";
    })
    .join("")
    .trim();
}

function extractFeishuTables(blocks = []) {
  const blockMap = new Map(
    blocks
      .filter((block) => block?.block_id)
      .map((block) => [block.block_id, block]),
  );

  const readDescendantText = (blockId, visited = new Set()) => {
    if (!blockId || visited.has(blockId)) return "";
    visited.add(blockId);
    const block = blockMap.get(blockId);
    if (!block) return "";
    const parts = [getFeishuBlockText(block)];
    (block.children || []).forEach((childId) => {
      parts.push(readDescendantText(childId, visited));
    });
    return parts.filter(Boolean).join("\n").trim();
  };

  return blocks
    .filter((block) => block?.block_type === 31 && block?.table)
    .map((block) => {
      const rowCount = Number(block.table?.property?.row_size) || 0;
      const columnCount = Number(block.table?.property?.column_size) || 0;
      const cellIds = block.table?.cells || block.children || [];
      if (!rowCount || !columnCount || !cellIds.length) return [];
      return Array.from({ length: rowCount }, (_, rowIndex) =>
        Array.from({ length: columnCount }, (_, columnIndex) => {
          const cellId = cellIds[rowIndex * columnCount + columnIndex];
          return readDescendantText(cellId);
        }),
      );
    })
    .filter((rows) => rows.length);
}

function extractEmbeddedSheetBlockReferences(blocks = []) {
  return blocks
    .filter((block) => block?.block_type === 30 && block?.sheet?.token)
    .map((block) => {
      const token = String(block.sheet.token);
      const separatorIndex = token.lastIndexOf("_");
      if (separatorIndex <= 0 || separatorIndex >= token.length - 1) {
        return null;
      }
      return {
        spreadsheetToken: token.slice(0, separatorIndex),
        sheetId: token.slice(separatorIndex + 1),
      };
    })
    .filter(Boolean);
}

async function fetchEmbeddedSheetTablesOpenApi(blocks, accessToken) {
  const references = extractEmbeddedSheetBlockReferences(blocks);
  const tables = [];

  for (const reference of references) {
    const range = encodeURIComponent(reference.sheetId);
    const data = await fetchFeishuOpenApi(
      `/open-apis/sheets/v2/spreadsheets/${encodeURIComponent(reference.spreadsheetToken)}/values/${range}`,
      accessToken,
    );
    const values = data.valueRange?.values || data.values;
    if (!Array.isArray(values)) continue;
    tables.push(
      values.map((row) =>
        (Array.isArray(row) ? row : []).map((cell) =>
          cell == null ? "" : String(cell),
        ),
      ),
    );
  }

  return tables;
}

async function fetchAllFeishuDocumentBlocks(documentToken, accessToken) {
  const blocks = [];
  let pageToken = "";

  do {
    const query = new URLSearchParams({
      document_revision_id: "-1",
      page_size: "500",
    });
    if (pageToken) query.set("page_token", pageToken);
    const data = await fetchFeishuOpenApi(
      `/open-apis/docx/v1/documents/${encodeURIComponent(documentToken)}/blocks?${query}`,
      accessToken,
    );
    blocks.push(...(Array.isArray(data.items) ? data.items : []));
    pageToken = data.has_more ? String(data.page_token || "") : "";
  } while (pageToken);

  return blocks;
}

async function fetchAuthorizedFeishuContent(documentUrl) {
  const accessToken = await getFeishuAccessToken();
  if (!accessToken) return null;

  let documentToken = documentUrl.token;
  let documentType = documentUrl.type;

  if (documentType === "wiki") {
    const wikiData = await fetchFeishuOpenApi(
      `/open-apis/wiki/v2/spaces/get_node?token=${encodeURIComponent(documentToken)}`,
      accessToken,
    );
    const node = wikiData.node || wikiData;
    documentToken = node.obj_token;
    documentType = String(node.obj_type || "").toLowerCase();
    if (!documentToken) {
      throw new Error("知识库节点没有关联可读取的文档");
    }
  }

  if (!["docx", "doc", "docs"].includes(documentType)) {
    throw new Error(`暂不支持读取 ${documentType || "未知"} 类型的知识库节点`);
  }

  const rawContentPath =
    documentType === "docx"
      ? `/open-apis/docx/v1/documents/${encodeURIComponent(documentToken)}/raw_content`
      : `/open-apis/doc/v2/${encodeURIComponent(documentToken)}/raw_content`;
  const rawContentData = await fetchFeishuOpenApi(rawContentPath, accessToken);
  const content = String(rawContentData.content || "").trim();
  const blocks =
    documentType === "docx"
      ? await fetchAllFeishuDocumentBlocks(documentToken, accessToken)
      : [];
  const nativeTables = extractFeishuTables(blocks);
  const embeddedSheetTables = await fetchEmbeddedSheetTablesOpenApi(
    blocks,
    accessToken,
  );
  return content || blocks.length
    ? {
        content,
        tables: [...nativeTables, ...embeddedSheetTables],
      }
    : null;
}

async function fetchFeishuContentWithCli(documentUrl) {
  try {
    const { stdout } = await execFileAsync(
      "lark-cli",
      [
        "docs",
        "+fetch",
        "--doc",
        documentUrl.url,
        "--doc-format",
        "markdown",
        "--format",
        "json",
        "--as",
        "user",
      ],
      {
        env: createCliEnv(),
        timeout: 30000,
        maxBuffer: 1024 * 1024 * 5,
      },
    );
    const result = JSON.parse(stdout);
    const content = result?.data?.document?.content;
    const tables =
      typeof content === "string"
        ? await fetchEmbeddedSheetTablesWithCli(content)
        : [];
    return {
      content:
        typeof content === "string" && content.trim()
          ? content.trim()
          : null,
      tables,
      error: null,
    };
  } catch (error) {
    const stderr = String(error?.stderr || "").trim();
    let parsedError = null;
    try {
      parsedError = stderr ? JSON.parse(stderr) : null;
    } catch {}
    const message =
      parsedError?.error?.message ||
      parsedError?.message ||
      stderr ||
      error?.message ||
      "lark-cli 读取失败";
    console.warn("lark-cli read failed:", message);
    return { content: null, tables: [], error: new Error(message) };
  }
}

function formatFeishuAuthorizedReadError(error) {
  const message = String(error?.message || error || "未知错误");
  return `无法读取内部飞书文档：${message}。请确认应用已发布并获得文档只读权限，且目标文档或其上级文件夹已将该应用添加为可阅读协作者`;
}

// Fetch Feishu document content, preferring enterprise app authorization.
apiRouter.post("/fetch-feishu-doc", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ success: false, error: "Missing document URL" });
    }

    const documentUrl = parseFeishuDocumentUrl(url);
    if (!documentUrl) {
      return res.status(400).json({
        success: false,
        error: "无效的飞书文档链接，请使用 docx、doc、docs 或 wiki 链接",
      });
    }

    const docId = documentUrl.token;
    console.log("Fetching Feishu document:", docId);

    let authorizedReadError = null;
    try {
      const authorizedDocument =
        await fetchAuthorizedFeishuContent(documentUrl);
      if (authorizedDocument) {
        return res.json({
          success: true,
          data: {
            docId,
            content: authorizedDocument.content,
            length: authorizedDocument.content.length,
            tables: authorizedDocument.tables,
            source: "open-api",
          },
        });
      }
    } catch (error) {
      authorizedReadError = error;
      console.warn("Feishu OpenAPI read failed:", error?.message || error);
    }

    // Local development fallback when lark-cli has an authorized user session.
    const cliResult = await fetchFeishuContentWithCli(documentUrl);
    if (cliResult.content) {
      return res.json({
        success: true,
        data: {
          docId,
          content: cliResult.content,
          length: cliResult.content.length,
          tables: cliResult.tables,
          source: "lark-cli",
        },
      });
    }

    // Preserve support for documents explicitly shared to the public.
    const response = await fetch(documentUrl.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; H5Builder/1.0)",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: authorizedReadError
          ? formatFeishuAuthorizedReadError(authorizedReadError)
          : `无法读取飞书文档：${response.status} ${response.statusText}`,
      });
    }

    const html = await response.text();

    // Extract text content from HTML
    // Remove script and style tags
    const cleaned = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Try to find the main content area (Feishu docs usually have specific markers)
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    let textContent = cleaned;

    if (contentMatch) {
      textContent = contentMatch[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    const isLoginPage =
      /passport\.feishu\.cn|accounts\.feishu\.cn|登录飞书|扫码登录/i.test(
        html,
      );
    if (!textContent || textContent.length < 10 || isLoginPage) {
      return res.status(400).json({
        success: false,
        error: authorizedReadError
          ? formatFeishuAuthorizedReadError(authorizedReadError)
          : "服务端尚未配置 FEISHU_APP_ID 和 FEISHU_APP_SECRET，暂时只能读取公开分享的文档",
      });
    }

    res.json({
      success: true,
      data: {
        docId,
        content: textContent,
        length: textContent.length,
      },
    });
  } catch (e) {
    console.error("POST /api/fetch-feishu-doc error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});

app.use("/api", apiRouter);
app.use("/api/admin", createAdminAccessRouter());
app.use(
  "/api/collaboration",
  createCollaborationRouter({ resolveUser: resolveSessionUser }),
);
app.use("/api", createHistoryRouter({ resolveUser: resolveSessionUser }));

// Serve static files from dist/
app.use(express.static(distDir, {
  maxAge: "1y",
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache");
    }
  },
}));

// SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
}

module.exports = {
  app,
  fetchAuthorizedFeishuContent,
  parseFeishuDocumentUrl,
};
