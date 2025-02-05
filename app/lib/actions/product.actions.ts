"use server";

import { connectToDB } from "../db";
import Product, { DBProduct } from "../db/models/product.model";
import Category, { DBCategory } from "../db/models/category.model";
import mongoose from "mongoose";
import { toDecimalUnit } from "../utils";
import { ProductImport } from "../validators/product";

interface GetProductProps {
  search?: string;
  category?: string;
  sort?: "price_asc" | "price_desc" | "newest";
}

interface ProductWithCategory extends Omit<DBProduct, "category"> {
  category: Omit<DBCategory, "products" | "createdAt" | "updatedAt">;
}

export const getProducts = async ({
  search,
  category,
  sort,
}: GetProductProps = {}): Promise<ProductImport[]> => {
  await connectToDB();

  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }

  const queryParams: Record<string, unknown> = {};

  if (search) {
    queryParams.$text = { $search: search };
  }

  if (category) {
    queryParams.category = category;
  }

  let query = Product.find(queryParams)
    .populate("category", "name")
    .select("-__v")
    .lean();

  if (search) {
    query = query.select({ score: { $meta: "textScore" } });
  }

  if (search) {
    query = query.sort({ score: { $meta: "textScore" } });
  } else if (sort === "price_asc") {
    query = query.sort({ price: 1 });
  } else if (sort === "price_desc") {
    query = query.sort({ price: -1 });
  } else {
    query = query.sort({ createdAt: -1 });
  }

  const products = (await query
    .lean()
    .exec()) as unknown as ProductWithCategory[];

  const transformedProducts = products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    price: toDecimalUnit(p.price),
    category: { _id: p.category._id.toString(), name: p.category.name },
    reviews: p.reviews.map((r) => r.toString()),
  }));

  return transformedProducts;
};
