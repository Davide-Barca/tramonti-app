import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apprendimento">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "LearningPage", "/apprendimento");
}

export default async function LearningPage({
  params,
}: PageProps<"/[locale]/apprendimento">) {
  await initLocale(params);
  const [t, nav] = await Promise.all([
    getTranslations("LearningPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <PageIntro
      title={t("title")}
      breadcrumbs={[
        { name: nav("home"), href: "/" },
        { name: nav("learning"), href: "/apprendimento" },
      ]}
    />
  );
}
