"use client";

import { FC, useRef, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/Dialog";
import { Search } from "lucide-react";
import Input from "../../ui/Input";
import NavbarSearchList from "./NavbarSearchList";
import { ProductImport } from "@/app/lib/validators/product";

const NavbarSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<ProductImport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearch = e.target.value;
    setSearchTerm(currentSearch);

    if (!currentSearch || currentSearch.length < 3) {
      setResult([]);
      setIsError(null);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/global-search?search=${currentSearch}`);

          if (!res.ok) {
            const errorResponse = await res.json();
            setIsError(
              errorResponse?.error?.message || "An unexpected error occurred.",
            );
            setResult([]);
            return;
          }

          const products = await res.json();
          setResult(products);
          setIsError(null);
        } catch (error) {
          console.log(error);
          setIsError("An error occurred while fetching the products.");
          setResult([]);
        }
      });
    }, 500);
  };

  return (
    <Dialog open={isOpen} setOpen={setIsOpen}>
      <DialogTrigger variant="ghost" className="rounded-full">
        <Search />
      </DialogTrigger>
      <DialogContent className="md:h-2/3 md:w-3/6 lg:w-1/4">
        <div className="flex h-full w-full flex-col">
          <Dialog.Header>Search Gifts</Dialog.Header>
          <Input
            icon={<Search />}
            placeholder="Search..."
            className="my-4"
            value={searchTerm}
            onChange={handleSearch}
          />
          <NavbarSearchList
            isLoading={isPending}
            isError={isError}
            products={result}
            setOpen={setIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearch;
