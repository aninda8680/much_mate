import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, AlertTriangle, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Oops! We need your email to serve you";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Hmm, that doesn't look like a real email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Hungry for a password? Create one!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password too short - needs more flavor!";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
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
      // Simulate form submission
      setIsSubmitted(true);
      console.log("Tasty signup:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-300 to-purple-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <CheckCircle className="mx-auto text-purple-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Welcome to MunchMate!
            </h2>
            <p className="text-gray-600">
              Get ready to explore delicious adventures!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-center">
              <Utensils className="mx-auto text-white" size={48} />
              <h2 className="text-3xl font-bold text-white mt-2">
                MunchMate Signup
              </h2>
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
                className="mb-4"
              >
                <label className="block text-gray-700 text-lg mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Secret Recipe 🍽️"
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-lg mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Secret Recipe 🥘"
                  className={`w-full p-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  } focus:outline-none focus:ring-2`}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    {errors.confirmPassword}
                  </div>
                )}
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Sign Up
              </motion.button>

              {/* New section for existing users */}
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = "/signin"; // Simple redirect
                    }}
                    className="text-purple-600 hover:text-purple-800 font-semibold transition duration-300"
                  >
                    Sign In
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

export default SignUp;
