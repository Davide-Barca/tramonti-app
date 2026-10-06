import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero, HeroEmphasis } from "@/components/site/sections/Hero";
import { ButtonLink } from "@/components/site/ui/Button";
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

  return (
    <Hero
      badge={t("hero.badge")}
      title={t.rich("hero.title", {
        em: (chunks) => <HeroEmphasis>{chunks}</HeroEmphasis>,
      })}
      lead={t("hero.lead")}
      actions={
        <>
          <ButtonLink href="/escursioni" size="lg">
            {t("hero.primaryCta")}
          </ButtonLink>
          <ButtonLink
            href="/escursioni-su-misura"
            variant="secondary"
            size="lg"
          >
            {t("hero.secondaryCta")}
          </ButtonLink>
        </>
      }
    />
  );
}
