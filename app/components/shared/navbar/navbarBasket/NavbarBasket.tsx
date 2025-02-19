"use client";

import { FC, useMemo, useState } from "react";

import { ShoppingBasket } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/Dialog";
import BasketItem from "./sub/BasketItem";

import { PopulatedCart } from "@/app/lib/validators/cart";
import Separator from "@/app/components/ui/Separator";
import Link from "next/link";
import { cn } from "@/app/lib/utils/utils";
import { buttonVariants } from "@/app/components/ui/Button";

interface NavbarBasketProps {
  cart: PopulatedCart | null;
}

const NavbarBasket: FC<NavbarBasketProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cartStats = useMemo(() => {
    const initial = {
      qty: 0,
      total: 0,
    };

    if (!cart) return initial;

    return cart.cartItems.reduce((acc, item) => {
      return {
        qty: acc.qty + item.quantity,
        total: acc.total + item.quantity * item.price,
      };
    }, initial);
  }, [cart]);

  return (
    <Dialog open={isOpen} setOpen={setIsOpen}>
      <DialogTrigger variant="ghost" className="flex-col gap-0 rounded-full">
        <ShoppingBasket className="h-5 w-5 flex-shrink-0" />
        <span>{cartStats.qty} items</span>
      </DialogTrigger>
      <DialogContent className="md:h-2/3 md:w-3/6 lg:w-1/4">
        <div className="flex h-full w-full flex-col">
          <Dialog.Header>Basket</Dialog.Header>
          <div className="flex-1 overflow-y-auto px-2 py-4">
            {!cart || !cart.cartItems.length ? (
              <p className="text-center">Your basket is empty.</p>
            ) : (
              <ul className="flex flex-col gap-3 px-4">
                {cart.cartItems.map((item) => (
                  <BasketItem key={item._id} item={item} />
                ))}
              </ul>
            )}
          </div>
          <Separator />
          <div className="flex items-center justify-between px-6 py-2">
            <p className="font-semibold">
              <span>Total:</span> ${cartStats.total.toFixed(2)}
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "accent" }),
                "w-32 lg:w-48",
                (!cart || !cart.cartItems.length) &&
                  "pointer-events-none opacity-50",
              )}
            >
              Pucharse
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarBasket;
