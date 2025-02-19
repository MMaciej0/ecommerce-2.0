import { getCart } from "@/app/lib/actions/cart.actions";
import Logo from "../../Logo";
import NavbarBasket from "./navbarBasket/NavbarBasket";
import NavbarSearch from "./NavbarSearch";

const Navbar = async () => {
  const cart = await getCart();

  return (
    <nav className="sticky top-0 z-50 border border-b bg-background p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Logo />
        <ul className="flex items-center gap-4">
          <li>
            <NavbarSearch />
          </li>
          <li>
            <NavbarBasket cart={cart} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
