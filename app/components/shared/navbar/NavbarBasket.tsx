"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { type FC } from "react";
import { buttonVariants } from "../../ui/Button";
import { ShoppingBasket } from "lucide-react";

interface NavbarBasketProps {}

const NavbarBasket: FC<NavbarBasketProps> = ({}) => {
  return (
    <Link
      href="/basket"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex-col gap-0 bg-transparent"
      )}
    >
      <ShoppingBasket className="flex-shrink-0 w-5 h-5" />
      <span>0 items</span>
    </Link>
  );
};

export default NavbarBasket;
