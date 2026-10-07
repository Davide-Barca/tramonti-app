import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero, HeroEmphasis } from "@/components/site/sections/Hero";
import { ButtonLink } from "@/components/site/ui/Button";
import { getUpcomingEscursioni } from "@/features/escursioni/queries";
import { initLocale } from "@/i18n/locale";
import { localeAlternates } from "@/lib/seo";
import { UpcomingExcursions } from "./_components/UpcomingExcursions";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await initLocale(params);
  return { alternates: localeAlternates(locale, "/") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await initLocale(params);
  const [t, upcoming] = await Promise.all([
    getTranslations("HomePage"),
    getUpcomingEscursioni(3),
  ]);

  return (
    <>
      <Hero
        badge={t("hero.badge")}
        title={t.rich("hero.title", {
          em: (chunks) => <HeroEmphasis>{chunks}</HeroEmphasis>,
        })}
        lead={t("hero.lead")}
        actions={
          <>
            <ButtonLink href="/escursioni" size="md">
              {t("hero.primaryCta")}
            </ButtonLink>
            <ButtonLink href="/viaggi" variant="secondary" size="md">
              {t("hero.secondaryCta")}
            </ButtonLink>
          </>
        }
      />
      <UpcomingExcursions excursions={upcoming} />
    </>
  );
}
