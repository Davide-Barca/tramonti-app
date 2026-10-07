import { Gauge, MapPin, Users } from "lucide";
import { getTranslations } from "next-intl/server";
import type { Viaggio } from "@/features/viaggi/types";
import { TourCard } from "./TourCard";

type TripCardProps = {
  trip: Viaggio;
  className?: string;
};

/** Viaggio → TourCard: date range, destination, difficulty, spots left. */
export async function TripCard({ trip, className }: TripCardProps) {
  const t = await getTranslations("Tour");
  const {
    slug,
    title,
    startDate,
    endDate,
    destination,
    difficulty,
    spotsAvailable,
    image,
  } = trip;

  return (
    <TourCard
      className={className}
      href={{ pathname: "/viaggi/[slug]", params: { slug } }}
      title={title}
      image={image}
      date={{ start: startDate, end: endDate }}
      details={[
        { icon: MapPin, label: t("destination"), value: destination },
        {
          icon: Gauge,
          label: t("difficulty"),
          value: t(`difficulties.${difficulty}`),
        },
        {
          icon: Users,
          label: t("spots"),
          value: t("spotsLeft", { count: spotsAvailable }),
        },
      ]}
    />
  );
}
