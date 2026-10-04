import type { Metadata } from "next";
import Link from "next/link";
import { fontSans } from "@/lib/fonts";
import messages from "@/messages/it.json";
import "@/styles/site.css";

// Rendered outside any layout (unmatched URLs): no next-intl context here.
const t = messages.NotFound;

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
};

export default function GlobalNotFound() {
  return (
    <html lang="it" className={`${fontSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <main id="main-content" className="flex-1">
          <h1>{t.title}</h1>
          <p>{t.description}</p>
          <Link href="/">{t.backHome}</Link>
        </main>
      </body>
    </html>
  );
}
