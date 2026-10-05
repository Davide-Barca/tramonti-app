import type { MetadataRoute } from "next";
import { getEscursioni } from "@/features/escursioni/queries";
import { getViaggi } from "@/features/viaggi/queries";
import { routing, staticPathnames } from "@/i18n/routing";
import { absoluteUrl, type Href } from "@/lib/seo";

function entry(
  href: Href,
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(routing.defaultLocale, href),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, absoluteUrl(locale, href)]),
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [escursioni, viaggi] = await Promise.all([
    getEscursioni(),
    getViaggi(),
  ]);

  return [
    ...staticPathnames.map((pathname) => entry(pathname)),
    ...escursioni.map(({ slug, updatedAt }) =>
      entry({ pathname: "/escursioni/[slug]", params: { slug } }, updatedAt),
    ),
    ...viaggi.map(({ slug, updatedAt }) =>
      entry({ pathname: "/viaggi/[slug]", params: { slug } }, updatedAt),
    ),
  ];
}
