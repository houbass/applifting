import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserCheck, selectUser } from '@/redux/slices/userSlice';
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Components
import Logout from '@/components/auth/Logout';

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {

      dispatch(setUserCheck(true));

      if (currentUser) {
        const userData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid
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
  }, [null]);

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
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>
  )
}
