import ProductsFilter from "@/app/components/pages/products/productsFilter/ProductsFilter";
import ProductList from "@/app/components/shared/productsList/ProductsList";
import { getCategories } from "@/app/lib/actions/category.actions";
import {
  ProductSearchParams,
  productSearchParamsSchema,
} from "@/app/lib/validators/searchParams";
import React from "react";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<ProductSearchParams>;
}) => {
  const currentSearchParams = await searchParams;
  const categories = await getCategories();

  const validatedSearchParams =
    productSearchParamsSchema.safeParse(currentSearchParams);

  if (!validatedSearchParams.success) {
    throw new Error("Invalid search parameters.");
  }

  if (validatedSearchParams.data.category) {
    const categoryId = categories.find(
      (category) =>
        category.name.trim().toLowerCase() ===
        validatedSearchParams.data.category!.trim().toLowerCase(),
    )?._id;

    if (!categoryId) {
      throw new Error("Category not found.");
    }

    validatedSearchParams.data.category = categoryId;
  }

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="mx-auto max-w-5xl py-10 text-4xl font-black">
        All gifts in one place!
      </h1>
      <div className="flex flex-1 flex-col items-center 2xl:-translate-x-[125px] 2xl:flex-row 2xl:items-start 2xl:justify-center">
        <div className="w-full max-w-5xl 2xl:sticky 2xl:top-20 2xl:mt-6 2xl:w-[250px]">
          <ProductsFilter categories={categories} />
        </div>
        <div className="flex w-full max-w-5xl flex-1 flex-col space-y-10 p-6 2xl:pt-6">
          <ProductList
            searchParams={{
              sort: validatedSearchParams.data.sort,
              categoryId: validatedSearchParams.data.category,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
