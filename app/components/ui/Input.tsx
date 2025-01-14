import { cn } from "@/app/lib/utils";
import React, { InputHTMLAttributes } from "react";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "border border-border text-foreground/80 font-medium p-2 rounded-md focus-visible:outline-primary",
        className
      )}
      {...props}
    />
  );
};

export default Input;
