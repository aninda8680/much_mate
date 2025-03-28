import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, AlertTriangle, CheckCircle, LogIn } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Enter your email!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Hmm, that email looks a bit undercooked";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Your secret recipe is missing!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate sign in
      setIsSignedIn(true);
      console.log("Tasty login:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-purple-300 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {isSignedIn ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <CheckCircle className="mx-auto text-purple-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Welcome Back !
            </h2>
            <p className="text-gray-600">Your culinary dashboard awaits!</p>
          </motion.div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-center">
              <Utensils className="mx-auto text-white" size={48} />
              <h2 className="text-3xl font-bold text-white mt-2">
                MunchMate Sign In
              </h2>
              <p className="text-white/80">
                Dive back into delicious adventures!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <label className="block text-gray-700 text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="foodie@munchmate.com"
                  className={`w-full p-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  } focus:outline-none focus:ring-2`}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.email}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-lg">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-800 text-sm"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your Secret Recipe 🍽️"
                  className={`w-full p-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  } focus:outline-none focus:ring-2`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.password}
                  </div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
              >
                <LogIn className="mr-2" size={20} />
                Sign In to Feast
              </motion.button>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  New to MunchMate?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/signup"; // Simple redirect
                    }}
                    className="text-purple-600 hover:text-purple-800 font-semibold transition duration-300"
                  >
                    Create An Account
                  </button>
                </p>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SignIn;
