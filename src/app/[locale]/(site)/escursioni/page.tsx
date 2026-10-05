import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { TourList } from "@/components/site/sections/TourList";
import { getEscursioni } from "@/features/escursioni/queries";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/escursioni">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "ExcursionsPage", "/escursioni");
}

export default async function ExcursionsPage({
  params,
}: PageProps<"/[locale]/escursioni">) {
  await initLocale(params);
  const [t, nav, escursioni] = await Promise.all([
    getTranslations("ExcursionsPage"),
    getTranslations("Navigation"),
    getEscursioni(),
  ]);

  return (
    <>
      <PageIntro
        title={t("title")}
        breadcrumbs={[
          { name: nav("home"), href: "/" },
          { name: nav("excursions"), href: "/escursioni" },
        ]}
      />
      <TourList
        emptyText={t("empty")}
        items={escursioni.map(({ slug, title, excerpt }) => ({
          slug,
          title,
          excerpt,
          href: { pathname: "/escursioni/[slug]", params: { slug } },
        }))}
      />
    </>
  );
}
