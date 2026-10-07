# `UpcomingTours`

Source: `src/app/[locale]/(site)/_components/UpcomingTours.tsx` · Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home upcoming excursions" / "Home upcoming trips")

## Purpose

Generic home section for scheduled tours: `h2` + "Tutti/Tutte … →" link, grid of cards (1 column mobile → `sm:` 2 → `lg:` 3), empty state. Used twice on the home: "Prossime escursioni" and "Prossimi viaggi".

## When to use

- Home lists of upcoming dated items (cards passed as children).

## When not to use

- Full list pages (`/escursioni`, `/viaggi`): build their own sections.

## Usage

```tsx
<UpcomingTours
  id="upcoming-trips-title"
  tone="muted"
  title={t("upcomingTrips.title")}
  viewAll={{ href: "/viaggi", label: t("upcomingTrips.viewAll") }}
  emptyText={t("upcomingTrips.empty")}
>
  {trips.map((trip) => (
    <TripCard key={trip.slug} trip={trip} className="w-full" />
  ))}
</UpcomingTours>
```

## Props

| Prop        | Type                                      | Default     | Notes                                                             |
| ----------- | ----------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `id`        | `string`                                  | required    | `h2` id, used by `aria-labelledby` (unique per page)              |
| `title`     | `string`                                  | required    | section `h2`                                                      |
| `viewAll`   | `{ href: StaticPathname; label: string }` | required    | descriptive label ("Tutti i viaggi")                              |
| `emptyText` | `string`                                  | required    | shown when there are no children                                  |
| `tone`      | `"default" \| "muted"`                    | `"default"` | alternate with neighbouring sections                              |
| `children`  | cards                                     | required    | each child is wrapped in `<li className="flex">` (keys preserved) |

## Rules and notes

- The page fetches (`getUpcomingEscursioni(3)`, `getUpcomingViaggi(3)`: from today in Europe/Rome, soonest first) and passes cards; the section only lays out.
- Home order: Hero → excursions (`default`) → trips (`muted`) → `WhyTramonti` (`default`).
- Texts: `HomePage.upcoming` / `HomePage.upcomingTrips` (`title`, `viewAll`, `empty`).

## Related

- [TourCard](TourCard.md), [ExcursionCard](ExcursionCard.md), [TripCard](TripCard.md), [WhyTramonti](WhyTramonti.md).
