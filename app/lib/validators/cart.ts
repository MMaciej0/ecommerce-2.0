import { z } from "zod";
import { DBBaseSchema, RequiredString } from "./base";
import { cartItemSchema } from "./cartItem";
import { ProductImportSchema } from "./product";

const populatedCardItemSchema = z.object({
  ...cartItemSchema.omit({ product: true }).shape,
  product: ProductImportSchema.pick({
    price: true,
    countInStock: true,
    name: true,
    _id: true,
    createdAt: true,
    updatedAt: true,
  }),
});

export const populatedCartSchema = z.object({
  user: RequiredString.nullable(),
  cartItems: z.array(populatedCardItemSchema),
  ...DBBaseSchema.shape,
});

export type PopulatedCart = z.infer<typeof populatedCartSchema>;
