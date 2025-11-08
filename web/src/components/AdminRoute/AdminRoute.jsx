import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  // Check if user is authenticated and has admin role
  const isAuthenticatedAdmin = user && isAdmin();

  if (!isAuthenticatedAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;