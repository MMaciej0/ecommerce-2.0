"use client";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/Dialog";
import { ShoppingBasket } from "lucide-react";

import { useState } from "react";

const NavbarBasket = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} setOpen={setIsOpen}>
      <DialogTrigger variant="ghost" className="flex-col gap-0 rounded-full">
        <ShoppingBasket className="h-5 w-5 flex-shrink-0" />
        <span>{1} items</span>
      </DialogTrigger>
      <DialogContent className="md:h-2/3 md:w-3/6 lg:w-1/4">
        <div className="flex h-full w-full flex-col">
          <Dialog.Header>Cart</Dialog.Header>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarBasket;
