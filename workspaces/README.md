# Workspaces

This directory contains all custom Kasm workspace entries for this registry.

## Layout

Each workspace gets its own folder:

```text
workspaces/
  Workspace Name/
    workspace.json
    workspace-icon.png
    README.md
```

## Required files

### `workspace.json`
Primary Kasm registry definition for the workspace.

### Icon
Use `.svg` (preferred) or `.png`.
Recommended:

- square image, at least 128×128 for PNG
- simple, readable at small size
- avoid 1×1 pixel placeholder PNGs — if only SVG is available, don't include a stub PNG

## Recommended file

### `README.md`
Not required by Kasm, but useful for humans. Include:

- purpose
- upstream image source
- tags/channels used
- Kasm compatibility notes
- special runtime requirements
- maintenance notes

## Suggested naming

- Keep folder names human-readable
- Keep icon filenames simple and lowercase
- Match `image_src` in `workspace.json` exactly

## Channel convention

This registry uses a consistent channel pattern for every workspace whenever upstream tags exist.

For each supported Kasm version, prefer:

- `develop`
- `<version>.0`
- `<version>.0-rolling-weekly`
- `<version>.0-rolling-daily`

Example for `1.18.x`:

- `develop`
- `1.18.0`
- `1.18.0-rolling-weekly`
- `1.18.0-rolling-daily`

If an upstream image does not actually publish one of these tags, document the exception in the workspace README and use the closest valid pattern.

## Authoring checklist

Before committing a new workspace:

- icon file exists
- `image_src` matches the icon filename
- `friendly_name` is clear
- description is short and useful
- architecture values are correct
- compatibility entries are valid
- image names/tags are correct
- size values are populated when applicable
- categories are limited and sensible
- channel tags follow the registry convention unless documented otherwise

## Current inventory

This repo already includes workspace entries for Discord, Firefox, Kali Linux, LibreOffice, Telegram, Tor Browser, and Ubuntu Desktop. Use them as the baseline for future additions so naming, icon handling, and README structure stay consistent.
