<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# tramonti-app: agent rules

Rules for every AI agent working in this repo. This file is the canonical source of project rules. Do not edit the `nextjs-agent-rules` block above: `next dev` rewrites it, and everything below it is preserved.

## Project

- Rebuild of a React app in production: **public website + admin portal**. Express backend is a separate repo and out of scope.
- Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, next-intl. Deploy on Vercel. Node 24.x, **npm** only.
- Keep the current site design; revise components only where needed.

## Before you start

1. Read `.claude/memory/project-status.md` (done steps, next steps, open TODOs) and `.claude/memory/MEMORY.md` (index of project decisions).
2. Before creating or restyling any public-site component, section or page: read `.claude/design/` (start from `README.md`). It is the design system reference (tokens, components, sections, patterns, checklist) for every agent.
3. Before using, changing or creating a component: read its doc in `.claude/components/` (index in `README.md`, one file per component mirroring `src/components/` and route `_components/`). It explains what the component is for, when to use it and how.
4. Work on `dev`. `main` is production. Never push, merge into `main` or start the next roadmap step without explicit user approval.

## Commands

- `npm run check`: lint + typecheck + format:check + unit tests. **Must pass before every commit.**
- `npm run test:e2e`: Playwright on a production build. Run it when routing, metadata, SEO or auth change.
- `npm run format`: Prettier (Tailwind classes are sorted automatically).
- A husky pre-commit hook runs lint-staged. Never bypass it with `--no-verify`.

## Architecture

- Code lives in `src/`. Path alias `@/*` → `src/*`.
- Two root layouts:
  - `src/app/[locale]/`: public site (`(site)` route group), Tailwind v4, `styles/site.css`.
  - `src/app/(admin)/admin/`: admin portal, **not** under `[locale]`, shadcn/ui + Redux Toolkit, `styles/admin.css`.
  - Unmatched URLs are handled by `src/app/global-not-found.tsx` (`experimental.globalNotFound`).
- `src/proxy.ts` (Next 16 replacement of `middleware.ts`): next-intl routing + optimistic `/admin` guard.

### Code organization

```
src/app/…/_components/   used by ONE route only (colocated, private folder)
src/components/site/     public site: layout/ (header, footer, nav), sections/ (page blocks), ui/ (primitives)
src/components/admin/    admin: ui/ (shadcn-generated, alias in components.json), layout/, hooks/
src/components/shared/   side-agnostic only (e.g. JSON-LD, icons)
src/features/<domain>/   types.ts (zod schemas + types), queries.ts (cached reads), actions.ts (admin Server Actions)
src/lib/api/client.ts    apiFetch(): server-only fetch to the Express API, zod-validated
src/assets/images/       static site images, imported in code (`import img from "@/assets/images/…"`) for next/image
src/store/               Redux Toolkit, admin only
```

- A component starts in the route's `_components/` and moves to `src/components/` only when a second route needs it.
- **Component docs are mandatory**: every new component, and every change to an existing one (props, variants, behavior, usage, location), creates/updates its file in `.claude/components/` **in the same change**, following the template in `.claude/components/README.md` (purpose, when to use, when not to use, usage example, props, rules, related), and updates the index there. Moving or deleting a component moves/deletes its doc. This applies to site, shared, admin and route-local (`_components/`) components.
- Pages in `app/` stay thin: fetch, metadata, composition.
- **Import boundaries are enforced by ESLint** (`no-restricted-imports` in `eslint.config.mjs`): the site cannot import `components/admin`, `store`, Redux; the admin cannot import `components/site`; shared code (`lib`, `features`, `i18n`, `components/shared`) imports neither side. The site also cannot import `next/link` or `redirect`/`useRouter`/`usePathname` from `next/navigation`. Do not disable these rules: move the code to the right place instead.
- Every API call goes through `apiFetch(path, { schema, next: { tags, revalidate } })`. Never call `fetch` on the API directly, never skip the zod schema.
- `queries.ts`, `actions.ts` and anything touching the API or secrets start with `import "server-only"`.
- Cache tags are defined once per domain in `features/<domain>/` and shared by reads (site) and invalidation (admin: `updateTag` in Server Actions for read-your-own-writes, `revalidateTag(tag, "max")` otherwise).
- **Server Components by default.** Add `"use client"` only for interactivity, as low in the tree as possible. No Redux, no client providers in the public site. Only exception: `NextIntlClientProvider messages={null}` in `[locale]/layout.tsx` (next-intl `Link` needs the locale). Keep `messages={null}`: if a client component needs translations, pass it a picked subset.
- Data comes from the Express API, is mostly static and changes rarely: fetch in Server Components with caching + tags, revalidate on demand after admin mutations.
- Admin image uploads go to Google Cloud Storage via signed URLs (direct browser upload, never through Vercel functions).

