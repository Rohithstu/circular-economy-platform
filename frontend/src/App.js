import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Marketplace from "./components/Marketplace";
import News from "./components/News";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const HomePage = () => (
    <>
      <Navbar onLogout={isAuthenticated ? handleLogout : null} />
      <main>
        <Hero />
        <HowItWorks />
        <Marketplace />
        <News />
      </main>
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Auth route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthForm onLogin={handleLogin} />
            )
          }
        />

        {/* Protected homepage */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/" replace />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
