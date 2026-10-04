// @vitest-environment node
import { describe, expect, it } from "vitest";
import { localeAlternates } from "./seo";

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
});
