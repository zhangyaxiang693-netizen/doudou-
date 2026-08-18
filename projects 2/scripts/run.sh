#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

# Port resolution: .preview -> DEPLOY_RUN_PORT -> 5000
EXPOSE_PORT=$(awk -F '[ =]+' '/^expose_port/ {gsub(/[^0-9]/, "", $2); print $2; exit}' .preview 2>/dev/null || true)
if [ -z "$EXPOSE_PORT" ]; then
  EXPOSE_PORT="${DEPLOY_RUN_PORT:-5000}"
fi

# Kill existing process on the port (never touch 9000)
if [ "$EXPOSE_PORT" != "9000" ]; then
  fuser -k "${EXPOSE_PORT}/tcp" 2>/dev/null || true
  sleep 1
fi

export PORT="$EXPOSE_PORT"

exec node server/index.cjs
