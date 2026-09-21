import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit, FiTrash2, FiEye, FiPackage, FiDollarSign, 
  FiTrendingUp, FiPlus, FiFilter, FiSearch 
} from 'react-icons/fi';

const SellerListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockListings = [
          {
            id: 1,
            title: 'Reclaimed Wood',
            category: 'Wood',
            price: 45,
            quantity: 100,
            unit: 'kg',
            status: 'active',
            views: 124,
            orders: 8,
            createdAt: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'High-quality reclaimed wood from sustainable sources. Perfect for furniture and construction projects.'
          },
          {
            id: 2,
            title: 'Recycled Plastic',
            category: 'Plastic',
            price: 32,
            quantity: 200,
            unit: 'kg',
            status: 'active',
            views: 89,
            orders: 5,
            createdAt: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Clean recycled plastic pellets ready for reuse in manufacturing processes.'
          },
          {
            id: 3,
            title: 'Industrial Metal Scraps',
            category: 'Metal',
            price: 120,
            quantity: 500,
            unit: 'kg',
            status: 'draft',
            views: 42,
            orders: 0,
            createdAt: '2024-01-05',
            image: 'https://images.unsplash.com/photo-1583226120755-6e32f9d3b31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Mixed metal scraps from manufacturing processes. Primarily steel and aluminum.'
          },
          {
            id: 4,
            title: 'Glass Containers',
            category: 'Glass',
            price: 15,
            quantity: 300,
            unit: 'units',
            status: 'sold',
            views: 156,
            orders: 12,
            createdAt: '2023-12-20',
            image: 'https://images.unsplash.com/photo-1595974357801-cbca100e65d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80',
            description: 'Clean glass containers of various sizes, perfect for reuse in food packaging.'
          }
        ];
        setListings(mockListings);
        setFilteredListings(mockListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter and sort listings
  useEffect(() => {
    let result = [...listings];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(listing => listing.status === statusFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(listing => listing.category === categoryFilter);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    
    setFilteredListings(result);
  }, [listings, searchTerm, statusFilter, categoryFilter, sortBy]);

  const handleDelete = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
    setShowDeleteModal(false);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    active: '🟢',
    draft: '🟡',
    sold: '⚫'
  };

  const categories = ['All', 'Wood', 'Plastic', 'Metal', 'Glass', 'Paper', 'Textile', 'Other'];

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="grid grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-gray-600 mt-2">Manage your material listings and track performance</p>
        </div>
        <Link
          to="/dashboard/seller/listings/new"
          className="flex items-center px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
        >
          <FiPlus className="mr-2" />
          Add New Listing
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiPackage className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Listings</h3>
              <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <FiEye className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Views</h3>
              <p className="text-2xl font-bold text-gray-900">
                {listings.reduce((sum, listing) => sum + listing.views, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiTrendingUp className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">
                {listings.reduce((sum, listing) => sum + listing.orders, 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center">
            <div className="p-3 bg-amber-50 rounded-lg">
              <FiDollarSign className="text-amber-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Estimated Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">
                ${listings.reduce((sum, listing) => sum + (listing.price * listing.orders), 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search listings
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="sold">Sold Out</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'popular', label: 'Most Popular' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  sortBy === option.value
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Listings ({filteredListings.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredListings.length} of {listings.length} listings
            </div>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by adding your first material listing'}
            </p>
            <Link
              to="/dashboard/seller/listings/new"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Material
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredListings.map((listing) => (
                    <motion.tr
                      key={listing.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-lg object-cover" src={listing.image} alt={listing.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{listing.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{listing.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${listing.price}/{listing.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{listing.quantity} {listing.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[listing.status]}`}>
                          {statusIcons[listing.status]} {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-4 text-sm text-gray-500">
                            <FiEye className="inline mr-1" /> {listing.views}
                          </div>
                          <div className="text-sm text-gray-500">
                            <FiTrendingUp className="inline mr-1" /> {listing.orders}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedListing(listing)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50 transition-colors"
                            title="View Details"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedListing(listing);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Listing</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedListing?.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedListing.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerListingsPage;