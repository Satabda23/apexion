// src/admin/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');

  // If no token or user data, redirect to login
  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;