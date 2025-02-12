import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { FC } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-transparent border border-border text-input-foreground hover:bg-accent hover:text-accent-foreground",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground bg-muted text-muted-foreground",
        disco:
          "bg-background text-foreground relative border border-border disco",
        link: "underline offset-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  ref,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export { Button, buttonVariants };
