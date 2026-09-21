import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const SellerDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    listings: 0,
    orders: 0,
    revenue: 0,
    views: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch seller stats and orders
    const fetchSellerData = async () => {
      try {
        // Mock data - replace with actual API calls
        setStats({
          listings: 8,
          orders: 12,
          revenue: 3245,
          views: 156
        });

        setRecentOrders([
          {
            id: 1001,
            material: 'Reclaimed Wood',
            buyer: 'Furniture Co.',
            status: 'pending',
            amount: 450,
            date: '2 hours ago'
          },
          {
            id: 1002,
            material: 'Recycled Plastic',
            buyer: 'Manufacturing Inc.',
            status: 'pending',
            amount: 320,
            date: '5 hours ago'
          }
        ]);
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const AnimatedCounter = ({ value, prefix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          const diff = value - prev;
          if (diff === 0) return prev;
          return prev + Math.ceil(diff / 10);
        });
      }, 30);

      return () => clearInterval(interval);
    }, [value]);

    return <span>{prefix}{displayValue}</span>;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.company}. Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Listings', value: stats.listings, icon: '📋', color: 'blue' },
          { label: 'Pending Orders', value: stats.orders, icon: '📦', color: 'orange' },
          { label: 'Total Revenue', value: stats.revenue, icon: '💰', color: 'green', prefix: '$' },
          { label: 'Total Views', value: stats.views, icon: '👀', color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} />
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link to="/dashboard/seller/orders" className="text-sm text-green-600 hover:text-green-700">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{order.material}</p>
                  <p className="text-sm text-gray-600">From {order.buyer}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.amount}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
              </div>
            ))}
            
            {recentOrders.length === 0 && (
              <p className="text-gray-600 text-center py-8">No recent orders</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/dashboard/seller/listings/new"
              className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-xl mr-4">➕</span>
              <div>
                <h3 className="font-medium">Add New Listing</h3>
                <p className="text-sm">List new materials for sale</p>
              </div>
            </Link>
            
            <Link
              to="/dashboard/seller/listings"
              className="flex items-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-xl mr-4">📋</span>
              <div>
                <h3 className="font-medium">Manage Listings</h3>
                <p className="text-sm">Edit your current listings</p>
              </div>
            </Link>
            
            <Link
              to="/dashboard/seller/orders"
              className="flex items-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <span className="text-xl mr-4">📦</span>
              <div>
                <h3 className="font-medium">Process Orders</h3>
                <p className="text-sm">Manage incoming orders</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardPage;