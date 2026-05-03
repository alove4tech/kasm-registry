# Contributing

## Scope

This repository is for a custom Kasm Workspaces registry.

At this stage, contributions should focus on:

- repo organization
- documentation
- registry metadata
- workspace definitions
- icons/assets
- generation/build fixes

## Workspace contribution expectations

For each new workspace, include:

- workspace folder
- `workspace.json`
- icon asset
- optional `README.md` with notes

## Keep changes focused

Prefer small, reviewable PRs:

- one workspace at a time, or
- one infrastructure/docs change at a time

## Validation

Before submitting:

```bash
npm ci --prefix processing
npm run validate --prefix processing
npm run generate --prefix processing
npm ci --prefix site
./build_all_branches.sh
```

Make sure generated output completes without obvious errors.

## Style

- Keep docs concise
- Keep filenames simple
- Avoid unnecessary repo churn
- Preserve existing branch/version build behavior unless intentionally changing it
