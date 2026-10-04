---
name: tramonti-rebuild-stack
description: "Agreed stack/architecture decisions for tramonti-app Next.js rebuild (frontend site + admin, backend Express skipped)"
metadata:
  node_type: memory
  type: project
  originSessionId: e7089145-ba41-4f2b-9a76-1d71881dafa1
  modified: 2026-10-04T15:40:47.451Z
---

Rebuild from scratch (decided 2026-10-04) of an existing React app in production: public site + admin portal. Separate Express backend is out of scope for now (auth stubbed until backend details given).

- Single Next.js app, App Router, TypeScript, Server Components first.
- Route groups `(site)` + `(admin)`; auth guard on `/admin` via `proxy.ts` (Next 16 middleware) + server-side session check (DAL).
- Scaffold done 2026-10-04 on `dev`: code in `src/`, two root layouts (`app/[locale]/layout.tsx` for site, `app/(admin)/layout.tsx` for admin, admin NOT under `[locale]`), `experimental.globalNotFound`, separate `styles/site.css` + `styles/admin.css`. Every `[locale]` page/layout/generateMetadata calls `initLocale(params)` (src/i18n/locale.ts). Auth DAL in `src/lib/auth/session.ts` is a presence-only stub until backend contract is known.
- Site: Tailwind v4. Admin: shadcn/ui + Redux Toolkit (Provider only in admin layout).
- Data from API, mostly static, rarely changes → cached fetch + long revalidate + tags, on-demand `revalidateTag`.
- i18n: Italian only now, ready for more (next-intl, `localePrefix: "as-needed"`).
- Admin image upload (single/multiple) → Google Cloud Storage bucket via signed URLs (direct upload, avoid Vercel 4.5MB limit).
- Deploy Vercel, npm, ESLint + Prettier, Vitest + Testing Library + Playwright (details: [[tooling-testing]]).
- Branches: `main` + `dev`.
- Keep current design, revise some components where needed. Old code path not yet provided.

**Why:** User-confirmed decisions; user prefers caveman mode for this conversation.
**How to apply:** Follow these when scaffolding/coding; don't re-ask. Enforced rules are in AGENTS.md. See [[seo-rules-frontend]].
