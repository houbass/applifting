import React from "react";
import Head from "next/head";

interface Props {
  title: string
  content?: string
}

const BasicHead = ({ title, content }: Props) => {
  return (
    <>
      <Head>
        {/* TODO */}
        <title>{title}</title>
        <meta name="description" content={ content ? content : title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default BasicHead;