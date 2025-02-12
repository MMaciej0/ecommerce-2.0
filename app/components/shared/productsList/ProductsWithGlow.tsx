"use client";

import { ProductImport } from "@/app/lib/validators/product";
import { type FC } from "react";
import { GlowArea, Glow } from "../../Glow";
import Link from "next/link";
import { ProductCard } from "./ProductsList";

interface ProductsWithGlowProps {
  products: ProductImport[];
}

const ProductsWithGlow: FC<ProductsWithGlowProps> = ({ products }) => {
  return (
    <GlowArea className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          className="rounded-lg"
          key={product._id}
        >
          <Glow className="rounded-md">
            <ProductCard product={product} />
          </Glow>
        </Link>
      ))}
    </GlowArea>
  );
};

export default ProductsWithGlow;
