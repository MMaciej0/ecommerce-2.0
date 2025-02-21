import { z } from "zod";
import { SORT_METHODS } from "../constants";

const paramsNumberSchema = z.coerce.number().int().min(1);

export const globalSearchSchema = z.object({
  search: z.string().min(1, "Search query cannot be empty").trim(),
  page: paramsNumberSchema,
  limit: paramsNumberSchema,
});

export const productSearchParamsSchema = z.object({
  category: z.string().trim().optional(),
  sort: z.enum(SORT_METHODS).optional(),
  page: paramsNumberSchema.optional(),
});

export const combinedSearchParamsSchema = productSearchParamsSchema.extend({
  search: z.string().optional(),
});

export type ProductSearchParams = z.infer<typeof productSearchParamsSchema>;
export type CombinedSearchParams = z.infer<typeof combinedSearchParamsSchema>;
