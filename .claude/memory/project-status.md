---
name: project-status
description: Current progress, open TODOs and next steps of the tramonti-app rebuild (update when a step is done)
metadata:
  type: project
---

Status as of 2026-10-05 (branch `dev`, not pushed, `main` still at initial commit):

Done:

1. Scaffold: `src/`, i18n, site/admin route groups, SEO base (03dcc3b).
2. Prettier/ESLint/husky + Vitest/Playwright (c57d558).
3. Code structure: component folders, `features/`, `apiFetch` + zod, `components.json`, ESLint import boundaries (1ab7ea8, see [[code-structure]]).
4. Public routes: all `[locale]/(site)` pages with placeholder markup, typed `pathnames`, metadata, Breadcrumbs + JSON-LD, dynamic sitemap, iubenda legal pages, e2e over every route (see [[public-routes]]).
5. Header: `SiteHeader` with minimal neutral Tailwind styling (flex, wraps on mobile, underline on current page, no brand colors) + `NavLink` (aria-current) + `nav-items.ts` with Chi siamo, Escursioni, Viaggi, Contatti; e2e `navigation.spec.ts`. User chose no skip link for now.
6. Styling foundation: tokens + palette in site.css, `cn`/`cva`, Container/Section/Heading/Prose/Card, PageIntro/TourList applied to every page (see [[styling]]); design system docs in `.claude/design/`.
7. Footer: `SiteFooter` (brand, contacts, Instagram/Facebook, Esplora incl. new `/lavora-con-noi` page, legal links, copyright + P.IVA); company data placeholders in `src/lib/site.ts`; e2e in `navigation.spec.ts`.
8. Component docs: `.claude/components/` with one doc per existing component (14) + index/template; rule in AGENTS.md that every new/changed component updates its doc.
9. Home hero: `Hero` + `HeroEmphasis`, `Button`/`ButtonLink`, `Badge`, `text-shadow-glow` token; gradient background (first photo removed by user; `Hero` supports `image` + light scrim); 2 CTAs → /escursioni, /escursioni-su-misura. Header unchanged. Other home sections: wait for user instructions.

Order agreed: public site before admin (admin blocked on auth contract + GCS details). User wants solid structure before sharing the old project.

Next (user approves each step explicitly; don't start without go-ahead):

- Data layer: first `features/<domain>` once API endpoints are known; decide whether to enable Next 16 `cacheComponents`. Needs API URL + endpoint list.
- Site layout: brand styling (real palette/fonts) + header mobile menu (`<details>` or minimal client), skip link (declined for now), brand fonts, favicon.
- Forms: contatti + escursioni-su-misura (Server Actions, anti-spam, delivery to API/email).
- iubenda cookie banner (CWV + consent), and real iubenda ids.
- 301 redirects from the old site's URLs (when the old project is shared).
- Port current design: needs path to the old React project (user will share later).
- shadcn/ui init (`cn`, deps, theme in admin.css) + Redux Toolkit on admin.
- GCS image upload via signed URLs (needs bucket name, public/private, bucket CORS).

Open TODOs in code:

- `src/lib/auth/session.ts` is a presence-only stub: anyone with a `session` cookie gets in. Must not ship to production until wired to the Express backend (token format and login endpoint unknown).
- Fonts are Geist placeholders (`src/lib/fonts.ts`) → brand fonts.
- `favicon.ico` is the Next default → brand icons (`app/icon.png`, `apple-icon.png`).
- Home hero needs a photo: add to `src/assets/images/`, pass `image` to `Hero`, re-measure contrast.
- `company` in `src/lib/site.ts` is placeholder data (name, P.IVA, address, email, phone, license, insurance, Instagram/Facebook URLs): user has no real info yet (2026-10-06). Must be replaced before production.
- `src/features/{escursioni,viaggi}/fixtures.ts` are temporary sample data: replace with `apiFetch` in `queries.ts` when endpoints are known, then delete them and update the e2e `detailPages` slugs.
- `NEXT_PUBLIC_SITE_URL`, `API_URL`, `IUBENDA_POLICY_ID`, `IUBENDA_TERMS_ID` must be set on Vercel.

**Why:** Lets any machine/session resume where the work stopped.
**How to apply:** Read before proposing next steps; update this file when a step completes. See [[tramonti-rebuild-stack]], [[tooling-testing]].
