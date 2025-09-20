import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MarketplacePage from './components/MarketplacePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import ListMaterialPage from './components/ListMaterialPage';
//import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulated data fetch
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setMaterials([
        {
          id: 1,
          title: 'Industrial Wood Pallets',
          description: 'Good condition wood pallets from our warehouse. Perfect for recycling or repurposing.',
          price: 0,
          isFree: true,
          quantity: 120,
          unit: 'pallets',
          category: 'Wood',
          company: 'EcoWood Industries',
          location: 'San Francisco, CA',
          distance: '2.3',
          image: 'https://placeholder-image-service.onrender.com/image/400x300?prompt=stack%20of%20wooden%20pallets%20in%20industrial%20setting&id=wood-pallets-1&customer_id=cus_T1tv0eR5QTEo43'
        },
        {
          id: 2,
          title: 'Plastic Packaging Materials',
          description: 'Clean plastic packaging materials available for reuse. Various sizes and types.',
          price: 45,
          isFree: false,
          quantity: 500,
          unit: 'kg',
          category: 'Plastic',
          company: 'GreenPack Solutions',
          location: 'Oakland, CA',
          distance: '8.7',
          image: 'https://placeholder-image-service.onrender.com/image/400x300?prompt=clean%20plastic%20packaging%20materials%20stacked%20neatly&id=plastic-packaging-1&customer_id=cus_T1tv0eR5QTEo43'
        },
        {
          id: 3,
          title: 'Metal Scraps - Aluminum',
          description: 'High-quality aluminum scraps from manufacturing process. Ready for recycling.',
          price: 120,
          isFree: false,
          quantity: 800,
          unit: 'kg',
          category: 'Metal',
          company: 'MetalWorks Inc',
          location: 'San Jose, CA',
          distance: '15.2',
          image: 'https://placeholder-image-service.onrender.com/image/400x300?prompt=shiny%20aluminum%20metal%20scraps%20in%20industrial%20yard&id=metal-scraps-1&customer_id=cus_T1tv0eR5QTEo43'
        },
        {
          id: 4,
          title: 'Cardboard Boxes',
          description: 'Large quantity of cardboard boxes in excellent condition. Various sizes available.',
          price: 0,
          isFree: true,
          quantity: 200,
          unit: 'boxes',
          category: 'Paper',
          company: 'BoxHub',
          location: 'Berkeley, CA',
          distance: '5.5',
          image: 'https://placeholder-image-service.onrender.com/image/400x300?prompt=stack%20of%20cardboard%20boxes%20in%20warehouse&id=cardboard-boxes-1&customer_id=cus_T1tv0eR5QTEo43'
        }
      ]);
      setIsLoading(false);
    }, 1000);
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

  const handleLogin = (email, password) => {
    // Simulate login
    setUser({
      id: 1,
      name: 'Demo User',
      email: email,
      company: 'Demo Company',
      role: 'buyer'
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (userData) => {
    // Simulate registration
    setUser({
      id: 2,
      name: userData.name,
      email: userData.email,
      company: userData.companyName,
      role: userData.companyType
    });
  };

  const addToCart = (material) => {
    setCartItems([...cartItems, {...material, cartId: Date.now()}]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'marketplace':
        return <MarketplacePage 
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
        />;
      case 'login':
        return <LoginPage 
          handleLogin={handleLogin} 
          setCurrentPage={setCurrentPage}
        />;
      case 'register':
        return <RegisterPage 
          handleRegister={handleRegister} 
          setCurrentPage={setCurrentPage}
        />;
      case 'cart':
        return <CartPage 
          cartItems={cartItems} 
          removeFromCart={removeFromCart}
          setCurrentPage={setCurrentPage}
          user={user}
        />;
      case 'list-material':
        return <ListMaterialPage 
          user={user}
          setCurrentPage={setCurrentPage}
        />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        user={user}
        handleLogout={handleLogout}
        cartItemsCount={cartItems.length}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {/* <Footer setCurrentPage={setCurrentPage} /> */}
    </div>
  );
}

export default App;