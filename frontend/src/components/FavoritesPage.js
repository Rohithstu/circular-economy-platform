import React, { useState, useEffect } from 'react';
import MaterialCard from './MaterialCard';

const FavoritesPage = ({ user, setCurrentPage }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      } else {
        setError('Failed to fetch favorites');
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Error loading favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (materialId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/favorites/${materialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setFavorites(favorites.filter(fav => fav.material._id !== materialId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-green-100/50">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your favorites.</p>
          <button
            onClick={() => setCurrentPage('authform')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 font-medium"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-teal-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Favorites</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your saved materials and products for quick access
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-red-100">
            <div className="text-red-500 text-2xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Favorites</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchFavorites}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-green-100/50">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No favorites yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring the marketplace and add materials to your favorites for quick access later.
              </p>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="bg-green-600 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 font-medium"
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-green-600">{favorites.length}</span> favorite materials
              </p>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Add More Favorites
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite, index) => (
                <div key={favorite._id} className="relative group">
                  <MaterialCard
                    material={favorite.material}
                    addToCart={() => {}}
                    user={user}
                    setCurrentPage={setCurrentPage}
                    setAuthMode={() => {}}
                  />
                  <button
                    onClick={() => removeFromFavorites(favorite.material._id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition duration-200 opacity-0 group-hover:opacity-100"
                    title="Remove from favorites"
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;