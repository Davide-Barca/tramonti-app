import type { Metadata } from "next";
import Link from "next/link";
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";
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
          <Section width="narrow">
            <div className="flex flex-col gap-4">
              <Heading as="h1">{t.title}</Heading>
              <p className="text-muted-foreground">{t.description}</p>
              <Link
                href="/"
                className="text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                {t.backHome}
              </Link>
            </div>
          </Section>
        </main>
      </body>
    </html>
  );
}
