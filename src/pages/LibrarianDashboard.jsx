import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import userService from '../services/userService.js'; // Import the user service
// import { useAuth } from '../context/AuthContext.jsx'; // Not directly needed for fetching if token is handled by service

function LibrarianDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      console.log("LibrarianDashboard: Attempting to fetch users via userService.");
      try {
        const data = await userService.getAllUsers();
        console.log("LibrarianDashboard: Data received from userService:", data);
        setUsers(data || []); // Ensure users is an array, even if data is null/undefined
      } catch (err) {
        console.error("LibrarianDashboard: Failed to fetch users from service. Error object:", err);
        // err might be the object thrown by userService which could be error.response.data or a new Error.
        // Access err.message if it's an Error object, or handle structured error from backend.
        let displayError = "Failed to fetch users.";
        if (err && err.message) {
            displayError = err.message;
        } else if (typeof err === 'object' && err !== null && err.error) { // If backend sends {error: ..., message: ...}
            displayError = `${err.error}: ${err.message}`;
        }
        setError(displayError + " You may not have the required permissions or the server encountered an issue.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleEditUser = (userId) => {
    console.log("Edit user clicked for ID:", userId);
    alert(`Edit functionality for user ID ${userId} to be implemented.`);
    // TODO: Implement navigation to an edit user page or open an edit modal
  };

  const handleDeleteUser = (userId) => {
    console.log("Delete user clicked for ID:", userId);
    alert(`Delete functionality for user ID ${userId} to be implemented.`);
    // TODO: Implement confirmation and API call for deletion
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 1 }}>Loading users...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Librarian Dashboard - Member Management
        </Typography>
        <Button variant="contained" color="primary" /* onClick={handleAddUser} // TODO */ >
          Add New Member
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && users.length === 0 && !error && (
        <Typography sx={{mt: 2, textAlign: 'center'}}>No users found.</Typography>
      )}

      {users.length > 0 && (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table of users">
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Roles</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.roles?.join(', ') || 'N/A'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditUser(user.id)} aria-label="edit user">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteUser(user.id)} aria-label="delete user">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default LibrarianDashboard;
