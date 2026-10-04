# tramonti-app

Public website + admin portal. Next.js (App Router) + TypeScript, deployed on Vercel.
The Express backend lives in a separate repository.

## Requirements

- Node 24.x, npm

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server                            |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | Generate route types + `tsc --noEmit` |

## Structure

```
src/
  app/
    [locale]/          public site root layout (i18n, SEO metadata)
      (site)/          public pages
    (admin)/admin/     admin root layout (noindex)
      login/
      (dashboard)/     session-protected area
    global-not-found.tsx, robots.ts, sitemap.ts
  i18n/                next-intl routing, request config, navigation
  messages/            translations (it.json)
  lib/                 auth (DAL), seo, fonts, site config
  styles/              site.css (Tailwind v4), admin.css (shadcn/ui)
  proxy.ts             i18n routing + optimistic /admin guard
```

## Branches

- `main`: production
- `dev`: development
