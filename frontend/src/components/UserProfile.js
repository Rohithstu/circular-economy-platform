import React, { useState, useEffect, useRef } from 'react';

const UserProfile = ({ userId, currentUser, setCurrentPage, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [userMaterials, setUserMaterials] = useState([]);
  const fileInputRef = useRef(null);

  // ✅ Correct backend port
  const API_BASE_URL = 'http://localhost:5000';
  const canSeeListings = currentUser && (currentUser.role === 'seller' || currentUser.role === 'both');

  // Generate fallback avatar
  const getFallbackAvatar = (user) => {
    if (!user || !user.name) {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEwQjk4MSIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPlVTPC90ZXh0Pgo8L3N2Zz4K';
    }
    
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const colors = ['10B981', '3B82F6', '8B5CF6', 'EF4444', 'F59E0B'];
    const color = colors[user.name.charCodeAt(0) % colors.length];
    
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#${color}"/>
        <text x="100" y="100" font-family="Arial" font-size="40" fill="#ffffff" text-anchor="middle" dy="0.35em">${initials}</text>
      </svg>
    `)}`;
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
      if (canSeeListings) {
        fetchUserMaterials();
      }
    }
  }, [userId, canSeeListings]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      console.log('🔍 Fetching user profile...');
      
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ User profile fetched:', data);
        console.log('📸 Profile picture URL:', data.profilePicture ? 'Exists' : 'Missing');
        
        setUser(data);
        setFormData(data);
      } else {
        console.warn('⚠️ Using current user as fallback');
        setUser(currentUser);
        setFormData(currentUser);
      }
    } catch (error) {
      console.error('❌ Error fetching user profile:', error);
      setUser(currentUser);
      setFormData(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/materials/my-materials`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserMaterials(data);
      }
    } catch (error) {
      console.error('Error fetching user materials:', error);
      setUserMaterials([]);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('📁 Selected file:', file.name, file.size, file.type);

    if (!file.type.startsWith('image/')) {
      setSaveMessage('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imageUrl = e.target.result;
        const token = localStorage.getItem('token');
        
        console.log('🔄 Uploading profile picture...');
        
        const response = await fetch(`${API_BASE_URL}/api/users/profile/picture`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ profilePicture: imageUrl })
        });
        
        if (response.ok) {
          const updatedUser = await response.json();
          console.log('✅ Profile picture saved:', updatedUser);
          
          setUser(updatedUser);
          setFormData(updatedUser);
          
          setSaveMessage('Profile picture updated successfully!');
          setTimeout(() => setSaveMessage(''), 3000);
        } else {
          const errorData = await response.json();
          console.error('❌ Backend error:', errorData);
          throw new Error(errorData.error || 'Failed to save profile picture');
        }
      } catch (error) {
        console.error('❌ Error saving profile picture:', error);
        setSaveMessage(`Error: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    };
    
    reader.onerror = () => {
      console.error('❌ FileReader error');
      setSaveMessage('Error reading image file');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
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
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveMessage(`Error: ${error.message}`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageError = (e) => {
    console.error('❌ Image load error:', e.target.src);
    e.target.onerror = null;
    
    // Use fallback avatar
    const fallbackAvatar = getFallbackAvatar(user);
    e.target.src = fallbackAvatar;
  };

  const calculateStats = () => {
    const totalMaterials = userMaterials.length;
    const totalQuantity = userMaterials.reduce((sum, material) => sum + (material.quantity || 0), 0);
    const activeListings = userMaterials.filter(m => m.isAvailable).length;
    
    const ecoImpact = userMaterials.reduce((impact, material) => {
      const quantity = material.quantity || 0;
      return impact + (quantity * 2);
    }, 0);

    return { totalMaterials, totalQuantity, activeListings, ecoImpact };
  };

  const stats = calculateStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User not found</h2>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white relative">
            <div className="h-48"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
                <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative -mt-20">
                    <div className="relative group">
                      <img
                        src={user.profilePicture || getFallbackAvatar(user)}
                        alt={user.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl bg-gray-200 object-cover"
                        onError={handleImageError}
                        onLoad={() => console.log('✅ Image loaded successfully')}
                      />
                      <button
                        onClick={triggerFileInput}
                        disabled={isUploading}
                        className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
                        title="Change profile picture"
                      >
                        {isUploading ? '⏳' : '📷'}
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="text-center md:text-left md:mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
                    <p className="text-green-100 text-lg mb-1">{user.company || 'EcoTrade Member'}</p>
                    <p className="text-green-200 text-sm">
                      {user.role} • Member since {new Date(user.createdAt || Date.now()).getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition duration-200 font-medium"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stats.totalMaterials}</div>
                <div className="text-sm text-gray-600">Materials Listed</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stats.totalQuantity}</div>
                <div className="text-sm text-gray-600">Total Units</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{stats.ecoImpact}</div>
                <div className="text-sm text-gray-600">Eco Impact</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-gray-900">{stats.activeListings}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <p className="font-medium">{user.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Member Since</label>
                        <p className="font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <p className="font-medium capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Favorites</h2>
                    <button 
                      onClick={() => setCurrentPage('favorites')}
                      className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                      View My Favorites
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  {canSeeListings ? (
                    <>
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">My Listed Materials</h2>
                        {userMaterials.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="text-4xl mb-4">📦</div>
                            <p className="text-gray-600 mb-4">No materials listed yet.</p>
                            <button
                              onClick={() => setCurrentPage('list-material')}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                              List Your First Material
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {userMaterials.slice(0, 3).map((material) => (
                              <div key={material._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <h3 className="font-medium">{material.title}</h3>
                                  <p className="text-sm text-gray-600">{material.category} • {material.quantity} units</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${
                                  material.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {material.isAvailable ? 'Available' : 'Sold'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-white">
                        <h2 className="text-lg font-bold mb-2">Eco Contribution</h2>
                        <p className="mb-4">Your impact on sustainability</p>
                        <div className="bg-white/20 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span>Environmental Impact</span>
                            <span className="font-bold text-xl">{stats.ecoImpact} pts</span>
                          </div>
                          <div className="w-full bg-white/30 rounded-full h-2">
                            <div 
                              className="bg-white h-2 rounded-full" 
                              style={{ width: `${Math.min(stats.ecoImpact, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                      <div className="text-yellow-600 text-4xl mb-4">📊</div>
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Seller Features</h3>
                      <p className="text-yellow-700 mb-4">
                        Become a seller to access analytics and listing features.
                      </p>
                      <button
                        onClick={() => setCurrentPage('list-material')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Start Selling
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;