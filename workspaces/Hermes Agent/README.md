# Hermes Agent

Hermes Agent workspace placeholder for Kasm.

## What this is

Hermes Agent from Nous Research is an agent runtime/CLI that is normally installed via an automated shell installer and then configured interactively.

Source:
- site: https://hermes-agent.nousresearch.com/
- repo: https://github.com/NousResearch/hermes-agent

## Important note

This registry entry is a placeholder/workspace definition scaffold, not a fully validated production workspace image yet.

Why:
- Hermes is not just a stock desktop app image like Firefox or Telegram
- it normally installs itself with its own bootstrap script
- a good Kasm experience likely needs a dedicated custom image or startup flow

## Likely implementation path

Best path is to build a custom Kasm image based on an ARM64-compatible desktop or terminal image, then:

- install Hermes into the image or at first launch
- persist Hermes config and memory to a mapped volume/home
- preconfigure a terminal-centric or desktop-centric UX
- document model/provider setup

## Validation status

- project confirmed active and open source
- install flow confirmed from official site
- custom Kasm image still needed for a proper production workspace
