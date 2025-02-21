import { createContext, useState, useTransition } from "react";

import {
  PaginatedProducts,
  PaginatedProductsSchema,
} from "@/app/lib/validators/product";

interface SearchProductsProps {
  searchTerm: string;
  page: number;
  limit: number;
  replace: boolean;
}

interface SearchContextType {
  searchTerm: string;
  result: PaginatedProducts | null;
  isPending: boolean;
  isError: string | null;
  setIsError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  fetchProducts: (params: SearchProductsProps) => Promise<void>;
  setResult: (result: PaginatedProducts | null) => void;
}

export const SearchContentContext = createContext<
  SearchContextType | undefined
>(undefined);

export const SearchContentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState<PaginatedProducts | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchProducts = async ({
    searchTerm,
    page,
    limit,
    replace,
  }: SearchProductsProps) => {
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/global-search?search=${searchTerm}&page=${page}&limit=${limit}`,
        );

        if (!res.ok) {
          const errorResponse = await res.json();
          setIsError(
            errorResponse?.error?.message || "An unexpected error occurred.",
          );
          setResult(null);
          return;
        }

        const paginatedProducts = await res.json();
        const validatedPaginatedProducts =
          PaginatedProductsSchema.safeParse(paginatedProducts);

        if (!validatedPaginatedProducts.success) {
          console.error(validatedPaginatedProducts.error.message);
          setIsError("An error occurred while fetching the products.");
          setResult(null);
          return;
        }

        if (replace) {
          setResult(validatedPaginatedProducts.data);
        } else {
          setResult((prevResult) => {
            if (prevResult) {
              return {
                products: [
                  ...prevResult.products,
                  ...validatedPaginatedProducts.data.products,
                ],
                metadata: validatedPaginatedProducts.data.metadata,
              };
            } else {
              return validatedPaginatedProducts.data;
            }
          });
        }
        setIsError(null);
      } catch (error) {
        console.log(error);
        setIsError("An error occurred while fetching the products.");
        setResult(null);
      }
    });
  };

  return (
    <SearchContentContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        result,
        setResult,
        isPending,
        isError,
        setIsError,
        fetchProducts,
      }}
    >
      {children}
    </SearchContentContext.Provider>
  );
};
