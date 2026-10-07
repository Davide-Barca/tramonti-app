import { z } from "zod";
import { difficultySchema } from "@/features/escursioni/types";

export const viaggioSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string().min(1),
    excerpt: z.string(),
    /** First and last day of the trip (YYYY-MM-DD, Europe/Rome). */
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    spotsAvailable: z.number().int().nonnegative(),
    /** Free-text destination (e.g. "Costiera Amalfitana"). */
    destination: z.string().min(1),
    difficulty: difficultySchema,
    image: z.object({ src: z.url(), alt: z.string() }),
    updatedAt: z.iso.datetime(),
  })
  .refine((v) => v.endDate >= v.startDate, {
    message: "endDate must not be before startDate",
    path: ["endDate"],
  });

export type Viaggio = z.infer<typeof viaggioSchema>;
