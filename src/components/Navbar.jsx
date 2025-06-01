import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Library Icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from '../context/AuthContext.jsx'; // Your AuthContext

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This will clear context/localStorage and navigate to /login
  };

  // Determine user role for conditional rendering
  const isMember = isAuthenticated && user?.roles?.includes('ROLE_MEMBER');
  const isLibrarian = isAuthenticated && user?.roles?.includes('ROLE_LIBRARIAN');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="library-icon"
            sx={{ mr: 2 }}
            component={RouterLink}
            to={isAuthenticated ? (isLibrarian ? "/librarian/dashboard" : "/member/dashboard") : "/login"}
          >
            <MenuBookIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LMS
          </Typography>

          {isAuthenticated ? (
            <>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Welcome, {user?.username || 'User'} {isLibrarian ? '(Librarian)' : ''}
              </Typography>
              
              {/* Role-specific navigation links can be added here */}
              {isMember && (
                <>
                  <Button color="inherit" component={RouterLink} to="/member/dashboard">My Dashboard</Button>
                  {/* Add other member links e.g., My Books, Profile */}
                </>
              )}
              {isLibrarian && (
                <>
                  <Button color="inherit" component={RouterLink} to="/librarian/dashboard">Admin Dashboard</Button>
                  {/* Add other librarian links e.g., Manage Members, Manage Books */}
                </>
              )}

              <IconButton color="inherit" onClick={handleLogout} aria-label="logout">
                <ExitToAppIcon />
                <Typography variant="button" sx={{ ml: 0.5, display: { xs: 'none', sm: 'inline' } }}>Logout</Typography>
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
