import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

// TODO: add static pages and API-driven entries (with real lastModified).
const paths = ["/"];

function absolute(locale: (typeof routing.locales)[number], href: string) {
  return new URL(getPathname({ locale, href }), siteUrl).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((href) => ({
    url: absolute(routing.defaultLocale, href),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absolute(locale, href)]),
      ),
    },
  }));
}
