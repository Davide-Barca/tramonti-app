# Design system: tramonti-app (public site)

Source of truth for **how components and sections look and are built**. Every agent (Claude, Codex, Cursor…) reads it before creating or restyling anything in `src/components/site/` or `src/app/[locale]/`. The admin portal is out of scope (shadcn/ui, own theme in `src/styles/admin.css`).

Rules that must never be broken live in `AGENTS.md` ("Styling", "SEO"). This folder explains the system behind them: values, visual patterns, recipes. Per-component docs (purpose, when to use, props, examples) live in `.claude/components/`.

| File                           | Read it when                                                                |
| ------------------------------ | --------------------------------------------------------------------------- |
| [principles.md](principles.md) | always first: visual direction, what the site should feel like              |
| [tokens.md](tokens.md)         | choosing colors, type sizes, spacing, widths, radii                         |
| [components.md](components.md) | using or extending the UI primitives (`components/site/ui/`)                |
| [sections.md](sections.md)     | composing a page or creating a new page block (`components/site/sections/`) |
| [patterns.md](patterns.md)     | layout, responsive, links/states, images, accessibility details             |
| [checklist.md](checklist.md)   | before calling a component or section done                                  |

## Workflow for a new component or section

1. Read `principles.md`, then the file for what you are building.
2. Reuse existing primitives first. Need something new? Follow the recipe in `components.md` / `sections.md`.
3. Use only the tokens in `tokens.md`. Missing value → add a token (see "Adding a token"), never an arbitrary value.
4. Verify with `checklist.md` (and a screenshot at 1280px and Pixel 7 width).
5. **Keep docs in sync**: new/changed component or section → its file in `.claude/components/` (+ index); new token, variant or visual pattern → the matching file here. Same change.

## Status

- Palette and fonts are **placeholders** (warm sand neutrals + military green, Geist) until the old site's design is ported. Components must use semantic tokens so the brand swap only touches `src/styles/site.css` and `src/lib/fonts.ts`.
- No dark mode for now.
