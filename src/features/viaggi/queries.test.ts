// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getViaggio, getViaggi } = await import("./queries");

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
});
