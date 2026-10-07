# `WhyTramonti`

Source: `src/app/[locale]/(site)/_components/WhyTramonti.tsx` · async Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home why Tramonti")

## Purpose

Last home section so far ("Perché Tramonti"): `h2` + lead, then a grid of strengths (1 column mobile → `sm:` 2 → `lg:` 4). Each item: icon in an `accent` circle, `h3` title, text, optional link.

## When to use

- Home page only, after the two `UpcomingTours` sections.

## When not to use

- Other pages needing an icon/feature grid (e.g. Chi siamo): promote it to `components/site/sections/` as a generic `FeatureGrid` (items as props) and move this doc.

## Usage

```tsx
import { WhyTramonti } from "./_components/WhyTramonti";

<WhyTramonti />;
```

No props: items are defined in the component (`reasons`: message key + lucide icon + optional typed link), texts in `HomePage.why` (`title`, `lead`, `items.<key>.title|text|link`).

## Rules and notes

- Current items (derived from existing site copy, edit texts in `it.json`): `guides` (BadgeCheck, guide AIGAE), `zones` (Mountain, Appennino e Dolomiti), `groups` (Users, gruppi di appassionati), `custom` (Compass, link → `/escursioni-su-misura`).
- Adding an item: add the key to `Reason["key"]`, an entry in `reasons`, and its messages; e2e expects the `h3` count (update it).
- Links need a descriptive label (SEO/a11y): "Scopri le escursioni su misura", not "Scopri di più". The link label key is typed (`items.custom.link`).
- Default tone (the trips section before it is `muted`); `aria-labelledby="why-title"` (e2e selects the region by name).

## Related

- [Icon](../../shared/Icon.md), [Section](../../site/ui/Section.md), [UpcomingTours](UpcomingTours.md).
