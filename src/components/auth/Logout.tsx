import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Button, Box } from '@mui/material';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error logging out:', err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  return (
    <Box>
      <Button 
        onClick={handleLogout}
        variant="contained"
        size="small"
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Logout;
