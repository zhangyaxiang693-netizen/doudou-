#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../projects 2" && pwd)"
cd "$PROJECT_DIR"

exec bash "$PROJECT_DIR/scripts/build.sh"
