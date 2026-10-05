import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 md:px-6", {
  variants: {
    width: {
      page: "max-w-page",
      narrow: "max-w-narrow",
    },
  },
  defaultVariants: { width: "page" },
});

export type ContainerProps = ComponentProps<"div"> &
  VariantProps<typeof containerVariants>;

/** Centered content column with side gutters. */
export function Container({ width, className, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ width }), className)} {...props} />
  );
}
