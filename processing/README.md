# Processing scripts

This directory contains the helper scripts that turn workspace definitions into registry output.

## What lives here

- `processjson.js` builds the registry metadata from the checked-in workspace folders
- `get_image_sizes.js` gathers image sizing details used during generation
- `add_next_version.js` helps scaffold the next version branch when the registry needs to roll forward
- `update_1_0_to_1_1.js` captures the version bump work that moved older data into the current layout

## Local usage

From the repo root:

```bash
npm ci --prefix processing
node processing/processjson.js
```

If you are touching icons or image metadata, rerun the processing step before building the site so generated artifacts stay in sync.

## Practical workflow

1. Update or add a workspace under `workspaces/`
2. Run the processing scripts
3. Build the site with `./build_all_branches.sh`
4. Spot check the generated output before pushing

That keeps the published registry, static site, and workspace source data aligned.
