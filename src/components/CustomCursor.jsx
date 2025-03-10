import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(24);
  const [cursorColor, setCursorColor] = useState("bg-amber-300"); // Gold/amber color
  const [trailPositions, setTrailPositions] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);

      // Add position to trail with a slight delay
      setTrailPositions(prev => {
        const newTrail = [...prev, newPosition];
        if (newTrail.length > 5) {
          return newTrail.slice(newTrail.length - 5);
        }
        return newTrail;
      });
    };

    const handleMouseDown = () => {
      setCursorSize(40);
      setCursorColor("bg-amber-400"); // Slightly darker gold when clicking
    };

    const handleMouseUp = () => {
      setCursorSize(isHovering ? 32 : 24);
      setCursorColor("bg-amber-300"); // Back to default gold
    };

    // Check if hovering over clickable elements
    const handleElementHover = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.onclick ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isClickable) {
        setIsHovering(true);
        setCursorSize(32);
        setCursorColor("bg-amber-200"); // Lighter gold when hovering
      } else {
        setIsHovering(false);
        setCursorSize(24);
        setCursorColor("bg-amber-300"); // Default gold
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isHovering]);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none";

    const allElements = document.querySelectorAll("a, button, input, [role='button']");
    allElements.forEach(el => {
      el.style.cursor = "none";
    });

    return () => {
      document.body.style.cursor = "auto";
      allElements.forEach(el => {
        el.style.cursor = "auto";
      });
    };
  }, []);

  return (
    <>
      {/* Cursor trail effect */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={`trail-${index}`}
          className="fixed top-0 left-0 bg-amber-200 rounded-full pointer-events-none opacity-40"
          style={{
            width: Math.max(8, cursorSize * (0.4 + (index * 0.1))),
            height: Math.max(8, cursorSize * (0.4 + (index * 0.1)))
          }}
          animate={{
            x: pos.x - (cursorSize * (0.4 + (index * 0.1)) / 2),
            y: pos.y - (cursorSize * (0.4 + (index * 0.1)) / 2),
            opacity: 0.4 - (index * 0.06)
          }}
          transition={{ duration: 0.1 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 ${cursorColor} rounded-full pointer-events-none z-50`}
        style={{ width: cursorSize, height: cursorSize }}
        animate={{
          x: position.x - cursorSize / 2,
          y: position.y - cursorSize / 2,
          scale: cursorSize >= 32 ? [1, 1.1, 1] : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          scale: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />

      {/* Ring effect for interactive elements */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 border-2 border-amber-400 rounded-full pointer-events-none opacity-70"
          style={{ width: cursorSize * 1.8, height: cursorSize * 1.8 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 0.7,
            scale: 1,
            x: position.x - (cursorSize * 0.9),
            y: position.y - (cursorSize * 0.9),
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 15
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;