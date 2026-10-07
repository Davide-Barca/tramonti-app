# `ExcursionCard`

Source: `src/app/[locale]/(site)/_components/ExcursionCard.tsx` · async Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home upcoming excursions")

## Purpose

Card of one scheduled excursion: photo (4:3), date, title linking to the detail page, and details list with icons: zone, difficulty, spots left ("Completo" at 0).

## When to use

- Lists of dated excursions. Today: home "Prossime escursioni".

## When not to use

- Viaggi or generic content: `TourList` / `Card`.
- If `/escursioni` (or another route) needs it: **move it** to `src/components/site/` (e.g. `sections/` or a new `cards/` group) and move this doc accordingly (component rule: promote on second use).

## Usage

```tsx
import { ExcursionCard } from "./ExcursionCard";

<li className="flex">
  <ExcursionCard excursion={excursion} className="w-full" />
</li>;
```

## Props

| Prop        | Type         | Default  | Notes                                      |
| ----------- | ------------ | -------- | ------------------------------------------ |
| `excursion` | `Escursione` | required | from `features/escursioni` (zod-validated) |
| `className` | `string`     | –        | merged into the `Card`                     |

## Rules and notes

- Data fields (user choice, 2026-10-07): title, date, spots available, zone, difficulty, image. Add fields only on request.
- Date: `<time dateTime="YYYY-MM-DD">` formatted with next-intl `getFormatter` (`timeZone: "Europe/Rome"` set in `src/i18n/request.ts`), e.g. "dom 18 ottobre 2026".
- Details are a `<dl>`: decorative `Icon` + `sr-only` term (`Excursion.zone|difficulty|spots`) + value. Labels/enums from `Excursion` messages (`zones.*`, `difficulties.*`, plural `spotsLeft`).
- Image: `next/image` `fill` in `aspect-4/3` box (no layout shift), `sizes` for the 1/2/3-column grid, lazy (never `preload` here). Placeholders from Lorem Picsum (`picsum.photos` allowed in `next.config.ts` `images.remotePatterns`).
- Title is an `h3` (section title is the `h2`); link on the title only.

## Related

- [UpcomingExcursions](UpcomingExcursions.md), [Card](../../site/ui/Card.md), [Icon](../../shared/Icon.md).
