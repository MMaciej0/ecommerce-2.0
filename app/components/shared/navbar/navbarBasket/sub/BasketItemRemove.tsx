"use client";

import { FC, useTransition } from "react";

import { Button } from "@/app/components/ui/Button";

import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { BasketItemContext } from "./BasketItem";
import { removeFromCart } from "@/app/lib/actions/cart.actions";
import { Loader2 } from "lucide-react";

const BasketItemRemove: FC = () => {
  const {
    cartItem: { product, _id },
    setIsRemoveDialogOpen,
    setIsError,
  } = useGenericContext(BasketItemContext);

  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const res = await removeFromCart(_id);

      if (!res.success) {
        setIsError(res.message);
        setTimeout(() => setIsError(""), 4000);
        return;
      }

      setIsRemoveDialogOpen(false);
    });
  };

  return (
    <>
      <div className="rounded-md bg-accent py-2 text-center text-accent-foreground">
        Are you sure you want to remove <strong>{product.name}</strong> from
        basket?
      </div>
      <div className="flex gap-2 py-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleRemove}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Remove"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsRemoveDialogOpen(false)}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default BasketItemRemove;
