import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "../../ui/Button";
import { cn } from "@/app/lib/utils";

const Hero = ({}) => {
  return (
    <header className="grid grid-cols-1 md:grid-cols-2 p-8 md:p-12">
      <div className="lg:py-4 space-y-8 text-center md:text-left">
        <h1 className="text-4xl font-extrabold md:text-5xl">Mystery Market</h1>
        <p className="text-muted-foreground text-lg leading-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
          ullam aliquid soluta!
        </p>
        <Link
          href="/products"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-full py-6 px-12 text-lg"
          )}
        >
          Make a gift!
        </Link>
      </div>
      <div className="hidden md:block px-12">
        <div className="aspect-square rounded-full bg-muted relative">
          <div className="absolute w-1/3 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image src="/hero.svg" alt="hero" fill />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
