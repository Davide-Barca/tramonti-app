import "server-only";

import { romeDay } from "@/lib/dates";
import { escursioniFixtures } from "./fixtures";
import { escursioneSchema, type Escursione } from "./types";

/** Cache tag shared by reads (site) and invalidation (admin). */
export const ESCURSIONI_TAG = "escursioni";

export async function getEscursioni(): Promise<Escursione[]> {
  // TODO: apiFetch("<endpoint>", { schema: escursioneSchema.array(), next: { tags: [ESCURSIONI_TAG] } })
  return escursioneSchema.array().parse(escursioniFixtures);
}

export async function getEscursione(slug: string): Promise<Escursione | null> {
  const all = await getEscursioni();
  return all.find((e) => e.slug === slug) ?? null;
}

/**
 * Next excursions from `from` (default: now) on, soonest first.
 * Evaluated at render time: on static pages the list refreshes with the
 * page's revalidation, not at midnight.
 */
export async function getUpcomingEscursioni(
  limit: number,
  from: Date = new Date(),
): Promise<Escursione[]> {
  const today = romeDay(from);
  const all = await getEscursioni();
  return all
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}
