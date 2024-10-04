import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Divider } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 800,
  margin: 'auto',
  padding: theme.spacing(4),
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
}));

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user profile data
    fetch('/api/profile')
      .then(response => response.json())
      .then(data => {
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch(err => setError('Error fetching profile data.'));
  }, []);

  const handleSaveChanges = () => {
    setLoading(true);
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, currentPassword, newPassword }),
    })
      .then(response => response.json())
      .then(() => {
        setLoading(false);
        setError('');
        alert('Profile updated successfully.');
      })
      .catch(err => {
        setLoading(false);
        setError('Error updating profile.');
      });
  };

  const handleDeleteAccount = () => {
    setLoading(true);
    fetch('/api/profile/delete', {
      method: 'DELETE',
    })
      .then(() => {
        setLoading(false);
        alert('Account deleted successfully.');
        history.push('/login'); // Redirect to login page
      })
      .catch(err => {
        setLoading(false);
        setError('Error deleting account.');
      });
  };

  const handleSignOut = () => {
    fetch('/api/auth/signout', {
      method: 'POST',
    })
      .then(() => {
        history.push('/login'); // Redirect to login page
      })
      .catch(err => setError('Error signing out.'));
  };

  return (
    <Container>
      <Typography variant="h4">Profile Settings</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormField>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextField
          fullWidth
          label="Current Password"
          type="password"
          variant="outlined"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </FormField>
      <FormField>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </FormField>
      <SubmitButton
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
      </SubmitButton>
      <Divider sx={{ my: 2 }} />
      <ActionButton
        variant="contained"
        color="secondary"
        startIcon={<ExitToAppIcon />}
        onClick={handleSignOut}
        disabled={loading}
      >
        Sign Out
      </ActionButton>
      <ActionButton
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => setOpenDeleteDialog(true)}
        disabled={loading}
      >
        Delete Account
      </ActionButton>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileSettings;
