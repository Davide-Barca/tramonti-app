import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero, HeroEmphasis } from "@/components/site/sections/Hero";
import { ButtonLink } from "@/components/site/ui/Button";
import { getUpcomingEscursioni } from "@/features/escursioni/queries";
import { getUpcomingViaggi } from "@/features/viaggi/queries";
import { initLocale } from "@/i18n/locale";
import { localeAlternates } from "@/lib/seo";
import { ExcursionCard } from "./_components/ExcursionCard";
import { TripCard } from "./_components/TripCard";
import { UpcomingTours } from "./_components/UpcomingTours";
import { WhyTramonti } from "./_components/WhyTramonti";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = await initLocale(params);
  return { alternates: localeAlternates(locale, "/") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await initLocale(params);
  const [t, excursions, trips] = await Promise.all([
    getTranslations("HomePage"),
    getUpcomingEscursioni(3),
    getUpcomingViaggi(3),
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
      <UpcomingTours
        id="upcoming-excursions-title"
        title={t("upcoming.title")}
        viewAll={{ href: "/escursioni", label: t("upcoming.viewAll") }}
        emptyText={t("upcoming.empty")}
      >
        {excursions.map((excursion) => (
          <ExcursionCard
            key={excursion.slug}
            excursion={excursion}
            className="w-full"
          />
        ))}
      </UpcomingTours>
      <WhyTramonti />
      <UpcomingTours
        id="upcoming-trips-title"
        title={t("upcomingTrips.title")}
        viewAll={{ href: "/viaggi", label: t("upcomingTrips.viewAll") }}
        emptyText={t("upcomingTrips.empty")}
      >
        {trips.map((trip) => (
          <TripCard key={trip.slug} trip={trip} className="w-full" />
        ))}
      </UpcomingTours>
    </>
  );
}
