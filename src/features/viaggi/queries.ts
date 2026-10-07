import "server-only";

import { romeDay } from "@/lib/dates";
import { viaggiFixtures } from "./fixtures";
import { viaggioSchema, type Viaggio } from "./types";

/** Cache tag shared by reads (site) and invalidation (admin). */
export const VIAGGI_TAG = "viaggi";

export async function getViaggi(): Promise<Viaggio[]> {
  // TODO: apiFetch("<endpoint>", { schema: viaggioSchema.array(), next: { tags: [VIAGGI_TAG] } })
  return viaggioSchema.array().parse(viaggiFixtures);
}

export async function getViaggio(slug: string): Promise<Viaggio | null> {
  const all = await getViaggi();
  return all.find((v) => v.slug === slug) ?? null;
}

/**
 * Trips starting from `from` (default: now, Rome day) on, soonest first.
 * Evaluated at render time (see getUpcomingEscursioni).
 */
export async function getUpcomingViaggi(
  limit: number,
  from: Date = new Date(),
): Promise<Viaggio[]> {
  const today = romeDay(from);
  const all = await getViaggi();
  return all
    .filter((v) => v.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
}
