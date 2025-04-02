import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { FiShoppingCart, FiFilter, FiSearch, FiXCircle } from "react-icons/fi";
import { db } from "../config"; // Firebase config file
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext"; // Import the cart context

const Menu = () => {
  const { addToCart } = useCart(); // Get addToCart function from cart context
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "menu"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Extract unique categories
      const uniqueCategories = [...new Set(items.map(item => item.category))];
      setCategories(["All", ...uniqueCategories]);
      
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter menu items based on search term and category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Card variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Handler for adding item to cart
  const handleAddToCart = (item) => {
    // Only add to cart if item is available
    if (item.isAvailable !== false) {
      // Create a cart item object with essential properties
      const cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || "https://via.placeholder.com/400x300?text=Food+Image"
      };
      addToCart(cartItem);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen pt-28 pb-16 px-6 md:px-16 lg:px-32"
    >
      {/* Beautiful gradient background similar to Hero */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#fff_80%,#e0cffc_100%)]"></div>
      </div>
      
      {/* Subtle animated particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-100 opacity-30"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 2,
          }} />
      ))}

      {/* Page Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our delicious offerings crafted with care. Order online and enjoy a hassle-free pickup experience.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        className="mb-10 flex flex-col md:flex-row gap-4 justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* Search bar */}
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 rounded-full border border-purple-200 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-sm"
          />
        </div>

        {/* Category filter */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center md:justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "bg-white bg-opacity-70 text-gray-700 hover:bg-purple-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Menu Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
        </div>
      ) : filteredItems.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl text-gray-500">No items found. Try another search term or category.</p>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredItems.map((item) => {
            const isUnavailable = item.isAvailable === false;
            
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: isUnavailable ? 0 : -8, transition: { duration: 0.3 } }}
                className={`bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl overflow-hidden ${isUnavailable ? 'shadow-none' : 'shadow-md hover:shadow-xl'} transition-all duration-300`}
              >
                <div className="h-56 overflow-hidden relative">
                  <motion.img 
                    src={item.image || "https://via.placeholder.com/400x300?text=Food+Image"} 
                    alt={item.name}
                    className={`w-full h-full object-cover ${isUnavailable ? 'grayscale' : ''}`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: isUnavailable ? 1 : 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {item.isNew && !isUnavailable && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      NEW
                    </div>
                  )}
                  {item.isPopular && !isUnavailable && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      POPULAR
                    </div>
                  )}
                  {isUnavailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                      <FiXCircle className="text-white text-4xl mb-2" />
                      <span className="text-white text-lg font-bold px-4 py-2 bg-black bg-opacity-50 rounded-lg">
                        NOT AVAILABLE
                      </span>
                    </div>
                  )}
                </div>
                <div className={`p-6 ${isUnavailable ? 'opacity-70' : ''}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-bold ${isUnavailable ? 'text-gray-600' : 'text-gray-800'}`}>{item.name}</h3>
                    <div className={`text-xl font-bold ${isUnavailable ? 'text-gray-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'}`}>
                      ${item.price?.toFixed(2) || "9.99"}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {isUnavailable ? (
                      <div className="text-sm text-gray-500 px-4 py-2">
                        Out of Stock
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:shadow-lg w-full justify-center"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 15px rgba(99, 102, 241, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Menu;