import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta name="description" content="Welcome to my Cat Blog" />
        <meta property="og:title" content="My Cat Blog" />
        <meta property="og:description" content="Welcome to my Cat Blog" />

        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/applifting-3771e.firebasestorage.app/o/page%2Fsocialpreview.png?alt=media&token=4cba1ff0-d590-4772-aa69-33c6443b8a1d"
        />
        <meta property="og:url" content="https://applifting.netlify.app" />
        <meta property="og:type" content="website" />

        {/* TODO Add more meta */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
