"use client";

import { useState, type FC } from "react";

import { ProductImport } from "@/app/lib/validators/product";
import { Button } from "../../ui/Button";
import { Minus, Plus } from "lucide-react";
import Separator from "../../ui/Separator";

interface AddToCartPanelProps {
  product: ProductImport;
}

const AddToCartPanel: FC<AddToCartPanelProps> = ({ product }) => {
  const [total, setTotal] = useState(product.price);
  const [qty, setQty] = useState(1);

  const handleQtyIncrease = () => {
    if (qty === product.countInStock) return;
    setQty(qty + 1);
    setTotal(Number((total + product.price).toFixed(2)));
  };

  const handleQtyDecrease = () => {
    if (qty === 1) return;
    setQty(qty - 1);
    setTotal(Number((total - product.price).toFixed(2)));
  };

  return (
    <div className="space-y-3 font-semibold tracking-wide text-muted-foreground">
      <p>
        Price:
        <span className="ml-2">${product.price}</span>
      </p>
      <div className="flex items-center space-x-4">
        <p>Quantity:</p>
        <Button
          variant="accent"
          size="sm"
          onClick={handleQtyIncrease}
          disabled={qty === product.countInStock}
        >
          <Plus />
        </Button>
        <span>{qty}</span>
        <Button
          variant="accent"
          size="sm"
          onClick={handleQtyDecrease}
          disabled={qty === 1}
        >
          <Minus />
        </Button>
      </div>
      <Separator />
      <p>
        Total:
        <span className="ml-2">${total}</span>
      </p>
      <Separator />
      <div className="pt-6">
        <Button variant="accent" className="w-full rounded-full">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCartPanel;
