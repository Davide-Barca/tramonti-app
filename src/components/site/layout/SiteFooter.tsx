import { getTranslations } from "next-intl/server";
import { Container } from "@/components/site/ui/Container";
import { Link } from "@/i18n/navigation";
import { company } from "@/lib/site";
import { footerNavItems, legalNavItems, type NavItem } from "./nav-items";

const linkClass =
  "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline";

const socialLinks = [
  { name: "Instagram", href: company.social.instagram },
  { name: "Facebook", href: company.social.facebook },
];

/** Column label: a <p> (not a heading) so the page outline stays clean. */
function ColumnLabel({ id, children }: { id?: string; children: string }) {
  return (
    <p id={id} className="font-display font-semibold text-foreground">
      {children}
    </p>
  );
}

async function FooterNav({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: readonly NavItem[];
}) {
  const t = await getTranslations("Navigation");

  return (
    <nav aria-labelledby={id} className="flex flex-col gap-3">
      <ColumnLabel id={id}>{label}</ColumnLabel>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Site footer: brand + contacts + social, page links, legal links, company data. */
export async function SiteFooter() {
  const [t, meta] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Metadata"),
  ]);
  // Evaluated at build/render time: updates with the first deploy of the year.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display text-lg font-semibold tracking-tight"
            >
              {meta("siteName")}
            </Link>
            <p className="max-w-narrow text-muted-foreground">{t("tagline")}</p>
            <address className="flex flex-col gap-1 text-muted-foreground not-italic">
              <span>{company.address}</span>
              <a href={`mailto:${company.email}`} className={linkClass}>
                {company.email}
              </a>
              <a
                href={`tel:${company.phone.replace(/\s/g, "")}`}
                className={linkClass}
              >
                {company.phone}
              </a>
            </address>
            <div className="flex flex-col gap-2">
              <ColumnLabel>{t("follow")}</ColumnLabel>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {social.name}
                      <span className="sr-only"> {t("newTab")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <FooterNav
            id="footer-explore"
            label={t("explore")}
            items={footerNavItems}
          />
          <FooterNav
            id="footer-legal"
            label={t("legal")}
            items={legalNavItems}
          />
        </div>
        <div className="flex flex-col gap-1 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-4">
          <p>{t("copyright", { year, company: company.name })}</p>
          <p>{t("vat", { vat: company.vatNumber })}</p>
          {company.license && (
            <p>{t("license", { license: company.license })}</p>
          )}
          {company.insurance && (
            <p>{t("insurance", { insurance: company.insurance })}</p>
          )}
        </div>
      </Container>
    </footer>
  );
}
