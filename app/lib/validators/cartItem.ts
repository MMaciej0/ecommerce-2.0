import { z } from "zod";
import { ProductImportSchema } from "./product";
import { DBBaseSchema, RequiredString } from "./base";

export const cartItemSchema = z.object({
  cartId: RequiredString,
  product: ProductImportSchema,
  quantity: z.number().int().nonnegative("Quantity must be a positive number."),
  price: z.number().nonnegative("Quantity must be a positive number."),
  ...DBBaseSchema.shape,
});

export type CartItemImport = z.infer<typeof cartItemSchema>;
