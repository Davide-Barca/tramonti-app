import type { StaticPathname } from "@/i18n/routing";
import type messages from "@/messages/it.json";

export type NavigationKey = keyof (typeof messages)["Navigation"];

export type NavItem = { href: StaticPathname; label: NavigationKey };

/** Main navigation (header). Labels are keys of the Navigation messages. */
export const mainNavItems = [
  { href: "/chi-siamo", label: "about" },
  { href: "/escursioni", label: "excursions" },
  { href: "/viaggi", label: "trips" },
  { href: "/contatti", label: "contact" },
] as const satisfies readonly NavItem[];
