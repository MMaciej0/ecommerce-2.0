import { LoaderCircle } from "lucide-react";
import { type FC } from "react";
import { cn } from "../lib/utils/utils";

interface DefaultLoaderProps {
  size?: number;
  className?: string;
}

const DefaultLoader: FC<DefaultLoaderProps> = ({ size, className }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle
        size={size}
        className={cn("flex-shrink-0 animate-spin", className)}
      />
    </div>
  );
};

export default DefaultLoader;
