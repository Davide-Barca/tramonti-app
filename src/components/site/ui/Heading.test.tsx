import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders the semantic level and defaults the size to it", () => {
    render(<Heading as="h2">Titolo</Heading>);

    const heading = screen.getByRole("heading", { level: 2, name: "Titolo" });
    expect(heading).toHaveClass("text-h2");
  });

  it("decouples visual size from the level", () => {
    render(
      <Heading as="h2" size="display">
        Titolo
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveClass("text-display");
    expect(heading).not.toHaveClass("text-h2");
  });

  it("merges className overrides", () => {
    render(
      <Heading as="h3" className="text-primary">
        Titolo
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("text-h3", "text-primary");
    expect(heading).not.toHaveClass("text-foreground");
  });
});
