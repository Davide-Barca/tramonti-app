# `Container`

Source: `src/components/site/ui/Container.tsx` · Server Component · Test: none

## Purpose

Centered content column with side gutters (`mx-auto w-full px-4 md:px-6`) and a max width. Keeps every block aligned to the same page edges.

## When to use

- Content outside a `Section` that must align with page content: header, footer, full-bleed bands that need an inner column.

## When not to use

- Inside page content: use `Section` (it already renders a `Container`). Don't nest a `Container` inside a `Section`.

## Usage

```tsx
import { Container } from "@/components/site/ui/Container";

<header className="border-b border-border">
  <Container className="flex items-center justify-between py-4">…</Container>
</header>;
```

## Props

| Prop        | Type                 | Default  | Notes                                         |
| ----------- | -------------------- | -------- | --------------------------------------------- |
| `width`     | `"page" \| "narrow"` | `"page"` | `max-w-page` (72rem) / `max-w-narrow` (42rem) |
| `className` | `string`             | –        | merged with `cn()` (layout: flex/grid/py)     |
| …rest       | `<div>` props        | –        |                                               |

## Rules and notes

- Renders a `<div>`: no semantics. Wrap it in the right landmark (`header`, `footer`, `section`).
- Don't override the gutters (`px-*`) per page: alignment would break.

## Related

- [Section](Section.md), `.claude/design/tokens.md` (layout tokens).
