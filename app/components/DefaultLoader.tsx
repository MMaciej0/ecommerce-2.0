import { LoaderCircle } from "lucide-react";
import { type FC } from "react";

interface DefaultLoaderProps {
  size?: number;
}

const DefaultLoader: FC<DefaultLoaderProps> = ({ size }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle size={size} className="flex-shrink-0 animate-spin" />
    </div>
  );
};

export default DefaultLoader;
