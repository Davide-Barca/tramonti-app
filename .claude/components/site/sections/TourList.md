# `TourList`

Source: `src/components/site/sections/TourList.tsx` · Server Component · Test: e2e (list pages)

## Purpose

Card grid of escursioni or viaggi linking to their detail pages, with an empty state. Grid: 1 column → `sm:grid-cols-2` → `lg:grid-cols-3`.

## When to use

- List pages `/escursioni` and `/viaggi`, right after `PageIntro`.
- Any future "related tours" block that lists tours with title + excerpt + link.

## When not to use

- Lists of non-tour content with different fields: create a new section (or generalize this one and update this doc).

## Usage

```tsx
import { TourList } from "@/components/site/sections/TourList";

<TourList
  emptyText={t("empty")}
  items={escursioni.map(({ slug, title, excerpt }) => ({
    slug,
    title,
    excerpt,
    href: { pathname: "/escursioni/[slug]", params: { slug } },
  }))}
/>;
```

## Props

| Prop        | Type             | Default  | Notes                                                   |
| ----------- | ---------------- | -------- | ------------------------------------------------------- |
| `items`     | `TourListItem[]` | required | `{ slug, title, excerpt, href }`, `href` typed (`Href`) |
| `emptyText` | `string`         | required | translated text shown when `items` is empty             |

## Rules and notes

- Each item is a `Card` (`<article>`) inside `<li>`, title as `Heading as="h2" size="h3"` with the `Link`. Correct under the page `h1`; if used below another `h2`, the item level must become `h3` (add a prop then).
- Data comes from `features/<domain>/queries.ts`; map it in the page, the section stays domain-agnostic.

## Related

- [Card](../ui/Card.md), [Section](../ui/Section.md), [PageIntro](PageIntro.md).
