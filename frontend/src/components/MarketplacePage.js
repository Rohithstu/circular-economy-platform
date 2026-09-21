import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  PlusCircle, 
  Leaf, 
  Layers, 
  Sparkles, 
  ArrowUpDown, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import MaterialCard from './MaterialCard';
import MaterialDetailModal from './MaterialDetailModal';

const MarketplacePage = ({ 
  materials = [], 
  isLoading = false, 
  searchTerm = '', 
  setSearchTerm, 
  categoryFilter = 'all', 
  setCategoryFilter, 
  priceFilter = 'all', 
  setPriceFilter, 
  addToCart, 
  user, 
  setCurrentPage, 
  setAuthMode,
  favorites = [],
  toggleFavorite
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [conditionFilter, setConditionFilter] = useState('all');

  // Categories list
  const categories = [
    { label: 'All Resources', value: 'all', icon: '🌐' },
    { label: 'Wood & Pallets', value: 'wood', icon: '🪵' },
    { label: 'Plastics & Resins', value: 'plastic', icon: '♻️' },
    { label: 'Metals & Alloys', value: 'metal', icon: '🔩' },
    { label: 'Paper & Cardboard', value: 'paper', icon: '📦' },
    { label: 'Glass & Cullet', value: 'glass', icon: '🧪' },
    { label: 'Textiles & Yarn', value: 'textile', icon: '🧵' },
    { label: 'Electronics', value: 'electronic', icon: '⚡' },
    { label: 'Other', value: 'other', icon: '✨' }
  ];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Free for Recycling', value: 'free' },
    { label: 'Under $100', value: '0-100' },
    { label: '$100 – $500', value: '100-500' },
    { label: '$500+', value: '500+' }
  ];

  // Safe materials array
  const safeMaterials = Array.isArray(materials) ? materials : [];

  // Filter & Sort Logic
  const filteredAndSortedMaterials = useMemo(() => {
    let result = [...safeMaterials];

    // Search query filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(m => 
        (m.title && m.title.toLowerCase().includes(q)) ||
        (m.description && m.description.toLowerCase().includes(q)) ||
        (m.category && m.category.toLowerCase().includes(q)) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        (m.company && m.company.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(m => (m.category || '').toLowerCase() === categoryFilter.toLowerCase());
    }

    // Price filter
    if (priceFilter === 'free') {
      result = result.filter(m => m.isFree || m.price === 0);
    } else if (priceFilter === '0-100') {
      result = result.filter(m => !m.isFree && m.price > 0 && m.price <= 100);
    } else if (priceFilter === '100-500') {
      result = result.filter(m => !m.isFree && m.price > 100 && m.price <= 500);
    } else if (priceFilter === '500+') {
      result = result.filter(m => !m.isFree && m.price > 500);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'co2') return ((b.quantity || 0) * 2) - ((a.quantity || 0) * 2);
      if (sortBy === 'name') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [safeMaterials, searchTerm, categoryFilter, priceFilter, sortBy]);

  const activeFilterCount = (categoryFilter !== 'all' ? 1 : 0) + (priceFilter !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0);

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setPriceFilter('all');
    setSortBy('newest');
  };

  const totalCO2Offset = useMemo(() => {
    return filteredAndSortedMaterials.reduce((sum, item) => sum + Math.round((item.quantity || 50) * 1.6), 0);
  }, [filteredAndSortedMaterials]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* Top Banner with Radiant Gradient & Real-time Stats */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 text-white pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-eco-grid opacity-15 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Live Circular Material Index
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                Secondary Resource Exchange
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal">
                Direct peer-to-peer sourcing of manufacturing byproducts, industrial offcuts, and certified recycled feedstocks.
              </p>
            </div>

            {/* Quick Action Button for Listing */}
            {user && (
              <button
                onClick={() => setCurrentPage('list-material')}
                className="btn-primary-glow px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 self-start md:self-center shrink-0 shadow-xl"
              >
                <PlusCircle className="w-4 h-4" />
                Post Material Surplus
              </button>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-xs text-slate-400">Available Listings</div>
              <div className="text-xl font-bold text-emerald-400">{filteredAndSortedMaterials.length} lots</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-xs text-slate-400">Scope 3 CO₂ Offset</div>
              <div className="text-xl font-bold text-teal-400">{totalCO2Offset.toLocaleString()} kg</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-xs text-slate-400">Verified Quality Assays</div>
              <div className="text-xl font-bold text-green-400">100% ISO-traceable</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-xs text-slate-400">Escrow Security</div>
              <div className="text-xl font-bold text-emerald-300">Guaranteed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Sticky Filter & Search Hub */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-4 sm:p-6 mb-8 backdrop-blur-md">
          
          {/* Top Search & Sorting Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by material name, alloy grade, location, or supplier..."
                className="eco-input pl-11 pr-10 text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Price Filter Dropdown */}
            <div className="md:col-span-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="eco-input text-sm cursor-pointer font-medium"
              >
                {priceRanges.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="eco-input text-sm cursor-pointer font-medium"
              >
                <option value="newest">Newest Lots First</option>
                <option value="co2">Highest CO₂ Reduction</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all duration-200 flex items-center gap-1.5 border ${
                  categoryFilter === cat.value
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Active Filter Chips & View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Showing {filteredAndSortedMaterials.length} available resources
              </span>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-emerald-700 font-bold hover:underline flex items-center gap-1 ml-2"
                >
                  <RefreshCw className="w-3 h-3" />
                  Reset ({activeFilterCount}) filters
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="spinner mb-4" />
            <p className="text-slate-500 text-sm font-medium">Scanning circular exchange feed...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAndSortedMaterials.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-lg max-w-xl mx-auto my-12 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center text-4xl">
              🌱
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Matching Resources</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              We couldn't find any surplus matching your current search or filter combinations. Try resetting filters or list this material request.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="btn-secondary-glass px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                Clear All Filters
              </button>
              {user && (
                <button
                  onClick={() => setCurrentPage('list-material')}
                  className="btn-primary-glow px-5 py-2.5 rounded-xl font-bold text-xs"
                >
                  List First Lot
                </button>
              )}
            </div>
          </div>
        )}

        {/* Materials Grid / List */}
        {!isLoading && filteredAndSortedMaterials.length > 0 && (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up"
              : "space-y-4 animate-fade-in-up"
          }>
            {filteredAndSortedMaterials.map((material) => (
              <MaterialCard
                key={material._id || material.id}
                material={material}
                addToCart={addToCart}
                user={user}
                setCurrentPage={setCurrentPage}
                setAuthMode={setAuthMode}
                onQuickView={(mat) => setSelectedMaterial(mat)}
                isFavorite={favorites.some(fav => (fav.material?._id || fav.material?.id || fav._id) === (material._id || material.id))}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View / Detail Modal */}
      {selectedMaterial && (
        <MaterialDetailModal
          material={selectedMaterial}
          isOpen={Boolean(selectedMaterial)}
          onClose={() => setSelectedMaterial(null)}
          addToCart={addToCart}
          user={user}
          setCurrentPage={setCurrentPage}
          setAuthMode={setAuthMode}
          isFavorite={favorites.some(fav => (fav.material?._id || fav.material?.id || fav._id) === (selectedMaterial._id || selectedMaterial.id))}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
};

export default MarketplacePage;