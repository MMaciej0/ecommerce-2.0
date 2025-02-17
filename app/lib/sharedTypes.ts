import { DBCategory } from "./db/models/category.model";
import { DBProduct } from "./db/models/product.model";

export interface ProductWithCategory extends Omit<DBProduct, "category"> {
  category: Omit<DBCategory, "products" | "createdAt" | "updatedAt">;
}
