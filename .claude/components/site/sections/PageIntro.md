# `PageIntro`

Source: `src/components/site/sections/PageIntro.tsx` · Server Component · Test: e2e (`seo.spec.ts`: one `h1` per page)

## Purpose

Top block of every page: optional breadcrumbs, **the page's only `h1`**, optional lead paragraph. `Section spacing="compact"` with a bottom border.

## When to use

- First element of every page in `src/app/[locale]/(site)/`, always.

## When not to use

- Anywhere else on the page (it renders an `h1`). For later titled blocks use `Section` + `Heading as="h2"`.

## Usage

```tsx
import { PageIntro } from "@/components/site/sections/PageIntro";

// Home
<PageIntro title={t("title")} size="display" />

// Static page
<PageIntro
  title={t("title")}
  breadcrumbs={[
    { name: nav("home"), href: "/" },
    { name: nav("about"), href: "/chi-siamo" },
  ]}
/>

// Detail page
<PageIntro title={item.title} lead={item.excerpt} breadcrumbs={[…, { name: item.title, href }]} />
```

## Props

| Prop          | Type             | Default  | Notes                                          |
| ------------- | ---------------- | -------- | ---------------------------------------------- |
| `title`       | `string`         | required | rendered as the page `h1`                      |
| `lead`        | `string`         | –        | `text-lg text-muted-foreground max-w-narrow`   |
| `breadcrumbs` | `Crumb[]`        | –        | every page but home; last crumb = current page |
| `size`        | `Heading` `size` | `"h1"`   | `display` on home only                         |

## Rules and notes

- Strings come from `src/messages/it.json` (page namespace + `Navigation`) or data; never hardcoded.
- The breadcrumb trail also emits `BreadcrumbList` JSON-LD.

## Related

- [Breadcrumbs](../ui/Breadcrumbs.md), [Heading](../ui/Heading.md), `.claude/design/sections.md` (page anatomy).
