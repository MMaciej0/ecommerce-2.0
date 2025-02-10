"use client";

import { type FC } from "react";

import { Select } from "@/app/components/ui/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductsFilterSelectProps {
  values: string[];
  clearFiltersValue: string;
  searchParamKey: string;
}

const ProductsFilterSelect: FC<ProductsFilterSelectProps> = ({
  values,
  clearFiltersValue,
  searchParamKey,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selected = searchParams.get(searchParamKey) || clearFiltersValue;

  const handleSelect = (v: string) => {
    if (v === selected) return;

    const currentSearchParams = new URLSearchParams(searchParams);

    if (v === clearFiltersValue) {
      currentSearchParams.delete(searchParamKey);
    } else {
      currentSearchParams.set(searchParamKey, v);
    }

    const search = currentSearchParams.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <Select value={selected} onValueChange={handleSelect}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item val={clearFiltersValue} />
        {values.map((v) => (
          <Select.Item key={v} val={v} />
        ))}
      </Select.Content>
    </Select>
  );
};

export default ProductsFilterSelect;
