import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-full px-8 py-3 z-50 w-[90%] md:w-auto">
      <div className="flex justify-between items-center w-full space-x-6">

        {/* Brand Name */}
        <a href="/" className="text-xl font-bold text-blue-600">
          MunchMate
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Menu</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
        </div>

        {/* Order Now Button (Desktop) */}
        <a href="#" className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-full  hover:bg-blue-700 ">
          Order Now
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* Mobile Menu (Floating) */}
      {isOpen && (
        <div className="md:hidden absolute top-12 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-md rounded-xl p-4 flex flex-col space-y-4 w-48 text-center">
          <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Menu</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
