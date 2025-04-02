import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiHome, FiBook, FiInfo, FiMail, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { FiShoppingCart } from 'react-icons/fi';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNavigate, useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = ({ isAdmin, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = React.useMemo(() => [
    { name: "Home", icon: <FiHome />, path: "/home" },
    { name: "Menu", icon: <FiBook />, path: "/menu" },
    { name: "Cart", icon: <FiShoppingCart />, path: "/cart" },
    { name: "About", icon: <FiInfo />, path: "/about" }
  ], []);

  // Mock user data (replace with actual Firebase data)
  const userData = currentUser || {
    name: "Shreyas Saha",
    email: "shreyassaha00@gmail.com",
    contactNumber: "7439361373",
    department: "Computer Science",
    rollNumber: "UG/02/BTCSE/2023/096",
    section: "B",
    semester: "4th Semester"
  };

  useEffect(() => {
    // Set active item based on current path
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname, menuItems]);

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

  // Close mobile menu and profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu-container")) {
        setIsOpen(false);
      }
      if (showProfileDropdown && !event.target.closest(".profile-dropdown-container")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showProfileDropdown]);

  // Handle navigation - either scroll or redirect
  const handleNavigation = (itemName, itemPath) => {
    // Close the mobile menu if it's open
    setIsOpen(false);

    // Set the active menu item
    setActiveItem(itemName);

    // If it's the menu page, navigate to it
    if (itemName === "Menu") {
      navigate(itemPath);
    } else if (location.pathname === "/") {
      // If we're on the home page, scroll to section
      const sectionId = itemName.toLowerCase();
      const section = document.getElementById(sectionId);

      if (section) {
        // Use GSAP to smoothly scroll to the section
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: `#${sectionId}`,
            offsetY: 80 // Offset to account for the navbar height
          },
          ease: "power3.inOut"
        });
      }
    } else {
      // If we're on another page, navigate to home first
      navigate(itemPath);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 backdrop-blur-md rounded-full z-50 w-[90%] md:w-4/5 lg:w-3/4 xl:w-2/3 ${
        scrolled ? "bg-white/50 shadow-lg shadow-purple-100/50" : "bg-white/30"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center w-full px-6 py-3 md:px-8">
        {/* Brand Name with enhanced sparkle effect */}
        <motion.a
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent relative cursor-pointer">
            MunchMate
            <motion.span
              className="absolute -top-1 -right-3 text-yellow-400 text-xs"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute -bottom-1 -left-2 text-yellow-400 text-xs opacity-0 group-hover:opacity-100"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              ✨
            </motion.span>
          </span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <motion.a
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.name, item.path);
              }}
              className={`flex items-center space-x-1 text-gray-700 hover:text-purple-600 relative font-medium cursor-pointer ${
                activeItem === item.name ? "text-purple-600 font-semibold" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden lg:inline">{item.icon}</span>
              <span>{item.name}</span>
              <motion.span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full ${
                  activeItem === item.name ? "w-full" : "w-0"
                }`}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* User Profile Button (Desktop) */}
        <div className="hidden md:flex space-x-3 items-center">
          {isAdmin ? (
            <motion.a
              onClick={() => navigate("/admin/menu")}
              className="flex items-center space-x-1 bg-amber-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px rgba(245, 158, 11, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Admin Panel</span>
            </motion.a>
          ) : (
            <div className="relative profile-dropdown-container">
              <motion.button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px rgba(99, 102, 241, 0.3)",
                  background:
                    "linear-gradient(to right, #8b5cf6, #ec4899, #6366f1)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FiUser className="inline-block" />
                <span>{userData.name.split(" ")[0]}</span>
                <FiChevronDown className={`transform transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-4 z-50"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="border-b border-gray-200 pb-2 mb-2">
                        <h3 className="font-bold text-gray-800">{userData.name}</h3>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                        <p className="text-sm text-gray-600">{userData.contactNumber}</p>
                      </div>
                      <div className="text-sm">
                        <p className="flex justify-between"><span className="font-medium">Department:</span> <span>{userData.department}</span></p>
                        <p className="flex justify-between"><span className="font-medium">Roll Number:</span> <span>{userData.rollNumber}</span></p>
                        <p className="flex justify-between"><span className="font-medium">Section:</span> <span>{userData.section}</span></p>
                        <p className="flex justify-between"><span className="font-medium">Semester:</span> <span>{userData.semester}</span></p>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <motion.button
                          onClick={() => navigate("/UserDetails")}
                          className="w-full text-center text-purple-600 hover:text-purple-800 text-sm py-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          Edit Profile
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            // Handle sign out logic here
                            console.log("Signing out");
                            navigate("/");
                          }}
                          className="w-full text-center text-red-500 hover:text-red-700 text-sm py-1"
                          whileHover={{ scale: 1.05 }}
                        >
                          Sign Out
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-2xl text-purple-600 relative z-50 mobile-menu-container"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiMenu />
              </motion.div>
            )}
          </AnimatePresence>
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
            className="md:hidden absolute top-16 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col space-y-4 w-64 text-center mobile-menu-container"
          >
            {/* User Profile Info (Mobile) */}
            <div className="border-b border-gray-200 pb-3 mb-1">
              <h3 className="font-bold text-gray-800">{userData.name}</h3>
              <p className="text-xs text-gray-600">{userData.email}</p>
              <p className="text-xs text-gray-600">{userData.rollNumber}</p>
            </div>
            
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.name, item.path);
                }}
                className={`flex items-center justify-center space-x-2 text-gray-700 hover:text-purple-600 py-2 font-medium cursor-pointer ${
                  activeItem === item.name
                    ? "text-purple-600 font-semibold"
                    : ""
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  x: 5,
                  backgroundColor: "rgba(233, 213, 255, 0.3)",
                  borderRadius: "0.5rem",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </motion.a>
            ))}

            <div className="pt-2 flex flex-col space-y-3">
              {isAdmin ? (
                <motion.a
                  onClick={() => navigate("/admin/menu")}
                  className="flex items-center justify-center space-x-2 bg-amber-500 text-white px-4 py-2 rounded-full hover:shadow-lg cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Admin Panel</span>
                </motion.a>
              ) : (
                <>
                  <motion.a
                    onClick={() => navigate("/profile")}
                    className="flex items-center justify-center space-x-2 text-purple-600 border border-purple-200 px-4 py-2 rounded-full hover:bg-purple-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(233, 213, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiUser className="inline-block" />
                    <span>View Profile</span>
                  </motion.a>

                  <motion.button
                    onClick={() => {
                      // Handle sign out logic here
                      console.log("Signing out");
                      navigate("/");
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px rgba(239, 68, 68, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Sign Out</span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;