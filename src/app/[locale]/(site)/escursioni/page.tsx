import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/site/ui/Breadcrumbs";
import { getEscursioni } from "@/features/escursioni/queries";
import { initLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { staticPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/escursioni">): Promise<Metadata> {
  const locale = await initLocale(params);
  return staticPageMetadata(locale, "ExcursionsPage", "/escursioni");
}

export default async function ExcursionsPage({
  params,
}: PageProps<"/[locale]/escursioni">) {
  await initLocale(params);
  const [t, nav, escursioni] = await Promise.all([
    getTranslations("ExcursionsPage"),
    getTranslations("Navigation"),
    getEscursioni(),
  ]);

  return (
    <section>
      <Breadcrumbs
        items={[
          { name: nav("home"), href: "/" },
          { name: nav("excursions"), href: "/escursioni" },
        ]}
      />
      <h1>{t("title")}</h1>
      {escursioni.length === 0 ? (
        <p>{t("empty")}</p>
      ) : (
        <ul>
          {escursioni.map((e) => (
            <li key={e.slug}>
              <article>
                <h2>
                  <Link
                    href={{
                      pathname: "/escursioni/[slug]",
                      params: { slug: e.slug },
                    }}
                  >
                    {e.title}
                  </Link>
                </h2>
                <p>{e.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
