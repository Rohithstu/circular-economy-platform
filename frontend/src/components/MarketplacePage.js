// components/MarketplacePage.js
import React, { useState } from 'react';
import MaterialCard from './MaterialCard';

const MarketplacePage = ({ 
  materials, 
  isLoading, 
  searchTerm, 
  setSearchTerm, 
  categoryFilter, 
  setCategoryFilter, 
  priceFilter, 
  setPriceFilter, 
  addToCart, 
  user, 
  setCurrentPage, 
  setAuthMode 
}) => {
  const [sortBy, setSortBy] = useState('newest');

  // ✅ ADD NULL CHECK: Ensure materials is always an array
  const safeMaterials = Array.isArray(materials) ? materials : [];

  // ✅ FIXED: Handle sorting with null check
  const sortedMaterials = [...safeMaterials].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'name') return (a.title || '').localeCompare(b.title || '');
    return 0;
  });

  // Categories for filter
  const categories = ['All', 'Wood', 'Plastic', 'Metal', 'Paper', 'Glass', 'Textile', 'Other'];

  return (
    <div className="marketplace-page bg-gray-50 min-h-screen">
      {/* ... rest of your code remains the same ... */}
      
      {/* ✅ FIXED: Materials Grid with null check */}
      {sortedMaterials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedMaterials.map(material => (
            <MaterialCard
              key={material._id || Math.random()}
              material={material}
              addToCart={addToCart}
              user={user}
              setCurrentPage={setCurrentPage}
              setAuthMode={setAuthMode}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No materials found</h3>
          <p className="mt-2 text-gray-500">
            {searchTerm || categoryFilter !== 'all' || priceFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'There are currently no materials listed in the marketplace.'}
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setPriceFilter('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
      
      {/* ... rest of your code remains the same ... */}
    </div>
  );
};

export default MarketplacePage;