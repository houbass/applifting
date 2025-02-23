import React from 'react';
import { Button, Box } from '@mui/material';

// Firebase
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '@/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Utils
import { getSearchNameArr } from './utils';

const GoogleSignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // User information
      const user = userCredential.user;
      const displayName = user.displayName;

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
          projectIds: [],
          userName: displayName,
          searchArr: getSearchNameArr(displayName), 
          photoURL: user.photoURL
        });
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error signing in with Google:', error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <Box>
      <Button fullWidth variant="contained" onClick={handleGoogleSignUp}>
        Sign Up with Google
      </Button>
    </Box>

  );
};

export default GoogleSignUp;