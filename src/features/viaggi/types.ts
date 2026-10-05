import { z } from "zod";

export const viaggioSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string(),
  updatedAt: z.iso.datetime(),
});

export type Viaggio = z.infer<typeof viaggioSchema>;
