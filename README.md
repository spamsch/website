# Simon Pamies — Personal Site

This repository contains the source for my Astro-powered website. It blends a customized Blogster "sleek" theme with content that documents the systems I architect: SAP BTP platforms, AI memory fabrics, IoT products, and event analytics. The site is built with Astro, Tailwind CSS, Markdoc, and a small shared package that handles content loading and SEO metadata.

## Features

- **Project case studies:** Markdown-driven blog posts that highlight how I plan, build, and ship large-scale platforms.
- **Markdoc content pipeline:** Shared utilities (`packages/shared`) validate frontmatter, parse markdown, and deliver structured content to Astro pages.
- **Tag-aware blog index:** Posts are filtered, ordered, and tagged so visitors can scan themes quickly.
- **Light/dark theming:** Tailwind-powered design tuned to keep headings, bullets, and tags aligned with the brand palette.
- **Static build:** `npm run build` outputs a static `dist/` directory ready for Netlify or any static host.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:9001 by default (configured in `astro.config.mjs`). Markdown content lives in `packages/shared/content`.

## Content Structure

- `packages/shared/content/blog` — All blog posts with frontmatter validated by `packages/shared/src/markdoc/frontmatter.schema.ts`.
- `packages/shared/src/markdoc` — Markdoc configuration, readers, and frontmatter schemas.
- `src/pages` — Astro routes (`index.astro`, `blog.astro`, `projects.astro`, etc.).
- `src/components` — UI components such as `Header`, `Intro`, `Renderer`, and layout primitives.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start Astro in dev mode |
| `npm run build` | Generate the static site into `dist/` |
| `npm run preview` | Preview the production build |

## Deployment

The project includes `netlify.toml` so Netlify builds from the repo root with `npm run build` and publishes the static site from `dist/`.

## License

This repo is MIT licensed. Blog content © Simon Pamies.
