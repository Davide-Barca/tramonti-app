import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";
import { LegalDocument } from "../_components/LegalDocument";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cookie-policy">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "CookiePage", "/cookie-policy");
}

export default async function CookiePage({
  params,
}: PageProps<"/[locale]/cookie-policy">) {
  await initLocale(params);
  const t = await getTranslations("CookiePage");

  return <LegalDocument doc="cookie" title={t("title")} />;
}
