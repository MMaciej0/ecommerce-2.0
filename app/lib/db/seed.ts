import { loadEnvConfig } from "@next/env";
import { cwd } from "process";
import { connectToDB } from ".";
import Product from "./models/product.model";
import { productsToSeed } from "./data";
import Category from "./models/category.model";
import { Types } from "mongoose";

loadEnvConfig(cwd());

const seed = async () => {
  try {
    await connectToDB();
    await Product.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
      { name: "Mystery Gifts" },
      { name: "Edible Gifts" },
      { name: "Jewelry" },
      { name: "Outdoor & Adventure" },
      { name: "Tech Gifts" },
      { name: "Beauty & Wellness" },
      { name: "Toys & Games" },
      { name: "Home Decor" },
      { name: "Collectibles" },
      { name: "Custom Gifts" },
    ]);

    console.log(`Seeded ${categories.length} categories.`);

    const categoryMap = new Map<string, Types.ObjectId>();
    categories.forEach((category) =>
      categoryMap.set(category.name, category._id)
    );

    const updatedProducts = productsToSeed.map((product) => {
      product.category = categoryMap.get(
        product.category
      )! as unknown as string;
      return product;
    });

    const products = await Product.insertMany(updatedProducts);

    console.log(`Seeded ${products.length} products.`);

    for (const product of products) {
      await Category.updateOne(
        { _id: product.category },
        { $push: { products: product._id } }
      );
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

seed();
