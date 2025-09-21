import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MarketplacePage from './components/MarketplacePage';
import CartPage from './components/CartPage';
import ListMaterialPage from './components/ListMaterialPage';
import AuthForm from './components/AuthForm';
import BuyerDashboard from './components/dashboard/BuyerDashboard';
import SellerDashboard from './components/dashboard/SellerDashboard';
import SellerListingsPage from './components/dashboard/SellerListingsPage';
import SellerOrdersPage from './components/dashboard/SellerOrdersPage';
import BuyerOrdersPage from './components/dashboard/BuyerOrdersPage';
import DashboardLayout from './components/layout/DashboardLayout';
import RouteGuard from './components/RouteGuard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Main App Component
function AppContent() {
  const { user, login, logout } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/materials`);
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
          setFilteredMaterials(data);
        } else {
          console.error('Failed to fetch materials');
          // Fallback to mock data
          setMaterials([
            {
              _id: 1,
              title: 'Industrial Wood Pallets',
              description: 'Good condition wood pallets from our warehouse. Perfect for recycling or repurposing.',
              price: 0,
              isFree: true,
              quantity: 120,
              unit: 'pallets',
              category: 'Wood',
              company: 'EcoWood Industries',
              location: 'San Francisco, CA',
              image: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80'
            },
            {
              _id: 2,
              title: 'Plastic Packaging Materials',
              description: 'Clean plastic packaging materials available for reuse. Various sizes and types.',
              price: 45,
              isFree: false,
              quantity: 500,
              unit: 'kg',
              category: 'Plastic',
              company: 'GreenPack Solutions',
              location: 'Oakland, CA',
              image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80'
            },
            {
              _id: 3,
              title: 'Cardboard Boxes',
              description: 'Assorted cardboard boxes in good condition. Various sizes available.',
              price: 0,
              isFree: true,
              quantity: 200,
              unit: 'boxes',
              category: 'Paper',
              company: 'EcoPackaging Inc.',
              location: 'San Jose, CA',
              image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80'
            },
            {
              _id: 4,
              title: 'Metal Scraps',
              description: 'Assorted metal scraps from manufacturing process. Primarily steel and aluminum.',
              price: 120,
              isFree: false,
              quantity: 800,
              unit: 'kg',
              category: 'Metal',
              company: 'MetalWorks Ltd.',
              location: 'Sacramento, CA',
              image: 'https://images.unsplash.com/photo-1583226120755-6e32f9d3b31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Filter materials based on search and filters
  useEffect(() => {
    let results = materials;
    
    if (searchTerm) {
      results = results.filter(material => 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      results = results.filter(material => material.category === categoryFilter);
    }
    
    if (priceFilter === 'free') {
      results = results.filter(material => material.isFree);
    } else if (priceFilter === 'paid') {
      results = results.filter(material => !material.isFree);
    }
    
    setFilteredMaterials(results);
  }, [materials, searchTerm, categoryFilter, priceFilter]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        return true;
      } else {
        alert(data.error || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
      return false;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        login(data.user, data.token);
        return true;
      } else {
        alert(data.error || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
      return false;
    }
  };

  const addToCart = (material) => {
    if (!user) {
      setAuthMode('login');
      return;
    }
    setCartItems([...cartItems, {...material, cartId: Date.now()}]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar 
                user={user} 
                logout={logout}
                cartItemsCount={cartItems.length}
                setAuthMode={setAuthMode}
              />
              <HomePage user={user} setAuthMode={setAuthMode} />
            </>
          } />
          
          <Route path="/marketplace" element={
            <>
              <Navbar 
                user={user} 
                logout={logout}
                cartItemsCount={cartItems.length}
                setAuthMode={setAuthMode}
              />
              <MarketplacePage 
                materials={filteredMaterials} 
                isLoading={isLoading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                addToCart={addToCart}
                user={user}
                setAuthMode={setAuthMode}
              />
            </>
          } />
          
          <Route path="/auth" element={
            <AuthForm 
              onLogin={handleLogin}
              onRegister={handleRegister}
              mode={authMode}
              switchMode={switchAuthMode}
              onCancel={() => window.history.back()}
            />
          } />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <RouteGuard>
              <DashboardLayout user={user} logout={logout} cartItemsCount={cartItems.length} />
            </RouteGuard>
          }>
            {/* Buyer Routes */}
            <Route path="buyer" element={
              <RouteGuard requiredRole="buyer">
                <BuyerDashboard />
              </RouteGuard>
            } />
            
            <Route path="buyer/orders" element={
              <RouteGuard requiredRole="buyer">
                <BuyerOrdersPage />
              </RouteGuard>
            } />
            
            <Route path="buyer/cart" element={
              <RouteGuard requiredRole="buyer">
                <CartPage 
                  cartItems={cartItems} 
                  removeFromCart={removeFromCart}
                  user={user}
                />
              </RouteGuard>
            } />
            
            {/* Seller Routes */}
            <Route path="seller" element={
              <RouteGuard requiredRole="seller">
                <SellerDashboard />
              </RouteGuard>
            } />
            
            <Route path="seller/listings" element={
              <RouteGuard requiredRole="seller">
                <SellerListingsPage />
              </RouteGuard>
            } />
            
            <Route path="seller/orders" element={
              <RouteGuard requiredRole="seller">
                <SellerOrdersPage />
              </RouteGuard>
            } />
            
            <Route path="seller/listings/new" element={
              <RouteGuard requiredRole="seller">
                <ListMaterialPage 
                  user={user}
                  API_BASE_URL={API_BASE_URL}
                />
              </RouteGuard>
            } />
            
            {/* Shared Routes */}
            <Route index element={<Navigate to={user?.isSeller ? "seller" : "buyer"} replace />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

// Main App Wrapper
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;