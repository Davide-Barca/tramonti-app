import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
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
  const [t, nav] = await Promise.all([
    getTranslations("CustomExcursionsPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <PageIntro
      title={t("title")}
      breadcrumbs={[
        { name: nav("home"), href: "/" },
        { name: nav("customExcursions"), href: "/escursioni-su-misura" },
      ]}
    />
  );
}
