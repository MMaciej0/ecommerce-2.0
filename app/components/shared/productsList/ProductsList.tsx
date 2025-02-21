import { Suspense } from "react";

import ProductsWithGlow from "./sub/ProductsWithGlow";
import ProductsLoadingSkeleton from "./sub/ProductsLoadingSkeleton";

import {
  getProducts,
  GetProductsProps,
} from "@/app/lib/actions/product.actions";

interface ProductListProps {
  searchParams?: GetProductsProps;
}

export default function ProductsList({ searchParams }: ProductListProps) {
  return (
    <Suspense fallback={<ProductsLoadingSkeleton />}>
      <List searchParams={searchParams} />
    </Suspense>
  );
}

async function List({ searchParams }: ProductListProps) {
  const products = await getProducts(searchParams);

  return <ProductsWithGlow products={products} />;
}
