import z from "zod";
import { DBBaseSchema, RequiredString } from "./base";
import { toSmallestUnit } from "../utils/utils";

export const ProductSchema = z.object({
  name: RequiredString.max(50, "Name must be less than 50 characters."),
  slug: RequiredString,
  description: RequiredString,
  isPublished: z.boolean(),
  countInStock: z
    .number()
    .int()
    .nonnegative("Count in stock must be a positive number."),
  tags: z.array(z.string()).default([]),
  avgRating: z.coerce.number().min(0).max(5),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative("Number of reviews must be a positive number."),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative("Number of sales must be a positive number."),
});

export const ProductInputSchema = ProductSchema.extend({
  price: z
    .number()
    .nonnegative("Price must be a positive number.")
    .transform(toSmallestUnit),
  category: RequiredString,
});

export type ProductInput = z.infer<typeof ProductInputSchema>;

export const ProductImportSchema = ProductSchema.extend({
  category: z.object({
    _id: RequiredString,
    name: RequiredString,
  }),
  price: z.number().nonnegative("Price must be a positive number."),
  ...DBBaseSchema.shape,
});

export type ProductImport = z.infer<typeof ProductImportSchema>;
