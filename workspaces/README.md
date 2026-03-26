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
Use `.png` or `.svg`.
Recommended:

- square image
- at least 128x128
- simple, readable at small size

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

## Placeholder

Until real workspaces are added, this directory may contain only template/example content.
