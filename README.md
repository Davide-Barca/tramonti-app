# tramonti-app

Public website + admin portal. Next.js 16 (App Router) + TypeScript, deployed on Vercel.

> AI agents: project rules live in [AGENTS.md](AGENTS.md).
> The Express backend lives in a separate repository.

## Requirements

- Node 24.x, npm

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

| Variable               | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, no trailing slash (canonical, sitemap) |
| `API_URL`              | Express API base URL (server-only)                      |

Set them on Vercel for every environment. Never commit `.env*` files except `.env.example`.

## Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server                                 |
| `npm run build`     | Production build                           |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint                                     |
| `npm run typecheck` | Generate route types + `tsc --noEmit`      |
| `npm run format`    | Prettier write (`format:check` for CI)     |
| `npm run test`      | Vitest unit/component tests (`test:watch`) |
| `npm run test:e2e`  | Playwright E2E on a production build       |
| `npm run check`     | lint + typecheck + format:check + test     |

## Structure

```
AGENTS.md              rules for AI agents (canonical; CLAUDE.md imports it)
.claude/               Claude Code project memory (versioned, shared across machines)
.husky/pre-commit      runs lint-staged (eslint --fix + prettier) on staged files
.vscode/               format on save, recommended extensions
e2e/                   Playwright specs (seo, admin)
public/                static assets
src/
  app/
    [locale]/          public site root layout (i18n, SEO metadata)
      (site)/          public pages
      not-found.tsx    localized 404 for notFound() calls
    (admin)/           admin root layout (noindex)
      admin/login/
      admin/(dashboard)/  session-protected area
    global-not-found.tsx  404 for unmatched URLs (multiple root layouts)
    robots.ts, sitemap.ts
    **/_components/    components used by a single route (colocated)
  components/
    site/              public site: layout/, sections/, ui/
    admin/             admin: ui/ (shadcn), layout/, hooks/
    shared/            side-agnostic components
  features/<domain>/   types.ts (zod), queries.ts (cached reads), actions.ts (admin mutations)
  store/               Redux Toolkit (admin only)
  i18n/                next-intl routing, request config, navigation, initLocale
  messages/            translations (it.json)
  lib/
    api/client.ts      apiFetch(): server-only, zod-validated fetch to the Express API
    auth/              session DAL (verifySession) + constants
    seo.ts             canonical/hreflang helper, OG locales
    fonts.ts, site.ts
  styles/              site.css (Tailwind v4), admin.css (shadcn/ui)
  types/               global type augmentation (next-intl)
  proxy.ts             i18n routing + optimistic /admin guard
components.json        shadcn/ui config (components land in src/components/admin/ui)
eslint.config.mjs      Next rules + import boundaries site/admin/shared
next.config.ts         next-intl plugin, globalNotFound, X-Robots-Tag on /admin
vitest.config.mts      jsdom, tsconfig paths, setup in vitest.setup.ts
playwright.config.ts   Chromium desktop + Pixel 7, prod build on port 3100
```

## Conventions

- **Server Components first**: add `"use client"` only where interactivity requires it.
- **i18n**: every `[locale]` layout, page and `generateMetadata` calls `initLocale(params)`.
  Use `Link`/`redirect` from `@/i18n/navigation` in the public site, not `next/link`.
  New locale: add it to `src/i18n/routing.ts` + `src/messages/<locale>.json`.
- **SEO** (public site): semantic HTML, one `<h1>` per page, `generateMetadata` with
  `localeAlternates()`, `next/image` with meaningful `alt`. Admin is always `noindex`.
- **Structure**: components start in the route's `_components/` and move to
  `src/components/{site,admin,shared}` when reused. ESLint blocks site ↔ admin imports.
- **Data**: all API calls go through `apiFetch()` with a zod schema and cache tags
  defined in `src/features/<domain>/`.
- **Auth**: `proxy.ts` only checks cookie presence. Every admin layout, page,
  Server Action and Route Handler must call `verifySession()`.

## Testing

- **Unit/component** (Vitest + Testing Library): colocated `src/**/*.test.ts(x)`.
  Use `// @vitest-environment node` for server-side code (proxy, helpers).
- **E2E** (Playwright): `e2e/*.spec.ts`, run against `next build` + `next start`.
  First run: `npx playwright install chromium`.

## Branches

- `main`: production
- `dev`: development
