import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button, ButtonLink } from "./Button";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: ComponentProps<"a">) => (
    <a href={String(href)} {...props} />
  ),
}));

describe("Button", () => {
  it("defaults to a primary md non-submit button", () => {
    render(<Button>Invia</Button>);

    const button = screen.getByRole("button", { name: "Invia" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-10");
  });

  it("applies variant and size", () => {
    render(
      <Button variant="secondary" size="lg" type="submit">
        Invia
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Invia" });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveClass("border-border", "h-12");
    expect(button).not.toHaveClass("bg-primary");
  });
});

describe("ButtonLink", () => {
  it("renders a link styled as a button", () => {
    render(
      <ButtonLink href="/escursioni" className="w-full">
        Scopri
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Scopri" });
    expect(link).toHaveAttribute("href", "/escursioni");
    expect(link).toHaveClass("rounded-full", "bg-primary", "w-full");
  });
});
