---
name: code-structure
description: Agreed src/ code organization (components site/admin/shared, features per domain, apiFetch + zod) and ESLint import boundaries
metadata:
  type: project
---

Decided 2026-10-05 with the user, before porting the old design ("solid structure first").

- Components split by side: `src/components/{site,admin,shared}`; route-only components colocated in `app/**/_components/`, promoted to `components/` on second use.
- Domain code in `src/features/<domain>/` (types.ts with zod, queries.ts cached reads, actions.ts admin mutations). Chosen over `lib/api/<domain>` because site reads and admin mutations share types + cache tags.
- `src/lib/api/client.ts` → `apiFetch(path, { schema, next })`: server-only, `API_URL` env, zod validation mandatory (Express API has no typed contract).
- `components.json` written by hand (shadcn not initialized yet: no `cn`/`lib/utils`, no deps). Aliases point to `@/components/admin/*`, CSS `src/styles/admin.css`.
- ESLint `no-restricted-imports` enforces boundaries (site ✗ admin/store/redux/next/link; admin ✗ site; shared ✗ both). Verified with throwaway files.
- `src/assets/images/` (created 2026-10-06) for static site images imported in code; no `public/` folder yet (create it only for files that need a fixed URL: PDFs, verification files). Admin-managed images go to GCS.
- Rejected: atomic design folders, everything colocated in `app/`, monorepo.

**Why:** Biggest risk = admin client code (shadcn/Redux) leaking into the public bundle and hurting CWV/SEO.
**How to apply:** Place new code per AGENTS.md "Code organization". Don't disable boundary rules; move code. See [[tramonti-rebuild-stack]], [[seo-rules-frontend]].
