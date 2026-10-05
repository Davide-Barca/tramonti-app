import { z } from "zod";

export const escursioneSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  updatedAt: z.iso.datetime(),
});

export type Escursione = z.infer<typeof escursioneSchema>;
