import "server-only";

import type { z } from "zod";

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly path: string,
    message?: string,
  ) {
    super(message ?? `API ${status} on ${path}`);
    this.name = "ApiError";
  }
}

export type ApiFetchOptions<S extends z.ZodType> = Omit<RequestInit, "body"> & {
  /** Zod schema the response body is validated against. */
  schema: S;
  /** JSON body (serialized and sent with Content-Type: application/json). */
  json?: unknown;
};

function apiUrl(path: string): URL {
  const base = process.env.API_URL;
  if (!base) throw new Error("API_URL is not set");
  return new URL(
    path.replace(/^\//, ""),
    base.endsWith("/") ? base : `${base}/`,
  );
}

/**
 * Server-only fetch against the Express API.
 * Pass caching through `next` (e.g. `{ tags, revalidate }`) for reads;
 * the response is validated with `schema` so the rest of the app gets typed,
 * trusted data.
 */
export async function apiFetch<S extends z.ZodType>(
  path: string,
  { schema, json, headers, ...init }: ApiFetchOptions<S>,
): Promise<z.infer<S>> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (json !== undefined)
    requestHeaders.set("Content-Type", "application/json");

  const res = await fetch(apiUrl(path), {
    ...init,
    headers: requestHeaders,
    body: json === undefined ? undefined : JSON.stringify(json),
  });

  if (!res.ok) throw new ApiError(res.status, path);

  const body: unknown = res.status === 204 ? null : await res.json();
  return schema.parse(body);
}
