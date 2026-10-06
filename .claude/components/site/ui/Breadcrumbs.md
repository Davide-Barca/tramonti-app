# `Breadcrumbs`

Source: `src/components/site/ui/Breadcrumbs.tsx` · async Server Component · Test: e2e (`seo.spec.ts` JSON-LD)

## Purpose

Visible breadcrumb trail plus matching `BreadcrumbList` JSON-LD (structured data for search engines), from one list of crumbs.

## When to use

- Indirectly, through `PageIntro`'s `breadcrumbs` prop, on every page except home.

## When not to use

- Directly in a page: pass `breadcrumbs` to `PageIntro` instead, so the trail sits above the `h1`.

## Usage

```tsx
import { Breadcrumbs } from "@/components/site/ui/Breadcrumbs";

<Breadcrumbs
  items={[
    { name: nav("home"), href: "/" },
    { name: nav("excursions"), href: "/escursioni" },
    {
      name: escursione.title,
      href: { pathname: "/escursioni/[slug]", params: { slug } },
    },
  ]}
/>;
```

## Props

| Prop    | Type      | Default  | Notes                                                        |
| ------- | --------- | -------- | ------------------------------------------------------------ |
| `items` | `Crumb[]` | required | `{ name: string; href: Href }`; first = home, last = current |

## Rules and notes

- `href` is typed (`Href` from `@/lib/seo`): plain static routes or `{ pathname, params }` for dynamic ones.
- The last item is rendered as text with `aria-current="page"`, the others as `Link`s. `/` separators are `aria-hidden`.
- Renders `<nav aria-label={Navigation.breadcrumb}>`: the page then has more than one `nav`, each must keep its label.
- JSON-LD URLs are absolute (`absoluteUrl`), using `NEXT_PUBLIC_SITE_URL`.
- Names come from translations (`Navigation`) or data, never hardcoded.

## Related

- [PageIntro](../sections/PageIntro.md), [JsonLd](../../shared/JsonLd.md).
