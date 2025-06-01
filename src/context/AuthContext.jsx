import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // Your authentication service
import { useNavigate } from 'react-router-dom';

// Create the Authentication Context
const AuthContext = createContext(null);

// AuthProvider component that will wrap your application or parts of it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user object (id, username, email, roles, token, firstName, lastName)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("AuthContext: Failed to parse stored user:", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      const roles = userData.roles || [];
      if (roles.includes('ROLE_LIBRARIAN')) {
        navigate('/librarian/dashboard');
      } else if (roles.includes('ROLE_MEMBER')) {
        navigate('/member/dashboard');
      } else {
        navigate('/');
      }
      return userData;
    } catch (error) {
      console.error('AuthContext login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // New function to update user context after profile changes
  const updateUserContext = (updatedUserData) => {
    // Ensure updatedUserData contains all necessary fields, especially the token
    // The token should ideally come from the existing user state or localStorage
    // if the backend update response doesn't re-issue it.
    
    const currentUserFromStorage = JSON.parse(localStorage.getItem('user'));
    const token = currentUserFromStorage?.token || user?.token; // Prioritize existing token

    const newContextUser = {
        ...user, // Spread existing user data first (like token if not in updatedUserData)
        ...updatedUserData, // Then spread updated fields from backend
        token: token || updatedUserData.token, // Ensure token is preserved or updated if re-issued
    };

    setUser(newContextUser);
    localStorage.setItem('user', JSON.stringify(newContextUser));
    console.log("AuthContext: User context updated with:", newContextUser);
  };


  const value = {
    user,
    isAuthenticated: !!user,
    token: user?.token,
    login,
    logout,
    updateUserContext, // Expose the new function
    loading
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
