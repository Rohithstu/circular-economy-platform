// components/RouteGuard.js - Fixed
import React from 'react';
import { Navigate } from 'react-router-dom';

export const BuyerRoute = ({ children, user }) => {
  return user && (user.role === 'buyer' || user.role === 'both') ? children : <Navigate to="/unauthorized" replace />;
};

export const SellerRoute = ({ children, user }) => {
  return user && (user.role === 'seller' || user.role === 'both') ? children : <Navigate to="/unauthorized" replace />;
};

export const ProtectedRoute = ({ children, user }) => {
  return user ? children : <Navigate to="/auth?mode=login" replace />;
};