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

# Stop the existing preview process on macOS (never touch 9000).
if [ "$EXPOSE_PORT" != "9000" ]; then
  EXISTING_PID="$(lsof -tiTCP:"$EXPOSE_PORT" -sTCP:LISTEN 2>/dev/null || true)"
  if [ -n "$EXISTING_PID" ]; then
    kill "$EXISTING_PID"
  fi
fi

export PORT="$EXPOSE_PORT"

exec node server/index.cjs
