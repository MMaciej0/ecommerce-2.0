"use server";

import { connectToDB } from "../db";
import Product from "../db/models/product.model";
import Category from "../db/models/category.model";
import mongoose from "mongoose";

export const getProducts = async () => {
  await connectToDB();

  if (!mongoose.models.Category) {
    mongoose.model("Category", Category.schema);
  }

  const products = await Product.find({}).populate("category", "name");

  return products;
};
