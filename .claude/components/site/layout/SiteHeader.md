# `SiteHeader`

Source: `src/components/site/layout/SiteHeader.tsx` · async Server Component · Test: e2e (`navigation.spec.ts`)

## Purpose

Site header on every public page: brand link to home + main navigation (`mainNavItems`). Rendered once by `src/app/[locale]/(site)/layout.tsx`.

## When to use

- Only in the `(site)` layout. It is already there.

## When not to use

- Never render it in pages or other layouts (duplicate `header`/`nav` landmarks).

## Usage

```tsx
// src/app/[locale]/(site)/layout.tsx
<SiteHeader />
<main id="main-content">{children}</main>
<SiteFooter />
```

No props.

## Rules and notes

- To add/remove menu entries edit `mainNavItems` in `nav-items.ts`, not this file. Current items: Chi siamo, Escursioni, Viaggi, Contatti (user choice: Escursioni su misura and Apprendimento stay out of the header).
- The brand is a `Link`, never an `h1` (the page has its own).
- `nav` has `aria-label` = `Navigation.mainNav` ("Navigazione principale"); e2e tests select it by that name.
- Only `NavLink` is client-side; labels are translated here on the server.
- No skip link for now (user choice). Mobile menu not built yet: items wrap under the brand.

## Related

- [NavLink](NavLink.md), [nav-items](nav-items.md), [Container](../ui/Container.md).
