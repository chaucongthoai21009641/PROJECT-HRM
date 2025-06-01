import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userRole, allowedRoles, children }) => {
  if (!userRole) {
    // Redirect to login if no userRole is set
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to a "not authorized" page or login if the role is not allowed
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
