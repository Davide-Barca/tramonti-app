# `Card`

Source: `src/components/site/ui/Card.tsx` · Server Component · Test: none

## Purpose

Bordered surface for a single list item: `<article>` with `flex flex-col gap-3 rounded-card border border-border bg-background p-6`.

## When to use

- Items in a grid or list that are self-contained content (escursioni, viaggi, future articles, team members).

## When not to use

- Page-level blocks: use `Section`.
- Pure layout boxes without standalone meaning: use a `div` (`Card` renders `<article>`).

## Usage

```tsx
import { Card } from "@/components/site/ui/Card";
import { Heading } from "@/components/site/ui/Heading";
import { Link } from "@/i18n/navigation";

<Card>
  <Heading as="h2" size="h3">
    <Link
      href={href}
      className="underline-offset-4 hover:text-primary hover:underline"
    >
      {title}
    </Link>
  </Heading>
  <p className="text-muted-foreground">{excerpt}</p>
</Card>;
```

## Props

| Prop        | Type              | Default | Notes              |
| ----------- | ----------------- | ------- | ------------------ |
| `className` | `string`          | –       | merged with `cn()` |
| …rest       | `<article>` props | –       |                    |

## Rules and notes

- Put a heading inside (an `article` should have one), at the right level for its position (usually `h2` under the page `h1`).
- The link goes on the title, not around the whole card (keeps accessible names short). A full-card click area, if needed later, must still use one real `Link`.
- On a `muted` section the card stays `bg-background` for contrast. No shadows.

## Related

- [TourList](../sections/TourList.md), [Heading](Heading.md).
