import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import Menu from './components/Menu';
import AdminMenu from './components/AdminMenu';
import Cart from './components/Cart'; // Import Cart Component
import { CartProvider } from "./context/CartContext"; // Import Cart Provider
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserDetails from "./components/UserDetails"; 
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Effect to check if user is on admin route
  useEffect(() => {
    const isAdminPath = location.pathname.includes('/admin');
    setIsAdmin(isAdminPath);
  }, [location]);

  return (
    <CartProvider>
      {" "}
      {/* Wrap the app with CartProvider */}
      <div className="App">
        <CustomCursor />
        <Navbar isAdmin={isAdmin} />

        <Routes>
          {/* Home route */}
          <Route path="/" element={<Hero />} />

          {/* Dedicated Menu route */}
          <Route path="/menu" element={<Menu />} />

          {/* Cart Page Route */}
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/userdetails" element={<UserDetails />} />

          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback route */}
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
