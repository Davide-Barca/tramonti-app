import "server-only";

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
