# `ExcursionCard`

Source: `src/app/[locale]/(site)/_components/ExcursionCard.tsx` · async Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home upcoming excursions")

## Purpose

Adapter `Escursione` → `TourCard`: one-day date, details zone (MapPin), difficulty (Gauge), spots left (Users; "Completo" at 0).

## When to use

- Inside `UpcomingTours` for escursioni (home). Future `/escursioni` list: promote `TourCard` + this adapter to `src/components/site/` (and move the docs).

## When not to use

- Viaggi: `TripCard`.

## Usage

```tsx
<UpcomingTours …>
  {excursions.map((excursion) => (
    <ExcursionCard key={excursion.slug} excursion={excursion} className="w-full" />
  ))}
</UpcomingTours>
```

## Props

| Prop        | Type         | Default  | Notes                       |
| ----------- | ------------ | -------- | --------------------------- |
| `excursion` | `Escursione` | required | `features/escursioni` (zod) |
| `className` | `string`     | –        | passed to `TourCard`        |

## Rules and notes

- Fields (user choice 2026-10-07): title, date, spots, zone, difficulty, image. Add only on request.
- Labels/enums from `Tour` messages (`zone`, `difficulty`, `spots`, `zones.*`, `difficulties.*`, plural `spotsLeft`).

## Related

- [TourCard](TourCard.md), [TripCard](TripCard.md).
