import { CalendarDays } from "lucide";
import Image from "next/image";
import { getFormatter, getTranslations } from "next-intl/server";
import { Icon, type IconNode } from "@/components/shared/Icon";
import { Card } from "@/components/site/ui/Card";
import { Heading } from "@/components/site/ui/Heading";
import { Link } from "@/i18n/navigation";
import { formatDayRange } from "@/lib/dates";
import type { Href } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type TourDetail = {
  icon: IconNode;
  /** Screen-reader term (visible meaning comes from the icon + value). */
  label: string;
  value: string;
};

export type TourCardProps = {
  href: Href;
  title: string;
  image: { src: string; alt: string };
  /** One day (YYYY-MM-DD) or a range for multi-day tours. */
  date: { start: string; end?: string };
  details: TourDetail[];
  className?: string;
};

/** Presentational card for dated tours: photo, date(s), title link, icon details. */
export async function TourCard({
  href,
  title,
  image,
  date,
  details,
  className,
}: TourCardProps) {
  const [t, format] = await Promise.all([
    getTranslations("Tour"),
    getFormatter(),
  ]);
  const formatted = date.end
    ? formatDayRange(date.start, date.end, (d, options) =>
        format.dateTime(d, options),
      )
    : format.dateTime(new Date(date.start), {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <Card className={cn("gap-0 overflow-hidden p-0", className)}>
      <div className="relative aspect-4/3 bg-muted">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <Icon icon={CalendarDays} />
          <span className="sr-only">{t("date")}: </span>
          <time dateTime={date.start}>{formatted}</time>
        </p>
        <Heading as="h3" size="h4">
          <Link
            href={href}
            className="underline-offset-4 hover:text-primary hover:underline"
          >
            {title}
          </Link>
        </Heading>
        <dl className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
          {details.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <dt>
                <Icon icon={icon} className="text-primary" />
                <span className="sr-only">{label}</span>
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
