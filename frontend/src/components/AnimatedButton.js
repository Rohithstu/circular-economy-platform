// components/AnimatedButton.js
import React from "react";
import { motion } from "framer-motion";

const AnimatedButton = ({ children, onClick, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
      whileTap={{ scale: 0.95 }}
      className={`py-2 px-4 rounded-md text-white bg-green-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
