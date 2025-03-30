import React, { useState } from "react";
import { motion } from "framer-motion";
import { Utensils, AlertTriangle, CheckCircle, LogIn } from "lucide-react";
import { auth } from "../config"; // Adjust path as needed
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Enter your email!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Hmm, that email looks a bit undercooked.";
    }
    if (!formData.password) {
      newErrors.password = "Your secret recipe is missing!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setFirebaseError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setIsSignedIn(true);
      console.log("Tasty login:", formData.email);
      navigate("/home");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed:", error);
      let errorMessage = "Failed to sign in. Please try again.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-purple-300 to-purple-100 p-6">
      <motion.div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-6 text-center">
          <Utensils className="mx-auto text-white" size={48} />
          <h2 className="text-3xl font-bold text-white mt-2">
            MunchMate Sign In
          </h2>
          <p className="text-white/80">Dive back into delicious adventures!</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="p-6 pt-4"
        >
          {firebaseError && (
            <div className="text-red-500 mb-4">{firebaseError}</div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="foodie@munchmate.com"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Secret Recipe 🍽️"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg"
          >
            Sign In
          </button>
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
      </motion.div>
    </div>
  );
};

export default SignIn;
