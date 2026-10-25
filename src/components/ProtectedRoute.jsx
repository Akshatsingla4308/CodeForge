import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Simple ProtectedRoute wrapper to guard private routes
export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is not authenticated, redirect directly to Sign In page
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
