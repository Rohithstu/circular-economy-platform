// components/HomePage.js (completed)
import React from 'react';

const HomePage = ({ setCurrentPage, user, setAuthMode }) => {
  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setCurrentPage('authform');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Transform Waste into Resources
            </h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto">
              Join the circular economy movement. Connect businesses to exchange materials, reduce waste, and create sustainable value.
            </p>
            <div className="mt-10">
              <button 
                className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                onClick={() => setCurrentPage('marketplace')}
              >
                Explore Marketplace
              </button>
              {!user && (
                <button 
                  className="ml-4 bg-transparent border border-white text-white px-8 py-3 rounded-md text-base font-medium hover:bg-white hover:text-green-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm('register')}
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-green-600">1,250+</div>
              <div className="mt-2 text-xl font-medium text-gray-900">Tons Diverted</div>
              <p className="mt-2 text-gray-600">From landfills through our platform</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-green-600">500+</div>
              <div className="mt-2 text-xl font-medium text-gray-900">Businesses</div>
              <p className="mt-2 text-gray-600">Participating in the circular economy</p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-green-600">$2.1M+</div>
              <div className="mt-2 text-xl font-medium text-gray-900">Savings</div>
              <p className="mt-2 text-gray-600">For businesses using our platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">Simple steps to join the circular economy</p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">List Materials</h3>
              <p className="mt-2 text-gray-600">Post your surplus materials or by-products for other businesses to use.</p>
            </div>
            <div className="feature-card bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Find Resources</h3>
              <p className="mt-2 text-gray-600">Discover materials you need for your operations at reduced costs or for free.</p>
            </div>
            <div className="feature-card bg-white rounded-lg shadow-md p-6 text-center transition-all duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Connect & Exchange</h3>
              <p className="mt-2 text-gray-600">Build relationships with other businesses and complete sustainable transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Ready to Join the Circular Economy?</h2>
          <p className="mt-4 text-xl text-green-100">
            Start reducing waste and creating value from your by-products today.
          </p>
          <div className="mt-8">
            {user ? (
              <button 
                className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                onClick={() => setCurrentPage('marketplace')}
              >
                Browse Marketplace
              </button>
            ) : (
              <div className="space-x-4">
                <button 
                  className="bg-white text-green-700 px-8 py-3 rounded-md text-base font-medium hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm('register')}
                >
                  Sign Up Free
                </button>
                <button 
                  className="bg-transparent border border-white text-white px-8 py-3 rounded-md text-base font-medium hover:bg-white hover:text-green-700 md:py-4 md:text-lg md:px-10"
                  onClick={() => openAuthForm('login')}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;