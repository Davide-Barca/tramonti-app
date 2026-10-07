// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getEscursione, getEscursioni, getUpcomingEscursioni } =
  await import("./queries");

describe("escursioni queries", () => {
  it("returns validated escursioni", async () => {
    const all = await getEscursioni();
    expect(all.length).toBeGreaterThan(0);
  });

  it("finds an escursione by slug, null otherwise", async () => {
    const [first] = await getEscursioni();
    expect(await getEscursione(first.slug)).toEqual(first);
    expect(await getEscursione("non-esiste")).toBeNull();
  });

  it("returns upcoming escursioni from a day on, soonest first", async () => {
    const upcoming = await getUpcomingEscursioni(
      3,
      new Date("2026-10-07T10:00:00Z"),
    );

    expect(upcoming).toHaveLength(3);
    expect(upcoming.every((e) => e.date >= "2026-10-07")).toBe(true);
    const dates = upcoming.map((e) => e.date);
    expect(dates).toEqual([...dates].sort());
  });

  it("includes excursions happening today (Rome time)", async () => {
    // 23:30 UTC on Oct 17 is already Oct 18 in Rome.
    const [next] = await getUpcomingEscursioni(
      1,
      new Date("2026-10-17T23:30:00Z"),
    );
    expect(next.date).toBe("2026-10-18");
  });
});
