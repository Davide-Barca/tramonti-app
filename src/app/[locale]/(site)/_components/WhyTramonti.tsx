import { ArrowRight, BadgeCheck, Compass, Mountain, Users } from "lucide";
import { getTranslations } from "next-intl/server";
import { Icon, type IconNode } from "@/components/shared/Icon";
import { Heading } from "@/components/site/ui/Heading";
import { Section } from "@/components/site/ui/Section";
import type { StaticPathname } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";

type Reason = {
  key: "guides" | "zones" | "groups" | "custom";
  icon: IconNode;
  /** Optional "learn more" link; `label` is a typed message key. */
  link?: { href: StaticPathname; label: "items.custom.link" };
};

const reasons: Reason[] = [
  { key: "guides", icon: BadgeCheck },
  { key: "zones", icon: Mountain },
  { key: "groups", icon: Users },
  {
    key: "custom",
    icon: Compass,
    link: { href: "/escursioni-su-misura", label: "items.custom.link" },
  },
];

/** Home: Tramonti's strengths as an icon grid. */
export async function WhyTramonti() {
  const t = await getTranslations("HomePage.why");

  return (
    <Section aria-labelledby="why-title" tone="muted">
      <div className="mb-10 flex max-w-narrow flex-col gap-4">
        <Heading as="h2" id="why-title">
          {t("title")}
        </Heading>
        <p className="text-muted-foreground">{t("lead")}</p>
      </div>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ key, icon, link }) => (
          <li key={key} className="flex flex-col gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
              <Icon icon={icon} className="size-6" />
            </span>
            <Heading as="h3" size="h4">
              {t(`items.${key}.title`)}
            </Heading>
            <p className="text-muted-foreground">{t(`items.${key}.text`)}</p>
            {link && (
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline"
              >
                {t(link.label)}
                <Icon icon={ArrowRight} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
