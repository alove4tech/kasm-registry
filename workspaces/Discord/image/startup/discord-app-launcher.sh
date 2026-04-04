#!/usr/bin/env bash
set -euo pipefail

exec chromium-browser \
  --no-sandbox \
  --app="https://discord.com/app" \
  --user-data-dir="${HOME}/.config/discord-pwa"
