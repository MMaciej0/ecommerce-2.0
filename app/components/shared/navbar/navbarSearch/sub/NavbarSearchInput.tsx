import { RefObject, useRef } from "react";
import { Search } from "lucide-react";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { SearchContentContext } from "./SearchContentContext";
import Input from "@/app/components/ui/Input";

const NavbarSearchInput = ({
  ref,
}: {
  ref: RefObject<HTMLInputElement | null>;
}) => {
  const {
    searchTerm,
    setSearchTerm,
    setResult,
    setIsError,
    fetchProducts,

    setIsDebouncing,
  } = useGenericContext(SearchContentContext);
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearch = e.target.value;
    setSearchTerm(currentSearch);

    if (!currentSearch || currentSearch.length < 3) {
      setResult(null);
      setIsError(null);
      setIsDebouncing(false);
      return;
    }

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    setIsDebouncing(true);

    searchTimer.current = setTimeout(() => {
      setIsDebouncing(false);
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
      ref={ref}
    />
  );
};

export default NavbarSearchInput;
