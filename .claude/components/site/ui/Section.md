# `Section`

Source: `src/components/site/ui/Section.tsx` · Server Component · Test: none

## Purpose

The basic page block: a `<section>` with fluid vertical padding (`py-section`), a background tone and an inner `Container`. Gives every page the same rhythm and alignment.

## When to use

- Every content block of a page and every new section component (`components/site/sections/*`) uses it as root.

## When not to use

- Header/footer (use `Container` inside `header`/`footer`).
- Small groupings inside a section: use a `div` with flex/grid gaps.

## Usage

```tsx
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";

<Section tone="muted" aria-labelledby="highlights-title">
  <Heading as="h2" id="highlights-title">
    {t("highlightsTitle")}
  </Heading>
  …
</Section>;
```

## Props

| Prop        | Type                     | Default     | Notes                                                  |
| ----------- | ------------------------ | ----------- | ------------------------------------------------------ |
| `tone`      | `"default" \| "muted"`   | `"default"` | `muted` = `bg-muted`; alternate tones between sections |
| `spacing`   | `"default" \| "compact"` | `"default"` | `py-section` (fluid) / `py-8 md:py-12`                 |
| `width`     | `"page" \| "narrow"`     | `"page"`    | width of the inner `Container`                         |
| `className` | `string`                 | –           | applied to the `<section>`, merged with `cn()`         |
| …rest       | `<section>` props        | –           | e.g. `aria-labelledby`, `id`                           |

## Rules and notes

- If the section has a visible title, give it `aria-labelledby` pointing to the heading `id`.
- Separate consecutive sections with alternating `tone`, not extra borders.
- `width="narrow"` centers the column: use it only for standalone narrow content (e.g. 404). For long text aligned with the page title, keep `page` width and let `Prose`/`max-w-narrow` limit the line length.

## Related

- [Container](Container.md), [Heading](Heading.md), [PageIntro](../sections/PageIntro.md), `.claude/design/sections.md`.
