import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Small pill label (highlights, categories). Text only, not interactive. */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}
