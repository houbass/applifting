import { useRouter } from "next/router";

function useGetFilterUrlParams() {
  const router = useRouter();
  const { filter } = router.query;
  const urlData = filter && JSON.parse(filter as string);
  const urlInstruments = urlData?.instruments;
  const urlStyles = urlData?.styles;

  return {
    urlInstruments,
    urlStyles,
  };
}

export default useGetFilterUrlParams;
