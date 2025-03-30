import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 flex flex-col items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-56 h-56 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Content card with animation */}
      <div
        className={`w-full max-w-md mx-auto z-10 transition-all duration-700 transform ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-12 border border-white border-opacity-20">
          {/* Logo with pulse effect */}
          <div className="w-20 h-20 rounded-full bg-purple-100 shadow-md flex items-center justify-center mb-8 relative">
            <div className="absolute w-full h-full rounded-full bg-purple-500 opacity-30 animate-ping"></div>
            <span className="text-3xl text-purple-600 z-10">🍔</span>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              MunchMate
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 md:mb-12">
            Discover delicious meals from local restaurants and order
            hassle-free, right to your doorstep.
          </p>

          {/* Buttons with hover effects */}
          <div className="flex flex-col w-full space-y-4">
            <button
              onClick={handleSignIn}
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300 w-full transform hover:scale-105 hover:shadow-xl"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full transform hover:scale-105"
            >
              Sign Up
            </button>
          </div>

          {/* Food icons at bottom */}
          <div className="flex justify-center mt-10 space-x-4">
            <span className="text-2xl transform hover:scale-125 transition-transform cursor-pointer">
              🍕
            </span>
            <span className="text-2xl transform hover:scale-125 transition-transform cursor-pointer">
              🍔
            </span>
            <span className="text-2xl transform hover:scale-125 transition-transform cursor-pointer">
              🍜
            </span>
            <span className="text-2xl transform hover:scale-125 transition-transform cursor-pointer">
              🍣
            </span>
            <span className="text-2xl transform hover:scale-125 transition-transform cursor-pointer">
              🍦
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add required animation class
const styles = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;

// Add the style element to the page
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default Landing;
