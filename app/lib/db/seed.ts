import { loadEnvConfig } from "@next/env";
import { cwd } from "process";
import { connectToDB } from ".";
import Product from "./models/product.model";
import { productsToSeed } from "./data";
import Category from "./models/category.model";
import { Types } from "mongoose";
import Cart from "./models/cart.model";
import CartItem from "./models/cartItem.model";

loadEnvConfig(cwd());

const seed = async () => {
  try {
    await connectToDB();
    await Product.deleteMany();
    await Category.deleteMany();
    await Cart.deleteMany();
    await CartItem.deleteMany();

    const categoriesSet = new Set<string>(
      productsToSeed.map((p) => p.category),
    );
    const categoriesWithName = Array.from(categoriesSet).map((name) => ({
      name,
    }));

    const categories = await Category.insertMany(categoriesWithName);

    console.log(`Seeded ${categories.length} categories.`);

    const categoryMap = new Map<string, Types.ObjectId>();
    categories.forEach((category) =>
      categoryMap.set(category.name, category._id),
    );

    const updatedProducts = productsToSeed.map((product) => {
      const categoryId = categoryMap.get(product.category);
      if (!categoryId) {
        throw new Error(`Category "${product.category}" not found`);
      }
      product.category = categoryId as unknown as string;
      return product;
    });

    const products = await Product.insertMany(updatedProducts);

    console.log(`Seeded ${products.length} products.`);

    for (const product of products) {
      await Category.updateOne(
        { _id: product.category },
        { $push: { products: product._id } },
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
