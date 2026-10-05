import "server-only";

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
