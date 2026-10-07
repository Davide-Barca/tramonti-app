---
name: home-page
description: Home page decisions: full-viewport hero only (reference image), header unchanged, two CTAs, no search/logo strip, other sections await user instructions
metadata:
  type: project
---

Decided 2026-10-06 from a reference mockup (full-bleed photo, centered badge + big light h1 with bold italic emphasis + lead + actions, header overlaid, logo strip at the bottom).

User choices:

- Build **only the hero** for now; other home sections wait for the user's instructions (don't propose/build them unprompted).
- Two CTAs instead of a search bar: "Scopri le escursioni" → `/escursioni` (primary), "Prossimi viaggi" → `/viaggi` (secondary; changed by the user on 2026-10-07, was "Escursioni su misura").
- **Header must not change** (no overlay/transparent variant, no CTA button, no route-group restructuring).
- No logo strip. A photo (Dolomites) was tried on 2026-10-06 and removed by the user (didn't fit): hero shows the token gradient. `Hero` keeps photo support (static import + light scrim); lead uses `text-foreground` because `muted-foreground` measured 3.1:1 over a photo.
- 2026-10-07: user edited hero copy (badge "Escursioni di gruppo tra Appennino e Dolomiti", AIGAE guides lead) and CTAs ("Prossimi viaggi" → `/viaggi`, size md). Home order agreed: 2 "Prossime escursioni" (built: `UpcomingExcursions` + `ExcursionCard`, route-local), 3 "Perché Tramonti" (built 2026-10-07: `WhyTramonti`, 4 strengths derived from existing copy: guide AIGAE, Appennino e Dolomiti, gruppi di appassionati, escursioni su misura with link; texts are placeholders to refine).
- 2026-10-07: added "Prossimi viaggi" ("come per le escursioni"): trips have startDate/endDate + free-text destination; generic `UpcomingTours` + `TourCard` with `ExcursionCard`/`TripCard` adapters replaced `UpcomingExcursions`. Order: Hero → escursioni (default) → viaggi (muted) → Perché Tramonti (default, was muted).
- Card fields (user choice): title, date, spots available, zone, difficulty, image (Lorem Picsum placeholders), icons where possible; mobile = single column. More fields only on request.

**Why:** User wants to drive the home sections step by step.
**How to apply:** Hero is the home's first block and renders the h1 (exception to "PageIntro first"). See [[styling]], [[component-docs]], [[project-status]].
