import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Stack } from '@mui/material';

// Components
import Logout from '@/components/auth/Logout';

export default function App({ Component, pageProps }: AppProps) {

  // TODO types
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        // User is logged in
        setUser(currentUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);


  console.log("--- user ---");
  console.log(user);


  return (
  <>
    <Stack flexDirection="row" justifyContent="space-between">
      <p>Current user: {user?.displayName}</p>
      <Logout />
    </Stack>

    <Component {...pageProps} />
  </>
  )
}
