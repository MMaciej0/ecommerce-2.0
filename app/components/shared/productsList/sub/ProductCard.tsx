import { type ReactNode } from "react";

import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import Rating from "../../rating/Rating";

import { ProductImport } from "@/app/lib/validators/product";

interface ProductCardProps {
  product: ProductImport;
  className?: string;
  children?: ReactNode;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Card className="flex h-full flex-col justify-between">
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
      <Card.Footer className="pt-2">
        <Badge
          variant="outline"
          className="block py-2 text-center text-base font-semibold"
        >
          ${product.price}
        </Badge>
      </Card.Footer>
    </Card>
  );
};
