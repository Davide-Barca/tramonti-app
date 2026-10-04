import type { Metadata } from "next";
import { verifySession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // Layouts don't re-run on client navigation: pages verify too.
  await verifySession();

  return <h1 className="text-2xl font-semibold">Dashboard</h1>;
}
