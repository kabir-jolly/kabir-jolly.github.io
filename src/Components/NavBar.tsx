import { NavLink } from "react-router-dom";
import { colors } from "../theme";

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "Posts", to: "/posts", end: false },
] as const;

const NavBar = () => {
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
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:opacity-70 ${
                    isActive ? "border-b-2" : ""
                  }`
                }
                style={({ isActive }) => ({
                  color: colors.navy,
                  borderColor: isActive ? colors.periwinkle : "transparent",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
