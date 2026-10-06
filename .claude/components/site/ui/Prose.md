# `Prose`

Source: `src/components/site/ui/Prose.tsx` · Server Component · Test: none

## Purpose

Wrapper applying the `.prose` typography (defined in `src/styles/site.css`) to long-form content whose inner HTML we cannot add classes to. Built-in `max-w-narrow` for readable line length.

## When to use

- Trusted HTML from external sources: iubenda legal documents, future rich text from the API/admin.
- Long editorial text written as plain elements (`p`, `ul`, `h2`…) without per-element classes.

## When not to use

- Structured UI (cards, grids, forms): use components and utilities.
- Untrusted HTML: never pass user input to `html`.

## Usage

```tsx
import { Prose } from "@/components/site/ui/Prose";

<Prose html={html} />                 // trusted HTML string

<Prose>
  <p>…</p>
  <ul><li>…</li></ul>
</Prose>
```

## Props

| Prop        | Type          | Default | Notes                                                  |
| ----------- | ------------- | ------- | ------------------------------------------------------ |
| `html`      | `string`      | –       | trusted HTML, rendered with `dangerouslySetInnerHTML`  |
| `children`  | `ReactNode`   | –       | used when `html` is not set                            |
| `className` | `string`      | –       | merged with `cn()`                                     |
| …rest       | `<div>` props | –       | `dangerouslySetInnerHTML` is not accepted (use `html`) |

## Rules and notes

- `.prose` is the only place where `@apply` is allowed. To change content typography, edit `.prose` in `site.css` and `.claude/design/tokens.md`.
- External HTML must not contain an `h1` (the page has its own). `features/legal/queries.ts` already demotes iubenda `h1` → `h2`.

## Related

- [LegalDocument](../../routes/legal/LegalDocument.md), `.claude/design/patterns.md` (long text).
