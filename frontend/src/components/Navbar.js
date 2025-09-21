// components/Navbar.js (updated)
import React from 'react';

const Navbar = ({ currentPage, setCurrentPage, user, handleLogout, cartItemsCount, setAuthMode }) => {
  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setCurrentPage('authform');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <span className="text-2xl font-bold text-green-700">WASTENoT</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <button 
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${currentPage === 'home' ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setCurrentPage('home')}
              >
                Home
              </button>
              <button 
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${currentPage === 'marketplace' ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                onClick={() => setCurrentPage('marketplace')}
              >
                Marketplace
              </button>
              {user && (user.role === 'seller' || user.role === 'both') && (
                <button 
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${currentPage === 'list-material' ? 'border-green-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setCurrentPage('list-material')}
                >
                  List Material
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'buyer' || user.role === 'both' ? (
                  <button 
                    className="relative p-2 text-gray-600 hover:text-green-700"
                    onClick={() => setCurrentPage('cart')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItemsCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                ) : null}
                <div className="hidden md:flex items-center">
                  <span className="text-sm text-gray-700 mr-2">Hello, {user.name}</span>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => setCurrentPage('dashboard')}
                  >
                    Dashboard
                  </button>
                  <button 
                    className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => openAuthForm('login')}
                >
                  Login
                </button>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => openAuthForm('register')}
                >
                  Sign Up
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