import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Your AuthContext

/**
 * A component to protect routes based on authentication status and user roles.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The component/elements to render if the user is authorized.
 * @param {string[]} [props.allowedRoles] - Optional array of roles allowed to access this route.
 * If not provided, only authentication is checked.
 * Example: ["ROLE_MEMBER", "ROLE_LIBRARIAN"]
 * @returns {React.ReactElement} The element to render (either the protected component or a redirect).
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Log current state from AuthContext and props
  console.log('ProtectedRoute - Path:', location.pathname);
  console.log('ProtectedRoute - Loading state:', loading);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - User object:', user);
  console.log('ProtectedRoute - User roles specifically:', user?.roles);
  console.log('ProtectedRoute - Allowed roles for this route:', allowedRoles);

  if (loading) {
    console.log('ProtectedRoute - Rendering loading UI because "loading" is true.');
    return <div>Loading...</div>; // Or your app-wide Loader component
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login. Current location saved:', location);
    // User not authenticated, redirect to login page.
    // Pass the current location in state so we can redirect back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles are specified, check if the user has at least one of them.
  if (allowedRoles && allowedRoles.length > 0) {
    const userRoles = user?.roles || []; // Get roles from user object in AuthContext
    const hasRequiredRole = userRoles.some(role => allowedRoles.includes(role));

    if (!hasRequiredRole) {
      console.log('ProtectedRoute - Role check failed. User roles:', userRoles, 'Allowed roles:', allowedRoles);
      // User authenticated but does not have the required role.
      alert("Access Denied: You do not have the required role to view this page."); // More direct alert
      // Redirect to a safe page, like login or a generic unauthorized page if you create one.
      // Avoid redirecting to the same page or a page that might also require specific roles they don't have,
      // which could cause redirect loops.
      return <Navigate to="/login" replace />; // Simplest redirect for now
    }
  }

  // User is authenticated and has the required role (if specified), render the children.
  console.log('ProtectedRoute - Authorized. Rendering children:', children);
  return children;
}

export default ProtectedRoute;
