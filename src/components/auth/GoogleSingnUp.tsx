import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '@/config/firebase';
import { Button, Box } from '@mui/material';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleSignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // User information
      const user = userCredential.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If First time sign-in → Save user data in Firestore
        const uid = user.uid
        await setDoc(userRef, {
          uid: uid,
          follow: [],
          followers: [],
          likes: [],
          projectIds: [] 
        });
      }

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