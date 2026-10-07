import { z } from "zod";

export const zoneSchema = z.enum(["appennino", "dolomiti"]);
export const difficultySchema = z.enum(["facile", "media", "impegnativa"]);

export const escursioneSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  /** Day of the excursion (YYYY-MM-DD, Europe/Rome). */
  date: z.iso.date(),
  spotsAvailable: z.number().int().nonnegative(),
  zone: zoneSchema,
  difficulty: difficultySchema,
  image: z.object({ src: z.url(), alt: z.string() }),
  updatedAt: z.iso.datetime(),
});

export type Zone = z.infer<typeof zoneSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Escursione = z.infer<typeof escursioneSchema>;
