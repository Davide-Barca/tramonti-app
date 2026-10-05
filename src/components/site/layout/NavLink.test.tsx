import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { isActivePath, NavLink } from "./NavLink";

const usePathname = vi.fn<() => string>();

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => usePathname(),
  Link: ({ href, ...props }: ComponentProps<"a">) => (
    <a href={String(href)} {...props} />
  ),
}));

beforeEach(() => {
  usePathname.mockReset();
});

describe("isActivePath", () => {
  it("matches the exact route and its sub-routes", () => {
    expect(isActivePath("/escursioni", "/escursioni")).toBe(true);
    expect(isActivePath("/escursioni/[slug]", "/escursioni")).toBe(true);
  });

  it("does not match routes that only share a prefix", () => {
    expect(isActivePath("/escursioni-su-misura", "/escursioni")).toBe(false);
  });

  it("matches home only on home", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/viaggi", "/")).toBe(false);
  });
});

describe("NavLink", () => {
  it("sets aria-current on the active section", () => {
    usePathname.mockReturnValue("/viaggi/[slug]");
    render(<NavLink href="/viaggi">Viaggi</NavLink>);

    expect(screen.getByRole("link", { name: "Viaggi" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("omits aria-current on other sections", () => {
    usePathname.mockReturnValue("/contatti");
    render(<NavLink href="/viaggi">Viaggi</NavLink>);

    expect(screen.getByRole("link", { name: "Viaggi" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
