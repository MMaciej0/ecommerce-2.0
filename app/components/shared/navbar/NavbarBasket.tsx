"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../ui/Button";
import { ShoppingBasket } from "lucide-react";

const NavbarBasket = ({}) => {
  return (
    <Link
      href="/basket"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "flex-col gap-0 rounded-full",
      )}
    >
      <ShoppingBasket className="h-5 w-5 flex-shrink-0" />
      <span>0 items</span>
    </Link>
  );
};

export default NavbarBasket;
