# `Badge`

Source: `src/components/site/ui/Badge.tsx` · Server Component · Test: none

## Purpose

Small non-interactive pill label: `rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm`. Readable on top of photos or gradients.

## When to use

- Short highlight above a title (hero badge), category/duration tags on cards.

## When not to use

- Anything clickable: use `ButtonLink` or `Link`.
- Long text (keep it to a few words).

## Usage

```tsx
import { Badge } from "@/components/site/ui/Badge";

<Badge>{t("hero.badge")}</Badge>;
```

## Props

| Prop        | Type           | Default | Notes              |
| ----------- | -------------- | ------- | ------------------ |
| `className` | `string`       | –       | merged with `cn()` |
| …rest       | `<span>` props | –       | `children` = label |

## Rules and notes

- Renders a `<span>` (inline, no semantics). Icons: none yet (no icon library installed); when added, decorative icons get `aria-hidden`.

## Related

- [Hero](../sections/Hero.md), [Card](Card.md).
