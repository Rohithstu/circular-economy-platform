import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Building, 
  Leaf, 
  ChevronLeft, 
  ChevronRight, 
  Eye 
} from 'lucide-react';

const MaterialCard = ({ 
  material, 
  addToCart, 
  user, 
  setCurrentPage, 
  setAuthMode, 
  onQuickView, 
  isFavorite = false, 
  onToggleFavorite,
  viewMode = 'grid'
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Parse images safely
  const getImages = () => {
    const list = [];
    if (material.imageUrl) list.push(material.imageUrl);
    if (material.images && Array.isArray(material.images) && material.images.length > 0) {
      list.push(...material.images);
    }
    if (material.image && !list.includes(material.image)) {
      list.push(material.image);
    }
    return list.length > 0 
      ? list 
      : ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'];
  };

  const images = getImages();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      setAuthMode('login');
      setCurrentPage('authform');
      return;
    }
    addToCart(material);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      setAuthMode('login');
      setCurrentPage('authform');
      return;
    }
    if (onToggleFavorite) {
      onToggleFavorite(material);
    }
  };

  const getCategoryStyles = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('wood')) return 'bg-amber-100/95 text-amber-800 border-amber-200';
    if (cat.includes('plastic')) return 'bg-cyan-100/95 text-cyan-800 border-cyan-200';
    if (cat.includes('metal')) return 'bg-slate-100/95 text-slate-800 border-slate-200';
    if (cat.includes('paper')) return 'bg-emerald-100/95 text-emerald-800 border-emerald-200';
    if (cat.includes('glass')) return 'bg-teal-100/95 text-teal-800 border-teal-200';
    if (cat.includes('textile')) return 'bg-rose-100/95 text-rose-800 border-rose-200';
    if (cat.includes('electronic')) return 'bg-purple-100/95 text-purple-800 border-purple-200';
    return 'bg-emerald-100/95 text-emerald-800 border-emerald-200';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const co2Impact = material.carbonSavedKg 
    ? Math.round(material.carbonSavedKg) 
    : Math.round((material.quantity || 50) * 1.6);

  // LIST VIEW LAYOUT
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onQuickView && onQuickView(material)}
        className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-center p-3 sm:p-4 gap-4 cursor-pointer"
      >
        {/* Thumbnail Fixed */}
        <div className="relative w-full sm:w-48 h-36 shrink-0 rounded-xl overflow-hidden bg-slate-900">
          <img
            src={images[0]}
            alt={material.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryStyles(material.category)}`}>
            {material.category || 'Surplus'}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="font-semibold text-emerald-700">{material.company || 'Verified Supplier'}</span>
              <span>{material.location || 'San Francisco, CA'}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
              {material.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              {material.description}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              <Leaf className="w-3 h-3 text-emerald-600" />
              {co2Impact}kg CO₂ Avoided
            </span>
            <span className="text-gray-400">Qty: {material.quantity} {material.unit}</span>
          </div>
        </div>

        {/* Action */}
        <div className="sm:border-l sm:border-slate-100 sm:pl-4 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
          <div className="text-left sm:text-right">
            <div className="text-xl font-extrabold text-emerald-700">
              {material.isFree ? 'Free' : `$${material.price || 0}`}
              {!material.isFree && <span className="text-xs font-normal text-gray-400">/{material.unit}</span>}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  // GRID VIEW (UNIFORM CONSTANT PROPORTIONS)
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView && onQuickView(material)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[450px] justify-between cursor-pointer transform hover:-translate-y-1"
    >
      {/* Visual Image Section with STRICT CONSTANT HEIGHT */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden bg-slate-900">
        <img
          src={images[currentImageIndex]}
          alt={material.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Ambient Gradient Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border shadow-xs pointer-events-auto backdrop-blur-md ${getCategoryStyles(material.category)}`}>
            {material.category || 'Surplus'}
          </span>

          {/* Favorite Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-sm ${
              isFavorite 
                ? 'bg-rose-500 text-white scale-110' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-rose-500'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom tags in image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <div className="flex items-center gap-1 text-[11px] font-bold bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>{co2Impact}kg CO₂ avoided</span>
          </div>

          {/* Quick View Pill on Hover */}
          <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <span className="flex items-center gap-1 text-[11px] font-bold bg-white text-gray-900 px-2.5 py-1 rounded-full shadow-md">
              <Eye className="w-3 h-3 text-emerald-600" />
              Quick View
            </span>
          </div>
        </div>

        {/* Multi-image Prev/Next Controls */}
        {images.length > 1 && isHovered && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content Section with Controlled Proportions */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Supplier and Location row */}
          <div className="h-5 flex items-center justify-between text-xs text-gray-500 mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold truncate max-w-[55%]">
              <Building className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{material.company || material.sellerName || 'Verified Supplier'}</span>
            </span>
            <span className="flex items-center gap-1 text-gray-400 shrink-0 text-xxs">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{material.location || 'San Francisco, CA'}</span>
            </span>
          </div>

          {/* Material Title (Strict 2-line max height) */}
          <h3 className="h-11 line-clamp-2 overflow-hidden font-bold text-gray-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors mb-1.5">
            {material.title}
          </h3>

          {/* Description snippet (Strict 2-line max height) */}
          <p className="h-9 line-clamp-2 overflow-hidden text-gray-500 text-xs leading-relaxed">
            {material.description || 'Clean surplus resource ready for circular manufacturing or recycling.'}
          </p>
        </div>

        {/* Price and Cart Footer */}
        <div className="h-12 pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-emerald-700">
                {material.isFree ? 'Free' : `$${material.price || 0}`}
              </span>
              {!material.isFree && (
                <span className="text-[11px] font-medium text-gray-400">/{material.unit || 'unit'}</span>
              )}
            </div>
            <div className="text-[10px] text-gray-400 font-medium">
              Lot: {material.quantity || 100} {material.unit || 'units'}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm ${
              justAdded
                ? 'bg-emerald-700 text-white scale-95'
                : 'btn-primary-glow'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {justAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;