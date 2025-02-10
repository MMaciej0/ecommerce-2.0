import { type FC } from "react";

import ProductsFilterSelect from "./ProductsFilterSelect";
import { Card } from "@/app/components/ui/Card";

import { Category } from "@/app/lib/validators/category";
import { SORT_METHODS } from "@/app/lib/constants";

interface ProductsFilterProps {
  categories: Category[];
}

const ProductsFilter: FC<ProductsFilterProps> = ({ categories }) => {
  return (
    <Card className="mx-6 p-2">
      <div className="flex flex-col md:flex-row md:space-x-4 2xl:flex-col 2xl:space-x-0 2xl:space-y-4">
        <div className="w-full md:flex md:space-x-2 2xl:flex-col 2xl:space-x-0">
          <h3 className="py-2 text-sm font-semibold tracking-wide">
            Category:
          </h3>
          <ProductsFilterSelect
            clearFiltersValue="All"
            searchParamKey="category"
            values={categories.map((category) => category.name)}
          />
        </div>
        <div className="w-full md:flex md:space-x-2 2xl:flex-col 2xl:space-x-0">
          <h3 className="py-2 text-sm font-semibold tracking-wide">Sort:</h3>
          <ProductsFilterSelect
            clearFiltersValue="Random"
            searchParamKey="sort"
            values={SORT_METHODS}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductsFilter;
