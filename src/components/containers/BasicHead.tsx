import Head from "next/head";

interface Props {
  title: string;
}

export default function BasicHead({ title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
}
