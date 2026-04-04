# Discord

Discord desktop workspace for Kasm.

## Validation status

This entry uses the Kasm Discord image:

- image family: `kasmweb/discord`
- architecture: `amd64`
- supported Kasm versions in this registry: `1.17.x`, `1.18.x`

Validation performed:

- confirmed published Docker Hub tags for `1.17.0` and `1.18.0`
- confirmed current `1.18.0-rolling-daily` image metadata reports `amd64`

## Channel convention

This workspace follows the registry-wide channel pattern:

- `develop`
- stable release tag
- rolling weekly
- rolling daily

## Notes

- This workspace is intentionally marked `amd64` only based on currently published image metadata.
- Official Discord logo assets are used for the workspace icon.
- If ARM64 images are published later, the compatibility matrix can be extended after validation.
