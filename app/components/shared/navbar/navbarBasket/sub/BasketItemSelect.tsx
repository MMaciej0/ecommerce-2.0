"use client";

import { FC, useMemo } from "react";

import { Select } from "@/app/components/ui/Select";

import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { BasketItemContext } from "./BasketItem";
import { addToCart } from "@/app/lib/actions/cart.actions";

const BasketItemSelect: FC = () => {
  const {
    optimisticQty,
    setOptimisticQty,
    isPending,
    setIsPending,
    setIsError,
    cartItem,
  } = useGenericContext(BasketItemContext);
  const {
    product: { countInStock, _id, price },
  } = cartItem;

  const onSelect = async (qty: number) => {
    if (qty > countInStock) return;
    setOptimisticQty(qty);

    setIsPending(true);

    const res = await addToCart(_id, qty, price, true);

    if (!res.success) {
      setOptimisticQty(cartItem.quantity);
      setIsError(res.message);
      setTimeout(() => setIsError(""), 4000);
    }

    setIsPending(false);
  };

  const quantityOptions = useMemo(() => {
    return Array.from({ length: countInStock }, (_, i) => i + 1);
  }, [countInStock]);

  return (
    <Select
      value={String(optimisticQty)}
      onValueChange={(value) => onSelect(Number(value))}
    >
      <Select.Trigger disabled={isPending} />
      <Select.Content>
        {quantityOptions.map((num) => (
          <Select.Item key={num} val={String(num)} />
        ))}
      </Select.Content>
    </Select>
  );
};

export default BasketItemSelect;
