import { z } from "zod";
export const eventSchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(2000).default(""),
  category: z.string().trim().max(60).default("Competition"),
  minTeamSize: z.number().int().min(1).max(20).default(1),
  maxTeamSize: z.number().int().min(1).max(20).default(2),
  registrationOpen: z.boolean().default(true),
}).refine((event) => event.maxTeamSize >= event.minTeamSize, { message: "Maximum team size must be at least the minimum team size", path: ["maxTeamSize"] });
