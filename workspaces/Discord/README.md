# Discord

Discord web app workspace for Kasm.

## What this is

This workspace uses a thin, multi-arch GHCR wrapper image based on Kasm's Chromium image and launches Discord Web directly:

- URL: `https://discord.com/app`
- image: `ghcr.io/alove4tech/kasm-discord`
- base image family: `kasmweb/chromium`
- architecture: `amd64`, `arm64`
- supported Kasm versions in this registry: `1.17.x`, `1.18.x`

## Why this approach

Kasm decides whether to show **Install** or **Edit** by the workspace image name. Pointing this workspace directly at `kasmweb/chromium` makes Kasm treat it like an existing Chromium workspace, so it may show **Edit** instead of **Install**.

The wrapper image keeps Discord lightweight and multi-arch while giving it a unique workspace image name that Kasm can install separately.

## Resource profile

Defaults are intentionally modest for Oracle Free Tier-style hosts:

- cores: `2`
- memory: `2048`
- GPU: disabled

## Notes

- This launches Discord Web rather than the native Discord desktop client.
- Voice/video behavior depends on browser permissions and the Kasm deployment's audio/video settings.
- The wrapper image is built and published by GitHub Actions for `linux/amd64` and `linux/arm64`.
