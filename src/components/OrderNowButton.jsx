import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const OrderNowButton = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current || !spanRef.current) return;

    const button = btnRef.current;
    const span = spanRef.current;

    const handleMouseMove = (e) => {
      const { width, left } = button.getBoundingClientRect();
      const offset = e.clientX - left;
      const leftPercentage = `${(offset / width) * 100}%`;

      span.animate({ left: leftPercentage }, { duration: 300, fill: "forwards", easing: "ease-out" });
    };

    const handleMouseLeave = () => {
      span.animate({ left: "50%" }, { duration: 200, fill: "forwards", easing: "ease-out" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      ref={btnRef}
      className="relative w-full max-w-xs overflow-hidden rounded-lg bg-purple-500 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-purple-600 cursor-pointer" // Added cursor-pointer here
    >
      <span className="pointer-events-none relative z-10 text-white">
        Order Now
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white opacity-20 transition-all"
      />
    </motion.button>
  );
};

export default OrderNowButton;
