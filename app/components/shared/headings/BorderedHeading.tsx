import React from "react";
import { cn } from "@/app/lib/utils";

const BorderedHeading = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        "rounded-xl border-[2px] border-border py-6 text-center text-2xl font-black shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export default BorderedHeading;
