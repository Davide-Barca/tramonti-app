// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getLegalDocument } = await import("./queries");

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

describe("getLegalDocument", () => {
  it("returns null without calling iubenda when the id is missing", async () => {
    vi.stubEnv("IUBENDA_POLICY_ID", "");

    expect(await getLegalDocument("privacy")).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches the cookie policy under the privacy policy id", async () => {
    vi.stubEnv("IUBENDA_POLICY_ID", "123");
    fetchMock.mockResolvedValue(
      Response.json({ success: true, content: "<p>ok</p>" }),
    );

    expect(await getLegalDocument("cookie")).toBe("<p>ok</p>");
    expect(String(fetchMock.mock.calls[0][0])).toBe(
      "https://www.iubenda.com/api/privacy-policy/123/cookie-policy/no-markup",
    );
  });

  it("demotes h1 headings so the page keeps a single h1", async () => {
    vi.stubEnv("IUBENDA_TERMS_ID", "456");
    fetchMock.mockResolvedValue(
      Response.json({ success: true, content: '<h1 class="x">T</h1>' }),
    );

    expect(await getLegalDocument("terms")).toBe('<h2 class="x">T</h2>');
  });

  it("returns null when iubenda reports an error", async () => {
    vi.stubEnv("IUBENDA_POLICY_ID", "123");
    fetchMock.mockResolvedValue(
      Response.json({ success: false, error: "Document not found" }),
    );

    expect(await getLegalDocument("privacy")).toBeNull();
  });
});
