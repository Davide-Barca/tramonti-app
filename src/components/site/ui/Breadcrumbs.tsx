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
      <nav aria-label={t("breadcrumb")}>
        <ol>
          {items.map((item, i) => (
            <li key={i}>
              {i < items.length - 1 ? (
                <Link href={item.href}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
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
