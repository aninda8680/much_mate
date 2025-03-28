import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            )}
            <Link to="/menu">Back to Menu</Link>
        </div>
    );
};

export default Cart;
