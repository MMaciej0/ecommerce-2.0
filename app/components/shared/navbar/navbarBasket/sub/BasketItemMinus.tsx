import { FC } from "react";

import { Minus } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { BasketItemContext } from "./BasketItem";
import { addToCart } from "@/app/lib/actions/cart.actions";

const BasketItemMinus: FC = () => {
  const {
    isPending,
    setIsPending,
    setIsError,
    optimisticQty,
    setOptimisticQty,
    cartItem,
    setIsRemoveDialogOpen,
  } = useGenericContext(BasketItemContext);

  const { product } = cartItem;
  const { _id, price } = product;

  const handleQtyDecrease = async () => {
    if (optimisticQty === 1) {
      setIsRemoveDialogOpen(true);
    } else {
      const newQty = optimisticQty - 1;
      setOptimisticQty(newQty);

      setIsPending(true);

      const res = await addToCart(_id, newQty, price, true);

      if (!res.success) {
        setOptimisticQty(cartItem.quantity);
        setIsError(res.message);
        setTimeout(() => setIsError(""), 4000);
      }

      setIsPending(false);
    }
  };

  return (
    <Button
      variant="accent"
      size="sm"
      onClick={handleQtyDecrease}
      disabled={isPending}
    >
      <Minus />
    </Button>
  );
};

export default BasketItemMinus;
