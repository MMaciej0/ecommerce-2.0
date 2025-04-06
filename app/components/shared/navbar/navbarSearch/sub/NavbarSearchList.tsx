"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, type FC } from "react";

import { ProductCard } from "../../../productsList/sub/ProductCard";
import DefaultLoader from "@/app/components/DefaultLoader";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { SearchContentContext } from "./SearchContentContext";

interface NavbarSearchListProps {
  setOpen: (open: boolean) => void;
}

const NavbarSearchList: FC<NavbarSearchListProps> = ({ setOpen }) => {
  const {
    isError,
    result,
    searchTerm,
    isPending,
    fetchProducts,
    isDebouncing,
  } = useGenericContext(SearchContentContext);

  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreProducts = useCallback(() => {
    if (isPending || !result || !result.metadata.hasMore) return;

    fetchProducts({
      searchTerm,
      page: result.metadata.currentPage + 1,
      limit: 3,
      replace: false,
    });
  }, [isPending, result, searchTerm, fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [isPending, result, loadMoreProducts]);

  if (!searchTerm || searchTerm.length < 3)
    return (
      <div className="py-8 text-center text-lg">
        Please enter search term with at least 3 characters.
      </div>
    );

  if (isError) return <div className="py-8 text-center text-lg">{isError}</div>;

  if (!result && (isPending || isDebouncing))
    return <DefaultLoader size={36} className="py-8" />;

  if (!result || !result.products.length)
    return <div className="py-8 text-center text-lg">No products found</div>;

  const handleClick = (slug: string) => {
    setOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <ul>
        {result.products.map((product) => (
          <li
            key={product._id}
            className="my-2 cursor-pointer"
            onClick={() => handleClick(product.slug)}
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {isPending && result.metadata.hasMore && (
        <DefaultLoader size={36} className="py-8" />
      )}
      <div className="h-10 w-full" ref={loaderRef} />
    </div>
  );
};

export default NavbarSearchList;
