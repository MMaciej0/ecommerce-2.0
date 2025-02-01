"use server";

import { connectToDB } from "../db";
import Category from "../db/models/category.model";

export const getCategories = async () => {
  await connectToDB();

  const categories = await Category.find({});

  return categories;
};
