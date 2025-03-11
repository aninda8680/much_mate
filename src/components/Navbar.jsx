import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiLogIn } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 backdrop-blur-md rounded-full px-8 py-3 z-50 w-[90%] md:w-auto ${
        scrolled
          ? "bg-white/90 shadow-lg"
          : "bg-white/30"
      }`}
    >
      <div className="flex justify-between items-center w-full space-x-6">
        {/* Brand Name with sparkle effect */}
        <motion.a
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative">
            MunchMate
            <span className="absolute -top-1 -right-3 text-yellow-400 text-xs">✨</span>
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <motion.a
              key={item}
              href="#"
              className="text-gray-700 hover:text-purple-600 relative font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-3 items-center">
          <motion.a
            href="#"
            className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 px-4 py-2 rounded-full border border-transparent hover:border-purple-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogIn className="inline-block" />
            <span>Sign In</span>
          </motion.a>

          <motion.a
            href="#"
            className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px rgba(99, 102, 241, 0.3)",
              background: "linear-gradient(to right, #8b5cf6, #ec4899, #6366f1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUser className="inline-block" />
            <span>Sign Up</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-2xl text-purple-600"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu (Floating) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col space-y-4 w-64 text-center"
          >
            {["Home", "Menu", "About", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 hover:text-purple-600 py-2 font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                {item}
              </motion.a>
            ))}

            <div className="pt-2 flex flex-col space-y-3">
              <motion.a
                href="#"
                className="flex items-center justify-center space-x-2 text-purple-600 border border-purple-200 px-4 py-2 rounded-full hover:bg-purple-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLogIn className="inline-block" />
                <span>Sign In</span>
              </motion.a>

              <motion.a
                href="#"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px rgba(99, 102, 241, 0.3)",
                  background: "linear-gradient(to right, #8b5cf6, #ec4899, #6366f1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUser className="inline-block" />
                <span>Sign Up</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;