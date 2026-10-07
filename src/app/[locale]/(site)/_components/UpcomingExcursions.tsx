import { ArrowRight } from "lucide";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/shared/Icon";
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";
import type { Escursione } from "@/features/escursioni/types";
import { Link } from "@/i18n/navigation";
import { ExcursionCard } from "./ExcursionCard";

type UpcomingExcursionsProps = {
  excursions: Escursione[];
};

/** Home: next scheduled excursions as a card grid + link to the full list. */
export async function UpcomingExcursions({
  excursions,
}: UpcomingExcursionsProps) {
  const t = await getTranslations("HomePage.upcoming");

  return (
    <Section aria-labelledby="upcoming-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <Heading as="h2" id="upcoming-title">
          {t("title")}
        </Heading>
        <Link
          href="/escursioni"
          className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
        >
          {t("viewAll")}
          <Icon icon={ArrowRight} />
        </Link>
      </div>
      {excursions.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {excursions.map((excursion) => (
            <li key={excursion.slug} className="flex">
              <ExcursionCard excursion={excursion} className="w-full" />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
