import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MarketplacePage from './components/MarketplacePage';
import CartPage from './components/CartPage';
import ListMaterialPage from './components/ListMaterialPage';
import AuthForm from './components/AuthForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Main App Component
function AppContent() {
  const { user, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Fetch materials from backend
  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/materials`);
        if (response.ok) {
          const data = await response.json();
          // ✅ Handle both array and object responses safely
          const materialsArray = Array.isArray(data) ? data : (data.materials || []);
          setMaterials(materialsArray);
          setFilteredMaterials(materialsArray);
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
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
        setMaterials([]); // ✅ Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Filter materials based on search and filters
  useEffect(() => {
    // ✅ Add null check to prevent "materials is not iterable" error
    let results = Array.isArray(materials) ? materials : [];

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
      setAuthError('');
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
        setCurrentPage('home');
        return true;
      } else {
        setAuthError(data.error || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Login failed. Please try again.');
      return false;
    }
  };

  const handleRegister = async (userData) => {
    try {
      setAuthError('');
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
        setCurrentPage('home');
        return true;
      } else {
        setAuthError(data.error || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError('Registration failed. Please try again.');
      return false;
    }
  };

  const addToCart = (material) => {
    if (!user) {
      setAuthMode('login');
      setCurrentPage('authform');
      return;
    }
    setCartItems([...cartItems, { ...material, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setAuthError('');
  };

  // ✅ Handle logout with cleanup
  const handleLogout = () => {
    logout();
    setCartItems([]); // Clear cart on logout
    setCurrentPage('home'); // Redirect to home
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            user={user} 
            setAuthMode={setAuthMode} 
          />
        );
      case 'marketplace':
        return (
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
            setCurrentPage={setCurrentPage}
            setAuthMode={setAuthMode}
          />
        );
      case 'authform':
        return (
          <AuthForm 
            onLogin={handleLogin}
            onRegister={handleRegister}
            mode={authMode}
            switchMode={switchAuthMode}
            onSuccess={() => setCurrentPage('home')}
            onCancel={() => setCurrentPage('home')}
            error={authError}
          />
        );
      case 'list-material':
        return (
          <ListMaterialPage 
            user={user}
            setCurrentPage={setCurrentPage}
            openAuthModal={(mode) => {
              setAuthMode(mode);
              setCurrentPage('authform');
            }}
            API_BASE_URL={API_BASE_URL}
          />
        );
      case 'cart':
        return (
          <CartPage 
            cartItems={cartItems} 
            removeFromCart={removeFromCart}
            setCurrentPage={setCurrentPage}
            user={user}
          />
        );
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            user={user} 
            setAuthMode={setAuthMode} 
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user} 
        handleLogout={handleLogout} // ✅ Pass the logout function
        cartItemsCount={cartItems.length}
        setAuthMode={setAuthMode}
      />
      {renderCurrentPage()}
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