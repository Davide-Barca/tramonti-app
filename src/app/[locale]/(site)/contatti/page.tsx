import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("ContactPage");

  return (
    <section>
      <h1>{t("title")}</h1>
    </section>
  );
}
