// @vitest-environment node
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins conditional classes", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("keeps custom font sizes next to text colors", () => {
    expect(cn("text-h2 text-foreground")).toBe("text-h2 text-foreground");
  });

  it("lets later classes override conflicting custom tokens", () => {
    expect(cn("text-h2", "text-h1")).toBe("text-h1");
    expect(cn("py-section", "py-4")).toBe("py-4");
    expect(cn("max-w-page", "max-w-narrow")).toBe("max-w-narrow");
    expect(cn("rounded-card", "rounded-none")).toBe("rounded-none");
    expect(cn("text-shadow-glow", "text-shadow-none")).toBe("text-shadow-none");
  });
});
