import { NavLink } from "react-router-dom";
import { colors } from "./BentoBoxes/BentoBox";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f6]/80 backdrop-blur-md border-b" style={{ borderColor: colors.lavender }}>
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:opacity-70 ${
                  isActive ? "border-b-2" : ""
                }`
              }
              style={({ isActive }) => ({
                color: colors.navy,
                borderColor: isActive ? colors.periwinkle : "transparent",
              })}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
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
              Posts
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

