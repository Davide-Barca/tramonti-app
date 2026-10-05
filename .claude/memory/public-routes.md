---
name: public-routes
description: Public site route decisions (Italian slugs, typed next-intl pathnames, /escursioni-su-misura top-level, single apprendimento page, iubenda legal pages, fixtures)
metadata:
  type: project
---

Decided 2026-10-05 with the user.

- URLs: standard Italian slugs (`/chi-siamo`, `/escursioni`, `/viaggi`, `/contatti`, …). Not checked against the old production site: add 301 redirects later if old URLs differ.
- `/escursioni-su-misura` is top-level (not `/escursioni/su-misura`) to avoid clashing with `/escursioni/[slug]`.
- `/apprendimento` is a single page (no detail route).
- Legal pages from iubenda: `/privacy-policy`, `/cookie-policy`, `/termini-e-condizioni` in `(legal)` group, fetched server-side via iubenda public API (`/api/privacy-policy/{id}/no-markup`, `.../cookie-policy/no-markup`, `/api/terms-and-conditions/{id}/no-markup`, response `{ success, content | error }`). Privacy + cookie share one id. iubenda h1s are demoted to h2.
- next-intl `pathnames` enabled with identity mapping: typed hrefs, single route list for sitemap/e2e (`staticPathnames`).
- Escursioni/viaggi data from temporary fixtures until the API endpoints are known.

**Why:** User wanted the full route skeleton with SEO before porting the old design.
**How to apply:** Follow AGENTS.md "Routes (public site)". See [[code-structure]], [[seo-rules-frontend]], [[project-status]].
