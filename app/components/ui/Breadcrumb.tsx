import { cn } from "@/app/lib/utils/utils";
import Link, { LinkProps } from "next/link";
import { type HTMLAttributes } from "react";

export const Breadcrumb = ({
  className,
  ...props
}: HTMLAttributes<HTMLUListElement>) => {
  return <ul className={cn("flex items-center p-2", className)} {...props} />;
};

export const BreadcrumbItem = ({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) => {
  return <li className={cn("flex items-center", className)} {...props} />;
};

export const BreadcrumbLink = ({
  className,
  ...props
}: LinkProps & HTMLAttributes<HTMLAnchorElement>) => {
  return (
    <Link
      className={cn(
        "text-sm font-medium tracking-wide text-muted-foreground transition-all duration-200 hover:text-foreground disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbSeparator = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("mx-2 text-muted-foreground", className)} {...props} />
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Separator = BreadcrumbSeparator;
