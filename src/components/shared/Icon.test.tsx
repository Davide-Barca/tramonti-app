import { render } from "@testing-library/react";
import { MapPin } from "lucide";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("renders the lucide nodes as a decorative svg by default", () => {
    const { container } = render(<Icon icon={MapPin} />);
    const svg = container.querySelector("svg")!;

    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("size-4");
    expect(svg.querySelectorAll("path, circle")).toHaveLength(MapPin.length);
  });

  it("exposes an accessible name when labelled", () => {
    const { getByRole } = render(
      <Icon icon={MapPin} label="Zona" className="size-5" />,
    );

    const svg = getByRole("img", { name: "Zona" });
    expect(svg).toHaveClass("size-5");
    expect(svg).not.toHaveClass("size-4");
  });
});
