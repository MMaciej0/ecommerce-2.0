import { z } from "zod";

export const globalSearchSchema = z.object({
  search: z.string().min(1, "Search query cannot be empty").trim(),
});
