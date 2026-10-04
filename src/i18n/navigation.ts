import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers: use these instead of next/link and next/navigation in (site).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
