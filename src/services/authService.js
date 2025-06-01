import axios from 'axios';

// Define the base URL for your backend API
// Make sure this matches the port your Spring Boot backend is running on.
const API_URL = 'http://localhost:8080/api/auth/';

/**
 * Service for handling authentication-related API calls.
 */

// Function to handle user registration
const signup = (firstName, lastName, username, email, password, roles) => {
  return axios.post(API_URL + 'signup', {
    firstName,
    lastName,
    username,
    email,
    password,
    roles, // Send roles as an array of strings, e.g., ["member"]
  });
  // axios.post returns a Promise. The actual response data will be in response.data
};

// Function to handle user login
const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      // If login is successful, the backend should return data including the JWT token
      // and user information (id, username, email, roles).
      if (response.data.token) {
        // You might store the token and user info in localStorage or context here,
        // but for now, the service just returns the data.
        // Example: localStorage.setItem('user', JSON.stringify(response.data));
        console.log("Login successful, token received:", response.data.token);
      }
      return response.data; // Return the whole response data (token, user details)
    })
    .catch((error) => {
      // Handle login errors (e.g., bad credentials, network issues)
      console.error('Login service error:', error.response?.data || error.message);
      // Re-throw the error so the component can catch it and display a message
      throw error.response?.data || new Error('Login failed');
    });
};

// Function to handle user logout (example)
// This would typically involve removing the JWT from local storage/context
// and potentially calling a backend logout endpoint if you have one.
const logout = () => {
  // Example: localStorage.removeItem('user');
  // If your backend has a /logout endpoint that invalidates the token server-side, call it here.
  console.log("User logged out (locally).");
  // return axios.post(API_URL + "signout").then(response => {
  //   return response.data;
  // });
};

// Function to get the currently stored user (example)
// This might retrieve user info (including token) from localStorage
const getCurrentUser = () => {
  // Example:
  // const userStr = localStorage.getItem('user');
  // if (userStr) return JSON.parse(userStr);
  // return null;
  return null; // Placeholder
};

// Export the service functions
const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
