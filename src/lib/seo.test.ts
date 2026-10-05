// @vitest-environment node
import { describe, expect, it } from "vitest";
import { absoluteUrl, localeAlternates } from "./seo";
import { siteUrl } from "./site";

describe("localeAlternates", () => {
  it("builds unprefixed canonical for the default locale", () => {
    expect(localeAlternates("it", "/")?.canonical).toBe("/");
    expect(localeAlternates("it", "/chi-siamo")?.canonical).toBe("/chi-siamo");
  });

  it("includes every locale plus x-default in hreflang", () => {
    expect(localeAlternates("it", "/chi-siamo")?.languages).toEqual({
      it: "/chi-siamo",
      "x-default": "/chi-siamo",
    });
  });

  it("resolves dynamic routes from their params", () => {
    expect(
      localeAlternates("it", {
        pathname: "/escursioni/[slug]",
        params: { slug: "sentiero" },
      })?.canonical,
    ).toBe("/escursioni/sentiero");
  });
});

describe("absoluteUrl", () => {
  it("prefixes the site URL", () => {
    expect(absoluteUrl("it", "/contatti")).toBe(
      new URL("/contatti", siteUrl).href,
    );
  });
});
