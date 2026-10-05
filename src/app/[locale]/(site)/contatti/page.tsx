import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contatti">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "ContactPage", "/contatti");
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contatti">) {
  await initLocale(params);
  const [t, nav] = await Promise.all([
    getTranslations("ContactPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <PageIntro
      title={t("title")}
      breadcrumbs={[
        { name: nav("home"), href: "/" },
        { name: nav("contact"), href: "/contatti" },
      ]}
    />
  );
}
