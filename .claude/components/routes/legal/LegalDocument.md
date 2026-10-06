# `LegalDocument`

Source: `src/app/[locale]/(site)/(legal)/_components/LegalDocument.tsx` · async Server Component · route-local · Test: e2e (legal pages in `seo.spec.ts`)

## Purpose

Body of the legal pages: `PageIntro` with the title + the iubenda document rendered server-side in `Prose`, or a placeholder (`Legal.unavailable`) when the iubenda id is missing or iubenda fails.

## When to use

- Only in the `(legal)` route group pages: `/privacy-policy`, `/cookie-policy`, `/termini-e-condizioni`.

## When not to use

- Other pages: it is route-local (`_components/`). If another route needs it, move it to `components/site/` and move this doc accordingly.

## Usage

```tsx
import { LegalDocument } from "../_components/LegalDocument";

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  await initLocale(params);
  const t = await getTranslations("PrivacyPage");
  return <LegalDocument doc="privacy" title={t("title")} />;
}
```

## Props

| Prop    | Type                               | Default  | Notes                           |
| ------- | ---------------------------------- | -------- | ------------------------------- |
| `doc`   | `"privacy" \| "cookie" \| "terms"` | required | which iubenda document to fetch |
| `title` | `string`                           | required | page `h1` (translated)          |

## Rules and notes

- Data from `getLegalDocument` (`src/features/legal/queries.ts`): cached 24h + tag `legal`, iubenda `h1` demoted to `h2`. Env: `IUBENDA_POLICY_ID` (privacy + cookie), `IUBENDA_TERMS_ID`.
- HTML is trusted (our iubenda account) and injected via `Prose html`.
- Content `Section` keeps page width; `.prose` limits line length so text aligns with the title.

## Related

- [Prose](../../site/ui/Prose.md), [PageIntro](../../site/sections/PageIntro.md).
