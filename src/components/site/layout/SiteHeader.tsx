import { getTranslations } from "next-intl/server";
import { Container } from "@/components/site/ui/Container";
import { Link } from "@/i18n/navigation";
import { mainNavItems } from "./nav-items";
import { NavLink } from "./NavLink";

/** Site header: brand link to home + main navigation. Minimal styling with semantic tokens. */
export async function SiteHeader() {
  const [t, meta] = await Promise.all([
    getTranslations("Navigation"),
    getTranslations("Metadata"),
  ]);

  return (
    <header className="border-b border-border">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
        >
          {meta("siteName")}
        </Link>
        <nav aria-label={t("mainNav")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{t(item.label)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
