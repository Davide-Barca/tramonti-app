# Patterns

## Responsive

- Mobile-first: base classes for ~400px, add `sm:` (640) / `md:` (768) / `lg:` (1024) on top.
- Grids: 1 column → `sm:grid-cols-2` → `lg:grid-cols-3`. Rows that may overflow use `flex-wrap`.
- Header: brand and nav wrap on small screens (no hamburger yet; when added: `<details>` or a minimal client component).

## Links and states

| Element                | Default                                     | Hover                       | Current / active             |
| ---------------------- | ------------------------------------------- | --------------------------- | ---------------------------- |
| Inline text link       | `text-primary underline underline-offset-4` | `text-primary-hover`        | –                            |
| Nav link               | `text-muted-foreground`                     | `text-foreground underline` | `text-primary underline`     |
| Card / list title link | `text-foreground`                           | `text-primary underline`    | –                            |
| Breadcrumb link        | `text-muted-foreground`                     | `text-foreground underline` | last item: `text-foreground` |

- States change **color/underline only**, never weight or size (no layout shift).
- Focus: global `:focus-visible` outline in `primary` (base layer). Never remove it.
- Navigation is always a real `Link` with `href`; `<button>` only for actions.

## Surfaces

- Separate blocks with alternating `Section tone` (`default` / `muted`) or a single `border-border` line.
- Cards: `bg-background` + `border-border` + `rounded-card`; on a `muted` section the card stays `bg-background` for contrast.
- No shadows for now.

## Images (when added)

- `next/image` with explicit `width`/`height` or `fill` inside an `aspect-*` box (no layout shift), meaningful `alt` (empty `alt=""` only if decorative).
- `priority` only on the LCP image (home hero / detail cover); everything else lazy.
- Rounded with `rounded-card` when inside cards.

## Long text

- `max-w-narrow` (~70 characters per line). HTML we don't control → `Prose`.

## Accessibility

- Text contrast ≥ 4.5:1 (all text tokens comply; check new combinations).
- Landmarks: `header`, `nav` (with `aria-label` if more than one), `main` (layout), `footer`.
- Icons-only controls need an accessible name; decorative separators get `aria-hidden="true"`.
