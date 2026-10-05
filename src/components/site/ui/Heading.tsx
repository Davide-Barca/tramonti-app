import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva(
  "font-display font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        display: "text-display",
        h1: "text-h1",
        h2: "text-h2",
        h3: "text-h3",
        h4: "text-lg",
      },
    },
  },
);

type Level = "h1" | "h2" | "h3" | "h4";

export type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    /** Semantic level (document outline, SEO). */
    as: Level;
  };

/**
 * Heading with the semantic level (`as`) decoupled from the visual size
 * (`size`, defaults to the level): keep the outline ordered, style freely.
 */
export function Heading({ as: Tag, size, className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(headingVariants({ size: size ?? Tag }), className)}
      {...props}
    />
  );
}
