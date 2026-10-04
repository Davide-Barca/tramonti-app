import { verifySession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  await verifySession();

  // TODO: Redux <StoreProvider> + shadcn sidebar shell.
  return <main className="p-6">{children}</main>;
}
