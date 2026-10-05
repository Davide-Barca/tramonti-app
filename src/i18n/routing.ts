import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Add new locales here (and the matching file in src/messages/).
  locales: ["it"],
  defaultLocale: "it",
  // Default locale is served without prefix: "/" not "/it".
  localePrefix: "as-needed",
  // Every public route, keyed by its internal path (the folder structure).
  // A string value is used for every locale; translate per locale with
  // { it: "/chi-siamo", en: "/about-us" } when a new locale is added.
  pathnames: {
    "/": "/",
    "/chi-siamo": "/chi-siamo",
    "/escursioni": "/escursioni",
    "/escursioni/[slug]": "/escursioni/[slug]",
    "/escursioni-su-misura": "/escursioni-su-misura",
    "/viaggi": "/viaggi",
    "/viaggi/[slug]": "/viaggi/[slug]",
    "/apprendimento": "/apprendimento",
    "/contatti": "/contatti",
    "/privacy-policy": "/privacy-policy",
    "/cookie-policy": "/cookie-policy",
    "/termini-e-condizioni": "/termini-e-condizioni",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;

/** Routes without dynamic segments (sitemap, e2e). */
export const staticPathnames = (
  Object.keys(routing.pathnames) as Pathname[]
).filter(
  (p): p is Exclude<Pathname, `${string}[${string}`> => !p.includes("["),
);
