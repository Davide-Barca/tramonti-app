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

/** Footer "Esplora": main pages + secondary pages not in the header. */
export const footerNavItems = [
  { href: "/chi-siamo", label: "about" },
  { href: "/escursioni", label: "excursions" },
  { href: "/escursioni-su-misura", label: "customExcursions" },
  { href: "/viaggi", label: "trips" },
  { href: "/apprendimento", label: "learning" },
  { href: "/contatti", label: "contact" },
  { href: "/lavora-con-noi", label: "workWithUs" },
] as const satisfies readonly NavItem[];

/** Footer legal links (mandatory pages). */
export const legalNavItems = [
  { href: "/privacy-policy", label: "privacy" },
  { href: "/cookie-policy", label: "cookie" },
  { href: "/termini-e-condizioni", label: "terms" },
] as const satisfies readonly NavItem[];
