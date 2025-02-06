import Link from "next/link";
import { ReactNode, Suspense } from "react";

import { Card } from "../../ui/Card";
import { Badge } from "../../ui/Badge";

import { getProducts } from "@/app/lib/actions/product.actions";
import { ProductImport } from "@/app/lib/validators/product";

import Rating from "../rating/Rating";
import { calculateDayDifference } from "@/app/lib/utils";

interface ProductCardProps {
  product: ProductImport;
  className?: string;
  children?: ReactNode;
}

export const ProductCard = ({
  product,
  className,
  children,
}: ProductCardProps) => {
  const dayDiff = calculateDayDifference(product.createdAt!, new Date());
  return (
    <Link href={`/products/${product.slug}`} key={product._id}>
      <Card className="flex h-full flex-col">
        <Card.Header className="border-b">{product.name}</Card.Header>
        <Card.Content className={className}>{children}</Card.Content>
        <Card.Footer className="flex h-full items-end justify-between pt-4">
          {dayDiff < 30 && <Badge className="bg-lime-600">NEW</Badge>}
          <Badge>${product.price}</Badge>
        </Card.Footer>
      </Card>
    </Link>
  );
};

async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product}>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center space-x-1">
              <span>Category:</span>
              <span>{product.category.name}</span>
            </li>
            <li className="flex items-center space-x-1">
              <span>Rating:</span>
              <Rating rating={product.avgRating} />
            </li>
            <li className="flex items-center space-x-1">
              <span>Availability:</span>
              <span>
                {product.countInStock > 100
                  ? "Good"
                  : product.countInStock > 30
                    ? "Average"
                    : "Last pieces"}
              </span>
            </li>
          </ul>
        </ProductCard>
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
        <div className="animate-pulse rounded-lg border p-4 shadow-md" key={i}>
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
