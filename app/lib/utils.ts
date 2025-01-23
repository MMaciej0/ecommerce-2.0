import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const toSmallestUnit = (price: number): number =>
  Math.round(price * 100);
export const toDecimalUnit = (price: number): number =>
  parseFloat((price / 100).toFixed(2));
