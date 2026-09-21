import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Trash2, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import MaterialCard from './MaterialCard';
import MaterialDetailModal from './MaterialDetailModal';

const FavoritesPage = ({ user, setCurrentPage, setAuthMode, addToCart }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/favorites', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setFavorites(Array.isArray(data) ? data : []);
      } else {
        // Fallback demo favorites if empty/offline
        setFavorites([]);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (materialId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/favorites/${materialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      setFavorites(prev => prev.filter(fav => (fav.material?._id || fav.material?.id || fav._id) !== materialId));
    } catch (err) {
      console.error(err);
      setFavorites(prev => prev.filter(fav => (fav.material?._id || fav.material?.id || fav._id) !== materialId));
    }
  };

  const handleMoveAllToCart = () => {
    favorites.forEach(fav => {
      const mat = fav.material || fav;
      if (mat) addToCart(mat);
    });
    setCurrentPage('cart');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center text-3xl">
            ❤️
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Saved Listings</h2>
          <p className="text-slate-500 text-sm mb-6">
            Sign in to access your saved material lots, price drop alerts, and circular bookmarks.
          </p>
          <button
            onClick={() => {
              if (setAuthMode) setAuthMode('login');
              setCurrentPage('authform');
            }}
            className="w-full btn-primary-glow py-3.5 rounded-2xl font-bold text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              Saved Watchlist
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bookmarked Resources ({favorites.length})
            </h1>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToCart}
                className="btn-primary-glow px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Move All to Cart
              </button>
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="btn-secondary-glass px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4" />
                Find More
              </button>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center py-24">
            <div className="spinner" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && favorites.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-xl mx-auto my-12 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-4 bg-rose-50 rounded-full flex items-center justify-center text-4xl">
              ❤️
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Saved Lots Yet</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              When you find surplus lots or raw feedstocks you are interested in, click the heart icon on any card to save it here for quick requisitioning.
            </p>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="btn-primary-glow px-6 py-3.5 rounded-2xl font-bold text-sm inline-flex items-center gap-2"
            >
              Browse Live Marketplace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && favorites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {favorites.map((fav) => {
              const material = fav.material || fav;
              const matId = material._id || material.id;
              return (
                <div key={matId || Math.random()} className="relative group">
                  <MaterialCard
                    material={material}
                    addToCart={addToCart}
                    user={user}
                    setCurrentPage={setCurrentPage}
                    setAuthMode={setAuthMode}
                    onQuickView={(m) => setSelectedMaterial(m)}
                    isFavorite={true}
                    onToggleFavorite={() => removeFromFavorites(matId)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Detail Modal */}
      {selectedMaterial && (
        <MaterialDetailModal
          material={selectedMaterial}
          isOpen={Boolean(selectedMaterial)}
          onClose={() => setSelectedMaterial(null)}
          addToCart={addToCart}
          user={user}
          setCurrentPage={setCurrentPage}
          setAuthMode={setAuthMode}
          isFavorite={true}
          toggleFavorite={() => removeFromFavorites(selectedMaterial._id || selectedMaterial.id)}
        />
      )}
    </div>
  );
};

export default FavoritesPage;