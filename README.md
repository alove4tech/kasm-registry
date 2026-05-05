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
- `site/` — static registry website source (Next.js)
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

| Workspace | Architecture | Status | Notes |
|---|---|---|---|
| CyberChef | amd64, arm64 | Enabled | Security/data analysis in Chromium |
| Discord | arm64 | Disabled | Custom image not yet built |
| Firefox | arm64 | Enabled | Browser workspace |
| Kali Linux | arm64 | Enabled | Security testing desktop |
| LibreOffice | arm64 | Enabled | Productivity suite |
| Telegram | arm64 | Enabled | Messaging workspace |
| Tor Browser | arm64 | Enabled | Privacy-focused browser |
| Ubuntu Desktop | arm64 | Enabled | General Linux desktop (jammy) |

## Quick start

### 1. Clone

```bash
git clone https://github.com/alove4tech/kasm-registry
cd kasm-registry
```

### 2. Validate workspaces

```bash
npm ci --prefix processing
npm run validate --prefix processing
```

### 3. Build

```bash
npm ci --prefix site
./build_all_branches.sh
```

### 4. Publish

Push to GitHub. The workflow in `.github/workflows/build-and-deploy.yml` deploys to `gh-pages`.

## Adding a new workspace

1. Create a new folder under `workspaces/` with a human-readable name
2. Add `workspace.json`, an icon file, and a `README.md`
3. Follow the naming and channel conventions in `workspaces/README.md`
4. Run `npm run validate --prefix processing` to check for issues
5. Build and test locally before pushing

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

## Discovery

KASM-REGISTRY-DISCOVERY-IDENTIFIER
