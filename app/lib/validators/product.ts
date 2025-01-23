import z from "zod";
import { RequiredString } from "./base";
import { toDecimalUnit, toSmallestUnit } from "../utils";

export const ProductSchema = z.object({
  name: RequiredString.max(50, "Name must be less than 50 characters."),
  slug: RequiredString,
  category: RequiredString,
  description: RequiredString,
  isPublished: z.boolean(),
  countInStock: z
    .number()
    .int()
    .nonnegative("Count in stock must be a positive number."),
  tags: z.array(z.string()).default([]),
  avgRaring: z.coerce.number().min(0).max(5),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative("Number of reviews must be a positive number."),
  reviews: z.array(z.string()).default([]),
  numSeles: z.coerce
    .number()
    .int()
    .nonnegative("Number of sales must be a positive number."),
});

/**
 * Schema for creating a product.
 *
 * @remarks
 * The price is transformed into the smallest unit of the currency, e.g. cents for USD for storage.
 */
export const ProductInputSchema = ProductSchema.extend({
  price: z
    .number()
    .nonnegative("Price must be a positive number.")
    .transform(toSmallestUnit),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;

/**
 * Schema for importing a product.
 *
 * @remarks
 * The price is transformed into the decimal unit of the currency, e.g. dollars for USD.
 */
export const ProductImportSchema = ProductSchema.extend({
  price: z.coerce
    .number()
    .nonnegative("Price must be a positive number.")
    .transform(toDecimalUnit),
});

export type ProductImport = z.infer<typeof ProductImportSchema>;
