import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiHome,
  FiBook,
  FiInfo,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db, auth } from "../config"; // Adjust the path as needed
import { onAuthStateChanged } from "firebase/auth"; // Import auth state change listener

gsap.registerPlugin(ScrollToPlugin);

const Navbar = ({ isAdmin }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Menu items configuration
  const menuItems = React.useMemo(
    () => [
      { name: "Home", icon: <FiHome />, path: "/home" },
      { name: "Menu", icon: <FiBook />, path: "/menu" },
      { name: "Cart", icon: <FiShoppingCart />, path: "/cart" },
      { name: "About", icon: <FiInfo />, path: "/about" },
    ],
    []
  );

  // Listen for auth state changes and fetch user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          // Fetch user profile from userProfiles collection
          const userDocRef = doc(db, "userProfiles", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("No user profile found for this user");
            // Use basic info from auth user as fallback
            setUserData({ 
              name: user.displayName || "User",
              email: user.email || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        setLoading(false);
        // Redirect to login if not logged in
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Set active menu item based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  }, [location.pathname, menuItems]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".mobile-menu-container")) {
        setIsOpen(false);
      }
      if (
        showProfileDropdown &&
        !event.target.closest(".profile-dropdown-container")
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, showProfileDropdown]);

  // Navigation handler
  const handleNavigation = (itemName, itemPath) => {
    setIsOpen(false);
    setActiveItem(itemName);
    navigate(itemPath);
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/");
      setShowProfileDropdown(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading indicator while fetching user data
  if (loading) {
    return (
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-4/5 lg:w-3/4 bg-black/75 backdrop-blur-md rounded-2xl py-4 px-6 flex justify-between items-center border border-orange-500/20">
        <div className="cursor-pointer relative">
          <span className="text-2xl font-bold text-white relative">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Munch
            </span>
            <span className="text-white">Mate</span>
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-5 w-5 border-t-2 border-r-2 border-orange-500 rounded-full animate-spin mr-2"></div>
          <p className="text-orange-400 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-4/5 lg:w-3/4 ${
        scrolled ? "bg-black/85 shadow-lg shadow-orange-500/40" : "bg-black/75"
      } backdrop-blur-md rounded-2xl transition-all duration-500 border border-orange-500/20`}
    >
      <div className="flex justify-between items-center w-full px-6 py-3">
        {/* Logo with fire effect */}
        <motion.div
          onClick={() => navigate("/home")}
          className="cursor-pointer relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl font-bold text-white relative">
            <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Munch
            </span>
            <span className="text-white">Mate</span>
            <motion.span
              className="absolute -top-2 -right-4 text-orange-500 text-lg"
              animate={{
                y: [0, -5, 0],
                opacity: [1, 0.8, 1],
                scale: [1, 1.2, 1],
                rotate: 5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🔥
            </motion.span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10">
          {menuItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={activeItem === item.name}
              onClick={() => handleNavigation(item.name, item.path)}
            />
          ))}
        </div>

        {/* User Profile (Desktop) */}
        <div className="hidden md:flex space-x-2 items-center">
          {isAdmin ? (
            <AdminButton onClick={() => navigate("/admin/menu")} />
          ) : userData ? (
            <ProfileDropdown
              userData={userData}
              isOpen={showProfileDropdown}
              toggleDropdown={() =>
                setShowProfileDropdown(!showProfileDropdown)
              }
              onEditProfile={() => navigate("/UserDetails")}
              onSignOut={handleSignOut}
            />
          ) : (
            <motion.button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          className="md:hidden text-2xl text-orange-500 relative z-50 bg-black/40 p-2 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? <FiX /> : <FiMenu />}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && userData && (
          <MobileMenu
            userData={userData}
            menuItems={menuItems}
            activeItem={activeItem}
            isAdmin={isAdmin}
            onNavigate={handleNavigation}
            onSignOut={handleSignOut}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Desktop Navigation Item
const NavItem = ({ item, isActive, onClick }) => (
  <motion.a
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="relative group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div
      className={`flex items-center space-x-2 relative font-medium cursor-pointer ${
        isActive ? "text-orange-400" : "text-gray-300"
      }`}
    >
      <span>{item.icon}</span>
      <span>{item.name}</span>
    </div>

    <motion.div
      className={`h-0.5 bg-orange-500 rounded-full absolute bottom-0 left-0 w-0 group-hover:w-full ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      animate={
        isActive ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }
      }
      transition={{ duration: 0.3 }}
    />

    <motion.div
      className="h-0.5 bg-orange-500 rounded-full absolute bottom-0 left-0 w-0 opacity-0 group-hover:opacity-100"
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
);

// Admin Button Component
const AdminButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-full overflow-hidden relative"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="relative z-10">Admin</span>
    <motion.div
      className="absolute inset-0 bg-black/20"
      initial={{ x: "-100%" }}
      whileHover={{ x: "0%" }}
      transition={{ duration: 0.3 }}
    />
  </motion.button>
);

