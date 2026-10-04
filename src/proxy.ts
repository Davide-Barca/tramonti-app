import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { ADMIN_HOME, ADMIN_LOGIN, SESSION_COOKIE } from "@/lib/auth/constants";

const intlProxy = createMiddleware(routing);

function isAdminPath(pathname: string) {
  return pathname === ADMIN_HOME || pathname.startsWith(`${ADMIN_HOME}/`);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminPath(pathname)) return intlProxy(request);

  // Optimistic check only (cookie presence). Real verification: lib/auth/session.ts.
  // Logged-in users hitting /admin/login are redirected by the login page itself,
  // after real validation, to avoid loops on stale cookies.
  if (pathname !== ADMIN_LOGIN && !request.cookies.has(SESSION_COOKIE)) {
    const url = new URL(ADMIN_LOGIN, request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals, Vercel internals and files with an extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
