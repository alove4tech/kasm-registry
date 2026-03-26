#!/bin/bash

# Kasm registry auto-review and push script
# Runs nightly to review docs/config hygiene, then commit and push any repo changes

set -euo pipefail

REPO_DIR="/home/claw/.openclaw/workspace/kasm-registry"
SCRIPT_DIR="$REPO_DIR/.scripts"
LOG_DIR="/home/claw/.openclaw/logs"
LOG_FILE="$LOG_DIR/kasm-registry-review.log"

mkdir -p "$SCRIPT_DIR" "$LOG_DIR"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

cd "$REPO_DIR"

log "Starting nightly review and push..."

CHANGES_MADE=0

log "Running safe repository review..."

# Ensure basic gitignore hygiene
if [ -f ".gitignore" ]; then
  grep -qxF '.scripts/*.log' .gitignore || { echo '.scripts/*.log' >> .gitignore; CHANGES_MADE=1; log "Added .scripts/*.log to .gitignore"; }
  grep -qxF '.scripts/review.log' .gitignore || { echo '.scripts/review.log' >> .gitignore; CHANGES_MADE=1; log "Added .scripts/review.log to .gitignore"; }
else
  printf '.scripts/*.log\n.scripts/review.log\n' > .gitignore
  CHANGES_MADE=1
  log "Created .gitignore with script log ignores"
fi

# Remove trailing whitespace from text/docs/config files
while IFS= read -r -d '' f; do
  if grep -q '[[:space:]]$' "$f"; then
    sed -i 's/[[:space:]]\+$//' "$f"
    CHANGES_MADE=1
    log "Trimmed trailing whitespace in ${f#./}"
  fi
done < <(find . -type f \( -name '*.md' -o -name '*.txt' -o -name '*.json' -o -name '*.yml' -o -name '*.yaml' -o -name '*.js' \) -not -path './.git/*' -not -path './site/.next/*' -not -path './node_modules/*' -print0)

# Warn on env-like tracked files
if git ls-files | grep -Eq '(^|/)(\.env|.*\.env)$'; then
  log "⚠️  Possible env file tracked by git; review recommended"
fi

# Warn if package lockfiles and yarn lock both exist in same subtree
if [ -f site/package-lock.json ] && [ -f site/yarn.lock ]; then
  log "ℹ️  site/ contains both package-lock.json and yarn.lock; consider standardizing"
fi

# Warn on large binaries accidentally added
if find . -type f -size +20M -not -path './.git/*' -not -path './site/.next/*' | grep -q .; then
  log "⚠️  Found file(s) larger than 20MB; review large artifacts"
fi

# Check for real changes after review
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
  log "Changes detected. Preparing commit..."

  git add -A

  COMMIT_MSG="Automated nightly review and sync

$(date '+%Y-%m-%d %H:%M:%S')"

  if [ "$CHANGES_MADE" -eq 1 ]; then
    COMMIT_MSG="$COMMIT_MSG

Safe cleanup and documentation hygiene applied."
  fi

  git commit -m "$COMMIT_MSG"

  log "Pushing to GitHub..."
  git push origin HEAD

  log "✅ Successfully pushed changes to GitHub"
else
  log "No changes to commit. Skipping push."
fi

log "Review complete."
