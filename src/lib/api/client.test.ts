// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

vi.mock("server-only", () => ({}));

const { apiFetch, ApiError } = await import("./client");

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubEnv("API_URL", "https://api.example.com/v1");
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("apiFetch", () => {
  it("joins the path to API_URL and forwards caching options", async () => {
    fetchMock.mockResolvedValue(Response.json({ id: 1 }));

    const data = await apiFetch("/items/1", {
      schema: z.object({ id: z.number() }),
      next: { tags: ["items"], revalidate: 3600 },
    });

    expect(data).toEqual({ id: 1 });
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://api.example.com/v1/items/1");
    expect(init?.next).toEqual({ tags: ["items"], revalidate: 3600 });
  });

  it("serializes json bodies", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    await apiFetch("items", {
      method: "POST",
      json: { name: "x" },
      schema: z.null(),
    });

    const [, init] = fetchMock.mock.calls[0];
    expect(init?.body).toBe('{"name":"x"}');
    expect(new Headers(init?.headers).get("Content-Type")).toBe(
      "application/json",
    );
  });

  it("throws ApiError on non-2xx responses", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 404 }));

    await expect(
      apiFetch("missing", { schema: z.unknown() }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("rejects responses that do not match the schema", async () => {
    fetchMock.mockResolvedValue(Response.json({ id: "1" }));

    await expect(
      apiFetch("items/1", { schema: z.object({ id: z.number() }) }),
    ).rejects.toThrow();
  });

  it("fails fast when API_URL is missing", async () => {
    vi.stubEnv("API_URL", "");

    await expect(apiFetch("x", { schema: z.unknown() })).rejects.toThrow(
      "API_URL is not set",
    );
  });
});
