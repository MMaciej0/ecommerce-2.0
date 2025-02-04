import { cn } from "@/app/lib/utils";
import React, { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<Omit<HTMLInputElement, "id">> {
  icon?: ReactNode;
}

const Input = ({ className, icon, ...props }: InputProps) => {
  return (
    <div className="relative">
      <input
        className={cn(
          "peer w-full border border-border text-foreground/80 font-medium p-2 rounded-md focus-visible:outline-primary",
          icon && "pl-10",
          className
        )}
        id="input"
        {...props}
      />
      {icon && (
        <label
          htmlFor="input"
          className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground peer-focus-visible:text-foreground"
        >
          {icon}
        </label>
      )}
    </div>
  );
};

export default Input;
