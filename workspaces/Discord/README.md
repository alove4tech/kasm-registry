# Discord

Discord web app workspace for Kasm.

## What this is

This workspace uses the multi-arch `kasmweb/chromium` image and launches Discord Web directly:

- URL: `https://discord.com/app`
- image family: `kasmweb/chromium`
- architecture: `amd64`, `arm64`
- supported Kasm versions in this registry: `1.17.x`, `1.18.x`

## Why this approach

The native/upstream Discord desktop image is not reliable for both Oracle Free Tier target architectures. Using Chromium keeps this workspace lightweight, published, and usable on both ARM64 Ampere instances and x86 deployments without maintaining a custom Discord container image.

## Resource profile

Defaults are intentionally modest for Oracle Free Tier-style hosts:

- cores: `2`
- memory: `2048`
- GPU: disabled

## Notes

- This launches Discord Web rather than the native Discord desktop client.
- Voice/video behavior depends on browser permissions and the Kasm deployment's audio/video settings.
- The unused custom image scaffold under `image/` is retained as reference material only; the active workspace definition does not use it.
