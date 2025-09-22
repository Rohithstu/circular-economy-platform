import React, { useState, useEffect } from 'react';

const FavoritesButton = ({ materialId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, [materialId, userId]);

  const checkFavoriteStatus = async () => {
    if (!userId) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const favorites = await response.json();
      setIsFavorite(favorites.some(fav => fav.material._id === materialId));
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!userId) {
      alert('Please login to add favorites');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      if (isFavorite) {
        await fetch(`/api/favorites/${materialId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ materialId })
        });
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-full ${
        isFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      ♥
    </button>
  );
};

export default FavoritesButton;