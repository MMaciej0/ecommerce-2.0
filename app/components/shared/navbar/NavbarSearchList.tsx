"use client";

import { type FC } from "react";
import DefaultLoader from "../../DefaultLoader";
import { ProductCard } from "../productsList/ProductsList";
import { ProductImport } from "@/app/lib/validators/product";
import { useRouter } from "next/navigation";

interface NavbarSearchListProps {
  isLoading: boolean;
  isError: string | null;
  products: ProductImport[];
  setOpen: (open: boolean) => void;
}

const NavbarSearchList: FC<NavbarSearchListProps> = ({
  isLoading,
  isError,
  products,
  setOpen,
}) => {
  const router = useRouter();

  if (isLoading)
    return (
      <div className="py-8">
        <DefaultLoader size={36} />
      </div>
    );

  if (isError) return <div className="py-8 text-center text-lg">{isError}</div>;

  const handleClick = (slug: string) => {
    setOpen(false);
    router.push(`/products/${slug}`);
  };

  return (
    <ul className="flex-1 overflow-y-auto p-4">
      {products.map((product) => (
        <li
          key={product._id}
          className="my-2 cursor-pointer"
          onClick={() => handleClick(product.slug)}
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default NavbarSearchList;
