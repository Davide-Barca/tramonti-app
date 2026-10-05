# Tokens

Defined in `src/styles/site.css`. Components use **only semantic tokens** (left columns). Tailwind's default palette is disabled (`--color-*: initial`): `neutral-*`, `red-*`… do not exist.

## Colors

Placeholder palette (warm neutrals with soft contrast + military green for details). Contrast measured against `background` unless noted.

| Token (`bg-*`, `text-*`, `border-*`) | Primitive     | Hex       | Use                                                       | Contrast               |
| ------------------------------------ | ------------- | --------- | --------------------------------------------------------- | ---------------------- |
| `background`                         | `--sand-50`   | `#FAF8F4` | page background, cards                                    |                        |
| `foreground`                         | `--sand-900`  | `#2F2A25` | body text, headings                                       | 13.4:1                 |
| `muted`                              | `--sand-100`  | `#F3EFE7` | alternate sections (`Section tone="muted"`), subtle fills |                        |
| `muted-foreground`                   | `--sand-700`  | `#5F574D` | secondary text, captions, breadcrumbs, inactive nav       | ≥6:1 (also on `muted`) |
| `border`                             | `--sand-200`  | `#E6DFD3` | borders, dividers                                         | decorative only        |
| `primary`                            | `--olive-700` | `#4B5638` | links, current page, CTAs, focus ring                     | 7.4:1                  |
| `primary-hover`                      | `--olive-800` | `#3D4630` | hover of primary links/buttons                            |                        |
| `primary-foreground`                 | `--sand-50`   | `#FAF8F4` | text on a `primary` fill                                  | 7.4:1                  |
| `accent`                             | `--olive-100` | `#E9ECDF` | badges, highlights, `::selection` (text `primary`)        | primary on it 6.5:1    |

Primitive scales `--sand-50…900` and `--olive-50…900` exist **only** in `site.css` to feed the semantic tokens. Never reference them (or hex) in components.

Don't: `#7A7064` (`--sand-600`) for text on `muted`: 4.23:1, fails AA.

## Typography

| Token                               | Value                                            | Use                              |
| ----------------------------------- | ------------------------------------------------ | -------------------------------- |
| `font-sans`                         | Geist (placeholder) → system stack               | body                             |
| `font-display`                      | = `font-sans` for now                            | headings, brand name             |
| `text-display`                      | `clamp(2.25rem, 1.5rem + 3vw, 3.75rem)`, lh 1.1  | home hero h1                     |
| `text-h1`                           | `clamp(1.875rem, 1.4rem + 2vw, 3rem)`, lh 1.15   | page h1                          |
| `text-h2`                           | `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)`, lh 1.2 | section titles                   |
| `text-h3`                           | `clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)`, lh 1.3 | card titles, sub-sections        |
| `text-lg` / `text-base` / `text-sm` | Tailwind defaults                                | lead / body / meta (breadcrumbs) |

- Headings: `font-display font-semibold tracking-tight`, `text-wrap: balance` (base layer). Paragraphs: `text-wrap: pretty`.
- `clamp(min, ideal, max)`: size grows with the viewport between min (mobile) and max (desktop); the `rem` part keeps browser zoom working. Only headings and section spacing are fluid; everything else uses the fixed Tailwind scale.

## Spacing and layout

| Token          | Value                           | Use                                               |
| -------------- | ------------------------------- | ------------------------------------------------- |
| `py-section`   | `clamp(3rem, 2rem + 4vw, 6rem)` | vertical padding of every `Section`               |
| `max-w-page`   | `72rem`                         | page container (`Container width="page"`)         |
| `max-w-narrow` | `42rem`                         | long text, lead paragraphs, `.prose`              |
| gutters        | `px-4 md:px-6`                  | inside `Container`                                |
| scale          | Tailwind default (4px steps)    | gaps and paddings: prefer `2, 3, 4, 6, 8, 10, 12` |

Common rhythm: stack inside a block `gap-4`; card padding `p-6`; grid gap `gap-6`; compact section `py-8 md:py-12`.

## Shapes

| Token          | Value     | Use           |
| -------------- | --------- | ------------- |
| `rounded-card` | `0.75rem` | cards, panels |

No shadows yet: separate surfaces with `border-border` or `bg-muted`.

## Adding a token

1. Add it to `@theme inline` in `site.css` (colors: map a primitive, add the primitive to `:root` if needed; check contrast).
2. Font size / spacing / container / radius tokens: register the name in `extendTailwindMerge` in `src/lib/utils.ts` and add a case to `src/lib/utils.test.ts`, otherwise `cn()` drops it.
3. Document it in this file.
