import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Define a more general base

const getAuthToken = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user?.token;
    } catch (e) {
      console.error("UserService: Error parsing user from localStorage", e);
      return null;
    }
  }
  return null;
};

const updateMyProfile = (profileData) => {
  const token = getAuthToken();
  if (!token) {
    console.error("UserService (updateMyProfile): No token found.");
    return Promise.reject(new Error("Authentication token not found. Please log in."));
  }
  console.log("userService.updateMyProfile: Sending data:", profileData);
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  return axios.put(`${API_BASE_URL}/users/me/profile`, profileData, config)
  .then(response => {
    console.log("userService.updateMyProfile: Profile updated successfully, response data:", response.data);
    return response.data;
  })
  .catch(error => {
    console.error('userService.updateMyProfile error:', error.response?.data || error.message);
    console.error('userService.updateMyProfile raw error object:', error);
    throw error.response?.data || new Error('Profile update failed');
  });
};

const getAllUsers = () => {
  const token = getAuthToken();
  
  console.log("userService.getAllUsers: Attempting to fetch all users.");
  if (!token) {
    console.error("userService.getAllUsers: No token found. Request will likely fail or be unauthenticated.");
    return Promise.reject(new Error("Authentication token not found for getAllUsers."));
  }
  
  const exactTokenForRequest = token; // Use the token we know works in Postman when logged
  console.log("userService.getAllUsers: EXACT TOKEN BEING SENT BY FRONTEND ->", exactTokenForRequest);

  const config = {
    method: 'get',
    url: `${API_BASE_URL}/users`, // Ensure this resolves to http://localhost:8080/api/users
    headers: { 
      'Authorization': `Bearer ${exactTokenForRequest}`,
      'Content-Type': 'application/json' // Usually not strictly needed for GET, but doesn't hurt
    }
    // You could also add withCredentials: true here if you were dealing with cookies,
    // but for Bearer tokens it's typically not required.
  };

  console.log("userService.getAllUsers: Axios request config:", config);

  return axios(config) // Use the more generic axios(config) call
  .then(response => {
    console.log("userService.getAllUsers: Users fetched successfully, HTTP Status:", response.status, "Count:", response.data?.length);
    return response.data;
  })
  .catch(error => {
    console.error('--- userService.getAllUsers Full Error Object ---', error);
    if (error.response) {
      console.error('userService.getAllUsers Error Data:', error.response.data);
      console.error('userService.getAllUsers Error Status:', error.response.status);
      console.error('userService.getAllUsers Error Headers:', error.response.headers);
      throw error.response.data || new Error(`Request failed with status ${error.response.status}`);
    } else if (error.request) {
      console.error('userService.getAllUsers No response received, request object:', error.request);
      throw new Error('No response from server. Please check network connection.');
    } else {
      console.error('userService.getAllUsers Request setup error message:', error.message);
      throw new Error('Error setting up request: ' + error.message);
    }
  });
};

const userService = {
  updateMyProfile,
  getAllUsers,
};

export default userService;
