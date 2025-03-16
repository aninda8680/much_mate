import { useState, useEffect } from "react";
import { db } from "../config"; // Firebase config file
import { collection, getDocs } from "firebase/firestore";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "menu"));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
      
      {loading ? (
        <div className="flex justify-center">
          <p className="text-xl">Loading menu items...</p>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">No menu items available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-bold text-gray-800">${item.price}</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;