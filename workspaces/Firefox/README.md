# Firefox

ARM-focused Firefox workspace for Kasm.

## Validation status

This entry uses a real Kasm image target:

- image: `kasmweb/firefox:1.17.0`
- Kasm compatibility: `1.17.x`
- architecture: `arm64`

Validation performed:

- confirmed in Kasm documentation as ARM64-capable
- confirmed via Docker manifest that an `arm64` image exists

## Notes

- Architecture is intentionally set to `arm64` only for this registry phase.
- If AMD64 support is wanted later, we can extend the entry after testing.
- Uncompressed image size is currently a reasonable estimate until measured on a host with Docker access.
