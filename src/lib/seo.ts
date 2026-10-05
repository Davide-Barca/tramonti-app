import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export type Href = Parameters<typeof getPathname>[0]["href"];

export const ogLocales: Record<Locale, string> = {
  it: "it_IT",
};

/** Canonical + hreflang alternates for a typed href (e.g. "/chi-siamo"). */
export function localeAlternates(
  locale: Locale,
  href: Href,
): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })]),
  );
  languages["x-default"] = getPathname({
    locale: routing.defaultLocale,
    href,
  });

  return {
    canonical: getPathname({ locale, href }),
    languages,
  };
}

/** Absolute URL of a typed href (JSON-LD, sitemap). */
export function absoluteUrl(locale: Locale, href: Href): string {
  return new URL(getPathname({ locale, href }), siteUrl).href;
}

/** Message namespaces of static pages: each has metaTitle + metaDescription. */
export type StaticPageNamespace =
  | "AboutPage"
  | "ExcursionsPage"
  | "CustomExcursionsPage"
  | "TripsPage"
  | "LearningPage"
  | "ContactPage"
  | "PrivacyPage"
  | "CookiePage"
  | "TermsPage";

/** generateMetadata body for pages whose texts live in src/messages. */
export async function staticPageMetadata(
  locale: Locale,
  namespace: StaticPageNamespace,
  href: Href,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(locale, href),
  };
}
