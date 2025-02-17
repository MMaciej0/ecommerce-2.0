import { HTMLAttributes, type FC } from "react";
import { cn } from "../lib/utils/utils";

interface MaxWidthContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("mx-auto w-full max-w-5xl px-4 py-8 lg:px-0", className)}
    />
  );
};

export default MaxWidthContainer;
