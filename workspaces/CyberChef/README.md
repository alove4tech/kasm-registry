# CyberChef

CyberChef is a browser-based utility for encoding, decoding, hashing, compression, encryption helpers, JWT inspection, URL/base64 work, and general data transformation.

## Upstream

- App: <https://gchq.github.io/CyberChef/>
- Source: <https://github.com/gchq/CyberChef>
- Runtime image: `kasmweb/chromium`

## Architecture support

This workspace uses Kasm's Chromium image instead of a CyberChef-specific server image so it remains a standard Kasm desktop workspace. The selected Chromium tags have been verified as multi-arch Docker manifests with:

- `linux/amd64`
- `linux/arm64`

That keeps it suitable for both x86 hosts and Oracle Free Tier ARM64/Ampere instances.

## Kasm compatibility

- `1.17.x`: `kasmweb/chromium:1.17.0-rolling-daily`
- `1.18.x`: `kasmweb/chromium:1.18.0-rolling-daily`

The workspace launches Chromium directly to the official CyberChef static app:

```text
https://gchq.github.io/CyberChef/
```

## Runtime requirements

- No GPU required
- 2 CPU cores recommended
- 2 GB RAM allocated
- Internet access is required to load the hosted CyberChef app

## Maintenance notes

If an offline/self-hosted CyberChef experience is preferred later, switch this workspace to a custom Kasm-compatible image that serves CyberChef locally and launches the local URL. The official `ghcr.io/gchq/cyberchef:latest` image is multi-arch, but it is a web-server container rather than a Kasm desktop workspace image.
