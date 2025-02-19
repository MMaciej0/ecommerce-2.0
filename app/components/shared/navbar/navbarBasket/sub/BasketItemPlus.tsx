import { FC } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { BasketItemContext } from "./BasketItem";
import { addToCart } from "@/app/lib/actions/cart.actions";

const BasketItemPlus: FC = () => {
  const {
    isPending,
    setIsPending,
    setIsError,
    optimisticQty,
    setOptimisticQty,
    cartItem,
  } = useGenericContext(BasketItemContext);

  const { product } = cartItem;
  const { countInStock, _id, price } = product;

  const handleQtyIncrease = async () => {
    if (optimisticQty >= countInStock) return;

    const newQty = optimisticQty + 1;
    setOptimisticQty(newQty);

    setIsPending(true);

    const res = await addToCart(_id, newQty, price, true);

    if (!res.success) {
      setOptimisticQty(cartItem.quantity);
      setIsError(res.message);
      setTimeout(() => setIsError(""), 4000);
    }

    setIsPending(false);
  };

  return (
    <Button
      variant="accent"
      size="sm"
      onClick={handleQtyIncrease}
      disabled={optimisticQty >= countInStock || isPending}
    >
      <Plus />
    </Button>
  );
};

export default BasketItemPlus;
