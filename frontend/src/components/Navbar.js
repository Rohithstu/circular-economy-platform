// components/Navbar.js
import React from 'react';

const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  user, 
  handleLogout,
  cartItemsCount, 
  setAuthMode 
}) => {
  // ✅ Check if user can list materials (seller or both)
  const canListMaterial = user && (user.role === 'seller' || user.role === 'both');

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo and navigation links */}
            <span className="text-xl font-bold text-green-600">EcoTrade</span>
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'home' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'marketplace' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                Marketplace
              </button>
              {/* ✅ Only show List Material for sellers */}
              {canListMaterial && (
                <button
                  onClick={() => setCurrentPage('list-material')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === 'list-material' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-600 hover:text-green-700'
                  }`}
                >
                  List Material
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Cart button */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 text-gray-600 hover:text-green-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User authentication section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name} ({user.role})
                </span>
                {/* ✅ LOGOUT BUTTON */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setCurrentPage('authform');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setCurrentPage('authform');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;