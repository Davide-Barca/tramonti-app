import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/chi-siamo">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "AboutPage", "/chi-siamo");
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/chi-siamo">) {
  await initLocale(params);
  const [t, nav] = await Promise.all([
    getTranslations("AboutPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <PageIntro
      title={t("title")}
      breadcrumbs={[
        { name: nav("home"), href: "/" },
        { name: nav("about"), href: "/chi-siamo" },
      ]}
    />
  );
}
