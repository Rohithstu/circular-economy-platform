import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId, currentUser, setCurrentPage }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData(data);
      } else {
        // Fallback to current user data if profile fetch fails
        setUser(currentUser);
        setFormData(currentUser);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(currentUser);
      setFormData(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setFormData(updatedUser);
        setIsEditing(false);
        setSaveMessage('Profile updated successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage('Error updating profile');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <button 
            onClick={() => setCurrentPage('home')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100/50">
          <div className="h-32 bg-gradient-to-r from-green-400 to-emerald-600"></div>
          
          <div className="px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <img
                  src={user.profilePicture || '/default-avatar.png'}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white -mt-16 bg-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                    ✏️
                  </button>
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.company || 'EcoTrade Member'}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  {user.role === 'buyer' ? '🏢 Business Buyer' : 
                   user.role === 'seller' ? '🏭 Material Supplier' : 
                   '🔄 Both Buyer & Supplier'}
                </p>
              </div>
              
              {currentUser?.id === userId && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 shadow-lg"
                >
                  {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-green-50 rounded-lg hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-green-600">{user.stats?.rating || '4.8'}/5</div>
                <div className="text-sm text-gray-600">⭐ Rating</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-blue-600">{user.stats?.reviewCount || '0'}</div>
                <div className="text-sm text-gray-600">📝 Reviews</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-purple-600">{user.stats?.totalListings || '0'}</div>
                <div className="text-sm text-gray-600">📦 Listings</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-orange-600">{user.stats?.totalSales || '0'}</div>
                <div className="text-sm text-gray-600">💰 Sales</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-green-100/50">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setCurrentPage('favorites')}
            className="bg-white p-4 rounded-lg shadow-lg border border-green-100/50 hover:shadow-xl transition duration-200 text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">❤️</div>
            <div className="font-semibold text-gray-900">My Favorites</div>
            <div className="text-sm text-gray-600">View saved materials</div>
          </button>
          
          <button 
            onClick={() => setCurrentPage('list-material')}
            className="bg-white p-4 rounded-lg shadow-lg border border-green-100/50 hover:shadow-xl transition duration-200 text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">📦</div>
            <div className="font-semibold text-gray-900">List Material</div>
            <div className="text-sm text-gray-600">Sell your materials</div>
          </button>
          
          <button 
            onClick={() => setCurrentPage('marketplace')}
            className="bg-white p-4 rounded-lg shadow-lg border border-green-100/50 hover:shadow-xl transition duration-200 text-center group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">🛍️</div>
            <div className="font-semibold text-gray-900">Browse Marketplace</div>
            <div className="text-sm text-gray-600">Find materials</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;