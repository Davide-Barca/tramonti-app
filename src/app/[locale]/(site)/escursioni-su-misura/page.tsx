import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/escursioni-su-misura">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(
    locale,
    "CustomExcursionsPage",
    "/escursioni-su-misura",
  );
}

export default async function CustomExcursionsPage({
  params,
}: PageProps<"/[locale]/escursioni-su-misura">) {
  await initLocale(params);
  const t = await getTranslations("CustomExcursionsPage");

  return (
    <section>
      <h1>{t("title")}</h1>
    </section>
  );
}
