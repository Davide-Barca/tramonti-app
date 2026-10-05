# Checklist (before a component/section is done)

- [ ] Reused existing primitives (`Section`, `Container`, `Heading`, `Card`, `Prose`) where possible.
- [ ] Only semantic tokens; no hex, no primitives, no arbitrary values (`[...]`).
- [ ] `className` accepted and merged with `cn()`; variants in `cva`.
- [ ] Headings: correct semantic level (`as`), visual via `size`; still one `h1` per page.
- [ ] Semantic HTML (`section`, `article`, `nav`, lists for lists); links are `Link` with typed `href`.
- [ ] No hardcoded copy: strings in `src/messages/it.json` or data props.
- [ ] Mobile-first; checked at Pixel 7 width and 1280px (screenshots).
- [ ] Hover/active/focus states visible and without layout shift.
- [ ] Server Component unless interactivity requires `"use client"` (as low as possible).
- [ ] Unit test for variants/logic; e2e if SEO-relevant markup changed.
- [ ] `npm run check` passes (and `npm run test:e2e` for routing/SEO changes).
- [ ] `.claude/design/` updated (tokens, components, sections) in the same change.
