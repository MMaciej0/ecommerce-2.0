export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Ecommerce";
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || "Spend less, enjoy more.";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "An ecommerce built with Next.js";

export const SORT_METHODS = [
  "Newest",
  "Top rated",
  "Lowest Price",
  "Highest Price",
] as [string, ...string[]];
