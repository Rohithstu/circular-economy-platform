// components/StatCard.js
import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
    >
      <div className="mb-4">{icon}</div>
      <div className="text-4xl font-bold text-green-600">{value}</div>
      <div className="text-gray-600 mt-2">{title}</div>
    </motion.div>
  );
};

export default StatCard;
