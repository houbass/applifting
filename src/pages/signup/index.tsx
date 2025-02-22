import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import useDashboardRedirect from '@/hooks/redirects/useDashboardRedirect';
import { setDoc, doc } from 'firebase/firestore';
import { PAGE_PADDING_X, PAGE_PADDING_TOP, MAX_WIDTH } from '@/constants/globalConstants';

// Utils
import { getSearchNameArr } from '@/components/auth/utils';

// Components
import BasicHead from '@/components/containers/BasicHead';
import SignInUp from '@/components/auth/SignInUp';
import GoogleSignUp from '@/components/auth/GoogleSingnUp';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    try {
      // Firebase sign-up method
      const userCredential  = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // Save custom data to Firestore (only after registration)
      const uid = userCredential.user.uid
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: uid,
        follow: [],
        followers: [],
        likes: [],
        projectIds: [],
        userName: displayName, 
        searchArr: getSearchNameArr(displayName),
      });

      setSuccess('Account created successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error('Unexpected error', err);
      }
    }
  };

  useDashboardRedirect();

  return (
    <>
      <BasicHead title='Sign Up' />

      <main>
        <Stack alignItems="center" px={PAGE_PADDING_X} py={PAGE_PADDING_TOP}>
          <Stack gap={1} maxWidth={MAX_WIDTH} width="100%">
            <Box>
              <Typography>
                LETS SIGN UP
              </Typography>
            </Box>

            <SignInUp 
              setEmail={setEmail}
              setPassword={setPassword}
              handler={handleSignUp}
              success={success}
              error={error}
              text="Sign Up"
              setDisplayName={setDisplayName}
            />

            <GoogleSignUp />
          </Stack>
        </Stack>
      </main>
    </>
  )
}
