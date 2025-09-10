import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import Marketplace from "./components/Marketplace";
import AuthForm from "./components/AuthForm";
import Matches from "./components/Matches";
import Dashboard from "./components/Dashboard";
import Logistics from "./components/Logistics";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">CircularExchange</h1>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-8">
                  <Link
                    to="/marketplace"
                    className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Marketplace
                  </Link>
                  <Link
                    to="/matches"
                    className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Matches
                  </Link>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/logistics"
                    className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Logistics
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* Page Routes */}
        <Routes>
          {/* Login page */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/marketplace" replace />
              ) : (
                <AuthForm onLogin={handleLogin} />
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/marketplace"
            element={
              isAuthenticated ? <Marketplace /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/matches"
            element={
              isAuthenticated ? <Matches /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/logistics"
            element={
              isAuthenticated ? <Logistics /> : <Navigate to="/" replace />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
