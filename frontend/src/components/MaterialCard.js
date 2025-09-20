// components/MaterialCard.js (corrected)
import React from 'react';

const MaterialCard = ({ material, addToCart, user, setCurrentPage, setAuthMode }) => {
  const handleAddToCart = () => {
    if (!user) {
      setAuthMode('login');
      setCurrentPage('authform');
      return;
    }
    addToCart(material);
  };

  return (
    <div className="material-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={material.image || 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80'} 
          alt={material.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{material.title}</h3>
          {material.isFree ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Free
            </span>
          ) : (
            <span className="text-lg font-bold text-green-600">${material.price}</span>
          )}
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{material.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {material.location}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {material.company}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {material.quantity} {material.unit}
          </span>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;