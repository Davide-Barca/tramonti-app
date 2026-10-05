import { getTranslations } from "next-intl/server";
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main id="main-content" className="flex-1">
      <Section width="narrow">
        <div className="flex flex-col gap-4">
          <Heading as="h1">{t("title")}</Heading>
          <p className="text-muted-foreground">{t("description")}</p>
          <Link
            href="/"
            className="text-primary underline underline-offset-4 hover:text-primary-hover"
          >
            {t("backHome")}
          </Link>
        </div>
      </Section>
    </main>
  );
}
