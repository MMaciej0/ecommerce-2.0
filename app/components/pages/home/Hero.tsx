import Link from "next/link";

import { buttonVariants } from "../../ui/Button";
import { cn } from "@/app/lib/utils";
import { Gift } from "lucide-react";

const Hero = ({}) => {
  return (
    <header className="grid grid-cols-1 p-8 md:grid-cols-2 md:p-12">
      <div className="space-y-8 text-center md:text-left lg:py-4">
        <h1 className="text-4xl font-extrabold md:text-5xl">Mystery Market</h1>
        <p className="text-lg leading-tight text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          ullam aliquid soluta!
        </p>
        <Link
          href="/products"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-full px-12 py-6 text-lg",
          )}
        >
          Make a gift!
        </Link>
      </div>
      <div className="hidden px-12 md:block">
        <div className="relative aspect-square rounded-full bg-muted">
          <div className="absolute left-1/2 top-1/2 h-full w-1/3 -translate-x-1/2 -translate-y-1/2">
            <Gift className="h-full w-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
