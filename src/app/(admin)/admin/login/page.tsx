import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ADMIN_HOME } from "@/lib/auth/constants";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Accedi" };

export default async function LoginPage() {
  if (await getSession()) redirect(ADMIN_HOME);

  // TODO: shadcn login form + Server Action against the Express backend.
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <h1 className="text-2xl font-semibold">Accedi</h1>
    </main>
  );
}
