import { createElement, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Icon data from the `lucide` package: [tag, attributes][]. */
export type IconNode = (typeof import("lucide"))["MapPin"];

export type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  /** Icon data, e.g. `import { MapPin } from "lucide"`. */
  icon: IconNode;
  /** Accessible name. Omit for decorative icons (default: aria-hidden). */
  label?: string;
};

/**
 * Lucide icon rendered as inline SVG on the server: zero client JS
 * (lucide-react ships a client component). Inherits color via currentColor.
 */
export function Icon({ icon, label, className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      {icon.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
