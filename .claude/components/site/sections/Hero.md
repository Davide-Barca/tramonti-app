# `Hero` / `HeroEmphasis`

Source: `src/components/site/sections/Hero.tsx` · Server Component · Test: e2e (`navigation.spec.ts` "Home hero", `seo.spec.ts` one h1)

## Purpose

Full-viewport home hero (`min-h-svh`): background photo (with a light scrim) or placeholder gradient, centered optional `Badge`, the page **h1** (`size="display"`, light weight), lead paragraph and CTA actions. `HeroEmphasis` styles the highlighted words of the title (bold italic + `text-shadow-glow`).

## When to use

- First block of the **home page only**. It replaces `PageIntro` there (documented exception).

## When not to use

- Other pages: start with `PageIntro`. A second hero-like block on a page must not render an `h1` (build a different section).

## Usage

```tsx
import { Hero, HeroEmphasis } from "@/components/site/sections/Hero";
import { ButtonLink } from "@/components/site/ui/Button";

<Hero
  badge={t("hero.badge")}
  title={t.rich("hero.title", {
    em: (chunks) => <HeroEmphasis>{chunks}</HeroEmphasis>,
  })}
  lead={t("hero.lead")}
  actions={
    <>
      <ButtonLink href="/escursioni" size="md">
        {t("hero.primaryCta")}
      </ButtonLink>
      <ButtonLink href="/viaggi" variant="secondary" size="md">
        {t("hero.secondaryCta")}
      </ButtonLink>
    </>
  }
/>;
```

Message: `"title": "Il posto ideale per ritrovare la tua <em>pace interiore</em>"` (`HomePage.hero` in `it.json`).

## Props

| Prop      | Type                           | Default  | Notes                                                                                          |
| --------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `title`   | `ReactNode`                    | required | rendered inside the `h1`; use `t.rich` + `HeroEmphasis`                                        |
| `badge`   | `string`                       | –        | short label above the title                                                                    |
| `lead`    | `string`                       | –        | `text-lg text-muted-foreground max-w-narrow`                                                   |
| `actions` | `ReactNode`                    | –        | usually 2 `ButtonLink` (primary + secondary); row on `sm:`, stacked full-width on mobile       |
| `image`   | `{ src: string; alt: string }` | –        | background photo; without it a token gradient (`from-background via-muted to-accent`) is shown |

## Rules and notes

- Sits **below** the normal header (header unchanged, user decision): the hero is viewport-tall, so on small screens its bottom is just below the fold.
- Photo = LCP image: `next/image` `fill`, `preload` (Next 16: `priority` is deprecated), `sizes="100vw"`, `object-cover`. Only the hero image gets `preload`. Alt text must describe the photo (from `it.json` or data).
- With a photo, `Hero` adds a light scrim `bg-linear-to-b from-background/90 via-background/70 to-background/20` so dark text stays readable. Adding/changing the photo → measure text contrast on it (hide text, sample the darkest background pixel behind h1 and lead; need ≥ 4.5:1) at 1280px, 1920px and Pixel 7.
- Currently **no photo** (user removed the first one, 2026-10-06): the gradient is shown. Put the photo in `src/assets/images/`, import it in the home page and pass `image={{ src, alt }}`; alt text in `it.json` (`HomePage.hero.imageAlt`).
- No logo strip, no search bar, no header overlay (user choices, 2026-10-06). CTAs (user edit 2026-10-07): "Scopri le escursioni" → `/escursioni`, "Prossimi viaggi" → `/viaggi`, size `md`.

## Related

- [Button](../ui/Button.md), [Badge](../ui/Badge.md), [Heading](../ui/Heading.md), [PageIntro](PageIntro.md).
