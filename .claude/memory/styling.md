---
name: styling
description: Agreed CSS/Tailwind rules for the public site: inline utilities, semantic tokens, placeholder sand/olive palette, fluid clamp headings, cn + cva, no dark mode
metadata:
  type: project
---

Decided with the user on 2026-10-05.

- Tailwind utilities inline + reuse through components; `.css` only for tokens, base layer and `.prose` (HTML we cannot class, e.g. iubenda). `@apply` only in `.prose`.
- Two-level tokens: primitives `--sand-*` / `--olive-*` in `:root` (no utilities), semantic colors in `@theme inline`; Tailwind default palette disabled (`--color-*: initial`).
- Palette (placeholder until the brand palette is ported): warm neutrals with soft contrast + military green for details. background #FAF8F4, muted #F3EFE7, border #E6DFD3, foreground #2F2A25, muted-foreground #5F574D (user's proposed #7A7064 failed AA on `muted`: 4.23:1), primary #4B5638, accent #E9ECDF.
- Headings fluid with `clamp()` (user chose it over breakpoint sizes). No dark mode for now.
- `cn()` (clsx + tailwind-merge extended with custom tokens) + `cva` installed now.
- `Heading` decouples semantic level (`as`) from visual size (`size`) to keep the outline SEO-correct.

**Why:** User wants every section/component to have minimal, extensible styling before porting the old design.
**How to apply:** Follow AGENTS.md "Styling" and the design system docs in `.claude/design/` (created 2026-10-05 at the user's request as the place agents read to design components/sections). When the brand palette/fonts arrive, change primitives in site.css and `src/lib/fonts.ts` only. See [[code-structure]], [[seo-rules-frontend]].
