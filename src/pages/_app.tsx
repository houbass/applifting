import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { Box } from '@mui/material';
import { CircularProgress , useTheme } from '@mui/material';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import { selectUserCheck } from '@/redux/slices/userSlice';
import { ThemeProviderWrapper } from '@/contexts/ThemeContext';
import useAuthListener from '@/hooks/auth/useAuthListener';

// Components
import UserTopNavBar from '@/components/navigation/UserTopNavBar';
import Snackbar from '@/components/alerts/Snackbar';

const GlobalComponents = () => {

  // Hooks
  const theme = useTheme();
  const userCheck = useSelector(selectUserCheck);

  // Check if user is logged in
  useAuthListener()

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
