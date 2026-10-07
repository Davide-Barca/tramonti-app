# `TourCard`

Source: `src/app/[locale]/(site)/_components/TourCard.tsx` · async Server Component · route-local (home) · Test: e2e (home "upcoming" specs), `src/lib/dates.test.ts` (range format)

## Purpose

Generic presentational card for dated tours: photo (4:3), date or date range with calendar icon, title linking to the detail page, `<dl>` of icon details. Shared by `ExcursionCard` and `TripCard`.

## When to use

- Through the domain adapters (`ExcursionCard`, `TripCard`). Use it directly only for a new kind of dated tour (then add an adapter).

## When not to use

- Undated content: `Card`.

## Usage

```tsx
import { Gauge } from "lucide";
import { TourCard } from "./TourCard";

<TourCard
  href={{ pathname: "/viaggi/[slug]", params: { slug } }}
  title={title}
  image={image}
  date={{ start: "2026-10-30", end: "2026-11-02" }}
  details={[
    { icon: Gauge, label: t("difficulty"), value: t("difficulties.media") },
  ]}
/>;
```

## Props

| Prop        | Type                              | Default  | Notes                                                   |
| ----------- | --------------------------------- | -------- | ------------------------------------------------------- |
| `href`      | `Href` (typed)                    | required | detail page                                             |
| `title`     | `string`                          | required | `h3` (size h4) with the link                            |
| `image`     | `{ src: string; alt: string }`    | required | remote URL (allowed in `images.remotePatterns`)         |
| `date`      | `{ start: string; end?: string }` | required | YYYY-MM-DD; with `end` → range                          |
| `details`   | `{ icon, label, value }[]`        | required | `label` is `sr-only` (`<dt>`), `value` visible (`<dd>`) |
| `className` | `string`                          | –        | merged into `Card`                                      |

## Rules and notes

- Single day: "dom 18 ottobre 2026" (next-intl `format.dateTime`). Range: `formatDayRange` (`src/lib/dates.ts`) → "13–15 novembre 2026", "30 ottobre – 2 novembre 2026". Don't use `format.dateTimeRange`: Intl pads Italian days ("04–10 luglio").
- `<time dateTime={start}>`; time zone fixed to Europe/Rome.
- Image `fill` in `aspect-4/3`, `sizes` for the 1/2/3-column grid, lazy (no `preload`).
- Icons decorative (`Icon`), meaning in `sr-only` term + visible value.

## Related

- [ExcursionCard](ExcursionCard.md), [TripCard](TripCard.md), [UpcomingTours](UpcomingTours.md), [Card](../../site/ui/Card.md), [Icon](../../shared/Icon.md).
