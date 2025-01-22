"use client";

import { type FC } from "react";
import { Dialog, DialogContent } from "../../ui/Dialog";
import { Search } from "lucide-react";

interface NavbarSearchProps {}

const NavbarSearch: FC<NavbarSearchProps> = ({}) => {
  return (
    <Dialog>
      <Dialog.Trigger variant="ghost" className="bg-transparent">
        <Search />
      </Dialog.Trigger>
      <DialogContent>
        <h3>Search</h3>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
