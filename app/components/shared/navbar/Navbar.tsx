import Logo from "../../Logo";
import NavbarBasket from "./NavbarBasket";
import NavbarSearch from "./NavbarSearch";

const Navbar = ({}) => {
  return (
    <nav className="sticky top-0 z-50 p-4 border border-b">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Logo />
        <ul className="flex items-center gap-4">
          <li>
            <NavbarSearch />
          </li>
          <li>
            <NavbarBasket />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
