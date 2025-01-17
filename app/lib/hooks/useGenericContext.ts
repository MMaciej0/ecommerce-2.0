import { Context, useContext } from "react";

export const useGenericContext = <T>(
  context: Context<T | undefined>,
  errorMessage?: string
) => {
  const ctx = useContext(context);

  if (!ctx) {
    const componentName =
      new Error().stack?.split("\n")[2]?.trim() || "Unknown Component";

    throw new Error(
      errorMessage ||
        `The component "${componentName}" is using a context outside of its provider.`
    );
  }

  return ctx;
};
