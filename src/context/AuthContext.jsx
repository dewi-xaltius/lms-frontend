import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // Your authentication service
import { useNavigate } from 'react-router-dom';

// Create the Authentication Context
const AuthContext = createContext(null);

// AuthProvider component that will wrap your application or parts of it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user object (id, username, email, roles, token)
  const [loading, setLoading] = useState(true); // To check initial auth status
  const navigate = useNavigate();

  // Effect to load user from localStorage on initial app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // You might want to add a check here to see if the token is still valid
        // e.g., by decoding it (if not expired) or making a quick /verifyToken backend call.
        // For now, we'll assume if it's stored, it's valid for this session.
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    }
    setLoading(false); // Finished loading initial auth state
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password); // userData includes token, id, username, email, roles
      setUser(userData); // Set user state
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

      // Navigate based on role from userData
      const roles = userData.roles || [];
      if (roles.includes('ROLE_LIBRARIAN')) {
        navigate('/librarian/dashboard');
      } else if (roles.includes('ROLE_MEMBER')) {
        navigate('/member/dashboard');
      } else {
        navigate('/'); // Fallback or default dashboard
      }
      return userData; // Return user data for any component-specific handling
    } catch (error) {
      console.error('AuthContext login error:', error);
      // The error should have been processed by authService, re-throw for the component
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout(); // Perform any backend logout tasks if necessary (currently just console.log)
    setUser(null); // Clear user state
    localStorage.removeItem('user'); // Remove user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  // Value provided by the context
  const value = {
    user,         // The current user object (or null if not logged in)
    isAuthenticated: !!user, // Boolean: true if user is logged in
    token: user?.token,      // The JWT token
    login,        // Login function
    logout,       // Logout function
    loading       // Auth loading state (useful for initial load)
  };

  // Don't render children until initial loading of auth state is complete
  // This prevents UI flicker or attempting to access protected routes prematurely
  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner component
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
