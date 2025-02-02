import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserCheck, selectUser } from '@/redux/slices/userSlice';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

// Components
import Logout from '@/components/auth/Logout';
import Snackbar from '@/components/alerts/Snackbar';

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {

      dispatch(setUserCheck(true));

      console.log('currentUser')
      console.log(currentUser)

      if (currentUser) {
        const userData = {
          displayName: currentUser.displayName as string,
          email: currentUser.email as string,
          uid: currentUser.uid as string
        }
        // User is logged in
        dispatch(setUser(userData));
        
      } else {
        // User is logged out
        dispatch(setUser(null));
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  console.log("--- user ---");
  console.log(user);

  return (
    <>
      {user && (
        <Stack flexDirection="row" justifyContent="space-between">
          <p>Current user: {user.displayName}</p>
          <Logout />
        </Stack>
      )}
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Provider store={store}>
        <AppContent />
        <Component {...pageProps} />
        <Snackbar />
    </Provider>
  </>
  )
}
