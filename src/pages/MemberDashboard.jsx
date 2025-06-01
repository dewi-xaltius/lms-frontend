import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth to get user details

function MemberDashboard() {
  const { user } = useAuth(); // Get the authenticated user from AuthContext

  // Placeholder for future navigation between Profile, My Books, Library
  // For now, we'll just display the profile information directly.

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Member Dashboard
        </Typography>
      </Box>

      {/* We can add Tabs here later to switch between Profile, My Books, Library */}
      {/* For now, displaying Profile section */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          My Profile
        </Typography>
        {user ? (
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>First Name:</strong></Typography>
              <Typography variant="body1">{user.firstName || 'N/A'}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Last Name:</strong></Typography>
              <Typography variant="body1">{user.lastName || 'N/A'}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Username:</strong></Typography>
              <Typography variant="body1">{user.username}</Typography>
            </Grid>
            <Grid xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Email:</strong></Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            {/* Add other profile details as needed, e.g., Member ID if available */}
            {/* <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1"><strong>Member ID:</strong></Typography>
              <Typography variant="body1">{user.id}</Typography>
            </Grid> */}
          </Grid>
        ) : (
          <Typography variant="body1">Loading profile information...</Typography>
        )}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}>
          <Button variant="contained" color="primary" /* onClick={handleUpdateProfile} // To be implemented */ >
            Update Profile
          </Button>
        </Box>
      </Paper>

      {/* Placeholder sections for My Books and Library - to be implemented as separate components or views */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          My Borrowed Books (Coming Soon)
        </Typography>
        {/* Content for borrowed books will go here */}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Library Collection (Coming Soon)
        </Typography>
        {/* Content for library book search and listing will go here */}
      </Box>

    </Container>
  );
}

export default MemberDashboard;
