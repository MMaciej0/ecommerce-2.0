import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.svg";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} alt="logo" width={40} height={40} />
    </Link>
  );
};

export default Logo;
