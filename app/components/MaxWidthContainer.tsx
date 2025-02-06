import { HTMLAttributes, type FC } from "react";
import { cn } from "../lib/utils";

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
      className={cn("max-w-5xl mx-auto w-full px-4 lg:px-0 py-8", className)}
    />
  );
};

export default MaxWidthContainer;
