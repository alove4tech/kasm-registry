#!/usr/bin/env bash
set -euo pipefail

# Only consider origin version branches — never Gitea or other remotes
REMOTE="origin"

DEFAULT=$(git remote show "$REMOTE" | sed -n '/HEAD branch/s/.*: //p')

if [ -z "$DEFAULT" ]; then
    echo "ERROR: Could not determine default branch from ${REMOTE}." >&2
    exit 1
fi

echo "Default branch: $DEFAULT"

# Save starting branch so we can restore it on exit
STARTING_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || git rev-parse HEAD)

cleanup() {
    echo "Restoring branch: $STARTING_BRANCH"
    git checkout --force "$STARTING_BRANCH" 2>/dev/null || true
}
trap cleanup EXIT

mkdir base
cat > base/index.html << EOF
<meta http-equiv="refresh" content="0; url=./$DEFAULT/">
EOF
touch base/.nojekyll

# Fetch only from origin to avoid pulling Gitea or other remote branches
echo "Fetching from ${REMOTE}..."
git fetch "$REMOTE"

VERSION_BRANCHES=$(git branch --remotes --format '%(refname:lstrip=2)' | grep -E "^${REMOTE}/[0-9]+\.[0-9]+$" | sed "s|^${REMOTE}/||" || true)

if [ -z "$VERSION_BRANCHES" ]; then
    echo "No version branches found. Building default branch only."
fi

echo "Version branches: $VERSION_BRANCHES"

for BRANCH in $VERSION_BRANCHES; do
    SANITIZED_BRANCH="$(echo "$BRANCH" | sed 's/\//_/g')"
    echo "Building branch: $BRANCH (sanitized: $SANITIZED_BRANCH)"
    echo "$SANITIZED_BRANCH" >> base/versions.txt

    git checkout --force "$BRANCH"

    if ! node processing; then
        echo "WARNING: processing failed for $BRANCH, skipping" >&2
        continue
    fi

    mkdir -p process
    cp -a public/. process/
    # Target only the basePath line to avoid accidental replacements elsewhere
    sed -i "s|basePath: '/kasm-registry/[^']*'|basePath: '/kasm-registry/$SANITIZED_BRANCH'|" site/next.config.js

    if ! npm install --quiet --prefix site; then
        echo "WARNING: site install failed for $BRANCH, skipping" >&2
        rm -rf process
        continue
    fi

    npm run deploy --prefix site
    cp -a process/. public/
    rm -rf process
    # No need to restore config — next iteration's git checkout --force resets it
    mv public "base/$SANITIZED_BRANCH"
    cp "base/$SANITIZED_BRANCH/favicon.ico" base/favicon.ico 2>/dev/null || true
done

mv base public
echo "Build complete. Output in public/"
