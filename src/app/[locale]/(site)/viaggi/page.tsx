import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { TourList } from "@/components/site/sections/TourList";
import { getViaggi } from "@/features/viaggi/queries";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/viaggi">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "TripsPage", "/viaggi");
}

export default async function TripsPage({
  params,
}: PageProps<"/[locale]/viaggi">) {
  await initLocale(params);
  const [t, nav, viaggi] = await Promise.all([
    getTranslations("TripsPage"),
    getTranslations("Navigation"),
    getViaggi(),
  ]);

  return (
    <>
      <PageIntro
        title={t("title")}
        breadcrumbs={[
          { name: nav("home"), href: "/" },
          { name: nav("trips"), href: "/viaggi" },
        ]}
      />
      <TourList
        emptyText={t("empty")}
        items={viaggi.map(({ slug, title, excerpt }) => ({
          slug,
          title,
          excerpt,
          href: { pathname: "/viaggi/[slug]", params: { slug } },
        }))}
      />
    </>
  );
}
