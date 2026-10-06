# `Heading`

Source: `src/components/site/ui/Heading.tsx` · Server Component · Test: `Heading.test.tsx`

## Purpose

Every heading of the public site. Decouples the **semantic level** (`as`: document outline, SEO) from the **visual size** (`size`: design), so the outline stays correct whatever the look.

## When to use

- Any `h1`–`h4` in the public site. Never write raw `<h2 className="…">`.

## When not to use

- Labels that are not document headings (footer column titles, form labels, eyebrows): use a styled `<p>` or `<span>`.

## Usage

```tsx
import { Heading } from "@/components/site/ui/Heading";

<Heading as="h1">{t("title")}</Heading>                 // h1, size h1
<Heading as="h1" size="display">{t("title")}</Heading>  // home hero
<Heading as="h2" size="h3">{item.title}</Heading>       // card title in a list
```

## Props

| Prop        | Type                                        | Default      | Notes                                                                |
| ----------- | ------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| `as`        | `"h1" \| "h2" \| "h3" \| "h4"`              | required     | semantic level from the page outline                                 |
| `size`      | `"display" \| "h1" \| "h2" \| "h3" \| "h4"` | same as `as` | `text-display/h1/h2/h3` (fluid), `h4` = `text-lg`                    |
| `className` | `string`                                    | –            | merged with `cn()` (e.g. `text-primary` overrides `text-foreground`) |
| …rest       | heading props                               | –            | e.g. `id` for `aria-labelledby`                                      |

## Rules and notes

- Exactly one `h1` per page: normally rendered by `PageIntro`. Don't add another.
- Never skip levels (`h1` → `h3`) for visual reasons: change `size` instead.
- Base classes: `font-display font-semibold tracking-tight text-foreground`; `text-wrap: balance` comes from the base layer.

## Related

- [PageIntro](../sections/PageIntro.md), `.claude/design/tokens.md` (type scale).
