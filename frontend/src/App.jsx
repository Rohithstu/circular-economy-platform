// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "./components/Marketplace";
import AuthForm from "./components/AuthForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Marketplace onLogout={handleLogout} />
            ) : (
              <AuthForm onLogin={handleLogin} />
            )
          }
        />

        {/* Marketplace route (protected) */}
        <Route
          path="/marketplace"
          element={
            isAuthenticated ? (
              <Marketplace onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
