import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import Menu from './components/Menu';
import AdminMenu from './components/AdminMenu';
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
    <div className="App">
      <CustomCursor />
      <Navbar isAdmin={isAdmin} />
      
      <Routes>
        {/* Home route without Menu component */}
        <Route path="/" element={
          <>
            <Hero />
          </>
        } />
        
        {/* Dedicated Menu route */}
        <Route path="/menu" element={<Menu />} />
        
        {/* Admin routes */}
        <Route path="/admin/menu" element={<AdminMenu />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;