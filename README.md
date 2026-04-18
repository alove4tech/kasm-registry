# Kasm Registry

Custom Kasm Workspaces registry for Aaron.

This repository is the source for a self-hosted/static GitHub Pages registry based on the Kasm registry template. It now includes a starter set of real workspace definitions plus the site and processing pipeline needed to publish them.

## Repo purpose

- Host a custom Kasm Workspaces registry
- Publish a static registry site through GitHub Pages
- Store workspace definitions under `workspaces/`
- Generate `list.json` and the front-end site from repo contents

## Current status

- Build workflow present
- Site scaffold present
- Processing scripts present
- Workspace authoring docs cleaned up
- Starter workspace catalog checked in and ready to expand

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


## Current workspace catalog

| Workspace | Notes |
|---|---|
| Discord | Communication workspace entry with docs and icon assets |
| Firefox | Browser workspace entry with icon assets |
| Kali Linux | Security testing workspace entry |
| LibreOffice | Productivity workspace entry |
| Telegram | Messaging workspace entry |
| Tor Browser | Privacy-focused browser workspace entry |
| Ubuntu Desktop | General Linux desktop workspace entry |

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
- Expand workspace catalog with more ARM64 entries
- Test generation and GitHub Pages output after adding new workspaces
- Keep new workspaces aligned with the registry channel convention
- Add CI validation for workspace.json schema

## Notes

This repo intentionally keeps container implementation details out for now. The immediate objective is a clean, documented registry foundation.

## Discovery

KASM-REGISTRY-DISCOVERY-IDENTIFIER

## Local validation

Before pushing workspace changes, it helps to run:

```bash
npm ci --prefix processing
npm ci --prefix site
./build_all_branches.sh
```

That catches broken metadata, missing static assets, and site export regressions before GitHub Pages does.
