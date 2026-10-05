import { SiteHeader } from "@/components/site/layout/SiteHeader";

export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {/* TODO: <SiteFooter /> */}
    </>
  );
}
