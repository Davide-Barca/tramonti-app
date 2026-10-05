// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getEscursione, getEscursioni } = await import("./queries");

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
});
