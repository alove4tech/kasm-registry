#!/usr/bin/env bash
set -euo pipefail

/usr/local/bin/hermes-first-run.sh || true

HERMES_BIN="$HOME/.hermes/hermes-agent/.venv/bin/hermes"
LAUNCH_CMD="bash"

if [ -x "$HERMES_BIN" ]; then
  LAUNCH_CMD="$HERMES_BIN"
fi

if command -v xfce4-terminal >/dev/null 2>&1; then
  exec xfce4-terminal --title="Hermes Agent" --working-directory="$HOME" --command="$LAUNCH_CMD"
fi

exec "$LAUNCH_CMD"
