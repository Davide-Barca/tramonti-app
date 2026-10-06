# `Button` / `ButtonLink`

Source: `src/components/site/ui/Button.tsx` · Server Components · Test: `Button.test.tsx`

## Purpose

Pill-shaped buttons with shared variants (`buttonVariants`, `cva`). `Button` is a real `<button>` for **actions**; `ButtonLink` is a typed locale-aware `Link` styled as a button for **navigation CTAs**.

## When to use

- `ButtonLink`: calls to action that go to another page (hero CTAs, "Vedi tutte", "Contattaci").
- `Button`: form submit, opening a dialog, any action that does not navigate.

## When not to use

- Inline text links or menu items: use `Link` / `NavLink`.
- Never `Button` + `onClick={() => router.push(…)}` for navigation: use `ButtonLink` (SEO: real `href`).

## Usage

```tsx
import { Button, ButtonLink } from "@/components/site/ui/Button";

<ButtonLink href="/escursioni" size="lg">{t("hero.primaryCta")}</ButtonLink>
<ButtonLink href="/escursioni-su-misura" variant="secondary" size="lg">…</ButtonLink>
<Button type="submit">{t("send")}</Button>
```

## Props

| Prop        | Type                            | Default     | Notes                                                                                                    |
| ----------- | ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `variant`   | `"primary" \| "secondary"`      | `"primary"` | primary: `bg-primary text-primary-foreground`; secondary: `border-border bg-background`, hover `primary` |
| `size`      | `"md" \| "lg"`                  | `"md"`      | `h-10 px-5 text-sm` / `h-12 px-6 text-base`                                                              |
| `className` | `string`                        | –           | merged with `cn()` (e.g. `w-full sm:w-auto`)                                                             |
| `type`      | `Button` only                   | `"button"`  | set `"submit"` explicitly in forms                                                                       |
| `href`      | `ButtonLink` only, typed `Href` | required    | `"/route"` or `{ pathname, params }`                                                                     |
| …rest       | `<button>` / `Link` props       | –           |                                                                                                          |

`buttonVariants({ variant, size })` is exported for rare cases where another element needs the same look.

## Rules and notes

- One `primary` per group; pair it with `secondary`.
- Hover/focus change colors only (border always present on `secondary`: no layout shift). Focus ring comes from the global `:focus-visible` style.
- Labels come from `it.json`, never hardcoded.

## Related

- [Hero](../sections/Hero.md), `.claude/design/patterns.md` (links and states).
