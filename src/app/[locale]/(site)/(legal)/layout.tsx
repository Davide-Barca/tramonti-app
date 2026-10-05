import { initLocale } from "@/i18n/locale";

/** Shared shell of the legal pages (no URL segment). */
export default async function LegalLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  await initLocale(params);

  return <article>{children}</article>;
}
