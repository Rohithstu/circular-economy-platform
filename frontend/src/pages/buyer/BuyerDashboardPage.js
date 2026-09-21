import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const BuyerDashboardPage = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const stats = {
    orders: 12,
    saved: 8,
    savings: 2450
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your sustainable purchases.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Orders', value: stats.orders, icon: '📦', color: 'blue' },
          { label: 'Saved Items', value: stats.saved, icon: '❤️', color: 'red' },
          { label: 'Total Savings', value: `$${stats.savings}`, icon: '💰', color: 'green' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-4">{stat.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/marketplace"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <span className="text-2xl mr-4">🔍</span>
            <div>
              <h3 className="font-medium text-gray-900">Browse Marketplace</h3>
              <p className="text-sm text-gray-600">Find new materials for your business</p>
            </div>
          </Link>
          <Link
            to="/dashboard/buyer/orders"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <span className="text-2xl mr-4">📦</span>
            <div>
              <h3 className="font-medium text-gray-900">View Orders</h3>
              <p className="text-sm text-gray-600">Check your order status</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboardPage;