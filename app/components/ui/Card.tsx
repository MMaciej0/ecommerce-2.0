import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/utils/utils";

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "relative rounded-md border border-border shadow-md",
        className,
      )}
      {...props}
    />
  );
};

const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("p-4 text-center text-lg", className)} {...props} />
  );
};

const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("p-4", className)} {...props} />;
};

const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("p-4", className)} {...props} />;
};

interface CardDialogProps {
  isOpen: boolean;
  children: ReactNode;
}

const CardDialog = ({ isOpen, children }: CardDialogProps) => {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 max-h-0 overflow-hidden rounded-[inherit] opacity-0 backdrop-blur-md transition-all duration-300 ease-in-out",
          isOpen && "max-h-full opacity-100",
        )}
      />
      <div
        className={cn(
          "absolute inset-5 flex max-h-0 flex-col justify-center overflow-hidden rounded-[inherit] opacity-0 transition-all duration-300 ease-in-out",
          isOpen && "max-h-full opacity-100",
        )}
      >
        {children}
      </div>
    </>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Dialog = CardDialog;
