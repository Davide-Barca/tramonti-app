import type { Metadata } from "next";
import { fontSans } from "@/lib/fonts";
import "@/styles/admin.css";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${fontSans.variable} antialiased`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
