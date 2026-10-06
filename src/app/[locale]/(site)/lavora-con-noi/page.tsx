import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/sections/PageIntro";
import { initLocale } from "@/i18n/locale";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/lavora-con-noi">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "WorkWithUsPage", "/lavora-con-noi");
}

export default async function WorkWithUsPage({
  params,
}: PageProps<"/[locale]/lavora-con-noi">) {
  await initLocale(params);
  const [t, nav] = await Promise.all([
    getTranslations("WorkWithUsPage"),
    getTranslations("Navigation"),
  ]);

  return (
    <PageIntro
      title={t("title")}
      breadcrumbs={[
        { name: nav("home"), href: "/" },
        { name: nav("workWithUs"), href: "/lavora-con-noi" },
      ]}
    />
  );
}
