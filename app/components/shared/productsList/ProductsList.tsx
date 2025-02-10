import Link from "next/link";
import { ReactNode, Suspense } from "react";

import { Card } from "../../ui/Card";
import { Badge } from "../../ui/Badge";

import {
  getProducts,
  GetProductsProps,
} from "@/app/lib/actions/product.actions";
import { ProductImport } from "@/app/lib/validators/product";

import Rating from "../rating/Rating";
import { calculateDayDifference } from "@/app/lib/utils";

interface ProductListProps {
  searchParams?: GetProductsProps;
}

interface ProductCardProps {
  product: ProductImport;
  className?: string;
  children?: ReactNode;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const dayDiff = calculateDayDifference(product.createdAt!, new Date());
  return (
    <Card className="flex h-full flex-col">
      <Card.Header className="border-b">{product.name}</Card.Header>
      <Card.Content className={className}>
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
      </Card.Content>
      <Card.Footer className="flex h-full items-end justify-between pt-4">
        {dayDiff < 30 && <Badge className="bg-lime-600">NEW</Badge>}
        <Badge>${product.price}</Badge>
      </Card.Footer>
    </Card>
  );
};

async function ProductList({ searchParams }: ProductListProps) {
  const products = await getProducts(searchParams);

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
      {products.map((product) => (
        <Link href={`/products/${product.slug}`} key={product._id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}

export default function ProductListWrapper({ searchParams }: ProductListProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductList searchParams={searchParams} />
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
