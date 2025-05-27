import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProviderWrapper } from "@/contexts/ThemeContext";
import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";

// Components
import GlobalComponents from "@/components/global/GlobalComponents";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <>
      <IntlProvider locale={locale!} messages={pageProps.messages}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <GlobalComponents />
            <Component {...pageProps} />
          </ThemeProviderWrapper>
        </Provider>
      </IntlProvider>
    </>
  );
}