## i18n

- Italian only for now, structured for more locales (`localePrefix: "as-needed"`, so `it` has no URL prefix).
- Every `[locale]` layout, page and `generateMetadata` must call `initLocale(params)` from `@/i18n/locale`.
- Dates/numbers: format with next-intl (`getFormatter()` on the server); time zone is fixed to `Europe/Rome` in `src/i18n/request.ts`. Plurals via ICU messages.
- Public site: use `Link`, `redirect` and `getPathname` from `@/i18n/navigation`, not `next/link` / `next/navigation`.

## Routes (public site)

- Every public route is declared in `pathnames` in `src/i18n/routing.ts` **before** creating its folder. Keys are the internal paths (= folder structure, Italian slugs); values can be translated per locale later.
- Hrefs are typed: `href="/chi-siamo"` or `{ pathname: "/escursioni/[slug]", params: { slug } }`. A route missing from `pathnames` is a type error.
- Current routes: `/`, `/chi-siamo`, `/escursioni`, `/escursioni/[slug]`, `/escursioni-su-misura`, `/viaggi`, `/viaggi/[slug]`, `/apprendimento`, `/contatti`, `/lavora-con-noi`, and the legal pages `/privacy-policy`, `/cookie-policy`, `/termini-e-condizioni` in the `(legal)` route group (shared `<article>` layout, no URL segment).
- Static pages: `generateMetadata` returns `staticPageMetadata(locale, "<Namespace>", href)` (`src/lib/seo.ts`); texts in `src/messages/it.json` under `<Namespace>` with `metaTitle`, `metaDescription`, `title`. Add new namespaces to `StaticPageNamespace`.
- Detail pages (`[slug]`): `generateStaticParams` from the feature query, `notFound()` for unknown slugs, `Breadcrumbs` (visible + BreadcrumbList JSON-LD) and `TouristTrip` JSON-LD via `components/shared/JsonLd`.
- Legal texts come from iubenda (`features/legal/queries.ts`, server-rendered, `IUBENDA_POLICY_ID` + `IUBENDA_TERMS_ID`). Without ids the page shows a placeholder.
- Header: `components/site/layout/SiteHeader.tsx` (Server Component, minimal styling with semantic tokens until the old design is ported; mark the current page with underline, not bold, to avoid layout shift) rendered by the `(site)` layout. Main menu items live in `components/site/layout/nav-items.ts` (`mainNavItems`: typed `StaticPathname` + `Navigation` message key); currently Chi siamo, Escursioni, Viaggi, Contatti. Escursioni su misura, Apprendimento and legal pages are not in the header. `NavLink` is the only client part (`usePathname` for `aria-current="page"`, prefix match so detail pages mark their section); labels are translated on the server and passed as children.
- Footer: `components/site/layout/SiteFooter.tsx` (Server Component, no client JS) rendered after `<main>` by the `(site)` layout. Link lists in `nav-items.ts`: `footerNavItems` ("Esplora": all pages incl. Escursioni su misura, Apprendimento, Lavora con noi) and `legalNavItems`. Column labels are `<p>` + `nav aria-labelledby`, not headings. Company data (name, VAT number, address, email, phone, optional travel-agency license/insurance, social URLs) lives in `company` in `src/lib/site.ts`: **placeholders until the real data is provided**. External links: `target="_blank" rel="noopener noreferrer"` + `sr-only` "new tab" text.
- No hardcoded UI strings in the public site: add them to `src/messages/it.json` (typed via `src/types/next-intl.d.ts`).

## Styling (public site)

Design details (values, component APIs, section recipes, checklist): **`.claude/design/`**. Rules below are mandatory.

