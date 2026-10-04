import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_LOGIN, SESSION_COOKIE } from "./constants";

export type Session = {
  token: string;
};

/**
 * Data Access Layer: the real authorization check.
 * The proxy only does an optimistic cookie-presence redirect; every admin
 * layout, Server Action and Route Handler must call verifySession().
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // TODO: validate the token against the Express backend (signature/expiry).
  // Until then this stub only checks presence and MUST NOT go to production.
  return { token };
});

export async function verifySession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect(ADMIN_LOGIN);
  return session;
}
