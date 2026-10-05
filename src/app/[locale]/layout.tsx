import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { fontSans } from "@/lib/fonts";
import { ogLocales } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import "@/styles/site.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: siteUrl,
    title: { default: t("title"), template: `%s | ${t("siteName")}` },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: ogLocales[locale],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = await initLocale(params);

  return (
    <html lang={locale} className={`${fontSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        {/* Locale only (Link needs it). messages={null}: no translations in the
            client bundle; pass a picked subset if a client component needs some. */}
        <NextIntlClientProvider messages={null}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
