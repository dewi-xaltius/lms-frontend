import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
// Removed: import authService from '../services/authService'; // Not needed directly here anymore
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth hook


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Library Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member'); // UI state for role selection on the form
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // Still needed if AuthContext doesn't handle ALL navigation
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the login function from AuthContext.
      // This function now handles the API call via authService,
      // sets the user state, stores data in localStorage, and navigates.
      // The 'role' selected on the form isn't directly passed to context's login,
      // as the backend determines the actual roles. It's primarily for UI.
      await login(username, password);
      // Navigation to dashboards is now handled within the login function in AuthContext
      // based on roles received from the backend.
      // If specific navigation from LoginPage is still needed after context's login,
      // it can be done here, but AuthContext should handle primary role-based redirect.

    } catch (err) {
      // The error thrown by AuthContext's login (which re-throws from authService)
      // should contain a message.
      const errorMessage = err.message || "Login failed. Please check your credentials or try again.";
      setError(errorMessage);
      console.error("Login page error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper 
        elevation={3} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4,
          borderRadius: 2 
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Library Login
        </Typography>
        <Typography component="p" variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Sign in to continue
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <ToggleButtonGroup
            color="primary"
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="User role"
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="member" aria-label="member">
              Member
            </ToggleButton>
            <ToggleButton value="librarian" aria-label="librarian">
              Librarian
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default LoginPage;
