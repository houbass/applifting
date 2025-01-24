import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Button, Box } from '@mui/material';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (err: any) {
      console.error('Error logging out:', err.message);
    }
  };

  return (
    <Box>
      <Button 
        onClick={handleLogout}
        variant="contained"
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Logout;
