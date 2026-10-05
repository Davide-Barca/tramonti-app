import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("AboutPage");

  return (
    <section>
      <h1>{t("title")}</h1>
    </section>
  );
}
