// @vitest-environment node
import type { DateTimeFormatOptions } from "next-intl";
import { describe, expect, it } from "vitest";
import { formatDayRange, romeDay } from "./dates";

describe("romeDay", () => {
  it("returns the Rome calendar day, not the UTC one", () => {
    expect(romeDay(new Date("2026-10-17T21:30:00Z"))).toBe("2026-10-17");
    expect(romeDay(new Date("2026-10-17T23:30:00Z"))).toBe("2026-10-18");
  });
});

describe("formatDayRange", () => {
  const format = (date: Date, options: DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("it-IT", {
      timeZone: "Europe/Rome",
      ...options,
    }).format(date);

  it("collapses month and year when shared", () => {
    expect(formatDayRange("2026-11-13", "2026-11-15", format)).toBe(
      "13–15 novembre 2026",
    );
    expect(formatDayRange("2027-07-04", "2027-07-10", format)).toBe(
      "4–10 luglio 2027",
    );
  });

  it("keeps both months within the same year", () => {
    expect(formatDayRange("2026-10-30", "2026-11-02", format)).toBe(
      "30 ottobre – 2 novembre 2026",
    );
  });

  it("writes full dates across years and handles one-day ranges", () => {
    expect(formatDayRange("2026-12-28", "2027-01-03", format)).toBe(
      "28 dicembre 2026 – 3 gennaio 2027",
    );
    expect(formatDayRange("2026-11-13", "2026-11-13", format)).toBe(
      "13 novembre 2026",
    );
  });
});
