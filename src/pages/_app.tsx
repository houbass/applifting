import '@/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { ThemeProviderWrapper } from '@/contexts/ThemeContext';
import useAuthListener from '@/hooks/auth/useAuthListener';

// Components
import UserTopNavBar from '@/components/navigation/UserTopNavBar';
import Snackbar from '@/components/alerts/Snackbar';

const GlobalComponents = () => {
    // Check if user is logged in
    useAuthListener()

    return(
      <>
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
