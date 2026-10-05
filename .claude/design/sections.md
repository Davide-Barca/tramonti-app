# Sections (`src/components/site/sections/`)

A **section** is a page block built from `Section` + `Heading` + primitives. A **page** is a list of sections that receive data (from `features/*/queries.ts` or `src/messages/it.json`); sections never contain hardcoded copy.

## Page anatomy

```
<SiteHeader />                (layout)
<main>                        (layout, one per page)
  <PageIntro />               always first: breadcrumbs + the only h1 + optional lead
  <Section …>…</Section>      content blocks, alternate tone default/muted
</main>
<SiteFooter />                (layout, planned)
```

## Existing sections

### `PageIntro`

`Section spacing="compact"` with `border-b border-border`, vertical `gap-4`.

| Prop          | Notes                                                       |
| ------------- | ----------------------------------------------------------- |
| `title`       | renders the page **h1** (one per page)                      |
| `lead`        | optional, `text-lg text-muted-foreground max-w-narrow`      |
| `breadcrumbs` | optional `Crumb[]` (Home → … → current); all pages but home |
| `size`        | `Heading` size; `display` on home, default `h1` elsewhere   |

### `TourList`

Card grid for escursioni/viaggi: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`, each item a `Card` with an `h2` (size `h3`) link and the excerpt. Empty state: `emptyText` in `text-muted-foreground`.

## Recipe: new section

1. Used by one page only → `app/…/<route>/_components/`. Used by 2+ pages → `components/site/sections/`.
2. Root is `<Section>` (choose `tone`, `spacing`, `width`). If it has a title: `Heading as="h2"` (or the right level for its position) + `aria-labelledby` on the section.
3. Props are data (titles, items, hrefs), translated strings come from the page.
4. Layout inside: flex/grid with token gaps; mobile single column, add columns at `sm:`/`lg:`.
5. Add it to this file, and to `e2e/` if it carries SEO-relevant markup (JSON-LD, headings).

### Planned

- `Hero` (home): `display` h1, lead, primary CTA, LCP image with `priority`.
- `FeatureGrid`, `CtaBand` (`tone="muted"` or `bg-primary` band with `text-primary-foreground`), `ContactBlock`, `SiteFooter` (legal links + secondary pages: Escursioni su misura, Apprendimento).
