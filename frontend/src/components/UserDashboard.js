// components/UserDashboard.js
import React from 'react';

const UserDashboard = ({ user, setCurrentPage, handleLogout, cartItemsCount }) => {
  const canListMaterials = user && (user.role === 'seller' || user.role === 'both');
  const canPurchaseMaterials = user && (user.role === 'buyer' || user.role === 'both');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="mt-2 text-sm text-gray-600">
            {user.company} • {user.role === 'buyer' ? 'Buyer' : user.role === 'seller' ? 'Seller' : 'Buyer & Seller'}
          </p>
        </div>

        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Marketplace Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Browse Marketplace</dt>
                        <dd className="text-lg font-medium text-gray-900">Find materials</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setCurrentPage('marketplace')}
                      className="w-full bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Explore Marketplace
                    </button>
                  </div>
                </div>
              </div>

              {/* List Material Card (for sellers) */}
              {canListMaterials && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">List New Material</dt>
                          <dd className="text-lg font-medium text-gray-900">Sell your items</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => setCurrentPage('list-material')}
                        className="w-full bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        List Material
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* View Cart Card (for buyers) */}
              {canPurchaseMaterials && (
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Shopping Cart</dt>
                          <dd className="text-lg font-medium text-gray-900">Your items</dd>
                        </dl>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={() => setCurrentPage('cart')}
                        className="w-full bg-green-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Management Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Account Settings</dt>
                        <dd className="text-lg font-medium text-gray-900">Manage profile</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => alert('Profile management coming soon!')}
                      className="w-full bg-gray-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 text-center">No recent activity yet</p>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Your recent transactions and activities will appear here
                </p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-700">0</div>
                <div className="text-sm font-medium text-green-600">Materials Listed</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-700">0</div>
                <div className="text-sm font-medium text-blue-600">Orders Placed</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-purple-700">0</div>
                <div className="text-sm font-medium text-purple-600">Total Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;