import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProviderWrapper } from "@/contexts/ThemeContext";
import { useRouter } from "next/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Components
import GlobalComponents from "@/components/global/GlobalComponents";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <GlobalComponents />
            <Component {...pageProps} />
          </ThemeProviderWrapper>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
