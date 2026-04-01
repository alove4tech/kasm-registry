# Hermes Agent Image Prototype

This directory contains a first-pass custom-image build recipe for a Hermes Agent Kasm desktop workspace.

## Current scope

Included:
- Dockerfile based on `kasmweb/ubuntu-jammy-desktop:1.18.0`
- source-based Hermes install plan using `uv`
- first-run helper script
- desktop launcher script
- desktop shortcut asset

## Prototype install flow

The image currently attempts to:

1. install build/runtime dependencies
2. install `uv`
3. clone `https://github.com/NousResearch/hermes-agent.git`
4. create a Python 3.11 venv
5. install Hermes with:

```bash
uv pip install -e .[cli]
```

## Remaining validation

Still needs real build/runtime validation for:
- ARM64 image build success
- Hermes CLI startup inside the Kasm desktop environment
- persistence requirements under `~/.hermes`
- whether Node.js should be bundled for browser-tool support

## Important note

This is a prototype build recipe, not yet a verified production image.
