import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const FavoritesButton = ({ materialId, userId, className = '', onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check local storage for bookmarks
    try {
      const saved = localStorage.getItem('ecotrade_favs');
      if (saved) {
        const favs = JSON.parse(saved);
        if (favs.includes(materialId)) {
          setIsFavorite(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [materialId]);

  const toggleFavorite = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    
    setIsLoading(true);
    try {
      const newStatus = !isFavorite;
      setIsFavorite(newStatus);

      // Local storage persistence
      try {
        const saved = localStorage.getItem('ecotrade_favs');
        let favs = saved ? JSON.parse(saved) : [];
        if (newStatus) {
          if (!favs.includes(materialId)) favs.push(materialId);
        } else {
          favs = favs.filter(id => id !== materialId);
        }
        localStorage.setItem('ecotrade_favs', JSON.stringify(favs));
      } catch (err) {
        console.error(err);
      }

      // Backend sync attempt if logged in
      const token = localStorage.getItem('token');
      if (token) {
        if (newStatus) {
          await fetch('http://localhost:5000/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ materialId })
          });
        } else {
          await fetch(`http://localhost:5000/api/favorites/${materialId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
      }

      if (onToggle) onToggle(newStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90 ${
        isFavorite 
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-white/10'
      } ${className}`}
      title={isFavorite ? 'Remove from Saved Lots' : 'Save to Favorites'}
    >
      <Heart className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-current scale-110' : ''}`} />
    </button>
  );
};

export default FavoritesButton;