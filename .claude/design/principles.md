# Principles

## Visual direction

- **Warm, calm, natural.** Travel and excursions on the coast and in the mountains: sand, stone, olive. Soft contrast, no pure black or pure white.
- **Military green (`primary`) is for details**, not for surfaces: links, current page, CTAs, small accents. Large areas stay sand (`background`, `muted`).
- **Content first.** Generous whitespace (`py-section`), readable line length (`max-w-narrow` for long text), few borders, no heavy shadows.
- **Quiet UI.** Hover/active states change color or underline only. No bouncy animations; any future motion is short and respects `prefers-reduced-motion`.

## Design priorities (in order)

1. **SEO and semantics**: one `h1` per page, ordered headings, real links. Visual size never dictates the heading level (`Heading as` vs `size`).
2. **Accessibility**: WCAG AA contrast, visible focus, usable by keyboard and screen readers.
3. **Performance (Core Web Vitals)**: server-rendered, minimal client JS, no layout shift.
4. **Consistency**: same tokens, same building blocks, same spacing rhythm on every page.
5. **Easy brand swap**: nothing hardcoded that the real palette or fonts would have to hunt down.

## Mobile-first

Design for a ~400px screen first, then enhance with `sm:` / `md:` / `lg:`. Everything must work without hover (touch).
