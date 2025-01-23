import { loadEnvConfig } from "@next/env";
import { cwd } from "process";
import { connectToDB } from ".";
import Product from "./models/product.model";
import { productsToSeed } from "./data";

loadEnvConfig(cwd());

const seed = async () => {
  try {
    await connectToDB();
    await Product.deleteMany();

    const products = await Product.insertMany(productsToSeed);

    console.log(`Seeded ${products.length} products.`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

seed();
