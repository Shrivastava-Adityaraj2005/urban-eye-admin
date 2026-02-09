import React, { useContext, useState } from "react";
import BlinkingEye from "./BlinkingEye";
import { UserContext } from "../store/user-context";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userContext = useContext(UserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  function logout() {
    userContext.clearUser();
    localStorage.removeItem("user");
  }

  return (
    <nav className="flex justify-between items-center w-full bg-slate-900 text-white p-4 shadow-xl z-50 border-b border-slate-700">
      {/* Left side */}
      <div className="flex items-center space-x-3">
        <BlinkingEye />
        <span className="text-xl font-semibold">Urban Eye</span>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex items-center space-x-6">
        <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black py-2 px-4 rounded-md font-semibold transition">
          Analytics
        </button>
        <button onClick={logout} className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md transition">
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div
        className="sm:hidden flex items-center cursor-pointer"
        onClick={toggleMobileMenu}
      >
        <div className="space-y-1">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-slate-800 text-white p-4 rounded-xl shadow-xl border border-slate-700 z-50">
          <button className="block py-2 px-4 text-lg w-full text-left hover:text-amber-400">
            Analytics
          </button>
          <button
            onClick={logout}
            className="block py-2 px-4 text-lg w-full text-left hover:text-amber-900"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
