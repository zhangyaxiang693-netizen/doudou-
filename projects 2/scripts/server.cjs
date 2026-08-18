const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || process.env.DEPLOY_RUN_PORT || '5000', 10);
const ROOT = path.resolve(__dirname, '..', 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  stream.pipe(res);
  stream.on('error', () => {
    res.writeHead(500);
    res.end('Internal Server Error');
  });
}

function tryServe(res, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const filePath = path.join(ROOT, decoded);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      serveFile(filePath, res);
    } else if (!err && stats.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        serveFile(indexPath, res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    } else {
      // SPA fallback: serve root index.html
      const rootIndex = path.join(ROOT, 'index.html');
      if (fs.existsSync(rootIndex)) {
        serveFile(rootIndex, res);
      } else {
        res.writeHead(404);
        res.end('Not Found');
      }
    }
  });
}

const server = http.createServer((req, res) => {
  tryServe(res, req.url);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server listening on 0.0.0.0:${PORT}`);
});
