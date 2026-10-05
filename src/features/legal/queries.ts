import "server-only";

import { z } from "zod";

/** Cache tag for the legal documents (revalidate on demand if needed). */
export const LEGAL_TAG = "legal";

export type LegalDocument = "privacy" | "cookie" | "terms";

const IUBENDA_API = "https://www.iubenda.com/api";

const responseSchema = z.object({
  success: z.boolean(),
  content: z.string().optional(),
});

function documentUrl(doc: LegalDocument): string | null {
  // Privacy and cookie policy share the same iubenda policy id.
  const policyId = process.env.IUBENDA_POLICY_ID;
  const termsId = process.env.IUBENDA_TERMS_ID;

  switch (doc) {
    case "privacy":
      return policyId
        ? `${IUBENDA_API}/privacy-policy/${policyId}/no-markup`
        : null;
    case "cookie":
      return policyId
        ? `${IUBENDA_API}/privacy-policy/${policyId}/cookie-policy/no-markup`
        : null;
    case "terms":
      return termsId
        ? `${IUBENDA_API}/terms-and-conditions/${termsId}/no-markup`
        : null;
  }
}

/**
 * HTML of a legal document from iubenda, server-rendered so it is indexable.
 * Returns null when the id is not configured or iubenda fails: the page shows
 * a placeholder instead of breaking the build.
 */
export async function getLegalDocument(
  doc: LegalDocument,
): Promise<string | null> {
  const url = documentUrl(doc);
  if (!url) return null;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86_400, tags: [LEGAL_TAG] },
    });
    if (!res.ok) return null;

    const body = responseSchema.parse(await res.json());
    if (!body.success || !body.content) return null;

    // The page renders its own <h1>: demote the document's to keep one per page.
    return body.content.replace(/<(\/?)h1\b/gi, "<$1h2");
  } catch {
    return null;
  }
}
