# Ubuntu Desktop

ARM-focused Ubuntu desktop workspace for Kasm.

## Intent

Provide a general-purpose Ubuntu desktop environment for ARM64 hosts, starting with Oracle Cloud Ampere as the primary target.

## Validation status

This entry uses the official Kasm Ubuntu Jammy desktop image:

- image family: `kasmweb/ubuntu-jammy-desktop`
- architecture: `arm64`
- supported Kasm versions in this registry: `1.17.x`, `1.18.x`

Validation performed:

- confirmed in Kasm documentation as ARM64-capable
- confirmed via Docker manifest that an `arm64` image exists

## Channel convention

This workspace follows the registry-wide channel pattern:

- `develop`
- stable release tag
- rolling weekly
- rolling daily

## Notes

- Architecture is intentionally set to `arm64` only for this registry phase.
- If AMD64 support is needed later, we can extend the entry after testing.
