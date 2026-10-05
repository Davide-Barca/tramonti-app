import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("LearningPage");

  return (
    <section>
      <h1>{t("title")}</h1>
    </section>
  );
}
