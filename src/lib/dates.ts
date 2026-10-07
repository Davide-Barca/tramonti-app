import type { DateTimeFormatOptions } from "next-intl";

/** Business time zone: dates are days in Italy. */
export const TIME_ZONE = "Europe/Rome";

/** Day of `date` in Europe/Rome as YYYY-MM-DD (comparable as a string). */
export function romeDay(date: Date): string {
  return date.toLocaleDateString("sv-SE", { timeZone: TIME_ZONE });
}

type DayFormatter = (date: Date, options: DateTimeFormatOptions) => string;

const FULL: DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
};

/**
 * Compact range of two YYYY-MM-DD days, without leading zeros
 * (Intl's formatRange pads days in Italian: "04–10 luglio"):
 * "13–15 novembre 2026", "30 ottobre – 2 novembre 2026",
 * "28 dicembre 2026 – 3 gennaio 2027".
 */
export function formatDayRange(
  start: string,
  end: string,
  format: DayFormatter,
): string {
  const [sy, sm] = start.split("-");
  const [ey, em] = end.split("-");
  const startDate = new Date(start);
  const endText = format(new Date(end), FULL);

  if (start === end) return endText;
  if (sy === ey && sm === em)
    return `${format(startDate, { day: "numeric" })}–${endText}`;
  if (sy === ey)
    return `${format(startDate, { day: "numeric", month: "long" })} – ${endText}`;
  return `${format(startDate, FULL)} – ${endText}`;
}
