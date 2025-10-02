// components/MaterialCard.js
import React, { useState } from 'react';

const MaterialCard = ({ material, addToCart, user, setCurrentPage, setAuthMode, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleAddToCart = () => {
    if (!user) {
      setAuthMode('login');
      setCurrentPage('authform');
      return;
    }
    addToCart(material);
  };

  const getCategoryColor = (category) => {
    const colors = {
      wood: 'bg-amber-100 text-amber-800',
      plastic: 'bg-blue-100 text-blue-800',
      metal: 'bg-gray-100 text-gray-800',
      paper: 'bg-green-100 text-green-800',
      glass: 'bg-cyan-100 text-cyan-800',
      textile: 'bg-pink-100 text-pink-800',
      other: 'bg-purple-100 text-purple-800'
    };
    return colors[category?.toLowerCase()] || colors.other;
  };

  // Get all available images
  const getImages = () => {
    const images = [];
    if (material.imageUrl) images.push(material.imageUrl);
    if (material.images && material.images.length > 0) {
      images.push(...material.images);
    }
    return images.length > 0 ? images : ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'];
  };

  const images = getImages();

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(material, currentImageIndex);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-green-100/50 overflow-hidden">
      {/* Image Section - Fixed 1:1 Aspect Ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={material.title}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition duration-500"
          onClick={handleImageClick}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
          }}
        />
        
        {/* Image Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(material.category)}`}>
            {material.category || 'Other'}
          </span>
        </div>
        
        {/* Verified Badge */}
        <div className="absolute top-3 right-3">
          {material.isVerified && (
            <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
              ✅ Verified
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
            {material.title}
          </h3>
          <span className="text-2xl font-bold text-green-600 whitespace-nowrap">
            ${material.price || '0'}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {material.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{material.location || 'Remote'}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>{material.sellerName || 'Supplier'}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {material.quantity || '0'} units available
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 text-sm font-medium shadow-lg group-hover:scale-105 transform transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;