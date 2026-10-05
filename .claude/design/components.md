# Components (`src/components/site/ui/`)

Primitives used by every section. All are Server Components, accept `className` (merged with `cn()`), and pass other props to the root element.

## `Container`

Centered column with side gutters: `mx-auto w-full px-4 md:px-6` + max width.

| Prop    | Values                           | Default |
| ------- | -------------------------------- | ------- |
| `width` | `page` (72rem), `narrow` (42rem) | `page`  |

Use directly only when you need a container outside a `Section` (header, footer).

## `Section`

A `<section>` with `py-section`, a background tone and an inner `Container`. The basic block of every page.

| Prop      | Values                                                | Default   |
| --------- | ----------------------------------------------------- | --------- |
| `tone`    | `default`, `muted` (`bg-muted`)                       | `default` |
| `spacing` | `default` (`py-section`), `compact` (`py-8 md:py-12`) | `default` |
| `width`   | `page`, `narrow`                                      | `page`    |

Alternate `tone` between consecutive sections to separate them instead of borders. Give it `aria-labelledby` pointing to its heading when the section has one.

## `Heading`

| Prop   | Values                                   | Default      |
| ------ | ---------------------------------------- | ------------ |
| `as`   | `h1`…`h4` (**required**: semantic level) | –            |
| `size` | `display`, `h1`, `h2`, `h3`, `h4`        | same as `as` |

Pick `as` from the document outline, `size` from the design: `<Heading as="h2" size="h3">` for card titles inside an h1 page. Never skip levels for visual reasons.

## `Prose`

Wrapper with `.prose` (site.css) for HTML we cannot add classes to. `html` prop for trusted HTML (iubenda), or `children`. Has `max-w-narrow` built in.

## `Card`

`<article>` with `rounded-card border border-border bg-background p-6`, vertical `gap-3`. For list items (escursioni, viaggi). Put a `Heading` (usually `as="h2" size="h3"`) with the `Link` inside, then the excerpt in `text-muted-foreground`.

## `Breadcrumbs`

Visible trail (`text-sm text-muted-foreground`, `/` separators, current page in `text-foreground` with `aria-current="page"`) + `BreadcrumbList` JSON-LD. Usually rendered by `PageIntro`, not directly.

## Layout components (`src/components/site/layout/`)

- `SiteHeader`: brand link + main nav, `border-b border-border`, uses `Container`.
- `NavLink` (client): `text-muted-foreground`, hover `text-foreground`, current `text-primary underline`.
- `nav-items.ts`: menu items (typed routes + `Navigation` message keys).

## Recipe: new primitive

1. Needed by 2+ sections/pages and not covered by the above? Otherwise keep it in the route's `_components/`.
2. File in `src/components/site/ui/PascalCase.tsx`, Server Component unless it needs interactivity.
3. Base classes + variants with `cva`; props = `ComponentProps<"element"> & VariantProps<…>`; merge `className` with `cn()`.
4. Semantic element (`article`, `nav`, `figure`…), tokens only.
5. Unit test for variants (see `Heading.test.tsx`).
6. Document it here.

### Planned (not built yet)

- `Button` / button-styled `Link`: `primary` (fill `bg-primary text-primary-foreground hover:bg-primary-hover`), `secondary` (border `border-border`, text `foreground`), sizes `md`/`lg`. Build it with the first CTA.
- `Badge`: `bg-accent text-primary text-sm`, for categories/durations.
- `Image` wrapper around `next/image` with aspect ratio + `rounded-card`.
