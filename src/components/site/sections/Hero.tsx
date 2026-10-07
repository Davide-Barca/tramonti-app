import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Badge } from "@/components/site/ui/Badge";
import { Container } from "@/components/site/ui/Container";
import { Heading } from "@/components/site/ui/Heading";

type HeroImage = {
  /** Static import (preferred: size + blur placeholder) or remote URL. */
  src: StaticImageData | string;
  alt: string;
};

type HeroProps = {
  /** The page h1 (may contain <HeroEmphasis>). */
  title: ReactNode;
  badge?: string;
  lead?: string;
  /** CTAs, usually two ButtonLink. */
  actions?: ReactNode;
  /** Background photo (LCP). Without it a token gradient is used. */
  image?: HeroImage;
};

/** Emphasized words inside the hero title: bold italic with a soft glow. */
export function HeroEmphasis({ children }: { children: ReactNode }) {
  return <em className="font-semibold text-shadow-glow">{children}</em>;
}

/**
 * Full-viewport home hero: background (photo or placeholder gradient),
 * centered badge, h1, lead and actions. Renders the page h1.
 */
export function Hero({ title, badge, lead, actions, image }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden">
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="100vw"
            placeholder={typeof image.src === "string" ? "empty" : "blur"}
            className="-z-20 object-cover"
          />
          {/* Light scrim: keeps dark text readable on any photo (AA contrast). */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-b from-background/90 via-background/70 to-background/20"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-background via-muted to-accent"
        />
      )}
      <Container className="flex flex-col items-center gap-6 py-section text-center">
        {badge && <Badge>{badge}</Badge>}
        <Heading as="h1" size="display" className="max-w-4xl font-light">
          {title}
        </Heading>
        {lead && (
          <p className="max-w-narrow text-base text-foreground">{lead}</p>
        )}
        {actions && (
          <div className="mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            {actions}
          </div>
        )}
      </Container>
    </section>
  );
}
