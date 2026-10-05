import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";
import { LegalDocument } from "../_components/LegalDocument";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "PrivacyPage", "/privacy-policy");
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  await initLocale(params);
  const t = await getTranslations("PrivacyPage");

  return <LegalDocument doc="privacy" title={t("title")} />;
}
