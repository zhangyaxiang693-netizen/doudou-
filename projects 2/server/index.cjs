const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.DEPLOY_RUN_PORT || process.env.PORT || 5000;
const HOST = "0.0.0.0";

const distDir = path.join(__dirname, "..", "dist");

// API routes
const apiRouter = express.Router();

const FEISHU_DOCUMENT_HOSTS = [
  "feishu.cn",
  "larksuite.com",
  "larkoffice.com",
  "doubao.com",
];

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

function getFeishuAccessToken() {
  return (
    process.env.FEISHU_USER_ACCESS_TOKEN ||
    process.env.LARK_USER_ACCESS_TOKEN ||
    process.env.LARKSUITE_CLI_USER_ACCESS_TOKEN ||
    ""
  ).trim();
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

async function fetchAuthorizedFeishuContent(documentUrl) {
  const accessToken = getFeishuAccessToken();
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

  const rawContentData = await fetchFeishuOpenApi(
    `/open-apis/docx/v1/documents/${encodeURIComponent(documentToken)}/raw_content`,
    accessToken,
  );
  return String(rawContentData.content || "").trim() || null;
}

// Fetch Feishu public document content
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

    let authorizedError = null;
    try {
      const authorizedContent =
        await fetchAuthorizedFeishuContent(documentUrl);
      if (authorizedContent) {
        return res.json({
          success: true,
          data: {
            docId,
            content: authorizedContent,
            length: authorizedContent.length,
            source: "open-api",
          },
        });
      }
    } catch (error) {
      authorizedError = error;
      console.warn(
        "Feishu OpenAPI read failed:",
        error?.message || error,
      );
    }

    // Fetch the public document page
    const response = await fetch(documentUrl.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; H5Builder/1.0)",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: `Failed to fetch document: ${response.statusText}`,
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

    if (!textContent || textContent.length < 10) {
      return res.status(400).json({
        success: false,
        error: authorizedError
          ? `无法读取飞书文档：${authorizedError.message}。请确认当前飞书账号有文档访问权限`
          : "无法提取文档内容。请将文档分享权限设置为“获得链接的人可阅读”，或配置飞书用户授权",
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
