import Link from "next/link";

import { buttonVariants } from "../../ui/Button";
import { cn } from "@/app/lib/utils/utils";
import { Gift } from "lucide-react";

const Hero = ({}) => {
  return (
    <header className="grid grid-cols-1 rounded-xl bg-accent/20 p-8 md:grid-cols-2 md:p-12">
      <div className="flex flex-col justify-center space-y-8 text-center md:text-left lg:py-4">
        <h1 className="text-4xl font-extrabold md:text-5xl">Beauty Gifts</h1>
        <p className="text-lg leading-tight text-muted-foreground xl:pb-8">
          Discover the perfect beauty gifts to make every moment special. Give
          the gift of beauty and make them glow inside and out.
        </p>
        <Link
          href="/products"
          className={cn(
            buttonVariants({ variant: "disco" }),
            "rounded-full px-12 py-6 text-lg xl:px-16 xl:py-7 xl:font-semibold xl:tracking-wide",
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
