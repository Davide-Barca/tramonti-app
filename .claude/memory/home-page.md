---
name: home-page
description: Home page decisions: full-viewport hero only (reference image), header unchanged, two CTAs, no search/logo strip, other sections await user instructions
metadata:
  type: project
---

Decided 2026-10-06 from a reference mockup (full-bleed photo, centered badge + big light h1 with bold italic emphasis + lead + actions, header overlaid, logo strip at the bottom).

User choices:

- Build **only the hero** for now; other home sections wait for the user's instructions (don't propose/build them unprompted).
- Two CTAs instead of a search bar: "Scopri le escursioni" → `/escursioni` (primary), "Escursioni su misura" → `/escursioni-su-misura` (secondary).
- **Header must not change** (no overlay/transparent variant, no CTA button, no route-group restructuring).
- No logo strip. A photo (Dolomites) was tried on 2026-10-06 and removed by the user (didn't fit): hero shows the token gradient. `Hero` keeps photo support (static import + light scrim); lead uses `text-foreground` because `muted-foreground` measured 3.1:1 over a photo.

**Why:** User wants to drive the home sections step by step.
**How to apply:** Hero is the home's first block and renders the h1 (exception to "PageIntro first"). See [[styling]], [[component-docs]], [[project-status]].
