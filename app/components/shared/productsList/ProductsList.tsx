import { Suspense } from "react";

import { Card } from "../../ui/Card";
import { Badge } from "../../ui/Badge";

import { getProducts } from "@/app/lib/actions/product.actions";
import Link from "next/link";
import { getCategories } from "@/app/lib/actions/category.actions";

async function ProductList() {
  const products = await getProducts();
  const categories = await getCategories();
  console.log(categories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link href={`/products/${product.slug}`} key={product._id.toString()}>
          <Card>
            <Card.Header className="border-b">{product.name}</Card.Header>
            <Card.Content className="line-clamp-2 w-full pb-0">
              {product.description}
            </Card.Content>
            <Card.Footer className="text-end pt-4">
              <Badge>${product.price}</Badge>
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function ProductListWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductList />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="border rounded-lg p-4 shadow-md animate-pulse" key={i}>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
