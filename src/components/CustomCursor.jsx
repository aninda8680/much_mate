import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorSize = 24;

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";

    const allElements = document.querySelectorAll(
      "a, button, input, [role='button']"
    );
    allElements.forEach((el) => {
      el.style.cursor = "none";
    });

    return () => {
      document.body.style.cursor = "auto";
      allElements.forEach((el) => {
        el.style.cursor = "auto";
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-black rounded-full pointer-events-none z-50 opacity-50"
      style={{ width: cursorSize, height: cursorSize }}
      animate={{
        x: position.x - cursorSize / 2,
        y: position.y - cursorSize / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

export default CustomCursor;
