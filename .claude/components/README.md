# Component docs (for AI agents)

One Markdown file per component, mirroring the source tree. Read the component's file **before using or changing it**; read this index before creating a new one (maybe it already exists).

- Visual system (tokens, patterns, recipes): `.claude/design/`.
- Rules: `AGENTS.md`.

## Index

| Component               | Source                                                          | Doc                                                                    | Kind                   |
| ----------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| `Container`             | `src/components/site/ui/Container.tsx`                          | [site/ui/Container.md](site/ui/Container.md)                           | primitive              |
| `Section`               | `src/components/site/ui/Section.tsx`                            | [site/ui/Section.md](site/ui/Section.md)                               | primitive              |
| `Heading`               | `src/components/site/ui/Heading.tsx`                            | [site/ui/Heading.md](site/ui/Heading.md)                               | primitive              |
| `Prose`                 | `src/components/site/ui/Prose.tsx`                              | [site/ui/Prose.md](site/ui/Prose.md)                                   | primitive              |
| `Card`                  | `src/components/site/ui/Card.tsx`                               | [site/ui/Card.md](site/ui/Card.md)                                     | primitive              |
| `Button` / `ButtonLink` | `src/components/site/ui/Button.tsx`                             | [site/ui/Button.md](site/ui/Button.md)                                 | primitive              |
| `Badge`                 | `src/components/site/ui/Badge.tsx`                              | [site/ui/Badge.md](site/ui/Badge.md)                                   | primitive              |
| `Breadcrumbs`           | `src/components/site/ui/Breadcrumbs.tsx`                        | [site/ui/Breadcrumbs.md](site/ui/Breadcrumbs.md)                       | primitive (async, SEO) |
| `PageIntro`             | `src/components/site/sections/PageIntro.tsx`                    | [site/sections/PageIntro.md](site/sections/PageIntro.md)               | section                |
| `Hero` / `HeroEmphasis` | `src/components/site/sections/Hero.tsx`                         | [site/sections/Hero.md](site/sections/Hero.md)                         | section (home)         |
| `TourList`              | `src/components/site/sections/TourList.tsx`                     | [site/sections/TourList.md](site/sections/TourList.md)                 | section                |
| `SiteHeader`            | `src/components/site/layout/SiteHeader.tsx`                     | [site/layout/SiteHeader.md](site/layout/SiteHeader.md)                 | layout                 |
| `NavLink`               | `src/components/site/layout/NavLink.tsx`                        | [site/layout/NavLink.md](site/layout/NavLink.md)                       | layout (client)        |
| `SiteFooter`            | `src/components/site/layout/SiteFooter.tsx`                     | [site/layout/SiteFooter.md](site/layout/SiteFooter.md)                 | layout                 |
| nav items               | `src/components/site/layout/nav-items.ts`                       | [site/layout/nav-items.md](site/layout/nav-items.md)                   | config                 |
| `Icon`                  | `src/components/shared/Icon.tsx`                                | [shared/Icon.md](shared/Icon.md)                                       | shared (icons)         |
| `JsonLd`                | `src/components/shared/JsonLd.tsx`                              | [shared/JsonLd.md](shared/JsonLd.md)                                   | shared (SEO)           |
| `UpcomingExcursions`    | `src/app/[locale]/(site)/_components/UpcomingExcursions.tsx`    | [routes/home/UpcomingExcursions.md](routes/home/UpcomingExcursions.md) | route-local (home)     |
| `ExcursionCard`         | `src/app/[locale]/(site)/_components/ExcursionCard.tsx`         | [routes/home/ExcursionCard.md](routes/home/ExcursionCard.md)           | route-local (home)     |
| `LegalDocument`         | `src/app/[locale]/(site)/(legal)/_components/LegalDocument.tsx` | [routes/legal/LegalDocument.md](routes/legal/LegalDocument.md)         | route-local            |

## Folder layout

```
site/ui/        ↔ src/components/site/ui/
site/sections/  ↔ src/components/site/sections/
site/layout/    ↔ src/components/site/layout/
shared/         ↔ src/components/shared/
admin/          ↔ src/components/admin/   (when admin components exist)
routes/<route>/ ↔ src/app/…/<route>/_components/   (route-local components)
```

## Rule

Creating a component, or changing its props, behavior, variants or usage → create/update its doc **in the same change**, and update the index above. Deleting a component → delete its doc and index row.

## Template

````md
# `ComponentName`

Source: `src/…/ComponentName.tsx` · Server Component | Client Component · Test: `…test.tsx` | none

## Purpose

What it renders and why it exists (one or two sentences).

## When to use

- …

## When not to use

- … (point to the right alternative)

## Usage

```tsx
import { ComponentName } from "@/components/…/ComponentName";

<ComponentName prop="…" />;
```

## Props

| Prop | Type | Default | Notes |
| ---- | ---- | ------- | ----- |

## Rules and notes

- SEO / a11y / styling constraints, gotchas.

## Related

- Other components, design docs.
````
