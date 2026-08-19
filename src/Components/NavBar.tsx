import { NavLink, useLocation } from "react-router-dom";
import { colors } from "../theme";

const isPostPath = (pathname: string) =>
  /^\/(?:writing|project|experience)\/[^/]+\/?$/.test(pathname);

const navLinks = [
  {
    label: "Home",
    to: "/",
    isActive: (pathname: string) => pathname === "/",
  },
  {
    label: "Posts",
    to: "/posts",
    isActive: (pathname: string) =>
      pathname === "/posts" || isPostPath(pathname),
  },
] as const;

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg) 80%, transparent)",
        borderColor: colors.lavender,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <NavLink 
            to="/" 
            className="text-lg font-semibold tracking-tight"
            style={{ color: colors.navy }}
          >
            KJ
          </NavLink>
          
          <div className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.isActive(pathname);

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${
                    isActive ? "border-b-2" : ""
                  }`}
                  style={{
                    color: colors.navy,
                    borderColor: isActive ? colors.periwinkle : "transparent",
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
