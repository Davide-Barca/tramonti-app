import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { initLocale } from "@/i18n/locale";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await initLocale(params);
  return { alternates: localeAlternates(locale, "/") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await initLocale(params);
  const t = await getTranslations("HomePage");

  return <PageIntro title={t("title")} size="display" />;
}
