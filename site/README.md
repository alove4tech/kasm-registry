# Registry Site

This directory contains the static site used to publish the Kasm registry.

## Purpose

The site provides:

- registry landing page
- generated workspace listing
- metadata and discovery endpoints used by Kasm

## Key files

- `next.config.js` — registry/site metadata and base path settings
- `pages/` — site routes
- `components/` — UI components
- `public/` — static assets
- `styles/` — site styling

## Local development

```bash
npm ci
npm run dev
```

Then open:

`http://localhost:3000`

## Static export

This project is exported as a static site during the build process.

## Important config

Update `next.config.js` for:

- registry name
- description
- icon
- list URL
- contact URL
- base path

## Notes

The output of this site is meant to align with the registry branch/version structure used by the build script.
