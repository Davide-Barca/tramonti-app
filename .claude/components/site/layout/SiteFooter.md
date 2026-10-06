# `SiteFooter`

Source: `src/components/site/layout/SiteFooter.tsx` · async Server Component (no client JS) · Test: e2e (`navigation.spec.ts` "Footer")

## Purpose

Site footer on every public page: brand column (brand link, tagline, contacts in `<address>`, Instagram/Facebook), "Esplora" nav (all pages), "Informazioni legali" nav, bottom bar with copyright, P.IVA and optional travel-agency license/insurance.

## When to use

- Only in the `(site)` layout, after `<main>`. It is already there.

## When not to use

- Never in pages or other layouts (duplicate `contentinfo` landmark).

## Usage

```tsx
// src/app/[locale]/(site)/layout.tsx
<SiteFooter />
```

No props.

## Rules and notes

- Link lists come from `footerNavItems` and `legalNavItems` in `nav-items.ts`; edit those, not this file.
- Company data comes from `company` in `src/lib/site.ts` (**placeholders** until real data: name, VAT number, address, email, phone, license, insurance, social URLs). VAT number must stay visible (legal requirement).
- Column labels are `<p>` + `nav aria-labelledby` (user choice), not headings: keeps the page outline clean. e2e selects navs by the names "Esplora" and "Informazioni legali".
- External (social) links: `target="_blank" rel="noopener noreferrer"` + `sr-only` text `Footer.newTab`.
- Copyright year is computed at build/render time.
- Planned: "Preferenze cookie" `<button>` reopening the iubenda banner.

## Related

- [nav-items](nav-items.md), [Container](../ui/Container.md), `.claude/design/patterns.md` (links).
