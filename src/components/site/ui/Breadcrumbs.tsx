import { getLocale, getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/shared/JsonLd";
import { Link } from "@/i18n/navigation";
import { absoluteUrl, type Href } from "@/lib/seo";

export type Crumb = { name: string; href: Href };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD.
 * The last crumb is the current page (not a link).
 */
export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const locale = await getLocale();
  const t = await getTranslations("Navigation");

  return (
    <>
      <nav aria-label={t("breadcrumb")} className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  {item.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absoluteUrl(locale, item.href),
          })),
        }}
      />
    </>
  );
}
