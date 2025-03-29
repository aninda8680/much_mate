import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Custom hook for using cart context
export const useCart = () => useContext(CartContext);

// Cart Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to remove item from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Function to clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Function to decrease quantity of an item
    const decreaseQuantity = (id) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex(item => item.id === id);
            if (itemIndex === -1) return prevCart;
            
            const newCart = [...prevCart];
            newCart.splice(itemIndex, 1);
            return newCart;
        });
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart,
            decreaseQuantity 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;