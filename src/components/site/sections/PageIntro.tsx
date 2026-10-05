import { Breadcrumbs, type Crumb } from "@/components/site/ui/Breadcrumbs";
import { Heading, type HeadingProps } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";

type PageIntroProps = {
  /** The page h1. */
  title: string;
  lead?: string;
  breadcrumbs?: Crumb[];
  size?: HeadingProps["size"];
};

/** Top block of every page: optional breadcrumbs, the single h1, lead text. */
export function PageIntro({ title, lead, breadcrumbs, size }: PageIntroProps) {
  return (
    <Section spacing="compact" className="border-b border-border">
      <div className="flex flex-col gap-4">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Heading as="h1" size={size}>
          {title}
        </Heading>
        {lead && (
          <p className="max-w-narrow text-lg text-muted-foreground">{lead}</p>
        )}
      </div>
    </Section>
  );
}
