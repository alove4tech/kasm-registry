# Ubuntu Desktop

ARM-focused Ubuntu desktop workspace for Kasm.

## Intent

Provide a general-purpose Ubuntu desktop environment for ARM64 hosts, starting with Oracle Cloud Ampere as the primary target.

## Validation status

This entry now uses a real Kasm image target:

- image: `kasmweb/ubuntu-jammy-desktop:1.17.0`
- Kasm compatibility: `1.17.x`
- architecture: `arm64`

Validation performed:

- confirmed in Kasm documentation as ARM64-capable
- confirmed via Docker manifest that an `arm64` image exists

## Remaining follow-up

- measure and set final `uncompressed_size_mb`
- optionally add additional tags/channels later
- replace placeholder icon with a better Ubuntu/Desktop graphic if desired

## Notes

- Architecture is intentionally set to `arm64` only for this registry phase.
- If AMD64 support is needed later, we can extend the entry after testing.
