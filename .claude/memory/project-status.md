---
name: project-status
description: Current progress, open TODOs and next steps of the tramonti-app rebuild (update when a step is done)
metadata:
  type: project
---

Status as of 2026-10-04 (branch `dev`, not pushed, `main` still at initial commit):

Done:

1. Scaffold: `src/`, i18n, site/admin route groups, SEO base (03dcc3b).
2. Prettier/ESLint/husky + Vitest/Playwright (c57d558).

Next (user approves each step explicitly; don't start without go-ahead):

- shadcn/ui + Redux Toolkit on admin.
- Data layer: API fetch with cache + tags; decide whether to enable Next 16 `cacheComponents`.
- Port current design: needs path to the old React project (not provided yet).
- GCS image upload via signed URLs (needs bucket name, public/private, bucket CORS).

Open TODOs in code:

- `src/lib/auth/session.ts` is a presence-only stub: anyone with a `session` cookie gets in. Must not ship to production until wired to the Express backend (token format and login endpoint unknown).
- Fonts are Geist placeholders (`src/lib/fonts.ts`) → brand fonts.
- `favicon.ico` is the Next default → brand icons (`app/icon.png`, `apple-icon.png`).
- Header/footer missing in `src/app/[locale]/(site)/layout.tsx`.
- `NEXT_PUBLIC_SITE_URL` must be set on Vercel.

**Why:** Lets any machine/session resume where the work stopped.
**How to apply:** Read before proposing next steps; update this file when a step completes. See [[tramonti-rebuild-stack]], [[tooling-testing]].
