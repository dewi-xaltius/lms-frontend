import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../context/AuthContext.jsx';

// TabPanel component to display content for each tab
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Helper function for a11y props for tabs
function a11yProps(index) {
  return {
    id: `member-dashboard-tab-${index}`,
    'aria-controls': `member-dashboard-tabpanel-${index}`,
  };
}

function MemberDashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Profile, 1 for My Books, 2 for Library

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Member Dashboard
        </Typography>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={selectedTab} onChange={handleTabChange} aria-label="member dashboard tabs">
            <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="My Books" {...a11yProps(1)} />
            <Tab label="Library" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Profile Tab Content */}
        <TabPanel value={selectedTab} index={0}>
          <Paper elevation={0} sx={{ p: 0 /* Removed extra padding if TabPanel already has it */ }}>
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
              <Button variant="contained" color="primary">
                Update Profile {/* Functionality to be implemented */}
              </Button>
            </Box>
          </Paper>
        </TabPanel>

        {/* My Borrowed Books Tab Content */}
        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h5" component="h2" gutterBottom>
            My Borrowed Books
          </Typography>
          <Typography variant="body1">
            (Coming Soon) This section will display a list of books you have currently borrowed,
            their due dates, and any applicable fines. (Ref: Your screenshot image_848db6.png)
          </Typography>
          {/* List of borrowed books will go here */}
        </TabPanel>

        {/* Library Catalog Tab Content */}
        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Library Catalog
          </Typography>
          <Typography variant="body1">
            (Coming Soon) This section will allow you to search and browse the library's book collection
            and borrow books. (Ref: Your screenshot image_848d93.png)
          </Typography>
          {/* Book search, filter, and listing components will go here */}
        </TabPanel>
      </Box>
    </Container>
  );
}

export default MemberDashboard;
