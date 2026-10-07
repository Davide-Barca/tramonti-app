# `UpcomingExcursions`

Source: `src/app/[locale]/(site)/_components/UpcomingExcursions.tsx` · async Server Component · route-local (home) · Test: e2e (`navigation.spec.ts` "Home upcoming excursions")

## Purpose

Second home section ("Prossime escursioni"): section `h2` + "Tutte le escursioni →" link to `/escursioni`, then a grid of `ExcursionCard` (1 column mobile → `sm:` 2 → `lg:` 3). Empty state when nothing is scheduled.

## When to use

- Home page only, right after `Hero`.

## When not to use

- Full list on `/escursioni`: build the list page with its own section (reusing `ExcursionCard` after promoting it).

## Usage

```tsx
// src/app/[locale]/(site)/page.tsx
const upcoming = await getUpcomingEscursioni(3);
…
<UpcomingExcursions excursions={upcoming} />
```

## Props

| Prop         | Type           | Default  | Notes                                             |
| ------------ | -------------- | -------- | ------------------------------------------------- |
| `excursions` | `Escursione[]` | required | already filtered/sorted (`getUpcomingEscursioni`) |

## Rules and notes

- The page fetches (`getUpcomingEscursioni(limit, from = now)`: date ≥ today in Europe/Rome, soonest first); the section only renders. 3 items = one full desktop row.
- "Today" is evaluated at render: on the static home it updates with revalidation/redeploy.
- `Section aria-labelledby="upcoming-title"`: e2e selects the region by its name "Prossime escursioni".
- Texts: `HomePage.upcoming` (`title`, `viewAll`, `empty`).
- Next home section planned: "Perché Tramonti" (user decision, not built yet).

## Related

- [ExcursionCard](ExcursionCard.md), [Hero](../../site/sections/Hero.md), [Section](../../site/ui/Section.md).
