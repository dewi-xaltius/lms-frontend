import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext.jsx'; // To get current user details

/**
 * Modal component for updating user profile information.
 *
 * @param {object} props
 * @param {boolean} props.open - Controls if the modal is open.
 * @param {function} props.handleClose - Function to call when closing the modal.
 * @param {function} props.handleUpdate - Function to call with updated profile data on submit.
 */
function UpdateProfileModal({ open, handleClose, handleUpdate }) {
  const { user } = useAuth(); // Get current user from context

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // For form-specific errors
  const [loading, setLoading] = useState(false);

  // Effect to pre-fill form when the modal opens or user data changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user, open]); // Re-run if user changes or modal is re-opened

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    const profileData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    // Console log the data being sent
    console.log("UpdateProfileModal: Submitting profile data:", profileData);

    // Basic client-side validation (can be enhanced)
    if (!profileData.firstName && !profileData.lastName && !profileData.email) {
      setError("Please provide at least one field to update.");
      setLoading(false);
      return;
    }
    if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
    }

    try {
      await handleUpdate(profileData); // Call the update handler passed via props
      // handleClose(); // Close modal on successful update (handled by parent)
    } catch (err) {
      const errorMessage = err.message || "Failed to update profile. Please try again.";
      setError(errorMessage);
      console.error("UpdateProfileModal submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Update Your Profile</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Edit your profile information below. Provide only the fields you wish to update.
        </DialogContentText>
        <Box noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={handleClose} disabled={loading}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfileModal;
