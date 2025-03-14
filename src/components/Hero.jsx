import { motion } from "framer-motion";
import OrderNowButton from "./OrderNowButton";
import pasta from "../assets/12.png";
import sandwich1 from "../assets/23.png";
import sandwich2 from "../assets/24.png";
import foodItem1 from "../assets/13.png"; // New food image
import foodItem2 from "../assets/14.png"; // New food image
import About from "./About";

// Create a float-away animation that moves objects away from the center
const createFloatAwayPath = (position) => {
  // Calculate vector from center to current position
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Vector from center to position
  const dirX = position.x - centerX;
  const dirY = position.y - centerY;

  // Normalize and scale the vector
  const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const normalizedX = dirX / length;
  const normalizedY = dirY / length;

  // Distance to float away
  const floatDistance = 80 + Math.random() * 120;

  return {
    x: [0, normalizedX * floatDistance / 3, normalizedX * floatDistance * 2/3, normalizedX * floatDistance],
    y: [0, normalizedY * floatDistance / 3, normalizedY * floatDistance * 2/3, normalizedY * floatDistance],
    rotate: [0, Math.random() * 10 - 5, Math.random() * 20 - 10, Math.random() * 30 - 15]
  };
};

const Hero = () => {

  // Each food item will use its own float-away animation
  const floatAway = {
    animate: {
      x: [0, 80, 160, 240],  // Simple float away for now, will be customized for each item
      y: [0, 40, 80, 120],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
    <section id="home" className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 md:px-20 lg:px-32 text-white overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      </div>

      {/* Subtle animated particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-100 opacity-40"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay: Math.random() * 2,
          }} />
      ))}

      {/* Original food images with float-away animations */}
      <motion.img
        src={pasta}
        alt="Pasta"
        className="absolute top-10 left-10 md:top-16 md:left-24 w-28 md:w-40"
        style={{ filter: "drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3))" }}
        animate={{
          // Float away from center
          x: [0, 40, 80, 120],
          y: [0, 30, 60, 90],
          rotate: [0, 5, 10, 15]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        whileHover={{ scale: 1.05 }} />

      <motion.img
        src={sandwich1}
        alt="Sandwich 1"
        className="absolute top-1/2 right-8 md:right-24 w-24 md:w-36"
        style={{ filter: "drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3))" }}
        animate={{
          // Float away from center
          x: [0, 30, 60, 90],
          y: [0, -20, -40, -60],
          rotate: [0, -3, -6, -9]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        whileHover={{ scale: 1.05 }} />

      <motion.img
        src={sandwich2}
        alt="Sandwich 2"
        className="absolute bottom-10 left-1/4 w-28 md:w-36"
        style={{ filter: "drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3))" }}
        animate={{
          // Float away from center
          x: [0, -40, -80, -120],
          y: [0, -30, -60, -90],
          rotate: [0, -4, -8, -12]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        whileHover={{ scale: 1.05 }} />

      {/* New food images with float-away animations */}
      <motion.img
        src={foodItem1}
        alt="Food Item 1"
        className="absolute top-1/4 right-1/4 w-24 md:w-32"
        style={{ filter: "drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3))" }}
        animate={{
          // Float away from center
          x: [0, 50, 100, 150],
          y: [0, 40, 80, 120],
          rotate: [0, 7, 14, 21]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.5,
        }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        whileHover={{ scale: 1.05 }} />

      {/* Repositioned foodItem2 (14.png) */}
      <motion.img
        src={foodItem2}
        alt="Food Item 2"
        className="absolute top-3/4 left-20 w-24 md:w-32"
        style={{ filter: "drop-shadow(0 10px 15px rgba(99, 102, 241, 0.3))" }}
        animate={{
          // Float away from center
          x: [0, -50, -100, -150],
          y: [0, 40, 80, 120],
          rotate: [0, -8, -16, -24]
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1.5,
        }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        whileDrag={{ scale: 1.1, zIndex: 50 }}
        whileHover={{ scale: 1.05 }} />

      {/* Text Content with beautiful styling and Bold Tangerine font */}
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Font import for Tangerine */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&family=Yesteryear&display=swap');
          `}
        </style>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-wide mb-6"
          style={{
            fontFamily: "'Yesteryear', cursive",
            fontWeight: 700,
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-purple-600">
            Order Online,
          </span>
          <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Pick Up Hassle-Free!
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-600 max-w-xl mx-auto leading-relaxed mb-8 font-rubik"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Enjoy a seamless food ordering experience with secure online payments.
          Get your meal ready at the reception with a unique token number.
        </motion.p>

        {/* Order Now Button with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <OrderNowButton />
        </motion.div>
      </motion.div>
    </section>
    <About/>
    </>
  );
};

export default Hero;