"use server";

import mongoose from "mongoose";

import { connectToDB } from "../db";
import Product from "../db/models/product.model";
import Category from "../db/models/category.model";
import { PaginatedProducts, ProductImport } from "../validators/product";
import { serializeMongoData } from "../utils/utils";

export interface GetProductsProps {
  search?: string;
  categoryId?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

const createProductsQuery = (params: GetProductsProps) => {
  const { categoryId, page = 1, limit = 9, search, sort } = params;

  const queryParams: Record<string, unknown> = {};

  if (search) {
    queryParams.$text = { $search: params.search };
  }

  if (categoryId) {
    queryParams.category = params.categoryId;
  }

  const skip = (page - 1) * limit;

  const query = Product.find(queryParams)
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .lean()
    .select("-__v");

  if (search) {
    query.sort({ score: { $meta: "textScore" } });
  } else {
    switch (sort) {
      case "Lowest Price":
        query.sort({ price: 1 });
        break;
      case "Highest Price":
        query.sort({ price: -1 });
        break;
      case "Newest":
        query.sort({ createdAt: -1 });
        break;
      case "Oldest":
        query.sort({ createdAt: 1 });
        break;
    }
  }

  return query;
};

export const getProducts = async (
  params: GetProductsProps = {},
): Promise<ProductImport[]> => {
  await connectToDB();

  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }

  const query = createProductsQuery(params);
  const products = await query.exec();

  return serializeMongoData(products) as unknown as ProductImport[];
};

export const getPaginatedProducts = async (
  params: GetProductsProps = {},
): Promise<PaginatedProducts> => {
  await connectToDB();

  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }

  const limit = params.limit || 9;
  const increasedLimit = limit + 1;

  const query = createProductsQuery({ ...params, limit: increasedLimit });

  const [products, total] = await Promise.all([
    query.exec(),
    Product.countDocuments(query.getFilter()),
  ]);

  const metadata = {
    hasMore: increasedLimit === products.length,
    total,
    currentPage: params.page || 1,
    totalPages: Math.ceil(total / limit),
  };

  const productsToLimit = products.slice(0, limit);

  return {
    products: serializeMongoData(productsToLimit) as unknown as ProductImport[],
    metadata,
  };
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
