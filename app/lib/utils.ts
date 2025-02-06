import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const toSmallestUnit = (price: number): number =>
  Math.round(price * 100);
export const toDecimalUnit = (price: number): number =>
  parseFloat((price / 100).toFixed(2));

export const calculateDayDifference = (
  startDate: Date | string,
  endDate: Date | string,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format");
  }

  const timeDiff = end.getTime() - start.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return dayDiff;
};
