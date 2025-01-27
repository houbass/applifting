import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import { Button, Box } from '@mui/material';

const GoogleSignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User information
      const user = result.user;
      console.log('User:', user);
      //alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing in with Google:', error.message);
        //alert('Error signing in. Please try again.');
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleGoogleSignUp}>
        Sign Up with Google
      </Button>
    </Box>

  );
};

export default GoogleSignUp;