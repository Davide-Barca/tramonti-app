# Sections (`src/components/site/sections/`)

A **section** is a page block built from `Section` + `Heading` + primitives. A **page** is a list of sections that receive data (from `features/*/queries.ts` or `src/messages/it.json`); sections never contain hardcoded copy.

## Page anatomy

```
<SiteHeader />                (layout)
<main>                        (layout, one per page)
  <PageIntro />               always first: breadcrumbs + the only h1 + optional lead
  <Section …>…</Section>      content blocks, alternate tone default/muted
</main>
<SiteFooter />                (layout)
```

## Existing sections

| Section     | Visual summary                                                                                           | Doc                                                   |
| ----------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `PageIntro` | `Section spacing="compact"` + `border-b`, breadcrumbs, the page h1, lead `text-lg text-muted-foreground` | [PageIntro](../components/site/sections/PageIntro.md) |
| `TourList`  | card grid `gap-6 sm:grid-cols-2 lg:grid-cols-3`, empty state                                             | [TourList](../components/site/sections/TourList.md)   |

## Recipe: new section

1. Used by one page only → `app/…/<route>/_components/`. Used by 2+ pages → `components/site/sections/`.
2. Root is `<Section>` (choose `tone`, `spacing`, `width`). If it has a title: `Heading as="h2"` (or the right level for its position) + `aria-labelledby` on the section.
3. Props are data (titles, items, hrefs), translated strings come from the page.
4. Layout inside: flex/grid with token gaps; mobile single column, add columns at `sm:`/`lg:`.
5. Create its doc in `.claude/components/` (template in `.claude/components/README.md`), add a row above, and add e2e assertions if it carries SEO-relevant markup (JSON-LD, headings).

### Planned

- `Hero` (home): `display` h1, lead, primary CTA, LCP image with `priority`.
- `FeatureGrid`, `CtaBand` (`tone="muted"` or `bg-primary` band with `text-primary-foreground`), `ContactBlock`.