- **Tailwind utilities inline** in JSX. Reuse = React components (`Container`, `Section`, `Heading`…), never `@apply` classes. `@apply` is allowed only inside `.prose`.
- `src/styles/site.css` holds only: primitive palette (`:root`, `--sand-*`, `--olive-*`), theme tokens (`@theme inline`), `@layer base` (body colors, `text-wrap`, global `:focus-visible` outline, `::selection`), `.prose` for HTML we cannot add classes to (iubenda, rich text).
- **Semantic tokens only** in components: `background`, `foreground`, `muted`, `muted-foreground`, `border`, `primary`, `primary-hover`, `primary-foreground`, `accent`. Tailwind's default palette is disabled (`--color-*: initial`): `bg-neutral-100` etc. do not exist. Never use primitives (`--sand-*`, `--olive-*`) or hex outside `site.css`. New color = new semantic token.
- Other tokens: fonts `font-sans`, `font-display`; fluid headings `text-display|h1|h2|h3` (`clamp()`); `text-shadow-glow` (hero emphasis); `max-w-page` (72rem), `max-w-narrow` (42rem); `py-section` (fluid); `rounded-card`. Adding a size/spacing/container/radius token? Register it in `extendTailwindMerge` in `src/lib/utils.ts` too, or `cn()` will drop it.
- No arbitrary values (`w-[37px]`, `text-[#fff]`): add a token. `rem`-based scale, mobile-first (`md:`/`lg:` add on top).
- No layout shift: explicit image sizes; state changes (active, hover) must not change element size (underline/color, not bold).
- Icons: `Icon` from `@/components/shared/Icon` with data from the vanilla `lucide` package (`import { MapPin } from "lucide"`), server-rendered, zero client JS. **Never `lucide-react` in the public site** (client component in v1; reserved for admin/shadcn). Icons are decorative: meaning goes in text (`sr-only` if needed).
- Every component accepts `className` and merges it with `cn()` (`@/lib/utils`). Variants with `cva` inside the component, no long ternaries in class strings.
- Building blocks: `components/site/ui/` (`Container`, `Section`, `Heading`, `Prose`, `Card`, `Button`/`ButtonLink`, `Badge`, `Breadcrumbs`) and page blocks `components/site/sections/` (`PageIntro` first on every page **except home**, `Hero` first on home only, `TourList`). Home sections so far: `Hero`, then `UpcomingExcursions` (route-local, `(site)/_components/`), next planned "Perché Tramonti". Navigation CTAs are `ButtonLink` (real `href`), `Button` only for actions. Per-component docs in `.claude/components/`; visual summary and recipes in `.claude/design/components.md` and `sections.md`.
- Palette is a placeholder (warm sand neutrals + military green `primary`, AA contrast checked). No dark mode for now.

## SEO (mandatory for the public site)

Every component, page and HTML tag in `(site)` must follow SEO best practices:

- Semantic HTML: exactly one `<h1>` per page, ordered headings, `header`/`nav`/`main`/`article`/`section`/`footer`. The `(site)` layout already renders `<main>`: pages must not add another.
- Navigation through real links (`Link` with `href`), never `onClick` navigation. `<button>` only for actions.
- Every page exports `generateMetadata` with title, description and `alternates: localeAlternates(locale, href)` (canonical + hreflang).
- Images: `next/image` with meaningful `alt`, explicit size (or `fill` in an `aspect-*` box), `preload` only on the LCP image (Next 16: `priority` is deprecated, don't use it). Remote hosts must be listed in `images.remotePatterns` (`next.config.ts`; now only `picsum.photos` placeholders). Fonts: `next/font`.
- Indexable content must be in the server-rendered HTML (no client-only rendering).
- Add structured data (JSON-LD) where relevant. The sitemap is built from `staticPathnames` + feature queries: new static routes appear automatically, new dynamic routes must be added to `src/app/sitemap.ts`.
- Core Web Vitals: minimal client JS, no layout shift, lazy-load below the fold.
- Admin is always `noindex` (metadata + `X-Robots-Tag` + robots.txt). Keep it that way.
- SEO changes need an assertion in `e2e/seo.spec.ts`. Static routes are tested automatically from `staticPathnames`; add a sample URL for each new dynamic route.

## Auth & security

- `proxy.ts` only checks that the session cookie **exists**. That is not authorization.
- Every admin layout, page, Server Action and Route Handler must call `verifySession()` from `@/lib/auth/session`.
- `src/lib/auth/session.ts` is currently a presence-only **stub** (backend contract unknown). It must not reach production as is.
- `API_URL` (Express base URL) is server-only. Secrets (GCS service account, API keys) are server-only env vars: never `NEXT_PUBLIC_*`, never committed. Only `.env.example` is versioned.

## Testing

- Vitest + Testing Library: colocated `src/**/*.test.ts(x)`. Add `// @vitest-environment node` for server code. DOM cleanup runs after each test (`vitest.setup.ts`). Client components using `@/i18n/navigation`: mock that module (see `NavLink.test.tsx`).
- Playwright: `e2e/*.spec.ts`, Chromium desktop + Pixel 7, production build on port 3100.

## Git

- Conventional Commits (`feat:`, `fix:`, `chore:`…), English, imperative mood.
- Commit only when the user explicitly asks. Never run or propose commit commands on your own (not even in a plan); if a commit seems advisable, just say so.

## Docs & memory sync (required)

When you add or change files, folders, scripts, tooling or conventions, update **in the same change**:

1. `AGENTS.md` (this file): rules and conventions agents must follow.
2. `README.md`: human-facing setup, scripts and structure.
3. `.claude/memory/`: decisions and status (`project-status.md` at least), with the index in `MEMORY.md`. The folder is versioned on purpose: shared across machines and agents.
4. `.claude/components/`: one doc per component, created/updated with every component change (see "Code organization").
5. `.claude/design/`: when tokens, variants, sections or visual patterns change.
