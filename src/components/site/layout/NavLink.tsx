"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticPathname } from "@/i18n/routing";

type NavLinkProps = {
  href: StaticPathname;
  children: ReactNode;
};

/** True when `pathname` is `href` or one of its sub-routes. */
export function isActivePath(pathname: string, href: StaticPathname): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Navigation link marked with aria-current="page" on its section.
 * Client component only for usePathname; the label comes translated from the server.
 */
export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      // Underline (not bold) for the current page: no width change, no layout shift.
      className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:text-primary aria-[current=page]:underline"
      aria-current={isActivePath(pathname, href) ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
