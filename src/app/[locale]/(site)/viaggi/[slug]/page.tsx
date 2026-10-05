import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/shared/JsonLd";
import { Breadcrumbs } from "@/components/site/ui/Breadcrumbs";
import { getViaggio, getViaggi } from "@/features/viaggi/queries";
import { initLocale } from "@/i18n/locale";
import { absoluteUrl, localeAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  const viaggi = await getViaggi();
  return viaggi.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/viaggi/[slug]">): Promise<Metadata> {
  const locale = await initLocale(params);
  const { slug } = await params;
  const viaggio = await getViaggio(slug);
  if (!viaggio) notFound();

  return {
    title: viaggio.title,
    description: viaggio.excerpt,
    alternates: localeAlternates(locale, {
      pathname: "/viaggi/[slug]",
      params: { slug },
    }),
  };
}

export default async function TripPage({
  params,
}: PageProps<"/[locale]/viaggi/[slug]">) {
  const locale = await initLocale(params);
  const { slug } = await params;
  const viaggio = await getViaggio(slug);
  if (!viaggio) notFound();

  const nav = await getTranslations("Navigation");
  const href = { pathname: "/viaggi/[slug]", params: { slug } } as const;

  return (
    <article>
      <Breadcrumbs
        items={[
          { name: nav("home"), href: "/" },
          { name: nav("trips"), href: "/viaggi" },
          { name: viaggio.title, href },
        ]}
      />
      <h1>{viaggio.title}</h1>
      <p>{viaggio.excerpt}</p>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: viaggio.title,
          description: viaggio.excerpt,
          url: absoluteUrl(locale, href),
        }}
      />
    </article>
  );
}
