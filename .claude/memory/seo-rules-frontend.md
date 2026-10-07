---
name: seo-rules-frontend
description: "Public website code (route group (site)) must always follow SEO optimization rules — components, HTML tags, metadata"
metadata:
  node_type: memory
  type: feedback
  originSessionId: e7089145-ba41-4f2b-9a76-1d71881dafa1
  modified: 2026-10-04T15:40:41.895Z
---

All code/components/HTML on the public website frontend (`(site)` route group) must always follow SEO best practices. Applies to every change, not only when asked.

**Why:** User stated it as a fundamental, always-on rule for the tramonti-app rebuild (Next.js App Router). Site is mostly static content, SEO is primary goal.

**How to apply:**

- Semantic HTML: one `<h1>` per page, ordered heading hierarchy, `<header>/<nav>/<main>/<article>/<section>/<footer>`, real `<a href>` via `next/link` (no onClick navigation), `<button>` only for actions.
- Metadata API: `generateMetadata`/`metadata` per page (title, description, canonical, openGraph, twitter, alternates/hreflang ready for future locales), `lang="it"` on `<html>`.
- `sitemap.ts`, `robots.ts`, JSON-LD structured data (Organization/LocalBusiness/BreadcrumbList etc. as fits).
- `next/image` with meaningful `alt`, width/height, `preload` on LCP image (Next 16 deprecated `priority`); `next/font` to avoid CLS.
- Prefer Server Components / static rendering so content is in initial HTML; avoid client-only rendering of indexable content.
- Core Web Vitals: minimal client JS, no layout shift, lazy below-the-fold.
- Not required for `(admin)` — admin should be `noindex`.

Canonical checklist: AGENTS.md "SEO" section. Related: [[tramonti-rebuild-stack]]
