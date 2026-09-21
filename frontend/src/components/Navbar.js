import React, { useState, useEffect } from 'react';
import { 
  Recycle, 
  ShoppingBag, 
  Heart, 
  User, 
  PlusCircle, 
  Bell, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  user, 
  handleLogout, 
  cartItemsCount = 0, 
  favoritesCount = 0,
  setAuthMode,
  onOpenAIModal,
  onOpenSDGModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add enhanced backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const canListMaterial = user && (user.role === 'seller' || user.role === 'both');

  const notifications = [
    { id: 1, text: "High-grade aluminum scrap matched with AutoRecycle Co.", time: "10m ago", read: false },
    { id: 2, text: "Your ESG Carbon Offset badge for September is ready! (+450kg)", time: "1h ago", read: false },
    { id: 3, text: "New price drop on Clean PET Flakes in San Francisco", time: "3h ago", read: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-emerald-500/15 py-2.5' 
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-100 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="flex items-center space-x-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 p-0.5 shadow-md group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-emerald-400 group-hover:rotate-180 transition-transform duration-700" />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-1.5">
                  EcoTrade
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                    2.0
                  </span>
                </span>
                <span className="text-[10px] tracking-wide text-gray-500 font-medium">Circular Resource Exchange</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentPage === 'home'
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/50'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setCurrentPage('marketplace')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  currentPage === 'marketplace'
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/50'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                Marketplace
              </button>

              {user && (
                <button
                  onClick={() => setCurrentPage('favorites')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    currentPage === 'favorites'
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/50'
                      : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  Saved
                </button>
              )}

              <button
                onClick={() => setCurrentPage('list-material')}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  currentPage === 'list-material'
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/50'
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                List Material
              </button>

              {/* 1M1B & IBM SkillsBuild AI + SDG Badges */}
              <button
                onClick={onOpenSDGModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                SDG 12 Hub
              </button>

              <button
                onClick={onOpenAIModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-slate-900 shadow-sm shadow-emerald-500/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                IBM Granite AI
              </button>
            </div>
          </div>

          {/* Right Action Icons & User Hub */}
          <div className="flex items-center space-x-3">
            
            {/* Quick Search Shortcut */}
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100/80 hover:bg-emerald-50 hover:border-emerald-300 border border-transparent text-gray-500 hover:text-emerald-700 text-xs font-medium transition-all"
              title="Search materials..."
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Search surplus...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white border border-gray-200 rounded text-gray-400 shadow-xs">⌘K</kbd>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                }}
                className="p-2 rounded-xl text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-fade-in-up">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Circular Alerts</span>
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3.5 hover:bg-gray-50 transition text-xs cursor-pointer ${!n.read ? 'bg-emerald-50/30' : ''}`}>
                        <div className="font-medium text-gray-800 mb-1">{n.text}</div>
                        <div className="text-[10px] text-gray-400">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 rounded-xl text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-2.5 p-1.5 pl-2 rounded-2xl hover:bg-emerald-50/70 border border-gray-200/80 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-sm">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.name} 
                        className="w-full h-full object-cover rounded-full" 
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left pr-1">
                    <span className="text-xs font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold capitalize flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      {user.role || 'Member'}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 animate-fade-in-up">
                    <div className="px-4 py-3 border-b border-gray-100 bg-emerald-50/40">
                      <p className="text-xs font-medium text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user.email || user.name}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                          {user.role} tier
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">{user.company || 'Circular Partner'}</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentPage('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 transition"
                      >
                        <User className="w-4 h-4 text-emerald-600" />
                        Sustainability Profile & Hub
                      </button>

                      <button
                        onClick={() => {
                          setCurrentPage('favorites');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 transition"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        Saved Listings ({favoritesCount})
                      </button>

                      {canListMaterial && (
                        <button
                          onClick={() => {
                            setCurrentPage('list-material');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 transition"
                        >
                          <PlusCircle className="w-4 h-4 text-emerald-600" />
                          List New Surplus
                        </button>
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setCurrentPage('authform');
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setCurrentPage('authform');
                  }}
                  className="btn-primary-glow px-4 py-2 rounded-xl text-sm font-semibold transition duration-200 flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Join Free
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-emerald-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 pt-3 pb-6 space-y-2 animate-fade-in-up">
          <button
            onClick={() => {
              setCurrentPage('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              setCurrentPage('marketplace');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            Marketplace
          </button>
          {user && (
            <>
              <button
                onClick={() => {
                  setCurrentPage('favorites');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                Saved Favorites
              </button>
              <button
                onClick={() => {
                  setCurrentPage('list-material');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                List Surplus Material
              </button>
            </>
          )}
          {!user && (
            <button
              onClick={() => {
                setCurrentPage('list-material');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              List Surplus Material
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;