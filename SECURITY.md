# Security Policy

## Reporting

If you find a security issue in a workspace definition or the registry infrastructure, please open an issue or contact the maintainer directly.

## Scope

This policy covers the registry site, workspace metadata, and build pipeline. It does not cover the upstream container images referenced by workspace definitions — report those to the respective image maintainers.

## Workspace definitions

Workspace configs (`workspace.json`) are metadata-only. If a workspace references a malicious or compromised upstream image, open an issue so it can be removed or updated.
