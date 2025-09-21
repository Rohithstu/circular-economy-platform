// components/MaterialCard.js - Fixed
import React from "react";
import { motion } from "framer-motion";

const MaterialCard = ({ material, addToCart, user, setCurrentPage, setAuthMode }) => {
  const handleAddToCart = () => {
    if (!user) {
      setAuthMode('login');
      setCurrentPage('auth');
      return;
    }
    addToCart(material);
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
      className="bg-white rounded-lg overflow-hidden shadow-md"
    >
      <img 
        src={material.image || "https://source.unsplash.com/random/400x300/?recycling"} 
        alt={material.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{material.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-green-600 font-bold">
            {material.isFree ? "Free" : `$${material.price}`}
          </span>
          <span className="text-gray-400 text-sm">
            {material.quantity} {material.unit}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MaterialCard;