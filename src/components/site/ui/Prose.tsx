import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ProseProps = Omit<
  ComponentProps<"div">,
  "dangerouslySetInnerHTML"
> & {
  /** Trusted HTML (e.g. iubenda). Otherwise pass children. */
  html?: string;
};

/** Long-form text styled by `.prose` (site.css): for HTML we cannot class. */
export function Prose({ html, className, children, ...props }: ProseProps) {
  return html ? (
    <div
      className={cn("prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  ) : (
    <div className={cn("prose", className)} {...props}>
      {children}
    </div>
  );
}
