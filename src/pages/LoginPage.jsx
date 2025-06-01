import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // useNavigate for redirection after login
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; // This import is correct
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
// We will import an authService for API calls later
// import authService from '../services/authService';
// We will import an AuthContext for managing auth state later
// import { useAuth } from '../context/AuthContext';


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
  const [role, setRole] = useState('member'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate
  // const { login } = useAuth(); // From AuthContext, to be implemented

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    console.log({
      username,
      password,
      role,
    });

    // --- Placeholder for API call ---
    // try {
    //   const data = await authService.login(username, password); // Role might not be needed here
    //   login(data.token, data.user); 
    //   navigate('/dashboard'); // Or appropriate page based on role
    // } catch (err) {
    //   const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
    //   setError(errorMessage);
    //   console.error("Login error:", err);
    // } finally {
    //   setLoading(false);
    // }
    // --- End Placeholder ---

    // Simulate API call for now
    setTimeout(() => {
      if (username === "testuser" && password === "password123") {
        alert(`Simulated login successful as ${role} with username: ${username}`);
        // Based on your UI mockups, members go to a profile/books/library view
        // Librarians go to a members/books management view.
        // We'll refine this navigation later.
        if (role === 'member') {
          navigate('/member/dashboard'); // Example path for member
        } else if (role === 'librarian') {
          navigate('/librarian/dashboard'); // Example path for librarian
        }
      } else {
        setError("Invalid username or password (simulated).");
      }
      setLoading(false);
    }, 1000);
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
            <Grid item>
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
