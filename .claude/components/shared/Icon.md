# `Icon`

Source: `src/components/shared/Icon.tsx` · Server Component (no client JS) · Test: `Icon.test.tsx`

## Purpose

Renders a [Lucide](https://lucide.dev/icons) icon as inline SVG on the server. Icon data comes from the vanilla `lucide` package (`[tag, attrs][]` nodes). Color follows the text (`currentColor`), default size `size-4`.

## When to use

- Any icon in the public site: card details (calendar, map pin, difficulty, people), link arrows, future UI icons.

## When not to use

- **Never import `lucide-react` in the public site**: in v1 its `Icon` is a client component (`"use client"`), so every icon ships JS. `lucide-react` is reserved for the admin (shadcn/ui).
- Logos and illustrations: use `next/image` or a dedicated SVG component.

## Usage

```tsx
import { CalendarDays, MapPin } from "lucide";
import { Icon } from "@/components/shared/Icon";

<Icon icon={MapPin} className="text-primary" />            // decorative (aria-hidden)
<Icon icon={CalendarDays} label="Data" className="size-5" /> // meaningful, announced
```

Find names at lucide.dev (PascalCase export from `lucide`).

## Props

| Prop        | Type                | Default  | Notes                                                       |
| ----------- | ------------------- | -------- | ----------------------------------------------------------- |
| `icon`      | `IconNode` (lucide) | required | e.g. `import { MapPin } from "lucide"`                      |
| `label`     | `string`            | –        | accessible name (`role="img"`); omit → `aria-hidden="true"` |
| `className` | `string`            | –        | merged with `cn()`; size via `size-*`, color via `text-*`   |
| …rest       | `<svg>` props       | –        |                                                             |

## Rules and notes

- Icons accompany text: keep them decorative and put the meaning in text (visible or `sr-only`), as in `ExcursionCard`.
- Stroke width 2, 24×24 viewBox (Lucide defaults). Don't scale stroke per icon.
- Lives in `components/shared/` (ESLint boundary: no site/admin imports).

## Related

- [ExcursionCard](../routes/home/ExcursionCard.md), [UpcomingExcursions](../routes/home/UpcomingExcursions.md).
