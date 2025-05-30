import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />

        {/* Metadata */}
        <meta name="description" content="Welcome to my Cat Blog" />
        <meta property="og:title" content="My Cat Blog" />
        <meta property="og:description" content="Welcome to my Cat Blog" />
        {/* TODO Add more meta */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
