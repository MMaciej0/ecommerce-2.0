"use server";

import { connectToDB } from "../db";
import Category from "../db/models/category.model";

export const getCategories = async () => {
  await connectToDB();

  const categories = await Category.find({}).select("-__v").lean();

  const formattedCategopries = categories.map((category) => ({
    _id: category._id.toString(),
    name: category.name,
  }));

  return formattedCategopries;
};
