"use client";

import { useState, useMemo, type FC, useTransition } from "react";

import { Button } from "../../ui/Button";
import { Minus, Plus } from "lucide-react";
import { ProductImport } from "@/app/lib/validators/product";
import Separator from "../../ui/Separator";
import AnimatedHeightWrapper from "../../AnimatedHeightWrapper";
import { Select } from "../../ui/Select";

import { PopulatedCart } from "@/app/lib/validators/cart";
import { cn } from "@/app/lib/utils/utils";
import { addToCart } from "@/app/lib/actions/cart.actions";
import { ServerActionResponse } from "@/app/lib/validators/base";

interface AddToCartPanelProps {
  product: ProductImport;
  cart: PopulatedCart | null;
}

const defaultActionMessage = (productName: string, qty: number) =>
  `Added ${qty} of ${productName} to cart.`;

const AddToCartPanel: FC<AddToCartPanelProps> = ({ product, cart }) => {
  const inCart = cart?.cartItems.find(
    (item) => item.product._id === product._id,
  );

  const max = product.countInStock - (inCart?.quantity || 0);

  const [qty, setQty] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<ServerActionResponse>({
    success: true,
    message: defaultActionMessage(product.name, qty),
  });
  const [showActionMessage, setShowActionMessage] = useState(false);

  const total = useMemo(
    () => Number((qty * product.price).toFixed(2)),
    [qty, product.price],
  );

  const handleQtyIncrease = () => {
    if (qty < max) setQty(qty + 1);
  };

  const handleQtyDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleAddToCart = () => {
    if (qty > max) return;

    setActionMessage((message) => ({
      ...message,
      message: defaultActionMessage(product.name, qty),
    }));
    setShowActionMessage(true);
    setQty(1);

    startTransition(async () => {
      const res = await addToCart(product._id, qty, product.price);

      if (!res.success) {
        setActionMessage(res);
      }

      setTimeout(() => {
        setShowActionMessage(false);
      }, 4000);
    });
  };

  const quantityOptions = useMemo(
    () => Array.from({ length: max }, (_, i) => i + 1),
    [max],
  );

  return (
    <div className="space-y-3 font-semibold tracking-wide text-muted-foreground">
      <p>
        Price: <span className="ml-2">${product.price}</span>
      </p>
      <div className="flex items-center space-x-4">
        <p>Quantity:</p>
        <Button
          variant="accent"
          size="sm"
          onClick={handleQtyIncrease}
          disabled={qty >= max || isPending}
        >
          <Plus />
        </Button>
        <Select
          value={String(qty)}
          onValueChange={(value) => setQty(Number(value))}
        >
          <Select.Trigger disabled={isPending || qty > max} />
          <Select.Content>
            {quantityOptions.map((num) => (
              <Select.Item key={num} val={String(num)} />
            ))}
          </Select.Content>
        </Select>
        <Button
          variant="accent"
          size="sm"
          onClick={handleQtyDecrease}
          disabled={qty === 1 || isPending}
        >
          <Minus />
        </Button>
      </div>
      <Separator />
      <p>
        Total:{" "}
        <span className={cn("ml-2", isPending && "animate-pulse")}>
          ${total}
        </span>
      </p>
      <Separator />
      <div className="pt-6">
        <Button
          variant="accent"
          className="w-full rounded-full font-semibold"
          onClick={handleAddToCart}
          disabled={isPending || qty > max}
        >
          Add to cart
        </Button>
      </div>
      <AnimatedHeightWrapper isExpanded={showActionMessage}>
        <Separator className="mb-4" />
        <p
          className={cn(
            "rounded-md border border-border p-2 text-center text-sm",
            !actionMessage.success && "border-destructive",
          )}
        >
          {actionMessage.message}
        </p>
      </AnimatedHeightWrapper>
    </div>
  );
};

export default AddToCartPanel;
