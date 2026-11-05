import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// The home page carries its own header (name, role, toggle); every other page
// gets this one line.
const NavBar = () => {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  return (
    <nav className="site-nav">
      <Link to="/" className="site-nav-name">
        Kabir Jolly
      </Link>
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;
