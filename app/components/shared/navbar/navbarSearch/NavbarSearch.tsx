"use client";

import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../../ui/Dialog";
import { Search } from "lucide-react";
import NavbarSearchList from "./sub/NavbarSearchList";
import { SearchContentProvider } from "./sub/SearchContentContext";
import NavbarSearchInput from "./sub/NavbarSearchInput";

const NavbarSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} setOpen={setIsOpen}>
      <DialogTrigger variant="ghost" className="rounded-full">
        <Search />
      </DialogTrigger>
      <DialogContent className="md:h-2/3 md:w-3/6 lg:w-1/4">
        <div className="flex h-full w-full flex-col">
          <Dialog.Header>Search Gifts</Dialog.Header>
          <SearchContentProvider>
            <NavbarSearchInput />
            <NavbarSearchList setOpen={setIsOpen} />
          </SearchContentProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
