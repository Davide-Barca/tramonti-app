import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Bordered surface for list items (escursioni, viaggi…). */
export function Card({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-card border border-border bg-background p-6",
        className,
      )}
      {...props}
    />
  );
}
