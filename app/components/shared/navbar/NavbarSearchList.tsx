import { DBProduct } from "@/app/lib/db/models/product.model";
import { type FC } from "react";
import DefaultLoader from "../../DefaultLoader";
import { ProductCard } from "../productsList/ProductsList";

interface NavbarSearchListProps {
  isLoading: boolean;
  isError: string | null;
  products: DBProduct[];
}

const NavbarSearchList: FC<NavbarSearchListProps> = ({
  isLoading,
  isError,
  products,
}) => {
  if (isLoading)
    return (
      <div className="py-8">
        <DefaultLoader size={36} />
      </div>
    );

  if (isError) return <div className="py-8 text-center text-lg">{isError}</div>;

  return (
    <ul className="flex-1 overflow-y-auto p-4">
      {products.map((product) => (
        <li key={product._id.toString()} className="my-2">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default NavbarSearchList;
