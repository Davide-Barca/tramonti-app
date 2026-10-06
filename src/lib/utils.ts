import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom theme tokens from src/styles/site.css: without them tailwind-merge
// cannot tell `text-h2` (font size) from `text-foreground` (color).
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3"],
      container: ["page", "narrow"],
      spacing: ["section"],
      radius: ["card"],
      "text-shadow": ["glow"],
    },
  },
});

/** Join class names; later Tailwind classes override conflicting earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
