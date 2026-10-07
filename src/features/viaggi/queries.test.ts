// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getUpcomingViaggi, getViaggi, getViaggio } = await import("./queries");
const { viaggioSchema } = await import("./types");

describe("viaggi queries", () => {
  it("returns validated viaggi", async () => {
    const all = await getViaggi();
    expect(all.length).toBeGreaterThan(0);
  });

  it("finds a viaggio by slug, null otherwise", async () => {
    const [first] = await getViaggi();
    expect(await getViaggio(first.slug)).toEqual(first);
    expect(await getViaggio("non-esiste")).toBeNull();
  });

  it("returns upcoming viaggi by start date, soonest first", async () => {
    const upcoming = await getUpcomingViaggi(
      3,
      new Date("2026-10-07T10:00:00Z"),
    );

    expect(upcoming).toHaveLength(3);
    expect(upcoming.every((v) => v.startDate >= "2026-10-07")).toBe(true);
    const starts = upcoming.map((v) => v.startDate);
    expect(starts).toEqual([...starts].sort());
  });

  it("rejects a trip ending before it starts", async () => {
    const [first] = await getViaggi();
    const result = viaggioSchema.safeParse({
      ...first,
      endDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });
});
