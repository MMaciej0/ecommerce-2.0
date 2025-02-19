import { z } from "zod";
import { ProductImportSchema } from "./product";
import { DBBaseSchema, RequiredString } from "./base";

export const PopulatedProductSchema = ProductImportSchema.pick({
  price: true,
  countInStock: true,
  name: true,
  _id: true,
  createdAt: true,
  updatedAt: true,
});

export type PopulatedProduct = z.infer<typeof PopulatedProductSchema>;

export const cartItemSchema = z.object({
  cartId: RequiredString,
  product: PopulatedProductSchema,
  quantity: z.number().int().nonnegative("Quantity must be a positive number."),
  price: z.number().nonnegative("Quantity must be a positive number."),
  ...DBBaseSchema.shape,
});

export type CartItemImport = z.infer<typeof cartItemSchema>;
