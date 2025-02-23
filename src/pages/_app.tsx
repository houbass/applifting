import '@/styles/globals.css';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Box } from '@mui/material';
import { CircularProgress , useTheme } from '@mui/material';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { selectUser, selectUserCheck, setUserData, selectUserData } from '@/redux/slices/userSlice';
import { ThemeProviderWrapper } from '@/contexts/ThemeContext';

// Hooks
import useAuthListener from '@/hooks/auth/useAuthListener';
import useGetUserData from '@/hooks/firebase/useGetUserData';

// Components
import UserTopNavBar from '@/components/navigation/UserTopNavBar';
import Snackbar from '@/components/alerts/Snackbar';

const GlobalComponents = () => {

  // Hooks 
  // Check if user is logged in
  useAuthListener()
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);
  const userDataRedux = useSelector(selectUserData)
  const { data: userData } = useGetUserData(user?.uid);

  useEffect(() => {
    if(userData) {
      dispatch(setUserData(userData));
    }

    // reset on logout
    if(!userData && userDataRedux) {
      dispatch(setUserData(null));
    }
  }, [userData])

  return(
    <>
      {!userCheck && (
        <Box
          sx={{
            top: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.background.default,
            zIndex: 2,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      <UserTopNavBar />
      <Snackbar />
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Provider store={store}>
      <ThemeProviderWrapper>
        <GlobalComponents />
        <Component {...pageProps} />
      </ThemeProviderWrapper>
    </Provider>
  </>
  )
}
