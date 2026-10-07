# Components (`src/components/site/ui/`)

Primitives used by every section. All are Server Components, accept `className` (merged with `cn()`), and pass other props to the root element.

Per-component docs (purpose, when to use, props, examples) live in **`.claude/components/`**, one file per component. This file covers only the visual system they share.

| Component               | Visual summary                                                                         | Doc                                                   |
| ----------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `Container`             | `mx-auto w-full px-4 md:px-6` + `max-w-page`/`max-w-narrow`                            | [Container](../components/site/ui/Container.md)       |
| `Section`               | `<section>` + `py-section` (or compact `py-8 md:py-12`), tone `default`/`bg-muted`     | [Section](../components/site/ui/Section.md)           |
| `Heading`               | `font-display font-semibold tracking-tight text-foreground`, fluid sizes               | [Heading](../components/site/ui/Heading.md)           |
| `Prose`                 | `.prose` typography, `max-w-narrow`                                                    | [Prose](../components/site/ui/Prose.md)               |
| `Card`                  | `rounded-card border border-border bg-background p-6`, `gap-3`                         | [Card](../components/site/ui/Card.md)                 |
| `Button` / `ButtonLink` | pill, `primary` (`bg-primary`) / `secondary` (border), sizes `md` `h-10` / `lg` `h-12` | [Button](../components/site/ui/Button.md)             |
| `Badge`                 | pill `text-sm`, `bg-background/70 backdrop-blur-sm`, border                            | [Badge](../components/site/ui/Badge.md)               |
| `Breadcrumbs`           | `text-sm text-muted-foreground`, `/` separators, current `text-foreground`             | [Breadcrumbs](../components/site/ui/Breadcrumbs.md)   |
| `SiteHeader`            | `border-b border-border`, brand left, nav right, wraps on mobile                       | [SiteHeader](../components/site/layout/SiteHeader.md) |
| `Icon` (shared)         | lucide SVG, `size-4` default, `currentColor`; decorative, `text-primary` for details   | [Icon](../components/shared/Icon.md)                  |
| `NavLink`               | `text-muted-foreground`, hover `text-foreground`, current `text-primary underline`     | [NavLink](../components/site/layout/NavLink.md)       |
| `SiteFooter`            | `bg-muted border-t border-border`, 3-column grid, bottom bar `text-sm`                 | [SiteFooter](../components/site/layout/SiteFooter.md) |

## Recipe: new primitive

1. Needed by 2+ sections/pages and not covered by the above? Otherwise keep it in the route's `_components/`.
2. File in `src/components/site/ui/PascalCase.tsx`, Server Component unless it needs interactivity.
3. Base classes + variants with `cva`; props = `ComponentProps<"element"> & VariantProps<…>`; merge `className` with `cn()`.
4. Semantic element (`article`, `nav`, `figure`…), tokens only.
5. Unit test for variants (see `Heading.test.tsx`).
6. Create its doc in `.claude/components/` (template in `.claude/components/README.md`) and add a row above.

### Planned (not built yet)

- `Image` wrapper around `next/image` with aspect ratio + `rounded-card`.
