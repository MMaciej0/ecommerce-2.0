"use client";

import { createContext, useState, type FC } from "react";

import { Trash } from "lucide-react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import BasketItemPlus from "./BasketItemPlus";
import BasketItemSelect from "./BasketItemSelect";
import BasketItemMinus from "./BasketItemMinus";
import BasketItemRemove from "./BasketItemRemove";
import Separator from "@/app/components/ui/Separator";
import AnimatedHeightWrapper from "@/app/components/AnimatedHeightWrapper";

import { CartItemImport } from "@/app/lib/validators/cartItem";

interface BasketItemProps {
  item: CartItemImport;
}

interface BasketItemContextProps {
  optimisticQty: number;
  setOptimisticQty: (qty: number) => void;
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
  isError: string;
  setIsError: (isError: string) => void;
  cartItem: CartItemImport;
  isRemoveDialogOpen: boolean;
  setIsRemoveDialogOpen: (isRemoveDialogOpen: boolean) => void;
}

export const BasketItemContext = createContext<
  BasketItemContextProps | undefined
>(undefined);

const BasketItem: FC<BasketItemProps> = ({ item }) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState<string>("");
  const [optimisticQty, setOptimisticQty] = useState<number>(item.quantity);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  return (
    <BasketItemContext.Provider
      value={{
        optimisticQty,
        setOptimisticQty,
        isPending,
        setIsPending,
        isError,
        setIsError,
        cartItem: item,
        isRemoveDialogOpen,
        setIsRemoveDialogOpen,
      }}
    >
      <Card>
        <div className="flex items-center px-2">
          <Card.Header className="flex-1">{item.product.name}</Card.Header>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-60 hover:opacity-100"
            onClick={() => setIsRemoveDialogOpen(true)}
          >
            <Trash className="size-5" />
          </Button>
        </div>
        <Separator />
        <div className="space-y-3 px-4 py-2 font-medium tracking-wide">
          <p>Price: ${item.price}</p>
          <div className="flex items-center space-x-2">
            <span>Quantity:</span>
            <BasketItemPlus />
            <BasketItemSelect />
            <BasketItemMinus />
          </div>
          <Separator />
          <p>Subtotal: ${(item.price * optimisticQty).toFixed(2)}</p>
          <AnimatedHeightWrapper isExpanded={!!isError}>
            <Separator className="mb-4" />
            <p className="min-h-4 rounded-md border border-destructive p-2 text-center text-sm">
              {isError}
            </p>
          </AnimatedHeightWrapper>
        </div>
        <Card.Dialog isOpen={isRemoveDialogOpen}>
          <BasketItemRemove />
        </Card.Dialog>
      </Card>
    </BasketItemContext.Provider>
  );
};

export default BasketItem;
