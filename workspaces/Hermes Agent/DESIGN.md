# Hermes Agent Desktop Workspace Design

## Goal

Create a real ARM64 Kasm desktop workspace for Hermes Agent that feels usable as a persistent personal agent environment rather than just a raw terminal container.

## UX direction

Target: **desktop-first** workspace.

Why:
- easier onboarding than a terminal-only workspace
- allows browser-based auth/setup flows if Hermes uses OAuth or external model/provider login
- gives a place for terminal + docs + browser side-by-side
- better fit for an "agent that lives on your server" workflow

## Proposed base image

Preferred base:
- `kasmweb/ubuntu-jammy-desktop`

Why:
- ARM64 support exists
- full desktop experience
- good foundation for terminal + browser + editing
- closer to the experience Hermes users likely expect

## Hermes installation model

Hermes official install flow:
- bootstrap install script
- `hermes setup`
- `hermes model`
- `hermes`

For Kasm, we should avoid making the user repeat full setup every session.

## Persistence strategy

Persist at least:
- Hermes config directory
- Hermes memory/state directory
- user home subdirectories used by Hermes
- shell history

Likely candidate paths to inspect during implementation:
- `~/.hermes/`
- `~/.config/hermes/`
- `~/.local/share/hermes/`
- any cache/state path created by installer

## First-launch behavior

Two possible approaches:

### Option A — install at image build time

Pros:
- fastest startup
- most predictable
- better UX

Cons:
- image rebuild needed when Hermes changes
- installer assumptions may need patching for noninteractive build

### Option B — bootstrap on first launch

Pros:
- simpler image build initially
- always fresh installer path

Cons:
- slow first start
- more fragile
- worse UX

## Recommendation

Use **Option A** for the final workspace.

## Desktop workflow proposal

On start:
- desktop loads normally
- open a terminal window automatically
- optionally open a browser tab to Hermes docs or provider portal
- show a first-run note on where Hermes config lives

Primary user actions:
- open terminal
- run `hermes setup`
- run `hermes model`
- run `hermes`

## Image contents

Base image should include:
- Hermes Agent installed
- Python/runtime dependencies installed by Hermes installer or reproduced manually
- git/curl/ca-certificates if required
- optional helper script(s) for first-run guidance

Nice-to-have additions:
- desktop shortcut: Hermes Terminal
- desktop shortcut: Hermes Docs
- desktop note or welcome file

## Security / privilege posture

Prefer:
- no privileged mode
- no unusual Docker security overrides
- no root-required runtime if avoidable

If Hermes installer requires user-level install, keep it user-level.

## Workspace metadata recommendation

Keep categories like:
- Development
- Productivity

Architecture:
- `arm64`

Versions:
- support `1.17.x` and `1.18.x` initially

Channels:
- `develop`
- stable tag
- rolling weekly
- rolling daily

## Implementation phases

### Phase 1 — design scaffold
- document desired UX
- keep placeholder registry entry disabled

### Phase 2 — custom image prototype
- create image folder
- write Dockerfile
- install Hermes in image
- verify CLI launches on ARM64

### Phase 3 — Kasm integration
- add startup helper
- ensure persistent config/state
- tune workspace metadata
- enable registry entry

### Phase 4 — polish
- add icon refinement
- add desktop shortcuts
- add onboarding note
- document update path

## Open questions

- Which Hermes directories need persistence exactly?
- Should Hermes start automatically on terminal launch or only when the user runs it?
- Should browser auth/provider setup open automatically?
- Should this workspace remain desktop-first or also get a terminal-only sibling later?

## Recommendation right now

Build a **custom Ubuntu Desktop ARM64 image for Hermes** as the primary implementation path.
