"use server";

import { connectToDB } from "../db";
import Product from "../db/models/product.model";

export const getProducts = async () => {
  await connectToDB();
  const products = await Product.find({});
  return products;
};
