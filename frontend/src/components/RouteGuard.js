import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const BuyerRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isBuyer ? children : <Navigate to="/unauthorized" replace />;
};

export const SellerRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isSeller ? children : <Navigate to="/unauthorized" replace />;
};

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth?mode=login" replace />;
};