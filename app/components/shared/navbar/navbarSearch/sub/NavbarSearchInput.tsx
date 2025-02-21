import React, { useRef } from "react";

import { Search } from "lucide-react";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { SearchContentContext } from "./SearchContentContext";
import Input from "@/app/components/ui/Input";

const NavbarSearchInput = () => {
  const { searchTerm, setSearchTerm, setResult, setIsError, fetchProducts } =
    useGenericContext(SearchContentContext);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearch = e.target.value;
    setSearchTerm(currentSearch);

    if (!currentSearch || currentSearch.length < 3) {
      setResult(null);
      setIsError(null);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fetchProducts({
        searchTerm: currentSearch,
        page: 1,
        limit: 3,
        replace: true,
      });
    }, 500);
  };

  return (
    <Input
      icon={<Search />}
      placeholder="Search..."
      className="my-4"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default NavbarSearchInput;
