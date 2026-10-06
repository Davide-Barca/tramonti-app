# `NavLink`

Source: `src/components/site/layout/NavLink.tsx` · **Client Component** · Test: `NavLink.test.tsx`

## Purpose

Navigation link that marks the current section with `aria-current="page"` (and its active style). Client-side only because it needs `usePathname`.

## When to use

- Menus where the current section must be highlighted (header main nav).

## When not to use

- Footer, breadcrumbs, inline links, cards: use `Link` from `@/i18n/navigation` (no client JS needed).

## Usage

```tsx
import { NavLink } from "./NavLink";

<NavLink href="/escursioni">{t("excursions")}</NavLink>;
```

## Props

| Prop       | Type             | Default  | Notes                                   |
| ---------- | ---------------- | -------- | --------------------------------------- |
| `href`     | `StaticPathname` | required | static routes only (no `[slug]` routes) |
| `children` | `ReactNode`      | required | label, translated by the server parent  |

Also exports `isActivePath(pathname, href)`: true for the exact route or its sub-routes (`/escursioni` is active on `/escursioni/[slug]`, not on `/escursioni-su-misura`).

## Rules and notes

- `usePathname` from `@/i18n/navigation` returns the **internal route key** (e.g. `/escursioni/[slug]`), not the real URL.
- Active style changes color/underline only (no bold: no layout shift).
- Keep labels out of the client bundle: pass translated children, don't call `useTranslations` here (`messages={null}` in the provider).
- Tests mock `@/i18n/navigation` (see `NavLink.test.tsx`).

## Related

- [SiteHeader](SiteHeader.md), [nav-items](nav-items.md).
