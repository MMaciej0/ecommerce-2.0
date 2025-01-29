import { HTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("border border-border rounded-md shadow-md", className)}
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

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
