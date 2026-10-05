import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";
import { LegalDocument } from "../_components/LegalDocument";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/termini-e-condizioni">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "TermsPage", "/termini-e-condizioni");
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/termini-e-condizioni">) {
  await initLocale(params);
  const t = await getTranslations("TermsPage");

  return <LegalDocument doc="terms" title={t("title")} />;
}
