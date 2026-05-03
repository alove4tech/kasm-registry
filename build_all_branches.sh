#!/bin/sh
set -eu

DEFAULT=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

if [ -z "$DEFAULT" ]; then
    echo "ERROR: Could not determine default branch from remote." >&2
    exit 1
fi

echo "Default branch: $DEFAULT"

mkdir base
cat > base/index.html << EOF
<meta http-equiv="refresh" content="0; url=./$DEFAULT/">
EOF
touch base/.nojekyll

# Generating documentation for each version branch in a subdirectory
echo "Fetching all remotes..."
git fetch --all

VERSION_BRANCHES=$(git branch --remotes --format '%(refname:lstrip=2)' | grep -E '^origin/[0-9]+\.[0-9]+$' | sed 's|^origin/||' || true)

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

    cp -a public/. process
    sed -i "s/1.0/$SANITIZED_BRANCH/" site/next.config.js

    if ! npm install --quiet --prefix site; then
        echo "WARNING: site install failed for $BRANCH, skipping" >&2
        rm -rf process
        sed -i "s/$SANITIZED_BRANCH/1.0/" site/next.config.js
        continue
    fi

    npm run deploy --prefix site
    cp -a process/. public/
    rm -rf process
    sed -i "s/$SANITIZED_BRANCH/1.0/" site/next.config.js
    mv public "base/$SANITIZED_BRANCH"
    cp "base/$SANITIZED_BRANCH/favicon.ico" base/favicon.ico 2>/dev/null || true
done

mv base public
echo "Build complete. Output in public/"
