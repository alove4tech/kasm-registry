# Hermes Agent Implementation Notes

## Initial assumptions

- ARM64 target first
- desktop-first user experience
- Kasm version target: 1.17.x and 1.18.x
- custom image required before enabling the registry entry

## Suggested future file layout

```text
workspaces/Hermes Agent/
  workspace.json
  hermes-agent.svg
  README.md
  DESIGN.md
  IMPLEMENTATION-NOTES.md
  image/
    Dockerfile
    startup/
    assets/
```

## Proposed custom image tag pattern

Example future image naming:
- `alove4tech/hermes-agent-desktop:1.18.0`
- `alove4tech/hermes-agent-desktop:1.18.0-rolling-weekly`
- `alove4tech/hermes-agent-desktop:1.18.0-rolling-daily`

## Candidate base images

Primary candidate:
- `kasmweb/ubuntu-jammy-desktop`

Fallback candidates:
- `kasmweb/ubuntu-noble-desktop`
- `kasmweb/terminal` if desktop approach becomes too heavy

## First prototype checklist

- verify Hermes installer works noninteractively or can be adapted
- verify direct source install via `uv` + editable venv works on ARM64
- verify CLI launches in ARM64 container
- verify config persists across sessions
- verify no root-only assumptions break normal Kasm use
- verify acceptable startup time

## Preferred build strategy

Prefer a direct source-based install during image build over piping the upstream installer script.

Target flow:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
git clone https://github.com/NousResearch/hermes-agent.git ~/.hermes/hermes-agent
cd ~/.hermes/hermes-agent
~/.local/bin/uv venv .venv --python 3.11
~/.local/bin/uv pip install -e .[cli]
```

If browser-tool support is wanted in the image by default, we may also need Node.js present during build.

## Publication rule

Do not enable the Hermes registry entry until the custom image is real and tested.
