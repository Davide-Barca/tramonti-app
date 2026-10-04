export default function SiteLayout({ children }: LayoutProps<"/[locale]">) {
  return (
    <>
      {/* TODO: <SiteHeader /> with <nav> from current design */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {/* TODO: <SiteFooter /> */}
    </>
  );
}
