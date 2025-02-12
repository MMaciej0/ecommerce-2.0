import { cn } from "@/app/lib/utils";
import { HTMLAttributes } from "react";

const Separator = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("h-px w-full bg-primary/20", className)} {...props} />
  );
};

export default Separator;