// Desktop Profile Dropdown
const ProfileDropdown = ({
  userData,
  isOpen,
  toggleDropdown,
  onEditProfile,
  onSignOut,
}) => (
  <div className="relative profile-dropdown-container">
    <motion.button
      onClick={toggleDropdown}
      className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-black text-white px-4 py-2 rounded-full overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiUser className="inline-block" />
      <span>{userData.name ? userData.name.split(" ")[0] : "User"}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="ml-1 text-orange-300"
      >
        <FiChevronDown />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-72 bg-black/90 backdrop-blur-md shadow-lg shadow-orange-500/10 rounded-xl p-4 z-50 border border-orange-500/20 text-white"
        >
          <div className="flex flex-col space-y-3">
            <div className="border-b border-orange-500/20 pb-3">
              <h3 className="font-bold text-orange-400 text-lg">{userData.name}</h3>
              <div className="grid grid-cols-1 gap-1 mt-2">
                <div className="flex items-center text-sm">
                  <span className="text-orange-400/80 w-16">Email:</span>
                  <span className="text-gray-300 text-xs truncate">{userData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-orange-400/80 w-16">Contact:</span>
                  <span className="text-gray-300">{userData.contactNumber}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-orange-400/80 w-16">Roll No:</span>
                  <span className="text-gray-300">{userData.rollNumber}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-orange-400/80 w-16">Semester:</span>
                  <span className="text-gray-300">{userData.semester}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-orange-400/80 w-16">Section:</span>
                  <span className="text-gray-300">{userData.section}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <motion.button
                onClick={onEditProfile}
                className="text-white text-sm py-1.5 px-4 rounded-md bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
              <motion.button
                onClick={onSignOut}
                className="text-white text-sm py-1.5 px-4 rounded-md bg-black border border-orange-500/30 hover:bg-orange-950/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// Mobile Menu Component
const MobileMenu = ({
  userData,
  menuItems,
  activeItem,
  isAdmin,
  onNavigate,
  onSignOut,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    className="md:hidden absolute top-16 right-0 bg-black/95 backdrop-blur-md shadow-lg rounded-xl p-5 flex flex-col space-y-4 w-60 mobile-menu-container border-l border-t border-orange-500/20"
  >
    {/* User Profile Summary */}
    <div className="flex items-center space-x-3 border-b border-orange-500/20 pb-3">
      <div className="bg-orange-500/20 rounded-full p-2">
        <FiUser className="text-orange-400" />
      </div>
      <div className="text-left">
        <h3 className="font-bold text-orange-400">
          {userData.name ? userData.name.split(" ")[0] : "User"}
        </h3>
        <p className="text-xs text-gray-400 truncate">{userData.email}</p>
      </div>
    </div>

    {/* Menu Items */}
    <div className="space-y-1">
      {menuItems.map((item, index) => (
        <motion.a
          key={item.name}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name, item.path);
          }}
          className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors ${
            activeItem === item.name
              ? "bg-orange-500/20 text-orange-400"
              : "text-gray-300 hover:bg-orange-500/10 hover:text-orange-400"
          }`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.name}</span>
        </motion.a>
      ))}
    </div>

    {/* Additional User Info */}
    <div className="text-xs border-t border-orange-500/20 pt-3 space-y-1.5">
      <div className="flex items-center">
        <span className="text-orange-400/80 w-16">Roll No:</span>
        <span className="text-gray-300">{userData.rollNumber}</span>
      </div>
      <div className="flex items-center">
        <span className="text-orange-400/80 w-16">Section:</span>
        <span className="text-gray-300">{userData.section}</span>
      </div>
      <div className="flex items-center">
        <span className="text-orange-400/80 w-16">Semester:</span>
        <span className="text-gray-300">{userData.semester}</span>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="pt-2 border-t border-orange-500/20">
      {isAdmin ? (
        <motion.button
          onClick={() => onNavigate("Admin", "/admin/menu")}
          className="w-full bg-gradient-to-r from-orange-600 to-black text-white py-2 rounded-lg hover:shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Admin Panel
        </motion.button>
      ) : (
        <motion.button
          onClick={onSignOut}
          className="w-full bg-gradient-to-r from-orange-600 to-black text-white py-2 rounded-lg hover:shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Out
        </motion.button>
      )}
    </div>
  </motion.div>
);

export default Navbar;