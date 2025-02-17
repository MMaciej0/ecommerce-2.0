"use server";

import mongoose from "mongoose";

import { connectToDB } from "../db";
import Product from "../db/models/product.model";
import Category from "../db/models/category.model";
import { ProductImport } from "../validators/product";
import { serializeMongoData } from "../utils/utils";

export interface GetProductsProps {
  search?: string;
  categoryId?: string;
  sort?: string;
}

export const getProducts = async ({
  search,
  categoryId,
  sort,
}: GetProductsProps = {}): Promise<ProductImport[]> => {
  await connectToDB();

  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }

  const queryParams: Record<string, unknown> = {};

  if (search) {
    queryParams.$text = { $search: search };
  }

  if (categoryId) {
    queryParams.category = categoryId;
  }

  let query = Product.find(queryParams)
    .populate("category", "name")
    .lean()
    .select("-__v");

  if (search) {
    query = query.select({ score: { $meta: "textScore" } });
  }

  if (search) {
    query = query.sort({ score: { $meta: "textScore" } });
  } else if (sort === "Lowest Price") {
    query = query.sort({ price: 1 });
  } else if (sort === "Highest Price") {
    query = query.sort({ price: -1 });
  } else if (sort === "Top rated") {
    query = query.sort({ avgRating: -1 });
  } else if (sort === "Newest") {
    query = query.sort({ createdAt: -1 });
  }

  const products = await query.exec();

  return serializeMongoData(products) as unknown as ProductImport[];
};

export const getProduct = async (
  slug: string,
): Promise<ProductImport | null> => {
  await connectToDB();

  const product = await Product.findOne({ slug })
    .populate("category", "name")
    .select("-__v")
    .lean();

  if (!product) {
    return null;
  }

  return serializeMongoData(product) as unknown as ProductImport;
};

export const getManyProducts = async (
  ids: string[],
): Promise<ProductImport[]> => {
  await connectToDB();

  const products = await Product.find({ _id: { $in: ids } })
    .populate("category", "name")
    .select("-__v")
    .lean();

  return serializeMongoData(products) as unknown as ProductImport[];
};
