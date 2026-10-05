import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { getEscursione, getEscursioni } from "@/features/escursioni/queries";
import { initLocale } from "@/i18n/locale";
import { absoluteUrl, localeAlternates } from "@/lib/seo";

export async function generateStaticParams() {
  const escursioni = await getEscursioni();
  return escursioni.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/escursioni/[slug]">): Promise<Metadata> {
  const locale = await initLocale(params);
  const { slug } = await params;
  const escursione = await getEscursione(slug);
  if (!escursione) notFound();

  return {
    title: escursione.title,
    description: escursione.excerpt,
    alternates: localeAlternates(locale, {
      pathname: "/escursioni/[slug]",
      params: { slug },
    }),
  };
}

export default async function ExcursionPage({
  params,
}: PageProps<"/[locale]/escursioni/[slug]">) {
  const locale = await initLocale(params);
  const { slug } = await params;
  const escursione = await getEscursione(slug);
  if (!escursione) notFound();

  const nav = await getTranslations("Navigation");
  const href = { pathname: "/escursioni/[slug]", params: { slug } } as const;

  return (
    <article>
      <PageIntro
        title={escursione.title}
        lead={escursione.excerpt}
        breadcrumbs={[
          { name: nav("home"), href: "/" },
          { name: nav("excursions"), href: "/escursioni" },
          { name: escursione.title, href },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: escursione.title,
          description: escursione.excerpt,
          url: absoluteUrl(locale, href),
        }}
      />
    </article>
  );
}
