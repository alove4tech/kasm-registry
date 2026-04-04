# Discord

ARM64 Discord workspace scaffold for Kasm.

## What this is

This workspace is designed as a custom ARM64 Discord experience for Kasm using a browser-based desktop app approach instead of the upstream `kasmweb/discord` image.

## Why a custom image is needed

The upstream Kasm Discord image currently appears to be published for `amd64`, not `arm64`.

Because of that, the ARM64 path here is to build a custom image on top of an ARM64-compatible Kasm desktop image and launch Discord as a dedicated browser/PWA-style app.

## Planned implementation

Base image target:

- `kasmweb/ubuntu-jammy-desktop`

Approach:

- install an ARM64-capable browser runtime
- add a desktop launcher that opens Discord in app mode
- keep the experience desktop-like instead of exposing a full general browser workflow by default
- preserve normal Kasm startup behavior

## Validation status

Current state:

- official Discord branding asset added for the icon
- ARM64 scaffold prepared
- workspace entry intentionally disabled until image build and runtime validation are complete

## Notes

- Architecture is intentionally set to `arm64` only for this workspace path.
- If a reliable upstream ARM64 Discord image appears later, this entry can be simplified.
- Until the image is built and published, this entry should remain disabled.
