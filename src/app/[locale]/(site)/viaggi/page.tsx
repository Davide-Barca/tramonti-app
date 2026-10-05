import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/site/ui/Breadcrumbs";
import { getViaggi } from "@/features/viaggi/queries";
import { initLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/viaggi">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "TripsPage", "/viaggi");
}

export default async function TripsPage({
  params,
}: PageProps<"/[locale]/viaggi">) {
  await initLocale(params);
  const [t, nav, viaggi] = await Promise.all([
    getTranslations("TripsPage"),
    getTranslations("Navigation"),
    getViaggi(),
  ]);

  return (
    <section>
      <Breadcrumbs
        items={[
          { name: nav("home"), href: "/" },
          { name: nav("trips"), href: "/viaggi" },
        ]}
      />
      <h1>{t("title")}</h1>
      {viaggi.length === 0 ? (
        <p>{t("empty")}</p>
      ) : (
        <ul>
          {viaggi.map((v) => (
            <li key={v.slug}>
              <article>
                <h2>
                  <Link
                    href={{
                      pathname: "/viaggi/[slug]",
                      params: { slug: v.slug },
                    }}
                  >
                    {v.title}
                  </Link>
                </h2>
                <p>{v.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
