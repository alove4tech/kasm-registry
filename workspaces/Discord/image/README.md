# Discord ARM64 Image Prototype

This directory contains a first-pass custom-image build recipe for an ARM64 Discord Kasm workspace.

## Current approach

The image is based on an ARM64-capable Kasm Ubuntu desktop image and launches Discord in browser app mode.

## Why this path

A direct upstream ARM64 Discord Kasm image does not appear to be available, so this prototype uses a browser-based app experience instead.

## Remaining validation

Still needs real validation for:

- package availability on the target ARM64 base image
- browser app launch behavior inside Kasm
- desktop shortcut behavior
- login/session persistence expectations
- whether Chromium or another browser is the best long-term runtime

## Important note

This is a prototype build recipe, not yet a verified production image.
