import { Gift } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Gift className="flex-shrink-0 w-7 h-7" />
    </Link>
  );
};

export default Logo;
