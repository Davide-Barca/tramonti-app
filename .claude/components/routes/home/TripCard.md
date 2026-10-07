# `TripCard`

Source: `src/app/[locale]/(site)/_components/TripCard.tsx` · async Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home upcoming trips")

## Purpose

Adapter `Viaggio` → `TourCard`: date range (start–end), details destination (MapPin, free text), difficulty (Gauge), spots left (Users).

## When to use

- Inside `UpcomingTours` for viaggi (home). Future `/viaggi` list: promote with `TourCard`.

## When not to use

- Escursioni: `ExcursionCard`.

## Usage

```tsx
<UpcomingTours …>
  {trips.map((trip) => (
    <TripCard key={trip.slug} trip={trip} className="w-full" />
  ))}
</UpcomingTours>
```

## Props

| Prop        | Type      | Default  | Notes                   |
| ----------- | --------- | -------- | ----------------------- |
| `trip`      | `Viaggio` | required | `features/viaggi` (zod) |
| `className` | `string`  | –        | passed to `TourCard`    |

## Rules and notes

- Same fields as excursions ("come per le escursioni", user 2026-10-07) adapted to multi-day trips: `startDate`/`endDate` instead of `date`, free-text `destination` instead of the Appennino/Dolomiti `zone` enum. Schema refuses `endDate < startDate`.
- Labels from `Tour` messages (`destination`, …).

## Related

- [TourCard](TourCard.md), [ExcursionCard](ExcursionCard.md).
