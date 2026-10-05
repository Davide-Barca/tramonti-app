import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./Container";

const sectionVariants = cva("py-section", {
  variants: {
    tone: {
      default: "",
      muted: "bg-muted",
    },
    spacing: {
      default: "",
      compact: "py-8 md:py-12",
    },
  },
  defaultVariants: { tone: "default", spacing: "default" },
});

export type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Width of the inner container. */
    width?: ContainerProps["width"];
  };

/** Page block: vertical rhythm + background tone + inner Container. */
export function Section({
  tone,
  spacing,
  width,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ tone, spacing }), className)}
      {...props}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
