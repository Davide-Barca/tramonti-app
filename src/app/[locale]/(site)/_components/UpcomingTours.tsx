import { ArrowRight } from "lucide";
import { Children, isValidElement, type ReactNode } from "react";
import { Icon } from "@/components/shared/Icon";
import { Heading } from "@/components/site/ui/Heading";
import { Section, type SectionProps } from "@/components/site/ui/Section";
import type { StaticPathname } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type UpcomingToursProps = {
  /** Id of the h2 (section aria-labelledby). */
  id: string;
  title: string;
  viewAll: { href: StaticPathname; label: string };
  emptyText: string;
  tone?: SectionProps["tone"];
  /** One card per item (ExcursionCard / TripCard); each is wrapped in <li>. */
  children: ReactNode;
};

/** Home: next scheduled tours as a card grid + link to the full list. */
export function UpcomingTours({
  id,
  title,
  viewAll,
  emptyText,
  tone,
  children,
}: UpcomingToursProps) {
  const cards = Children.toArray(children);

  return (
    <Section tone={tone} aria-labelledby={id}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <Heading as="h2" id={id}>
          {title}
        </Heading>
        <Link
          href={viewAll.href}
          className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
        >
          {viewAll.label}
          <Icon icon={ArrowRight} />
        </Link>
      </div>
      {cards.length === 0 ? (
        <p className="text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <li key={isValidElement(card) ? card.key : i} className="flex">
              {card}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
