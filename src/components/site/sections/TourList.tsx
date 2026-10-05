import { Card } from "@/components/site/ui/Card";
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";
import { Link } from "@/i18n/navigation";
import type { Href } from "@/lib/seo";

export type TourListItem = {
  slug: string;
  title: string;
  excerpt: string;
  href: Href;
};

type TourListProps = {
  items: TourListItem[];
  /** Shown when the list is empty. */
  emptyText: string;
};

/** Card grid of escursioni / viaggi linking to their detail pages. */
export function TourList({ items, emptyText }: TourListProps) {
  return (
    <Section>
      {items.length === 0 ? (
        <p className="text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="flex">
              <Card className="w-full">
                <Heading as="h2" size="h3">
                  <Link
                    href={item.href}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {item.title}
                  </Link>
                </Heading>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
