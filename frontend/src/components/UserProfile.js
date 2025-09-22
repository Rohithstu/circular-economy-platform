import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId, currentUser }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsEditing(false);
        fetchUserProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
        
        <div className="px-6 py-4">
          <div className="flex items-center space-x-6">
            <img
              src={user.profile?.logo || '/default-avatar.png'}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white -mt-16"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.company}</p>
              <p className="text-sm text-gray-500">Member since {new Date(user.stats.memberSince).toLocaleDateString()}</p>
            </div>
            
            {currentUser?.id === userId && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.rating}/5</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.reviewCount}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.totalListings}</div>
              <div className="text-sm text-gray-600">Listings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.totalSales}</div>
              <div className="text-sm text-gray-600">Sales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          {/* Form fields here */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;