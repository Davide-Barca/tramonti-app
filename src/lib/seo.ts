import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export const ogLocales: Record<Locale, string> = {
  it: "it_IT",
};

/** Canonical + hreflang alternates for a locale-agnostic href (e.g. "/chi-siamo"). */
export function localeAlternates(
  locale: Locale,
  href: string,
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
