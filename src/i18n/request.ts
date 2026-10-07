import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { TIME_ZONE } from "@/lib/dates";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // Fixed zone: dates render the same on server and client (Italian business).
    timeZone: TIME_ZONE,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
