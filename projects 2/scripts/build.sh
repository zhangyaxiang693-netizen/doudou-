#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

pnpm install --frozen-lockfile

# 构建前备份现有静态资源，构建后把旧资源里未被新构建覆盖的文件合并回，
# 保证仍在运行的旧版本页面懒加载图片不会因 hash 文件被替换而 404。
LEGACY_ASSETS="$(mktemp -d)"
if [ -d "$PROJECT_DIR/dist/assets" ]; then
  cp -R "$PROJECT_DIR/dist/assets" "$LEGACY_ASSETS/legacy"
fi

pnpm vite build

if [ -d "$LEGACY_ASSETS/legacy" ]; then
  cp -n "$LEGACY_ASSETS/legacy"/* "$PROJECT_DIR/dist/assets/" 2>/dev/null || true
fi
rm -rf "$LEGACY_ASSETS"
