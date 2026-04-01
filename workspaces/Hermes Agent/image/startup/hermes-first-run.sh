#!/usr/bin/env bash
set -euo pipefail

MARKER="$HOME/.config/hermes-agent/first-run-complete"
WELCOME="$HOME/Desktop/HERMES-START-HERE.txt"
HERMES_BIN="$HOME/.hermes/hermes-agent/.venv/bin/hermes"

mkdir -p "$HOME/.config/hermes-agent"

if [ ! -f "$MARKER" ]; then
  cat > "$WELCOME" <<EOF
Hermes Agent Kasm Workspace

Hermes is installed in this prototype image at:
$HERMES_BIN

Suggested first steps:
1. Open Hermes from the desktop shortcut or terminal
2. Run: hermes setup
3. Run: hermes model
4. Start using Hermes normally

Persistence target:
- ~/.hermes

Notes:
- This is a first-pass prototype image design
- If a provider/model is not configured yet, Hermes will prompt during setup
EOF
  touch "$MARKER"
fi
