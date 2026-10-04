import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Add new locales here (and the matching file in src/messages/).
  locales: ["it"],
  defaultLocale: "it",
  // Default locale is served without prefix: "/" not "/it".
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
