import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Alert from '@mui/material/Alert'; // For success/error messages
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth to get user details and update function
import UpdateProfileModal from '../components/UpdateProfileModal.jsx'; // Import the modal
import userService from '../services/userService.js'; // Import the user service

// TabPanel component (should be the same as before)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`member-dashboard-tabpanel-${index}`}
      aria-labelledby={`member-dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `member-dashboard-tab-${index}`,
    'aria-controls': `member-dashboard-tabpanel-${index}`,
  };
}

function MemberDashboard() {
  const { user, updateUserContext } = useAuth(); // Get user and the function to update user in context
  const [selectedTab, setSelectedTab] = useState(0);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateStatusMessage, setUpdateStatusMessage] = useState(''); // For success messages
  const [updateErrorMessage, setUpdateErrorMessage] = useState('');   // For error messages

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
    setUpdateStatusMessage(''); // Clear previous messages
    setUpdateErrorMessage('');
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleProfileUpdateSubmit = async (profileData) => {
    setUpdateStatusMessage('');
    setUpdateErrorMessage('');
    try {
      console.log("MemberDashboard: Submitting to userService.updateMyProfile with data:", profileData);
      const updatedUserDataFromBackend = await userService.updateMyProfile(profileData);
      
      // The backend currently returns a JwtResponse-like structure.
      // We need to ensure the fields match what AuthContext expects for the user object,
      // or transform it here. Let's assume it has token, id, username, firstName, lastName, email, roles.
      // The token won't change with profile update usually, so we can merge.
      const currentUserData = JSON.parse(localStorage.getItem('user')) || {}; // Get current token etc.

      const updatedUserForContext = {
        ...currentUserData, // Keep existing token and other non-updated fields
        id: updatedUserDataFromBackend.id,
        username: updatedUserDataFromBackend.username,
        firstName: updatedUserDataFromBackend.firstName,
        lastName: updatedUserDataFromBackend.lastName,
        email: updatedUserDataFromBackend.email,
        roles: updatedUserDataFromBackend.roles,
        // Ensure all fields expected by AuthContext's user object are present
      };
      
      updateUserContext(updatedUserForContext); // Update AuthContext and localStorage

      setUpdateStatusMessage("Profile updated successfully!");
      handleCloseUpdateModal();
    } catch (error) {
      console.error("MemberDashboard: Failed to update profile", error);
      setUpdateErrorMessage(error.message || "Failed to update profile. Please try again.");
      // Optionally re-throw or handle in modal: throw error; 
      // If re-thrown, the modal's catch block will also execute.
      // For now, let MemberDashboard handle showing the error message.
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Member Dashboard
        </Typography>
      </Box>

      {updateStatusMessage && <Alert severity="success" sx={{ mb: 2 }}>{updateStatusMessage}</Alert>}
      {updateErrorMessage && <Alert severity="error" sx={{ mb: 2 }}>{updateErrorMessage}</Alert>}

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="member dashboard tabs">
            <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="My Borrowed Books" {...a11yProps(1)} />
            <Tab label="Library Catalog" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={selectedTab} index={0}>
          <Paper elevation={0} sx={{ p: 0 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              My Profile
            </Typography>
            {user ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1"><strong>First Name:</strong></Typography>
                  <Typography variant="body1">{user.firstName || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1"><strong>Last Name:</strong></Typography>
                  <Typography variant="body1">{user.lastName || 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1"><strong>Username:</strong></Typography>
                  <Typography variant="body1">{user.username}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1"><strong>Email:</strong></Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1">Loading profile information...</Typography>
            )}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant="contained" color="primary" onClick={handleOpenUpdateModal}>
                Update Profile
              </Button>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h5" component="h2" gutterBottom>
            My Borrowed Books
          </Typography>
          <Typography variant="body1">
            (Coming Soon) This section will display a list of books you have currently borrowed...
          </Typography>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Library Catalog
          </Typography>
          <Typography variant="body1">
            (Coming Soon) This section will allow you to search and browse the library's book collection...
          </Typography>
        </TabPanel>
      </Box>

      {user && ( /* Ensure user is loaded before trying to render modal which might access user */
        <UpdateProfileModal
          open={isUpdateModalOpen}
          handleClose={handleCloseUpdateModal}
          handleUpdate={handleProfileUpdateSubmit}
        />
      )}
    </Container>
  );
}

export default MemberDashboard;
