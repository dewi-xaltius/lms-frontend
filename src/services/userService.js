import axios from 'axios';
// We'll need a way to get the stored user token, e.g., from localStorage or AuthContext.
// For now, let's assume a helper function or direct localStorage access.
// A more robust way is to create an Axios instance that automatically adds the token.

const API_URL = 'http://localhost:8080/api/users/'; // Base URL for user-related endpoints

// Helper function to get auth token from localStorage (example)
// In a real app, this might come from AuthContext or a more secure storage.
const getAuthToken = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    return user?.token; // Assuming your stored user object has a 'token' property
  }
  return null;
};

/**
 * Updates the current user's profile.
 *
 * @param {object} profileData - Object containing fields to update (firstName, lastName, email).
 * @returns {Promise<object>} A promise that resolves with the backend's response data (updated user info).
 */
const updateMyProfile = (profileData) => {
  const token = getAuthToken();

  if (!token) {
    console.error("UserService: No token found for updating profile.");
    return Promise.reject(new Error("Authentication token not found. Please log in."));
  }

  // Log the data being sent and the token (for debugging, remove token log in production)
  console.log("userService.updateMyProfile: Sending data:", profileData);
  // console.log("userService.updateMyProfile: Using token:", token); // Be careful logging tokens

  return axios.put(API_URL + 'me/profile', profileData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Set the Authorization header
      'Content-Type': 'application/json'  // Ensure backend expects JSON
    }
  })
  .then(response => {
    console.log("userService.updateMyProfile: Profile updated successfully, response data:", response.data);
    return response.data; // This should be the updated user object from the backend
  })
  .catch(error => {
    console.error('userService.updateMyProfile error:', error.response?.data || error.message);
    // Re-throw a more specific error message if possible, or the original error
    throw error.response?.data || new Error('Profile update failed');
  });
};


// You can add other user-related service functions here later, e.g.:
// const getMyProfile = () => { ... }
// const getUserById = (id) => { ... } // For admin viewing user profiles

const userService = {
  updateMyProfile,
  // getMyProfile,
};

export default userService;
