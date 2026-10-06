# `JsonLd`

Source: `src/components/shared/JsonLd.tsx` · Server Component · Test: e2e (`seo.spec.ts` parses JSON-LD on detail pages)

## Purpose

Renders a `<script type="application/ld+json">` with schema.org structured data, escaping `<` so the JSON cannot close the script tag.

## When to use

- Structured data for search engines: `TouristTrip` on escursioni/viaggi detail pages, `BreadcrumbList` (via `Breadcrumbs`), future `TravelAgency` / `Organization` on home.

## When not to use

- Breadcrumb data: use `Breadcrumbs`, which already emits it.
- Anything visible: JSON-LD is metadata only and must match visible content.

## Usage

```tsx
import { JsonLd } from "@/components/shared/JsonLd";

<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: escursione.title,
    description: escursione.excerpt,
    url: absoluteUrl(locale, href),
  }}
/>;
```

## Props

| Prop   | Type                      | Default  | Notes                                  |
| ------ | ------------------------- | -------- | -------------------------------------- |
| `data` | `Record<string, unknown>` | required | full schema.org object with `@context` |

## Rules and notes

- Use absolute URLs (`absoluteUrl` from `@/lib/seo`).
- Lives in `components/shared/`: must not import site or admin code (ESLint boundary).
- New JSON-LD on a page → add an e2e assertion in `e2e/seo.spec.ts`.

## Related

- [Breadcrumbs](../site/ui/Breadcrumbs.md), `AGENTS.md` "SEO".
