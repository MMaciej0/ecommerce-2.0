"use server";

import { connectToDB } from "../db";
import Product from "../db/models/product.model";
import Category from "../db/models/category.model";
import mongoose from "mongoose";

interface GetProductProps {
  search?: string;
  category?: string;
  sort?: "price_asc" | "price_desc" | "newest";
}

export const getProducts = async ({
  search,
  category,
  sort,
}: GetProductProps = {}) => {
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
    .select("-__v");

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

  const products = await query.exec();

  return products;
};
