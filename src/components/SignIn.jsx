import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, AlertTriangle, CheckCircle, LogIn } from "lucide-react";
import { auth } from "../config"; // Adjust path as needed
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError(null);
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Sign in with Firebase Authentication
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        // Sign in successful
        setIsSignedIn(true);
        console.log("Tasty login:", formData.email);
      } catch (error) {
        // Handle Firebase auth errors
        console.error("Firebase signin error:", error.code, error.message);
        let errorMessage = "Failed to sign in. Please try again.";
        
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          errorMessage = "Incorrect email or password. Try again!";
        } else if (error.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please try again later.";
        } else if (error.code === "auth/user-disabled") {
          errorMessage = "This account has been disabled. Contact support.";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage = "Network error. Check your connection and try again.";
        }
        
        setFirebaseError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // You can implement password reset functionality here
    window.location.href = "/reset-password";
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
              Welcome Back!
            </h2>
            <p className="text-gray-600">Your culinary dashboard awaits!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/dashboard"}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Go to Dashboard
            </motion.button>
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
              {firebaseError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-start"
                >
                  <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
                  <span>{firebaseError}</span>
                </motion.div>
              )}
              
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
                    onClick={handleForgotPassword}
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
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className={`w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Sign In to Feast
                  </>
                )}
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