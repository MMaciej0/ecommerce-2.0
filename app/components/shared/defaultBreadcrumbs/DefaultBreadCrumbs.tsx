"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../ui/Breadcrumb";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

const DefaultBreadCrumbs: FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  let accumulatedPath = "";

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">home</BreadcrumbLink>
      </BreadcrumbItem>
      {pathSegments.map((segment, index) => {
        accumulatedPath += `/${segment}`;

        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbSeparator>
              <ChevronRight className="size-4" />
            </BreadcrumbSeparator>
            <BreadcrumbLink
              href={accumulatedPath}
              className={
                (accumulatedPath === pathname && "text-foreground") || ""
              }
            >
              {segment}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default DefaultBreadCrumbs;
