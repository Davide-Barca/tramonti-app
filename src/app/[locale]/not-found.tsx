import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="main-content" className="flex-1">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/">{t("backHome")}</Link>
    </main>
  );
}
