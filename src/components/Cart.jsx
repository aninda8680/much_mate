import { useCart } from "../context/CartContext"; // Update this path to where you place the context file
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus } from "react-icons/fi";

const Cart = () => {
  // Destructure all needed functions and state from the context
  const { cart, removeFromCart, clearCart, addToCart, decreaseQuantity } = useCart();

  // Group identical items together
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // For debugging
  console.log("Cart functions available:", { 
    removeFromCart: typeof removeFromCart, 
    decreaseQuantity: typeof decreaseQuantity,
    addToCart: typeof addToCart,
    clearCart: typeof clearCart
  });

  // Define manual decrease function if context one is not available
  const handleDecreaseQuantity = (itemId) => {
    console.log("Decreasing quantity for item:", itemId);
    if (typeof decreaseQuantity === 'function') {
      decreaseQuantity(itemId);
    } else {
      console.error("decreaseQuantity not available in context");
      // Fallback implementation
      const itemIndex = cart.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        const newCart = [...cart];
        newCart.splice(itemIndex, 1);
        // You would need setCart here, but this is just a fallback
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8 bg-white"
    >
      <div className="max-w-3xl mx-auto py-30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
            Your Cart
          </h2>
          <Link
            to="/menu"
            className="text-purple-700 hover:text-purple-900 font-medium flex items-center"
          >
            <span className="mr-2">Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-purple-100">
            <div className="flex justify-center mb-4">
              <FiShoppingBag size={60} className="text-purple-200" />
            </div>
            <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-purple-100"
            >
              <div className="p-4 bg-purple-600 text-white font-medium">
                {cart.length} {cart.length === 1 ? "Item" : "Items"} in Cart
              </div>

              <motion.ul className="divide-y divide-purple-100">
                {groupedItems.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={itemVariants}
                    className="flex justify-between items-center p-4 hover:bg-purple-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-purple-100"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-purple-600 font-medium">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center mr-4 bg-white border border-purple-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="p-2 text-purple-600 hover:bg-purple-50"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={16} />
                        </button>
                        <span className="px-3 font-medium text-purple-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-2 text-purple-600 hover:bg-purple-50"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          // Remove all instances of this item
                          for (let i = 0; i < item.quantity; i++) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="text-gray-400 hover:text-purple-600 p-2 rounded-full hover:bg-purple-50"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-purple-800">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="border-t border-purple-100 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-purple-700">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-all duration-300"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;