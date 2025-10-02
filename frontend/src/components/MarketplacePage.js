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

  // Price ranges
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: 'Under $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000+', label: 'Over $1,000' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              Sustainable Materials Marketplace
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto text-center">
              Discover quality recycled materials from trusted suppliers. Join the circular economy today.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-green-100/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50/50 transition duration-200"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full py-3 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50/50 transition duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50/50 transition duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => setPriceFilter(range.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                    priceFilter === range.value
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Materials
              {sortedMaterials.length > 0 && (
                <span className="text-green-600 ml-2">({sortedMaterials.length})</span>
              )}
            </h2>
            <p className="text-gray-600">Quality recycled materials from trusted suppliers</p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setPriceFilter('all');
                setSortBy('newest');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 font-medium"
            >
              Clear All
            </button>
            {user && (
              <button
                onClick={() => setCurrentPage('list-material')}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 font-medium shadow-lg"
              >
                + List Material
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* ✅ FIXED: Materials Grid with 3 columns */}
        {!isLoading && sortedMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMaterials.map((material, index) => (
              <div 
                key={material._id || Math.random()} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <MaterialCard
                  material={material}
                  addToCart={addToCart}
                  user={user}
                  setCurrentPage={setCurrentPage}
                  setAuthMode={setAuthMode}
                />
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-green-100/50 animate-fade-in-up">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No materials found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || categoryFilter !== 'all' || priceFilter !== 'all'
                    ? 'No materials match your current filters. Try adjusting your search criteria.'
                    : 'Be the first to list materials in our marketplace!'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setPriceFilter('all');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 font-medium shadow-lg"
                  >
                    Clear Filters
                  </button>
                  {user && (
                    <button
                      onClick={() => setCurrentPage('list-material')}
                      className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition duration-200 font-medium"
                    >
                      List Your First Material
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}

        {/* Load More Button (for pagination) */}
        {sortedMaterials.length > 0 && (
          <div className="flex justify-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition duration-200 font-medium shadow-lg">
              Load More Materials
            </button>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Suppliers</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Materials Listed</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-600">Waste Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;