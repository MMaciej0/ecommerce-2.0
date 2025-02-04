import { LoaderCircle } from "lucide-react";
import { type FC } from "react";

interface DefaultLoaderProps {
  size?: number;
}

const DefaultLoader: FC<DefaultLoaderProps> = ({ size }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle size={size} className="animate-spin flex-shrink-0" />
    </div>
  );
};

export default DefaultLoader;
