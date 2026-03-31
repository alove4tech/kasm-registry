# Kasm Registry

Custom Kasm Workspaces registry for Aaron.

This repository is the source for a self-hosted/static GitHub Pages registry based on the Kasm registry template. Right now the goal is to get the repository clean, documented, and ready for workspace definitions. Actual containers/workspaces will be added later.

## Repo purpose

- Host a custom Kasm Workspaces registry
- Publish a static registry site through GitHub Pages
- Store workspace definitions under `workspaces/`
- Generate `list.json` and the front-end site from repo contents

## Current status

- Template cloned and retained
- Build workflow present
- Site scaffold present
- Processing scripts present
- Workspace authoring docs cleaned up
- Ready for adding real workspace entries later

## Repository structure

- `workspaces/` — workspace definitions, icons, and per-workspace docs
- `site/` — static registry website source
- `processing/` — scripts that generate registry artifacts
- `.github/workflows/` — GitHub Actions for build/deploy
- `public/` — generated output during build

## Expected workspace layout

Each workspace should live in its own folder:

```text
workspaces/
  My Workspace/
    workspace.json
    my-workspace.png
    README.md        # optional but recommended
```

## Quick start

### 1. Clone

```bash
git clone https://github.com/alove4tech/kasm-registry
cd kasm-registry
```

### 2. Review site config

Edit:

- `site/next.config.js`

Important values:

- `env.name`
- `env.description`
- `env.icon`
- `env.listUrl`
- `env.contactUrl`
- `basePath`

### 3. Add workspaces later

When ready, add workspace folders under `workspaces/`.

### 4. Build locally

```bash
npm ci --prefix processing
npm ci --prefix site
./build_all_branches.sh
```

### 5. Publish

Push to GitHub. The workflow in `.github/workflows/build-and-deploy.yml` deploys to `gh-pages`.

## GitHub Pages notes

For a repo named `kasm-registry`, the current site config uses:

- base path: `/kasm-registry/1.1`
- list URL: `https://alove4tech.github.io/kasm-registry/1.1/`

If the repo name or publishing strategy changes, update `site/next.config.js`.

## Registry conventions

### Workspace channel pattern

This registry standardizes workspace channels when upstream image tags exist.

For each supported Kasm version, use:

- `develop`
- `<version>.0`
- `<version>.0-rolling-weekly`
- `<version>.0-rolling-daily`

This keeps workspace install options consistent across the registry.

## Recommended next steps

- Add a project logo/icon under `site/public/`
- Replace placeholder branding in `site/next.config.js` if needed
- Add first real workspace folders under `workspaces/`
- Test generation and GitHub Pages output
- Keep new workspaces aligned with the registry channel convention

## Notes

This repo intentionally keeps container implementation details out for now. The immediate objective is a clean, documented registry foundation.

## Discovery

KASM-REGISTRY-DISCOVERY-IDENTIFIER
