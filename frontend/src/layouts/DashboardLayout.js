import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = {
    buyer: [
      { name: 'Overview', path: '/dashboard/buyer', icon: '🏠' },
      { name: 'Marketplace', path: '/marketplace', icon: '🔍' },
      { name: 'My Cart', path: '/dashboard/buyer/cart', icon: '🛒' },
      { name: 'My Orders', path: '/dashboard/buyer/orders', icon: '📦' },
      { name: 'Messages', path: '/dashboard/messages', icon: '💬' },
    ],
    seller: [
      { name: 'Overview', path: '/dashboard/seller', icon: '🏠' },
      { name: 'My Listings', path: '/dashboard/seller/listings', icon: '📋' },
      { name: 'Orders', path: '/dashboard/seller/orders', icon: '📦' },
      { name: 'Analytics', path: '/dashboard/seller/analytics', icon: '📊' },
      { name: 'Messages', path: '/dashboard/messages', icon: '💬' },
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700">CircularHub</h1>
          <p className="text-sm text-gray-600 mt-1">Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {user?.isBuyer && navItems.buyer.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          {user?.isSeller && navItems.seller.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/marketplace" 
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="mr-3">🌐</span>
            Public Marketplace
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center py-4 px-8">
            <h2 className="text-lg font-semibold text-gray-900">
              {[...navItems.buyer, ...navItems.seller].find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center space-x-4">
              {/* Notifications and User Menu */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;