import React, { useState } from 'react';
import BlinkingEye from './BlinkingEye';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center w-[100%] bg-gray-400 text-white p-4 shadow-lg z-50">
      {/* Left side: Logo and Name */}
      <div className="flex items-center space-x-3">
        <BlinkingEye/>
        <span className="text-xl font-semibold text-white">Urban-Eye</span>
      </div>

      {/* Right side: Desktop buttons */}
      <div className="hidden sm:flex items-center space-x-6">
        <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200">
          Analytics
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200">
          Profile
        </button>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden flex items-center" onClick={toggleMobileMenu}>
        <div className="space-y-1">
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
          <div className="w-6 h-1 bg-white"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-gray-500 text-white p-4 rounded-md shadow-lg z-50">
          <button className="block py-2 px-4 text-lg" onClick={toggleMobileMenu}>
            Analytics
          </button>
          <button className="block py-2 px-4 text-lg" onClick={toggleMobileMenu}>
            Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
