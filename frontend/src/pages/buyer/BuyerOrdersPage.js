import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BuyerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from API
    const fetchOrders = async () => {
      try {
        // Mock data - replace with actual API call
        const mockOrders = [
          {
            id: 1,
            material: 'Reclaimed Wood',
            seller: 'EcoWood Inc.',
            status: 'delivered',
            price: 450,
            quantity: '100 kg',
            date: '2024-01-15'
          },
          {
            id: 2,
            material: 'Recycled Plastic',
            seller: 'GreenPlast Co.',
            status: 'shipped',
            price: 320,
            quantity: '50 kg',
            date: '2024-01-10'
          }
        ];
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track your material requests and purchases</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{order.material}</h3>
                <p className="text-gray-600">From {order.seller}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Price:</span>
                <p className="text-gray-900">${order.price}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Quantity:</span>
                <p className="text-gray-900">{order.quantity}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Order Date:</span>
                <p className="text-gray-900">{order.date}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Order ID:</span>
                <p className="text-gray-900">#{order.id}</p>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 border border-green-200 rounded-md hover:bg-green-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                Contact Seller
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Start browsing the marketplace to find materials for your business</p>
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
            Browse Marketplace
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerOrdersPage;