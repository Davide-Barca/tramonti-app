---
name: tooling-testing
description: Lint/format/test setup for tramonti-app (Prettier, husky, Vitest, Playwright) and the non-obvious gotchas found while setting it up
metadata:
  type: project
---

Setup committed 2026-10-04 on `dev` (c57d558).

- Prettier + `prettier-plugin-tailwindcss` (`tailwindStylesheet: ./src/styles/site.css`, sorts classes in `cn()`/`cva()`). `eslint-config-prettier/flat` is last in `eslint.config.mjs`.
- `.gitattributes` forces LF (user is on Windows with `core.autocrlf`).
- husky pre-commit → `npx lint-staged` (eslint --fix + prettier on staged files).
- `npm run check` = lint + typecheck + format:check + test. Run it before every commit.
- Vitest: tests colocated `src/**/*.test.ts(x)`, jsdom default, `// @vitest-environment node` for server code. Vite 8 native `resolve.tsconfigPaths` (no vite-tsconfig-paths plugin).
- Playwright: `e2e/`, Chromium desktop + Pixel 7, runs `next build && next start` on port 3100 with `NEXT_PUBLIC_SITE_URL` set to that URL. Firefox/WebKit not configured yet.

Gotchas:

- next-intl imports `next/server` without extension → Vitest needs `test.server.deps.inline: ["next-intl"]`.
- `@types/node` must be `^24` (Node 24 runtime); `^20` blocked Vitest 5 install (ERESOLVE).
- Lockfile generated on Windows misses platform optional deps (e.g. `@emnapi/runtime`) → `npm ci` fails on macOS with EUSAGE. Run `npm install` once to resync (fixed 2026-10-05).
- Files importing `server-only` throw under Vitest: `vi.mock("server-only", () => ({}))` then dynamic `await import()` (see `src/lib/api/client.test.ts`).
- next-intl `Link` is a client component: without `NextIntlClientProvider` the build fails prerendering with an empty `Error:` (dev shows "No intl context found"). Provider lives in `[locale]/layout.tsx` with `messages={null}`. Debug empty prerender errors with `next dev` + curl.
- Vitest globals are off → Testing Library does not auto-cleanup; `vitest.setup.ts` registers `afterEach(cleanup)` (missing it caused "Found multiple elements").
- `@/i18n/navigation` `usePathname` with `pathnames` returns the internal route key (e.g. `/escursioni/[slug]`), not the real URL.
- Next 16 `next/image`: `priority` is deprecated → use `preload`. Remote redirects (e.g. picsum → fastly.picsum) are followed without re-checking `remotePatterns` (`maximumRedirects`, default 3).
- `lucide-react` v1 icons are client components (`"use client"` in `Icon.mjs`): site uses vanilla `lucide` + `components/shared/Icon` instead. `lucide-react` was installed then removed (2026-10-07); add it back only for admin/shadcn.
- `text-md` is not a Tailwind class (silently generates nothing): use `text-base`.
- `npm audit` reports 5 high (`braces` via `eslint-config-next`), dev-only. Do NOT run `npm audit fix --force`: it downgrades eslint-config-next to 14.

**Why:** Avoid re-debugging the same issues on other machines/sessions.
**How to apply:** New tests follow these locations/conventions; SEO changes get an e2e assertion in `e2e/seo.spec.ts`. See [[seo-rules-frontend]], [[tramonti-rebuild-stack]].
